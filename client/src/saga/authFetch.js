export const checkAuthFetch = async () => {
  const response = await fetch('http://localhost:3005/checkAuth', {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

export const loginAuthFetch = async ({ password, email }) => {
  const response = await fetch('http://localhost:3005/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email,
    }),
  });
  return response.json();
};

export const logoutFetch = async () => {
  const response = await fetch('http://localhost:3005/logout', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });
  return response;
};
