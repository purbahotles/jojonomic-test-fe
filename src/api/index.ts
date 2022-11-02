import Axios, { AxiosRequestConfig } from 'axios'

const axios = Axios.create()
const header = { 'X-Auth-Token': 'c9dd4d3340724519a6bf1fb7027ff24c' }

export default {
  getListDataAreas () {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: 'https://api.football-data.org/v2/areas',
      headers: header
    }
    return axios(options)
  },

  getDetails (id: string) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: 'https://api.football-data.org/v2/teams/' + id,
      headers: header
    }
    return axios(options)
  }
}