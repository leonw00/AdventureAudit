import {
  Text,
  Textarea,
  Button,
  Box,
  Flex,
  Spacer,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { convertDateToDisplay } from "../utils/dateFormatter";
import { deleteTransaction } from "../server-api/transactionAPI";
import Category from "./Category";
import UserInfo from "./UserInfo";
import {
  convertCurrency,
  countryCurrencyCode,
  setCurrencyDecimal,
} from "../utils/currencyConversion";
import { getExhangeRate } from "../server-api/currencyAPI";

const TransactionViewer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [transactionID, setTransactionID] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [payers, setPayers] = useState(<Box />);

  //Currency Variables
  const [tripCode, setTripCode] = useState("");
  const [homeCode, setHomeCode] = useState("");
  const [rates, setRates] = useState({});

  useEffect(() => {
    if (props.transaction !== undefined) {
      setTransactionID(props.transaction.transaction_id);
      setName(props.transaction.name);
      setAmount(parseFloat(props.transaction.amount).toFixed(2));
      setDate(props.transaction.transaction_date);
      setTime(props.transaction.transaction_time);
      setCategoryIcon(props.transaction.category_icon);
      setCategoryColor(props.transaction.category_colour);
      setCategoryName(props.transaction.category_name);
      setNote(props.transaction.description);
      setCurrency(props.transaction.currency);
      let payerCards = props.transaction.payers.map((item) => (
        <UserInfo key={item.user_id} name={item.name} />
      ));
      setPayers(payerCards);
      setHomeCode(props.homeCode);
      setTripCode(props.tripCode);
      updateRate();
    }
  }, [props.transaction, props.homeCode, props.tripCode]);

  const deleteThisTransaction = async () => {
    await deleteTransaction(transactionID);
    props.getSelectedTrip(props.tripID);
    onClose();
  };

  const transformDecimal = (amount) => {
    const code = countryCurrencyCode(tripCode);
    const converted = setCurrencyDecimal(amount, code);
    return isNaN(converted) ? amount : converted;
  };

  const updateRate = async (date) => {
    const rate_list = await getExhangeRate(date);
    setRates(rate_list);
  };

  const convert_currency = () => {
    const res = convertCurrency({
      amount: amount,
      destinationCode: tripCode,
      homeCode: homeCode,
      rate_list: rates,
    });
    return res;
  };

  const showHomeCurrency = () => {
    const HomeCurrencyDisplay = (
      <HStack ml="76px">
        <Text fontSize="12px">{countryCurrencyCode(homeCode)}</Text>
        <Text fontSize="12px">{convert_currency()}</Text>
      </HStack>
    );
    return countryCurrencyCode(homeCode) !== countryCurrencyCode(tripCode)
      ? HomeCurrencyDisplay
      : "";
  };

  return (
    <Flex flexDir="column" h="100%" fontSize="md">
      <Text mb="30px" fontWeight="bold" fontSize="2xl">
        Transaction Details
      </Text>

      <HStack mb="15px">
        <Text fontWeight="bold">Item:</Text>
        <Text overflow="auto">{name}</Text>
      </HStack>

      <HStack>
        <Text fontWeight="bold">Amount:</Text>
        <Text>
          {currency} {transformDecimal(amount)}
        </Text>
      </HStack>
      {showHomeCurrency()}

      <HStack my="15px">
        <Text fontWeight="bold">Date:</Text>
        <Text>{convertDateToDisplay(date)}</Text>
      </HStack>

      <HStack mb="15px">
        <Text fontWeight="bold">Time:</Text>
        <Text>{time}</Text>
      </HStack>

      <Box mb="15px">
        <Text fontWeight="bold">Category:</Text>
        <HStack>
          <Category canCheck={false} backgroundColor={categoryColor}>
            {categoryIcon}
          </Category>
          <Text>{categoryName}</Text>
        </HStack>
      </Box>

      <Box mb="15px">
        <Text fontWeight="bold">Payers:</Text>
        <VStack align="left" mt="5px">
          {payers}
        </VStack>
      </Box>

      <Box mb="30px">
        <Text fontWeight="bold">Notes:</Text>
        <Textarea
          mt="7px"
          resize="none"
          isReadOnly={true}
          value={note}
          cursor="default"
        ></Textarea>
      </Box>

      <Spacer />
      <Flex>
        <Button w="100%" colorScheme="red" onClick={onOpen}>
          Delete
        </Button>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent w="250px">
            <AlertDialogBody mt="12px" fontWeight="bold" textAlign="center">
              Delete this transaction?
            </AlertDialogBody>

            <AlertDialogFooter justifyContent="center">
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteThisTransaction}
                ml="15px"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default TransactionViewer;
