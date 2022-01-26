import React from "react";
import SearchLine from "./SearchLine.jsx";
import UsersList from "./UsersList.jsx";
import "./app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
      activePage: 1,
      filterByRegistrationDate: 0,
      filterByRating: 0,
    };

    this.url = "https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users";
    this.filterUsers = this.filterUsers.bind(this);
    this.filterByRegistrationDate = this.filterByRegistrationDate.bind(this);
    this.filterByRating = this.filterByRating.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.closeModalWindow = this.closeModalWindow.bind(this);
    this.confirmDeleted = this.confirmDeleted.bind(this);
  }

  componentDidMount() {
    fetch(this.url)
      .then((response) => response.json())
      .then((commits) =>
        this.setState({
          ...this.state,
          usersList: [...commits],
          initialState: [...commits],
        })
      );
  }

  getNumberOfPages() {
    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(this.state.usersList.length / 5); i++) {
      numberOfPages.push(
        <div
          key={i}
          onClick={(e) =>
            this.setState({
              ...this.state,
              activePage: Number(e.target.innerText),
            })
          }
          className="pagination__number"
        >
          {i}
        </div>
      );
    }
    Math.ceil(this.state.usersList.length / 5);

    return numberOfPages;
  }

  //Поиск по e-mail/username
  filterUsers(data) {
    const newUsersList = this.state.initialState.filter((user) => {
      return user.username.toLowerCase().indexOf(data.toLowerCase()) + 1 ||
        user.email.toLowerCase().indexOf(data.toLowerCase()) + 1
        ? user
        : false;
    });

    if (data == "") {
      this.setState({
        ...this.state,
        usersList: [...this.state.initialState],
      });
    } else {
      this.setState({
        ...this.state,
        usersList: newUsersList,
      });
    }
  }

  //Фильтр по дате регистрации
  filterByRegistrationDate() {
    if (this.state.filterByRegistrationDate != 1) {
      this.setState({
        ...this.state,
        usersList: this.state.usersList.sort((a, b) => {
          return a.registration_date < b.registration_date ? 1 : -1;
        }),
      });
      this.setState({
        ...this.state,
        filterByRegistrationDate: 1,
      });
    } else {
      this.setState({
        ...this.state,
        usersList: this.state.usersList.sort((a, b) => {
          return a.registration_date > b.registration_date ? 1 : -1;
        }),
      });
      this.setState({
        ...this.state,
        filterByRegistrationDate: -1,
      });
    }
  }

  //Фильтр по рейтиингу
  filterByRating() {
    if (this.state.filterByRating != 1) {
      this.setState({
        ...this.state,
        usersList: this.state.usersList.sort((a, b) => {
          return a.rating < b.rating ? 1 : -1;
        }),
      });
      this.setState({
        ...this.state,
        filterByRating: 1,
      });
    } else {
      this.setState({
        ...this.state,
        usersList: this.state.usersList.sort((a, b) => {
          return a.rating > b.rating ? 1 : -1;
        }),
      });
      this.setState({
        ...this.state,
        filterByRating: -1,
      });
    }
  }

  //Сброс фильтра
  resetFilters() {
    this.setState({
      ...this.state,
      usersList: [...this.state.initialState],
      filterByRegistrationDate: 0,
      filterByRating: 0,
    });
  }

  //Удаление пользователя
  deleteUser(target) {
    let modalWindow = document.querySelector(".modal");
    modalWindow.style.display = "block";
    this.deletedTarget = target;
  }

  closeModalWindow(target) {
    target.closest(".modal").style.display = "none";
  }

  confirmDeleted(target) {
    target.innerText.toLowerCase() === "нет"
      ? this.closeModalWindow(target)
      : this.setState({
          ...this.state,
          usersList: this.state.usersList.filter(
            (elem) => elem.username != this.deletedTarget.children[0].textContent
          ),
          initialState: this.state.initialState.filter(
            (elem) => elem.username != this.deletedTarget.children[0].textContent
          ),
        });
    target.closest(".modal").style.display = "none";
  }

  render() {
    return (
      <div className="wrapper__body">
        <div id="my_modal" className="modal">
          <div className="modal__content">
            <span
              onClick={(e) => this.closeModalWindow(e.target)}
              className="close__modal_window"
            >
              ×
            </span>
            <p>Вы уверены, что хотите удалить пользователя?</p>
            <div className="modal__btns">
              <button
                onClick={(e) => this.confirmDeleted(e.target)}
                className="modal__btn"
              >
                Да
              </button>
              <button
                onClick={(e) => this.confirmDeleted(e.target)}
                className="modal__btn"
              >
                Нет
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <SearchLine
            filterByRating={this.state.filterByRating}
            filterByRegistrationDate={this.state.filterByRegistrationDate}
            resetFilters={this.resetFilters}
            filterUsers={this.filterUsers}
          />
          <div className="sortList">
            <span>Сотрировка:</span>
            <span
              className="sort__date"
              onClick={() => this.filterByRegistrationDate()}
            >
              Дата регистрации
            </span>
            <span
              className="sort__rating"
              onClick={() => this.filterByRating()}
            >
              Рейтинг
            </span>
          </div>
          <UsersList
            deleteUser={this.deleteUser}
            users={this.state.usersList.slice(
              (this.state.activePage - 1) * 5,
              (this.state.activePage - 1) * 5 + 5
            )}
          />
          <div className="pagination__wrapper">
            <div className="pagination">{this.getNumberOfPages()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
