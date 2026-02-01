/**
 * 验证函数
 * 提供 Obsidian 插件开发中常用的数据验证工具
 */

/**
 * 验证 Obsidian 文件路径
 * 检查路径是否符合 Obsidian 的路径规范
 * @param path 文件路径
 * @returns 是否为有效的 Obsidian 路径
 * @example
 * isValidObsidianPath('folder/file.md'); // true
 * isValidObsidianPath('../file.md'); // false (不允许相对路径)
 */
export function isValidObsidianPath(path: string): boolean {
	if (!path || path.trim() === '') {
		return false;
	}
	// Obsidian 路径不能以 / 开头，不能包含 ..，不能为空
	if (path.startsWith('/') || path.includes('..')) {
		return false;
	}
	return true;
}

/**
 * 验证文件扩展名
 * 在 Obsidian 插件开发中，常用于验证用户选择的文件类型
 * @param filename 文件名或路径
 * @param allowedExtensions 允许的扩展名数组，如 ['.md', '.txt']
 * @returns 是否为允许的扩展名
 * @example
 * isValidFileExtension('note.md', ['.md', '.txt']); // true
 */
export function isValidFileExtension(
	filename: string,
	allowedExtensions: string[]
): boolean {
	const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
	return allowedExtensions.includes(ext);
}

/**
 * 验证设置对象
 * 在 Obsidian 插件开发中，用于验证加载的设置是否包含必需的键
 * @param settings 设置对象
 * @param requiredKeys 必需的键数组
 * @returns 是否包含所有必需的键
 * @example
 * if (!hasRequiredKeys(settings, ['apiKey', 'endpoint'])) {
 *   // 设置不完整
 * }
 */
export function hasRequiredKeys(
	settings: Record<string, unknown>,
	requiredKeys: string[]
): boolean {
	return requiredKeys.every(key => key in settings && settings[key] !== undefined);
}

/**
 * 检查值是否为空
 * 在 Obsidian 插件开发中，常用于验证用户输入或设置值
 * @param value 要检查的值
 * @returns 如果值为空（null、undefined、空字符串、空数组、空对象）返回 true
 * @example
 * if (isEmpty(settings.apiKey)) {
 *   // 显示错误提示
 * }
 */
export function isEmpty(value: unknown): boolean {
	if (value === null || value === undefined) {
		return true;
	}
	if (typeof value === 'string' && value.trim() === '') {
		return true;
	}
	if (Array.isArray(value) && value.length === 0) {
		return true;
	}
	if (typeof value === 'object' && Object.keys(value as Record<string, unknown>).length === 0) {
		return true;
	}
	return false;
}

/**
 * 验证数字范围
 * 在 Obsidian 插件开发中，常用于验证设置中的数值（如延迟时间、重试次数等）
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 是否在范围内
 * @example
 * if (!isInRange(settings.delay, 0, 10000)) {
 *   // 延迟时间必须在 0-10000ms 之间
 * }
 */
export function isInRange(value: number, min: number, max: number): boolean {
	return value >= min && value <= max;
}

/**
 * 验证 URL 格式
 * 在 Obsidian 插件开发中，如果插件需要调用外部 API，需要验证 URL
 * @param url URL 地址
 * @returns 是否为有效 URL
 * @example
 * if (!isValidUrl(settings.apiUrl)) {
 *   // URL 格式无效
 * }
 */
export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

