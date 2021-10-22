<template>
  <div>
    <van-nav-bar
        title="修改密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <h2 class="page-title">修改密码</h2>
    <van-row type="flex" justify="center">
      <van-col span="18">
        <van-form @submit="onSubmit">
          <van-field
              v-model="oldPwd"
              type="password"
              name="oldPwd"
              label="旧密码"
              placeholder="旧密码"
              :rules="[{ required: true, message: '请填写旧密码' }]"
          />
          <van-field
              v-model="newPwd"
              type="password"
              name="newPwd"
              label="新密码"
              placeholder="新密码"
              :rules="[{ required: true, message: '请填写新密码' }]"
          />
          <van-field
              v-model="reNewPwd"
              type="password"
              name="reNewPwd"
              label="重复新密码"
              placeholder="重复新密码"
              :rules="[{ required: true, message: '请重复新密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交修改</van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>

  </div>
</template>

<script>

import {Toast} from 'vant'
import {editPwd} from '@/api/user'

export default {
  name: 'EditPassword',
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      oldPwd: '',
      newPwd: '',
      reNewPwd: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/user')
    },
    async onSubmit(values) {
      if (this.newPwd !== this.reNewPwd) {
        Toast('两次输入的新密码不一致')
        this.reNewPwd = ''
        return
      }
      const {data} = await editPwd(
          this.oldPwd,
          this.newPwd,
          this.token
      )
      if (!data.detail) {
        Toast.fail(data.message)
        return
      }
      await window.sessionStorage.removeItem('token')
      await this.$router.push('/login')
      await Toast.success('修改成功\n请重新登录')
    },
  }
}
</script>

<style scoped>
.page-title {
  margin-left: 3.5rem;
}
</style>
