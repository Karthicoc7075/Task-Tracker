import React, { useEffect, useState } from 'react'
import './projects.css'
import AddIcon from '../../assets/icons/Plus Icon.png'
import Model from '../../components/model/model'
import CloseIcon from '../../assets/icons/close.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProjectsLoading, getProjects, createProjectLoading, deleteProjectLoading } from '../../selectors/selectors'
import { getAllProjects, createProject, deleteProject } from '../../actions/project'
import Loader from '../../components/loader/loader'
import Moment from 'moment';

function Projects() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectId, setProjectId] = useState("");
    const [showCreateModel, setShowCreateModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector(getProjectsLoading);
    const createLoading = useSelector(createProjectLoading);
    const deleteLoading = useSelector(deleteProjectLoading);
    const projectsData = useSelector(getProjects);

    console.log(projectsData);


    useEffect(() => {
        if (projectsData.length == 0) {
            dispatch(getAllProjects())
        }
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "projectName") {
            setProjectName(value)
        }
        if (name === "projectDescription") {
            setProjectDescription(value)

        }
    }

    const handleCreateProject = () => {


        dispatch(createProject({
            projectName,
            projectDescription
        }))
        if (!createLoading) {
            setShowCreateModel(false)
            setProjectName("")
            setProjectDescription("")
        }
    }

    const handleDeleteModel = (id) => {
        setProjectId(id)
        setShowDeleteModel(true)
    }

    const handleDeleteProject = () => {
        dispatch(deleteProject(projectId))
        setShowDeleteModel(false)
    }
    return (
        <div className='projects' >

            <div className='projects-wrapper'>

                <div className='projects-header' >
                    <h3>Projects</h3>
                    <div className='projects-header-button'>

                        <div className='create-btn' onClick={() => setShowCreateModel(true)} >
                            <img src={AddIcon} alt="Add Icon" className='addIcon' />
                            <p>Create Project</p>
                        </div>
                    </div>
                </div>

                <div className='projects-content'>
                    <div className='projects-cards-list'>
                        {
                            !loading ?
                                <div className='projects-cards-wrapper'>
                                    {projectsData.length == 0 ?

                                        <div className='projects-no-data'>
                                            <h3>No Projects Found</h3>
                                            <p>Click on the create button to add a new project</p>
                                        </div>
                                        : projectsData?.map((data, index) => (
                                            <div className='projects-card' key={index} >
                                                <h4>{data.projectName}</h4>
                                                <p>{data.projectDescription}</p>
                                                <div className='projects-card-button' >
                                                    <div className='projects-card-button-edit'>
                                                        <Link to={`/tasks/${data._id}`} > <button className='view-btn'  >View</button></Link>
                                                        <button className='delete-btn' onClick={() => handleDeleteModel(data._id)} >Delete</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='projects-card-date'>{Moment(data.createdAt).fromNow()}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div> :
                                <div className='projects-loader'>
                                    <p>Loading...</p>
                                </div>
                        }

                    </div>
                </div>

                {
                    showDeleteModel &&
                    <Model setShowDeleteModel={setShowDeleteModel} >
                        {
                            deleteLoading ?
                                <div className='delete-model'>
                                    <Loader />
                                </div> :
                                <div className='model-header'>
                                    <div>
                                        <h3>Delete Project</h3>
                                        <p>Are you sure you want to delete this project?</p>
                                    </div>
                                    <div className='model-button'>
                                        <button className='cancel-btn' onClick={() => setShowDeleteModel(false)} >Cancel</button>
                                        <button className='delete-btn' onClick={() => handleDeleteProject()} >Delete</button>
                                    </div>
                                </div>
                        }
                    </Model>
                }

                {
                    showCreateModel &&
                    <Model setShowCreateModel={setShowCreateModel} >
                        <div className='create-model'>
                            <div className='close-btn' onClick={() => setShowCreateModel(false)} >
                                <img src={CloseIcon} alt="Add Icon" className='closeIcon' />
                            </div>
                            <div className='create-header'>
                                <h3>Create Project</h3>
                            </div>
                            <form className='create-form'>
                                <div className='create-form-group'>
                                    <label htmlFor="taskName">Project Name</label>
                                    <input type="text" id="taskName" placeholder='Enter Task Name' name='projectName' onChange={(e) => handleChange(e)} value={projectName} />
                                </div>
                                <div className='create-form-group'>
                                    <label htmlFor="taskDescription">Project Description</label>
                                    <input type="text" id="taskDescription" placeholder='Enter Task Description' name='projectDescription' onChange={(e) => handleChange(e)} value={projectDescription} />
                                </div>

                                <div className='create-form-btn'>

                                    {
                                        createLoading ?
                                            <button className='create-btn' disabled >Creating...</button> :
                                            <button className='create-btn' onClick={() => handleCreateProject()} >Create</button>
                                    }
                                </div>
                            </form>

                        </div>
                    </Model>
                }
            </div>
        </div>
    )
}

export default Projects