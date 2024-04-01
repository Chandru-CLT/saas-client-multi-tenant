import React from 'react';
import './Header.css'
import { useNavigate, useParams } from 'react-router-dom'
import { FaBackwardFast } from "react-icons/fa6";
import { clearLocalStorage } from '../../Utils/Localstorage';

const Header = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()

    const logout_ = () => {
        navigate(`/${organisationName}/admin/signin`)
        clearLocalStorage()
    }

    const goBack = () => {
        window.history.back();
      };        
    

    return (
        <header className='Header_container'>
            <span onClick={goBack}><FaBackwardFast size={60}/></span>
            <h1>{organisationName}</h1>
            <p onClick={logout_} className=''>📤</p>
        </header>
    )
}

export default Header