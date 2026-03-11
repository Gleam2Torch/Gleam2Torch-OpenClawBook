import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw 实战指南",
  description: "一人公司的 AI 智能体实战指南",
  lang: 'zh-CN',
  base: '/Gleam2Torch-OpenClawBook/',

  head: [
    ['meta', { name: 'author', content: 'Gleam2Torch' }]
  ],

  themeConfig: {
    siteTitle: 'OpenClaw 实战指南',

    nav: [
      { text: '首页', link: '/' },
      { text: '认知觉醒', link: '/第一部分-认知觉醒篇/第1章-一人公司的困境与OpenClaw/1.1-一人公司：困境与两难' },
      { text: '动手实践', link: '/第二部分-动手实践篇/第3章-30分钟部署OpenClaw/3.1-准备工作' },
      { text: '进阶实战', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.1-渠道接入概述' },
      { text: '微芒成炬', link: '/第四部分-微芒成炬篇/第12章-微芒成炬的故事/12.1-故事从一个困境开始' },
      { text: 'GitHub', link: 'https://github.com/Gleam2Torch/Gleam2Torch-OpenClawBook' }
    ],

    sidebar: [
      {
        text: '第一部分：认知觉醒篇',
        collapsed: false,
        items: [
          {
            text: '第1章 一人公司的困境与OpenClaw',
            collapsed: false,
            items: [
              { text: '1.1 一人公司：困境与两难', link: '/第一部分-认知觉醒篇/第1章-一人公司的困境与OpenClaw/1.1-一人公司：困境与两难' },
              { text: '1.2 OpenClaw：破局的AI智能体', link: '/第一部分-认知觉醒篇/第1章-一人公司的困境与OpenClaw/1.2-OpenClaw：破局的AI智能体' }
            ]
          },
          {
            text: '第2章 OpenClaw的核心原理',
            collapsed: false,
            items: [
              { text: '2.1 AI Agent的灵魂：八个引导文件', link: '/第一部分-认知觉醒篇/第2章-OpenClaw的核心原理/2.1-AI Agent的灵魂：八个引导文件' },
              { text: '2.2 时间的感知：Heartbeat与Cron', link: '/第一部分-认知觉醒篇/第2章-OpenClaw的核心原理/2.2-时间的感知：Heartbeat与Cron' },
              { text: '2.3 记忆与进化：Memory与Skills', link: '/第一部分-认知觉醒篇/第2章-OpenClaw的核心原理/2.3-记忆与进化：Memory与Skills' }
            ]
          }
        ]
      },
      {
        text: '第二部分：动手实践篇',
        collapsed: false,
        items: [
          {
            text: '第3章 30分钟部署OpenClaw',
            collapsed: false,
            items: [
              { text: '3.1 准备工作', link: '/第二部分-动手实践篇/第3章-30分钟部署OpenClaw/3.1-准备工作' },
              { text: '3.2 一键部署', link: '/第二部分-动手实践篇/第3章-30分钟部署OpenClaw/3.2-一键部署' },
              { text: '3.3 验证部署成功', link: '/第二部分-动手实践篇/第3章-30分钟部署OpenClaw/3.3-验证部署成功' }
            ]
          },
          {
            text: '第4章 与OpenClaw的第一次对话',
            collapsed: false,
            items: [
              { text: '4.1 从简单的开始', link: '/第二部分-动手实践篇/第4章-与OpenClaw的第一次对话/4.1-从简单的开始' },
              { text: '4.2 让它帮你做事', link: '/第二部分-动手实践篇/第4章-与OpenClaw的第一次对话/4.2-让它帮你做事' },
              { text: '4.3 进阶多步骤任务', link: '/第二部分-动手实践篇/第4章-与OpenClaw的第一次对话/4.3-进阶多步骤任务' }
            ]
          },
          {
            text: '第5章 让AI真正帮上忙',
            collapsed: false,
            items: [
              { text: '5.1 设置定时提醒', link: '/第二部分-动手实践篇/第5章-让AI真正帮上忙/5.1-设置定时提醒' },
              { text: '5.2 记住重要信息', link: '/第二部分-动手实践篇/第5章-让AI真正帮上忙/5.2-记住重要信息' },
              { text: '5.3 查看AI的记忆', link: '/第二部分-动手实践篇/第5章-让AI真正帮上忙/5.3-查看AI的记忆' }
            ]
          },
          {
            text: '第6章 实战场景集锦',
            collapsed: false,
            items: [
              { text: '6.1 每日信息助手', link: '/第二部分-动手实践篇/第6章-实战场景集锦/6.1-每日信息助手' },
              { text: '6.2 阅读摘要助手', link: '/第二部分-动手实践篇/第6章-实战场景集锦/6.2-阅读摘要助手' },
              { text: '6.3 更多场景启发', link: '/第二部分-动手实践篇/第6章-实战场景集锦/6.3-更多场景启发' }
            ]
          }
        ]
      },
      {
        text: '第三部分：进阶实战篇',
        collapsed: true,
        items: [
          {
            text: '第7章 国内IM渠道接入',
            items: [
              { text: '7.1 渠道接入概述', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.1-渠道接入概述' },
              { text: '7.2 飞书接入', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.2-飞书接入' },
              { text: '7.3 企业微信接入', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.3-企业微信接入' },
              { text: '7.4 钉钉接入', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.4-钉钉接入' },
              { text: '7.5 QQ接入', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.5-QQ接入' },
              { text: '7.6 多渠道路由规则', link: '/第三部分-进阶实战篇/第7章-国内IM渠道接入/7.6-多渠道路由规则' }
            ]
          },
          {
            text: '第8章 多Agent协作',
            items: [
              { text: '8.1 为什么需要多Agent', link: '/第三部分-进阶实战篇/第8章-多Agent协作/8.1-为什么需要多Agent' },
              { text: '8.2 工作区物理隔离', link: '/第三部分-进阶实战篇/第8章-多Agent协作/8.2-工作区物理隔离' },
              { text: '8.3 Agent间通信', link: '/第三部分-进阶实战篇/第8章-多Agent协作/8.3-Agent间通信' },
              { text: '8.4 路由配置', link: '/第三部分-进阶实战篇/第8章-多Agent协作/8.4-路由配置' },
              { text: '8.5 实战搭建AI团队', link: '/第三部分-进阶实战篇/第8章-多Agent协作/8.5-实战搭建AI团队' }
            ]
          },
          {
            text: '第9章 Skills技能系统',
            items: [
              { text: '9.1 什么是Skills', link: '/第三部分-进阶实战篇/第9章-Skills技能系统/9.1-什么是Skills' },
              { text: '9.2 从ClawHub安装技能', link: '/第三部分-进阶实战篇/第9章-Skills技能系统/9.2-从ClawHub安装技能' },
              { text: '9.3 编写自己的技能', link: '/第三部分-进阶实战篇/第9章-Skills技能系统/9.3-编写自己的技能' },
              { text: '9.4 技能配置优先级', link: '/第三部分-进阶实战篇/第9章-Skills技能系统/9.4-技能配置优先级' },
              { text: '9.5 Skills安全审计', link: '/第三部分-进阶实战篇/第9章-Skills技能系统/9.5-Skills安全审计' }
            ]
          },
          {
            text: '第10章 浏览器自动化',
            items: [
              { text: '10.1 两种浏览器模式', link: '/第三部分-进阶实战篇/第10章-浏览器自动化/10.1-两种浏览器模式' },
              { text: '10.2 托管浏览器配置', link: '/第三部分-进阶实战篇/第10章-浏览器自动化/10.2-托管浏览器配置' },
              { text: '10.3 登录态持久化', link: '/第三部分-进阶实战篇/第10章-浏览器自动化/10.3-登录态持久化' },
              { text: '10.4 实战自动发帖', link: '/第三部分-进阶实战篇/第10章-浏览器自动化/10.4-实战自动发帖' },
              { text: '10.5 常见问题排查', link: '/第三部分-进阶实战篇/第10章-浏览器自动化/10.5-常见问题排查' }
            ]
          },
          {
            text: '第11章 知识管理与Obsidian',
            items: [
              { text: '11.1 为什么是Obsidian', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.1-为什么是Obsidian' },
              { text: '11.2 用Obsidian管理工作区', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.2-用Obsidian管理工作区' },
              { text: '11.3 Obsidian增强技巧', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.3-Obsidian增强技巧' },
              { text: '11.4 记忆系统深入', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.4-记忆系统深入' },
              { text: '11.5 软链接与多Agent知识共享', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.5-软链接与多Agent知识共享' },
              { text: '11.6 备份与同步', link: '/第三部分-进阶实战篇/第11章-知识管理与Obsidian/11.6-备份与同步' }
            ]
          }
        ]
      },
      {
        text: '第四部分：微芒成炬篇',
        collapsed: true,
        items: [
          {
            text: '第12章 微芒成炬的故事',
            items: [
              { text: '12.1 故事从一个困境开始', link: '/第四部分-微芒成炬篇/第12章-微芒成炬的故事/12.1-故事从一个困境开始' },
              { text: '12.2 我们在做什么', link: '/第四部分-微芒成炬篇/第12章-微芒成炬的故事/12.2-我们在做什么' }
            ]
          },
          {
            text: '第13章 写给未来的你',
            items: [
              { text: '13.1 一人公司的真正出路', link: '/第四部分-微芒成炬篇/第13章-写给未来的你/13.1-一人公司的真正出路' },
              { text: '13.2 Agent时代，个体不可替代的是什么', link: '/第四部分-微芒成炬篇/第13章-写给未来的你/13.2-Agent时代，个体不可替代的是什么' },
              { text: '13.3 写给未来的我，和你', link: '/第四部分-微芒成炬篇/第13章-写给未来的你/13.3-写给未来的我，和你' }
            ]
          }
        ]
      },
      {
        text: '附录',
        collapsed: true,
        items: [
          { text: '附录A 故障排除指南', link: '/附录A-故障排除指南' },
          { text: '附录B Windows用户专属指南', link: '/附录B-Windows用户专属指南' },
          { text: '附录C 隐私与安全指南', link: '/附录C-隐私与安全指南' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Gleam2Torch/Gleam2Torch-OpenClawBook' }
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 Gleam2Torch'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  }
})
