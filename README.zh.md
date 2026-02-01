# Obsidian 示例插件

这是一个 Obsidian (https://obsidian.md) 的示例插件。

本项目使用 TypeScript 提供类型检查和文档。
仓库依赖于最新的插件 API（obsidian.d.ts），采用 TypeScript 定义格式，包含描述其功能的 TSDoc 注释。

此示例插件演示了插件 API 可以实现的一些基本功能。
- 添加一个功能区图标，点击时显示通知。
- 添加一个命令"打开模态框（简单）"，用于打开模态框。
- 在设置页面添加插件设置选项卡。
- 注册全局点击事件，并在控制台输出 'click'。
- 注册全局间隔，在控制台记录 'setInterval'。

## 第一次开发插件？

新插件开发者的快速入门：

- 检查是否[已经有人为你想要的功能开发了插件](https://obsidian.md/plugins)！可能已经存在类似的插件，你可以与之合作。
- 使用"使用此模板"按钮将此仓库复制为模板（如果看不到该按钮，请登录 GitHub）。
- 将你的仓库克隆到本地开发文件夹。

## 🚀 开发工作流

### 快速开始

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd <plugin-directory>
   ```

2. **检查 Node.js 版本**
   确保你的 Node.js 至少为 v16：
   ```bash
   node --version
   ```

3. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn
   yarn
   ```

4. **配置环境变量**
   在项目根目录创建 `.env` 文件：
   ```
   VAULT_PATH=C:/path/to/your/vault
   ```
   > 注意：`.env` 文件已在 `.gitignore` 中，不会被提交到仓库

5. **启动开发模式**
   ```bash
   npm run dev
   ```
   这将自动执行以下操作：
   - 创建 `dist` 目录（如果不存在）
   - 自动创建软链接到你的 Obsidian vault 插件目录（如果不存在或指向错误，会自动删除并重新创建）
   - 开始编译并监听文件变化

### 📁 推荐的项目结构

```
src/
├─ main.ts              # 插件入口
├─ settings.ts          # 设置界面
├─ ui/                  # UI 组件
│  ├─ modals/           # 模态框
│  └─ views/            # 视图
├─ utils/               # 工具函数
└─ types/               # 类型定义
```

保持代码结构清晰，便于维护和扩展。

### 代码质量检查

在提交代码或发布版本之前，建议运行代码质量检查：

- 运行 `npm run lint` 检查代码质量和潜在问题
- [ESLint](https://eslint.org/) 是一个分析代码以快速发现问题的工具
- 项目已预配置 ESLint 和用于 Obsidian 特定代码指南的自定义 ESLint [插件](https://github.com/obsidianmd/eslint-plugin)
- GitHub action 已配置，会在每次提交时自动检查

### 版本管理

**方式一：使用 npm version（需要 git 工作目录干净）**
```bash
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

`npm version` 命令的执行流程（npm 内置行为）：
1. 更新 `package.json` 的版本号
2. 运行 `version` 脚本（即 `node version-bump.mjs`），同步到 `manifest.json` 和 `versions.json`
3. **自动创建 git commit**（如果 git 工作目录干净）
4. **自动创建 git tag**（标签名为版本号，如 `v1.0.1`）

> 注意：创建 git commit 和 tag 是 `npm version` 命令的内置功能，不是我们脚本定义的。如果 git 工作目录不干净（有未提交的更改），命令会失败。

**方式二：手动更新版本（推荐，更灵活）**
1. 手动编辑 `package.json`，更新 `version` 字段
2. 运行同步脚本：
   ```bash
   npm run version
   ```
   这会同步当前 `package.json` 的版本号到 `manifest.json` 和 `versions.json`

### 构建与发布

**生产构建**
```bash
npm run build
```
这将进行生产构建，输出构建产物到 `dist` 目录。构建前会自动：
- 创建 `dist` 目录（如果不存在）
- 自动创建软链接到你的 Obsidian vault 插件目录（如果不存在或指向错误，会自动删除并重新创建）

**发布新版本**

1. **更新版本号**（参见[版本管理](#版本管理)）

2. **构建生产版本**
   ```bash
   npm run build
   ```

3. **创建 GitHub 发布**
   - 使用新版本号作为"标签版本"创建新的 GitHub 发布（使用确切的版本号，不要包含前缀 `v`）
   - 请参阅示例：https://github.com/obsidianmd/obsidian-sample-plugin/releases

4. **上传发布文件**
   - 将文件 `manifest.json`、`main.js`、`styles.css` 作为二进制附件上传
   - 注意：manifest.json 文件必须位于两个位置，首先是仓库的根路径，其次是在发布中

5. **发布版本**
   - 发布 GitHub release

**将插件添加到社区插件列表**

- 查看[插件指南](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- 发布初始版本（参见上方发布流程）
- 确保在仓库根目录中有 `README.md` 文件
- 在 https://github.com/obsidianmd/obsidian-releases 提交拉取请求以添加你的插件

## 资助链接

你可以包含资助链接，让使用你插件的人可以对其进行经济支持。

简单的方法是在 `manifest.json` 文件中将 `fundingUrl` 字段设置为你的链接：

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

如果你有多个链接，也可以这样做：

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API 文档

参见 https://docs.obsidian.md
