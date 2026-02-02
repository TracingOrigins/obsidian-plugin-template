# Obsidian Sample Plugin

This is a sample plugin for Obsidian (https://obsidian.md).

This project uses TypeScript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in TypeScript Definition format, which contains TSDoc comments describing what it does.

This sample plugin demonstrates some of the basic functionality the plugin API can do.
- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open modal (simple)" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder.

## 🚀 Development Workflow

### Quick Start

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd <plugin-directory>
   ```

2. **Check Node.js version**
   Ensure your Node.js is at least v16:
   ```bash
   node --version
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or use yarn
   yarn
   ```

4. **Configure environment variables**
   Create a `.env` file in the project root directory:
   ```
   VAULT_PATH=C:/path/to/your/vault
   ```
   > 💡 Tip: The project root includes an `.env.example` template. You can copy it to `.env` and fill in your actual path.
   > Note: The `.env` file is already in `.gitignore` and will not be committed to the repository
   >
   > **Path notes**:
   > - On Windows, forward slashes are recommended: `C:/Users/Name/Documents/MyVault`
   > - Paths with spaces do not require quotes
   > - You can add comments using `#`

5. **Start development mode**
   ```bash
   npm run dev
   ```
   Automatically creates a symlink and starts watching for file changes. Code changes will automatically trigger recompilation, and Obsidian will automatically reload the plugin.
   
   > 💡 Development mode uses symlinks, the `dist` directory is directly linked to the Obsidian plugin directory, no need to manually copy files

### 📁 Recommended Project Structure

```
src/
├─ main.ts              # Plugin entry point
├─ settings.ts          # Settings interface
├─ ui/                  # UI components
│  ├─ modals/           # Modals
│  └─ views/            # Views
├─ utils/               # Utility functions
└─ types/               # Type definitions
```

Keep the code structure clear for easy maintenance and extension.

### Code Quality Check

Before committing code or releasing a version, it's recommended to run code quality checks:

- Run `npm run lint` to check code quality and potential issues
- [ESLint](https://eslint.org/) is a tool that analyzes code to quickly find problems
- The project is pre-configured with ESLint and a custom ESLint [plugin](https://github.com/obsidianmd/eslint-plugin) for Obsidian-specific code guidelines
- GitHub action is configured to automatically check on every commit

### Version Management

**Method 1: Using npm version (requires clean git working directory)**
```bash
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

Execution flow of the `npm version` command (npm built-in behavior):
1. Update the version number in `package.json` (and may update the lockfile)
2. Run the `version` script (i.e., `node version-bump.mjs`), sync to `manifest.json` and `versions.json`
3. **Automatically create git commit** (if git working directory is clean)
4. **Automatically create git tag** (typically the plain version number, e.g., `1.0.1`)

> Note: Creating git commit and tag is a built-in feature of the `npm version` command, not defined by our script. If the git working directory is not clean (has uncommitted changes), the command will fail.

**Method 2: Manual version update (recommended, more flexible)**
1. Manually edit `package.json` and update the `version` field
2. Run the sync script:
   ```bash
   npm run version
   ```
   This will sync the current `package.json` version number to `manifest.json` and `versions.json`, and will also automatically `git add package.json manifest.json versions.json` for you, so you can commit afterwards

### Build and Release

**Production Build**
```bash
npm run build
```
Performs type checking, a production (minified) build, and then copies files from the `dist` directory to the Obsidian vault plugin directory. If the destination path exists but is not a directory (e.g., a symlink/file), it will be removed and a directory will be created.

> 💡 Production build uses file copying, suitable for release and final version testing

**Development Mode vs Production Build**

| Feature | Development Mode (`npm run dev`) | Production Build (`npm run build`) |
|---------|--------------------------------|-----------------------------------|
| Link Method | Symlink (points to `dist` directory) | File Copy (actual files) |
| Code Minification | No (for debugging) | Yes |
| File Watching | Yes (auto recompile) | No |
| Use Case | Daily development | Pre-release testing, official release |

**Release New Version**

1. **Update version number** (see [Version Management](#version-management))

2. **Build production version**
   ```bash
   npm run build
   ```

3. **Create GitHub release**
   - Create a new GitHub release using the new version number as the "Tag version" (use the exact version number, don't include prefix `v`)
   - See example: https://github.com/obsidianmd/obsidian-sample-plugin/releases

4. **Upload release files**
   - Upload files `manifest.json`, `main.js`, `styles.css` as binary attachments
   - Note: The manifest.json file must be in two places, first the root path of the repository, and also in the release

5. **Publish version**
   - Publish the GitHub release

**Add Plugin to Community Plugin List**

- Check the [Plugin Guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- Publish initial version (see release process above)
- Ensure you have a `README.md` file in the root of your repository
- Submit a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin

### Script Documentation

The project includes two helper scripts to simplify the development workflow:

#### `scripts/link.js` - Create Symlink

Used in development mode, automatically creates a symlink linking the `dist` directory to the Obsidian vault plugin directory.

**Features**:
- Automatically creates `dist` directory (if it doesn't exist)
- Ensures the Obsidian plugin parent directory exists (`<Vault>/.obsidian/plugins`)
- Checks whether the target path (`<Vault>/.obsidian/plugins/<plugin-id>`) already exists and is a symlink
- If the symlink exists but points to the wrong location, deletes and recreates it
- If the target path exists but is not a symlink (e.g., a directory/file), deletes it and creates the correct symlink

**Use Case**: Automatically called in development mode (`npm run dev`)

#### `scripts/copy.js` - Copy Files

Used in production build, copies build artifacts from the `dist` directory to the Obsidian vault plugin directory.

**Features**:
- Copies `main.js`, `manifest.json`, and `styles.css` (optional) from `dist` directory
- If the target path exists and is a directory, uses it directly
- If the target path exists but is not a directory (e.g., a symlink/file), deletes it and creates a directory
- If a permission/filesystem error occurs while checking/creating directories, exits with error
- Provides detailed copy progress and result statistics

**Use Case**: Automatically called in production build (`npm run build`)

**Notes**:
- Both scripts depend on the `VAULT_PATH` environment variable in the `.env` file
- If `VAULT_PATH` is not set:
  - `link.js` will warn and exit with error (development mode needs the symlink)
  - `copy.js` will warn and skip copying (so CI builds won’t fail)

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://docs.obsidian.md
