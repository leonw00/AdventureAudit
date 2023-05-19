export function getEmail() {
  const itemStr = localStorage.getItem("user");
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value.email;
}

export function setUserID(value) {
  localStorage.setItem("user_id", value);
}

export function getUserID() {
  return localStorage.getItem("user_id");
}

export function delUserID() {
  localStorage.removeItem("user_id");
}
