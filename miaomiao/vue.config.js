module.exports = {
    // publicPath : '/miaomiao', //调整静态资源路径
    devServer : {
        open : true,
        https: false,
        hotOnly: false,
        proxy : {
            // '/api2':{         //这里要注意代理本地的要写在上面
            //     target : 'http://localhost:3000',
            //     changeOrigin : true
            // },
            '/ajax':{
                target : 'http://m.maoyan.com/',
                ws:true,
                changeOrigin : true,
                pathRewrite:{
                    '^/ajax': '/'
                }
            },
            '/api':{
                target : 'http://39.97.33.178',
                changeOrigin : true
            }
            
        }
    }
}
// devServer: {
//           open: true, //浏览器自动打开页面
//           // host: "0.0.0.0", //如果是真机测试，就使用这个IP
//           port: 8080,
//           https: false,
//           hotOnly: false, //热更新（webpack已实现了，这里false即可）
//           proxy: {
//               //配置跨域
//               '/api': {
//                   // target: "http://localhost:8888/",http://m.maoyan.com/dianying/cities.json
//                   target: "http://m.maoyan.com/",
//                   ws:true,
//                   changOrigin:true,
//                   pathRewrite:{
//                     '^/api': '/'
//                   }
//               }
//           }
//       }