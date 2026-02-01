import {App, PluginSettingTab, Setting} from "obsidian";
import SamplePlugin from "../main";

// 添加 ESLint 注释，忽略 eslint 错误
// eslint-disable-next-line obsidianmd/sample-names
export class SampleSettingTab extends PluginSettingTab {
	plugin: SamplePlugin;
	/** 
	 * 设置标签页图标
	 * 用于在 Obsidian 设置页面左侧边栏的插件列表中显示图标标识
	 * "puzzle" 是 Obsidian 内置的 Lucide 图标名称，表示拼图相关的图标
	 * 该图标会显示在设置页面的插件列表项旁边，帮助用户快速识别插件
	 */
	icon: string = "puzzle";

	constructor(app: App, plugin: SamplePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('请输入您的 API 密钥')
			.setDesc('这是机密信息')
			.addText(text => text
				.setPlaceholder('请输入您的密钥')
				.setValue(this.plugin.settings.apikey)
				.onChange(async (value) => {
					this.plugin.settings.apikey = value;
					await this.plugin.saveSettings();
				}));
	}
}
