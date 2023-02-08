import { useState } from "react";


export default function LoginForm({setCurrentUser, redirect}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setCurrentUser(currentUser));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });

    console.log("ayyy")
    redirect()
  }

  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <label><strong>Username:</strong></label>
        <input
          type="text" 
          id="username" 
          placeholder="Enter username..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <label><strong>Password:</strong></label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Log In
        </button>
      </form>
    </div>
  )
}