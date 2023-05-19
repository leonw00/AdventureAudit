import {
  Text,
  HStack,
  Square,
  Icon,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import * as Icons from "../assets/Icons";
import {
  countryCurrencyCode,
  setCurrencyDecimal,
} from "../utils/currencyConversion";

const Transactions = (props) => {
  const IconComponent = Icons[props.icon];

  const selectTransaction = () => {
    const transactionPayload = {
      transaction_id: props.transaction_id,
      transaction_date: props.detail_date,
      transaction_time: props.time,
      name: props.title,
      amount: props.amount,
      category_colour: props.colour,
      category_icon: props.icon,
      category_name: props.cat_name,
      currency: props.currency,
      description: props.description,
      payers: props.payers,
    };
    props.setSelectedTransaction(transactionPayload);
  };

  let payerAvatars = props.payers.map((item) => (
    <Avatar key={item.user_id} name={item.name} />
  ));

  const transformDecimal = (amount) => {
    const code = countryCurrencyCode(props.country_code);
    const converted = setCurrencyDecimal(amount, code);
    return isNaN(converted) ? amount : converted;
  };

  return (
    <div>
      <Text mt="10px" fontSize="15px">
        {props.date}
      </Text>

      <HStack mt="5px">
        {/* Category */}
        <Square
          size="40px"
          bg={props.colour}
          m="0px 10px 0px 15px"
          borderRadius="10px"
        >
          <Icon as={IconComponent} boxSize={6}></Icon>
        </Square>

        <HStack
          w="100%"
          py="5px"
          bg="#FBF8F5"
          borderRadius="10px"
          cursor="pointer"
          _hover={{ bg: "#F8F3ED" }}
          onClick={selectTransaction}
        >
          {/* Detail */}
          <Text isTruncated marginLeft="10px" w="200px">
            {props.title}
          </Text>

          {/* Amount */}
          <Text w="130px">
            {props.currency}
            {transformDecimal(props.amount)}
          </Text>

          {/* Payers */}
          <AvatarGroup size="sm" max={4}>
            {payerAvatars}
          </AvatarGroup>
        </HStack>
      </HStack>
    </div>
  );
};

export default Transactions;
