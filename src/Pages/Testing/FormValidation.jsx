import React, { useState } from 'react'

const FormValidation = () => {
    const [formData, setFormData] = useState({
        organisationName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: ''
    })

    const [errors, setErrors] = useState({})

    const isValidEmail = (email) => {
        const emailRegex = /^\S+@\S+\.\s+$/;
        return emailRegex.test(email)
    }

    const isValidphoneNumber = (mobileNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(mobileNumber)
    }

    const isValidPassword = (password) => {
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/
        return (
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password)
        )
    }

    const validateForm = () => {
        let newErrors = {};

        if (!formData.organisationName) {
            newErrors.organisationName = "Company name is required"
        }
        if (!formData.name) {
            newErrors.name = "Name is required"
        }
        if (!formData.email) {
            newErrors.email = "email is required"
        } else if (!isValidEmail(formData.email)){
            newErrors.email = "Invalid email format"
        }
        if (!formData.mobileNumber) {
            newErrors.mobileNumber = "mobileNumber is required"
        } else if (!isValidphoneNumber(formData.mobileNumber)){
            newErrors.mobileNumber = "Invalid mobileNumber format"
        }
        if (!formData.password) {
            newErrors.password = "password is required"
        } else if (!isValidPassword(formData.password)){
            newErrors.mobileNumber = "It is not a secure password"
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Confirm password and Passwords do not match";
        }
        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }
    console.log(errors);
    const handleChange = (e)=>{
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm()
        if (isValid) {
            console.log("Form submitted", formData);
        } else {
            console.log("Form Validation Failed");
        }
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input
                type='text'
                name='organisationName'
                value={formData.organisationName}
                placeholder='Organisation name'
                onChange={handleChange}
            />
            {errors.organisationName && <div>{errors.organisationName}</div>}
        </div>
        <div>
            <input
                type='text'
                name='name'
                value={formData.name}
                placeholder='Enter your name'
                onChange={handleChange}

            />
            {errors.name && <div>{errors.name}</div>}

        </div>
        <div>
            <input
                type='email'
                name='email'
                value={formData.email}
                placeholder='Enter your email'
                onChange={handleChange}

            />
            {errors.email && <div>{errors.email}</div>}

        </div>
        <div>
            <input
                type='tel'
                name='mobileNumber'
                value={formData.mobileNumber}
                placeholder='Enter official mobile number'
                onChange={handleChange}

            />
            {errors.mobileNumber && <div>{errors.mobileNumber}</div>}
        </div>
        <div>
            <input
                type='password'
                name='password'
                value={formData.password}
                placeholder='Enter password'
                onChange={handleChange}

            />
            {errors.password && <div>{errors.password}</div>}
        </div>
        <div>
            <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                placeholder='confirmPassword'
                onChange={handleChange}

            />
            {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </div>
        <button className='todo_royalBlue_button'>Submit</button>
    </form>
  )
}

export default FormValidation
