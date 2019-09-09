import axios from 'axios'
import config from '../assets/ts/config'
let request:any
request =axios.create({
    baseURL:config.host
})
export default request