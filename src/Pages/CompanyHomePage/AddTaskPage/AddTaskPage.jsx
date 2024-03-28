import React, { useEffect, useState } from 'react';
import './AddTaskPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getStaffListApi } from '../../../Api/Staff';
import { companyCreateTaskApi, getTaskListApi } from '../../../Api/Task';

const AddTaskPage = () => {
  const { organisationName } = useParams()
  // const navigate = useNavigate()

  const [apiData, setapiData] = useState([])
  const [staffList, setstaffList] = useState([])

  useEffect(() => {
    getTaskListApi(organisationName).then(res => {
      // console.log(res.data);
      setapiData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [apiData])

  useEffect(() => {
    getStaffListApi(organisationName).then(res => {
      console.log(res.data);
      setstaffList(res.data);
    }).catch(err => {
      console.log(err);
    })
  })

  const [formData, setFormData] = useState({
    organisationName,
    projectName: '',
    taskName: '',
    assignedTo: '',
    assignedToId: '',
  });

  // Example dataset with staff names
  // const staffDataset = [
  //   { id: 1, name: 'John Doe' },
  //   { id: 2, name: 'Jane Smith' },
  //   { id: 3, name: 'Alice Johnson' },
  // ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    let id = '';
    if (staffList.length > 0) {
      const selectedStaff = staffList.find((staff) => staff.name === value);
      if (selectedStaff) {
        id = selectedStaff._id;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
      assignedToId: id,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    companyCreateTaskApi(formData).then(res => {
      console.log(res.data);
      // navigate(`/${organisationName}/admin/home`)
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div className='auth_container'>
      <div className='AddTaskPage_'>
        <div className='AddTaskPage__inner'>
          <header>Odonine  add task</header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="taskName"
              placeholder="Task"
              value={formData.taskName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={formData.assignedTo}
              onChange={handleChange}
              list="staffList"
              required
              autoComplete="off"
            />
            <datalist id="staffList">
              {staffList.map((staff) => (
                <option key={staff._id} value={staff.name} />
              ))}
            </datalist>
            <button className='todo_royalBlue_button' type="submit">Add task</button>
            {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
          </form>

          <section className='tableContainer_'>
            <h2>Tasks Assigned to staffs</h2>
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
                  {apiData.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.projectName}</td>
                      <td>{data.taskInfo}</td>
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
                  ))}
                </tbody>
              </table>
            </div>

            {/*<div className='staff_Logout'>Logout</div> */}
          </section>
        </div>
      </div>

    </div>
  )
}

export default AddTaskPage
