import axios from 'axios'


export const registerUser = formData => { 

  return axios.post('/register', formData)

}