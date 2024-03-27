import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { signupApi } from '../api/Auth';
// import { saveLoginToken } from '../utils/Localstorage';

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        organisatioName: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/${formData.organisatioName}/admin/home`)
    };

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="organisatioName"
                        placeholder="Organisation Name"
                        value={formData.organisatioName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button className='todo_royalBlue_button' type="submit">Sign Up</button>
                    {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
                </form>
            </div>
        </div>
    )
}

export default Signup