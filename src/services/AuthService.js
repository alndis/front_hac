import $api from "../http";


class AuthService {
    static async login(email, password) {
      return (await $api.post('/login', { email, password }));
    }
  
    static async registration(email, password) {
      return (await $api.post('/registration', { email, password }));
    }
  
    static async logout() {
      return (await $api.post('/logout'));
    }
  }
  
  export default AuthService;