# 附录B：Windows用户专属指南

## 前言：是的，Windows也能用OpenClaw

我知道，看到"支持Linux/macOS"的时候，Windows用户的心都凉了半截。

但别担心！OpenClaw对Windows的支持其实比你想的要好——只是需要绕个小弯子，用WSL2（Windows Subsystem for Linux 2）。

这章专门写给Windows用户的，手把手教你从零开始在Windows上跑起来OpenClaw。

---

## 一、为什么用WSL2而不是原生Windows？

简单说：WSL2能给你一个**完整的Linux环境**，而OpenClaw就是在Linux上开发的。

**优势**：
- 原生Linux兼容性，不会出现"这命令在Windows上不支持"的尴尬
- 工具链更完整（Node、Bun、pnpm、各种CLI工具）
- OpenClaw团队官方推荐的Windows方案

**劣势**：
- 多了一层WSL2，稍微麻烦一点
- 文件路径有差异（Windows的`C:\`和Linux的`/mnt/c`）

**结论**：WSL2是目前Windows用户最靠谱的选择。

---

## 二、WSL2安装完整指南

### 步骤1：检查你的Windows版本

WSL2需要Windows 10版本2004或更高（内部版本19041或更高），或者Windows 11。

**检查方法**：
1. 按`Win + R`，输入`winver`，回车
2. 看弹窗里的版本号

如果版本太低，先去Windows Update更新系统。

---

### 步骤2：安装WSL2

打开PowerShell（**管理员模式**）：

1. 按`Win + X`，选择"Windows PowerShell（管理员）"
2. 或者右键开始菜单，选择"Windows PowerShell（管理员）"

然后输入：

```powershell
wsl --install
```

这会自动安装WSL2和Ubuntu。

**如果你想指定版本**：

```powershell
# 先看看有哪些发行版
wsl --list --online

# 安装特定的（比如Ubuntu 24.04）
wsl --install -d Ubuntu-24.04
```

安装完成后，Windows会提示你重启。照做就行。

---

### 步骤3：完成Ubuntu初始化

重启后，会自动打开一个Ubuntu终端窗口（或者你可以在开始菜单搜索"Ubuntu"打开）。

第一次运行会要求你：
1. 创建一个用户名（随便起，比如`user`）
2. 设置一个密码（记得住就行）

完成之后，你就正式进入了Linux世界！

---

### 步骤4：启用systemd（重要！）

OpenClaw的Gateway服务需要systemd才能运行。WSL2默认没启用，需要手动开启。

**在WSL2终端里**输入：

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

然后回到**PowerShell**，重启WSL：

```powershell
wsl --shutdown
```

重新打开Ubuntu，验证systemd：

```bash
systemctl --user status
```

如果没报错，说明systemd已经启用了。

---

### 步骤5：在WSL2里安装OpenClaw

现在Ubuntu环境已经准备好了，可以开始安装OpenClaw了。

**在WSL2终端里**：

```bash
# 更新包管理器
sudo apt update && sudo apt upgrade -y

# 安装Node.js和npm
sudo apt install -y nodejs npm

# 克隆OpenClaw仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 安装依赖
pnpm install

# 构建UI
pnpm ui:build

# 构建项目
pnpm build

# 运行新手引导
openclaw onboard
```

`openclaw onboard`会带你完成剩余的配置，包括设置Gateway服务。

---

## 三、安装Gateway服务

### 方法1：通过onboard安装（推荐）

在`openclaw onboard`过程中，选择"Install Gateway service"选项。

### 方法2：手动安装

```bash
# 在WSL2终端里
openclaw gateway install
```

或者：

```bash
openclaw configure
# 选择"Gateway service"
```

### 验证安装

```bash
# 检查Gateway状态
openclaw status

# 查看日志
openclaw logs --follow
```

---

## 四、Windows和WSL2的文件互通

### 访问Windows文件

在WSL2里，Windows的C盘挂载在`/mnt/c`：

```bash
# 访问Windows的桌面
cd /mnt/c/Users/你的用户名/Desktop

# 访问Windows的文档
cd /mnt/c/Users/你的用户名/Documents
```

### 访问WSL2文件

在Windows里，WSL2的文件系统可以通过`\\wsl$`访问：

1. 按`Win + R`，输入`\\wsl$`
2. 找到你的发行版（比如Ubuntu）
3. 进入`home/你的用户名`

---

## 五、Windows特有问题与解决方案

### 问题1：WSL2 IP地址会变

WSL2每次重启，IP地址都可能变。如果你想从Windows宿主机访问WSL2里的服务（比如Gateway），需要设置端口转发。

**PowerShell（管理员）**：

```powershell
# 获取WSL IP
$WslIp = (wsl -d Ubuntu-24.04 -- hostname -I).Trim().Split(" ")[0]

# 设置端口转发（以18789为例）
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=18789 `
  connectaddress=$WslIp connectport=18789

# 允许防火墙通过
New-NetFirewallRule -DisplayName "OpenClaw Gateway 18789" -Direction Inbound `
  -Protocol TCP -LocalPort 18789 -Action Allow
```

**每次WSL重启后都要重新设置**。如果你嫌麻烦，可以写个脚本：

**PowerShell脚本（`refresh-wsl-portproxy.ps1`）**：

```powershell
$Distro = "Ubuntu-24.04"
$ListenPort = 18789
$TargetPort = 18789

$WslIp = (wsl -d $Distro -- hostname -I).Trim().Split(" ")[0]
if (-not $WslIp) { throw "WSL IP not found." }

# 删除旧规则
netsh interface portproxy delete v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 | Out-Null

# 添加新规则
netsh interface portproxy add v4tov4 listenport=$ListenPort listenaddress=0.0.0.0 `
  connectaddress=$WslIp connectport=$TargetPort | Out-Null

Write-Host "Port proxy updated: 0.0.0.0:$ListenPort -> $WslIp:$TargetPort"
```

---

### 问题2：PowerShell vs WSL命令对照

很多OpenClaw命令需要在WSL2里运行，不能用PowerShell。以下是对照表：

| 操作 | PowerShell | WSL2 |
|------|-----------|------|
| 进入项目目录 | `cd C:\Users\...\openclaw` | `cd ~/openclaw` |
| 列出文件 | `ls` 或 `dir` | `ls` |
| 查看文件内容 | `type file.txt` | `cat file.txt` |
| 编辑文件 | `notepad file.txt` | `nano file.txt` |
| 复制文件 | `copy a b` | `cp a b` |
| 移动文件 | `move a b` | `mv a b` |
| 删除文件 | `del file.txt` | `rm file.txt` |
| 查看进程 | `tasklist` | `ps aux` |
| 杀死进程 | `taskkill /PID 1234` | `kill 1234` |
| 管理员权限 | 右键"以管理员运行" | `sudo` |

---

### 问题3：终端选择

WSL2默认用的终端比较简陋，建议用更好的终端：

**Windows Terminal（推荐）**：
1. 从Microsoft Store免费下载
2. 支持多标签页、自定义主题
3. 对WSL2支持很好

**VS Code集成**：
1. 安装VS Code
2. 安装"WSL"扩展
3. 在VS Code里按`Ctrl+Shift+P`，输入"WSL：New Window"
4. 可以直接在VS Code里用WSL2

---

## 六、常见问题速查

### Q：我双击.exe文件，为什么在WSL2里不能运行？

A：WSL2是Linux环境，不能直接运行Windows的.exe。你需要：
1. 在Windows里运行.exe
2. 或者在WSL2里找Linux替代品

### Q：为什么我在WSL2里访问不到D盘？

A：D盘可能没挂载。检查一下：

```bash
ls /mnt/d
```

如果不存在，手动挂载：

```bash
sudo mkdir /mnt/d
sudo mount -t drvfs D: /mnt/d
```

### Q：WSL2占用太多磁盘空间怎么办？

A：WSL2的虚拟硬盘会自动扩展，但不会自动收缩。可以手动压缩：

```powershell
# 在PowerShell（管理员）里运行
wsl --manage Ubuntu-24.04 --set-sparse true
```

### Q：我想卸载WSL2怎么办？

A：

```powershell
# 查看已安装的发行版
wsl --list --verbose

# 卸载特定发行版
wsl --unregister Ubuntu-24.04

# 完全卸载WSL
wsl --unregister <所有发行版>
# 然后在"启用或关闭Windows功能"里取消"适用于Linux的Windows子系统"
```

---

## 七、快捷命令速查卡

把这张卡片贴在显示器旁边，经常用到：

```bash
# WSL2相关（PowerShell）
wsl --list --online              # 查看可用的发行版
wsl --install -d Ubuntu-24.04    # 安装特定发行版
wsl --shutdown                   # 重启WSL
wsl -d Ubuntu-24.04              # 进入特定的WSL发行版

# OpenClaw相关（WSL2里）
openclaw status                  # 查看状态
openclaw logs --follow           # 查看日志
openclaw doctor                  # 诊断问题
openclaw gateway restart         # 重启Gateway

# 文件路径快速转换
# Windows: C:\Users\你的用户名\Desktop
# WSL2:    /mnt/c/Users/你的用户名/Desktop
```

---

## 八、下一步？

装好之后，回到主书的第二章，跟着"第一次运行OpenClaw"走一遍。

如果有任何问题，可以：
1. 查看[附录A：故障排除指南](./附录A-故障排除指南.md)
2. 在GitHub提issue（记得说你是Windows+WSL2环境）

---

## 最后的话

是的，Windows用户确实要绕一点弯子。但一旦WSL2装好了，后面就顺畅了。而且你会意外地发现：Linux开发环境其实挺好用的。

祝你在Windows上用OpenClaw愉快！

---

*如果你是Windows用户，这一章帮到你的话，或者你遇到了其他Windows特有问题，欢迎反馈！*
