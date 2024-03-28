import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { companySigninApi } from '../Api/Auth';

const CompanySignIn = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        subDomine: organisationName,
        email: '',
        password: '',
    });

    // console.log(organisationName);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        companySigninApi(formData).then(res => {
            // console.log("This is API response", res.data.user);
            navigate(`/${organisationName}/admin/home`)

        }).catch(err => {
            console.log(err);
        })
    };
    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine admin login</header>
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
                    <Link className='navigate' to={`/${organisationName}/signin`}>Staff login</Link>
                </form>
            </div>
        </div>
    )
}

export default CompanySignIn
