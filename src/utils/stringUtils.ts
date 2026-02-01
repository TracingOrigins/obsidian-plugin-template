/**
 * 字符串工具
 * 提供字符串操作相关的工具函数
 */

/**
 * 生成唯一 ID
 * @param prefix 前缀
 * @returns 唯一 ID 字符串
 */
export function generateId(prefix: string = ''): string {
	const timestamp = Date.now().toString(36);
	const randomStr = Math.random().toString(36).substring(2, 9);
	return prefix ? `${prefix}-${timestamp}-${randomStr}` : `${timestamp}-${randomStr}`;
}

