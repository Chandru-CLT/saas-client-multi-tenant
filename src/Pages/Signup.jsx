import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { companySignupApi } from '../Api/Auth';
import { saveLoginToken } from '../Utils/Localstorage';

const Signup = () => {
    const navigate = useNavigate();
    const [subDomain, setsubDomain] = useState();
    const [formData, setFormData] = useState({
        organisationName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: ''
    });

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
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='organisationName'
                        placeholder='Organisation Name'
                        value={formData.organisationName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='tel'
                        name='mobileNumber'
                        placeholder='Number'
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button className='todo_royalBlue_button' type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
