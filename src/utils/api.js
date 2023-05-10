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
  console.log(blob, "test");
}

export { putAccessToken, downloadTemplate, insertExcel };
