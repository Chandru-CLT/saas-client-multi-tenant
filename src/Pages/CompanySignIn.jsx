import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { companySigninApi } from '../Api/Auth';
import { signInForm } from '../Utils/FormValidation';
import { saveLoginToken } from '../Utils/Localstorage';

const CompanySignIn = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        subDomine: organisationName,
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // console.log(organisationName);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = signInForm(formData); // Validate the form data
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            companySigninApi(formData).then(res => {
                console.log("This is API response", res.data.user);
                const data = {
                    organisationId: res.data.user._id,
                    organisationName: res.data.user.organisationName,
                    subDomine: res.data.user.subDomine,
                    userName: res.data.user.name
                };
                saveLoginToken(data);
                navigate(`/${organisationName}/admin/home`)
            }).catch(err => {
                // console.log(err);
                alert(err)
            })   
        }
    };
    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine admin login</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="none"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className='formError'>{errors.email}</div>}
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className='formError'>{errors.password}</div>}
                    </div>
                    
                    <button className='todo_royalBlue_button' type="submit">Sign in</button>
                    <Link className='navigate' to={`/${organisationName}/signin`}>Staff login</Link>
                </form>
            </div>
        </div>
    )
}

export default CompanySignIn
