import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, selectUser } from "./userSlice";
import UpdateUser from "./UpdateUser";
import ViewUser from "./ViewUser";
import DeleteUser from "./DeleteUser";
import AddUsers from "./AddUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Users() {
  const dispatch = useDispatch();
  const { usersList } = useSelector(selectUser);
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const maxNumPerPage = 10;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    const from = currentPage > 1 ? (currentPage - 1) * maxNumPerPage : 0;
    const to = currentPage * maxNumPerPage;
    setUsers(usersList.data.slice(from, to));
  }, [currentPage, usersList.data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [usersList.data]);

  const computePage = () => {
    return Math.trunc(
      usersList.data.length % maxNumPerPage === 0
        ? usersList.data.length / maxNumPerPage
        : usersList.data.length / maxNumPerPage + 1
    );
  };
  const setPage = (value) => {
    if (currentPage + value > 0 && currentPage + value <= computePage()) {
      setCurrentPage(currentPage + value);
    }
  };
  const Pagination = () => {
    let pagination = [];
    if (maxNumPerPage < usersList.data.length) {
      for (let i = 1; i <= computePage(); i++) {
        pagination.push(
          <button
            className="px-2 py-1 mx-1"
            onClick={() => {
              setCurrentPage(i);
            }}
            key={`button-${i}`}
          >
            {i}
          </button>
        );
      }
      return (
        <div>
          <button onClick={() => setPage(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Prev
          </button>
          {pagination}
          <button onClick={() => setPage(1)}>
            Next <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full pt-1 bg-white lg:p-4 lg:h-full">
      <div className="flex justify-end mb-2 lg:mb-2">
        <AddUsers />
      </div>
      <div className="border-2 rounded-md shadow-2xl">
        <div className="flex justify-between py-2 font-bold text-center text-gray-700 border-b lg:grid lg:grid-cols-6">
          <div>ID</div>
          <div className="hidden lg:block">Avatar</div>
          <div>Email</div>
          <div className="hidden lg:block">First Name</div>
          <div className="hidden lg:block">Last Name</div>
          <div className="w-24">Actions</div>
        </div>
        {users &&
          users.map((user) => {
            const { id, avatar, email, first_name, last_name } = user;
            return (
              <div
                className="flex justify-around py-2 pt-2 text-sm text-center border-b-2 lg:grid-cols-6 lg:grid"
                key={id}
              >
                <div className="flex items-center justify-center ">{id}</div>
                <div className="flex items-center justify-center ">
                  <img
                    src={avatar}
                    className="hidden w-12 h-12 rounded-full lg:block"
                  />
                </div>
                <div className="flex w-48 mx-4 lg:mt-4">
                  <div>{email}</div>
                </div>
                <div className="flex items-center justify-center hidden lg:block lg:mt-4">
                  {first_name}
                </div>
                <div className="flex items-center justify-center hidden lg:block lg:mt-4">
                  {last_name}
                </div>
                <div className="flex items-center pr-2 text-blue-500 lg:justify-center">
                  <ViewUser user={user} />
                  <UpdateUser user={user} />
                  <DeleteUser user={user} />
                </div>
              </div>
            );
          })}
        <div className="text-sm text-center text-blue-600">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default Users;
