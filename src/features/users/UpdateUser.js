import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { cleanUp, selectUser, updateUser } from "./userSlice";
import Loading from "../users/Loading";
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
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@chakra-ui/react";

function UpdateUser({ user }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { register, handleSubmit, errors } = useForm({ defaultValues: user });
  const { isSuccess, isLoading, action } = useSelector(selectUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (data) => {
    data.avatar = user.avatar;
    dispatch(
      updateUser({
        id: user.id,
        data: data,
      })
    );
  };

  useEffect(() => {
    if (isSuccess && action === "update" && isOpen) {
      toast({
        title: "User update.",
        description: "We've updated your user for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }

    return () => {
      dispatch(cleanUp());
    };
  }, [isSuccess, action]);

  return (
    <>
      <button
        onClick={onOpen}
        className="mx-1 focus:outline-none hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-blue-100 bg-blue-500">
            Edit User
          </ModalHeader>
          <ModalCloseButton className="text-blue-100" />
          <ModalBody>
            {isLoading ? (
              <div>
                <Loading />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-3"
              >
                <div className="px-2">
                  <img
                    src={user.avatar}
                    className="w-full rounded-md shadow-2xl"
                  />
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-2 mb-2">
                    <label>
                      ID <span>:</span>
                    </label>
                    <div>{user.id}</div>
                  </div>
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
                        <div className="text-red-500 Text-center">
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
                </div>
                <div className="flex justify-center col-span-3 py-2">
                  <input
                    type="submit"
                    className="px-2 py-1 font-semibold text-blue-100 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none "
                  />
                </div>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateUser;
