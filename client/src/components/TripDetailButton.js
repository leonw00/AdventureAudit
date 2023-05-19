import { Button, Icon, Tooltip } from "@chakra-ui/react";
import * as Icons from "../assets/Icons";

const TripDetailButton = (props) => {
  const IconComponent = Icons[props.icon];

  return (
    <Button
      w="50px"
      h="50px"
      bg="#F8F3ED"
      _hover={{ bg: "#B3A591" }}
      border="1px"
      borderColor="rgba(0, 0, 0, 0.14)"
      onClick={props.onClick}
    >
      <Tooltip label={props.toolTip}>
        <span>
          <Icon as={IconComponent} boxSize={6} />
        </span>
      </Tooltip>
    </Button>
  );
};

export default TripDetailButton;
