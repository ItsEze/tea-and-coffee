

const base_url = import.meta.env.VITE_BASE_URL
// const API_BASE_URL = `http://${base_url}/api`;
const API_BASE_URL = `http://127.0.0.1:8000/api`;



async function basicFetch(url, payload, key) {
    const res = await fetch(url, payload)
    if (key == 'login') {
        if (res.status === 400) {
          const errorData = await res.json();
          return errorData
        } 
    }
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context) {
    const key = 'signup'
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${API_BASE_URL}/login/signup`,payload, key)
    return body
  }
  
  export async function login(context) {
    const key = 'login'
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`${API_BASE_URL}/login/get-token`, payload, key)
    if (body.token) {
      console.log('body', body)
      return {'body': body.token, 'error': false}
    } else {
      return {'body': body.non_field_errors[0], 'error': true}
    }
  }

  