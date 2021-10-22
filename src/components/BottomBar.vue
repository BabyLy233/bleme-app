<template>
  <van-tabbar v-model="bottomBarActive" route placeholder>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="orders-o" to="/order">订单</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      bottomBarActive: 0,
    }
  },
}
</script>

<style scoped>

</style>
