export function convertDateFormat(dateString) {
  dateString = dateString === undefined ? "Jan/01/1975" : dateString;
  const date = new Date(
    dateString.replace(/(\w{3})\/(\d{2})\/(\d{4})/, "$1 $2 $3")
  );
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function convertDateToDisplay(dateString) {
  dateString = dateString === undefined ? "Jan/01/1975" : dateString;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert inputDate to Date object
  const date = new Date(dateString.replace("/", " "));

  // Get day of the week (0-6)
  const dayOfWeek = date.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get month (0-11)
  const month = date.getMonth();

  // Get day of the month (1-31)
  const dayOfMonth = date.getDate();

  // Construct output string
  const outputDate = `${daysOfWeek[dayOfWeek]}, ${months[month]} ${
    dayOfMonth < 10 ? "0" : ""
  }${dayOfMonth}, ${date.getFullYear()}`;

  return outputDate;
}

export function isDateValid(dateString) {
  const date = new Date(dateString);
  const earliestDate = new Date("2010-01-01");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    date.toString() !== "Invalid Date" && date >= earliestDate && date <= today
  );
}
