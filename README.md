# MBTI Outreach 小工具

纯前端 H5，支持在本机打开或通过 **GitHub Pages** 在微信内访问（HTTPS 链接可分发）。

## 本地使用

- 双击打开 `index.html`（或本地起一个静态服务）
- 「话术匹配」中先保存 CA 的 MBTI（localStorage）
- 「客人判断」完成 8 题后生成客人 MBTI，可带到话术页
- 「历史」仅保存在本机浏览器

## 部署到 GitHub Pages

**当前仓库已配置** `origin` 指向：  
`https://github.com/danjuanjuanjuan/mbti_outreach.git`  
你需要在自己电脑的终端里完成一次 **`git push`**（下面第 1 步），**我无法代替你输入密码/令牌**。

### 1. 在本机推送到 GitHub

进入项目目录后执行（若已配置过 `origin` 可跳过 `remote add`）：

```bash
cd "MBTI Outreach"   # 或你的项目实际路径

# 若还没有 origin，执行一次（一般已有）：
# git remote add origin https://github.com/danjuanjuanjuan/mbti_outreach.git

git branch -M main
git push -u origin main
```

**HTTPS 推送鉴权（必看）**  
GitHub 已不支持用「账号密码」推代码，会提示要用户名+密码时：

- **密码处请填 [Personal Access Token (classic)](https://github.com/settings/tokens)**，权限勾选 **`repo`**，生成后复制，只在推送时当密码用一次；或  
- 改用 **SSH**：本机 [配置 SSH 密钥](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) 后，将远程改为  
  `git remote set-url origin git@github.com:danjuanjuanjuan/mbti_outreach.git`  
  再 `git push -u origin main`  
- 或安装 **GitHub CLI**：`brew install gh` → `gh auth login` 登录后，再在同一目录执行 `git push`。

**若建库时勾选了「添加 README」**（远程先有提交），先拉再推：

```bash
git pull origin main --rebase
git push -u origin main
```

### 2. 打开 GitHub Pages

1. 打开仓库 **Settings** → **Pages**（左侧菜单）  
2. **Build and deployment** → **Source** 选 **GitHub Actions**（不要选 Deploy from a branch，除非你不用本仓库的 workflow）  
3. 推送 `main` 后，在 **Actions** 里应出现 **Deploy to GitHub Pages**，跑绿即发布成功。  
4. 同一 **Settings → Pages** 里会显示站点地址，一般为：

`https://danjuanjuanjuan.github.io/mbti_outreach/`

> 根目录已包含 `.nojekyll`，避免 Jekyll 误处理无下划线资源。

**说明（私有仓库 + 免费账号）**  
在不少账号类型下，**仅公开（Public）仓库** 可免费使用 GitHub Pages；若你使用 **Private** 仓库，Pages 里 **Build** 为灰色或无法发布，可将仓库 **改为 Public**（代码公开）后再开 Pages，或换用其它静态托管。站点上线后，他人仍只需 **链接** 即可打开页面，**无需** 有 GitHub 账号。

## 技术说明

- HTML + Tailwind（CDN）+ 原生 JS；`matchLogic.js` / `followuplogic.js` / `followup.js` 为业务脚本  
- 无后端、无需构建；`proxy_server.py` 仅作本地大模型代理示例，**不参与** Pages 线上运行

