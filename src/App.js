import { useState, useEffect } from "react";

import './App.css';

import UsersList from './components/UsersList';
import UsersForm from './components/UsersForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAndSetUsers();
  },[]);

  const fetchAndSetUsers = async () => {
    const response = await fetch(`https://users-crud1.herokuapp.com/users/`);  
    const data = await response.json();
    
    setUsers([...data]);   
  };

  const setCurrentUser = user => {
    setUser(user);
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="cool-gradient col-12 col-md-6">
            <UsersList users={users} setCurrentUser={setCurrentUser} fetchAndSetUsers={fetchAndSetUsers} />
          </div>
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <UsersForm user={user} setCurrentUser={setCurrentUser} fetchAndSetUsers={fetchAndSetUsers} />
          </div>          
        </div>
      </div>
    </div>
  );
}

export default App;
