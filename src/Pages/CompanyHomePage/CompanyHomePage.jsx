import React, { useEffect, useState } from 'react'
import './CompanyHomePage.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTaskListApi } from '../../Api/Task'
import Header from '../../Components/Header/Header'

const CompanyHomePage = () => {
  const navigate = useNavigate()
  const { organisationName } = useParams()
  const [apiData, setapiData] = useState([])
  const [formData, setFormData] = useState({
    organisatioName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addStaff = () => {
    navigate(`/${organisationName}/admin/add-staff`)
  }
  const addTask = () => {
    navigate(`/${organisationName}/admin/add-task`)
  }
  const addProject = () => {
    navigate(`/${organisationName}/admin/projects`)
  }




  return (
    <div className='CompanyHomePage_container'>
      <div className='CompanyHomePage_Inner'>
        <Header/>
        

        <form onSubmit={handleSubmit}>
          <div>
            <p><label>Current Domine:</label> <Link target='_blank'>{`http://localhost:3000/${organisationName}/`}</Link></p>
            {/*
              <label>Update company Odonine domine:</label>
            <input
              type="text"
              name="organisatioName"
              placeholder="Enter company name"
              value={formData.organisatioName}
              onChange={handleChange}
              required
            />
            */}
          </div>
          {/*<button type="submit">Update</button> */}
        </form>

        <div className='CompanyHomePage_mainMenu'>
          <button onClick={addTask}>Tasks</button>
          <button onClick={addProject}>Projects</button>
          <button onClick={addStaff}>Staffs</button>
        </div>

        
      </div>
    </div>
  )
}

export default CompanyHomePage