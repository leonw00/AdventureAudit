import axios from "axios";

// get all the countries
async function getCountryList() {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const country_list = await axios.get(`${SERVER_URL}/country`);

    const countries = country_list.data.countries;

    return countries;
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

export { getCountryList };
