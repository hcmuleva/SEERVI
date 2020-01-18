class Auth {
    static roles;
    static groups;
    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
      localStorage.setItem('token', token);
    }
    static setRoles(roles){

      console.log("Roles set in Auth",roles)
      this.roles=roles
    }
    static getRoles(){
      return this.roles;
    }
    static setGroup(groups){
      this.groups=groups
    }
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
      const myauth= localStorage.getItem('token') !== null;
      console.log("myauth",myauth)
      return localStorage.getItem('token') !== null?true:false;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
      localStorage.removeItem('authdata')
      localStorage.removeItem('token');
    }
    
    /**
     * Get a token value.
     *
     * @returns {string}
     */
    
    static getToken() {
      console.log("Token value =",localStorage.getItem('token'))
      return localStorage.getItem('token');
    }
  
  }
  
  export default Auth;