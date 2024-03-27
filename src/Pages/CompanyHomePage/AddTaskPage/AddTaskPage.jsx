import React, { useState } from 'react';
import './AddTaskPage.css'
import { useNavigate, useParams } from 'react-router-dom';

const AddTaskPage = () => {
  const { organisationName } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    organisationName: '',
    projectName: '',
    taskName: '',
    currentStatus: '',
    assignedTo: '',
  });

  // Example dataset with staff names
  const staffDataset = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${organisationName}/admin/home`)
  };

  return (
    <div className='auth_container'>
      <div className='auth_container__inner'>
        <header>Odonine  add task</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={formData.taskName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="currentStatus"
            placeholder="Current Status"
            value={formData.currentStatus}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            list="staffList"
            required
          />
          <datalist id="staffList">
            {staffDataset.map((staff) => (
              <option key={staff.id} value={staff.name} />
            ))}
          </datalist>
          <button className='todo_royalBlue_button' type="submit">Add task</button>
          {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
        </form>
      </div>
    </div>
  )
}

export default AddTaskPage
