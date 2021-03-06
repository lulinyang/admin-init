import config from "@/config/index";
const toolbars = [
	[
		"fullscreen", "source", "|", "undo", "redo", "|", "bold", "italic", "underline",
		"fontborder", "strikethrough", "superscript", "subscript", "removeformat", "formatmatch", "autotypeset", "blockquote", "pasteplain", "|",
		"forecolor", "backcolor", "insertorderedlist", "insertunorderedlist", "selectall", "cleardoc", "|", "rowspacingtop", "rowspacingbottom", "lineheight",
		"|", "customstyle", "paragraph", "fontfamily", "fontsize", "|", "directionalityltr", "directionalityrtl", "indent", "|", "justifyleft", "justifycenter", "justifyright",
		"justifyjustify", "|", "touppercase", "tolowercase", "|", "link", "unlink", "anchor", "|", "imagenone", "imageleft", "imageright", "imagecenter", "|", "insertimage",
		"pagebreak", "template", "background", "|", "insertcode", "horizontal", "date", "time", "spechars", "snapscreen", "wordimage", "|", "inserttable", "deletetable", "insertparagraphbeforetable",
		"insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols", "charts", "|",
		"print", "preview", "searchreplace", "drafts",
	]
]

export default {
	toolbars,
	myConfig: {
		// 如果需要上传功能,找后端小伙伴要服务器接口地址
		serverUrl: config.baseUrl + "/api/v1/uploadImage",
		// 你的UEditor资源存放的路径,相对于打包后的index.html
		UEDITOR_HOME_URL: "/NEditor/",
		// 编辑器不自动被内容撑高
		autoHeightEnabled: false,
		// 初始容器高度
		initialFrameHeight: 500,
		// 初始容器宽度
		initialFrameWidth: "100%",
		// 关闭自动保存
		enableAutoSave: false,
		imageFieldName: "file",
		toolbars: toolbars
	}
}