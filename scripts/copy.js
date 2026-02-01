// scripts/copy.js
// 从 dist 目录复制构建产物到 Obsidian 插件目录
// 使用 dotenv 方式，直接通过 process.env.VAULT_PATH 获取目标路径
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 获取当前文件的目录路径（ES模块中替代 __dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 修改为加载项目根目录下的 .env 文件
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // 加载根目录 .env

// 从 dist 目录复制的文件列表
const filesToCopy = [
	{ src: 'main.js', dest: 'main.js' },
	{ src: 'manifest.json', dest: 'manifest.json' },
	{ src: 'styles.css', dest: 'styles.css' } // styles.css 是可选的，如果不存在会跳过
];

const projectRoot = path.resolve(__dirname, '../');
const distDir = path.join(projectRoot, 'dist');
const manifestPath = path.join(distDir, 'manifest.json');

const VAULT_PATH = process.env.VAULT_PATH;
if (!VAULT_PATH) {
    console.warn('⚠️  未设置 VAULT_PATH，跳过复制。');
    process.exit(0);
}
const absVaultPath = path.resolve(VAULT_PATH);

// 检查 dist 目录是否存在
if (!fs.existsSync(distDir)) {
    console.error(
        `❌ dist 目录未找到，请先运行构建命令: ${distDir}`
    );
    process.exit(1);
}

// 读取 manifest.json 获取插件ID
if (!fs.existsSync(manifestPath)) {
    console.error(
        `❌ manifest.json 文件未找到，无法获取插件ID。请先运行构建命令: ${manifestPath}`
    );
    process.exit(1);
}
let pluginId = '';
try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    pluginId = manifest.id;
    if (!pluginId) throw new Error();
} catch {
    console.error('❌ 无法从 manifest.json 获取插件ID。');
    process.exit(1);
}

// 拼接目标插件目录
const pluginDir = path.join(absVaultPath, '.obsidian', 'plugins', pluginId);
if (pluginDir === projectRoot) {
    console.warn(
        `⚠️  目标目录就是项目根目录(${pluginDir})，跳过复制。`
    );
    process.exit(0);
}

// 确保目标目录存在，如果不是目录则删除后创建文件夹
if (fs.existsSync(pluginDir)) {
    try {
        const stats = fs.lstatSync(pluginDir);
        if (stats.isDirectory()) {
            // 如果是目录，直接使用，无需创建
            console.log(`✅ 目标目录已存在: ${pluginDir}`);
        } else {
            // 如果不是目录（包括软链接、文件等），删除后创建文件夹
            console.warn(`⚠️  目标路径已存在，但不是目录: ${pluginDir}`);
            console.log('正在自动删除以便创建文件夹...');
            fs.rmSync(pluginDir, { recursive: true, force: true });
            console.log('✅ 已删除');
        }
    } catch (err) {
        // 如果检查失败，报错退出（通常是权限或文件系统问题）
        console.error(`❌ 检查目标路径时出错: ${err.message}`);
        console.error('请检查权限或手动处理该路径后重试。');
        process.exit(1);
    }
}

// 如果目录不存在（或刚删除了软链接），创建文件夹
if (!fs.existsSync(pluginDir)) {
    try {
        fs.mkdirSync(pluginDir, { recursive: true });
        console.log(`✅ 已创建插件目录: ${pluginDir}`);
    } catch (err) {
        console.error(`❌ 创建插件目录失败: ${err.message}`);
        process.exit(1);
    }
}

// 复制文件
let copiedCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const file of filesToCopy) {
	const src = path.join(distDir, file.src);
	const dest = path.join(pluginDir, file.dest);
	
	if (!fs.existsSync(src)) {
		// styles.css 是可选的，其他文件缺失则报错
		if (file.src === 'styles.css') {
			console.log(`⏭️  跳过可选文件: ${file.src}（文件不存在）`);
			skippedCount++;
		} else {
			console.warn(`⚠️  未找到必需文件: ${src}，跳过。`);
			errorCount++;
		}
		continue;
	}
	
	try {
		fs.copyFileSync(src, dest);
		console.log(`✅ 已复制: ${file.src} -> ${dest}`);
		copiedCount++;
	} catch (err) {
		console.error(`❌ 复制失败: ${file.src} -> ${dest}，错误: ${err.message}`);
		errorCount++;
	}
}

// 输出总结
console.log('\n📦 复制完成:');
console.log(`  ✅ 成功: ${copiedCount} 个文件`);
if (skippedCount > 0) {
	console.log(`  ⏭️  跳过: ${skippedCount} 个可选文件`);
}
if (errorCount > 0) {
	console.warn(`  ❌ 失败: ${errorCount} 个文件`);
	process.exit(1);
} else {
	console.log(`\n✅ 所有文件已成功复制到 Obsidian 库的 ${pluginId} 插件目录！`);
}

