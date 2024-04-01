import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { companySignupApi } from '../Api/Auth';
import { saveLoginToken } from '../Utils/Localstorage';
import { validateForm } from '../Utils/FormValidation';
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [subDomain, setsubDomain] = useState();
    const [formData, setFormData] = useState({
        organisationName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (subDomain) {
            navigate(`/${subDomain}/admin/home`);
        }
    }, [subDomain, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const newErrors = validateForm(formData); // Validate the form data
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true)
            companySignupApi(formData)
            .then((res) => {
                console.log(res.data);

                const data = {
                    organisationId: res.data._id,
                    organisationName: res.data.organisationName,
                    subDomine: res.data.subDomine,
                    userName: res.data.name
                };
                saveLoginToken(data);
                setsubDomain(res.data.subDomine);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log("Form validation failed");
        }
    };

    console.log(errors);

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type='text'
                            name='organisationName'
                            placeholder='Organisation Name'
                            value={formData.organisationName}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.organisationName && <div className='formError'>{errors.organisationName}</div>}
                    </div>
                    
                    <div>
                        <input
                            type='text'
                            name='name'
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.name && <div className='formError'>{errors.name}</div>}
                    </div>
                    
                    <div>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.email && <div className='formError'>{errors.email}</div>}
                    </div>
                    
                    <div>
                        <input
                            type='tel'
                            name='mobileNumber'
                            placeholder='Number'
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.mobileNumber && <div className='formError'>{errors.mobileNumber}</div>}
                    </div>
                    <div>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.password && <div className='formError'>{errors.password}</div>}
                    </div>
                    <div>
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autocomplete="off"
                        />
                        {errors.confirmPassword && <div className='formError'>{errors.confirmPassword}</div>}
                    </div>
                    <div>
                        <button className='todo_royalBlue_button' type='submit'>
                            Sign Up
                        </button>
                    </div>
                    
                    {
                        isLoading && 
                        <ClipLoader
                            color={"#4169e1"}
                            loading={isLoading}
                            css={{ display: "block", margin: "0 auto", borderColor: "red" }}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    }
                </form>
            </div>
        </div>
    );
};

export default Signup;