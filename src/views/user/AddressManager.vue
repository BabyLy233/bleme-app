<template>
  <div>
    <van-nav-bar
        title="地址管理"
        left-arrow
        left-text="返回"
        @click-left="onClickLeft"
    />

    <address-list/>

  </div>
</template>

<script>
import AddressList from '@/components/AddressList'

export default {
  name: 'AddressManager',
  components: {
    AddressList
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.push('/user')
    },

  }
}
</script>

<style scoped>

</style>
