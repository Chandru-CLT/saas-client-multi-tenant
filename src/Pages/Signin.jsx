import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { staffSignInApi } from '../Api/Staff';
import { signInForm } from '../Utils/FormValidation';
import ClipLoader from "react-spinners/ClipLoader";

const Signin = () => {
    const { organisationName } = useParams()

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        subDomine: organisationName,
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const newErrors = signInForm(formData); // Validate the form data
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            setIsLoading(true)
            staffSignInApi(formData).then(res => {
            console.log(res.data);
            navigate(`/${organisationName}/home`)
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
        })
        }
    };

    return (
        <div className='auth_container'>
            <div className='auth_container__inner'>
                <header>Odonine staff login</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="none"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            autocomplete="off"
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
                            autocomplete="off"
                        />
                        {errors.password && <div className='formError'>{errors.password}</div>}
                    </div>
                    
                    <button className='todo_royalBlue_button' type="submit">Sign in</button>
                    <Link className='navigate' to={`/${organisationName}/admin/signin`}>Admin login</Link>
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
    )
}

export default Signin
