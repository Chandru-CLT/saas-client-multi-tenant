import React from 'react'
import './StaffHomePage.css'
import { useNavigate, useParams } from 'react-router-dom'


const StaffHomePage = () => {
  const { organisationName } = useParams()
  const navigate = useNavigate()
  const logout = () => {
    navigate(`/${organisationName}/signin`)
  }
  return (
    <section className='StaffHomePage_'>
      <h1>Assigned Task</h1>
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

      <div className='staff_Logout' onClick={logout}>Logout</div>
    </section>
  )
}

export default StaffHomePage