export const getAllCasesFetch = async () => {
  const response = await fetch('http://localhost:3005/case/all', {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};

export const createCaseFetch = async ({ title, description }) => {
  const response = await fetch('http://localhost:3005/case', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
  return response.json();
};

export const editCaseFetch = async ({ title, description, caseId }) => {
  const response = await fetch(`http://localhost:3005/case/${caseId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  return response.json();
};

export const changeStatusCaseFetch = async (id) => {
  const response = await fetch(`http://localhost:3005/case/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: null,
  });
  return response.json();
};

export const deleteCaseFetch = async (id) => {
  const response = await fetch(`http://localhost:3005/case/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: null,
  });
  return response.json();
};