import axios from "axios";
import { isDateValid } from "../utils/dateFormatter";

// get the exchanges rates for the given date
async function getExhangeRate(date) {
  try {
    const SERVER_URL = "https://api.exchangerate.host/";

    const endpoint =
      date === undefined || date === null || !isDateValid(date)
        ? "latest"
        : date;

    const exhange_rate = await axios.get(`${SERVER_URL}/${endpoint}`);

    const rate = exhange_rate.data.rates;

    return rate;
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

export { getExhangeRate };
