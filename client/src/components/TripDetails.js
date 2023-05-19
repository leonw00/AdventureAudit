import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getTripReport } from "../server-api/tripAPI";
import TripDetailButton from "./TripDetailButton";
import TransactionAdder from "./TransactionAdder";
import TransactionViewer from "./TransactionViewer";
import Collaboration from "./Collaboration";
import CategoryAdder from "./CategoryAdder";
import Report from "./Report";

const TripDetails = (props) => {
  const [currentComponent, setDisplay] = useState(<Box />);
  const [reportData, setReportData] = useState([]);
  const [userHomeCode, setUserHomeCode] = useState("");

  // when another trip is selected, TripDetails is set to blank page
  useEffect(() => {
    setDisplay(<Box />);
  }, [props.trip.trip_id]);

  useEffect(() => {
    if (props.transaction !== undefined) {
      setDisplay(
        <TransactionViewer
          tripCode = {props.trip.country_code}
          homeCode = {props.user.country_code}
          transaction={props.transaction}
          tripID={props.trip.trip_id}
          getSelectedTrip={props.getSelectedTrip}
        />
      );
    } else if (
      props.transaction === undefined &&
      currentComponent.type.name === "TransactionViewer"
    ) {
      setDisplay(<Box />);
    }
  }, [
    props.transaction,
    props.trip.trip_id,
    props.getSelectedTrip,
    props.trip.country_code,
    props.user.country_code,
    currentComponent.type,
  ]);

  // pass data to Report
  useEffect(() => {
    async function tripReportData() {
      const user = props.user;
      const trip = props.trip;
      if (user !== undefined && user.user_id > 0 && trip !== undefined) {
        setUserHomeCode(user.country_code);
        const report = await getTripReport(trip.trip_id, user.user_id);
        setReportData(report);
      }
    }
    tripReportData();
  }, [props.user, props.trip]);

  const DisplayTransactionAdder = () => {
    props.setSelectedTransaction(undefined);
    setDisplay(
      <TransactionAdder
        onCancel={HideTransactionAdder}
        user={props.user}
        trip={props.trip}
        getSelectedTrip={props.getSelectedTrip}
      />
    );
  };

  const HideTransactionAdder = () => {
    setDisplay(<Box />);
  };

  const DisplayReport = () => {
    props.setSelectedTransaction(undefined);
    setDisplay(
      <Report data={reportData} trip={props.trip} homeCountry={userHomeCode} />
    );
  };

  const DisplayCollaboration = () => {
    props.setSelectedTransaction(undefined);
    setDisplay(<Collaboration trip={props.trip} inviter={props.user} />);
  };

  const DisplayCategoryAdder = () => {
    props.setSelectedTransaction(undefined);
    setDisplay(<CategoryAdder tripID={props.trip.trip_id} />);
  };

  return (
    <Flex
      flexDir="column"
      h="100vh"
      p="30px"
      borderLeft="1px"
      borderColor="#DED3C2"
    >
      <Flex pb="30px">
        <Box>
          <TripDetailButton
            onClick={DisplayTransactionAdder}
            icon="AddIcon"
            toolTip="Add transaction"
          />
        </Box>
        <Spacer />
        <Box>
          <TripDetailButton
            onClick={DisplayCategoryAdder}
            icon="CustomIcon"
            toolTip="Add new category"
          />
        </Box>
        <Spacer />
        <Box>
          <TripDetailButton
            onClick={DisplayReport}
            icon="ReportIcon"
            toolTip="Report"
          />
        </Box>
        <Spacer />
        <Box>
          <TripDetailButton
            onClick={DisplayCollaboration}
            icon="SocialIcon"
            toolTip="Collaboration"
          />
        </Box>
      </Flex>
      <Box
        flex="1"
        overflowY="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
      >
        {currentComponent}
      </Box>
    </Flex>
  );
};

export default TripDetails;
