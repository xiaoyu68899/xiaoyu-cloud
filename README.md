# 小雨工作台云端同步接口

## 部署步骤

### 1. 创建 GitHub 仓库
- 登录 GitHub，点击右上角 `+` → `New repository`
- 仓库名填 `xiaoyu-cloud`（或其他你喜欢的名字）
- 选择 `Public`
- 点击 `Create repository`

### 2. 上传文件
把下面这 4 个文件上传到仓库根目录：
```
xiaoyu-cloud/
  package.json
  vercel.json
  api/
    index.js
```

上传方式（选一种）：
- **网页上传**：在 GitHub 仓库页面点 `Add file` → `Upload files`，把文件拖进去
- **命令行**：
  ```bash
  git clone https://github.com/你的用户名/xiaoyu-cloud.git
  cd xiaoyu-cloud
  # 把文件复制进来
  git add .
  git commit -m "init"
  git push
  ```

### 3. 部署到 Vercel
1. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点击 `Add New Project`
3. 找到 `xiaoyu-cloud` 仓库，点击 `Import`
4. 不需要改任何配置，直接点 `Deploy`
5. 等待 30 秒左右，部署完成

### 4. 创建 Blob Store（数据持久化）
1. 在 Vercel Dashboard 左侧菜单点击 `Storage`
2. 点击 `Create` → `Blob`
3. 名字随便填，比如 `xiaoyu-blob`
4. 区域选离你最近的（比如 `HKG1` 香港）
5. 创建完成后，在 Blob Store 页面点击 `Connect Project`
6. 选择你刚才部署的 `xiaoyu-cloud` 项目，点击 `Connect`
7. Vercel 会自动注入环境变量，不需要你手动配置

### 5. 在小雨工作台填写地址
打开小雨工作台，点击顶部 `云端` 按钮：
- **接口地址**：`https://你的项目名.vercel.app`
- **密钥**：留空

点击 `保存配置` → `测试连接`。如果显示"云端连接成功"，以后每次点保存都会自动同步。

## 免费额度
Vercel Hobby 计划完全免费，Blob Store 每月有 2500 次读写，对个人使用完全够用。
