import React from "react";
import "./listItem.scss";

function ListItem(props) {
  const getDate = (ms) => {
    let date = new Date(ms);
    const arrFullTime = [
      "0" + date.getDate(),
      "0" + (date.getMonth() + 1),
      "" + date.getFullYear(),
    ]
      .map((element) => {
        if (element.length === 4) return element;
        return element.slice(-2);
      })
      .join(".");
    return arrFullTime;
  };

  return (
    <li className="listItem">
      <span className="listItem__column">{props.user.username}</span>
      <span className="listItem__column">{props.user.email}</span>
      <span className="listItem__column">
        {getDate(Date.parse(props.user.registration_date))}
      </span>
      <span className="listItem__column">{props.user.rating}</span>
      <span
        onClick={(e) => props.deleteUser(e.target.closest(".listItem"))}
        className="listItem__remove"
      >
        +
      </span>
    </li>
  );
}

export default ListItem;
