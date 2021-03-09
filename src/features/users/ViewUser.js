import React from "react";
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
import { faEye } from "@fortawesome/free-solid-svg-icons";

function ViewUser({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="mx-1 focus:outline-none hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faEye} />
      </button>
      {user && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-blue-100 bg-blue-500 shadow-lg">
              View User
            </ModalHeader>
            <ModalCloseButton className="text-blue-100" />
            <ModalBody>
              <form className="grid grid-cols-3 font-sans text-gray-600">
                <div className="px-2">
                  <img
                    src={user.avatar}
                    className="w-full rounded-md shadow-2xl"
                  />
                </div>
                <div className="col-span-2 font-semibold">
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
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ViewUser;
