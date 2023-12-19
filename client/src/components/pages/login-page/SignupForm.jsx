import { useState, useEffect, useContext } from "react"

import { GlobalContext } from "../../../App"


export default function SignupForm({ items, formData, handleChange }) {

  const { currentUser, setCurrentUser, history, errors, setErrors } = useContext(GlobalContext)

  const redirect = () => {
    history.push('/me');
  }

  const bowls = items.filter(item => {
    return item.category === "Bowl"
  })
  const bowlNames = bowls.map(bowl => {
    return bowl.name
  })
  const bowlOptions = bowlNames.map(name => {
    return <option value={name}>{name}</option>
  })

  const dietArray = JSON.parse(items.find((item) => {
    return item.category === "Diets"
  }).name)
  const dietOptions = dietArray.map(diet => {
    return <option value={diet}>{diet}</option>
  })

  function handleSubmit(e) {
    e.preventDefault();
    
    const formSubmit = {
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      image: formData.image,
      fav_bowl: formData.favBowl,
      diet: formData.diet
    }

    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formSubmit),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    console.log(currentUser)

    redirect()
  }

  const showErrors = (errors) ? (
    errors.map((error) => {
      return <h4 style={{color: "#dd0000"}}>{error}</h4>
    })
  ) : (
    null
  )

  if (!items) return <h2>Loading...</h2>

  return (
    <div>
      <h2 className="font-bold text-white text-2xl">Create Your Account:</h2>

      {showErrors}

      <form onSubmit={handleSubmit}>
        
        <div className="form-control max-w-2xl mx-auto">
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

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Confirm Password:</span>
          </label>
          <input
            id="password-confirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="Confirm password..."
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
          />
        </div>

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Profile Picture:</span>
          </label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter profile picture URL.."
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
          />
        </div>

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Your Favorite Bowl:</span>
          </label>
          <select className="select select-bordered w-full max-w-xs mx-auto" name="favBowl" onChange={handleChange}>
            <option value={"unspecified"} disabled selected>Select Your Favorite Bowl...</option>
            {bowlOptions}
          </select>
        </div>

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto text-black dark:text-white">Your Diet:</span>
          </label>
          <select className="select select-bordered w-full max-w-xs mx-auto" name="diet" onChange={handleChange}>
            <option value={"unspecified"} disabled selected>Select Your Diet...</option>
            {dietOptions}
          </select>
        </div>

        <div className="grid my-5 max-w-2xl mx-auto">
          <div>
            <button type="submit" className="py-2 px-4 rounded-md bg-accent text-white hover:bg-[#7f7] hover:text-black"><span className="drop-shadow-sm-dark">Create Account</span></button>
          </div>
        </div>
      </form>
    </div>
  )
}