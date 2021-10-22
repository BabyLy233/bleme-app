<template>
  <div>
    <van-nav-bar
        title="新增地址"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :detail-rows="3"
        @save="onSave"
    />
  </div>
</template>

<script>
import {areaList} from '@vant/area-data'
import {addAddress} from '@/api/address'
import {Toast} from 'vant'

export default {
  name: 'AddAddress',
  data() {
    return {
      areaList,
      searchResult: [],
      token: window.sessionStorage.getItem('token')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onSave(content) {
      addAddress(content, this.token).then(() => {
        Toast({
          message: '地址添加成功',
          position: 'bottom',
        })
        this.$router.push('/user/address')
      }).catch(() => {
        Toast({
          message: '地址添加失败',
          position: 'bottom',
        })
        this.$router.push('/user/address')
      })
    },
  },
}
</script>

<style scoped>

</style>
