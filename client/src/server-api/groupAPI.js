import axios from "axios";

// get the group that is part of trip_id
async function getGroup(trip_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const group_details = await axios.get(
      `${SERVER_URL}/user/group/${trip_id}`
    );

    const group = group_details.data.members;

    return group;
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

// Creates a new group with the given trip_id and user_id
async function postGroup({ trip_id, user_id }) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      trip_id: parseInt(trip_id, 10),
      user_id: parseInt(user_id, 10),
    };

    await axios.post(`${SERVER_URL}/group`, query);
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

// deletes the group record with trip_id and user_id
async function deleteGroup(trip_id, user_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    await axios.delete(`${SERVER_URL}/group/trip/${trip_id}/user/${user_id}/`);
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

export { getGroup, postGroup, deleteGroup };
