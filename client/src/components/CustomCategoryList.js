import {
  useRadioGroup,
  useRadio,
  Wrap,
  WrapItem,
  Icon,
  Box,
} from "@chakra-ui/react";
import {
  FoodIcon,
  PlaneIcon,
  ActivityIcon,
  BedIcon,
  HospitalIcon,
  VegetableIcon,
  BusIcon,
  ShoppingCartIcon,
  BeachIcon,
  SightseeingIcon,
  TicketIcon,
  DrinkIcon,
  HeartIcon,
  CoffeeIcon,
  GasPumpIcon,
  PopcornIcon,
  ShoppingBagIcon,
} from "../assets/Icons";

const CustomCategoryList = (props) => {
  const categories = [
    {
      icon: FoodIcon,
      iconToString: "FoodIcon",
    },
    {
      icon: PlaneIcon,
      iconToString: "PlaneIcon",
    },
    {
      icon: ActivityIcon,
      iconToString: "ActivityIcon",
    },
    {
      icon: BedIcon,
      iconToString: "BedIcon",
    },
    {
      icon: HospitalIcon,
      iconToString: "HospitalIcon",
    },
    {
      icon: VegetableIcon,
      iconToString: "VegetableIcon",
    },
    {
      icon: BusIcon,
      iconToString: "BusIcon",
    },
    {
      icon: ShoppingCartIcon,
      iconToString: "ShoppingCartIcon",
    },
    {
      icon: BeachIcon,
      iconToString: "BeachIcon",
    },
    {
      icon: SightseeingIcon,
      iconToString: "SightseeingIcon",
    },
    {
      icon: TicketIcon,
      iconToString: "TicketIcon",
    },
    {
      icon: DrinkIcon,
      iconToString: "DrinkIcon",
    },
    {
      icon: HeartIcon,
      iconToString: "HeartIcon",
    },
    {
      icon: CoffeeIcon,
      iconToString: "CoffeeIcon",
    },
    {
      icon: GasPumpIcon,
      iconToString: "GasPumpIcon",
    },
    {
      icon: PopcornIcon,
      iconToString: "PopcornIcon",
    },
    {
      icon: ShoppingBagIcon,
      iconToString: "ShoppingBagIcon",
    },
  ];

  const handleChange = (value) => {
    props.setIcon(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: handleChange,
  });

  const Category = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderRadius="10px"
          _checked={{
            borderWidth: "2px",
            borderColor: "#000000",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          m="6px"
          w="40px"
          h="40px"
          bgColor="#FFF"
        >
          <Icon as={props.icon} boxSize={6} />
        </Box>
      </Box>
    );
  };

  return (
    <Wrap {...getRootProps()}>
      {categories.map((value) => {
        return (
          <WrapItem key={value.iconToString}>
            <Category
              key={value.iconToString}
              icon={value.icon}
              {...getRadioProps({ value: value.iconToString })}
            />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default CustomCategoryList;
