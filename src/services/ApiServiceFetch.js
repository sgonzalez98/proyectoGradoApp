/* eslint-disable no-undef */
import { API_SERVER, API_VERSION } from '@env';
import { endPoints } from 'constantes';
import StorageService from './StorageService';

const BEARER_PREFIX = 'Bearer';

class ApiServiceFetch {
  constructor() {
    this.path = API_SERVER + API_VERSION;
    this.head_content = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };
  }

  async configOptions(bearer, method) {
    const headerApi = this.head_content;

    // if (bearer) {
    //   const authorizationBearer = {
    //     Authorization: `${BEARER_PREFIX} ${await StorageService.getValue(
    //       'scaliaApp.access_token',
    //     )}`,
    //   };
    //   Object.assign(headerApi, authorizationBearer);
    // }

    return {
      method,
      headers: headerApi,
      mode: 'cors',
      cache: 'default',
    };
  }

  async procesarUrl(url) {
    if (!url) {
      throw new Error('La URL es requerida para este metodo');
    }

    return this.path + url;
  }

  async get({ url = null, bearer = true, data = {} }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions(bearer, 'GET');
    const parametros = new global.URLSearchParams(data);
    const urlFinal = `${urlPath}?${parametros.toString()}`;

    return fetch(urlFinal, optionsFetch);
  }

  async post({ url = null, bearer = true, data = {} }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions(bearer, 'POST');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async postFormData({ url = null, body = new FormData() }) {
    const urlPath = await this.procesarUrl(url);
    const options = {
      method: 'POST',
      body,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `${BEARER_PREFIX} ${await StorageService.getValue(
          'scaliaApp.access_token',
        )}`,
      },
    };
    return fetch(urlPath, options);
  }

  async put({ url = null, bearer = true, data = {} }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions(bearer, 'PUT');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async patch({ url = null, bearer = true, data = {} }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions(bearer, 'PATCH');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async delete({ url = null, bearer = true, data = {} }) {
    const urlPath = await this.procesarUrl(url);
    const optionsFetch = await this.configOptions(bearer, 'DELETE');
    optionsFetch.body = JSON.stringify(data);

    return fetch(urlPath, optionsFetch);
  }

  async login(data) {
    const params = {
      url: endPoints.auth.login,
      bearer: false,
      data,
    };
    const resp = await this.post(params);
    return resp;
  }

  logout = async () => {
    const params = {
      url: endPoints.auth.logout,
    };
    const response = await this.get(params);
    return response;
  };
}

export default new ApiServiceFetch();
