import axios from 'axios'
import url from '@/config/baseUrl.js'

export default {
  guard() {
    return new Promise((resolve, reject) => {
      axios.get(`${url.baseUrl}/user/${localStorage.getItem('user-token')}`)
      .then(res => {
        if(res.data.role == 999) resolve()
        else reject()
      })
    })
  }
}