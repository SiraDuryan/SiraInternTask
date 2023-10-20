import { useEffect, useState } from "react";

import Validator from "../../platform/validation";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../platform/routes";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./style.scss";

function ModifyUser() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);

  let existingUsers = JSON.parse(localStorage.getItem("userList")) || [];

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    id: existingUsers.length + 1,
  });

  const change = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (id) {
      const userToEdit = existingUsers.find((item) => item.id == id);
      setUser(userToEdit);
    }
    if (!localStorage.getItem("userList")) {
      localStorage.setItem("userList", "[]");
    }
  }, []);

  const submit = () => {
    if (
       Validator.isEmailValid(user.email) &&
      Validator.isPhoneValid(user.phone)
    ) {
      if (id) {
        const userIndex = existingUsers.findIndex((item) => item.id == id);
        existingUsers[userIndex] = user;
      } else {
        existingUsers.push(user);
      }
      localStorage.setItem("userList", JSON.stringify(existingUsers));
      navigate(ROUTES.USERS);
    } else {
      if (!Validator.isEmailValid(user.email)) {
        NotificationManager.error("Invalid Email Format");
      }
      if (!Validator.isPhoneValid(user.phone)) {
        NotificationManager.error("Invalid Phone Number Format");
      }
    }
  };

  return (
    <div className="P-modify-user">
      <div className="P-modify-block">
        <input
          type="text"
          value={user?.firstName}
          name="firstName"
          onChange={change}
          placeholder="First Name"
          className="G-input"
        />
        <input
          type="text"
          value={user?.lastName}
          name="lastName"
          onChange={change}
          placeholder="Last Name"
          className="G-input"
        />
        <input
          type="text"
          value={user?.username}
          name="username"
          onChange={change}
          placeholder="Username"
          className="G-input"
        />
        <input
          type="text"
          value={user?.email}
          name="email"
          onChange={change}
          placeholder="Email    (example@mail.com)"
          className="G-input"
        />
        <input
          type="password"
          value={user?.password}
          name="password"
          onChange={change}
          placeholder="Password"
          className="G-input"
        />
        <input
          type="text"
          value={user?.phone}
          name="phone"
          onChange={change}
          placeholder="Phone Number"
          className="G-input"
        />
        <button onClick={submit} className="G-btn">
          Submit
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default ModifyUser;
