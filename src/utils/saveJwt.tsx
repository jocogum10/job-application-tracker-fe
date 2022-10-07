function saveJwt(token: string | null){
  localStorage.setItem('job-app-token', JSON.stringify(token));
}

export default saveJwt;