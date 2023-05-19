import { Text, Grid, GridItem, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUser } from "../server-api/userAPI";
import { getAllTrips, getTripInfo } from "../server-api/tripAPI";
import { getCountryList } from "../server-api/countryAPI";
import TripDetails from "../components/TripDetails";
import Sidebar from "../components/Sidebar";
import TripInfo from "../components/TripInfo";

const MainPage = () => {
  const [user, setUser] = useState(undefined);
  const [trips, setTrips] = useState(undefined);
  const [countires, setCountries] = useState(undefined);
  const [selectedTrip, setSelectedTrip] = useState(undefined);
  const [selectedTransaction, setSelectedTransaction] = useState(undefined);

  async function setCurrentUser() {
    const currentUser = await getUser();
    setUser(currentUser);
  }

  async function updateTrips(userID) {
    const listOfTrips = await getAllTrips(userID);
    setTrips(listOfTrips);
  }

  async function setCountryList() {
    const listOfCountires = await getCountryList();
    setCountries(listOfCountires);
  }

  async function getSelectedTrip(tripID) {
    if (tripID > 0) {
      const currTrip = await getTripInfo(tripID);
      setSelectedTrip(currTrip);
      setSelectedTransaction(undefined);
    } else {
      setSelectedTrip(undefined);
    }
  }

  useEffect(() => {
    setCurrentUser();
    setCountryList();
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      updateTrips(user.user_id);
    }
  }, [user]);

  return (
    <Container maxW="1600px" p={0} borderRight="1px" borderColor="#DED3C2">
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1} maxW="370px" minW="300px">
          <Sidebar
            user={user}
            updateUser={setCurrentUser}
            trips={trips}
            updateTrips={updateTrips}
            countires={countires}
            getSelectedTrip={getSelectedTrip}
          />
        </GridItem>

        {/* displays specific trip when trip is selected */}
        {selectedTrip !== undefined ? (
          <>
            <GridItem colSpan={2} minW="620px">
              <TripInfo
                user={user}
                trip={selectedTrip}
                getSelectedTrip={getSelectedTrip}
                updateTrips={updateTrips}
                setSelectedTransaction={setSelectedTransaction}
              />
            </GridItem>

            <GridItem colSpan={1} minW="370px">
              <TripDetails
                user={user}
                trip={selectedTrip}
                getSelectedTrip={getSelectedTrip}
                transaction={selectedTransaction}
                setSelectedTransaction={setSelectedTransaction}
              />
            </GridItem>
          </>
        ) : (
          <GridItem colSpan={3} textAlign="center" margin="auto" minW="990px">
            <Text>Select a trip or add a new travel event to continue!</Text>
          </GridItem>
        )}
      </Grid>
    </Container>
  );
};

export default MainPage;
