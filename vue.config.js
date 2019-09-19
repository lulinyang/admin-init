module.exports = {
	publicPath: './',
	productionSourceMap: false,
	devServer: {
		proxy: {
			"/api/*": {
				target: 'https://city.newcoc.cn',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					"^/api": "/"
				}
			}
		},
		port: 3000,
		disableHostCheck: false,
	},
	configureWebpack: {
		performance: {
			hints: false,
		}
	}

}