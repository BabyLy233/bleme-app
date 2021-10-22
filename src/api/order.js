import axios from '../util/axios'

export function addOrder(params,userId) {
  return axios.post(
    `/order/add?userId=${userId}`,
    params,
  )
}

export function getOrdersList(userId) {
  return axios.get(
    `/order/get?userId=${userId}`
  )
}
