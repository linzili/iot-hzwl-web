## [v0.0.22](https://github.com/linzili/iot-hzwl-web/compare/v0.0.21...v0.0.22)

### ✨Features

- 页面底部添加备案信息 [#55](https://github.com/linzili/iot-hzwl-web/issues/55)

### 🐳chore

- 修改CI流水线

## [v0.0.21](https://github.com/linzili/iot-hzwl-web/compare/v0.0.20...v0.0.21)

### 🐞Fixed

- 修复CI脚本

## [v0.0.20](https://github.com/linzili/iot-hzwl-web/compare/v0.0.19...v0.0.20)

### 🐞Fixed

- 修复release脚本

## [v0.0.19](https://github.com/linzili/iot-hzwl-web/compare/v0.0.18...v0.0.19)

### 🐞Fixed

- 修复串口映射在切换菜单后配置丢失的问题 [#45](https://github.com/linzili/iot-hzwl-web/issues/45)
- 修复当读取完成后再次点击读取，正常读取有时候会出现提示读取失败的情况 [#47](https://github.com/linzili/iot-hzwl-web/issues/47)

### 🐳chore

- 移除tauri、修改release流水线 [#50](https://github.com/linzili/iot-hzwl-web/issues/50)

## [v0.0.18](https://github.com/linzili/iot-hzwl-web/compare/v0.0.17...v0.0.18)

### ✨Features

- 添加dayUtil工具扩展dayjs

### 🐞Fixed

- modbus发送读取指令后获取不到上报数据 [#41](https://github.com/linzili/iot-hzwl-web/issues/41)

## [v0.0.17](https://github.com/linzili/iot-hzwl-web/compare/v0.0.16...v0.0.17)

### 🐞Fixed

- 修复打开串口映射没有反应的问题 [#38](https://github.com/linzili/iot-hzwl-web/issues/38)

## [v0.0.16](https://github.com/linzili/iot-hzwl-web/compare/v0.0.15...v0.0.16)

### ✨Features

- 根据所在菜单动态修改网站的title标题 [#31](https://github.com/linzili/iot-hzwl-web/pull/31)

### 🐞Fixed

- modbus解析: 移除读取测试默认值 [#32](https://github.com/linzili/iot-hzwl-web/pull/32)

### 🐎CI

- 部署机器: 修改部署到云端的机器 [#34](https://github.com/linzili/iot-hzwl-web/pull/34)

### 🐳Chore

- 依赖版本: 升级vue到3.4.30 [#35](https://github.com/linzili/iot-hzwl-web/pull/35)

## [v0.0.15](https://github.com/linzili/iot-hzwl-web/compare/v0.0.14...v0.0.15)

### ✨Features

- 实现Modbus数据解析的功能
    - 通过配置生成读取命令
    - 实现数据解析功能，可以通过配置解析数据，支持多个配置
- 添加tailwindcss`宽度`变量
- 添加多种数据转换方法
- 连接测试工具发送HEX格式数据时允许输入空格，发送时自动移除

## [v0.0.14](https://github.com/linzili/iot-hzwl-web/compare/v0.0.13...v0.0.14)

### 🐞Fixed

- 修复物联工具标题显示异常的问题

## [v0.0.13](https://github.com/linzili/iot-hzwl-web/compare/v0.0.12...v0.0.13)

### ✨Features

- 实现顶部显示顶级菜单
- 实现通过不同的顶级菜单显示左侧二级及以下菜单

### 🦄 refactor

- 优化network-tools组件，通过路由跳转不同组件

## [v0.0.12](https://github.com/linzili/iot-hzwl-web/compare/v0.0.11...v0.0.12)

### ✨Features

- 重构连接测试组件 [#12](https://github.com/linzili/iot-hzwl-web/issues/12)
- 实现串口工具hooks封装
- 添加页面路由
- 实现串口映射功能 [#11](https://github.com/linzili/iot-hzwl-web/issues/11)
- 添加layout布局
- 添加顶部菜单

### 🦄 refactor

- 移除quick-operator组件，移动到NetworkDebugger组件中，每个快捷操作创建独立组件，减少嵌套

## [v0.0.11](https://github.com/linzili/iot-hzwl-web/compare/v0.0.10...v0.0.11)

### ✨Features

- 网络调试页面-消息展示方式改为选择hex和ascii [#8](https://github.com/linzili/iot-hzwl-web/issues/8)

## [v0.0.10](https://github.com/linzili/iot-hzwl-web/compare/v0.0.9...v0.0.10)

### Perf

- 优化网络调试工具打开连接时的加载状态

## [v0.0.9](https://github.com/linzili/iot-hzwl-web/compare/v0.0.8...v0.0.9)

### Test

- 测试工作流

## [v0.0.8](https://github.com/linzili/iot-hzwl-web/compare/v0.0.7...v0.0.8)

### Test

- 测试工作流

## [v0.0.7](https://github.com/linzili/iot-hzwl-web/compare/v0.0.6...v0.0.7)

### Test

- 测试工作流

## [v0.0.6](https://github.com/linzili/iot-hzwl-web/compare/v0.0.6...v0.0.5)

### Test

- 测试工作流

## [v0.0.5](https://github.com/linzili/iot-hzwl-web/compare/v0.0.5...v0.0.4)

### Test

- 测试工作流

## [v0.0.4](https://github.com/linzili/iot-hzwl-web/compare/v0.0.4...v0.0.3)

### Bug Fixes

- 修复changelog匹配版本号的正则表达式错误的问题

### Dependency Upgrades

- 升级ci/cd、 release 流水线的依赖版本

## [v0.0.3](https://github.com/linzili/iot-hzwl-web/compare/v0.0.3...v0.0.2)

### Bug Fixes

- 修复changelog匹配版本号的正则表达式错误的问题

### Dependency Upgrades

- 升级ci/cd、 release 流水线的依赖版本

## [v0.0.2](https://github.com/linzili/iot-hzwl-web/releases/tag/v0.0.1)

### Bug Fixes

- 修复changelog匹配版本号的正则表达式错误的问题

### Dependency Upgrades

- 升级ci/cd、 release 流水线的依赖版本

## [v0.0.1](https://github.com/linzili/iot-hzwl-web/releases/tag/v0.0.1)

### Features

- 实现网络调试工具的功能
- 实现桌面端的打包编译
