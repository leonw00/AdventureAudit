import { Text, HStack, Icon, Flex, Spacer, Tooltip } from "@chakra-ui/react";
import * as Icons from "../assets/Icons";

const PaymentSummary = (props) => {
  const IconComponent = Icons[props.icon];

  return (
    <HStack mt="10px">
      <HStack w="100%" py="10px" bg="#FBF8F5" borderRadius="10px">
        <Flex w="100%" alignItems="center">
          <Text fontSize="15px" mx="10px">
            You
          </Text>
          <Icon
            as={IconComponent}
            color={props.icon === "RightArrowIcon" ? "#BF3737" : "#028A0F"}
            boxSize={6}
            mx="5px"
          />
          <Tooltip label={props.member}>
            <Text isTruncated fontSize="15px" mx="10px" maxW="80px">
              {props.member}
            </Text>
          </Tooltip>
          <Spacer />
          <Text
            fontSize="15px"
            mr="10px"
            fontWeight="bold"
            overflow="auto"
            maxW="110px"
          >
            {props.currency}
            {props.amount}
          </Text>
        </Flex>
      </HStack>
    </HStack>
  );
};

export default PaymentSummary;
