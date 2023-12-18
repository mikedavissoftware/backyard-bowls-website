import { useContext } from "react";

import { GlobalContext } from "../../../App"


export default function LoginForm({ username, setUsername, password, setPassword }) {

  const { setCurrentUser, history, errors, setErrors } = useContext(GlobalContext)

  const redirect = () => {
    history.push('/menu');
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setCurrentUser(currentUser));
        redirect()
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const showErrors = (errors) ? (
    errors.map((error) => {
      return <h4 style={{color: "#dd0000"}}>{error}</h4>
    })
  ) : (
    null
  )

  return (
    <div>
      <h2>Log Into Your Account:</h2>

      {showErrors}

      <form  onSubmit={handleSubmit}>
        <label><strong>Username: </strong></label>
        <input
          type="text" 
          id="username" 
          placeholder="Enter username..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <br></br>
        <label><strong>Password: </strong></label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br></br>
        <button type="submit">
          Log In
        </button>
      </form>
    </div>
  )
}