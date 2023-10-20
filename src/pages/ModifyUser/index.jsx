import { useEffect, useState, useMemo } from "react";
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

  const existingUsers = useMemo(() => {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    return userList;
  }, []);

  const userToEdit = existingUsers.find((item) => item.id === Number(id));

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    id: userToEdit ? userToEdit.id : existingUsers.length + 1,
  });

  useEffect(() => {
    if (!localStorage.getItem("userList")) {
      localStorage.setItem("userList", "[]");
    }
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);
  
  const isUserWithSamePhoneExists = (newUser) => {
    return existingUsers.some(
      (existingUser) => existingUser.phone === newUser.phone
    );
  };

  const isUserWithSameEmailExists = (newUser) => {
    return existingUsers.some(
      (existingUser) => existingUser.email === newUser.email
    );
  };

  const change = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const submit = () => {
    const isPhoneExists = isUserWithSamePhoneExists(user);
    const isEmailExists = isUserWithSameEmailExists(user);

    if (
      Validator.isEmailValid(user.email) &&
      Validator.isPhoneValid(user.phone)
    ) {
      if (isPhoneExists && isEmailExists) {
        NotificationManager.error(
          "User with the same phone number and email already exists."
        );
      } else if (isPhoneExists) {
        NotificationManager.error(
          "User with the same phone number already exists."
        );
      } else if (isEmailExists) {
        NotificationManager.error("User with the same email already exists.");
      } else {
        if (userToEdit) {
          const updatedUsers = existingUsers.map((item) =>
            item.id === userToEdit.id ? user : item
          );
          localStorage.setItem("userList", JSON.stringify(updatedUsers));
        } else {
          const updatedUsers = [...existingUsers, user];
          localStorage.setItem("userList", JSON.stringify(updatedUsers));
        }
        navigate(ROUTES.USERS);
      }
    } else if (!Validator.isEmailValid(user.email)) {
      NotificationManager.error("Invalid Email Format (example@mail.com)");
    } else if (!Validator.isPhoneValid(user.phone)) {
      NotificationManager.error(
        "Invalid Phone Number Format. Phone Number can contain only numbers and +"
      );
    }
  };

  return (
    <div className="P-modify-user">
      <div className="P-modify-block">
        <input
          type="text"
          value={user.firstName}
          name="firstName"
          onChange={change}
          placeholder="First Name"
          className="G-input"
        />
        <input
          type="text"
          value={user.lastName}
          name="lastName"
          onChange={change}
          placeholder="Last Name"
          className="G-input"
        />
        <input
          type="text"
          value={user.username}
          name="username"
          onChange={change}
          placeholder="Username"
          className="G-input"
        />
        <input
          type="text"
          value={user.email}
          name="email"
          onChange={change}
          placeholder="Email (example@mail.com)"
          className="G-input"
        />
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={change}
          placeholder="Password"
          className="G-input"
        />
        <input
          type="text"
          value={user.phone}
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
