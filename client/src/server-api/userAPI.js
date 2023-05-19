import axios from "axios";

// Gets the logged in user's record
async function getUser() {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    // get local user data
    const user = localStorage.getItem("user");
    const email = JSON.parse(user).value.email;

    // get from the database
    const result = await axios.get(`${SERVER_URL}/user/email/${email}`);

    return result.data.user[0];
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: "Something went wrong... Check if AdventureAudit API is running",
      status: 500,
    };
  }
}

// Gets a user's record based on their email
async function getUserByEmail(email) {
  try {
    if (!/\.([A-Z]|[a-z]){2,3}$/.test(email)) {
      return undefined;
    }

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const result = await axios.get(`${SERVER_URL}/user/email/${email}`);

    return result.data.user[0];
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: "Something went wrong... Check if AdventureAudit API is running",
      status: 500,
    };
  }
}

// Gets the group of users as a list part of trip_id
async function getGroupOfTrip(trip_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const users = await axios.get(`${SERVER_URL}/user/group/${trip_id}`);

    return users.data.members;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: "Something went wrong... Check if AdventureAudit API is running",
      status: 500,
    };
  }
}

// Creates a new user with the given email and name
async function postUser({ email, name }) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    //Default country_id is 40, which is Canada
    const query = { name: name, country_id: 40, email: email };

    await axios.post(`${SERVER_URL}/user`, query);
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: "Something went wrong... Check if AdventureAudit API is running",
      status: 500,
    };
  }
}

// Updates the given user with the given userID
async function updateUser({ user_id, name, country_id, email }) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      name: name,
      email: email,
      country_id: country_id,
    };
    if (user_id > 0) {
      await axios.put(`${SERVER_URL}/user/${user_id}`, query);
    }
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: "Something went wrong... Check if AdventureAudit API is running",
      status: 500,
    };
  }
}

export { getUser, getUserByEmail, getGroupOfTrip, postUser, updateUser };
