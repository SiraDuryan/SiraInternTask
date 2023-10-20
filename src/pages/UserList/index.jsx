import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../platform/routes";
import "./style.scss";
import Delete from "../../assets/images/delete.png"

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
});
  useEffect(
    () => setUsers(JSON.parse(localStorage.getItem("userList")) || []),
    []
  );

  const navigateToModify = (id) => {
    navigate(ROUTES.MODIFYUSER.replace(":id", id));
  };

  const deleteUser = (e, id) => {
    e.stopPropagation();
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("userList", JSON.stringify(updatedUsers));
  };

  return (
    <div className="P-user-list">
      <div className="P-header">
        <input
          type="text"
          className="G-input"
          placeholder="Search for User..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={ROUTES.MODIFYUSER.replace(":id", "")} className="G-btn">
          Add User
        </Link>
      </div>
      <table className="P-user-table">
        <thead> 
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((item, index) => (
            <tr key={index} onClick={() => navigateToModify(item.id)}>
              <td>
                {index + 1}.  
                &nbsp; {item.firstName}
              </td>
              <td>{item.lastName}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.phone}</td>
              <td
                className="P-delete-btn"
                onClick={(e) => deleteUser(e, item.id)}
              >
                <img src={Delete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
