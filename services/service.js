import axios from 'axios';

class Service {
  constructor() {
    let service= axios.create({
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error)=> {
    return Promise.reject(error);
  };

  get(path, callback) {
    return this.service.get(path).then((response) => callback(response));
  }


  post(path, payload, callback) {
    return this.service
      .request({
        method: 'POST',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then((response) => callback(response));
  }

  put(path, payload, callback) {
    return this.service
      .request({
        method: 'PUT',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then((response) => callback(response));
  }
  delete(path, callback) {
    return this.service.delete(path).then((response) => callback(response));
  }

}

export default new Service();