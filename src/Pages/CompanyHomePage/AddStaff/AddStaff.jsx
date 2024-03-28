import React, { useEffect, useState } from 'react'
import './AddStaff.css'

import { useNavigate, useParams } from 'react-router-dom';
import { getOrganisationName } from '../../../Utils/Localstorage';
import { companyCreateStaffApi, getStaffListApi } from '../../../Api/Staff';
import { getTaskListApi } from '../../../Api/Task';

const AddStaff = () => {
    const { organisationName } = useParams()
    const navigate = useNavigate()

    const [staffListData, setstaffListData] = useState([])
    const [formData, setFormData] = useState({
        organisationName: getOrganisationName(),
        name: '',
        email: '',
        mobileNumber: "",
        password: ''
    });

    useEffect(() => {
        getStaffListApi(organisationName).then(res => {
            // console.log(res.data);
            setstaffListData(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [staffListData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        companyCreateStaffApi(formData).then(res => {
            console.log(res.data);
            // navigate(`/${organisationName}/admin/home`)
        }).then(err => {
            console.log(err);
        })
    };

    return (
        <div className='auth_container'>
            <div className='AddStaff_container__inner'>
                <header>Odonine add staff</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <button className='todo_royalBlue_button' type="submit">Add staff</button>
                    {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
                </form>

                <section className='tableContainer_'>
                    <h2>Staff List</h2>
                    <div className="tableHeader_">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Staff name</th>
                                <th>Update Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </div>
                    <div class="tableContent_">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                {staffListData.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
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
    )
}

export default AddStaff