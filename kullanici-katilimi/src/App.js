import { useState } from "react";
import Form from "./components/Form";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const addNewUser = (user) => {
    setUsers([...users, user]);
  };
  const updateMemberToTheTeam = (memberUpdatedObj) => {
    const updatedMembersArray = users.map((m) => {
      if (m.email === editingMember.email) {
        return memberUpdatedObj;
      } else {
        return m;
      }
    });
    setEditingMember(null);
    setUsers(updatedMembersArray);
  };
  return (
    <div className="App">
      <Form
        addNewUser={addNewUser}
        users={users.map((user) => user.email)}
        editMember={updateMemberToTheTeam}
        duzenlenecekUye={editingMember}
      />
      <h3>Registered Members</h3>
      {users.length === 0 ? <h4>No members registered</h4> : null}
      <ul>
        {users.map((user, index) => (
          <div className="user-button" data-cy="memberList">
            <li key={index}>
              {user.name} {user.email}
            </li>
            <button type="button" onClick={() => setEditingMember(user)}>
              Edit
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
