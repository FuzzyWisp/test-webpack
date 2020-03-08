const webpack = require('webpack');
const merge = require('webpack-merge');                         //константа для хранения webpack-merge
const baseWebpackConfig = require('./webpack.base.conf');       //константа для хранения базовый конфиг

const devWebpackConfig = merge(baseWebpackConfig, {   //константа для ярлыка build
    mode: 'development',                                      //мод ярлыка    
    devtool: 'cheap-module-eval-source-map',                   
    
    devServer: {                                              //плагин для обновления кода..
        contentBase: baseWebpackConfig.externals.paths.dist,  
        port: 9000,                                           //указание порта для локального сервера
        overlay: {                                            //..в реальном времени при разработке
            warnings: true,                                   //выдача сообщений о предупреждениях
            errors: true                                      //выдача сообщений об ошибках
        }                                         
    },
    plugins: [                                                //массив для плагинов
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]                                            
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})