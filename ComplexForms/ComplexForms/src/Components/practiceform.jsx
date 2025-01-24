import React, { useEffect, useState } from 'react'

import countryCode from './countryCode.json'

const App = () => {

  const [formData, setFormData] = useState({
    fullName:"",
    mobileNo:"",
    personalEmail:"",
    linkedlnProfile:"",
    coreSkills:"",
    additionalSkills:"",
    totalExperience:"",
    preCompany:"",
    currSalary:"",
    expectedSalary:"",
    noticePeriod:"",
    currLocation:"",
    reasonForChange:"",
    resume:"",
    littleAboutYou:"",
    knowAbout7span:"",
    referredBy:""
  })
  const [errors, setErrors] = useState({})

  function checkKeys(value){
    if(value === null) return true;
    if(typeof value === "string" && value.trim() === "") return true;
    if(Array.isArray(value) && value.length === 0) return true;
    if(typeof value === "object" && Object.keys(value).length === 0) return true
 
  
    return false;

  }

  function handleInputText(e){
      setFormData(pre => ({
        ...pre,
        [e.target.name]: e.target.name === "resume" ? e.target.files[0] :  e.target.value  }))
     
  }
  
  useEffect(() => {
    console.log("formDataaa", formData);
    for(const key in formData){
      if(!checkKeys(formData[key])){
        setErrors(pre => {
          const { [key]: _, ...rest } = pre; // Remove the key from errors
          return rest;
        });
      }
    }
  },[formData])

  function handleSubmit(e){
    e.preventDefault()
    let flag = true
    for(const key in formData){
      if(checkKeys(formData[key])){
        setErrors(pre => ({...pre, [key]: `This field is required!` }))
        flag= false
      }
    }

    // if(flag){
      console.log(formData);
    // }
    
  }

  
console.log(countryCode);


  return (
    <div>
      
      <div className=' my-10'>
        <form onSubmit={handleSubmit} className='w-1/2 mx-auto'>

        <div className='grid grid-cols-2 gap-x-5 gap-y-5'>
          <div>
            <label>
              <p className='px-2'>Full Name</p>
              <input 
                type='text'
                name='fullName'
                placeholder='Enter Text' 
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors?.fullName? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />   
            </label>
            {errors && errors?.fullName &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.fullName}</div>}
          </div>

          <div>
            <label>
              <p className='px-2'>Mobile No.</p>
              <div className={`flex justify-start items-center border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.mobileNo? "border-red-600" : ""}`}>
              <select name='countryCode'  className='w-20 px-2 focus:outline-none'>
                {countryCode.map((item) => {
                  return(
                    <option value={item.name} selected={item.name==="India"}> {item.emoji} {item.code}</option>
                  )
                })}
               
              </select>
              <input 
                type='number'
                name='mobileNo'
                placeholder='Enter Phone'
                className='w-full px-2 focus:outline-none'
                onChange={(e) => handleInputText(e)}
              />  
              </div>
            </label>
            {errors && errors?.mobileNo &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.mobileNo}</div>}
          </div>

          <div>
            <label>
              <p className='px-2'>Personal Email</p>
              <input 
                type='email'
                name='personalEmail'
                placeholder='Enter Text' 
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.personalEmail? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />  
            </label>
            {errors && errors?.personalEmail &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.personalEmail}</div>}
          </div>

          <div>
            <label>
              <p className='px-2'>LinkedIn Profile</p>
              <input 
                type='url'
                name='linkedlnProfile'
                placeholder='Enter Url' 
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.linkedlnProfile? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />   
            </label>
            {errors && errors?.linkedlnProfile &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.linkedlnProfile}</div>}
          </div>
        </div>

          
          <div>
            <label>
              <p className='px-2'>Core Skills (Strong Expertise)</p>
              <select name='coreSkills'  className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.coreSkills? "border-red-600" : ""}`} onChange={(e) => handleInputText(e)} >
                <option value="" disabled selected>Select Option...</option>
                <option value="ReactJs">ReactJs</option>
                <option value="NodeJs">NodeJs</option>
                <option value="TailwindCss">TailwindCss</option>
              </select>
            </label>
            {errors && errors?.coreSkills &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.coreSkills}</div>}
          </div>

          <div>
            <label>
              <p className='px-2'>Additional Skills</p>
              <textarea 
              name='additionalSkills' 
              rows={10} 
              className={`w-full border-[1px] border-black px-3 py-2 m-2 rounded-lg ${errors.additionalSkills? "border-red-600" : ""}`}
              placeholder='Not expertise but worked on.'></textarea>
            </label>
            {errors && errors?.additionalSkills &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.additionalSkills}</div>}
          </div>


          <div className='grid grid-cols-2 gap-x-2 gap-y-5'>
          <div>
            <label>
            <p className='px-2'>Total Experience [Years]</p>
              <input 
                type='number'
                name='totalExperience'
                placeholder='Enter number'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.totalExperience? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />
            </label>
            {errors && errors?.totalExperience &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.totalExperience}</div>}
          </div>

          <div>
            <label>
            <p className='px-2'>Current/Last Company</p>
              <input 
                type='text'
                name='preCompany'
                placeholder='Enter text'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.preCompany? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              /> 
            </label>
            {errors && errors?.preCompany &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.preCompany}</div>}
          </div>

          
          <div>
            <label>
            <p className='px-2'>Current Salary (Per Month)</p>
              <input
                type='number'
                name='currSalary'
                placeholder='₹'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.currSalary? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              /> 
            </label>
            {errors && errors?.currSalary &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.currSalary}</div>}
          </div>

          <div>
            <label>
            <p className='px-2'>Expected Salary (Per Month)</p>
              <input
                type='number'
                name='expectedSalary'
                placeholder='₹'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.expectedSalary? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              /> 
            </label>
            {errors && errors?.expectedSalary &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.expectedSalary}</div>}
          </div>

          <div>
            <label>
            <p className='px-2'>Notice Period</p>
              <select 
              name='noticePeriod'  
              className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.noticePeriod? "border-red-600" : ""}`} 
              onChange={(e) => handleInputText(e)} 
              >
                <option value="" disabled selected>Select option...</option>
                <option value="immediate">Immediate</option>
                <option value="1month">1 Month</option>
                <option value="2month">2 Month</option>
                <option value="3month">3 Month</option>
            </select>
            </label>
            {errors && errors?.noticePeriod &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.noticePeriod}</div>}
          </div>
        

          <div>
            <label>
            <p className='px-2'>Current Location</p>
              <input
                type='text'
                name='currLocation'
                placeholder='Enter Location'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.currLocation? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />
            </label>
            {errors && errors?.currLocation &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.currLocation}</div>}
          </div>
          </div>


          <div>
            <label>
            <p className='px-2'>Reason for Change</p>
                <textarea 
                name='reasonForChange' 
                placeholder='Enter Text' 
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.reasonForChange? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}></textarea>
            </label>
            {errors && errors?.reasonForChange &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.reasonForChange}</div>}
          </div>

          <div>
            <label>
            <p className='px-2'>Resume</p>
              <input
                type='file'
                name='resume'
                placeholder='Drop your files here to upload'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg ${errors.resume? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />
            </label>
            {errors && errors?.resume &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.resume}</div>}
          </div>

          <div>
            <label>
            <p className='px-2'>Little About You</p>
            <textarea name='littleAboutYou' 
              className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.littleAboutYou? "border-red-600" : ""}`}
              onChange={(e) => handleInputText(e)} 
              placeholder='Tell us about yourself, your projects, links to live projects, your Github/Behance/Dribbble, or any public profile or links.'>
            </textarea>
            </label>
            {errors && errors?.littleAboutYou &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.littleAboutYou}</div>}
          </div>

          <div className='grid grid-cols-2 gap-x-5 gap-y-5'>
          <div>
            <label>
            <p className='px-2'>How did you come to know about 7Span?</p>
              <select name='knowAbout7span' onChange={(e) => handleInputText(e)} 
              className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.knowAbout7span? "border-red-600" : ""}`} 
              >
                <option value="" disabled selected>Select option...</option>
                <option value="reffred by friend">Reffred by friend</option>
                <option value="linkedln">Linkedln</option>
                <option value="instagram">Instagram</option>
              </select>
            </label>
            {errors && errors?.knowAbout7span &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.knowAbout7span}</div>}
          </div>
          

          <div>
            <label>
            <p className='px-2'>Referred By</p>
              <input
                type='text'
                name='referredBy'
                placeholder='Mention the persons name'
                className={`border-[1px] border-black px-3 py-2 m-2 rounded-lg w-full ${errors.referredBy? "border-red-600" : ""}`}
                onChange={(e) => handleInputText(e)}
              />
            </label>
            {errors && errors?.referredBy &&<div className='my-1 text-xs px-5 text-red-700'>{errors?.referredBy}</div>}
          </div>
          </div>

          <button type='submit' className='my-3 w-full bg-red-800 text-white text-center py-2 rounded-lg'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
