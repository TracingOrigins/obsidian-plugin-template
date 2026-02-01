/**
 * 函数工具
 * 提供函数相关的工具函数（防抖、节流等）
 * 
 * 注意：debounce 已在 obsidian.ts 中导出，此处不再重复导出
 * 
 * 在 Obsidian 插件开发中，节流常用于：
 * - 文件系统事件监听（避免频繁触发）
 * - UI 更新（避免过度渲染）
 * - 搜索输入（减少计算开销）
 */

/**
 * 节流函数
 * 限制函数执行频率，确保在指定时间间隔内最多执行一次
 * @param func 要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流后的函数，包含 cancel 方法用于取消待执行的调用
 * @example
 * const throttledSearch = throttle((query: string) => {
 *   performSearch(query);
 * }, 300);
 * 
 * // 使用
 * throttledSearch('test');
 * 
 * // 取消待执行的调用
 * throttledSearch.cancel();
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
	let lastCall = 0;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	
	const throttled = function (this: unknown, ...args: Parameters<T>) {
		const now = Date.now();
		const timeSinceLastCall = now - lastCall;
		
		if (timeSinceLastCall >= delay) {
			// 立即执行
			lastCall = now;
			func.apply(this, args);
		} else {
			// 取消之前的延迟调用
			if (timeoutId !== null) {
				clearTimeout(timeoutId);
			}
			
			// 安排延迟执行
			timeoutId = setTimeout(() => {
				lastCall = Date.now();
				timeoutId = null;
				func.apply(this, args);
			}, delay - timeSinceLastCall);
		}
	} as ((...args: Parameters<T>) => void) & { cancel: () => void };
	
	throttled.cancel = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	};
	
	return throttled;
}

