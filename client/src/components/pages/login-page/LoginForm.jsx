import { useState, useContext } from "react";

import { GlobalContext } from "../../../App"


export default function LoginForm({ formData, handleChange }) {

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
      body: JSON.stringify({username: formData.username, password: formData.password}),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setCurrentUser(currentUser));
        setErrors([])
        redirect()
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const errorComponents = (errors) ? (
    errors.map((error) => {
      return <h4 style={{color: "#dd0000"}}>{error}</h4>
    })
  ) : (
    null
  )

  return (
    <div>
      <h2 className="font-bold text-white text-2xl">Log In</h2>

      <div className="mt-2">
        {errorComponents}
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="form-control max-w-2xl mx-auto mb-1d">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Username:</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type username here..."
            value={formData.username}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
          />
        </div>

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Password:</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Type password here..."
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
          />
        </div>

        <div className="grid my-5 max-w-2xl mx-auto">
          <div>
            <button type="submit" className="btn btn-primary py-2 px-4"><span className="drop-shadow-sm-dark">Log In</span></button>
          </div>
        </div>
      </form>
    </div>
  )
}