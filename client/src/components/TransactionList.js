import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Transactions from "./Transactions";

const TransactionList = (props) => {
  const [listOfTransactions, setTransactionList] = useState(<Box />);
  useEffect(() => {
    async function updateTransactionList() {
      let listBuilder;
      //Removes duplicate date headers
      if (
        props.transactionsOfTrip instanceof Array &&
        props.transactionsOfTrip.length > 0
      ) {
        let dateList = [];
        let currentDate = props.transactionsOfTrip[0].transaction_date;
        dateList.push(currentDate);
        for (let i = 1; i < props.transactionsOfTrip.length; i++) {
          if (currentDate === props.transactionsOfTrip[i].transaction_date) {
            props.transactionsOfTrip[i].transaction_date = "";
          } else {
            currentDate = props.transactionsOfTrip[i].transaction_date;
          }
          dateList.push(currentDate);
        }
        //Maps the transactions to the Tranactions component
        listBuilder = props.transactionsOfTrip.map((item, index) => {
          return (
            <Transactions
              key={item.transaction_id}
              country_code={props.countryCode}
              transaction_id={item.transaction_id}
              date={item.transaction_date}
              time={item.transaction_time}
              detail_date={dateList[index]}
              title={item.name}
              amount={item.amount}
              colour={item.category_colour}
              icon={item.category_icon}
              cat_name={item.category_name}
              description={item.description}
              payers={item.payers}
              currency={props.currency}
              setSelectedTransaction={props.setSelectedTransaction}
            />
          );
        });
      }
      setTransactionList(listBuilder);
    }
    updateTransactionList();
  }, [
    props.transactionsOfTrip,
    props.currency,
    props.setSelectedTransaction,
    props.countryCode,
  ]);

  return (
    <Box mt="10px">
      <HStack h="32px" bg="#FBF8F5" borderRadius="5px">
        <Text w="65px" ml="10px" fontSize="sm">
          Category
        </Text>

        <Text w="200px" fontSize="sm">
          Detail
        </Text>

        <Text w="130px" fontSize="sm">
          Amount
        </Text>

        <Text fontSize="sm">Payers</Text>
      </HStack>

      <Flex flexDir="column">{listOfTransactions}</Flex>
    </Box>
  );
};

export default TransactionList;
