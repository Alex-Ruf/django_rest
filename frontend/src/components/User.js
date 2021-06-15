import React from 'react'
import {Link} from 'react-router-dom'

const UserItem = ({user}) => {
   return (
       <tr>
           <td>
               <Link to={`user/${user.id}`}>{user.id}</Link>
           </td>
           <td>
               {user.username}
           </td>
           <td>
               {user.birthday_year}
           </td>
       </tr>
   )
}

const UserList = ({users}) => {
    return (
        <table>

            <th>ID</th>
            <th>NAME</th>
            <th>birthday year</th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}



export default UserList