export default {
  state: {
    access_token: '',
    address: '',
    email: '',
    tel: '',
    userId: '',
    userName: '',
  },
  getters: {
    access_token: state => JSON.parse(window.localStorage.getItem('userInfo')).access_token,
    address: state => JSON.parse(window.localStorage.getItem('userInfo')).address,
    email: state => JSON.parse(window.localStorage.getItem('userInfo')).email,
    tel: state => JSON.parse(window.localStorage.getItem('userInfo')).tel,
    userId: state => JSON.parse(window.localStorage.getItem('userInfo')).userId,
    userName: state => JSON.parse(window.localStorage.getItem('userInfo')).userName
  }
}
