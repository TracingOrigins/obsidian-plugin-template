import { Plugin } from 'obsidian';
import { SampleModal } from '../ui/modals/SampleModal';
import { COMMAND_IDS } from '../constants/commands';

/**
 * 简单打开模态框命令
 */
export function registerOpenModalSimpleCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: COMMAND_IDS.OPEN_MODAL_SIMPLE,
		name: '打开模态框（简单）',
		callback: () => {
			new SampleModal(plugin.app).open();
		}
	});
}

