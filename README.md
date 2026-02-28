# RoboSim

RoboSim 是一个基于 React 的机器人运动仿真平台，支持 3D 可视化、实时数据仪表、运动控制与状态监控。该项目适合学习与展示机械臂运动原理或前端三维可视化技术。

![机械臂仿真主界面](assets/screenshot.png)

## 功能亮点
- 🤖 **机械臂仿真**：多关节运动模拟，参数可调节
- 🖼️ **3D 可视化**：采用 react-three-fiber 展示机器人及仿真环境
- 📈 **数据仪表盘**：实时显示关节角度、力、速度等状态变化
- ⏯️ **仿真控制**：支持播放、暂停、快进等操作
- 🕹️ **用户交互**：滑块调整关节，查看终端日志

## 技术栈
- React + TypeScript
- Vite 前端构建
- react-three-fiber 三维渲染
- recharts 数据可视化
- TailwindCSS UI 风格

## 快速开始
1. **克隆代码库**
   ```bash
   git clone https://github.com/youyouhe/RoboSim.git
   cd RoboSim
   ```
2. **安装依赖**
   ```bash
   npm install
   ```
3. **启动项目**
   ```bash
   npm run dev
   ```
   浏览器访问 http://localhost:5173 查看效果。

## 主要目录结构
```text
src/
├── App.tsx           # 仿真主逻辑与页面结构
├── components/       # 仪表盘、模拟器等 UI 组件
├── lib/              # 工具函数
├── index.css         # 全局样式
├── main.tsx          # 应用入口
├── assets/           # 图片素材
```

## 贡献与开发
你可以提出 issue 或 PR 参与功能开发或优化体验。
如需本地开发、定制参数或对接实际机器人 API，请 fork 后自行扩展。

## License
MIT