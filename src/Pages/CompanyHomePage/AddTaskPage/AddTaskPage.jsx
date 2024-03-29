import React, { useEffect, useState } from 'react';
import './AddTaskPage.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getStaffListApi } from '../../../Api/Staff';
import { companyCreateTaskApi, getTaskListApi } from '../../../Api/Task';
import { projectListApi } from '../../../Api/Company';

const AddTaskPage = () => {
  const { organisationName } = useParams()

  const [apiData, setapiData] = useState([])
  const [staffList, setstaffList] = useState([])
  const [projectList, setprojectList] = useState([])
  
  useEffect(() => {
    getTaskListApi(organisationName).then(res => {
      setapiData(res.data);
    }).catch(err => {
      console.log(err);
    })

    getStaffListApi(organisationName).then(res => {
      setstaffList(res.data);
    }).catch(err => {
      console.log(err);
    })

    projectListApi(organisationName).then(res => {
      setprojectList(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [apiData])

  const [formData, setFormData] = useState({
    organisationName,
    projectName: '',
    projectId: '',
    taskName: '',
    assignedTo: '',
    assignedToId: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProjectNameChange = (event) => {
    const { value } = event.target;
    const selectedProject = projectList.find((project) => project.projectName === value);
    const pid = selectedProject ? selectedProject._id : '';

    setFormData((prevFormData) => ({
      ...prevFormData,
      projectName: value,
      projectId: pid,
    }));
  };

  const handleAssignedToChange = (event) => {
    const { value } = event.target;
    const selectedStaff = staffList.find((staff) => staff.name === value);
    const id = selectedStaff ? selectedStaff._id : '';

    setFormData((prevFormData) => ({
      ...prevFormData,
      assignedTo: value,
      assignedToId: id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <header>Odonine add task</header>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleProjectNameChange}
              required
              list="projectList"
              autoComplete="off"
            />
            <datalist id="projectList">
              {projectList.map((data) => (
                <option key={data._id} value={data.projectName} />
              ))}
            </datalist>
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
              onChange={handleAssignedToChange}
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
                    <tr key={index}>
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default AddTaskPage
