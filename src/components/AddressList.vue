<template>
  <div>
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
  </div>
</template>

<script>
import {getAddress} from '@/api/address'

export default {
  name: 'AddressList',
  async mounted() {
    const {data} = await getAddress(this.token)
    let obj = JSON.parse(JSON.stringify(data)
        .replace(/addressId/g, 'id')
        .replace(/addressDetail/g, 'address')
    )
    this.list = obj.detail
  },
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      list: [],
    }
  },
  computed: {
    chosenAddressId() {
      let id = 0
      this.list.forEach(item => {
        if (item.isDefault) {
          id = item.id
        }
      })
      return id
    }
  },
  methods: {
    onAdd() {
      this.$router.push('/user/address/add')
    },
    onEdit(item) {
      let objData = JSON.stringify(item)
      this.$router.push({
        path: '/user/address/edit',
        query: {
          allData: encodeURIComponent(objData)
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
