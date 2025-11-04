# 部署到 GitHub Pages 指南

本文档提供了将项目部署到 GitHub Pages 的完整步骤。

## 前置要求

- GitHub 账户
- 项目已推送到 GitHub 仓库
- 本地安装了 Git

## 自动部署方式（推荐）

### 步骤 1: 更新仓库名配置

如果你的 GitHub 仓库名不是 `在线发票开具小程序`，需要修改 `vite.config.ts` 文件：

```typescript
base: mode === 'production' ? '/你的仓库名/' : '/',
```

将 `/在线发票开具小程序/` 替换为你的实际仓库名。

**注意：** 如果你使用的是用户/组织站点（如 `username.github.io`），则 `base` 应该设置为 `'/'`。

### 步骤 2: 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 添加所有文件
git add .

# 提交更改
git commit -m "配置 GitHub Pages 部署"

# 推送到 main 分支
git push -u origin main
```

### 步骤 3: 在 GitHub 上配置 Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Source**（来源）下拉菜单中，选择 **GitHub Actions**

### 步骤 4: 触发部署

部署会在以下情况自动触发：
- 推送到 `main` 分支时
- 在 GitHub 仓库的 **Actions** 标签页手动触发

首次配置后，需要：
1. 进入仓库的 **Actions** 标签页
2. 选择 "部署到 GitHub Pages" 工作流
3. 点击 **Run workflow** 按钮
4. 等待构建和部署完成（通常需要 1-2 分钟）

### 步骤 5: 访问你的网站

部署成功后，你的网站将在以下地址可用：
```
https://你的用户名.github.io/你的仓库名/
```

## 手动部署方式（备选）

如果你不想使用 GitHub Actions，可以使用 `gh-pages` 包手动部署。

### 1. 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. 在 package.json 中添加部署脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

### 3. 执行部署

```bash
npm run deploy
```

这会自动构建项目并将 `dist` 目录的内容推送到 `gh-pages` 分支。

### 4. 在 GitHub 配置 Pages

1. 访问仓库的 **Settings** > **Pages**
2. 在 **Source** 中选择 `gh-pages` 分支
3. 点击 **Save**（保存）

## 环境变量配置

如果你的项目使用了环境变量（如 Gemini API Key），需要在 GitHub 中配置：

1. 进入仓库的 **Settings** > **Secrets and variables** > **Actions**
2. 点击 **New repository secret**
3. 添加你的环境变量：
   - Name: `GEMINI_API_KEY`
   - Value: 你的 API 密钥

然后在 `.github/workflows/deploy.yml` 的构建步骤中添加：

```yaml
- name: 构建项目
  run: npm run build
  env:
    NODE_ENV: production
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

## 常见问题

### 1. 页面显示 404

- 确认 GitHub Pages 已启用
- 检查 `vite.config.ts` 中的 `base` 路径是否正确
- 等待几分钟，GitHub Pages 部署可能需要一些时间

### 2. 静态资源加载失败

- 确认 `base` 配置正确，必须以 `/` 开头和结尾
- 确认构建时使用了 `production` 模式

### 3. 部署失败

- 检查 GitHub Actions 日志查看错误信息
- 确认 GitHub Pages 权限已正确配置
- 确认 `npm install` 和 `npm run build` 在本地可以成功运行

## 更新部署

每次推送到 `main` 分支时，网站会自动重新部署。如果使用手动部署方式，运行：

```bash
npm run deploy
```

## 自定义域名（可选）

1. 在项目根目录创建 `public/CNAME` 文件
2. 文件内容为你的域名（如 `example.com`）
3. 在你的域名提供商配置 DNS：
   - 添加 CNAME 记录指向 `你的用户名.github.io`
4. 在 GitHub Pages 设置中输入自定义域名

---

部署成功后，你就可以通过 GitHub Pages 访问你的在线发票开具小程序了！🎉

