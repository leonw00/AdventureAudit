import axios from "axios";

// Deletes the trip with the given trip_id
async function deleteTrip(trip_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    await axios.delete(`${SERVER_URL}/trip/${trip_id}`);
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

// Gets all the trips for the given user_id
async function getAllTrips(user_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    // construct the date
    const curr_date = new Date().toJSON().slice(0, 10);

    // get the present lists
    const result_present = await axios.get(
      `${SERVER_URL}/trip/user/${user_id}?start_date_time=${curr_date}&end_date_time=${curr_date}`
    );

    // get the past lists
    const result_future = await axios.get(
      `${SERVER_URL}/trip/user/${user_id}?start_date_time=${curr_date}`
    );

    // get the future lists
    const result_past = await axios.get(
      `${SERVER_URL}/trip/user/${user_id}?end_date_time=${curr_date}`
    );

    const present = result_present.data.userTrips;
    const past = result_past.data.userTrips;
    const future = result_future.data.userTrips;

    return {
      past: past,
      present: present,
      future: future,
    };
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

// Gets a trips information given the trip_id and the home currency of the user as country_code
async function getTripInfo(trip_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    // get the trip details from
    const trip_details = await axios.get(`${SERVER_URL}/trip/${trip_id}`);

    // get the total expense
    const total_expense = await axios.get(
      `${SERVER_URL}/report/sum?trip_id=${trip_id}`
    );

    // get the transactions
    const transaction_list = await axios.get(
      `${SERVER_URL}/transaction/trip/${trip_id}`
    );

    const trip = trip_details.data.userTrip[0];
    const transactionsList = transaction_list.data.transaction;
    let expense = total_expense.data.report[0].trip_total_expense;
    expense = parseFloat(expense, 10).toFixed(2);
    if (isNaN(expense)) {
      expense = "0.00";
    }

    return {
      name: trip.name,
      trip_id: trip.trip_id,
      budget: parseFloat(trip.budget, 10).toFixed(2),
      country_name: trip.country_name,
      currency: trip.currency,
      start_date: trip.start_date,
      end_date: trip.end_date,
      transactions: transactionsList,
      total_expense: expense,
      country_id: trip.country_id,
      country_code: trip.country_code,
    };
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

// Gets the report details for trip_id with the debt relation for user_id
async function getTripReport(trip_id, user_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    // get how much is spent for each category
    const expense_per_category = await axios.get(
      `${SERVER_URL}/report/category?trip_id=${trip_id}`
    );

    // get the top five transactions
    const top_five_transactions = await axios.get(
      `${SERVER_URL}/report/transaction?trip_id=${trip_id}`
    );

    // get debt relationship
    const debt_relationship = await axios.get(
      `${SERVER_URL}/report/debt?user_id=${user_id}&trip_id=${trip_id}`
    );

    return {
      expense_per_category: expense_per_category.data.result,
      top_five_transactions: top_five_transactions.data.result,
      debt_relationship: debt_relationship.data.result,
    };
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

// Creates a new trip with the given input
async function postTrip({
  name,
  budget,
  startDateTime,
  endDateTime,
  user_id,
  country_id,
}) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      name: name,
      budget: budget,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      user_id: user_id,
      country_id: country_id,
    };

    await axios.post(`${SERVER_URL}/trip`, query);
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

// Updates a trip with the given trip_id and input
async function updateTrip({
  trip_id,
  name,
  budget,
  startDateTime,
  endDateTime,
  country_id,
}) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      name: name,
      budget: budget,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      country_id: country_id,
    };

    await axios.put(`${SERVER_URL}/trip/${trip_id}`, query);
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

export {
  deleteTrip,
  getAllTrips,
  getTripInfo,
  getTripReport,
  postTrip,
  updateTrip,
};
