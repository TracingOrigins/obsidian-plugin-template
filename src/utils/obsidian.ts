/**
 * Obsidian 官方 API 工具函数
 * 统一导出 Obsidian 提供的实用工具函数
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/
 * 
 * 共 47 个工具函数，已全部列出
 * 
 * 函数分类统计：
 * - 防抖函数（1 个）
 * - 路径处理（1 个）
 * - 链接处理（2 个）
 * - 标题处理（2 个）
 * - YAML 处理（2 个）
 * - HTML 转 Markdown（1 个）
 * - 数组缓冲区转换（4 个）
 * - 图标处理（5 个）
 * - 工具提示（2 个）
 * - 搜索相关（5 个）
 * - 数学渲染（3 个）
 * - 其他库加载（3 个）
 * - 元数据处理（6 个）
 * - 其他工具（10 个）
 */

// ==================== 防抖函数 ====================
/**
 * 防抖函数
 * 延迟执行函数，直到在指定时间内没有新的调用
 * @param cb - 要防抖的回调函数
 * @param timeout - 延迟时间（毫秒），默认值根据 Obsidian 设置
 * @param resetTimer - 是否重置计时器，默认 false
 * @returns Debouncer 对象，可以调用、取消或立即执行
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/debounce
 */
export { debounce } from 'obsidian';

// ==================== 路径处理 ====================
/**
 * 规范化文件路径
 * 统一路径格式，移除多余的斜杠等
 * @param path - 文件路径
 * @returns 规范化后的路径
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/normalizePath
 */
export { normalizePath } from 'obsidian';

// ==================== 链接处理 ====================
/**
 * 将链接文本转换为链接路径
 * 将 wikilink 文本（不含 [[ 和 ]]）转换为文件路径
 * @param linktext - wikilink 文本，不含 [[ 和 ]]
 * @returns 链接指向的文件名
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/getLinkpath
 */
export { getLinkpath } from 'obsidian';

/**
 * 解析链接文本
 * 将链接文本解析为路径和子路径
 * @param linktext - 链接文本
 * @returns 包含 path 和 subpath 的对象
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/parseLinktext
 */
export { parseLinktext } from 'obsidian';

// ==================== 标题处理 ====================
/**
 * 移除标题标记
 * 从标题文本中移除 Markdown 标题标记（#）
 * @param heading - 标题文本
 * @returns 移除标记后的标题文本
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/stripHeading
 */
export { stripHeading } from 'obsidian';

/**
 * 为链接准备标题
 * 移除标题标记并清理可能破坏链接的特殊字符组合
 * @param heading - 标题文本
 * @returns 适合用于链接的标题文本
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/stripHeadingForLink
 */
export { stripHeadingForLink } from 'obsidian';

// ==================== YAML 处理 ====================
/**
 * 解析 YAML 字符串
 * 将 YAML 字符串解析为 JavaScript 对象
 * @param yaml - YAML 字符串
 * @returns 解析后的对象
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/parseYaml
 */
export { parseYaml } from 'obsidian';

/**
 * 序列化对象为 YAML 字符串
 * 将 JavaScript 对象转换为 YAML 格式字符串
 * @param obj - 要序列化的对象
 * @returns YAML 格式字符串
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/stringifyYaml
 */
export { stringifyYaml } from 'obsidian';

// ==================== HTML 转 Markdown ====================
/**
 * HTML 转 Markdown
 * 将 HTML 元素或字符串转换为 Markdown 格式
 * @param html - HTML 字符串、HTMLElement、Document 或 DocumentFragment
 * @returns Markdown 格式字符串
 * @public
 * 参考: https://docs.obsidian.md/Reference/TypeScript+API/htmlToMarkdown
 */
export { htmlToMarkdown } from 'obsidian';

// ==================== 数组缓冲区转换 ====================
/**
 * ArrayBuffer 转 Base64 字符串
 * @param buffer - ArrayBuffer 对象
 * @returns Base64 编码的字符串
 * @public
 */
export { arrayBufferToBase64 } from 'obsidian';

/**
 * ArrayBuffer 转十六进制字符串
 * @param data - ArrayBuffer 对象
 * @returns 十六进制字符串
 * @public
 */
export { arrayBufferToHex } from 'obsidian';

/**
 * Base64 字符串转 ArrayBuffer
 * @param base64 - Base64 编码的字符串
 * @returns ArrayBuffer 对象
 * @public
 */
export { base64ToArrayBuffer } from 'obsidian';

/**
 * 十六进制字符串转 ArrayBuffer
 * @param hex - 十六进制字符串
 * @returns ArrayBuffer 对象
 * @public
 */
export { hexToArrayBuffer } from 'obsidian';

// ==================== 图标处理 ====================
/**
 * 添加图标到图标库
 * @param iconId - 图标 ID
 * @param svgContent - SVG 内容
 * @public
 */
export { addIcon } from 'obsidian';

/**
 * 根据图标 ID 创建 SVG 元素
 * @param iconId - 图标 ID
 * @returns SVG 元素，如果图标不存在则返回 null
 * @public
 */
export { getIcon } from 'obsidian';

/**
 * 获取所有已注册的图标 ID 列表
 * @returns 图标 ID 数组
 * @public
 */
export { getIconIds } from 'obsidian';

/**
 * 从图标库中移除图标
 * @param iconId - 要移除的图标 ID
 * @public
 */
export { removeIcon } from 'obsidian';

/**
 * 在父元素上设置图标
 * @param parent - 父 HTML 元素
 * @param iconId - 图标 ID
 * @public
 */
export { setIcon } from 'obsidian';

// ==================== 工具提示 ====================
/**
 * 手动触发工具提示
 * 在指定元素上显示工具提示（不会自动在悬停时显示）
 * @param newTargetEl - 目标 HTML 元素
 * @param content - 工具提示内容（字符串或 DocumentFragment）
 * @param options - 工具提示选项
 * @public
 * @since 1.8.7
 */
export { displayTooltip } from 'obsidian';

/**
 * 设置元素悬停时显示的工具提示
 * @param el - HTML 元素
 * @param tooltip - 工具提示文本
 * @param options - 工具提示选项
 * @public
 */
export { setTooltip } from 'obsidian';

// ==================== 搜索相关 ====================
/**
 * 准备模糊搜索函数
 * 构造一个模糊搜索回调函数
 * @param query - 搜索查询字符串
 * @returns 搜索回调函数，应用于目标字符串
 * @public
 */
export { prepareFuzzySearch } from 'obsidian';

/**
 * 准备简单搜索函数
 * 构造一个简单搜索回调函数（空格分隔的单词）
 * @param query - 空格分隔的搜索词
 * @returns 搜索回调函数，应用于目标字符串
 * @public
 */
export { prepareSimpleSearch } from 'obsidian';

/**
 * 渲染搜索匹配结果
 * 在元素中高亮显示搜索匹配的文本
 * @param el - HTML 元素或 DocumentFragment
 * @param text - 要渲染的文本
 * @param matches - 匹配结果
 * @param offset - 偏移量（可选）
 * @public
 */
export { renderMatches } from 'obsidian';

/**
 * 渲染搜索结果
 * 在元素中渲染搜索结果
 * @param el - HTML 元素
 * @param text - 要渲染的文本
 * @param result - 搜索结果
 * @param offset - 偏移量（可选）
 * @public
 */
export { renderResults } from 'obsidian';

/**
 * 对搜索结果进行排序
 * @param results - 搜索结果容器数组
 * @public
 */
export { sortSearchResults } from 'obsidian';

// ==================== 数学渲染 ====================
/**
 * 完成数学公式渲染
 * 等待所有待处理的数学公式渲染完成
 * @returns Promise，在所有数学公式渲染完成后解析
 * @public
 */
export { finishRenderMath } from 'obsidian';

/**
 * 加载 MathJax 库
 * 异步加载 MathJax 数学公式渲染库
 * @returns Promise，在库加载完成后解析
 * @public
 */
export { loadMathJax } from 'obsidian';

/**
 * 渲染数学公式
 * 将数学公式源代码渲染为 HTML 元素
 * @param source - 数学公式源代码（LaTeX 格式）
 * @param display - 是否为块级显示（true）或行内显示（false）
 * @returns 渲染后的 HTML 元素
 * @public
 */
export { renderMath } from 'obsidian';

// ==================== 其他库加载 ====================
/**
 * 加载 Mermaid 图表库
 * 异步加载 Mermaid 图表渲染库
 * @returns Promise，在库加载完成后解析
 * @public
 */
export { loadMermaid } from 'obsidian';

/**
 * 加载 PDF.js 库
 * 异步加载 PDF.js PDF 渲染库
 * @returns Promise，在库加载完成后解析
 * @public
 */
export { loadPdfJs } from 'obsidian';

/**
 * 加载 Prism 语法高亮库
 * 异步加载 Prism 代码语法高亮库
 * @returns Promise，在库加载完成后解析
 * @public
 */
export { loadPrism } from 'obsidian';

// ==================== 元数据处理 ====================
/**
 * 获取所有标签
 * 从缓存元数据中提取所有标签
 * @param cache - 缓存元数据对象
 * @returns 标签数组，如果没有标签则返回 null
 * @public
 */
export { getAllTags } from 'obsidian';

/**
 * 获取文件前置元数据信息
 * 从文件内容中提取前置元数据信息，包括是否存在前置元数据块、起始和结束位置、前置元数据文本
 * @param content - 文件内容
 * @returns 前置元数据信息对象
 * @public
 * @since 1.5.7
 */
export { getFrontMatterInfo } from 'obsidian';

/**
 * 解析前置元数据中的别名
 * @param frontmatter - 前置元数据对象或 null
 * @returns 别名数组，如果没有则返回 null
 * @public
 */
export { parseFrontMatterAliases } from 'obsidian';

/**
 * 解析前置元数据中的条目
 * @param frontmatter - 前置元数据对象或 null
 * @param key - 键名或正则表达式
 * @returns 匹配的值
 * @public
 */
export { parseFrontMatterEntry } from 'obsidian';

/**
 * 解析前置元数据中的字符串数组
 * @param frontmatter - 前置元数据对象或 null
 * @param key - 键名或正则表达式
 * @returns 字符串数组
 * @public
 */
export { parseFrontMatterStringArray } from 'obsidian';

/**
 * 解析前置元数据中的标签
 * @param frontmatter - 前置元数据对象或 null
 * @returns 标签数组
 * @public
 */
export { parseFrontMatterTags } from 'obsidian';

// ==================== 其他工具 ====================
/**
 * 获取 Blob 的 ArrayBuffer
 * 将 Blob 对象转换为 ArrayBuffer
 * @param blob - Blob 对象
 * @returns Promise，解析为 ArrayBuffer
 * @public
 */
export { getBlobArrayBuffer } from 'obsidian';

/**
 * 获取当前配置的应用语言 ISO 代码
 * 默认返回 'en'
 * @returns 语言 ISO 代码（如 'zh-CN', 'en' 等）
 * @public
 * @since 1.8.7
 */
export { getLanguage } from 'obsidian';

/**
 * 迭代缓存引用
 * 遍历缓存元数据中的所有引用
 * @param cache - 缓存元数据对象
 * @param cb - 回调函数，返回 false 可停止迭代
 * @returns 是否完成迭代
 * @public
 */
export { iterateCacheRefs } from 'obsidian';

/**
 * 迭代引用
 * 遍历引用数组
 * @param refs - 引用数组
 * @param cb - 回调函数，返回 false 可停止迭代
 * @returns 是否完成迭代
 * @public
 */
export { iterateRefs } from 'obsidian';

/**
 * 解析属性 ID
 * 将 Bases 属性 ID 拆分为组成部分
 * @param propertyId - 属性 ID
 * @returns 属性对象
 * @public
 * @since 1.10.0
 */
export { parsePropertyId } from 'obsidian';

/**
 * HTTP/HTTPS 请求（返回字符串）
 * 类似 fetch()，但无 CORS 限制，返回字符串响应
 * @param request - 请求参数对象或 URL 字符串
 * @returns Promise，解析为响应字符串
 * @public
 */
export { request } from 'obsidian';

/**
 * HTTP/HTTPS 请求（返回完整响应）
 * 类似 fetch()，但无 CORS 限制，返回完整响应对象
 * @param request - 请求参数对象或 URL 字符串
 * @returns Promise，解析为响应对象
 * @public
 */
export { requestUrl } from 'obsidian';

/**
 * 检查 API 版本要求
 * 检查当前 API 版本是否满足要求
 * @param version - 所需的最低 API 版本
 * @returns 是否满足版本要求
 * @public
 */
export { requireApiVersion } from 'obsidian';

/**
 * 解析子路径
 * 从缓存元数据中解析子路径（如标题、块、脚注等）
 * @param cache - 缓存元数据对象
 * @param subpath - 子路径字符串
 * @returns 子路径结果（标题、块或脚注），如果未找到则返回 null
 * @public
 */
export { resolveSubpath } from 'obsidian';

/**
 * 将 HTML 字符串转换为安全的 DOM 片段
 * 清理 HTML 字符串并转换为 DocumentFragment
 * @param html - HTML 字符串
 * @returns DocumentFragment 对象
 * @public
 */
export { sanitizeHTMLToDom } from 'obsidian';
