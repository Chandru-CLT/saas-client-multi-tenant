import React from 'react';
import './Header.css'
import { useNavigate, useParams } from 'react-router-dom'

const Header = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()

    const logout_ = () => {
        navigate(`/${organisationName}/admin/signin`)
    }

    return (
        <header className='Header_container'>
            <h1>{organisationName}</h1>
            <p onClick={logout_} className=''>📤</p>
        </header>
    )
}

export default Header