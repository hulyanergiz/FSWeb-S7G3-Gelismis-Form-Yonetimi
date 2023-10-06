import { useState } from "react";
import Form from "./components/Form";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const addNewUser = (user) => {
    setUsers([...users, user]);
  };
  return (
    <div className="App">
      <Form addNewUser={addNewUser} users={users.map((user) => user.email)} />
      <h3>Registered Members</h3>
      {users.length === 0 ? <h4>No members registered</h4> : null}
      <ul>
        {users.map((user, index) => (
          <div data-cy="memberList">
            <li key={index}>
              {user.name} {user.email}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
