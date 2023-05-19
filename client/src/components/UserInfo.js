import { Avatar, Text, HStack } from "@chakra-ui/react";

const UserInfo = (props) => {
  return (
    <HStack w="100%">
      <Avatar name={props.name} size="sm" />

      <Text
        w="100%"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {props.name}
      </Text>
    </HStack>
  );
};

export default UserInfo;
