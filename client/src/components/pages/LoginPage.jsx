import { useState, useEffect } from "react"

import LoginForm from "./login-page/LoginForm";
import SignupForm from "./login-page/SignupForm";


export default function LoginPage() {

  const [showLogin, setShowLogin] = useState(true)

  const newForm = {
    username: '',
    password: '',
    passwordConfirmation: '',
    image: '',
    favBowl: '',
    diet: ''
  }

  const [formData, setFormData] = useState(newForm)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)
  }

  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`/api/items`)
    .then(r => r.json())
    .then(itemsData => {
      setItems(itemsData)
      console.log("fetched")
    })
  }, [showLogin])

  return (
    <div className="container mx-auto">

      {showLogin ? (
        <>
          <LoginForm formData={formData} handleChange={handleChange} />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm items={items} formData={formData} handleChange={handleChange} />
          <p>
            Already have an account?
            <button onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  )
}