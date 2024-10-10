import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const hostUrl = import.meta.env.PROD
    ? window.location.href
    : "http://localhost:8080/";

  const fetchUsers = async () => {
    const response = await fetch(`${hostUrl}api/users`);
    const usersToJson = await response.json();
    console.log(usersToJson)
    setUsers(usersToJson);
  };

  const createUser = async (e) => {
    e.preventDefault()
    const response = await fetch(`${hostUrl}api/users`, {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify({ name: e.target.name.value, isAdmin: e.target.isAdmin.checked  }),
    });
    const newUser = await response.json();

    setUsers([...users, newUser]);
    setName("");
    e.target.reset();
}


  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = async (e) => {
    await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
    method: "DELETE",
    headers: {
        "Content-type": "application/json",
    },
    });
    await fetchUsers();
}
const updateUser = async (e) => {
  const response = await fetch(`${hostUrl}api/users/${e.target.dataset.id}`, {
  method: "PUT",
  headers: {
      "Content-type": "application/json",
  },
  body: JSON.stringify({ isAdmin: e.target.checked }),
  });
  await response.json();
  await fetchUsers();
};


  return (
    <>
    
    <h2>New User Creation</h2>
    
<form onSubmit={createUser}>
    <label htmlFor="name">Full Name</label>
    <input 
    type="text" 
    name="name" 
    id="name" 
    value ={name} 
    onChange={(e) => setName(e.target.value)}
    /><br></br>
    <label htmlFor="isAdmin">Is Admin</label>
    <input type="checkbox" name="isAdmin"/><br></br>
    <label htmlFor="submit">Submit to Create User</label>
    <input type="submit" />
    
</form>
<h3>List of users from the Repo</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Is Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.isAdmin.toString()}</td>
            <td>
    <button data-id={user.id} onClick={deleteUser}>Delete</button>
</td>
         </tr>
        ))}
      </tbody>
    </table>
  </>
  );
}


export default App;
