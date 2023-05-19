import {
  Text,
  Box,
  Flex,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getGroup } from "../server-api/groupAPI";
import { getInvite, postInvite } from "../server-api/inviteAPI";
import { getUserByEmail } from "../server-api/userAPI";
import UserInfo from "./UserInfo";

const Collaboration = (props) => {
  const [members, setMembers] = useState(<Box />);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedEmail, setInvitedEmail] = useState("");
  const [foundStatus, setFoundStatus] = useState(-1); //0: found, 1: not found, 2: in group already

  const handleInputChange = (e) => {
    setInviteEmail(e.target.value);
    setFoundStatus(-1);
  };
  const isError = foundStatus;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inviter = props.inviter;
    const tripID = props.trip.trip_id;
    let status = 1;
    let userID = -1;

    if (inviteEmail && inviter !== undefined) {
      const user = await getUserByEmail(inviteEmail);
      if (
        user !== undefined &&
        user.error === undefined &&
        parseInt(user.user_id) > 0
      ) {
        let found = false;
        userID = user.user_id;
        for (let i = 0; i < members.length && !found; i++) {
          found = userID === parseInt(members[i].key);
        }

        if (!found) {
          const invites = await getInvite(userID);
          for (let i = 0; i < invites.length && !found; i++) {
            found = parseInt(tripID) === invites[i].trip_id;
          }
        }

        if (found) {
          status = 2;
        } else {
          status = 0;
        }
      }
    }

    setFoundStatus(status);
    if (status === 0) {
      postInvite({
        trip_id: tripID,
        user_id: userID,
        inviter_id: inviter.user_id,
      });
      setInvitedEmail(inviteEmail);
      setInviteEmail("");
      document.getElementById("invite-member").reset();
    }
  };

  useEffect(() => {
    async function setGroup() {
      let groupMembers = await getGroup(props.trip.trip_id);
      let memberList = groupMembers.map((item) => (
        <UserInfo key={item.user_id} name={item.name} />
      ));
      setMembers(memberList);
    }
    if (props.trip !== undefined) {
      setGroup();
    }
  }, [props.trip]);

  return (
    <Flex flexDir="column" h="100%">
      <Text fontWeight="bold" fontSize="2xl">
        Collaboration
      </Text>

      <Box mb="30px" mt="15px">
        <Text fontWeight="bold">Trip Members:</Text>
        <VStack align="left" mt="5px">
          {members}
        </VStack>
      </Box>

      <form onSubmit={handleSubmit} id="invite-member">
        <FormControl isRequired>
          <FormLabel>Invite:</FormLabel>
          <Input
            type="email"
            value={inviteEmail}
            onChange={handleInputChange}
            placeholder="Enter the email address here"
          />
          {isError === 0 ? (
            <FormHelperText ml="8px">
              Invited {invitedEmail} to the trip!
            </FormHelperText>
          ) : isError === 1 ? (
            <FormHelperText color="red" ml="8px">
              There is no user with that email
            </FormHelperText>
          ) : isError === 2 ? (
            <FormHelperText color="red" ml="8px">
              That user is already in this group or has a pending invite
            </FormHelperText>
          ) : (
            <Box />
          )}
        </FormControl>

        <Button
          mt="10px"
          bg="#DED3C2"
          color="#6F5530"
          border="1px"
          borderColor="rgba(0, 0, 0, 0.14)"
          _hover={{ bg: "#F8F3ED" }}
          float="right"
          type="submit"
          form="invite-member"
        >
          Invite
        </Button>
      </form>
    </Flex>
  );
};

export default Collaboration;
