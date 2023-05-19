import axios from "axios";

// deletes the invitation with the given trip_id and user_id
async function deleteInvite(trip_id, user_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    await axios.delete(`${SERVER_URL}/invite/trip/${trip_id}/user/${user_id}`);
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

// get the invitations for the given user_id
async function getInvite(user_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const invite_details = await axios.get(
      `${SERVER_URL}/invite/user/${user_id}`
    );

    const invites = invite_details.data.invite;

    return invites;
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

// creates an invite for user_id for trip_id from the user inviter_id
async function postInvite({ trip_id, user_id, inviter_id }) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      trip_id: parseInt(trip_id, 10),
      user_id: parseInt(user_id, 10),
      inviter_id: parseInt(inviter_id, 10),
    };

    await axios.post(`${SERVER_URL}/invite`, query);
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

export { deleteInvite, getInvite, postInvite };
