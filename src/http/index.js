import axios from 'axios'
import { API_DOMAIN } from './constants';

export function getLeiloes () {
  return axios.get(API_DOMAIN + '/leiloes')
    .then(response => {
      return response.data
    })
}

export function getLeilao (id) {
  return axios.get(API_DOMAIN + `/leiloes/${id}`)
    .then(response => {
      return response.data
    })
}

export function getLances (id) {
  return axios.get(API_DOMAIN + '/lances/', { params: { leilao_id: id } })
    .then(response => {
      return response.data.map(
        l => {
          l.data = new Date(l.data)
          return l
        }
      )
    })
}

export function createLance (lance) {
  return axios.post(API_DOMAIN + '/lances', lance)
    .then(response => {
      return response.data.id
    })
}

export function createLeilao (leilao) {
  return axios.post(API_DOMAIN + '/leiloes', leilao)
}
