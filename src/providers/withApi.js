import React from 'react';
import { ApiServiceFetch } from 'services';

export default (WrappedComponent) => class extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  doRequest = async (type, data) => {
    let initialResponse = null;
    switch (type) {
      case 'post':
        initialResponse = await ApiServiceFetch.post(data);
        break;
      case 'put':
        initialResponse = await ApiServiceFetch.put(data);
        break;
      case 'patch':
        initialResponse = await ApiServiceFetch.patch(data);
        break;
      case 'delete':
        initialResponse = await ApiServiceFetch.delete(data);
        break;
      default:
        initialResponse = await ApiServiceFetch.get(data);
        break;
    }

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

  doPatch = async (data) => this.doRequest('patch', data);

  render() {
    return (
      <WrappedComponent
        doGet={this.doGet}
        doPost={this.doPost}
        doPut={this.doPut}
        doPatch={this.doPatch}
        doDelete={this.doDelete}
        {...this.props}
      />
    );
  }
};
