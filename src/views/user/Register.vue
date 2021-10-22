<template>
  <div>
    <van-nav-bar
        title="注册"
        left-text="返回"
        right-text="登录"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />

    <h2 class="page-title">注册</h2>
    <van-row type="flex" justify="center">
      <van-col span="18">
        <van-form @submit="onSubmit">
          <van-field
              v-model="username"
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="rePassword"
              type="password"
              label="重复密码"
              placeholder="请重复密码"
              ref="rePwd"
              :rules="[{ required: true, message: '请填写重复密码' }]"
          />
          <van-field v-model="phone"
                     type="tel"
                     name="phone"
                     label="手机号"
                     placeholder="请输入手机号"
                     :rules="[{ pattern,required: true, message: '请填写正确的手机号' }]"
          />
          <van-field v-model="payPwd"
                     type="password"
                     name="payPwd"
                     label="交易密码"
                     placeholder="请输入6位交易密码"
                     :rules="[{ validator ,required: true, message: '请填写交易密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">注册</van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {register} from '@/api/user'
import {Toast} from 'vant'

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      phone: '',
      payPwd: '',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      reg: /^\d{6}$/
    }
  },
  methods: {
    validator(val) {
      return /^\d{6}$/.test(val);
    },
    async onSubmit(values) {
      if (this.password !== this.rePassword) {
        Toast('两次输入密码不一致')
        this.rePassword = ''
        return
      }
      const {data} = await register({
        username: values.username,
        password: values.password,
        phone: values.phone,
        payPwd:values.payPwd
      })
      if (!data.detail) {
        Toast.fail(data.message)
        return
      }
      Toast.success(data.message)
      await this.$router.push('/login')
    },
    onClickLeft() {
      this.$router.push('user')
    },
    onClickRight() {
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped>
.page-title {
  margin-left: 3.5rem;
}
</style>
