import { useState, useEffect, useContext } from "react"

import LoginForm from "./login-page/LoginForm";
import SignupForm from "./login-page/SignupForm";

import { GlobalContext } from "../../App";

export default function LoginPage() {

  const { setErrors } = useContext(GlobalContext)

  const [showLogin, setShowLogin] = useState(true)

  const newForm = {
    username: '',
    password: '',
    passwordConfirmation: '',
    image: '',
    favBowl: '',
    dietID: ''
  }

  const [formData, setFormData] = useState(newForm)

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)
  }

  const [items, setItems] = useState([])
  const [diets, setDiets] = useState([])
  useEffect(() => {
    Promise.all([
      fetch(`/api/items`).then(r => r.json()),
      fetch("/api/diets").then(r => r.json())
    ])
    .then(data => {
      setItems(data[0])
      setDiets(data[1])
    })
  }, [showLogin])

  function toggleSignup() {
    setShowLogin(!showLogin)
    setErrors([])
  }

  return (
    <div className="container mx-auto">

      {showLogin ? (
        <>
          <LoginForm formData={formData} handleChange={handleChange} />
          <p>
            Don't have an account?
            <button className="inline-block btn btn-secondary ml-4 my-2" onClick={toggleSignup}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignupForm items={items} diets={diets} formData={formData} handleChange={handleChange} />
          <p>
            Already have an account?
            <button className="inline-block btn btn-secondary ml-4 my-2" onClick={toggleSignup}>Back to Login</button>
          </p>
        </>
      )}
    </div>
  )
}