import React,{useEffect, useState} from 'react'
import './Tasks.css'
import SvgColor from '../../components/svgColor/svgColor'
import AddIcon from '../../assets/icons/Plus Icon.png'
import Model from '../../components/model/model'
import CloseIcon from '../../assets/icons/close.png'
import { Link, useParams } from 'react-router-dom'
import { useSelector ,useDispatch} from 'react-redux'
import { getTasksLoading,getTasks,createTaskLoading,updateTaskLoading,deleteTaskLoading,getTask } from '../../selectors/selectors'
import { getAllTasks,createTask,updateTask,deleteTask } from '../../actions/task'
import Loader from '../../components/loader/loader'
import Moment from 'moment'

function Tasks() {
    const [taskName,setTaskName] = useState("");
    const [taskDescription,setTaskDescription] = useState("");
    const [taskStatus,setTaskStatus] = useState("Pending");
    const [taskId,setTaskId] = useState("");
    const [showCreateModel,setShowCreateModel] = useState(false);
    const [showUpdateModel,setShowUpdateModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector(getTasksLoading);
    const createLoading = useSelector(createTaskLoading);
    const updateLoading = useSelector(updateTaskLoading);
    const deleteLoading = useSelector(deleteTaskLoading);
    const tasksDatas = useSelector(getTasks);
    const tasksData = useSelector(getTask);
    const projectId = useParams().id;
    


    useEffect(() => {
        if(tasksDatas.length == 0){
            dispatch(getAllTasks(projectId))
        }
    },[])

    console.log('tasksDatas',tasksDatas);



     console.log('showDeleteModel',showDeleteModel);
     
     
    

    const handleChange = (e) => {
        const {name,value} = e.target;
        if(name === "taskName"){
            setTaskName(value)
        }
        if(name === "taskDescription"){
            setTaskDescription(value)
        }
        if(name === "taskStatus"){
            setTaskStatus(value)
        }
    }
    const handleCreateTask = () => {
        console.log('Task created');
        dispatch(createTask(projectId,{
            taskName,
            taskDescription,
            taskStatus
        }))
        if(!createLoading){
            setShowCreateModel(false)
            setTaskName("")
            setTaskDescription("")
            setTaskStatus("Pending")
        }
    }


    const handleShowUpdateModel = (id) => {
        setTaskId(id)
        const task = tasksDatas.find((task) => task._id === id);
        setTaskName(task.taskName)
        setTaskDescription(task.taskDescription)
        setTaskStatus(task.taskStatus)
        setShowUpdateModel(true)
    }

    const handleShowDeleteModel = (id) => {
        setTaskId(id)
        setShowDeleteModel(true)
    }


    const handleUpdateTask = () => {
        console.log('Task updated');
        dispatch(updateTask(taskId,{
            taskName,
            taskDescription,
            taskStatus
        }))
        if(!updateLoading){
            setShowUpdateModel(false)
            setTaskName("")
            setTaskDescription("")
            setTaskStatus("Pending")
            setTaskId("")
        }
    }
    const handleDeleteTask = () => {
        console.log('Task deleted');
        dispatch(deleteTask(taskId))
        if(!deleteLoading){
            setShowDeleteModel(false)
            setTaskName("")
            setTaskDescription("")
            setTaskStatus("Pending")
            setTaskId("")
        }
        
    }

  return (
    <div className='tasks' >

      <div className='tasks-wrapper'>
        
        <div className='tasks-header' >
            <h3>Tasks</h3>
            <div className='tasks-header-button'>
            
            <div className='create-btn' onClick={()=>setShowCreateModel(true)} >
            <img src={AddIcon} alt="Add Icon" className='addIcon' />
            <p>Create Tasks</p>
            </div>
            </div>
        </div>

        <div className='tasks-content'>
            <div className='tasks-cards-list'>  
            {
                !loading ?
                <div className='tasks-cards-wrapper'>
                    { tasksDatas.length ==0  ?
                    <div className='no-data'>
                        <h3>No Tasks Found</h3>
                    </div>
                    :
                    tasksDatas?.map((task,index)=>(
                        <div className='tasks-card' key={index} >
                            <div className='tasks-card-header' >
                                <h3>{task.taskName}</h3>
                                <p>{task.taskDescription}</p>
                            </div>
                            <div className={`tasks-card-status ${task.taskStatus}`} >
                                {task.taskStatus}
                             </div>   
                            <div className='tasks-card-content'>
                                <p>{task.taskDescription}</p>
                            </div>
                            <div className='tasks-card-footer'>
                                <button className='update-btn' onClick={()=>handleShowUpdateModel(task._id)} >Update</button>
                                <button className='delete-btn' onClick={()=>handleShowDeleteModel(task._id)} >Delete</button>
                               
                            </div>
                            <p className='created-date'>Created on {Moment(task.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                    ))

                    }
                    </div>:
                    <div className='tasks-loader'>
                      <Loader/>
                    </div>
            }
           
            </div>
            </div>

            {
                showDeleteModel && 
                <Model setShowDeleteModel={setShowDeleteModel} >
               {
                    deleteLoading ?
                    <Loader/>:
                    <div className='delete-model'>
                    <div className='close-btn' onClick={()=>setShowDeleteModel(false)} >
                        <img src={CloseIcon} alt="Add Icon" className='closeIcon' />
                    </div>
                    <div className='model-header'>
                        <h3>Delete Project</h3>
                        <p>Are you sure you want to delete this project?</p>
                    </div>
                    <div className='model-button'>
                        <button className='cancel-btn' onClick={()=>setShowDeleteModel(false)} >Cancel</button>
                        <button className='delete-btn' onClick={()=>handleDeleteTask()} >Delete</button>
                    </div>
                    </div>
               }
                </Model>
            }

            {
                showCreateModel && 
                <Model setShowCreateModel={setShowCreateModel} >
                    <div className='create-model'> 
                    <div className='close-btn' onClick={()=>setShowCreateModel(false)} >
                        <img src={CloseIcon} alt="Add Icon" className='closeIcon' />
                    </div>
                   <div className='create-header'>
                        <h3>Create Task</h3>
                    </div>
                    <form className='create-form'>
                        <div className='create-form-group'>
                            <label htmlFor="taskName">Task Name</label>
                            <input type="text" id="taskName" placeholder='Enter Task Name' value={taskName} name='taskName'  onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div className='create-form-group'>
                            <label htmlFor="taskDescription">Task Description</label>
                            <input type="text" id="taskDescription" placeholder='Enter Task Description'  value={taskDescription} name='taskDescription' onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div className='create-form-group'>
                            <label htmlFor="taskStatus">Task Status</label>
                            <select id="taskStatus" value={taskStatus} name='taskStatus' onChange={(e)=>handleChange(e)}>   
                            <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className='create-form-btn'>
                            {/* <button className='cancel-btn' onClick={()=>setShowCreateModel(false)} >Cancel</button> */}
                         {
                            createLoading ?
                            <Loader/>:
                            <button className='create-btn' onClick={()=>handleCreateTask()} >Create</button>
                         }
                            </div>
                        </form>
                    
                    </div>
                </Model>
            }
              {
                showUpdateModel && 
                <Model setShowUpdateModel={setShowUpdateModel} >
                    <div className='update-model'> 
                    <div className='close-btn' onClick={()=>setShowUpdateModel(false)} >
                        <img src={CloseIcon} alt="close Icon" className='closeIcon' />
                    </div>
                   <div className='update-header'>
                        <h3>Update Task</h3>
                    </div>
                    <form className='update-form'>
                        <div className='update-form-group'>
                            <label htmlFor="taskName">Task Name</label>
                            <input type="text" id="taskName" placeholder='Enter Task Name' value={taskName} onChange={(e)=>handleChange(e)} name='taskName' />
                        </div>
                        <div className='update-form-group'>
                            <label htmlFor="taskDescription">Task Description</label>
                            <input type="text" id="taskDescription" placeholder='Enter Task Description' value={taskDescription} onChange={(e)=>handleChange(e)} name="taskDescription" />
                        </div>
                        <div className='update-form-group'>
                            <label htmlFor="taskStatus">Task Status</label>
                            <select id="taskStatus" value={taskStatus} onChange={(e)=>handleChange(e)} name="taskStatus" >   
                            <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className='update-form-btn'>
                            {/* <button className='cancel-btn' onClick={()=>setShowCreateModel(false)} >Cancel</button> */}
                           {
                            updateLoading ?
                            <Loader/>:
                            <button className='update-btn' onClick={()=>handleUpdateTask()} >Update</button>
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

export default Tasks