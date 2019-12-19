export default {
    path: '/admin',
    component: () => import('@/views/Admin'),
    // children : [
    //     {
    //         path : 'center',
    //         component : ()=> import('@/views/Mine/center.vue')
    //     },
    //     {
    //         path : 'login',
    //         component : ()=>import('@/components/Login')
    //     },
    //     {
    //         path : 'register',
    //         component : ()=>import('@/components/Register')
    //     },
    //     {
    //         path : 'findPassword',
    //         component : ()=>import('@/components/FindPassword')
    //     },
    //     {
    //         path : '/mine',
    //         redirect : '/mine/center'
    //     }
    // ]
}