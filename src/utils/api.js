const BASE_URL = "http://34.101.36.56:1323/v1";

function getAccessToken() {
  return localStorage.getItem("token-admin");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("token-admin", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function downloadTemplate() {
  const response = await fetchWithToken(
    `${BASE_URL}/admins/users/inserts/download-template`
  );

  const blob = await response.blob();

  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `template-taut-${Date.now()}.xlsx`);
  document.body.appendChild(link);
  link.click();
}

async function insertExcel(formData) {
  const response = await fetchWithToken(
    `${BASE_URL}/admins/users/inserts/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const blob = await response.blob();

  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `list-user-output-${Date.now()}.xlsx`);
  document.body.appendChild(link);
  link.click();
}

async function getQrCode(username) {
  const response = await fetch(
    `${BASE_URL}/profiles/users/${username}/qrcode`,
    {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
      },
    }
  );

  const result = await response.blob();

  return { error: false, data: result };
}

async function getUserById(id) {
  const response = await fetchWithToken(`${BASE_URL}/admins/users/${id}`, {
    method: "GET",
  });

  const result = await response.json();

  if (result.error) {
    return { error: true, message: result.message };
  }

  return { error: false, data: result.data };
}

async function getAdminById(id) {
  const response = await fetchWithToken(`${BASE_URL}/admins/${id}`, {
    method: "GET",
  });

  const result = await response.json();

  if (
    result.message === "Not Found" ||
    result.messages === "error delete admin, id admin not found"
  ) {
    return { error: true, messages: result.messages };
  }

  return { error: false, data: result.data };
}

async function updateUser({
  id,
  password,
  email,
  name,
  job,
  born_date,
  phone_number,
  address,
  about,
}) {
  const response = await fetchWithToken(`${BASE_URL}/admins/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
      name,
      job,
      born_date,
      phone_number,
      address,
      about,
    }),
  });

  const result = await response.json();

  if (result.error) {
    return { error: true, messages: result.messages };
  }

  return { error: false, messages: result.messages };
}

async function createAdmin({ username, password }) {
  const response = await fetchWithToken(`${BASE_URL}/admins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const result = await response.json();

  if (
    result.messages === "error create admin, maybe username already exist" ||
    result.messages === "username or password is empty"
  ) {
    return { error: true, messages: result.messages };
  }

  return { error: false, messages: result.messages };
}

async function deleteUser(id) {
  const response = await fetchWithToken(`${BASE_URL}/admins/users/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (result.error) {
    return { error: true, messages: result.messages };
  }

  return { error: false, messages: result.messages };
}

async function deleteAdmin(id) {
  const response = await fetchWithToken(`${BASE_URL}/admins/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (
    result.message === "Not Found" ||
    result.messages === "error delete admin, id admin not found"
  ) {
    return { error: true, messages: result.messages };
  }

  return { error: false, messages: result.messages };
}

export {
  putAccessToken,
  downloadTemplate,
  insertExcel,
  getQrCode,
  getUserById,
  getAdminById,
  updateUser,
  createAdmin,
  deleteUser,
  deleteAdmin,
};
