export default {
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : ()=>import('@/components/City')
        },
        {
            path : 'nowplaying',
            component : ()=>import('@/components/NowPlaying')
        },
        {
            path : 'future',
            component : ()=>import('@/components/Future')
        },
        {
            path : 'search',
            component : ()=>import('@/components/Search')
        },
        {
            path : 'detail/zzry/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                detail : ()=>import('@/views/Movie/detail')
            },
            props: {
                detail : true
            }
        },
        {
            path : 'detail/jjsy/:movieId',
            components: {
                default: () => import('@/components/Future'),
                detail : ()=>import('@/views/Movie/detail')
            },
            props: {
                detail : true
            }
        }
    ]
}