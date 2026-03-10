# 附录A：故障排除指南

## 前言：别慌，十有八九是小事

使用OpenClaw过程中，你可能会遇到各种问题。别担心——90%的"它坏了"其实都是那几个常见问题。

本附录提供了最常见10个问题的诊断方法、症状描述、原因分析和解决步骤。如果这一章能帮你解决问题，那就太好了。

---

## 黄金一分钟：先跑这些命令

遇到任何问题，第一步永远是一致的。打开终端，按顺序敲这五条命令：

```bash
openclaw status
openclaw status --all
openclaw gateway probe
openclaw logs --follow
openclaw doctor
```

如果能连上Gateway，再来一条深度探测：

```bash
openclaw status --deep
```

这几条命令能帮你快速定位问题：
- `status`：看基本状态健康不健康
- `status --all`：看所有节点的详细情况
- `gateway probe`：测试Gateway连接
- `logs`：实时看日志，找报错信息
- `doctor`：自动诊断，能修的自己修

---

## Top 10 常见问题速查表

### 问题1：`openclaw: command not found`

**症状**：你敲`openclaw`，终端告诉你找不到这个命令。

**原因**：99%是Node/npm的PATH问题。你的系统不知道openclaw装在哪儿了。

**解决方法**：

```bash
# 检查npm全局安装路径
npm config get prefix

# 如果输出的路径不在你的PATH里，需要加进去
# 临时方案（测试用）
export PATH="$(npm config get prefix)/bin:$PATH"

# 永久方案（加到shell配置文件）
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**验证**：敲`which openclaw`，应该能显示路径。

---

### 问题2：安装显示成功，但命令不工作

**症状**：安装程序说"Success!"，但一用就报错或者没反应。

**解决方法**：用verbose模式重新安装，看详细日志：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --verbose
```

beta版本同理：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --beta --verbose
```

或者设置环境变量：

```bash
OPENCLAW_VERBOSE=1 curl -fsSL https://openclaw.ai/install.sh | bash
```

---

### 问题3：Gateway显示"unauthorized"或持续重连

**症状**：CLI一直连不上Gateway，提示认证失败或不断重连。

**可能原因**：
1. Gateway的认证token配置不对
2. Gateway没启动
3. 端口被占用

**解决方法**：

```bash
# 检查Gateway状态
openclaw status

# 检查Gateway是否在运行
ps aux | grep openclaw

# 重新配置Gateway认证
openclaw configure
# 选择"Gateway service" -> "Reset credentials"

# 如果还不行，重装Gateway
openclaw gateway reinstall
```

---

### 问题4：控制UI在HTTP上失败（需要设备身份）

**症状**：浏览器打开控制面板，提示"需要设备身份"或者认证失败。

**原因**：控制UI需要HTTPS（安全上下文）才能生成设备身份。HTTP是不安全的。

**解决方法**：

**方案A**：用localhost访问（推荐）
```bash
# 在本地127.0.0.1上打开控制UI
openclaw control-ui
```

**方案B**：用Tailscale Serve（推荐用于远程访问）
```bash
# 启用Tailscale Serve
openclaw configure
# 选择"Gateway service" -> "Enable Tailscale Serve"
```

**方案C**：紧急情况，降低安全性（不推荐）
```json5
{
  gateway: {
    controlUi: {
      allowInsecureAuth: true,  // 仅调试用！
    },
  },
}
```

---

### 问题5：`docs.openclaw.ai`显示SSL错误

**症状**：访问文档网站时，浏览器提示SSL证书错误。

**原因**：Comcast/Xfinity的Advanced Security功能会拦截某些网站。

**解决方法**：
1. 禁用Xfinity Advanced Security
2. 或者把`docs.openclaw.ai`加到白名单里
3. 验证是不是ISP问题：开手机热点试试

---

### 问题6：服务显示运行中，但RPC探测失败

**症状**：`openclaw status`显示Gateway在运行，但其他功能不工作。

**解决方法**：

```bash
# 深度探测
openclaw status --deep

# 检查Gateway日志
openclaw logs --follow

# 重启Gateway服务
openclaw gateway restart

# 如果还不行，运行doctor
openclaw doctor
```

---

### 问题7：模型调用失败（"all models failed"）

**症状**：选择模型后，提示所有模型都失败了。

**可能原因**：
1. API Key错了或过期了
2. 网络问题
3. 账户余额不足
4. 模型服务挂了

**解决方法**：

```bash
# 检查模型认证状态
openclaw models status

# 测试网络连接
curl -I https://api.anthropic.com

# 重新配置模型
openclaw configure
# 选择"Models" -> 重新输入API Key

# 查看详细错误
openclaw logs --follow | grep -i "model"
```

---

### 问题8：`/model`显示`model not allowed`

**症状**：想切换模型，系统说"model not allowed"。

**原因**：你设置了模型允许列表（`agents.defaults.models`），但你想用的模型不在列表里。

**解决方法**：

```bash
# 查看允许列表
openclaw config get agents.defaults.models

# 方案A：添加你想要的模型
openclaw config set agents.defaults.models.anthropic/claude-opus-4-5 {}

# 方案B：清空允许列表（允许所有模型）
openclaw config delete agents.defaults.models

# 查看可用模型
/models
```

---

### 问题9：速率限制（"rate limit exceeded"）

**症状**：用着用着突然提示"rate limit exceeded"。

**原因**：你用得太快了，超过了API的速率限制。

**解决方法**：
1. 等一会儿再试
2. 升级API计划
3. 用多个API Key轮换
4. 减少并发请求

```bash
# 查看当前模型状态
openclaw models status --json | jq '.auth.unusableProfiles'
```

---

### 问题10：WSL2网络问题（Windows用户专属）

**症状**：在WSL2里安装的OpenClaw，Windows宿主机访问不了。

**原因**：WSL2有独立的虚拟网络，IP地址会变。

**解决方法**：

**PowerShell（管理员）**：

```powershell
# 获取WSL IP
$WslIp = (wsl hostname -I).Trim().Split(" ")[0]

# 设置端口转发（以18789为例）
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=18789 `
  connectaddress=$WslIp connectport=18789

# 允许防火墙通过
New-NetFirewallRule -DisplayName "OpenClaw Gateway" -Direction Inbound `
  -Protocol TCP -LocalPort 18789 -Action Allow
```

注意：WSL重启后IP会变，需要重新设置。

---

## 按错误信息分类排查

### 认证相关错误

| 错误信息 | 可能原因 | 解决方法 |
|---------|---------|---------|
| `unauthorized` | Token/密码错误 | 重新配置认证 |
| `OAuth token refresh failed` | OAuth凭证过期 | 重新登录 |
| `No API key found` | 没配置API Key | 运行`openclaw onboard` |
| `401 Unauthorized` | API Key无效 | 检查API Key是否正确 |

### 网络相关错误

| 错误信息 | 可能原因 | 解决方法 |
|---------|---------|---------|
| `ECONNREFUSED` | Gateway没启动 | 启动Gateway |
| `ETIMEDOUT` | 网络不通 | 检查防火墙/代理 |
| `ENOTFOUND` | DNS解析失败 | 检查网络连接 |
| `certificate has expired` | SSL证书过期 | 更新证书 |

### 模型相关错误

| 错误信息 | 可能原因 | 解决方法 |
|---------|---------|---------|
| `all models failed` | API Key/网络问题 | 检查认证和网络 |
| `model not allowed` | 模型不在允许列表 | 修改允许列表 |
| `rate limit exceeded` | 超过速率限制 | 等待或升级计划 |
| `insufficient credits` | 余额不足 | 充值 |

---

## 诊断命令速查表

| 命令 | 用途 |
|------|------|
| `openclaw status` | 查看基本状态 |
| `openclaw status --all` | 查看所有节点详情 |
| `openclaw status --deep` | 深度探测 |
| `openclaw gateway probe` | 测试Gateway连接 |
| `openclaw logs --follow` | 实时查看日志 |
| `openclaw doctor` | 自动诊断并修复 |
| `openclaw doctor --generate-gateway-token` | 生成新的Gateway token |
| `openclaw models status` | 查看模型认证状态 |
| `openclaw config get <key>` | 查看配置项 |
| `openclaw security audit` | 安全审计 |

---

## 提交问题时该做什么

如果以上都搞不定，需要提交issue，请提供这些信息：

```bash
# 运行这个，把输出贴到issue里
openclaw status --all

# 如果能复现问题，提供相关日志
openclaw logs --follow > ~/openclaw-debug.log
# 然后贴出日志的相关部分（注意脱敏！）
```

**issue模板**：

```
## 问题描述
[简要描述问题]

## 复现步骤
1. [...]
2. [...]
3. [...]

## 期望行为
[应该发生什么]

## 实际行为
[实际发生了什么]

## 环境信息
- 操作系统: [macOS/Linux/Windows+WSL2]
- OpenClaw版本: [运行 openclaw --version]
- Node版本: [运行 node --version]

## 诊断信息
[粘贴 openclaw status --all 的输出]
```

---

## 最后的话

遇到问题很正常，别气馁。OpenClaw是个复杂的系统，连接了AI模型、消息平台、本地工具……能跑起来本身就很神奇了。

记住：90%的问题都是配置问题，不是bug。先怀疑自己的配置，再怀疑是bug。

祝排查顺利！

---

*如果这一章帮到了你，或者你有其他常见问题想补充，欢迎反馈！*
