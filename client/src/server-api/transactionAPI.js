import axios from "axios";

// delete the transaction with transaction_id
async function deleteTransaction(transaction_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    await axios.delete(`${SERVER_URL}/transaction/${transaction_id}`);
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

// create a new transaction with the given information
async function postTransaction({
  trip_id,
  name,
  amount,
  category_id,
  transaction_date,
  description,
  user_id,
  payers,
}) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      trip_id: trip_id,
      name: name,
      amount: parseFloat(amount),
      category_id: category_id,
      transaction_date: transaction_date,
      description: description,
      user_id: user_id,
    };

    const transaction = await axios.post(`${SERVER_URL}/transaction`, query);
    const transaction_id = transaction.data.transaction.insertId;

    if (payers.length > 0) {
      for (let i = 0; i < payers.length; i++) {
        const payer_query = {
          transaction_id: transaction_id,
          user_id: payers[i],
        };
        await axios.post(`${SERVER_URL}/payer`, payer_query);
      }
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

export { deleteTransaction, postTransaction };
