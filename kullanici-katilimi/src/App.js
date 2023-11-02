import "./App.css";
import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [memberList, setMemberList] = useState([]);
  const { editMember, setEditMember } = useState(null);

  const addMember = (member) => {
    const currentMemberList = [...memberList, member];
    setMemberList(currentMemberList);
  };
  const editMemberFn = (updatedMember) => {
    const updatedMemberList = memberList.map((m) => {
      if (m.email === editMember.email) {
        return updatedMember;
      } else {
        return m;
      }
    });
    setEditMember(null);
    setMemberList(updatedMemberList);
  };
  return (
    <div className="App">
      <Form
        addMember={addMember}
        editMemberFn={editMemberFn}
        editMember={editMember}
      />
      <h2>Member List</h2>
      <ul>
        {memberList.map((member, idx) => (
          <li key={idx}>
            {member.isim},<a href={`mailto:${member.email}`}>{member.email}</a>,
            {member.rol}
            <button type="button" onClick={() => setEditMember(member)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
