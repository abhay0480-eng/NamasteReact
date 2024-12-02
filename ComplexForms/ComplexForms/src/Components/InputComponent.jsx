import React from 'react'

const InputComponent = ({placeholder,handleInputChange,name,type, value, min, max, error}) => {
  return (
    <div className='flex justify-start  items-center gap-x-2 my-5'>
        <p className='capitalize w-[30%]'>{name}:</p>
        <div>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className='px-4 py-2 border-[1px] w-full border-gray-700 rounded-lg'
            onChange={handleInputChange}
            min={min}
            max={max}
        />
        {error &&<div className='text-sm my-2 text-red-600'>{error}</div>}
        </div>
    </div>
  )
}

export default InputComponent
