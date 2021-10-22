<template>
  <div>
    <van-empty>
      <template #description>
        <div style="text-align: center">
          <p>您尚未登录</p>
          <p>请先登录或注册账户</p>
        </div>
      </template>
      <van-button round type="primary" class="bottom-button" to="/login">登录</van-button>
      <br><br><br>
      <van-button round type="info" class="bottom-button" to="/register">注册</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: 'NotLogged',
  data() {
    return {}
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    goRegister() {
      this.$router.push('/register')
    },
  }
}
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
