import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {
   return (
       <tr>
           <td>
               {item.id}
           </td>
           <td>
               {item.project}
           </td>
           <td>
               {item.user_create}
           </td>
           <td>
               {item.description}
           </td>
           <td><button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button></td>
       </tr>
   )
}

const TodoList = ({items, deleteTodo}) => {
    return (
        <div>
        <table>

            <th>ID</th>
            <th>name_project</th>
            <th>user</th>
            <th>description</th>
            {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
        </table>
        <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList