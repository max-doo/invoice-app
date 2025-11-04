@echo off
chcp 65001 >nul
echo.
echo ═══════════════════════════════════════════════════════
echo   GitHub Desktop 启动助手
echo ═══════════════════════════════════════════════════════
echo.
echo 正在尝试打开 GitHub Desktop...
echo.

REM 尝试常见的 GitHub Desktop 安装路径
set "GITHUB_DESKTOP="

REM 检查用户本地安装路径
if exist "%LOCALAPPDATA%\GitHubDesktop\GitHubDesktop.exe" (
    set "GITHUB_DESKTOP=%LOCALAPPDATA%\GitHubDesktop\GitHubDesktop.exe"
)

REM 检查程序文件夹
if exist "%ProgramFiles%\GitHub Desktop\GitHubDesktop.exe" (
    set "GITHUB_DESKTOP=%ProgramFiles%\GitHub Desktop\GitHubDesktop.exe"
)

REM 检查 x86 程序文件夹
if exist "%ProgramFiles(x86)%\GitHub Desktop\GitHubDesktop.exe" (
    set "GITHUB_DESKTOP=%ProgramFiles(x86)%\GitHub Desktop\GitHubDesktop.exe"
)

if defined GITHUB_DESKTOP (
    echo ✓ 找到 GitHub Desktop
    echo 路径: %GITHUB_DESKTOP%
    echo.
    echo 正在启动...
    start "" "%GITHUB_DESKTOP%"
    echo.
    echo ✓ GitHub Desktop 已启动
    echo.
    echo ═══════════════════════════════════════════════════════
    echo   下一步操作：
    echo ═══════════════════════════════════════════════════════
    echo.
    echo 1. 在 GitHub Desktop 中：
    echo    File ^> Add local repository
    echo.
    echo 2. 选择当前文件夹：
    echo    %~dp0
    echo.
    echo 3. 如果提示创建仓库，点击 "create a repository"
    echo.
    echo 4. 查看详细步骤：
    echo    打开 快速部署步骤_GitHub_Desktop.txt
    echo.
    echo ═══════════════════════════════════════════════════════
) else (
    echo ✗ 未找到 GitHub Desktop
    echo.
    echo 请先下载并安装 GitHub Desktop：
    echo https://desktop.github.com/
    echo.
    echo 安装完成后，再次运行此脚本。
    echo.
    echo ═══════════════════════════════════════════════════════
)

echo.
echo 按任意键关闭此窗口...
pause >nul

