import axios from 'axios'

import { API } from './api'

export default axios.create({
  baseURL: API.BASE_URL,
})
