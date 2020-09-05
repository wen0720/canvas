const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        canvas2: './src/canvas-2.js',
        canvas3: './src/canvas-3.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    plugins: [
        new cleanWebpackPlugin(),  // 清除掉 /dist 檔案的資料，在每次包版的時候
        new HtmlWebpackPlugin({
            title: 'canvas 城堡',
            filename: 'index.html',  // 輸出後的路徑
            template: 'src/index.html',  // 被編譯的模板
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'canvas 9 宮格',
            filename: 'canvas-2.html',
            template: 'src/canvas-2.html',
            chunks: ['canvas2']
        }),
        new HtmlWebpackPlugin({
           title: '物理模擬',
           filename: 'canvas-3.html',
           template: 'src/canvas-3.html',
           chunks: ['canvas3']
        })
    ]
}
