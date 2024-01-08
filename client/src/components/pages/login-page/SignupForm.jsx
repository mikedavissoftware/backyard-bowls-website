import { useState, useEffect, useContext } from "react"

import { GlobalContext } from "../../../App"


export default function SignupForm({ items, diets, formData, handleChange }) {

  const { currentUser, setCurrentUser, history, errors, setErrors } = useContext(GlobalContext)

  const redirect = () => {
    history.push('/me');
  }

  const bowls = items.filter((item) => {
    return item.category === "Bowl"
  })
  const bowlNames = bowls.map((bowl) => {
    return bowl.name
  })
  const bowlOptions = bowlNames.map((bowlName, index) => {
    return <option key={index + 1} value={bowlName}>{bowlName}</option>
  })

  const dietOptions = diets.map((diet) => {
    return <option key={diet.id} value={diet.id}>{diet.diet}</option>
  })

  function handleSubmit(e) {
    e.preventDefault();
    
    const formSubmit = {
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      image: formData.image,
      fav_bowl: formData.favBowl,
      diet_id: Number(formData.dietID)
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
        setErrors([])
        redirect()
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
          console.log(err.errors)
        });
      }
    });
    console.log(currentUser)
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
      <h2 className="font-bold text-white text-2xl">Create Your Account</h2>

      {showErrors}

      <form onSubmit={handleSubmit}>
        
        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto">Username:</span>
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
            <span className="label-text mx-auto">Password:</span>
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
            <span className="label-text mx-auto">Confirm Password:</span>
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
            <span className="label-text mx-auto">Profile Picture:</span>
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
            <span className="label-text mx-auto">Your Favorite Bowl:</span>
          </label>
          <select className="select select-bordered w-full max-w-xs mx-auto" name="favBowl" defaultValue={"unspecified"} onChange={handleChange}>
            <option value="unspecified" disabled>Select Your Favorite Bowl...</option>
            {bowlOptions}
          </select>
        </div>

        <div className="form-control max-w-2xl mx-auto">
          <label className="label">
            <span className="label-text mx-auto">Your Diet:</span>
          </label>
          <select className="select select-bordered w-full max-w-xs mx-auto" name="dietID" defaultValue={"unspecified"} onChange={handleChange}>
            <option value="unspecified" disabled>Select Your Diet...</option>
            {dietOptions}
          </select>
        </div>

        <div className="grid my-5 max-w-2xl mx-auto">
          <div>
            <button type="submit" className="btn btn-primary py-2 px-4">Create Account</button>
          </div>
        </div>
      </form>
    </div>
  )
}