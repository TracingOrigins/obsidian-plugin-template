/**
 * 异步工具
 * 提供异步操作相关的工具函数，适用于 Obsidian 插件开发
 */

/**
 * 延迟执行
 * 常用于重试机制、防抖后的延迟操作等场景
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 * @example
 * await sleep(1000); // 延迟 1 秒
 */
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 带超时的 Promise
 * 为异步操作添加超时控制，常用于网络请求或文件操作
 * @param promise 要执行的 Promise
 * @param timeoutMs 超时时间（毫秒）
 * @param timeoutMessage 超时错误消息
 * @returns Promise，如果超时则抛出错误
 * @example
 * const result = await withTimeout(fetchData(), 5000, '请求超时');
 */
export async function withTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number,
	timeoutMessage = `操作超时（${timeoutMs}ms）`
): Promise<T> {
	const timeoutPromise = new Promise<never>((_, reject) => {
		setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
	});
	return Promise.race([promise, timeoutPromise]);
}

/**
 * 重试异步操作
 * 在 Obsidian 插件开发中，文件操作或 API 调用可能需要重试机制
 * @param fn 要重试的异步函数
 * @param maxRetries 最大重试次数，默认 3
 * @param delayMs 重试间隔（毫秒），默认 1000
 * @param shouldRetry 可选的自定义重试条件函数
 * @returns Promise，成功时返回结果，失败时抛出最后一个错误
 * @example
 * const result = await retry(() => app.vault.read(file), 3, 1000);
 */
export async function retry<T>(
	fn: () => Promise<T>,
	maxRetries = 3,
	delayMs = 1000,
	shouldRetry?: (error: unknown) => boolean
): Promise<T> {
	let lastError: unknown;
	
	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error;
			
			// 如果提供了自定义重试条件，检查是否应该重试
			if (shouldRetry && !shouldRetry(error)) {
				throw error;
			}
			
			// 如果不是最后一次尝试，等待后重试
			if (attempt < maxRetries) {
				await sleep(delayMs);
			}
		}
	}
	
	throw lastError;
}

