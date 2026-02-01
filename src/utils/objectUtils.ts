/**
 * 对象工具
 * 提供对象操作相关的工具函数，适用于 Obsidian 插件开发
 * 
 * 注意：Obsidian 的 loadData/saveData 已经处理了 JSON 序列化，
 * 通常不需要深度克隆设置对象，但某些场景下仍可能有用
 */

/**
 * 安全获取嵌套对象属性
 * 在 Obsidian 插件开发中，常用于访问嵌套的设置对象或配置
 * @param obj 对象
 * @param path 属性路径，如 'a.b.c' 或 'settings.theme.color'
 * @param defaultValue 默认值
 * @returns 属性值或默认值
 * @example
 * const theme = getNestedValue(settings, 'theme.color', '#000000');
 * const apiKey = getNestedValue(config, 'api.keys.main');
 */
export function getNestedValue<T>(
	obj: unknown,
	path: string,
	defaultValue?: T
): T | undefined {
	const keys = path.split('.');
	let result: unknown = obj;
	
	for (const key of keys) {
		if (result === null || result === undefined) {
			return defaultValue;
		}
		if (typeof result === 'object' && key in result) {
			result = (result as Record<string, unknown>)[key];
		} else {
			return defaultValue;
		}
	}
	return result !== undefined ? (result as T) : defaultValue;
}

/**
 * 合并设置对象
 * 在 Obsidian 插件开发中，常用于合并默认设置和用户设置
 * @param target 目标对象（会被修改）
 * @param source 源对象
 * @returns 合并后的对象
 * @example
 * const settings = mergeSettings(DEFAULT_SETTINGS, await plugin.loadData());
 */
export function mergeSettings<T extends Record<string, unknown>>(
	target: T,
	source: Partial<T>
): T {
	for (const key in source) {
		if (source[key] !== undefined) {
			target[key] = source[key] as T[Extract<keyof T, string>];
		}
	}
	return target;
}

