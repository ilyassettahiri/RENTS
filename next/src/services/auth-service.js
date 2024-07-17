import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "login";
    return HttpService.post(loginEndpoint, payload);
  };

  register = async (credentials) => {
    const registerEndpoint = "register";
    return HttpService.post(registerEndpoint, credentials);
  };

  logout = async () => {
    const logoutEndpoint = "logout";
    return HttpService.post(logoutEndpoint);
  };

  forgotPassword = async (payload) => {
    const forgotPassword = "password-forgot";
    return HttpService.post(forgotPassword, payload);
  };

  resetPassword = async (credentials) => {
    const resetPassword = "password-reset";
    return HttpService.post(resetPassword, credentials);
  };

  getProfile = async () => {
    const getProfile = "me";
    return HttpService.get(getProfile);
  };

  updateProfile = async (newInfo) => {
    const updateProfile = "me";
    return HttpService.patch(updateProfile, newInfo);
  };
}

export default new AuthService();
