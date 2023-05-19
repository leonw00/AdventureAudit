import jwt_decoded from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { setWithExpiry, getWithExpiry } from "./session";
import { getUser, postUser } from "../server-api/userAPI";
import { delUserID, setUserID } from "./storageCalls";

export async function onGoogleSignIn(response) {
  var decoded = jwt_decoded(response);

  // parse the decoded data
  var email = decoded["email"];
  var name = decoded["name"];

  var myUserEntity = {};
  myUserEntity.email = email;
  myUserEntity.name = name;

  // Store the entity object in localStorage with expirty time
  setWithExpiry("user", myUserEntity);

  // get the user from the database
  var user = await getUser();

  // if no such email exist, post to database
  if (user === undefined) {
    await postUser({
      email: email,
      name: name,
    });
  }

  // get the user again to set the user_id
  user = await getUser();
  if (user !== undefined) {
    setUserID(user.user_id);
  }
}

// check if user is logged in
export function checkLoggedIn() {
  if (getWithExpiry("user") == null) {
    return false;
  } else {
    return true;
  }
}

export function onGoogleLogout() {
  googleLogout();
  localStorage.removeItem("user");
  delUserID();
}
