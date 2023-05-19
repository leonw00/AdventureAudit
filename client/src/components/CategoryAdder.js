import {
  Input,
  Text,
  Button,
  Flex,
  Spacer,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import { SliderPicker } from "react-color";
import { postCategory } from "../server-api/categoryAPI";
import CustomCategoryList from "./CustomCategoryList";

const CategoryAdder = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [colour, setColour] = useState("#FFF");
  const [icon, setIcon] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    postCategory({
      trip_id: props.tripID,
      name: categoryName,
      colour: colour,
      icon: icon,
    });
    document.getElementById("new-category").reset();
  };

  return (
    <>
      <Text fontSize="25px" fontWeight="bold">
        Custom Category
      </Text>

      <form onSubmit={handleSubmit} id="new-category">
        <Flex flexDir="column" h="100%" mt="20px">
          <FormControl isRequired mb="15px">
            <Input
              placeholder="Enter new category name"
              size="md"
              borderBottom="1px"
              borderColor="#B3A591"
              onChange={(event) => setCategoryName(event.currentTarget.value)}
              maxLength={12}
            />
          </FormControl>

          <FormControl isRequired mb="15px">
            <FormLabel>Select Icon:</FormLabel>
            <CustomCategoryList setIcon={setIcon} />
          </FormControl>

          <FormControl mb="15px">
            <FormLabel>Select Color:</FormLabel>
            <SliderPicker
              color={colour}
              onChangeComplete={(colour) => setColour(colour.hex)}
              w="100%"
            />
          </FormControl>

          <Spacer />
          <Flex ml="auto">
            <Button
              bg="#DED3C2"
              color="#6F5530"
              border="1px"
              borderColor="rgba(0, 0, 0, 0.14)"
              _hover={{ bg: "#F8F3ED" }}
              form="new-category"
              type="submit"
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default CategoryAdder;
