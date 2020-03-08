const path = require('path');
const fs = require('fs');										
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {                                         //константа для путей с разными ресурсами
		src: path.join(__dirname, '../src'),                 //путь до src !ИМЕННО ЗДЕСЬ СТОИТ МЕНЯТЬ НАЗВАНИЕ ПАПКИ!
		dist: path.join(__dirname, '../dist'),               //путь до dist !ИМЕННО ЗДЕСЬ СТОИТ МЕНЯТЬ НАЗВАНИЕ ПАПКИ!
		assets: 'assets/',                                  //!ИМЕННО ЗДЕСЬ СТОИТ МЕНЯТЬ НАЗВАНИЕ ПАПКИ!
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
/* PAGES хранит все страницы html(pug) и тепрь их не нужно подключать каждую отдельно */
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))    

module.exports = {
		externals: {
				paths: PATHS
		},
		entry: {
				app: PATHS.src,                                 //точка входа(указание через константу PATHS)
		},
		output: {                                           //конечные файлы("точка выхода")
				filename: `${PATHS.assets}js/[name].[hash].js`,        //по указанному пути(указан на ES6) создает app.js(можно задать имя)
				path: PATHS.dist,                               //в корне в папке dist(имя можно задать)
				publicPath: '/'                             //
		},
		optimization: {																			//оптимизация
			splitChunks:{
				cacheGroups:{
					vendor:	{
						name: 'vendors',
						test:/node_modules/,
						chunks: 'all',
						enforce: true
					}
				}
			}										
		},
		module: {
				rules: [{                                     // правила для разных расширений
          test: /\.pug$/,                             // загрузчик для .pug
          loader: 'pug-loader',                        
      },{                                       
						test: /\.js$/,                              //правила для расширения .js
						loader: 'babel-loader',                     //обработчик для выбранного расширения
						//exclude: '/node-modules/'                   //исключения добавляются опционально, что бы повторно..
				},{                                             //..не производить сборку некоторых модулей. Например node-modules
						test: /\.css$/,
						use: [
								'style-loader',
								MiniCssExtractPlugin.loader,
								{
										loader: 'css-loader',
										options: { sourceMap: true }
								},{
										loader: 'postcss-loader',
										options: { sourceMap: true, config:{ path: `./postcss.config.js` }  }
								}
						]
				},{
						test: /\.scss$/,
						use: [
								'style-loader',
								MiniCssExtractPlugin.loader,
								{
										loader: 'css-loader',
										options: { sourceMap: true }
								},{
										loader: 'postcss-loader',
										options: { sourceMap: true, config:{ path: `./postcss.config.js` } }
								},{
										loader: 'sass-loader',
										options: { sourceMap: true }
								}
						]
				},{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]'
					}
				  }, {
						test: /\.(png|jpg|gif|svg)$/,               //регулярное выражение с расширениями файлов
						loader: 'file-loader',
						options: {
								name: '[name].[ext]'                    //имя составляется из регулярного выражения
						}
				}]
		},
		resolve: {
			alias:{
				/* универсальный алиас, позволяющий ссылаться на папку src прописывая '~' */
				'~': 'src', 
			}
		},
		plugins: [                                          //подключаемые плагины
				new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`   //путь до css (на ES6) имя задается в соответствии с именем ярлыка..
                                                              // ..для точки входа(в нашем случае app). И с указанием хэша для..
					}),																								 // ..автоматического переименовывания фалов
				new HtmlWebpackPlugin({
						template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: false
				}),
				new CopyWebpackPlugin([	
						{ from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}img` },
						{ from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}fonts` },
						{ from: `${PATHS.src}/static`, to: '' }
        ]),
        
        ...PAGES.map(page => new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,                           // ссылается на переменную page, которая берет из PAGES_DIR файлы .pug
          filename: `./${page.replace(/\.pug/,'.html')}` 
        }))
		],
}