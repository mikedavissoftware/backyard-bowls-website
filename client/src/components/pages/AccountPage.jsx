import { useState, useEffect, useContext } from "react"

import { GlobalContext } from "../../App"


export default function AccountPage() {

  const { currentUser, setCurrentUser, history, errors, setErrors } = useContext(GlobalContext)

  const [bowlOptions, setBowlOptions] = useState([])
  const [dietOptions, setDietOptions] = useState([])

  const redirect = () => {
    history.push('/');
  }

  useEffect(() => {
    fetch("/api/items")
    .then(r => r.json())
    .then(items => {
      const otherNameValues = items.filter((item) => {
        return item.category === "Bowl"
      }).map(bowl => {
        return bowl.name
      }).filter(bowlName => {
        return bowlName !== currentUser.fav_bowl
      })
      const userFavOption = <option value={currentUser.fav_bowl} selected>{currentUser.fav_bowl}</option>
      const otherBowlOptions = otherNameValues.map(nameValue => {
        return <option value={nameValue}>{nameValue}</option>
      })
      setBowlOptions([userFavOption, otherBowlOptions])

      const dietsObj = items.filter((item) => {
        return item.category === "Diets"
      })
      const otherDietsArray = JSON.parse(dietsObj[0].name).filter((diet) => {
        return diet !== currentUser.diet
      })
      const userDietOption = <option value={currentUser.diet} selected>{currentUser.diet}</option>
      const otherDietOptions = otherDietsArray.map((diet) => {
        return <option value={diet}>{diet}</option>
      })
      setDietOptions([userDietOption, otherDietOptions])
    })
  }, [currentUser])

  const [showAccountEdit, setShowAccountEdit] = useState(false)
  function switchAccountEdit() {
    setShowAccountEdit(!showAccountEdit)
  }

  const newForm = {
    username:'',
    password:'',
    passwordConfirmation:'',
    image:'',
    favBowl:'',
    diet:''
  }
  const [formData, setFormData] = useState((currentUser) ? ({
    username: currentUser.username,
    password: "",
    passwordConfirmation: "",
    image: currentUser.image,
    favBowl: currentUser.fav_bowl,
    diet: currentUser.diet
  }) : (newForm))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  function submitEdits(e) {
    e.preventDefault();
    setErrors([]);

    const editAccount = {
      username: formData.username,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation,
      image: formData.image,
      fav_bowl: formData.favBowl,
      diet: formData.diet
    };

    fetch("/api/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editAccount),
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((editedAccount) => {
          console.log(editedAccount)
          setCurrentUser(editedAccount)
          setFormData({
            username: editedAccount.username,
            password: "",
            passwordConfirmation: "",
            image: editedAccount.image,
            favBowl: editedAccount.fav_bowl,
            diet: editedAccount.diet
          })
          console.log(currentUser)
          console.log(formData)
        })
    
        setShowAccountEdit(false)
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
  }

  function deleteAccount() {
    fetch("/api/me",{
      method: "DELETE"
    })
    setCurrentUser(null)
    redirect()
  }

  const showErrors = (errors) ? (
    errors.map((error) => {
      return <h4 style={{color: "#dd0000"}}>{error}</h4>
    })
  ) : (
    null
  )

  if (!currentUser) return <h2>Loading...</h2>

  return (
    <div>
      {showErrors}

      <img src={currentUser.image} style={{marginTop: "20px", width: "45%"}}></img>
      <p><strong>Username: </strong>{currentUser.username}</p>
      <p><strong>Favorite Bowl: </strong>{currentUser.fav_bowl}</p>
      <p><strong>Diet: </strong>{currentUser.diet}</p>

      <button className="block mx-auto my-2 btn btn-primary border-2 border-primary" onClick={deleteAccount}>Delete Account</button>
      {(!showAccountEdit) ? (
        <button className="block mx-auto my-2 btn btn-primary border-2 border-primary" onClick={switchAccountEdit} style={{marginBottom: "30px"}}>Edit Account</button>
      ) : (
        <>
        <button className="block mx-auto my-2 btn btn-primary border-2 border-primary" onClick={switchAccountEdit}>Hide Edit Account</button>
        <hr width="60%"></hr>
        <h3>Edit Account Details</h3>
        <form onSubmit={submitEdits}>
          <label><strong>Edit Username: </strong></label>
          <input
            type="text"
            name="username"
            placeholder={`Change from ${currentUser.username}`}
            value={formData.username}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Edit Password: </strong></label>
          <input
            type="password"
            name="password"
            placeholder={`Enter New Password...`}
            value={formData.password}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Confirm New Password: </strong></label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder={`Confirm New Password...`}
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Update Profile Picture: </strong></label>
          <input
            type="text"
            name="image"
            placeholder={`Change from ${currentUser.image}`}
            value={formData.image}
            onChange={handleChange}
          />

          <br></br>
          <label><strong>Change Your Favorite Bowl: </strong></label>
          <select name="favBowl" onChange={handleChange}>
            {bowlOptions}
          </select>

          <br></br>
          <label><strong>Change Your Diet: </strong></label>
          <select name="diet" onChange={handleChange}>
            {dietOptions}
          </select>

          <br></br>
          <button type="submit">Submit Changes</button>
          
        </form>
        </>
      )}
      
    </div>
  )
}