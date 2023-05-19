import { Button, Flex, Text } from "@chakra-ui/react";

const Trip = (props) => {
  const updateTrip = () => {
    props.getSelectedTrip(props.tripID);
  };

  return (
    <Button
      size="lg"
      w="100%"
      h="auto"
      bg="#F8F3ED"
      border="1px"
      borderColor="rgba(0, 0, 0, 0.14)"
      _hover={{ bg: "#FFFFFF" }}
      onClick={updateTrip}
      whiteSpace="normal"
      blockSize="auto"
    >
      <Flex flexDir="column" p="5px">
        <Text fontSize="20px">{props.title}</Text>
        <Text fontSize="12px" color="#525252">
          {`${props.startDate} - ${props.endDate}`}
        </Text>
      </Flex>
    </Button>
  );
};

export default Trip;
