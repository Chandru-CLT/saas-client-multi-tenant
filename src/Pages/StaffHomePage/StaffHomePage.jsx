import React, { useEffect, useState } from 'react'
import './StaffHomePage.css'
import { useNavigate, useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { clearLocalStorage, getUserId, saveStaffSigninData } from '../../Utils/Localstorage';
import { FaBackwardFast } from 'react-icons/fa6';
import { getIndiStaffTaskApi } from '../../Api/Task';
import { RiLogoutCircleFill } from 'react-icons/ri';


const StaffHomePage = () => {
  const { organisationName } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [apiData, setApiData] = useState([]) // Changed variable name to setApiData

  const navigate = useNavigate()
 let userId = getUserId()
//  console.log("This is UserID:",userId);
  useEffect(()=>{
    setIsLoading(true)
    getIndiStaffTaskApi(organisationName, userId).then(res=>{
      // console.log("This is API data",res.data);
      setApiData(res.data); // Updated variable name to setApiData
      setIsLoading(false)
    }).catch(err=>{
      console.log(err);
    })
  },[])

  const logout_ = () => {
    navigate(`/${organisationName}/signin`)
    clearLocalStorage()
}

const goBack = () => {
    window.history.back();
}; 

  console.log("This is API data:", apiData);
  return (
        <section className='tableContainer_'>
            <header className='Header_container'>
                <span onClick={goBack}><FaBackwardFast size={60}/></span>
                <h1>{organisationName}</h1>
                <p onClick={logout_} className=''><RiLogoutCircleFill size={50}/></p>
            </header>
            <h2>Tasks Assigned to you</h2>
            <div className="tableHeader_">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Assigned to</th>
                  <th>Update Status</th>
                  <th>Action</th>
                </tr>
              </thead>
            </div>
            <div class="tableContent_">
              <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                {isLoading ? (
                    <ClipLoader
                      color={"#4169e1"}
                      loading={isLoading}
                      css={{ display: "block", margin: "0 auto", borderColor: "red" }}
                      size={100}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    <>
                      {apiData.length === 0 || null ? (
                        <p>No tasks yet</p>
                      ):(
                        apiData.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.projectName}</td>
                            <td>{data.taskName}</td>
                            <td>{data.assignedTo}</td>
                            <td>
                              <select>
                                <option value="assigned">Assigned</option>
                                <option value="working">Working</option>
                                <option value="completed">Completed</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td>
                              <button className='todo_royalBlue_button'>Update</button>
                            </td>
                          </tr>
                      ) 
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </section>
  )
}

export default StaffHomePage