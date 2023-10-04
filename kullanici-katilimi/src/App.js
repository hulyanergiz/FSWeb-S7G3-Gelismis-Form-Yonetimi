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
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} {user.email}
          </li>
        ))}
      </ul>
      <Form addNewUser={addNewUser} />
    </div>
  );
}

export default App;
