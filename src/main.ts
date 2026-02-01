import {Notice, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, SampleSettings} from "./types/settings";
import {SampleSettingTab} from "./settings/SettingTab";
import {registerCommands} from "./commands";
import {SampleView, VIEW_TYPE_SAMPLE} from "./ui/views/SampleView";

// 注意：请重命名这些类和接口！

export default class SamplePlugin extends Plugin {
	settings: SampleSettings;

	async onload() {
		await this.loadSettings();

		// 注册自定义视图
		this.registerView(VIEW_TYPE_SAMPLE, (leaf) => new SampleView(leaf));

		// 在左侧功能区创建一个图标
		this.addRibbonIcon('puzzle', '示例插件', (evt: MouseEvent) => {
			// 当用户点击图标时调用
			new Notice('这是一个通知！');
		});

		// 在应用底部添加状态栏项。在移动应用中不起作用
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('状态栏文本');

		// 注册所有命令
		registerCommands(this);

		// 添加设置选项卡，以便用户配置插件的各个方面
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// 如果插件挂接了任何全局 DOM 事件（在不属于此插件的应用部分）
		// 使用此函数将在插件禁用时自动移除事件监听器
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			new Notice("点击");
		});

		// 注册间隔时，此函数将在插件禁用时自动清除间隔
		// 添加 ESLint 注释，忽略 eslint 错误
		// eslint-disable-next-line obsidianmd/no-sample-code, no-console
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<SampleSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

