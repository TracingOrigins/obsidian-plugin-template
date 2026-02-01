import { Editor, MarkdownView, Plugin } from 'obsidian';
import { COMMAND_IDS } from '../constants/commands';

/**
 * 替换选中内容命令
 */
export function registerReplaceSelectedCommand(plugin: Plugin): void {
	plugin.addCommand({
		id: COMMAND_IDS.REPLACE_SELECTED,
		name: '替换选中内容',
		editorCallback: (editor: Editor, view: MarkdownView) => {
			editor.replaceSelection('示例编辑器命令');
		}
	});
}

