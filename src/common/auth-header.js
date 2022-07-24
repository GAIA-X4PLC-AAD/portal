export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('userJWT'));
    if (user && user.access_token) {
      return 'Authorization: Bearer ' + user.access_token ;
    } else {
      return '';
    }
  }