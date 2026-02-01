import { App, Modal } from 'obsidian';

// 添加 ESLint 注释，忽略 eslint 错误
// eslint-disable-next-line obsidianmd/sample-names
export class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('这是一个示例模态框');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}