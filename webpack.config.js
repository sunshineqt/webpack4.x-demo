// "start": "cross-env NODE_ENV=development webpack-dev-server --open --config webpack.dev.js",
// "build": "cross-env NODE_ENV=production  webpack --config webpack.prod.js"

const path = require('path')
// 支持html热更新
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 支持css热更新
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const devMode = process.env.NODE_ENV !== 'production'
// js压缩
const uglify = require('uglifyjs-webpack-plugin');
// css分离
const extractTextPlugin = require("extract-text-webpack-plugin");

// 图片路径
var website ={
    publicPath:"http://192.168.0.102:1717/"
}

module.exports = {
    devtool:'null',//注意，这能大大压缩我们的打包代码
    entry:'./src/entry.js',
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'bundle.js',
        publicPath:website.publicPath
    },
    mode:'development',
    module:{
            rules:[
                {
                    test: /\.css$/,
                    use: extractTextPlugin.extract({
                      fallback: "style-loader",
                      use: "css-loader"
                    })
                  },
                // {
                //     test: /\.css$/,
                //     use: [ 'style-loader', 'css-loader' ]
                // },
                {
                    test:/\.(png|jpg|gif)/ ,
                    use:[{
                        loader:'url-loader',
                        options:{
                            limit:500000,
                            outputPath:'imgs/'
                        }
                    }]
                 },
                 {
                    test: /\.(htm|html)$/i,
                     use:[ 'html-withimg-loader'] 
                },
                // {
                //     test: /\.less$/,
                //     use: [{
                //            loader: "style-loader" // creates style nodes from JS strings
                //         }, {
                //             loader: "css-loader" // translates CSS into CommonJS
                //         },{
                //             loader: "less-loader" // compiles Less to CSS
                //         }]
                // }
                {
                    test: /\.less$/,
                    use: extractTextPlugin.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "less-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.scss$/,
                    use: extractTextPlugin.extract({
                        use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
                // {
                //     test:/\.(jsx|js)$/,
                //     use:{
                //         loader:'babel-loader',
                //         options:{
                //             presets:[  // 可以写在专门的配置文件里.babelIrc
                //                 "es2015","react"
                //             ]
                //         }
                //     },
                //     exclude:/node_modules/
                // }
                {
                    test:/\.(jsx|js)$/,
                    use:{
                        loader:'babel-loader',
                    },
                    exclude:/node_modules/
                }
                // {
                //     test:/\.css$/,
                //     use: [
                //         {
                //             loader: "style-loader"
                //         }, {
                //             loader: "css-loader"
                //         }
                //     ]
                // }

                // {
                //     test: /\.(sa|sc|c)ss$/,
                //     use: [
                //       devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                //       'css-loader',
                //       {
                //         loader:"postcss-loader",    //本文未用到此loader...
                //         options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                //             plugins: (loader) => []
                //         }
                //       },
                //       'sass-loader',
                //     ],
                // }
            ]
    },
       //插件，用于生产模版和各项功能
    plugins:[
        // new HtmlWebpackPlugin({template: './dist/index.html'}),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //   })
        new uglify(),
        new HtmlWebpackPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
           
        }),
        new extractTextPlugin("/css/index.css")
        // new extractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     allChunks: false,
        // })
    ],
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
    
}