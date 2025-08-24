import axios from 'axios';
import TokenHelper from '../components/TokenHelper';
const REACT_APP_API_SERVICE_URL='http://localhost:3000/api';
// const REACT_APP_API_SERVICE_URL="http://127.0.0.1:5001/api"

console.log("REACT_APP_API_SERVICE_URL ",REACT_APP_API_SERVICE_URL);

const headers = {
  headers: {
    // "Content-Type": "multipart/form-data",
    "token": localStorage.getItem("tokendata")
  }
}
const headerdata = {
  headers: {
    "token": TokenHelper.getToken(),
    "Content-Type": "application/json"
  }
}

class UserService {


//   async postSignup(data) {
//     return axios.post(REACT_APP_API_SERVICE_URL + '/signup', data, TokenHelper.getHeader());
//   }
  
  async login(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/auth/login', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
    async sociallogin(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/auth/social-login', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async signup(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/auth/signup', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async forgetpassword(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/emailconfirm', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async otp(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/otp', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async otpverify(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/otpverify', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async changepassword(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/resetpassword', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async updateseller(data) {
    return axios.put(REACT_APP_API_SERVICE_URL + '/setseller', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  } 
  async getseller(sellerId) {
    console.log(sellerId,'data')
    return axios.get(REACT_APP_API_SERVICE_URL + '/sellerprofile/'+sellerId, TokenHelper.getHeader())
  }
  async addcreditcard(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/creditcard', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async sellcarlist(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/carListing', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  }

  async getProductdetails(productId) {

    return axios.get(REACT_APP_API_SERVICE_URL + '/productdetails/'+productId, TokenHelper.getHeader())
  }
  async getProductrelated(brand,productId) {

    return axios.get(`${REACT_APP_API_SERVICE_URL}/productrelated?brand=${brand}&productId=${productId}`, TokenHelper.getHeader())
  }

  async getbrandlist() {
    
    return axios.get(REACT_APP_API_SERVICE_URL + '/carbrand', TokenHelper.getHeader())
  }
  async gettypelist() {
    
    return axios.get(REACT_APP_API_SERVICE_URL + '/cartype', TokenHelper.getHeader())
  }
  async getcarlist() {
    
    return axios.get(REACT_APP_API_SERVICE_URL + '/carlist', TokenHelper.getHeader())
  }
  async getcarfilter(payload) {
    
    return axios.get(REACT_APP_API_SERVICE_URL + `/carfilter?carType=${payload.carType}&brand=${payload.brand}&minMileage=${payload.minMileage}&maxMileage=${payload.maxMileage}&minYear=${payload.minYear}&maxYear=${payload.maxYear}&minPower=${payload.minPower}&maxPower=${payload.maxPower}&transmissionType=${payload.transmissionType}`, TokenHelper.getHeader())
  }
  async getcreditcard(sellerId) {
    console.log(sellerId,'data')
    return axios.get(REACT_APP_API_SERVICE_URL + '/sellercard/'+sellerId, TokenHelper.getHeader())
  }
  async getdeletecard(sellerId) {
    console.log(sellerId,'data')
    return axios.delete(REACT_APP_API_SERVICE_URL + '/carddelete/'+sellerId, TokenHelper.getHeader())
  }
  async placebid(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/placeBid', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async bidhistory(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/Bidhistory', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async placecomment(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/addComment', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  async getcomment(carId) {
    console.log(carId,'data')
    return axios.get(REACT_APP_API_SERVICE_URL + '/commenthistory/'+carId, TokenHelper.getHeader())
  }
  async getreplycomment(parentId) {
    console.log(parentId,'data')
    return axios.get(REACT_APP_API_SERVICE_URL + '/getreplyComment/'+parentId, TokenHelper.getHeader())
  }
  //get view provider  details end
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
