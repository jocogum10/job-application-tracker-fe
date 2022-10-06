type userType = {
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
}

function setUser(user: userType){
  localStorage.setItem('job-app-user', JSON.stringify(user));
  const jwt = JSON.parse(localStorage.getItem('job-app-token') || '');
  return jwt;
}

export default setUser;