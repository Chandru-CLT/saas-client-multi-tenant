import React, { useEffect, useState } from 'react';
import './AddTaskPage.css'
import { useParams } from 'react-router-dom';
import { getStaffListApi } from '../../../Api/Staff';
import { companyCreateTaskApi, getTaskListApi } from '../../../Api/Task';
import { projectListApi } from '../../../Api/Company';
import { taskForm } from '../../../Utils/FormValidation';
import ClipLoader from "react-spinners/ClipLoader";
import Header from '../../../Components/Header/Header';

const AddTaskPage = () => {
  const { organisationName } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setapiData] = useState([])
  const [staffList, setstaffList] = useState([])
  const [projectList, setprojectList] = useState([])
  
  useEffect(() => {
    setIsLoading(true)

    getTaskListApi(organisationName).then(res => {
      setapiData(res.data);
      if (res.data !== 0) {
        setIsLoading(false)         
    }
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
  }, [])

  const [formData, setFormData] = useState({
    organisationName,
    projectName: '',
    projectId: '',
    taskName: '',
    assignedTo: '',
    assignedToId: '',
  });

  const [errors, setErrors] = useState({});

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
  
    // Validate the form data
    const newErrors = taskForm(formData);
    setErrors(newErrors);
  
    // Check if the projectName and assignedTo inputs match the datalist records
    const isValidProject = projectList.find((project) => project.projectName === formData.projectName);
    const isValidAssignedTo = staffList.find((staff) => staff.name === formData.assignedTo);
  
    if (!isValidProject) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        projectName: 'Please select a valid project name',
      }));
    }
  
    if (!isValidAssignedTo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignedTo: 'Please select a valid staff member',
      }));
    }
  
    if (Object.keys(newErrors).length === 0 && isValidProject && isValidAssignedTo) {
      // Form data is valid, submit the form
      const newTask = {
        projectName: formData.projectName,
        taskName: formData.taskName,
        assignedTo: formData.assignedTo
      };
      console.log(newTask);
      setapiData([...apiData, newTask]);
      
      // Reset the form fields
      setFormData({
        ...formData,
        projectName: '',
        taskName: '',
        assignedTo: '',
        assignedToId: '',
      });
  
      companyCreateTaskApi(formData).then(res => {
        console.log(res.data);
        // Add the new task to the existing tasks
      }).catch(err => {
        console.log(err);
      });
    }
  };
  
  

  return (
    <div className='auth_container'>
      <div className='AddTaskPage_'>
        <div className='AddTaskPage__inner'>
          <Header/>
          <header>Odonine add task</header>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleProjectNameChange}
                list="projectList"
                autoComplete="off"
              />
              <datalist id="projectList">
                {projectList.map((data) => (
                  <option key={data._id} value={data.projectName} />
                ))}
              </datalist>
              {errors.projectName && <div className='formError'>{errors.projectName}</div>}
            </div>

            <div>
              <input
                type="text"
                name="taskName"
                placeholder="Task"
                value={formData.taskName}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.taskName && <div className='formError'>{errors.taskName}</div>}
            </div>
            
            <div>
              <input
                type="text"
                name="assignedTo"
                placeholder="Assigned To"
                value={formData.assignedTo}
                onChange={handleAssignedToChange}
                list="staffList"
                autoComplete="off"
              />
              <datalist id="staffList">
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff.name} />
                ))}
              </datalist>
              {errors.assignedTo && <div className='formError'>{errors.assignedTo}</div>}
            </div>

            <div>
              <button className='todo_royalBlue_button' type="submit">Add task</button>
            </div>
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
                      {apiData.length === 0 ? (
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
        </div>
      </div>
    </div>
  )
}

export default AddTaskPage
