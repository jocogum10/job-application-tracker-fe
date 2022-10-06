function saveJwt(token: string){
  localStorage.setItem('job-app-token', JSON.stringify(token));
}

export default saveJwt;