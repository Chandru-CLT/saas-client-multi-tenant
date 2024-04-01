import React, { useEffect, useState } from 'react'
import './CompanyProjects.css'
import { useParams } from 'react-router-dom';
import { companyCreateProjectApi, projectListApi } from '../../../Api/Company';
import { getOrganisationName } from '../../../Utils/Localstorage';
import ClipLoader from "react-spinners/ClipLoader";
import { projectForm } from '../../../Utils/FormValidation';
import Header from '../../../Components/Header/Header';

const CompanyProjects = () => {
  const { organisationName } = useParams()
  // const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    organisationName: getOrganisationName(),
    projectName: '',
  });

  const [errors, setErrors] = useState({});

  const [projectList, setprojectList] = useState([])

  useEffect(() => {
    setIsLoading(true)

    projectListApi(organisationName).then(res => {
      console.log(res.data);
      setprojectList(res.data);
      setIsLoading(false)
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
    const newErrors = projectForm(formData);
    setErrors(newErrors);
    console.log(formData);
    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // setIsLoading(true);
      setprojectList([...projectList, { projectName: formData.projectName }]);
      setFormData({ ...formData, projectName: '' }); // Clear the projectName input

    companyCreateProjectApi(formData).then(res => {
      console.log(res);
      // setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
    }
  };

  return (
    <div className='CompanyProjects_container'>
      <div className='CompanyProjects__inner'>
        <Header/>
        <header>Odonine add your project</header>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="projectName"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
              autoComplete="off" // Add this line
            />
            {errors.name && <div className='formError'>{errors.name}</div>}
          </div>
          <div>
            <button className='todo_royalBlue_button' type="submit">Add Project</button>
          </div>
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
              {projectList.length === 0 ? (
                <p>No projects available</p>
              ) : (
                projectList.map((data, index) => (
                  <input
                    key={index}
                    value={data.projectName}
                    onChange={handleChange}
                    disabled
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyProjects
