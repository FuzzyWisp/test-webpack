module.exports = {
    plugins: [
        require('autoprefixer'),                //плагин добавляет префиксы для разных браузеров
        require('css-mqpacker'),                //плагин группирует одинаковый код, сокращая его
        require('cssnano')({                    //еще один плагин для сокращения кода
            preset: [
                'default', {
                    discardComments: {          //настройка для удаления всех комментариев из продакшена
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}