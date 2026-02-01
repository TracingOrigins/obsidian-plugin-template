import { MarkdownView, Plugin } from 'obsidian';
import { SampleModal } from '../ui/modals/SampleModal';
import { COMMAND_IDS } from '../constants/commands';

/**
 * 复杂打开模态框命令（带条件检查）
 */
export function registerOpenModalComplexCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: COMMAND_IDS.OPEN_MODAL_COMPLEX,
		name: '打开模态框（复杂）',
		checkCallback: (checking: boolean) => {
			// 检查条件
			const markdownView = plugin.app.workspace.getActiveViewOfType(MarkdownView);
			if (markdownView) {
				// 如果 checking 为 true，我们只是在"检查"命令是否可以运行
				// 如果 checking 为 false，则实际执行操作
				if (!checking) {
					new SampleModal(plugin.app).open();
				}

				// 只有当检查函数返回 true 时，此命令才会在命令面板中显示
				return true;
			}
			return false;
		}
	});
}

