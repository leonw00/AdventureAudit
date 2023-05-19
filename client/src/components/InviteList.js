import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getInvite } from "../server-api/inviteAPI";
import Invite from "./Invite";

const InviteList = (props) => {
  const userID = props.userID;

  const [listOfInvites, setInviteList] = useState(<Box />);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getInviteList() {
      let listBuilder;
      let inviteList = await getInvite(userID);

      if (inviteList instanceof Array && inviteList.length > 0) {
        listBuilder = inviteList.map((item) => (
          <Invite
            key={item.trip_id}
            invite={item}
            updateInvites={updateInvites}
            updateTrips={props.updateTrips}
          />
        ));
        setInviteList(listBuilder);
      } else {
        setInviteList(<Box fontSize="sm">No invites!</Box>);
      }
    }

    setUpdate(false);
    getInviteList();
  }, [userID, update, props.updateTrips]);

  const updateInvites = () => {
    setUpdate(true);
  };

  return (
    <Box mb="12px" mt="8px">
      <Flex flexDir="column">{listOfInvites}</Flex>
    </Box>
  );
};

export default InviteList;
