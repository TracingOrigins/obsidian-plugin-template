import { ItemView, WorkspaceLeaf } from 'obsidian';

export const VIEW_TYPE_SAMPLE = 'sample-view';

/**
 * 示例视图
 * 演示如何创建自定义视图
 */
export class SampleView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_SAMPLE;
	}

	getDisplayText() {
		return '示例视图';
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		if (!container) return;
		container.empty();
		container.createEl('h2', { text: '示例视图' });
		container.createEl('p', { text: '这是一个示例视图。' });
	}

	async onClose() {
		// 清理资源
	}
}

