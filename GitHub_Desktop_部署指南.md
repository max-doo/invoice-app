# 使用 GitHub Desktop 部署到 GitHub Pages

本指南将帮助您使用 GitHub Desktop 将发票应用程序部署到 GitHub Pages。

## 📋 前置准备

1. ✅ 安装 [GitHub Desktop](https://desktop.github.com/)
2. ✅ 注册 [GitHub 账户](https://github.com/)
3. ✅ 在 GitHub Desktop 中登录您的账户

---

## 🚀 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. 打开 **GitHub Desktop**
2. 点击菜单 `File` → `Add local repository` (或 `文件` → `添加本地仓库`)
3. 点击 `Choose...` 按钮，选择项目文件夹：`C:\Users\DMX\Desktop\invoice-app`
4. 如果提示 "This directory does not appear to be a Git repository"，点击 `create a repository`
5. 在弹出的窗口中：
   - **Name**: `invoice-app` (仓库名称，已自动填写)
   - **Description**: `在线发票开具应用` (可选)
   - **Git Ignore**: `Node`
   - ✅ 勾选 `Initialize this repository with a README`
6. 点击 `Create Repository` 按钮

### 步骤 2: 检查配置文件

在继续之前，确认 `vite.config.ts` 中的仓库名称配置正确：

```typescript
base: mode === 'production' ? '/invoice-app/' : '/',
```

**重要**：
- `/invoice-app/` 应该与您的 GitHub 仓库名称一致
- 必须以 `/` 开头和结尾
- 如果您的仓库名不是 `invoice-app`，请修改此配置

### 步骤 3: 提交代码到本地仓库

1. 在 GitHub Desktop 左下角的 "Summary" 框中输入提交信息：
   ```
   初始提交：配置 GitHub Pages 部署
   ```

2. (可选) 在 "Description" 框中添加详细描述：
   ```
   - 配置 Vite 生产环境
   - 添加 GitHub Actions 自动部署
   - 准备发布到 GitHub Pages
   ```

3. 点击蓝色的 `Commit to main` 按钮

### 步骤 4: 发布仓库到 GitHub

1. 点击顶部的 `Publish repository` 按钮
2. 在弹出窗口中：
   - **Name**: `invoice-app`
   - **Description**: `在线发票开具应用`
   - ⚠️ 取消勾选 `Keep this code private`（如果想公开）
   - 或者保持勾选（如果想私有，但需要 GitHub Pro 账户）
3. 点击 `Publish Repository` 按钮

等待上传完成（可能需要几秒到几分钟，取决于网络速度）。

### 步骤 5: 在 GitHub 网站上启用 Pages

1. 上传完成后，点击 GitHub Desktop 顶部的 `Repository` → `View on GitHub`
2. 这将在浏览器中打开您的 GitHub 仓库
3. 在仓库页面，点击 `Settings`（设置）标签
4. 在左侧菜单找到并点击 `Pages`
5. 在 **Source** (来源) 部分：
   - 选择 `GitHub Actions`
6. 页面会自动保存设置

### 步骤 6: 触发首次部署

1. 在仓库页面，点击 `Actions` 标签
2. 您会看到 "部署到 GitHub Pages" 工作流
3. 如果工作流还没有运行：
   - 点击左侧的 "部署到 GitHub Pages" 工作流
   - 点击右侧的 `Run workflow` 下拉按钮
   - 选择 `main` 分支
   - 点击绿色的 `Run workflow` 按钮
4. 等待部署完成（通常 1-3 分钟）
   - ✅ 绿色勾号表示部署成功
   - ❌ 红色叉号表示部署失败（点击查看错误日志）

### 步骤 7: 访问您的网站 🎉

部署成功后，您的应用将在以下地址可用：

```
https://您的GitHub用户名.github.io/invoice-app/
```

例如，如果您的用户名是 `DMX`，访问地址就是：
```
https://DMX.github.io/invoice-app/
```

您也可以在 `Settings` → `Pages` 页面顶部看到网站地址。

---

## 🔄 后续更新部署

每次修改代码后，使用 GitHub Desktop 同步：

### 方法 1: 自动部署（推荐）

1. 在代码编辑器中修改代码
2. 打开 GitHub Desktop，它会自动检测到更改
3. 在左下角输入提交信息（例如：`修复发票金额计算bug`）
4. 点击 `Commit to main`
5. 点击顶部的 `Push origin` 按钮（向上箭头图标）
6. 代码推送后，GitHub Actions 会自动构建和部署
7. 等待 1-3 分钟，刷新网站即可看到更新

### 方法 2: 手动本地部署（备选）

如果您想手动部署而不使用 GitHub Actions：

1. 首先安装 `gh-pages` 包：
   ```bash
   npm install --save-dev gh-pages
   ```

2. 在项目目录打开命令行（PowerShell 或 CMD）

3. 运行部署命令：
   ```bash
   npm run deploy
   ```

4. 在 GitHub Settings → Pages，Source 选择 `gh-pages` 分支

---

## ❓ 常见问题

### 问题 1: GitHub Desktop 提示 "Authentication failed"

**解决方法**：
1. 在 GitHub Desktop 中，点击 `File` → `Options` → `Accounts`
2. 点击 `Sign out`，然后重新 `Sign in`
3. 按照提示在浏览器中完成授权

### 问题 2: 访问网站显示 404 错误

**可能原因**：
- ✅ 确认 GitHub Pages 已在 Settings → Pages 中启用
- ✅ 检查 `vite.config.ts` 中的 `base` 路径是否正确
- ✅ 等待 5-10 分钟，GitHub Pages 可能需要时间生效
- ✅ 确保访问的 URL 格式正确（包含仓库名）

### 问题 3: 页面显示但样式和图片丢失

**解决方法**：
- 检查 `vite.config.ts` 中的 `base` 配置
- 确保 `base` 以 `/` 开头和结尾，例如：`/invoice-app/`
- 重新构建和部署

### 问题 4: GitHub Actions 部署失败

**解决方法**：
1. 在 Actions 标签页点击失败的工作流
2. 查看错误日志
3. 常见原因：
   - 依赖安装失败：检查 `package.json` 是否正确
   - 构建失败：在本地运行 `npm run build` 测试
   - 权限问题：检查 Settings → Actions → General 中的权限设置

### 问题 5: 推送时速度很慢

**解决方法**：
- 检查网络连接
- 考虑使用科学上网工具
- 或者使用国内的 Git 镜像服务

---

## 📌 重要提示

1. **仓库名必须匹配**：
   - `vite.config.ts` 中的 `base` 路径
   - GitHub 仓库的实际名称
   - 两者必须完全一致

2. **分支名称**：
   - 确保您的主分支名为 `main`
   - 如果是 `master`，需要修改 `.github/workflows/deploy.yml` 第 6 行

3. **环境变量**：
   - 如果使用了 Gemini API，需要在 GitHub 仓库中配置密钥
   - Settings → Secrets and variables → Actions → New repository secret
   - 添加 `GEMINI_API_KEY`

4. **首次部署**：
   - 可能需要 5-10 分钟才能访问
   - 后续更新通常只需要 1-3 分钟

---

## 🎯 部署检查清单

部署前请确认：

- [ ] GitHub Desktop 已安装并登录
- [ ] `vite.config.ts` 中的 `base` 路径正确
- [ ] 所有文件已提交到本地仓库
- [ ] 代码已推送到 GitHub 远程仓库
- [ ] Settings → Pages 中已选择 "GitHub Actions"
- [ ] Actions 工作流已成功运行
- [ ] 可以访问 `https://用户名.github.io/仓库名/`

---

## 📚 相关资源

- [GitHub Desktop 官方文档](https://docs.github.com/en/desktop)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署文档](https://vitejs.dev/guide/static-deploy.html)
- 项目详细部署文档：`DEPLOY.md`

---

**祝您部署顺利！** 🎉

如有问题，请参考 `DEPLOY.md` 或在 GitHub Issues 中提问。

