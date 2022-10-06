function retrieveJwt(){
  const jwt = JSON.parse(localStorage.getItem('job-app-token') || '');
  return jwt;
}

export default retrieveJwt;