/**
 * 格式化函数
 * 提供各种数据格式化工具
 */

/**
 * 格式化日期
 * @param date 日期对象
 * @param locale 语言环境，默认为 'zh-CN'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, locale: string = 'zh-CN'): string {
	return date.toLocaleDateString(locale);
}

/**
 * 格式化日期时间
 * @param date 日期对象
 * @param locale 语言环境，默认为 'zh-CN'
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(date: Date, locale: string = 'zh-CN'): string {
	return date.toLocaleString(locale);
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数，默认为 2
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 格式化数字（添加千分位）
 * @param num 数字
 * @param decimals 小数位数，默认为 0
 * @returns 格式化后的数字字符串
 */
export function formatNumber(num: number, decimals: number = 0): string {
	return num.toLocaleString('zh-CN', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

/**
 * 格式化百分比
 * @param value 数值（0-1 之间）
 * @param decimals 小数位数，默认为 2
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(value: number, decimals: number = 2): string {
	return (value * 100).toFixed(decimals) + '%';
}

/**
 * 截断文本并添加省略号
 * @param text 文本
 * @param maxLength 最大长度
 * @param suffix 后缀，默认为 '...'
 * @returns 截断后的文本
 */
export function truncateText(
	text: string,
	maxLength: number,
	suffix: string = '...'
): string {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 转换为驼峰命名
 * @param str 字符串（如 'hello-world'）
 * @returns 驼峰命名（如 'helloWorld'）
 */
export function toCamelCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '')
		.replace(/[-_]/g, '');
}

/**
 * 转换为短横线命名
 * @param str 字符串（如 'HelloWorld'）
 * @returns 短横线命名（如 'hello-world'）
 */
export function toKebabCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/[\s_]+/g, '-')
		.toLowerCase();
}

/**
 * 格式化 Markdown 链接
 * @param text 链接文本
 * @param url 链接地址
 * @returns Markdown 格式的链接
 */
export function formatMarkdownLink(text: string, url: string): string {
	return `[${text}](${url})`;
}

/**
 * 格式化 Wiki 链接
 * @param link 链接文本
 * @param alias 别名（可选）
 * @returns Wiki 格式的链接
 */
export function formatWikiLink(link: string, alias?: string): string {
	return alias ? `[[${link}|${alias}]]` : `[[${link}]]`;
}

/**
 * 格式化标签
 * @param tag 标签文本
 * @returns 格式化后的标签（带 #）
 */
export function formatTag(tag: string): string {
	const cleanTag = tag.replace(/^#+/, '').trim();
	return `#${cleanTag}`;
}

