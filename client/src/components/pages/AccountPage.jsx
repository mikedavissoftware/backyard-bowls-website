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
      const userFavOption = <option key={1} value={currentUser.fav_bowl}>{currentUser.fav_bowl}</option>
      const otherBowlOptions = otherNameValues.map((nameValue, index) => {
        return <option key={index + 2} value={nameValue}>{nameValue}</option>
      })
      setBowlOptions([userFavOption, ...otherBowlOptions])

      const dietsObj = items.filter((item) => {
        return item.category === "Diets"
      })
      const otherDietsArray = JSON.parse(dietsObj[0].name).filter((diet) => {
        return diet !== currentUser.diet
      })
      const userDietOption = <option key={1} value={currentUser.diet}>{currentUser.diet}</option>
      const otherDietOptions = otherDietsArray.map((diet, index) => {
        return <option key={index + 2} value={diet}>{diet}</option>
      })
      setDietOptions([userDietOption, ...otherDietOptions])
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
    password: currentUser.password,
    passwordConfirmation: currentUser.passwordConfirmation,
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

    fetch(`/api/me`, {
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
    setErrors([])
    redirect()
  }

  const errorComponents = (errors) ? (
    errors.map((error) => {
      return <h4 style={{color: "#dd0000"}}>{error}</h4>
    })
  ) : (
    null
  )

  if (!currentUser) return <span className="loading loading-bars loading-lg"></span>

  return (
    <div className="my-8">
      
      <h1 className="mb-6 text-3xl font-bold">Your Account</h1>

      <div>
        {errorComponents}
      </div>

      <div className="avatar">
        <div className="w-96 mask mask-squircle">
          <img src={currentUser.image} />
        </div>
      </div>

      <div className="text-slate-600 bg-slate-300 px-4 py-2 rounded-md w-fit mx-auto my-7">
        <h3 className="text-xl"><strong>Username: </strong>{currentUser.username}</h3>
        <h3 className="text-xl"><strong>Favorite Bowl: </strong>{currentUser.fav_bowl}</h3>
        <h3 className="text-xl"><strong>Diet: </strong>{currentUser.diet}</h3>
      </div>

      <button className="inline-block mx-1 my-4 btn btn-warning" onClick={()=>document.getElementById('delete_acct_modal').showModal()}>Delete Account</button>
      <dialog id="delete_acct_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Just checking...</h3>
          <p className="py-4">Are you sure you want to delete your account?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary mx-1">Cancel</button>
              <button className="btn btn-warning mx-1" onClick={deleteAccount}>I'm Sure!</button>
            </form>
          </div>
        </div>
      </dialog>
      {(!showAccountEdit) ? (
        <button className="inline-block mx-1 my-4 btn btn-primary" onClick={switchAccountEdit} style={{marginBottom: "30px"}}>Edit Account</button>
      ) : (
        <>
        <button className="inline-block mx-1 my-4 btn btn-primary" onClick={switchAccountEdit}>Hide Edit Account</button>
        <hr className="w-1/2 mx-auto my-8"></hr>
        <h2 className="text-2xl font-bold">Edit Account Details</h2>

        <form onSubmit={submitEdits}>
          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Change Your Username:</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder={`Change from ${currentUser.username}`}
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
            />
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Change Your Password:</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Type new password here..."
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
            />
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Confirm Your New Password:</span>
            </label>
            <input
              id="password-confirmation"
              name="passwordConfirmation"
              type="password"
              placeholder="Confirm new password..."
              value={formData.passwordConfirmation}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
            />
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Change Your Profile Picture:</span>
            </label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="Enter new profile picture URL..."
              value={formData.image}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs mx-auto text-white text-lg"
            />
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Change Your Favorite Bowl:</span>
            </label>
            <select defaultValue={currentUser.favBowl} className="select select-bordered w-full max-w-xs mx-auto text-lg" name="favBowl" onChange={handleChange}>
              {bowlOptions}
            </select>
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Your Diet:</span>
            </label>
            <select defaultValue={currentUser.diet} className="select select-bordered w-full max-w-xs mx-auto text-lg" name="diet" onChange={handleChange}>
              {dietOptions}
            </select>
          </div>

          <div className="grid my-5 max-w-2xl mx-auto">
            <div>
              <button type="submit" className="block mx-auto my-4 btn btn-primary border-2 border-primary"><span className="drop-shadow-sm-dark">Update Account</span></button>
            </div>
          </div>
        </form>
        </>
      )}
      
    </div>
  )
}