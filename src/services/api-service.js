/* eslint-disable prettier/prettier */
// api-service.js

import BASE_URL from "configuration";

async function get(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
}

async function post(endpoint, data) {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            return responseData;
        } else {
            const responseData = await response.text();
            return responseData;
        }
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow the error for handling in the caller
    }
  }
  

async function put(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Failed to put ${endpoint}`);
  }
  return response.json();
}

async function del(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Failed to delete ${endpoint}`);
  }
  return response.json();
}

export { get, post, put, del };
