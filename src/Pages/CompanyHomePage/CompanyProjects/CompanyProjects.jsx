import React, { useEffect, useState, CSSProperties  } from 'react'
import './CompanyProjects.css'
import { useNavigate, useParams } from 'react-router-dom';
import { companyCreateProjectApi, projectListApi } from '../../../Api/Company';
import { getOrganisationName } from '../../../Utils/Localstorage';
import ClipLoader from "react-spinners/ClipLoader";

const CompanyProjects = () => {
  const { organisationName } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    organisationName: getOrganisationName(),
    projectName: '',
  });


  const [projectList, setprojectList] = useState([])

  useEffect(() => {
    projectListApi(organisationName).then(res => {
      console.log(res.data);
      setprojectList(res.data);
    }).catch(err => {
      console.log(err);
    })
    if (projectList !== 0) {
      setIsLoading(false)
    }
  }, [formData.projectName])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    companyCreateProjectApi(formData).then(res => {
      console.log(res);
      setFormData({ ...formData, projectName: '' }); // Clear the projectName input
      // navigate(`/${organisationName}/admin/home`)
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
    });
  };


  return (
    <div className='CompanyProjects_container'>
      <div className='CompanyProjects__inner'>
        <header>Odonine add your project</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            required
            autoComplete="off" // Add this line
          />
          <button className='todo_royalBlue_button' type="submit">Add Project</button>
          {/*<Link className='navigate' to={`/sign-in`}>Signin</Link> */}
        </form>


        <div className='companyProjectList'>
          <header>Current Projects</header>
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
                {projectList.map((data, index) => (
                  <input
                    key={index} // added key prop for unique identification
                    value={data.projectName}
                    onChange={handleChange}
                    disabled
                  />
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export default CompanyProjects