import {
  useRadioGroup,
  Wrap,
  WrapItem,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { deleteCategory } from "../server-api/categoryAPI";
import Category from "./Category";

const CategoryList = (props) => {
  const categories = props.categories;
  const tripID = props.tripID;
  const [idToDelete, setIDToDelete] = useState();
  const [nameToDelete, setNameToDelete] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleChange = (value) => {
    props.setCategoryID(value);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: handleChange,
  });

  async function deleteThisCategory() {
    await deleteCategory(idToDelete);
    props.updateCategories(tripID);
  }

  return (
    <Wrap>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody mt="12px" fontWeight="bold" textAlign="center">
              Delete this category: {nameToDelete}?
              <Text fontWeight="normal" mt="12px" textAlign="left">
                You will not have a category assigned to all related
                transactions with this category. This process cannot be undone.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteThisCategory();
                  onClose();
                }}
                ml="15px"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Wrap {...getRootProps()}>
        {categories.map((value) => {
          return (
            <WrapItem w="66px" key={value.category_id}>
              <Category
                key={value.category_id}
                {...getRadioProps({ value: value.category_id.toString() })}
                backgroundColor={value.colour}
                categoryName={value.name}
              >
                {value.icon}
              </Category>

              {props.editMode && (
                <Button
                  colorScheme="red"
                  borderRadius="100%"
                  size="xs"
                  position="relative"
                  left="-20px"
                  onClick={() => {
                    onOpen();
                    setIDToDelete(value.category_id);
                    setNameToDelete(value.name);
                  }}
                >
                  X
                </Button>
              )}
            </WrapItem>
          );
        })}
      </Wrap>
    </Wrap>
  );
};

export default CategoryList;
