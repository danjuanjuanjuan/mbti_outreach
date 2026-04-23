# MBTI Outreach 小工具

纯前端 H5，支持在本机打开或通过 **GitHub Pages** 在微信内访问（HTTPS 链接可分发）。

## 本地使用

- 页面与脚本在 **`docs/`** 目录下：可双击打开 **`docs/index.html`**，或在仓库根目录执行 `npx -y serve docs` 等静态服务
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

### 2. 打开 GitHub Pages（从分支 + `/docs` 文件夹）

为兼容 GitHub 界面在部分环境下 **无法保存 `main` + `/ (root)`** 的情况，**站点已放在仓库的 `docs/` 目录**（与 [官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-from-a-branch) 的 *docs* 发布方式一致）。

1. 将本次改动 **push 到 `main`**
2. 打开仓库 **Settings** → **Pages**
3. **Build and deployment** → **Source** 选 **Deploy from a branch**
4. **Branch** 选 **`main`**，**Folder** 选 **`/docs`**（不要选 root），然后 **Save**
5. 等待约 1 分钟后，访问：

`https://danjuanjuanjuan.github.io/mbti_outreach/`

> `docs/` 内已含 `.nojekyll`，避免 Jekyll 误处理。

**说明**  
- 已移除 **GitHub Actions** 自动发布，避免与「从 `docs` 分支发布」重复；**推送时不再需要** Token 的 `workflow` 权限。  
- **Private** 仓库在免费账号下**不能**用 GitHub Pages，需 **Public** 或付费套餐。

## 技术说明

- 线上页面：`docs/index.html` + `docs/matchLogic.js` / `followuplogic.js` / `followup.js`  
- 根目录 `proxy_server.py` 仅作本地大模型代理示例，**不参与** Pages

