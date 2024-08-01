import axios from "axios";


export const useApi = async ({ method = 'POST', body, url }) => {
    try {
       console.log('api req start 🐱 \n', url)
       const { data: result } = await axios({
          baseURL: 'http://localhost:5050',
          method,
          data: body || {},
          url,
          headers: {
             Authorization: localStorage.token || ''
          }
       })
       console.log('api req result 🐱 \n', { result })
       return result;
 
    } catch (error) {
       console.log('api error 🤢 \n', { error });
       throw error.response?.data?.my ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
    }
 }