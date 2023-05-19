import { Text, Box, Flex, Spacer, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  convertCurrency,
  countryCurrencyCode,
  setCurrencyDecimal,
} from "../utils/currencyConversion";
import { getExhangeRate } from "../server-api/currencyAPI";
import TransactionList from "./TransactionList";
import TripEditor from "./TripEditor";

const TripInfo = (props) => {
  const [trip, setTrip] = useState({
    name: "",
    trip_id: -1,
    start_date: "",
    end_date: "",
    budget: "",
    country_name: "",
    country_code: "",
    currency: "",
    total_expense: "",
    transactions: [],
  });
  const [user, setUser] = useState({ user_id: 0, country_code: "" });
  const [expenseStatus, setExpenseStatus] = useState("Black");
  const [rates, setRates] = useState({});

  useEffect(() => {
    async function updateTripInfo() {
      const currentTrip = props.trip;
      setTrip(currentTrip);
      if (
        parseFloat(currentTrip.total_expense) > parseFloat(currentTrip.budget)
      ) {
        setExpenseStatus("red");
      } else {
        setExpenseStatus("black");
      }
    }

    if (props.trip !== undefined) {
      updateRate();
      updateTripInfo();
    }
    if (props.user !== undefined) {
      setUser(props.user);
    }
  }, [props.user, props.trip]);

  const updateRate = async () => {
    const rate_list = await getExhangeRate();
    setRates(rate_list);
  };

  const transformDecimal = (amount) => {
    const code = countryCurrencyCode(trip.country_code);
    const converted = setCurrencyDecimal(amount, code);
    return isNaN(converted) ? amount : converted;
  };

  const computeCurrency = (amount) => {
    const code = countryCurrencyCode(user.country_code);
    const converted = convertCurrency({
      amount: amount,
      destinationCode: trip.country_code,
      homeCode: user.country_code,
      rate_list: rates,
    });

    return countryCurrencyCode(user.country_code) !==
      countryCurrencyCode(trip.country_code)
      ? code + " " + converted
      : "";
  };

  return (
    <Box
      p="30px"
      h="100vh"
      overflowY="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      <Flex>
        <Box>
          <Heading fontSize="40px">{trip.name}</Heading>
          <Text fontSize="20px">{`${trip.start_date} - ${trip.end_date}`}</Text>
        </Box>
        <Spacer />

        <TripEditor
          trip={trip}
          userID={user.user_id}
          getSelectedTrip={props.getSelectedTrip}
          updateTrips={props.updateTrips}
        />
      </Flex>

      <Flex flexDir="row" mt="30px">
        <Box w="400px" bg="#FBF8F5" borderY="1px" borderColor="#DED3C2">
          <Flex flexDir="row" h="100%" p="20px">
            <Box fontSize="20px" w="50%" mr="8px">
              Budget <br />
              <Box fontSize="25px" fontWeight="bold" mt="8px">
                {trip.currency}
                {transformDecimal(trip.budget)}
              </Box>
              <Text fontSize="12px">{computeCurrency(trip.budget)}</Text>
            </Box>

            <Box fontSize="20px" color={expenseStatus} w="50%">
              Total Expense <br />
              <Box fontSize="25px" fontWeight="bold" mt="8px">
                {trip.currency}
                {transformDecimal(trip.total_expense)}
              </Box>
              <Text fontSize="12px">{computeCurrency(trip.total_expense)}</Text>
            </Box>
          </Flex>
        </Box>

        <Flex flexDir="column" ml="20px">
          <Text fontWeight="semibold" fontSize="15px">
            Destination:
          </Text>
          <Text fontWeight="bold" fontSize="25px">
            {trip.country_name}
          </Text>
          <Text fontWeight="semibold" fontSize="15px" mt="10px">
            Currency:
          </Text>
          <Text fontWeight="bold" fontSize="25px">
            {trip.currency}
          </Text>
        </Flex>
      </Flex>

      <Text mt="30px">Transactions</Text>
      <TransactionList
        transactionsOfTrip={trip.transactions}
        countryCode={trip.country_code}
        currency={trip.currency}
        setSelectedTransaction={props.setSelectedTransaction}
      />
    </Box>
  );
};

export default TripInfo;
