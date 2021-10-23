import React from 'react';
import { ApiServiceFetch } from 'services';

export default (WrappedComponent) => class extends React.PureComponent {
  doRequest = async (type, data) => {
    const initialResponse = await this.resolveFunc(type, data);
    if (initialResponse.ok) {
      if (initialResponse.status === 204) {
        return null;
      }
      const json = await initialResponse.json();
      return json;
    }
    const resp = await initialResponse.json();
    throw new Error(resp.message);
  };

  doGet = async (data) => this.doRequest('get', data);

  doPost = async (data) => this.doRequest('post', data);

  doDelete = async (data) => this.doRequest('delete', data);

  doPut = async (data) => this.doRequest('put', data);

  static resolveFunc = async (type, data) => {
    let response = null;
    switch (type) {
      case 'post':
        response = await ApiServiceFetch.post(data);
        break;
      case 'put':
        response = await ApiServiceFetch.put(data);
        break;
      case 'delete':
        response = await ApiServiceFetch.delete(data);
        break;
      default:
        response = await ApiServiceFetch.get(data);
        break;
    }
    return response;
  };

  render() {
    return (
      <WrappedComponent
        doGet={this.doGet}
        doPost={this.doPost}
        doPut={this.doPut}
        doDelete={this.doDelete}
        {...this.props}
      />
    );
  }
};
