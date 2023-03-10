<template>
  <div class="login-container">
    <div class="form-wrap">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="ava-wrap" />
        <h3 class="name">逐能宝后台管理系统</h3>
        <el-form-item prop="userName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="userName"
            v-model="loginForm.userName"
            placeholder="请输入账号"
            name="userName"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <div class="err-tips" />
        <el-button :loading="loading" type="primary" style="width:100%; height: 50px; font-size: 16px;" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// bg https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/adminImage%2F1631081421184.png

// icon https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/adminImage%2F1631081420192.png
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #363636;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fefefe inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border-bottom: 1px solid #EBEDF0;
    // background: rgba(0, 0, 0, 0.1);
    // border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#889aa4;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url(https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/adminImage%2F1631081421184.png);
  background-size: 100% 100%;
  background-size: cover;

  .ava-wrap {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    background: url(https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/adminImage%2F1631081420192.png) no-repeat center center;
    background-size: 100% 100%;
    background-size: contain;
  }

  .name {
    font-size: 24px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #2B292D;
    line-height: 36px;
    text-align: center;
    margin: 8px 0 100px;
    text-shadow: #2B292D 0 0 1px;
  }

  .err-tips {
    height: 22px;
  }

  .form-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 24px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 4px 8px 0px rgba(25, 52, 77, 0.13);
  }

  .login-form {
    max-width: 300px;
    margin: 80px auto 76px;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
