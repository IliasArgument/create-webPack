//подключаем модули
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//деоаем маодуль доступным для других модулей
module.exports = {
    // точка входа
    entry: {
        app: './src/index.js'
    },
    //точка куда файл будет выходить,
    // вебпак собирает бандл и помещает его в filename,
    //после запуска (npm run build ) запускается вебпак который создаст оптимизированый бандл и поместит его в dist
    output: {
        filename: '[name].js',
        //путь
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [{
            // тип обрабатываемого файла(1 часть лоадера)
        test:/\.js$/,
        //лоадеры используются для преоброзования перед генерацией,
        //подключаются в масив rules 
        //нужно устанавливать для работы с стилями,картинками и т.д.
        loader: 'babel-loader',
        exclude: '/node_modules/'
        },
        {
            //тип обрабатываемого файла
            test:/\.scss$/,
            use: [
                // лоадер используемый для обр. данного типа файлов
                 'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                },
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true,config: { path: 'src/js/postcss.config.js'} }
                }, {
                    loader: 'sass-loader',
                    options: {sourceMap: true}
                }
            ]
        },
        {
            // npm i css-loader -D
            test:/\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                },
                {
                    loader: 'postcss-loader',
                    options: {sourceMap: true,config: { path: 'src/js/postcss.config.js'} }
                },
            ]
        }]
    },
    devServer: {
        overlay: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            //chunkFilename: "[id].css"
        })
    ],
}