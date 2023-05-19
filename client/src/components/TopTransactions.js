import { Text, HStack, Square, Icon, Flex, Spacer } from "@chakra-ui/react";
import * as Icons from "../assets/Icons";

const Transactions = (props) => {
  const IconComponent = Icons[props.icon];

  return (
    <HStack mt="10px">
      <Square size="40px" bg={props.colour} borderRadius="10px">
        <Icon as={IconComponent} boxSize={6}></Icon>
      </Square>

      <HStack w="100%" py="10px" bg="#FBF8F5" borderRadius="10px">
        <Flex w="100%" alignItems="center">
          <Text isTruncated fontSize="15px" ml="10px" w="130px">
            {props.title}
          </Text>
          <Spacer />
          <Text fontSize="15px" mr="10px" fontWeight="bold" maxW="100px">
            {props.currency}
            {props.amount}
          </Text>
        </Flex>
      </HStack>
    </HStack>
  );
};

export default Transactions;
