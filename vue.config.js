const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].setupScript = process.env['WEBPACK_SERVE'] ? 'setup-standalone.js' : 'setup.js'
                return args;
            })
    }
})
