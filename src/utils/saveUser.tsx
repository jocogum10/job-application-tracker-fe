type userType = {
  user: {
    id: number
    email: string
    created_at: string
    updated_at: string
  } 
} | null

function saveUser(user: userType){
  localStorage.setItem('job-app-user', JSON.stringify(user));
}

export default saveUser;