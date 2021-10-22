import axios from '../util/axios'

export function getIsCate(params) {
  return axios.get(
    `/shop/in/category?shopId=${params}`,
  )
}

export function getGoodsInCate(shopId, cateId) {
  return axios.get(
    `shop/in/category/goods?shopId=${shopId}&cateId=${cateId}`,
  )
}
