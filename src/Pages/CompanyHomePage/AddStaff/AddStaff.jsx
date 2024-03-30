import React, { useEffect, useState } from 'react'
import './AddStaff.css'

import { useParams } from 'react-router-dom';
import { getOrganisationName } from '../../../Utils/Localstorage';
import { companyCreateStaffApi, getStaffListApi } from '../../../Api/Staff';
// import { getTaskListApi } from '../../../Api/Task';
import ClipLoader from "react-spinners/ClipLoader";
import { staffForm } from '../../../Utils/FormValidation';

const AddStaff = () => {
    const { organisationName } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [staffListData, setstaffListData] = useState([])
    const [formData, setFormData] = useState({
        organisationName: getOrganisationName(),
        name: '',
        email: '',
        mobileNumber: "",
        password: '@Password1234'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsLoading(true)

        getStaffListApi(organisationName).then(res => {
            // console.log(res.data);
            setstaffListData(res.data);
            if (res.data !== 0) {
                setIsLoading(false)         
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = staffForm(formData); // Validate the form data
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0 ) {
            // setIsLoading(true)
            setstaffListData([...staffListData, {name:formData.name}])
            setFormData({...formData, name:"", email:"", mobileNumber:""}) 
            
            companyCreateStaffApi(formData).then(res => {
                console.log(res.data);
                // setIsLoading(false)
            }).then(err => {
                console.log(err);
            })   
        }
    };

    return (
        <div className='auth_container'>
            <div className='AddStaff_container__inner'>
                <header>Odonine add staff</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="none"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.name && <div className='formError'>{errors.name}</div>}
                    </div>
                    
                    <div>
                        <input
                            type="none"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.email && <div className='formError'>{errors.email}</div>}
                    </div>
                    
                    <div>
                        <input
                            type="none"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.mobileNumber && <div className='formError'>{errors.mobileNumber}</div>}
                    </div>
                    
                    {/* <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    /> */}
                    <div>
                        <button className='todo_royalBlue_button staffButton' type="submit">Add staff</button>
                    </div>
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
                                    {staffListData.length === 0 ? (<p>No staffs yet</p>) : (
                                        staffListData.map((data, index) => (
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
                                            ) 
                                            ))}
                                    </>
                                )}
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