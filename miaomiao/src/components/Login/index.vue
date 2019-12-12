<template>
    <div>
        <form>
            <input type="text" placeholder="用户名/手机号/Email" maxlength="17">
            <input type="password" placeholder="请输入您的密码" autocomplete maxlength="17">
            <div class="loginDiv">登录</div>
        </form>
        <div class="options">
            <span>立即注册</span>
            <span>找回密码</span>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Login',

}
</script>

<style scoped>
    form input{
        width: 100%;
        line-height: 40px;
        border:none;
        border-bottom: 1px solid #e6e6e6;
        font-size: 14px;
        color: #666;
        text-indent: 6px;
    }
    .loginDiv{
        width: 90%;
        margin: 10px auto;
        text-align: center;
        background: red;
        color: #fff;
        line-height: 50px;
        border-radius: 4px;
    }
    .options{
        display: flex;
        color: red;
        padding: 0 6px;
        justify-content: space-between;
        font-size: 14px;
    }
</style>