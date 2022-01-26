import React, { useState } from "react";
import "./searchLine.scss";

function SearchLine(props) {
  let [valueInput, toggleValue] = useState("");
  return (
    <>
      <h1>Список пользователей</h1>
      <form className="searchForm">
        <input
          onChange={(e) => {
            props.filterUsers(e.target.value);
            toggleValue(e.target.value);
          }}
          type="text"
          className="searchForm__input"
          placeholder="Поиск по имени или e-mail"
          value={valueInput}
        ></input>
        <br />
        {props.filterByRating === 0 &&
        props.filterByRegistrationDate === 0 &&
        valueInput == "" ? null : (
          <span
            onClick={() => {
              props.resetFilters();
              toggleValue("");
            }}
            className="searchForm__text"
          >
            Очистить фильтр
          </span>
        )}
      </form>
    </>
  );
}

export default SearchLine;
