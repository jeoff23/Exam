import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, selectUser, cleanUp } from "./userSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@chakra-ui/react";
import Loading from "./Loading";

function DeleteUser({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSuccess, isLoading, action } = useSelector(selectUser);
  const toast = useToast();
  const dispatch = useDispatch();
  const onDelete = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (isSuccess && action === "delete" && isOpen) {
      toast({
        title: "User delete.",
        description: "We've deleted your user for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }
    return () => {
      dispatch(cleanUp());
    };
  }, [isSuccess, action, isOpen]);

  return (
    <>
      <button
        onClick={onOpen}
        className="mx-1 focus:outline-none hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {user && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-blue-100 bg-blue-500">
              Delete User
            </ModalHeader>
            <ModalCloseButton className="text-blue-100" />
            <ModalBody>
              {isLoading ? (
                <Loading />
              ) : (
                <div>
                  <div className="grid grid-cols-3">
                    <div className="px-2">
                      <img src={user.avatar} className="w-full rounded-md" />
                    </div>
                    <div className="col-span-2">
                      <div className="grid grid-cols-3 mb-2">
                        <label>ID :</label>
                        <div className="col-span-2">{user.id}</div>
                      </div>
                      <div className="grid grid-cols-3 mb-2">
                        <label>Email :</label>
                        <div className="col-span-2">{user.email}</div>
                      </div>
                      <div className="grid grid-cols-3 mb-2">
                        <label>First Name:</label>
                        <div className="col-span-2">{user.first_name}</div>
                      </div>
                      <div className="grid grid-cols-3 mb-2">
                        <label>Last Name:</label>
                        <div className="col-span-2">{user.last_name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end col-span-3 w-ful bg-geen-400">
                    <button
                      onClick={() => onDelete(user.id)}
                      className="px-4 py-1 my-2 text-blue-100 bg-blue-500 rounded-lg focus:outline-none hover:bg-blue-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default DeleteUser;
