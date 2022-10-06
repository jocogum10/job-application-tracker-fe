type userType = {
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  }
}

function retrieveUser<userType>(){
  const user = JSON.parse(localStorage.getItem('job-app-user') || '{}');
  return user;
}

export default retrieveUser;