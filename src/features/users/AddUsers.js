import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser, cleanUp, selectUser } from "./userSlice";
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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@chakra-ui/react";
import Loading from "./Loading";

function AddUsers() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { register, handleSubmit, errors } = useForm();
  const { isSuccess, isLoading, action } = useSelector(selectUser);
  const onSubmit = (data) => {
    dispatch(createUser(data));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (isSuccess && action === "create" && isOpen) {
      toast({
        title: "User create.",
        description: "We've created your user for you.",
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
        className="p-2 m-1 font-semibold text-blue-100 bg-blue-500 lg:rounded-lg hover:bg-blue-200 focus:outline-none"
      >
        Add User
        <FontAwesomeIcon className="ml-2" icon={faPlus} />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-blue-100 bg-blue-500">
            Add User
          </ModalHeader>
          <ModalCloseButton className="text-blue-100" />
          <ModalBody>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-3 mb-2">
                    <label>
                      Email <span className="text-red-500">*</span>:
                    </label>
                    <div className="col-span-2">
                      <input
                        className="w-full px-2 py-1 border-2 rounded-md"
                        name="email"
                        ref={register({
                          required: {
                            value: true,
                            message: "Email is Required",
                          },
                          maxLength: {
                            value: 30,
                            message: "Email should be less than 30 characters",
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Your Email"
                      />
                      <div>
                        {errors.email && (
                          <div className="text-red-500">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <label>
                      First Name <span className="text-red-500">*</span>:
                    </label>
                    <div className="col-span-2">
                      <input
                        className="w-full px-2 py-1 border-2 rounded-md"
                        name="first_name"
                        ref={register({
                          required: {
                            value: true,
                            message: "First Name is Required",
                          },
                        })}
                        placeholder="Your First Name"
                      />
                      {errors.name && (
                        <div className="text-red-500 ext-center">
                          {errors.first_name.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <label>
                      Last Name<span className="text-red-500">*</span>:
                    </label>
                    <div className="col-span-2">
                      <input
                        className="w-full px-2 py-1 border-2 rounded-md"
                        ref={register({
                          required: {
                            value: true,
                            message: "Last Name is Required",
                          },
                        })}
                        placeholder="Your Last Name"
                        name="last_name"
                      />
                      {errors.lastName && (
                        <div className="text-red-500">
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div></div>
                    <div className="flex justify-center col-span-2">
                      <input
                        type="submit"
                        className="px-2 py-1 font-semibold text-blue-100 bg-blue-500 rounded-md focus:outline-none hover:bg-blue-800"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUsers;
