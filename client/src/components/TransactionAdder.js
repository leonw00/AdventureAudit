import {
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  Button,
  Box,
  Flex,
  Spacer,
  FormLabel,
  HStack,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  Icon,
  Tooltip,
  Switch,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { QuestionIcon } from "../assets/Icons";
import {
  convertCurrency,
  countryCurrencyCode,
  getCurrencyDecimal,
} from "../utils/currencyConversion";
import { getGroupOfTrip } from "../server-api/userAPI";
import { getCategories } from "../server-api/categoryAPI";
import { postTransaction } from "../server-api/transactionAPI";
import { getExhangeRate } from "../server-api/currencyAPI";
import CategoryList from "./CategoryList";

const TransactionAdder = (props) => {
  //Transaction Owner
  const [tripID, setTripID] = useState(0);
  const [userID, setUserID] = useState(0);
  //Form Variables
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [date, setDate] = useState("");
  const [category_id, setCategoryID] = useState();
  const [mainPayerID, setMainPayerID] = useState(0);
  const [payers, setPayers] = useState([]);
  const [note, setNote] = useState("");
  //Lists for transaction options
  const [categories, setCategories] = useState([]);
  const [userList, setUserList] = useState([]);
  const [rates, setRates] = useState({});
  //Management Variables
  const [radioValue, setRadioValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState([]);
  //Currency Variables
  const [tripCode, setTripCode] = useState("");
  const [tripCurrency, setTripCurrency] = useState("");
  const [homeCode, setHomeCode] = useState("");
  //Mode Booleans
  const [collabMode, setCollabMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function setUser() {
      const user = props.user;
      const trip = props.trip;
      setUserID(user.user_id);
      setTripID(trip.trip_id);
      setHomeCode(user.country_code);
      setTripCode(trip.country_code);
      setTripCurrency(trip.currency);
      const allUsers = await getGroupOfTrip(trip.trip_id);
      if (allUsers.length > 1) {
        setUserList(allUsers);
        setCollabMode(true);
      }
    }

    if (props.user !== undefined && props.trip !== undefined) {
      setUser();
      updateCategories(props.trip.trip_id);
      updateRate();
    }
  }, [props.trip, props.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postTransaction({
      trip_id: tripID,
      name: name,
      amount: amount,
      category_id: category_id,
      transaction_date: date,
      description: note,
      user_id: `${collabMode ? mainPayerID : userID}`,
      payers: payers,
    });

    // reset radio & checkboxes
    setRadioValue("");
    setCheckboxValue([]);
    setMainPayerID(0);

    document.getElementById("new-transaction").reset();
    props.getSelectedTrip(tripID);
  };

  const updateCategories = async (trip_id) => {
    const res = await getCategories(trip_id);
    setCategories(res);
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

  const updateRate = async (date) => {
    const rate_list = await getExhangeRate(date);
    setRates(rate_list);
  };

  const showHomeCurrency = () => {
    const HomeCurrencyDisplay = (
      <HStack ml="10px">
        <Text fontSize="xs">{countryCurrencyCode(homeCode)}</Text>
        <Text fontSize="xs">{convert_currency()}</Text>
      </HStack>
    );
    return countryCurrencyCode(homeCode) !== countryCurrencyCode(tripCode)
      ? HomeCurrencyDisplay
      : "";
  };

  const validateAmountDecimal = (amount) => {
    const code = countryCurrencyCode(tripCode);
    const decimalLimit = getCurrencyDecimal(code);
    var regex = /^[0-9]*\.?[0-9]*$/;
    var result = amount;
    const decimalIndex = amount.indexOf(".");
    if (!regex.test(amount)) {
      result = amount.replace(/[^0-9.]/g, "");
    } else if (decimalIndex >= 0) {
      var totalIndex = amount.slice(decimalIndex).length - 1;
      if (decimalLimit === 0) {
        result = amount.slice(0, amount.length - 1);
      } else if (totalIndex > decimalLimit) {
        result = amount.slice(0, amount.length - 1);
      }
    }
    return result;
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="new-transaction"
      style={{ height: "100%" }}
    >
      {/* Item detail */}
      <Flex flexDir="column" h="100%">
        <FormControl isRequired mb="15px">
          <Input
            placeholder="Enter item details"
            size="md"
            onChange={(event) => setName(event.currentTarget.value)}
            maxLength={30}
          />
        </FormControl>

        {/* Amount */}
        <FormControl isRequired mb="15px">
          <InputGroup>
            <InputLeftElement children={tripCurrency} />
            <Input
              placeholder="Enter amount"
              size="md"
              min="0"
              type="text"
              pattern="[0-9]*[.]?[0-9]*"
              step="any"
              onInput={(event) => {
                event.currentTarget.value = validateAmountDecimal(
                  event.currentTarget.value
                );
              }}
              onChange={(event) => setAmount(event.currentTarget.value)}
            />
          </InputGroup>
          {showHomeCurrency()}
        </FormControl>

        {/* Transaction date */}
        <FormControl isRequired mb="15px">
          <HStack>
            <FormLabel>Date:</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              onChange={(event) => {
                setDate(event.currentTarget.value);
                updateRate(event.currentTarget.value.substring(0, 10));
              }}
            />
          </HStack>
        </FormControl>

        {/* Choose Category */}
        <Flex alignItems="center">
          <FormLabel>Choose Category:</FormLabel>
          <Spacer />
          <Text fontSize="sm" mr="5px" color="gray">
            Edit mode:
          </Text>
          <Switch
            id="edit-mode"
            colorScheme="orange"
            onChange={() => setEditMode(!editMode)}
          />
        </Flex>
        <FormControl isRequired mb="15px">
          <CategoryList
            categories={categories}
            setCategoryID={setCategoryID}
            updateCategories={updateCategories}
            tripID={tripID}
            editMode={editMode}
          />
        </FormControl>

        {/* Choose payer */}
        {collabMode && (
          <FormControl mb="15px">
            <Box>
              <FormLabel>Who paid? (Choose one) </FormLabel>
              <RadioGroup
                // value/user_id is converted to String and back to num
                // because Chakra does not accept value in number
                onChange={(event) => {
                  setRadioValue(event);
                  setMainPayerID(Number(event));
                  setCheckboxValue([]);
                }}
                value={radioValue}
                colorScheme="orange"
              >
                <Stack>
                  {userList.map((value) => {
                    return (
                      <Radio
                        isRequired
                        value={value.user_id.toString()}
                        key={value.user_id}
                      >
                        {value.name}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>

              <FormLabel mt="8px">
                Related members:{" "}
                <Tooltip label="Who else was part of this transaction?">
                  <span>
                    <Icon as={QuestionIcon} />
                  </span>
                </Tooltip>
              </FormLabel>
              <CheckboxGroup
                onChange={(event) => {
                  setCheckboxValue(event);
                  setPayers(event.map((value) => Number(value)));
                }}
                colorScheme="orange"
                value={checkboxValue}
              >
                <Stack>
                  {userList.map((value) => {
                    return (
                      <Checkbox
                        value={value.user_id.toString()}
                        isDisabled={value.user_id === mainPayerID}
                        key={value.user_id}
                      >
                        {value.name}
                      </Checkbox>
                    );
                  })}
                </Stack>
              </CheckboxGroup>
            </Box>
          </FormControl>
        )}

        <Spacer />
        {/* Notes */}
        <FormControl>
          <Box>
            <Text>Notes:</Text>
            <Textarea
              resize="none"
              onChange={(event) => setNote(event.currentTarget.value)}
            ></Textarea>
          </Box>
        </FormControl>

        <Flex flexDir="row" mt="30px">
          <Button
            bg="#DED3C2"
            color="#6F5530"
            border="1px"
            borderColor="rgba(0, 0, 0, 0.14)"
            _hover={{ bg: "#F8F3ED" }}
            type="submit"
            form="new-transaction"
          >
            Save
          </Button>
          <Spacer />
          <Button colorScheme="red" onClick={props.onCancel}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default TransactionAdder;
