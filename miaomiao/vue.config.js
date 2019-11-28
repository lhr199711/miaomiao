module.exports = {
    // publicPath : '/miaomiao', //调整静态资源路径
    devServer : {
        proxy : {
            // '/api2':{         //这里要注意代理本地的要写在上面
            //     target : 'http://localhost:3000',
            //     changeOrigin : true
            // },
            '/api':{
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
        }
    }
}