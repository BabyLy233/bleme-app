<template>
  <div>
    <van-nav-bar
        title="编辑地址"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        show-delete
        :search-result="searchResult"
        :address-info="AddressInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :detail-rows="3"
        @save="onSave"
        @delete="del"
    />
  </div>
</template>

<script>
import {areaList} from '@vant/area-data'
import {delAddress, editAddress} from '@/api/address'
import {Toast} from 'vant'

export default {
  name: 'EditAddress',
  data() {
    return {
      areaList,
      searchResult: [],
      token: window.sessionStorage.getItem('token'),
      AddressInfo: {}
    }
  },
  mounted() {
    if (this.$route.query.allData) {
      let dataObj = decodeURIComponent(this.$route.query.allData)
      this.AddressInfo = JSON.parse(dataObj)
      this.AddressInfo = JSON.parse(JSON.stringify(this.AddressInfo)
          .replace(/address/g, 'addressDetail')
      )
    }
  },
  methods: {
    toastClose() {
      this.$router.push('/user/address')
    },
    onClickLeft() {
      this.$router.back()
    },
    onSave(content) {
      editAddress(content, content.id).then(() => {
        Toast({
          message: '地址修改成功',
          position: 'bottom',
        })
        this.$router.push('/user/address')
      }).catch(() => {
        Toast({
          message: '地址修改失败',
          position: 'bottom',
        })
        this.$router.push('/user/address')
      })
    },
    del(content) {
      delAddress(content.id)
      Toast({
        message: '地址删除成功',
        position: 'bottom',
        onClose: this.toastClose
      })
    }
  },
}
</script>

<style scoped>

</style>
