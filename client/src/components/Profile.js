import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Flex,
  ModalHeader,
  useDisclosure,
  Avatar,
  Tooltip,
  Spacer,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { LogoutIcon } from "../assets/Icons";
import { onGoogleLogout } from "../utils/socialValidate";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../server-api/userAPI";
import InviteList from "./InviteList";

const Profile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [countryList, setCountries] = useState([]); //default as 40: Canada
  const [newCountry, setNewCountry] = useState(40);
  const [currentCountryId, setCurrentCountry] = useState(40);
  const userID = parseInt(props.userID);
  const initialRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCountries() {
      const countryNames = props.countries.map((item) => (
        <option key={item.country_id} value={item.country_id}>
          {item.name}
        </option>
      ));
      setCountries(countryNames);
      let low = 0;
      let high = props.countries.length;
      let found = -1; // Search for the country id with the same name as props.countryName

      if (props.countryName !== "" && props.countries !== undefined) {
        while (low <= high && found < 0) {
          let mid = Math.floor((low + high) / 2);
          if (props.countries[mid].name === props.countryName) {
            found = mid;
          } else if (props.countries[mid].name > props.countryName) {
            high = mid - 1;
          } else {
            low = mid + 1;
          }
        }
        if (found >= 0) {
          setNewCountry(found + 1);
          setCurrentCountry(found + 1);
        }
      }
    }

    if (props.countries !== undefined) {
      getCountries();
    }
  }, [props.countryName, props.countries]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (newCountry !== currentCountryId) {
      await updateUser({
        user_id: userID,
        name: props.name,
        country_id: newCountry,
        email: props.email,
      });
    }

    onClose();
    props.updateUser();
  }

  function logOut() {
    onGoogleLogout();
    navigate("/"); //navigate to the login page
  }

  return (
    <>
      <Tooltip label="Open Profile" fontSize="xs">
        <Avatar
          name={props.name}
          size="md"
          _hover={{ borderColor: "black", border: "2px", cursor: "pointer" }}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>
              <Text>Profile</Text>
              <Spacer />
              <Button onClick={logOut} size="xs" variant="outline">
                <Icon as={LogoutIcon} mr="4px" /> Logout
              </Button>
              <Button
                onClick={onClose}
                size="xs"
                colorScheme="red"
                variant="outline"
                ml={3}
              >
                X
              </Button>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Text>
              <b>Name:</b> {props.name}
            </Text>
            <Text mt="8px">
              <b>Email:</b> {props.email}
            </Text>
            <form onSubmit={handleSubmit} id="profile-form">
              <FormControl mt="8px">
                <FormLabel fontWeight="bold">Home Country:</FormLabel>
                <Select
                  onChange={(event) => setNewCountry(event.currentTarget.value)}
                  defaultValue={newCountry}
                  ref={initialRef}
                >
                  {countryList}
                </Select>
              </FormControl>
              <Button
                bg="#DED3C2"
                color="#6F5530"
                border="1px"
                borderColor="rgba(0, 0, 0, 0.14)"
                _hover={{ bg: "#F8F3ED" }}
                type="submit"
                form="profile-form"
                size="xs"
                float="right"
                mt="12px"
              >
                Save
              </Button>
            </form>

            <Text mt="40px">
              <b>Pending Invites:</b>
            </Text>
            <InviteList userID={userID} updateTrips={props.updateTrips} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
