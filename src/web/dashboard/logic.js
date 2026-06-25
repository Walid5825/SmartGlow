const API = "http://192.168.1.33:7000";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export async function getStatus() {

  const res = await fetch(`${API}/status`, {
    headers: getHeaders(),
  });

  if (res.status === 401) {
    throw new Error("Non authentifié");
  }

  return await res.json();
}

export async function ledOn(color) {

  const res = await fetch(`${API}/led/${color}/on`, {
    method: "POST",
    headers: getHeaders(),
  });

  return await res.json();
}

export async function ledOff(color) {

  const res = await fetch(`${API}/led/${color}/off`, {
    method: "POST",
    headers: getHeaders(),
  });

  return await res.json();
}