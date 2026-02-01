// scripts/link.js
// 自动创建 Windows 软链接（junction）到 Obsidian 插件目录
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const projectRoot = path.resolve(__dirname, '../');
const distDir = path.join(projectRoot, 'dist');
const manifestPath = path.join(projectRoot, 'manifest.json');

// 从环境变量获取 vault 路径
const VAULT_PATH = process.env.VAULT_PATH;
if (!VAULT_PATH) {
    console.warn('未设置 VAULT_PATH，无法创建软链接。(VAULT_PATH not set in .env, cannot create symlink.)');
    console.warn('请在 .env 文件中设置 VAULT_PATH=你的vault路径');
    process.exit(1);
}

const absVaultPath = path.resolve(VAULT_PATH);

// 检查 dist 目录是否存在，如果不存在则自动创建
if (!fs.existsSync(distDir)) {
    console.log('📁 dist 目录不存在，正在自动创建...');
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ dist 目录已创建');
}

// 确保 manifest.json 存在于 dist 目录中（Obsidian 需要读取它）
const distManifestPath = path.join(distDir, 'manifest.json');
if (fs.existsSync(manifestPath) && !fs.existsSync(distManifestPath)) {
    fs.copyFileSync(manifestPath, distManifestPath);
    console.log('✅ 已复制 manifest.json 到 dist 目录');
}

// 读取 manifest.json 获取插件ID
if (!fs.existsSync(manifestPath)) {
    console.error('manifest.json 文件未找到，无法获取插件ID。(manifest.json not found, cannot get plugin id.)');
    process.exit(1);
}

let pluginId = '';
try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    pluginId = manifest.id;
    if (!pluginId) throw new Error();
} catch {
    console.error('无法从 manifest.json 获取插件ID。(Cannot get plugin id from manifest.json)');
    process.exit(1);
}

// 目标插件目录（vault 中的插件目录）
const targetPluginDir = path.join(absVaultPath, '.obsidian', 'plugins', pluginId);

// 检查目标目录是否已经是 dist 目录（避免循环链接）
if (path.resolve(targetPluginDir) === path.resolve(distDir)) {
    console.warn(
        `目标目录就是 dist 目录(${targetPluginDir})，无需创建软链接。(Target directory is the dist directory itself, no need to create symlink.)`
    );
    process.exit(0);
}

// 检查软链接是否已存在
if (fs.existsSync(targetPluginDir)) {
    try {
        // 检查是否是软链接
        const stats = fs.lstatSync(targetPluginDir);
        if (stats.isSymbolicLink()) {
            const linkTarget = fs.readlinkSync(targetPluginDir);
            const resolvedLinkTarget = path.resolve(path.dirname(targetPluginDir), linkTarget);
            if (resolvedLinkTarget === path.resolve(distDir)) {
                console.log(`✅ 软链接已存在: ${targetPluginDir} -> ${distDir}`);
                console.log('插件已链接，无需重复创建。(Plugin already linked, no need to recreate.)');
                process.exit(0);
            } else {
                // 软链接存在但指向错误，删除后重新创建
                console.warn(`⚠️  软链接指向错误的目标: ${targetPluginDir}`);
                console.warn(`当前链接指向: ${linkTarget}`);
                console.log('正在删除旧软链接...');
                fs.rmSync(targetPluginDir, { recursive: true, force: true });
                console.log('✅ 已删除旧软链接');
            }
        } else {
            // 目标路径存在但不是软链接，删除后创建软链接
            console.warn(`⚠️  目标路径已存在，但不是软链接: ${targetPluginDir}`);
            console.log('正在自动删除以便创建软链接...');
            fs.rmSync(targetPluginDir, { recursive: true, force: true });
            console.log('✅ 已删除旧目录');
        }
    } catch (err) {
        // 如果检查失败，尝试直接删除
        console.warn(`⚠️  检查目标路径时出错: ${err.message}`);
        console.log('正在尝试删除...');
        try {
            fs.rmSync(targetPluginDir, { recursive: true, force: true });
            console.log('✅ 已删除');
        } catch (deleteErr) {
            console.error(`❌ 删除失败: ${deleteErr.message}`);
            console.error('请手动删除后重试。');
            process.exit(1);
        }
    }
}

// 确保 .obsidian/plugins 目录存在
const pluginsDir = path.join(absVaultPath, '.obsidian', 'plugins');
if (!fs.existsSync(pluginsDir)) {
    fs.mkdirSync(pluginsDir, { recursive: true });
    console.log(`已创建插件目录: ${pluginsDir}`);
}

// 创建软链接（Windows 使用 junction，不需要管理员权限）
try {
    // Windows 上使用 'junction' 类型，更稳定且不需要管理员权限
    // Linux/Mac 上使用 'dir' 类型
    const linkType = process.platform === 'win32' ? 'junction' : 'dir';
    fs.symlinkSync(distDir, targetPluginDir, linkType);
    console.log(`✅ 软链接创建成功！(Symlink created successfully!)`);
    console.log(`   源路径: ${distDir}`);
    console.log(`   目标路径: ${targetPluginDir}`);
    console.log(`   类型: ${linkType}`);
} catch (err) {
    console.error(`❌ 创建软链接失败: ${err.message}`);
    console.error('请确保有足够的权限，或手动创建软链接。');
    process.exit(1);
}