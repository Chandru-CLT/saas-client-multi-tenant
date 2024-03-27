import React, { useState } from 'react'
import './AddStaff.css'

import { useNavigate, useParams } from 'react-router-dom';

const AddStaff = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
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
        // const { name, email, password, confirmPassword, organisatioName, mobileNumber } = formData;
        navigate(`/${organisationName}/admin/home`)
    };

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine add staff</header>
                <form onSubmit={handleSubmit}>
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
                        placeholder="Mobile Number"
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
                    <button className='todo_royalBlue_button' type="submit">Add staff</button>
                    {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
                </form>
            </div>
        </div>
    )
}

export default AddStaff