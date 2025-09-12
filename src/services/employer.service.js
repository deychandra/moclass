import axios from 'axios';
import TokenHelper from '../components/TokenHelper';

// Prefer env var, fall back to your local dev API
const REACT_APP_API_SERVICE_URL='http://localhost:3000/api';




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

class EmployerService {
  async savePersonal(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/employer/personal', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  async saveOrganization(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/employer/organization', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
  }
  async getPostList(data) {
    return axios.get(REACT_APP_API_SERVICE_URL + '/employer/postlist', data, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
   async getPostById(id) {
    return axios.get(REACT_APP_API_SERVICE_URL + `/employer/post/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
   async getPostByUserId(userId) {
    return axios.get(REACT_APP_API_SERVICE_URL + `/employer/postlist/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  async createPosting(data) {
    return axios.post(REACT_APP_API_SERVICE_URL + '/employer/posting', data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
}
 
// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployerService();