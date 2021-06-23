import React from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'

const ProjectItem = ({project,deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.user.username}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    let { id } = useParams();
    let filtered_items = projects.filter((project) => project._id == id)

    return (
        <div>

        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>User</th>
                <th></th>
            </tr>
            {filtered_items.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList