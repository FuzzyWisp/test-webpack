const merge = require('webpack-merge');                         //константа для хранения webpack-merge
const baseWebpackConfig = require('./webpack.base.conf');       //константа для хранения базовый конфиг

const buildWebpackConfig = merge(baseWebpackConfig, {   //константа для ярлыка build
    mode: 'production',                                         //мод ярлыка
    plugins: []                                                 //массив для плагинов
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})