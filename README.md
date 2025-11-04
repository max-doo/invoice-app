<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 在线发票开具小程序

这是一个基于 React + TypeScript + Vite 构建的在线发票开具应用。

View your app in AI Studio: https://ai.studio/apps/drive/1K63H-J2bnY_qsDDyfNjUmvFt3JpiSzw7

## 本地运行

**前置要求：** Node.js

1. 安装依赖：
   ```bash
   npm install
   ```

2. 设置环境变量（可选）：
   在项目根目录创建 `.env.local` 文件，并设置 `GEMINI_API_KEY`：
   ```
   GEMINI_API_KEY=你的API密钥
   ```

3. 运行开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中打开 `http://localhost:3000`

## 部署到 GitHub Pages

### 方法一：使用 GitHub Desktop（推荐新手）

适合不熟悉命令行的用户：

1. **安装 GitHub Desktop**：
   下载并安装 [GitHub Desktop](https://desktop.github.com/)

2. **添加项目**：
   - 打开 GitHub Desktop
   - File → Add local repository
   - 选择项目文件夹并创建仓库

3. **发布到 GitHub**：
   - 点击 "Publish repository"
   - 设置仓库名为 `invoice-app`

4. **启用 GitHub Pages**：
   - Repository → View on GitHub
   - Settings → Pages
   - Source 选择 "GitHub Actions"

5. **等待部署完成并访问网站**

📖 **详细图文教程**：[GitHub_Desktop_部署指南.md](./GitHub_Desktop_部署指南.md)  
⚡ **快速参考**：[快速部署步骤_GitHub_Desktop.txt](./快速部署步骤_GitHub_Desktop.txt)

### 方法二：使用命令行

适合熟悉 Git 命令的用户：

1. **更新仓库名配置**：
   如果你的仓库名不是 `invoice-app`，请修改 `vite.config.ts` 中的 `base` 配置。

2. **推送代码到 GitHub**：
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   git remote add origin https://github.com/你的用户名/invoice-app.git
   git push -u origin main
   ```

3. **配置 GitHub Pages**：
   - 进入仓库的 **Settings** > **Pages**
   - 在 **Source** 中选择 **GitHub Actions**

4. **触发部署**：
   - 进入 **Actions** 标签页
   - 运行 "部署到 GitHub Pages" 工作流

5. **访问网站**：
   ```
   https://你的用户名.github.io/invoice-app/
   ```

📖 **详细部署文档**：[DEPLOY.md](./DEPLOY.md)

## 技术栈

- React 19
- TypeScript
- Vite
- CSS Modules

## 项目结构

```
├── index.tsx                    # 主应用入口
├── invoice.tsx                  # 发票页面组件
├── IssuedInvoiceDetail.tsx      # 已开具发票详情
├── ReissueInvoicePage.tsx       # 重新开具发票页面
├── *.css                        # 对应的样式文件
├── vite.config.ts               # Vite 配置
├── .github/workflows/deploy.yml # GitHub Actions 自动部署
└── DEPLOY.md                    # 详细部署文档
```
