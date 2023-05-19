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
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { postTrip } from "../server-api/tripAPI";

const TripAdder = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const [countries, setCountries] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState(0);
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    async function getCountries() {
      const countryList = props.countries;
      const countryNames = countryList.map((item) => (
        <option key={item.country_id} value={item.country_id}>
          {item.name}
        </option>
      ));
      setCountries(countryNames);
    }

    if (props.userID !== undefined) {
      setUserID(parseInt(props.userID));
    }
    if (props.countries !== undefined) {
      getCountries();
    }
  }, [props.userID, props.countries]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postTrip({
      name: title,
      budget: budget,
      startDateTime: startDate,
      endDateTime: endDate,
      user_id: userID,
      country_id: destination,
    });
    await props.updateTrips(userID);
    onClose();
  };

  return (
    <>
      <Button
        w="100%"
        bg="#DED3C2"
        mt="30px"
        color="#6F5530"
        border="1px"
        borderColor="rgba(0, 0, 0, 0.14)"
        _hover={{ bg: "#F8F3ED" }}
        onClick={onOpen}
      >
        + New Trip
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt="16px">
            <form onSubmit={handleSubmit} id="trip-adder">
              <FormControl isRequired>
                <Input
                  ref={initialRef}
                  placeholder="Enter Trip Title Here"
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
                  />
                </HStack>

                <HStack mt="16px">
                  <FormLabel w="60px">End:</FormLabel>
                  <Input
                    type="date"
                    w="160px"
                    onChange={(event) => setEndDate(event.currentTarget.value)}
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
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%">
              <Button
                bg="#DED3C2"
                color="#6F5530"
                border="1px"
                borderColor="rgba(0, 0, 0, 0.14)"
                _hover={{ bg: "#F8F3ED" }}
                type="submit"
                form="trip-adder"
              >
                Save
              </Button>
              <Spacer />
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

export default TripAdder;
