const base_url = import.meta.env.VITE_BASE_URL
// const API_BASE_URL = `http://${base_url}/api`;
const API_BASE_URL = `http://127.0.0.1:8000/api`;



async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    if (res.status === 204) {
      return null
    }
    const body = await res.json()
    return body
}

export async function teaFetch() {
    const userToken = localStorage.getItem('token');
    const payload = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userToken}`,
        },
    }

    const body = await basicFetch(`${API_BASE_URL}/v1/all-teas`, payload);
    return body;
}

export async function coffeeFetch() {
    const userToken = localStorage.getItem('token');
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${userToken}`,
        },
    }

    const body = await basicFetch(`${API_BASE_URL}/v1/coffee/`, payload);
    return body;
}

export async function addCoffeeReview(reviewData) {
    const userToken = localStorage.getItem('token');
    console.log('function called')
    console.log('Checking review data in function: ', reviewData)
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userToken}`,
      },
      body: JSON.stringify(reviewData),
    };
    const body = await basicFetch(`${API_BASE_URL}/v1/coffee/review/`, payload);
    console.log(body, 'AFTER FETCH')
    return body;
  }


export async function removeCoffeeReview(reviewData) {
  const userToken = localStorage.getItem('token');
  const payload = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${userToken}`,
    },
    body: JSON.stringify({coffee_id: reviewData.coffee_id, pk: reviewData.pk})
  };
  await basicFetch(`${API_BASE_URL}/v1/coffee/review/`, payload)
}

export async function addFavorite(coffeeId) {
  const userToken = localStorage.getItem('token');
  const payload = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `token ${userToken}`,
    },
    body: JSON.stringify({coffee_id: coffeeId})
  }
  const body = await basicFetch(`${API_BASE_URL}/v1/coffee/favorites/users`, payload)
  return body
}

export async function removeFavorite(coffeeId) {
  console.log(coffeeId, 'WHAT ARE WE SENDING')
  const userToken = localStorage.getItem('token')
  const payload = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${userToken}`,
    },
    body: JSON.stringify({coffee_id: coffeeId})
  }
  await basicFetch(`${API_BASE_URL}/v1/coffee/favorites/users`, payload)

}

export async function editCoffeeReview(reviewData) {
    const userToken = localStorage.getItem('token');
    console.log('function called')
    console.log('Checking review data in function: ', reviewData)
    const payload = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${userToken}`,
      },
      body: JSON.stringify(reviewData),
    };
    const body = await basicFetch(`${API_BASE_URL}/v1/coffee/review/`, payload);
    console.log(body, 'AFTER FETCH')
    return body;
  }

// localhost:8000/api/v1/coffee/favorites/users
export async function userDataFetch() {
  const userToken = localStorage.getItem('token');
    const payload = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${userToken}`,
        },
    }

    const body = await basicFetch(`${API_BASE_URL}/v1/coffee/favorites/users`, payload);
    return body;
}

export async function handleLikesFetch(reviewId) {
  console.log('starting with', reviewId)
  const userToken = localStorage.getItem('token');
  const payload = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `token ${userToken}`,
    },
    body: JSON.stringify({review_id: reviewId})
  }
  const body = await basicFetch(`${API_BASE_URL}/v1/coffee/likes/all`, payload)
  return body
}

