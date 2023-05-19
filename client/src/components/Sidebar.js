import { Box, Flex, Spacer, Image, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AdventureAuditLogo from "../assets/AdventureAuditLogo.png";
import TripList from "./TripList";
import TripAdder from "./TripAdder";
import Profile from "./Profile";

const Sidebar = (props) => {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState(0);
  const [countryName, setCountryName] = useState("");
  const [userEmail, setEmail] = useState("");

  useEffect(() => {
    function user() {
      const user = props.user;
      if (user !== undefined) {
        setUserName(user.name);
        setUserID(user.user_id);
        setCountryName(user.country_name);
        setEmail(user.email_id);
      }
    }

    user();
  }, [props.user]);

  return (
    <Flex flexDir="column" bg="#EAE6E0" h="100vh">
      <Flex alignItems="center" mx="30px">
        <Image src={AdventureAuditLogo} alt="AdventureAudit Logo" w="75%" />
        <Spacer />
        <Profile
          userID={userID}
          name={userName}
          countryName={countryName}
          email={userEmail}
          updateUser={props.updateUser}
          updateTrips={props.updateTrips}
          countries={props.countires}
        />
      </Flex>

      <Box
        overflowY="scroll"
        px="30px"
        sx={{
          "&::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "#EAE6E0",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
      >
        <Flex flexDir="column">
          <TripList
            trips={props.trips}
            getSelectedTrip={props.getSelectedTrip}
          />
        </Flex>
      </Box>

      <Spacer />
      <Box p="30px" w="100%">
        <Divider borderColor="white" />
        <TripAdder
          userID={userID}
          updateTrips={props.updateTrips}
          countries={props.countires}
        />
      </Box>
    </Flex>
  );
};

export default Sidebar;
