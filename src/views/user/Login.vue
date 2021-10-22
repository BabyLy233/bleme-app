<template>
  <div>
    <van-nav-bar
        title="登录"
        left-text="返回"
        right-text="注册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />

    <h2 class="page-title">登录</h2>
    <van-row type="flex" justify="center">
      <van-col span="18">
        <van-form @submit="onSubmit">
          <van-field
              v-model="username"
              name="username"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {login} from '@/api/user'
import {Toast} from 'vant'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loginToken: ''
    }
  },
  methods: {
    async onSubmit(values) {
      const {data} = await login({
        username: values.username,
        password: values.password
      })
      if (!data.detail) {
        Toast.fail(data.message)
        return
      }
      this.loginToken = data.detail.id
      Toast.success({
        message: data.message,
        forbidClick: true,
        onClose: this.toastClose
      })
    },
    onClickLeft() {
      this.$router.push('/user')
    },
    onClickRight() {
      this.$router.push('/register')
    },
    toastClose() {
      window.sessionStorage.setItem('token', this.loginToken)
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.page-title {
  margin-left: 3.5rem;
}
</style>
