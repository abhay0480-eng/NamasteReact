import { useState } from 'react'
import './App.css'
import InputComponent from './Components/InputComponent'

function App() {
  const [formData, setFormData] = useState({
    username: "userName1234",
    email: "user@test.com",
    password: "*********"
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setFormData(pre => ({...pre, [e.target.name]: e.target.value}))
  }

  const validate = () => {
    let newErrors = {}

    if(!formData.username) newErrors.username = "Username is required"

    if(!formData.email) newErrors.email = "Email is required"

    if(!formData.password) newErrors.password = "Password is required"

    if(!formData.age) newErrors.age = "Age is required"

    if(!formData.gender) newErrors.gender = "Gender is Required"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if(validate()){
      console.log("formData", formData);
    }

  }

  console.log(errors);
  
  

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-96'>

        <InputComponent  value={formData.username} error={errors.username} type="text" name="username" placeholder='Enter UserName' handleInputChange={handleInputChange}/>

        <InputComponent  value={formData?.email} error={errors.email} type="email" name="email" placeholder='Enter Email' handleInputChange={handleInputChange}/>

        <InputComponent  value={formData?.password} error={errors.password} type="password" name="password" placeholder='Enter Password' handleInputChange={handleInputChange}/>

        <InputComponent  value={formData?.age} error={errors.age} type="number" name="age" placeholder='Enter Age' handleInputChange={handleInputChange} max={100} min={18}/>

        <div className='flex justify-start items-center gap-x-3'>
          <p>Gender:</p>
          <label>
          <p>Male</p>
          <input 
            type='radio'
            name='gender'
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleInputChange}
            />

          </label>

          <label>
            <p>Female</p>
            <input 
              type='radio'
              name='gender'
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleInputChange}
              />
          </label>
          {errors.gender &&<div className='text-sm my-2 text-red-600'>{errors.gender}</div>}

        </div>

        <div className='flex justify-start items-center gap-x-3'>
          <p>Hobbies:</p>
          <label>
            <p>Gaming</p>
            <input
              type='checkbox'
              name='hobbies'
              value="Gaming"
              checked= {formData.hobbies?.includes("Gaming")}
              onChange={handleInputChange}
            />
          </label>

          <label>
            <p>Traveling</p>
            <input
              type='checkbox'
              name='hobbies'
              value="Traveling"
              checked={formData.hobbies?.includes("Traveling")}
              onChange={handleInputChange}
              />
            </label>
        
        </div>



        <div className='flex justify-start items-center gap-x-5'>
          <button type='submit' className='bg-slate-600 px-4 py-2 text-white rounded-lg hover:scale-105 duration-300'>Submit</button>
          <button onClick={(e) => { e.preventDefault(); setFormData({
              username: "",
              email: "",
              password: ""
            }) }}> Clear All</button>
        </div>

       
      </form>
    </>
  )
}

export default App
