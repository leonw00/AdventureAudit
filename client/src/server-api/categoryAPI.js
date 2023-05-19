import axios from "axios";

// Deletes the category with category_id
async function deleteCategory(category_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    await axios.delete(`${SERVER_URL}/category/${category_id}`);
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

// gets the categories for the given trip_id
async function getCategories(trip_id) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const custom_categories = await axios.get(
      `${SERVER_URL}/category/trip/${trip_id}`
    );

    const cus = custom_categories.data.categories;

    return cus;
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

// Create a new category
async function postCategory({ trip_id, name, colour, icon }) {
  try {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const query = {
      trip_id: trip_id,
      name: name,
      colour: colour,
      icon: icon,
    };

    await axios.post(`${SERVER_URL}/category`, query);
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

export { deleteCategory, getCategories, postCategory };
