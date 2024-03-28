import React, { useEffect, useState } from 'react'
import './CompanyHomePage.css'
import { Link, useNavigate, useParams } from 'react-router-dom'

const CompanyHomePage = () => {
  const navigate = useNavigate()
  const { organisationName } = useParams()
  const [formData, setFormData] = useState({
    organisatioName: '',
  });

  useEffect(()=>{
    
  })

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

  const logout_ = () => {
    navigate(`/${organisationName}/admin/signin`)
  }


  return (
    <div className='CompanyHomePage_container'>
      <div className='CompanyHomePage_Inner'>
        <header>
          <h1>{organisationName}</h1>
          <p onClick={logout_} className='logout_'>LOGOUT</p>
        </header>

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
          <button className='btn' onClick={addTask}>Add Task</button>
          <button className='btn' onClick={addProject}>Add project</button>
          <button className='btn' onClick={addStaff}>Add Staff</button>
        </div>

        <section className='StaffHomePage_'>
          <h2>Tasks Assigned to staffs</h2>
          <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Current Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Odonine </td>
                  <td>Bug in signup page</td>
                  <td>Assigned</td>
                  <td>
                    <select>
                      <option value="assigned">Assigned</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/*<div className='staff_Logout' onClick={logout}>Logout</div> */}
        </section>
      </div>
    </div>
  )
}

export default CompanyHomePage