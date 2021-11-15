import React from 'react';
import { ApiServiceFetch, StorageService } from 'services';
// import JwtDecode from 'jwt-decode';
import { endPoints } from 'constantes';

export default (WrappedComponent) => class extends React.PureComponent {
  static doLogin = async (params) => {
    const initialResponse = await ApiServiceFetch.login(params);
    const response = await initialResponse.json();
    if (initialResponse.ok && initialResponse.status === 200) {
      const {
        user_id: userId, name, access_token: accessToken, expired_at: expiredAt,
      } = response.infosesion;
      StorageService.setValue('scaliaApp.user_id', userId);
      StorageService.setValue('scaliaApp.name', name);
      StorageService.setValue('scaliaApp.access_token', accessToken);
      StorageService.setValue('scaliaApp.expired_at', expiredAt);
      StorageService.setValue('scaliaApp.permissions', response.permissions);
      return true;
    }
    throw new Error(response.message || 'Login fallído');
  };

  static doLogout = async () => {
    await StorageService.multiRemove([
      'scaliaApp.user_id',
      'scaliaApp.name',
      'scaliaApp.access_token',
      'scaliaApp.expired_at',
    ]);
    await ApiServiceFetch.logout();
  };

  // static isTokenValid = async () => {
  //   const token = await StorageService.getValue('scaliaApp.access_token');
  //   if (token) {
  //     try {
  //       const decodedToken = await JwtDecode(token);
  //       const now = Date.now().valueOf() / 1000;
  //       const expired = decodedToken.exp && decodedToken.exp < now;
  //       const inactive = !decodedToken.nbf || (decodedToken.nbf && decodedToken.nbf >= now);
  //       return !(expired && inactive);
  //     } catch (error) {
  //       return false;
  //     }
  //   }
  //   return false;
  // };

  static checkToken = async () => {
    const params = {
      url: endPoints.auth.token,
      bearer: true,
    };
    const resp = await ApiServiceFetch.post(params);
    return resp.ok;
  };

  render() {
    return (
      <WrappedComponent
        doLogin={this.doLogin}
        doLogout={this.doLogout}
        // isTokenValid={this.isTokenValid}
        checkToken={this.checkToken}
        {...this.props}
      />
    );
  }
};
