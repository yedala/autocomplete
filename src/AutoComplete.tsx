import { useEffect, useState, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import HighLight from "./HighLight";

export default function AutoComplete() {
  const [allUsers, setAllUsers] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [search, setSearch] = useState("");
  const inputref = useRef(null);
  useEffect(() => {
    fetchUsers();
    window.addEventListener("keydown", handleKeyBoard);
    return () => {
      window.removeEventListener("keydown", handleKeyBoard);
    };
  }, []);
  const fetchUsers = async () => {
    const response = await fetch(`https://dummyjson.com/users`);
    const data = await response.json();
    setAllUsers(data.users);
    setSuggest(data.users);
  };
  const handleKeyBoard = (e) => {
    if (e.key == "Backspace" && document.activeElement != inputref.current) {
      setSelectedUsers((prev) => prev.slice(0, -1));
    }
  };
  const handleInput = (val) => {
    setSearch(val);
    let users = allUsers;
    let newUsers = users.filter((u) => {
      let fname = u.firstName.toLowerCase();
      let lname = u.lastName.toLowerCase();
      let fullname = fname + lname;
      return (
        fname.includes(val.toLowerCase()) ||
        lname.includes(val.toLowerCase()) ||
        fullname.includes(val.toLowerCase())
      );
    });
    setSuggest(newUsers);
  };
  const handleClick = (user) => {
    setSelectedUsers([...selectedUsers, user]);
  };
  const handleClose = (user) => {
    let users = selectedUsers;
    let newUsers = users.filter((u) => {
      return u.id != user.id;
    });
    setSelectedUsers(newUsers);
  };

  return (
    <div className="parent">
      <div className="selected">
        {selectedUsers.map((user) => {
          return (
            <div className="selectedUser">
              {user.firstName + " " + user.lastName}
              <span>
                <IoCloseSharp
                  className="close"
                  onClick={() => handleClose(user)}
                />
              </span>
            </div>
          );
        })}
      </div>
      <div className="search">
        <input
          className="text"
          type="text"
          ref={inputref}
          placeholder="search User"
          onChange={(e) => handleInput(e.target.value)}
        />
        <div className="users">
          {suggest.map((user) => {
            return (
              <div className="user" onClick={() => handleClick(user)}>
                <img className="img" src={user.image} />
                <div className="name">
                  <HighLight
                    highlight={search}
                    data={user.firstName + " " + user.lastName}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
