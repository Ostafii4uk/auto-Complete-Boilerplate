import React, { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./API/users.js";

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [activeInput, setActiveInput] = useState(query);
  const [counter, setCounter] = useState(-1);

  useEffect(() => {
    getUsers()
      .then(loadedUsers => setUsers(loadedUsers));
  }, [])

  const filterUsers = (users) => (
    users.filter(user => {
      const userNameLowerCase = user.name.toLowerCase();
      const queryLowerCase = query.toLowerCase();

      return userNameLowerCase.includes(queryLowerCase);
    })
  );

  const filteredUsers = filterUsers(users);


  const handleClick = (e) => {
    if (query === '') {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        setCounter((prev) => counter < filteredUsers.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        setCounter((prev) => counter > -1  ? prev - 1 : prev);
        break;
      case 'Enter':
        setQuery(filteredUsers[counter].name);
        setActiveInput(false);
        break;
      default:
        return;
    }
  } 

  return (
    <div className="wrapper">
      <div className="users__serch">
        <input
          className="users__input"
          type="text"
          placeholder="type name"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveInput(event.target.value)
            setCounter(-1)
          }}
          onKeyUp={(event) => {
            handleClick(event)
          }}
        ></input>
        {activeInput
          &&
          <ul className="users__list">
            {filteredUsers.map(person => {
              if (counter === filteredUsers.indexOf(person)) {
                return (
                  <li
                    className="users__item-active"
                    key={person.id}
                    onClick={() => {
                      setQuery(person.name)
                      setActiveInput(false)
                    }}
                  >
                    {person.name}
                  </li>
                )
              } else {
                return (
                  <li
                    className="users__item"
                    key={person.id}
                    onClick={() => {
                      setQuery(person.name)
                      setActiveInput(false)
                    }}
                  >
                    {person.name}
                  </li>
                )}
              
            })}
          </ul>
        }
      </div>
        
    </div>
  );
}

export default App;
