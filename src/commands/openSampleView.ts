import { Plugin } from 'obsidian';
import { VIEW_TYPE_SAMPLE } from '../ui/views/SampleView';
import { COMMAND_IDS } from '../constants/commands';

/**
 * 打开示例视图命令
 */
export function registerOpenSampleViewCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: COMMAND_IDS.OPEN_SAMPLE_VIEW,
		name: '打开示例视图',
		callback: async () => {
			// 检查是否已经有该类型的视图打开
			const existingLeaves = plugin.app.workspace.getLeavesOfType(VIEW_TYPE_SAMPLE);
			
			if (existingLeaves.length > 0) {
				// 如果已有视图，激活第一个
				const leaf = existingLeaves[0];
				if (leaf) {
					await plugin.app.workspace.revealLeaf(leaf);
				}
			} else {
				// 如果没有，创建一个新的 leaf 并设置视图
				const leaf = plugin.app.workspace.getRightLeaf(false);
				if (leaf) {
					await leaf.setViewState({
						type: VIEW_TYPE_SAMPLE,
						active: true,
					});
				}
			}
		}
	});
}

