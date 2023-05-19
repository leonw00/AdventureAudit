import { useState, useEffect } from "react";
import { Stack, Text, Box } from "@chakra-ui/react";
import Trip from "./Trip";

const TripList = (props) => {
  const [listOfCurrentTrips, setListOfCurrentTrips] = useState([]);
  const [listOfUpcomingTrips, setListOfUpcomingrips] = useState([]);
  const [listOfPastTrips, setListOfPastTrips] = useState([]);

  useEffect(() => {
    async function trips() {
      const trips = props.trips;
      setListOfCurrentTrips(trips.present);
      setListOfUpcomingrips(trips.future);
      setListOfPastTrips(trips.past);
    }
    if (props.trips !== undefined) {
      trips();
    }
  }, [props.trips]);

  const currentTrips = listOfCurrentTrips.map((item) => (
    <Trip
      key={item.trip_id}
      tripID={item.trip_id}
      title={item.name}
      startDate={item.start_date}
      endDate={item.end_date}
      getSelectedTrip={props.getSelectedTrip}
    />
  ));

  const upcomingTrips = listOfUpcomingTrips.map((item) => (
    <Trip
      key={item.trip_id}
      tripID={item.trip_id}
      title={item.name}
      startDate={item.start_date}
      endDate={item.end_date}
      getSelectedTrip={props.getSelectedTrip}
    />
  ));

  const pastTrips = listOfPastTrips.map((item) => (
    <Trip
      key={item.trip_id}
      tripID={item.trip_id}
      title={item.name}
      startDate={item.start_date}
      endDate={item.end_date}
      getSelectedTrip={props.getSelectedTrip}
    />
  ));

  return (
    <Box overflow="hidden">
      <Text fontSize="20px" fontWeight="bold" mt="15px">
        CURRENT
      </Text>
      <Stack direction="column" spacing="16px">
        {currentTrips}
      </Stack>

      <Text fontSize="20px" fontWeight="bold" mt="15px">
        UPCOMING
      </Text>
      <Stack direction="column" spacing="16px">
        {upcomingTrips}
      </Stack>

      <Text fontSize="20px" fontWeight="bold" mt="15px">
        PAST
      </Text>
      <Stack direction="column" spacing="16px">
        {pastTrips}
      </Stack>
    </Box>
  );
};

export default TripList;
