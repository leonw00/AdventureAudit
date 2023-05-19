import { Box, useRadio, Icon, Tooltip } from "@chakra-ui/react";
import * as Icons from "../assets/Icons";

const Category = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const IconComponent = Icons[props.children];
  const canCheck = props.canCheck == null ? true : props.canCheck;

  return (
    <Tooltip
      label={props.categoryName}
      fontSize="xs"
      position="relative"
      top="-15px"
      bg="white"
      color="#6F5530"
    >
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderRadius="10px"
          _checked={
            canCheck && {
              borderWidth: "2px",
              borderColor: "#000000",
            }
          }
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="6px"
          w="50px"
          h="50px"
          bgColor={props.backgroundColor}
        >
          <Icon as={IconComponent} boxSize="30px" />
        </Box>
      </Box>
    </Tooltip>
  );
};

export default Category;
