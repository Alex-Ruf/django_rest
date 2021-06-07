import React from 'react'


const TodoItem = ({item}) => {
   return (
       <tr>
           <td>
               {item.id}
           </td>
           <td>
               {item.project}
           </td>
           <td>
               {item.description}
           </td>
       </tr>
   )
}

const TodoList = ({items}) => {
    return (
        <table>

            <th>ID</th>
            <th>name</th>
            <th>description</th>
            {items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default TodoList