import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { signinApi } from '../api/Auth';
// import { saveLoginToken } from '../utils/Localstorage';

const Signin = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // signinApi(formData).then(res => {
        //     console.log(res.data);
        //     const data = {
        //         token: res.data.token,
        //         userName: res.data.data.name,
        //         userId: res.data.data._id,
        //         message: "this is api object"
        //     }
        //     // console.log(data);
        //     saveLoginToken(data)
        //     window.location.reload();
        //     navigate('/')
        // }).catch(err => {
        //     alert(err.response.data.message);
        // })
    };

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>CLT Ticketing</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                    <button className='todo_royalBlue_button' type="submit">Sign in</button>
                    <Link className='navigate' to={`/`}>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Signin