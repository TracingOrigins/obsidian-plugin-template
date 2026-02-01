/**
 * 命令统一注册
 * 集中管理所有命令的注册
 */

import { Plugin } from 'obsidian';
import { registerOpenModalSimpleCommand } from './openModalSimple';
import { registerReplaceSelectedCommand } from './replaceSelected';
import { registerOpenModalComplexCommand } from './openModalComplex';
import { registerOpenSampleViewCommand } from './openSampleView';

/**
 * 注册所有命令
 * @param plugin 插件实例
 */
export function registerCommands(plugin: Plugin): void {
	registerOpenModalSimpleCommand(plugin);
	registerReplaceSelectedCommand(plugin);
	registerOpenModalComplexCommand(plugin);
	registerOpenSampleViewCommand(plugin);
}

