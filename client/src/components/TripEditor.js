import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Flex,
  Spacer,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { EditIcon } from "../assets/Icons";
import { convertDateFormat } from "../utils/dateFormatter";
import { getCountryList } from "../server-api/countryAPI";
import { deleteTrip, updateTrip } from "../server-api/tripAPI";
import { getGroupOfTrip } from "../server-api/userAPI";
import { deleteGroup } from "../server-api/groupAPI";

const TripEditor = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const initialRef = useRef(null);
  const cancelRef = useRef();

  const [countries, setCountries] = useState([]);
  const [tripID, setTripID] = useState(-1);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState(0);
  const [userID, setUserID] = useState(0);
  const [isLeader, setLeaderStatus] = useState(false);

  useEffect(() => {
    async function getTripDetails() {
      setTripID(props.trip.trip_id);
      setTitle(props.trip.name);
      setStartDate(convertDateFormat(props.trip.start_date));
      setEndDate(convertDateFormat(props.trip.end_date));
      setBudget(props.trip.budget);
      setDestination(props.trip.country_id);
    }

    async function getCountries() {
      const countryList = await getCountryList();
      const countryNames = countryList.map((item) => (
        <option key={item.country_id} value={item.country_id}>
          {item.name}
        </option>
      ));
      setCountries(countryNames);
    }

    async function determineLeader() {
      const members = await getGroupOfTrip(props.trip.trip_id);
      if (
        members !== undefined &&
        members[0].user_id === parseInt(props.userID)
      ) {
        setLeaderStatus(true);
      } else {
        setLeaderStatus(false);
      }
    }

    if (props.trip && props.trip.trip_id > 0) {
      getTripDetails();
    }

    if (props.userID !== undefined) {
      setUserID(parseInt(props.userID));
    }

    if (props.trip && props.trip.trip_id > 0 && props.userID !== undefined) {
      determineLeader();
    }

    getCountries();
  }, [props.trip, props.userID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateTrip({
      trip_id: tripID,
      name: title,
      budget: budget,
      startDateTime: startDate,
      endDateTime: endDate,
      country_id: destination,
    });
    await props.getSelectedTrip(tripID);
    await props.updateTrips(userID);
    onClose();
  };

  const deleteThisTrip = async () => {
    if (isLeader) {
      await deleteTrip(tripID);
    } else {
      await deleteGroup(tripID, userID);
    }
    await props.getSelectedTrip(undefined);
    await props.updateTrips(userID);
    onClose();
  };

  return (
    <>
      <Button
        w="50px"
        h="50px"
        border="1px"
        bg="#F8F3ED"
        borderColor="#DED3C2"
        _hover={{ bg: "#B3A591" }}
        onClick={onOpen}
      >
        <Icon as={EditIcon} boxSize={5} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt="16px">
            <form onSubmit={handleSubmit} id="trip-editor">
              <FormControl isRequired>
                <Input
                  ref={initialRef}
                  placeholder="Enter Trip Title Here"
                  defaultValue={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                  h="50px"
                  fontSize="30px"
                  fontWeight="bold"
                />
              </FormControl>

              <FormLabel mt="16px" fontWeight="bold">
                Travel date:
              </FormLabel>
              <FormControl isRequired pl="30px">
                <HStack>
                  <FormLabel w="60px">Start:</FormLabel>
                  <Input
                    type="date"
                    w="160px"
                    onChange={(event) =>
                      setStartDate(event.currentTarget.value)
                    }
                    defaultValue={startDate}
                  />
                </HStack>

                <HStack mt="16px">
                  <FormLabel w="60px">End:</FormLabel>
                  <Input
                    type="date"
                    w="160px"
                    onChange={(event) => setEndDate(event.currentTarget.value)}
                    defaultValue={endDate}
                    min={startDate}
                  />
                </HStack>
              </FormControl>

              <FormControl isRequired mt="16px">
                <FormLabel fontWeight="bold">Destination:</FormLabel>
                <Select
                  placeholder="Select country"
                  onChange={(event) =>
                    setDestination(event.currentTarget.value)
                  }
                  defaultValue={destination}
                >
                  {countries}
                </Select>
              </FormControl>

              <FormControl isRequired mt="16px">
                <FormLabel fontWeight="bold">Budget:</FormLabel>
                <Input
                  type="number"
                  placeholder="e.g., 2500.50"
                  onChange={(event) => setBudget(event.currentTarget.value)}
                  defaultValue={budget}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%">
              <Button colorScheme="red" onClick={onOpenAlert}>
                {isLeader ? "Delete" : "Leave"}
              </Button>
              <AlertDialog
                isOpen={isOpenAlert}
                leastDestructiveRef={cancelRef}
                onClose={onCloseAlert}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent w="200px">
                    <AlertDialogBody
                      mt="12px"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      {isLeader ? "Delete this trip?" : "Leave this trip?"}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseAlert}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={deleteThisTrip}
                        ml="15px"
                      >
                        {isLeader ? "Delete" : "Leave"}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <Spacer />
              <Button
                bg="#DED3C2"
                color="#6F5530"
                border="1px"
                borderColor="rgba(0, 0, 0, 0.14)"
                _hover={{ bg: "#F8F3ED" }}
                mr="12px"
                type="submit"
                form="trip-editor"
              >
                Save
              </Button>
              <Button onClick={onClose} colorScheme="red" variant="outline">
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TripEditor;