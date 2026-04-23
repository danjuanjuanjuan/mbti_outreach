# MBTI Outreach 小工具

纯前端 H5，支持在本机打开或通过 **GitHub Pages** 在微信内访问（HTTPS 链接可分发）。

## 本地使用

- 双击打开 `index.html`（或本地起一个静态服务）
- 「话术匹配」中先保存 CA 的 MBTI（localStorage）
- 「客人判断」完成 8 题后生成客人 MBTI，可带到话术页
- 「历史」仅保存在本机浏览器

## 部署到 GitHub Pages

### 1. 在本机推送仓库

若尚未建库：

```bash
cd "MBTI Outreach"
git init
git add -A
git commit -m "Initial commit: MBTI Outreach"
```

在 GitHub 网页新建一个空仓库（不要勾选添加 README），记下仓库地址，执行：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
git push -u origin main
```

### 2. 打开 GitHub Pages

1. 打开仓库 **Settings** → **Pages**（左侧菜单）  
2. **Build and deployment** → **Source** 选 **GitHub Actions**（不要选 Deploy from a branch，除非你不用本仓库的 workflow）  
3. 推送 `main` 后，在 **Actions** 里应出现 **Deploy to GitHub Pages**，跑绿即发布成功。  
4. 同一 **Settings → Pages** 里会显示站点地址，一般为：

`https://<你的用户名>.github.io/<仓库名>/`

> 根目录已包含 `.nojekyll`，避免 Jekyll 误处理无下划线资源。

## 技术说明

- HTML + Tailwind（CDN）+ 原生 JS；`matchLogic.js` / `followuplogic.js` / `followup.js` 为业务脚本  
- 无后端、无需构建；`proxy_server.py` 仅作本地大模型代理示例，**不参与** Pages 线上运行

