import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.user.username}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    let { id } = useParams();
    let filtered_items = projects.filter((project) => project._id == id)

    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>User</th>
            </tr>
            {filtered_items.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList