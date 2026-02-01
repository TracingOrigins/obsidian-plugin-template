/**
 * 文件操作工具函数
 * 提供 Obsidian 文件系统相关的工具
 */

import { TFile, normalizePath } from 'obsidian';
import { FILE_EXTENSIONS } from '../constants';

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 扩展名（包含点号）
 */
export function getFileExtension(filename: string): string {
	const lastDot = filename.lastIndexOf('.');
	return lastDot !== -1 ? filename.substring(lastDot) : '';
}

/**
 * 获取文件名（不含扩展名）
 * @param filename 文件名
 * @returns 不含扩展名的文件名
 */
export function getFileNameWithoutExtension(filename: string): string {
	const lastDot = filename.lastIndexOf('.');
	return lastDot !== -1 ? filename.substring(0, lastDot) : filename;
}

/**
 * 获取文件路径的目录部分
 * @param filepath 文件路径
 * @returns 目录路径
 */
export function getDirectoryPath(filepath: string): string {
	const lastSlash = filepath.lastIndexOf('/');
	return lastSlash !== -1 ? filepath.substring(0, lastSlash) : '';
}

/**
 * 检查文件是否为 Markdown 文件
 * @param file 文件对象或文件名
 * @returns 是否为 Markdown 文件
 */
export function isMarkdownFile(file: TFile | string): boolean {
	if (typeof file === 'string') {
		return file.endsWith(FILE_EXTENSIONS.MARKDOWN);
	}
	return file.extension === 'md';
}

/**
 * 检查路径是否为文件夹
 * @param path 路径
 * @returns 是否为文件夹路径（以 / 结尾）
 */
export function isFolderPath(path: string): boolean {
	return path.endsWith('/');
}

/**
 * 连接路径
 * @param basePath 基础路径
 * @param ...paths 要连接的路径
 * @returns 连接后的路径
 */
export function joinPath(basePath: string, ...paths: string[]): string {
	let result = basePath;
	for (const path of paths) {
		if (path) {
			const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
			if (cleanPath) {
				result = result ? `${result}/${cleanPath}` : cleanPath;
			}
		}
	}
	return normalizePath(result);
}

/**
 * 从文件路径获取显示名称
 * @param filepath 文件路径
 * @returns 显示名称（文件名不含扩展名）
 */
export function getDisplayName(filepath: string): string {
	const filename = filepath.split('/').pop() || filepath;
	return getFileNameWithoutExtension(filename);
}

/**
 * 检查文件路径是否在指定目录下
 * @param filepath 文件路径
 * @param directory 目录路径
 * @returns 是否在目录下
 */
export function isInDirectory(filepath: string, directory: string): boolean {
	const normalizedFile = normalizePath(filepath);
	const normalizedDir = normalizePath(directory);
	return normalizedFile.startsWith(normalizedDir + '/') || normalizedFile === normalizedDir;
}

/**
 * 获取相对路径
 * @param filepath 文件路径
 * @param basePath 基础路径
 * @returns 相对路径
 */
export function getRelativePath(filepath: string, basePath: string): string {
	const normalizedFile = normalizePath(filepath);
	const normalizedBase = normalizePath(basePath);

	if (normalizedFile === normalizedBase) {
		return '.';
	}

	if (normalizedFile.startsWith(normalizedBase + '/')) {
		return normalizedFile.substring(normalizedBase.length + 1);
	}

	// 如果不在基础路径下，返回完整路径
	return normalizedFile;
}

