import { useState, useEffect , useContext } from "react"

import { GlobalContext } from "../../../App"


export default function SignupForm({ items, username, setUsername, password, setPassword }) {

  const { currentUser, setCurrentUser, history, errors, setErrors } = useContext(GlobalContext)

  const redirect = () => {
    history.push('/me');
  }

  const newForm = {
    username: username,
    password: password,
    passwordConfirmation: '',
    image: '',
    favBowl: '',
    diet: ''
  }
  const [formData, setFormData] = useState(newForm)

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

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const formSubmit = {
      username: username,
      password: password,
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
      <h2>Create Your Account:</h2>

      {showErrors}

      <form onSubmit={handleSubmit}>
        <label><strong>Username: </strong></label>
        <input 
          type="text" 
          name="username" 
          placeholder="Enter username..." 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />

        <br></br>
        <label><strong>Password: </strong></label>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter password..." 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <br></br>
        <label><strong>Confirm Password: </strong></label>
        <input 
          type="password" 
          name="passwordConfirmation" 
          placeholder="Confirm password..." 
          value={formData.passwordConfirmation} 
          onChange={handleChange} 
        />

        <br></br>
        <label><strong>Image: </strong></label>
        <input 
          type="text" 
          name="image" 
          placeholder="Enter profile image url..." 
          value={formData.image} 
          onChange={handleChange} 
        />

        <br></br>
        <label><strong>Favorite Bowl: </strong></label>
        <select name="favBowl" onChange={handleChange}>
          <option value={"unspecified"} disabled selected>Select Your Favorite Bowl...</option>
          {bowlOptions}
        </select>

        <br></br>
        <label><strong>Diet: </strong></label>
        <select name="diet" onChange={handleChange}>
          <option value={"unspecified"} disabled selected>Select Your Diet...</option>
          {dietOptions}
        </select>

        <br></br>
        <button className="ui button" type="submit">
          Create Account
        </button>
      </form>
    </div>
  )
}