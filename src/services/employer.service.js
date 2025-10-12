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
  async getPostList(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return axios.get(
    `${REACT_APP_API_SERVICE_URL}/employer/postlist?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
   async applyToJob(jobId) {
    return axios.post(
      `${REACT_APP_API_SERVICE_URL}/apply`,
      { jobId },
      TokenHelper.getHeader()
    );
  }

  async checkApplyStatus(jobId) {
    return axios.get(
      `${REACT_APP_API_SERVICE_URL}/apply/status/${jobId}`,
      TokenHelper.getHeader()
    );
  }
async getUserAppliedJobs () {
  return axios.get(
    `${REACT_APP_API_SERVICE_URL}/apply/myapplications`,
    TokenHelper.getHeader()
  );
};
   async addToWishlist(jobId) {
  return axios.post(
    `${REACT_APP_API_SERVICE_URL}/apply/wishlist/add`,
    { jobId },
    TokenHelper.getHeader()
  );
}

async removeFromWishlist(jobId) {
  return axios.delete(
    `${REACT_APP_API_SERVICE_URL}/apply/wishlist/remove`,
    {
      ...TokenHelper.getHeader(),
      data: { jobId }, // axios requires "data" for DELETE body
    }
  );
}
async getUserWishlist () {
  return axios.get(
    `${REACT_APP_API_SERVICE_URL}/apply/wishlist`,
    TokenHelper.getHeader()
  );
};
async submitContactForm (formData){
  return axios.post(
    `${REACT_APP_API_SERVICE_URL}/contact`,
    formData
  );
};

// Optional: If you need admin functions
async getContactSubmissions(token, queryParams = {}){
  return axios.get(
    `${REACT_APP_API_SERVICE_URL}/admin/contact-submissions`,
    {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

}
 
// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployerService();