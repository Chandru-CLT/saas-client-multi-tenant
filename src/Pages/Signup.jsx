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
        const { name, email, password, confirmPassword } = formData;

        if (password.length >= 8) {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // signupApi({ name, email, password, confirmPassword }).then(res => {
            //     console.log(res.data.data);

            //     const data = {
            //         token: res.data.token,
            //         userName: res.data.data.user.name,
            //         userId: res.data.data.user._id,
            //     }
            //     saveLoginToken(data)
            //     navigate('/')
            //     window.location.reload(); // Reload the page
            // }).catch(err => {
            //     alert(err.response.data.data.message);
            // })

        } else {
            alert("Password length must be greater than 8")
        }
    };


    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
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
                    <Link className='navigate' to={`/sign-in`}>Signin</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup