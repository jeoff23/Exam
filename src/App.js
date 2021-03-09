import React, { useState } from "react";
import Home from "./features/home/Home";
import { NavLink, Route, Switch } from "react-router-dom";
import Users from "./features/users/Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faColumns, faUser } from "@fortawesome/free-solid-svg-icons";
import { HashLink } from "react-router-hash-link";

function App() {
  const activeClass = () => {
    return "bg-blue-700 text-white block rounded-sm ";
  };

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    console.log(open);
    setOpen(!open);
  };

  const Nav = () => (
    <ul className="p-4">
      <li>
        <NavLink
          exact
          to="/"
          activeClassName={activeClass()}
          className="flex items-center justify-center py-2 text-lg bg-blue-400 rounded-lg"
        >
          <FontAwesomeIcon icon={faColumns} className="m-2" />
          Dashboard
        </NavLink>
      </li>
      <li className="mt-4">
        <NavLink
          className="flex items-center justify-center py-2 text-lg bg-blue-400 rounded-lg"
          to="/users"
          activeClassName={activeClass()}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          User
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div className="bg-blue-500 shadow-lg lg:flex ">
      <div className="mb-2 font-semibold text-right text-blue-100 lg:text-center lg:w-64">
        <div className="hidden md:block">
          <Nav />
        </div>
        <div className="block border-b-2 md:hidden ">
          <button
            onClick={() => toggleOpen()}
            className="md:hidden focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="m-2 text-4xl" />
          </button>
          <div className={open ? " block" : " hidden"}>
            <Nav />
          </div>
        </div>
      </div>
      <div className="flex flex-1 min-h-screen shadow-xl lg:items-center ">
        <Switch>
          <Route component={Users} path="/users" />
          <Route component={Home} path="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
