# 🌐 VueBlocks 持续集成与 GitHub Pages 部署指南

本项目已配置基于 **GitHub Actions**
的全自动持续集成与部署流水线，可在同一个域名下聚合托管**组件库文档站点**与**在线演示**。

---

## 💡 托管架构方案

GitHub Pages 为每个项目分配默认根路径：\
`https://<你的GitHub用户名>.github.io/<仓库名>/`

我们采用**聚合式静态部署架构**：

- **文档站点（VitePress）**：部署在根路径 `https://<用户名>.github.io/<仓库名>/`
- **演示站点**：部署在子路径 `https://<用户名>.github.io/<仓库名>/examples/`
- **工程化保障**：
  - `examples/vite.config.js` 配置了相对基准路径
    `base: './'`，静态资源在任意子路径下均能正常加载；
  - `docs/.vitepress/config.mts` 支持自适应 Base 注入，顶栏「在线演示」自动指向
    `/examples/`；
  - 根目录 `package.json` 中的 `pnpm run build:pages`
    命令自动将示例产物聚合到文档发布目录。

---

## 📋 初次提交与部署流程

### 第一步：在 GitHub 上创建空白仓库

1. 访问 GitHub，新建公开仓库（Repository Name 建议填写 `vue-blocks`）；
2. **切勿勾选** "Add a README file"、".gitignore" 等初始化选项，保持空仓库；
3. 复制该仓库的 Git 地址（如
   `https://github.com/<你的用户名>/vue-blocks.git`）。

### 第二步：提交本地代码并推送

在项目根目录打开终端，依次执行：

```bash
# 暂存所有文件
git add .

# 提交本地提交
git commit -m "feat: initial commit"

# 关联 GitHub 远程仓库（请替换为自己的真实地址）
git remote add origin https://github.com/<你的用户名>/vue-blocks.git

# 推送代码至 main 分支
git push -u origin main
```

### 第三步：开启 GitHub Pages (GitHub Actions 模式)

代码推送成功后，进入 GitHub 仓库页面进行配置：

1. 点击仓库顶部菜单栏的 **Settings**（设置）；
2. 在左侧菜单栏选择 **Pages**（位于 Code and automation 分组）；
3. 在 **Build and deployment** 下方的 **Source** 下拉菜单中，将
   `Deploy from a branch` 改为 👉 **`GitHub Actions`**。

### 第四步：查看部署进度与验证访问

1. 点击仓库顶部的 **Actions** 标签页，查看正在运行的
   `Deploy Documentation & Examples to GitHub Pages` 流水线；
2. 约 1~2 分钟构建完成后（出现绿色对勾 ✅），即可访问：
   - 📖 **组件库文档站点**：`https://<你的用户名>.github.io/<仓库名>/`
   - 🎮 **在线演示**：`https://<你的用户名>.github.io/<仓库名>/examples/`

---

## 🔄 日常迭代维护

后续任何代码修改只需提交并推送到 `main` 分支，GitHub Actions
将会自动检测并重新执行全量打包发布，线上站点将实时更新：

```bash
git add .
git commit -m "feat: update components"
git push origin main
```
