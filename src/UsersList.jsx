import React from "react";
import ListItem from "./ListItem.jsx";
import "./usersList.scss";

function UsersList(props) {
  return (
    <>
      <div className="usersList">
        <ul className="usersList__items">
          <div className="usersList__wrapper">
            <li className="usersList__header">
              <span className="usersList__header-column">Имя пользователя</span>
              <span className="usersList__header-column">E-mail</span>
              <span className="usersList__header-column">Дата регистрации</span>
              <span className="usersList__header-column">Рейтинг</span>
              <span className="usersList__header-column"></span>
            </li>
          </div>
          {props.users.map((user, index) => (
            <ListItem key={index} user={user} deleteUser={props.deleteUser} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default UsersList;
