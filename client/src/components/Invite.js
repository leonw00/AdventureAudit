import { Button, Text, HStack, Flex, Spacer, VStack } from "@chakra-ui/react";
import { deleteInvite } from "../server-api/inviteAPI";
import { postGroup } from "../server-api/groupAPI";

const Invite = (props) => {
  const invite = props.invite;

  async function acceptInvite() {
    await postGroup({ trip_id: invite.trip_id, user_id: invite.user_id });
    await deleteInvite(invite.trip_id, invite.user_id);
    props.updateInvites();
    props.updateTrips(invite.user_id);
  }

  async function declineInvite() {
    await deleteInvite(invite.trip_id, invite.user_id);
    props.updateInvites();
  }

  return (
    <Flex w="100%" h="70px" bg="#FBF8F5" borderRadius="10px" mb="5px">
      <HStack ml="12px">
        <Flex direction="column">
          <Text fontSize="sm" maxW="350px" isTruncated>
            From <b>{invite.inviter_name}</b>
          </Text>

          {/* Trip Name */}
          <Text maxW="350px" isTruncated>
            {invite.name}
          </Text>

          {/* Date */}
          <Text fontSize="xs">
            {invite.start_date} - {invite.end_date}
          </Text>
        </Flex>
      </HStack>
      <Spacer />

      <VStack mr="12px" my="auto">
        {/* Accept Button */}
        <Button colorScheme="green" size="xs" onClick={acceptInvite}>
          Accept
        </Button>

        {/* Decline Button */}
        <Button colorScheme="red" size="xs" onClick={declineInvite}>
          Decline
        </Button>
      </VStack>
    </Flex>
  );
};

export default Invite;
