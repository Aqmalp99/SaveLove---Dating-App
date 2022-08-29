import React, {useState} from 'react';
import LoginForm from './LoginForm';

function LoginLogic() {
  const dummyBackend = {
    email: "a@a",
    password: "1"
  }

  const [user, setUser] = useState({name: "", email: ""})
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details)

    if (details.email == dummyBackend.email && details.password == dummyBackend.password) {
      console.log("Matched")
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Nope")
      setError("Wrong credentials")
    }
  }

  const Logout = () => {
    setUser({
      email: ""
    })
  }

  return (
    <div className="App">
      {(user.email != "") ? (
        <div className="homepage">
          <h2>Homepage</h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default LoginLogic;
