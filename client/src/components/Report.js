import { Text, Box, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import * as Icons from "../assets/Icons";
import TopTransactions from "./TopTransactions";
import PaymentSummary from "./PaymentSummary";
import { countryCurrencyCode, setCurrencyDecimal } from "../utils/currencyConversion";

const Report = (props) => {
  // for pie chart ui
  const [expense, setExpense] = useState(<Box />);
  const [currency, setCurrency] = useState("");
  const lineWidth = 60;

  const expensePerCategory = props.data.expense_per_category;
  const topTransactions = props.data.top_five_transactions;
  const debtRelationship = props.data.debt_relationship;
  const transactionExists = topTransactions.length > 0;
  const debtRelationshipExists = debtRelationship.length > 0;

  const transformDecimal = (amount) => {
    const code = countryCurrencyCode(props.trip.country_code);
    const converted = setCurrencyDecimal(amount, code);
    return isNaN(converted) ? amount : converted;
  };

  // react-minimal-pie-chart requires data structure to be
  // [{title: "", value: num, color: "", key: "" | num}]
  const pieChartData = expensePerCategory.map((value) => ({
    title: value.name,
    value: Number(transformDecimal(value.amount)),
    color: value.colour,
    icon: value.icon,
    key: `${value.name},${value.icon}`,
  }));

  const topTransactionsData = transactionExists ? (
    topTransactions.map((value) => (
      <TopTransactions
        key={value.transaction_id}
        title={value.transaction_name}
        amount={transformDecimal(value.amount)}
        colour={value.colour}
        icon={value.icon}
        currency={currency}
      />
    ))
  ) : (
    <Text fontSize="10px">No transactions yet!</Text>
  );

  const paymentSummary = debtRelationshipExists ? (
    debtRelationship.map((value) => (
      <PaymentSummary
        currency={currency}
        member={value.name}
        amount={Math.abs(transformDecimal(value.amount))}
        icon={value.amount < 0 ? "RightArrowIcon" : "LeftArrowIcon"}
        key={value.name}
      />
    ))
  ) : (
    <Text fontSize="10px">There is no debt relationship for this trip!</Text>
  );

  useEffect(() => {
    if (props.trip !== undefined) {
      setCurrency(props.trip.currency);
    }
  }, [props.trip]);

  const displayExpense = (index) => {
    const IconComponent = Icons[pieChartData[index].icon];
    const colour = pieChartData[index].color;

    setExpense(
      <Text fontSize="18px" fontWeight="bold">
        <Icon as={IconComponent} boxSize={6} color={colour} />
        <br /> {currency}
        {pieChartData[index].value}
      </Text>
    );
  };

  return (
    <>
      <Text fontSize={25} fontWeight="bold">
        Report
      </Text>

      <Text fontSize={10} mb={2}>
        Click on the chart see total expense for each category!
      </Text>

      <PieChart
        style={{
          fontSize: "4px",
          fontWeight: "bold",
          height: "300px",
        }}
        data={pieChartData}
        radius={pieChartDefaultProps.radius}
        lineWidth={lineWidth}
        segmentsStyle={{ cursor: "pointer" }}
        background="#E8E8E8"
        // Only shows the label that has enough room
        // User can still click on them to see the expenses in the middle of the pie chart
        label={({ dataEntry }) =>
          Math.round(dataEntry.percentage) >= 5 ? dataEntry.title : ""
        }
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: "#FFF",
          pointerEvents: "auto",
        }}
        onClick={(_, index) => {
          displayExpense(index);
        }}
      />

      {/* Category icon and total amount in the middle of the pie chart */}
      <Box
        textAlign="center"
        position="relative"
        top="-178px"
        h="0"
        zIndex={-1}
      >
        {expense}
      </Box>

      <Text fontSize="20px" fontWeight="bold" mt="30px">
        Top 5 Transactions
      </Text>
      <Box>{topTransactionsData}</Box>

      <Text fontSize="20px" fontWeight="bold" mt="30px">
        Payment Summary
      </Text>
      <Box>{paymentSummary}</Box>
    </>
  );
};

export default Report;
