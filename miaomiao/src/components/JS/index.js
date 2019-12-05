import Vue from 'vue';
import MessageBox from './MessageBox';

export var msgBox = (function(){
    
    return function(opts){ //外部将调用这个方法

        var defaults = {
            title : '默认',
            content : '默认',
            cancel : '默认',
            ok : '默认',
            cancelfn : null,
            okfn : null
        }

        var MyComponent = Vue.extend(MessageBox);

        for(var key in opts){
            defaults[key] = opts[key];
        }

        var vm = new MyComponent({
            el : document.createElement('div'),
            data : {
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            methods : {
                cancelfn(){
                    defaults.cancelfn && defaults.cancelfn.call(this);
                    document.body.removeChild(vm.$el);
                },
                okfn(){
                    defaults.okfn && defaults.okfn.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });

        document.body.appendChild(vm.$el);
    }

})();