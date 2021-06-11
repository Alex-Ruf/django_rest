import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.work_user}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AUTHOR</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList