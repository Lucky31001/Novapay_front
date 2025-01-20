import axios from 'axios';

class Api {
  constructor(baseUrl, loginUrl) {
    if (!Api.instance) {
      this.token = localStorage.getItem('token') || '';
      this.loginUrl = loginUrl;
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (this.token) {
        this.instance.defaults.headers.common['Authorization'] =
          `Bearer ${this.token}`;
      }

      Api.instance = this;
    }

    return Api.instance;
  }

  setToken(newToken) {
    this.token = newToken;
    localStorage.setItem('token', newToken);
    this.instance.defaults.headers.common['Authorization'] =
      `Bearer ${this.token}`;
  }

  redirectToLogin() {
    window.location.href = this.loginUrl;
  }

  async request(endpoint, options = {}) {
    if (!this.token && endpoint !== '/register' && endpoint !== '/login') {
      this.redirectToLogin();
      return;
    }

    try {
      const response = await this.instance(endpoint, options);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.redirectToLogin();
      } else {
        throw new Error(`HTTP error! status: ${error.response.status}`);
      }
    }
  }

  register(data) {
    return this.request('/register', { method: 'POST', data });
  }

  async login(data) {
    console.log('API request:', data); // Log the request to debug
    const response = await this.request('/login', { method: 'POST', data });
    console.log('API response:', response); // Log the response to debug
    if (response.access_token) {
      this.setToken(response.access_token);
    } else {
      throw new Error('Access token not found in the response');
    }
    return response;
  }

  me() {
    return this.request('/me', { method: 'GET' });
  }

  comptes_bancaires() {
    return this.request('/comptes-bancaires', { method: 'GET' });
  }

  post_compte_bancaire(data) {
    return this.request('/comptes-bancaires', { method: 'POST', data });
  }

  compte_courant() {
    return this.request('/compte_courant', { method: 'GET' });
  }

  depots() {
    return this.request('/depots', { method: 'GET' });
  }

  cloture(id) {
    return this.request(`/comptes-bancaires/cloture/${id}`, { method: 'PATCH' });
  }
}

const apiInstance = new Api('http://localhost:8000', '/login');

export default apiInstance;
