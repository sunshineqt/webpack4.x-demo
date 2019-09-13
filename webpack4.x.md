# webpack4.x

## webpack
> 模块打包工具，分析项目结构，找到js模块及一些浏览器不能运行的语言如ES6/sass等，并将其转换和打包为何时的格式供浏览器使用；
    > + 打包：将多个js文件打包成一个文件，减少服务器压力和下载带宽；
    > + 转换：把浏览器不能识别的语言转换为js，让浏览器能够正确识别
    > + 优化：优化项目，提高性能

## 安装
  ~~~
    // 新建项目文件夹，并进入
    mkdir webpack_demo
    cd webpack_demo
    //全局安装
    npm install -g webpack

    // 全局安装后还需进行一个项目目录的安装，npm安装之前先进行初始化，目的-生成package.json文件（包括当前项目依赖模块，自定义脚本任务等）
    npm n init
    // 项目目录的安装 --save-dev保存到package.json中且在dev开发中使用，生产环境中不使用；
    npm install --save-dev webpack
    // 查看webpack版本
    webpack -v
    // ps:查看webpack版本时会提示安装webpack-cli，因为此时安装的webpack版本是4.x；webpack 已经将 webpack 命令行相关的内容都迁移到 webpack-cli，所以除了 webpack 外，还需要安装 webpack-cli
    npm install --save-dev webpack-cli -g
  ~~~

## demo
 > 建立基本项目结构，根目录下建立src和dist文件夹
 > + src:存放JavaScript代码
 > + dist:用来存放浏览器读取的文件，webpack打包后的文件
 > + 手动在dist文件夹下新建index.html，并写入代码
 ~~~
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>jspang webpack</title>
  </head>
  <body>
      <div id="title"></div>
      <script src="./bundle.js"></script>
  </body>
  </html>
 ~~~
> + 此处引入的bundle.js文件目前还没有，后续webpack打包生成该文件；
> + 在src下建立入口文件entry.js：
~~~
  document.getElementById('title').innerHTML='Hello Webpack';
~~~
> + webpack打包，webpack3.x打包方式webpack src/entry.js ./dist/bundle.js，但webpack4.x已不支持该打包方式，
~~~
 // 报错信息
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
~~~
> + 解决办法，在package.json中增加scripts命令：
~~~
"dev": "webpack --mode development",
"build": "webpack --mode production"
~~~
> + npm run build 则在dist文件夹下创建一个打包好的main.js文件，若输出文件名需要更改，如输出bundle.js，则可以在根目录下新建webpack.config.js文件，设置输入输出文件情况
~~~
  const path = require('path')
  module.exports = {
      entry:'./src/entry.js',
      output:{
          path:path.resolve(__dirname, 'dist'),
          filename:'bundle.js'
      },
      mode:'development'
  }
~~~
> + 运行npm run build并在浏览器里打开index.html即可看到Hello Webpack

## 配置文件webpack.config.js
> webpack.config.js是Webpack的配置文件，该文件需要自己在项目根目录下手动建立然后对其进行配置，配置模板如下：
~~~
  module.exports={
      // 入口文件的配置项
      entry:{},
      // 出口文件的配置项
      output:{},
      // 模块：例如解读CSS,图片如何转换，压缩
      module:{},
      // 插件，用于生产模版和各项功能
      plugins:[],
      // 配置webpack开发服务功能
      devServer:{}
  }
~~~

~~~
  // 入口文件的配置项
  entry:{
      //里面的entery是可以随便写的
      entry:'./src/entry.js'
  }
~~~

~~~
// 出口配置是用来告诉webpack最后打包文件的地址和文件名称的
output:{
    //打包的路径位置，path.resolve(__dirname,’dist’)获取项目的绝对路径
    path:path.resolve(__dirname,'dist'),
    //打包的文件名称
    filename:'bundle.js'
    
}
~~~

> ps：记得引入path，否则找不到path，无法使用resolve方法

~~~
  const  path  =  `require`('path');
~~~

> 多入口-多出口配置

~~~
  const path = `require`('path');
  module.exports={
      // 入口文件的配置项
      entry:{
          entry:'./src/entry.js',
          // 又引入了一个入口文件
          entry2:'./src/entry2.js'
      },
      // 出口文件的配置项
      output:{
          // 输出的路径，用了Node语法
          path:path.resolve(__dirname,'dist'),
          // 输出的文件名称
          // [name]的意思是根据入口文件的名称，打包成相同的名称，有几个入口文件，就可以打包出几个文件
          filename:'[name].js'
      },
      // 模块：例如解读CSS,图片如何转换，压缩
      module:{},
      // 插件，用于生产模版和各项功能
      plugins:[],
      // 配置webpack开发服务功能
      devServer:{}
  }
~~~

## 配置文件：服务和热更新
###设置webpack-dev-server
> 要执行webpack-dev-server要先npm install webpack-dev-server –save-dev,然后配置一下devServer

~~~
  // webpack.config.js
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
~~~
> + contentBase:配置服务器基本运行路径，用于找到程序打包地址;
> + host：服务运行地址，建议使用本机IP;
> + compress：服务器端压缩选型，一般设置为开启;
> + port：服务运行端口;

~~~
  // --save-dev 本地安装并保存到package.json
  npm install webpack-dev-server --save-dev
~~~

~~~
  // package.json 
  "devDependencies": {
    "webpack-dev-server": "^3.8.0"
  }
~~~
> 然后在package.json的文件夹中增加scripts命令：

~~~
  "scripts": {
    "server":"webpack-dev-server"
  }
~~~
> 运行npm run server , 成功之后在浏览器中打开http://localhost:1717/ 即可看到index.html中对应内容

> 在npm run server 启动后，它是有一种监控机制的（也叫watch）。它可以监控到我们修改源码，并立即在浏览器里给我们更新。

> webpack 的 webapck-dev-server 包会启动一个开发服务器，当修改入口文件或者入口文件中引入的其他文件时，webpack会自动编译入口文件，然后刷新整个页面。ps:改变html或样式不会自动刷新页面，需要手动刷新才能看到效果。windows

> 解决html改变不刷新的问题：使用插件  npm install --save-dev html-webpack-plugin 

~~~
  // webpack.config.js

  var HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins:[
        new HtmlWebpackPlugin({template: './dist/index.html'})
    ],
~~~

## 模块：css文件打包

> 通过使用不同的Loader，Webpack可以对不同的文件格式进行特定处理
> Loaders的配置:
  > + test：用于匹配处理文件的扩展名的表达式；
  > + use：loader名称，即要使用模块的名称；
  > + include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
  > + query：为loaders提供额外的设置选项（可选）；


> 在/src下，建立一个css文件夹，并建立index.css文件

~~~
  #title{
      font-size: 20px;
      color:red;
  }
  body{
      background-color:gainsboro;
  }
~~~

> CSS文件建立好后，需要引入到入口文件中，才可以打包到，这里引入到entry.js中。/src/entery.js中在首行加入代码：

~~~
  import css from './css/index.css';
~~~

> 使用loader解析CSS文件，style-loader(用来处理css文件中的url()等)和css-loader(将css插入到页面的style标签)  npm install style-loader --save-dev   npm install --save-dev css-loader

~~~
  module:{
          rules: [
              {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
              }
            ]
  },
~~~

~~~
  module:{
          rules:[
              {
                  test:/\.css$/,
                  loader:['style-loader','css-loader']
              }
          ]
  },
~~~

~~~
    module:{
          rules:[
              {
                  test:/\.css$/,
                  use: [
                      {
                          loader: "style-loader"
                      }, {
                          loader: "css-loader"
                      }
                  ]
              }
          ]
      },
~~~

> ps:此时更改css可以自动刷新；以上三种写法都可以


## 插件配置：配置JS压缩
> uglifyjs-webpack-plugin(JS压缩插件，简称uglify webpack里已集成，不需再次安装。

~~~
const uglify = `require`('uglifyjs-webpack-plugin');

plugins:[
        new uglify()
    ],
~~~

> ps:devServer和JS压缩的冲突 导致此时运行出错


## 插件配置：HTML文件的发布
###devServer和js压缩冲突
> 开发环境中是基本不会对js进行压缩的，在开发预览时我们需要明确的报错行数和错误信息，所以完全没有必要压缩JavasScript代码。而生产环境中才会压缩JS代码，用于加快程序的工作效率。devServer用于开发环境，而压缩JS用于生产环境，在开发环境中作生产环境的事情所以Webpack设置了冲突报错。

> 将dist文件下html文件剪切到src目录中，并去掉js的引入，webpack会自动引
> webpack.config.js 引入html-webpack-plugin插件并安装 npm install --save-dev html-webpack-plugin

~~~
  const htmlPlugin= require('html-webpack-plugin');
~~~

> 在webpack.config.js里的plugins里进行插件配置

~~~
  new htmlPlugin({
              minify:{
                  removeAttributeQuotes:true
              },
              hash:true,
              template:'./src/index.html'
            
  })
~~~
> + minify：是对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号。
> + hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
> + template：是要打包的html模版路径和文件名称。

> 在终端中使用webpack，进行打包。可看到index.html文件已经被打包到我们的dist目录下了，且自动引入了入口的JS文件
> html文件的打包可以有效的区分开发目录和生产目录，在webpack的配置中要清楚哪些配置用于生产环境，哪些配置用于开发环境，避免两种环境的配置冲突


## CSS中的图片处理
> src目录下新建imgs文件夹,在src下的index.html文件中引入该图片，运行报错，缺少loader的解析，安装file-loader和url-loader
> npm install --save-dev file-loader url-loader
> + file-loader:解决引用路径问题，css中引入背景图，webpack将把各个模块打包成一个文件，样式中的url是相对入口html的而不是相对原始css文件所在的路径的，则会导致图片引入失败；可以使用file-loader解决，file-loader可以解析项目中的url引入，根据配置可以将图片拷贝到相应的路径，修改打包后的文件引用路径，使之指向正确的文件
> + url-loader:很多图片会发送很多http请求,降低页面性能，可以使用url-loader解决。url-loader会将引入的图片编码，生成dataURI，相当于把数据翻译成一串字符（base64），再把字符打包到文件中，所以只需要引入这个文件就能访问图片了。如果图片较大，编码会消耗性能，因此url-loader提供了一个limit参数，小于该字节的文件被转为dataURI,大于的使用file-loader进行copy
> + url-loader封装了file-loader,所以只需引入url-loader即可

~~~
 //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
              test: /\.css$/,
              use: [ 'style-loader', 'css-loader' ]
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000
                   }
               }]
            }
          ]
    },
~~~

> + test:/.(png|jpg|gif)/是匹配图片文件后缀名称。
> + use：是指定使用的loader和loader的配置参数。
> + limit：是把小于500000B的文件打成Base64的格式，写入JS。

> + 1.文件大小小于limit参数，url-loader将会把文件转为DataURL（Base64格式）；
> + 2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader


## css分离与图片路径处理
> + 把CSS从JavasScript代码中分离出来，
> + 如何处理分离出来后CSS中的图片路径不对问题。

> CSS分离:extract-text-webpack-plugin  npm install --save-dev extract-text-webpack-plugin
~~~
const extractTextPlugin = require("extract-text-webpack-plugin");
// 设置plugins
new extractTextPlugin("/css/index.css")

// 这里的/css/index.css是分离后的路径位置。这部配置完成后，包装代码：还要修改原来我们的style-loader和css-loader。
module:{
        rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500000
                   }
               }]
            }
          ]
    },
~~~

> 图片路径问题：
> publicPath：是在webpack.config.js文件的output选项中，主要作用就是处理静态文件路径的。
> 在处理前，我们在webpack.config.js 上方声明一个对象，叫website

~~~
var website ={
    publicPath:"http://本机或devServer配置的ip:1717/"
}
~~~

> 然后在output选项中引用这个对象的publicPath属性。

~~~
//出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js',
        publicPath:website.publicPath
    },
~~~


## 处理html中图片
> html-withimg-loader可以很好的处理我们在html中引入图片的问题

~~~
  "scripts": {
    "server": "webpack-dev-server --open",
    "build":"webpack"
  },
~~~

> 则可以直接使用npm run build 即相当于全局使用webpack命令，完成打包；

> 如何把图片放到指定的文件夹下:配置url-loader选项

~~~
module:{
        rules: [
            {
              test: /\.css$/,
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
               test:/\.(png|jpg|gif)/ ,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:5000,
                       outputPath:'imgs/',
                   }
               }]
            }
          ]
    },
~~~

> outputPath:'imgs/',如果图片大小小于limit值，则图片会生成base64格式，则dist文件夹下就不会生成imgs标签，而如果图片大于limit值，则不会采用生成字符串形式处理图片，而是采用file-loader方式copy图片，则此时会生成imgs文件夹并调整图片引用路径；
> ps:在不设置limit时，limit自带默认值

> html-withimg-loader  解决在hmtl文件中引入标签的问题 npm install html-withimg-loader --save

~~~
{
    test: /\.(htm|html)$/i,
     use:[ 'html-withimg-loader'] 
}
~~~


## less文件的打包和分离
> npm install --save-dev less        npm n install --save-dev less-loader
> loader配置：

~~~
  {
      test: /\.less$/,
      use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
  }
~~~

~~~
// 分离
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
 }
~~~


## SASS文件的打包和分离
> npm n install --save-dev node-sass   npm install --save-dev sass-loader

~~~
{
    test: /\.scss$/,
    use: [{
         loader: "style-loader" // creates style nodes from JS strings
        }, {
         loader: "css-loader" // translates CSS into CommonJS
        }, {
        loader: "sass-loader" // compiles Sass to CSS
     }]
}
~~~

~~~
// 把SASS文件分离
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
 }
~~~

> 不要忘记把sass文件引入到entery.js中。


## 自动处理CSS3属性前缀

~~~
// 属性前缀
-webkit-transform: rotate(45deg);
        transform: rotate(45deg);
~~~
> 浏览器的兼容性，加入-webkit,-ms,-o,-moz这些前缀。PostCSS是一个CSS的处理平台，它可以帮助你的CSS实现更多的功能，如加前缀的功能
> 需要安装两个包postcss-loader 和autoprefixer（自动添加前缀的插件）
> npm install --save-dev postcss-loader autoprefixer
> postCSS推荐在项目根目录（和webpack.config.js同级），建立一个postcss.config.js文件

~~~
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
~~~

~~~
{
      test: /\.css$/,
      use: [
            {
              loader: "style-loader"
            }, {
              loader: "css-loader",
              options: {
                 modules: true
              }
            }, {
              loader: "postcss-loader"
            }
      ]
}
~~~

~~~
{
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ]
    })
    
}
~~~


## 消除未使用的CSS
> 使用PurifyCSS可以大大减少CSS冗余  npmn  i -D purifycss-webpack purify-css
> 需要同步检查html模板，则需引入node的glob对象使用。在webpack.config.js文件头部引入glob  purifycss-webpack
> const glob = require('glob');
> const PurifyCSSPlugin = require("purifycss-webpack");

~~~
plugins:[
    //new uglify() 
    new htmlPlugin({
        minify:{
            removeAttrubuteQuotes:true
        },
        hash:true,
        template:'./src/index.html'
        
    }),
    new extractTextPlugin("css/index.css"),
    new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
        })
 
]
~~~

> paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。

## 给webpack增加babel支持
> Babel是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析ES6的babel-preset-es2015包和解析JSX的babel-preset-react包）。
> cnpm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

~~~
{
    test:/\.(jsx|js)$/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[
                "es2015","react"
            ]
        }
    },
    exclude:/node_modules/
}
~~~

> 现在官方推荐使用的是babel-preset-env,  	npm n install --save-dev babel-preset-env
然后修改.babelrc里的配置文件。其实只要把之前的es2015换成env就可以了。

~~~
{
    "presets":["react","env"]
}
~~~

> 在使用webpack时只要通过简单的devtool配置，webapck就会自动给我们生产source maps 文件，map文件是一种对应编译文件和源文件的方法，让我们调试起来更简单。

四种选项

在配置devtool时，webpack给我们提供了四种选项。

source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,但是它会减慢打包速度；
cheap-module-source-map:在一个单独的文件中产生一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）,会对调试造成不便。
eval-source-map:使用eval打包源文件模块，在同一个文件中生产干净的完整版的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定要不开启这个选项。
cheap-module-eval-source-map:这是在打包文件时最快的生产source map的方法，生产的 Source map 会和打包后的JavaScript文件同行显示，没有影射列，和eval-source-map选项具有相似的缺点。

~~~
  module.exports = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/app/main.js",
    output: {
      path: __dirname + "/public",
      filename: "bundle.js"
    }
  }
~~~









ps:extract-text-webpack-plugin不知是版本问题还是什么情况，不正常啊


参考 & 感谢：
> https://jspang.com/posts/2017/09/16/webpack3.html(强烈推荐啊)
> https://www.jianshu.com/p/c094e42b0bc2
> https://blog.csdn.net/xum222222/article/details/79889793