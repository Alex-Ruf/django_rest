import React from 'react'


const AuthorItem = ({author}) => {
   return (
       <tr>
           <td>
               {author.id}
           </td>
           <td>
               {author.username}
           </td>
           <td>
               {author.birthday_year}
           </td>
       </tr>
   )
}

const AuthorList = ({authors}) => {
    return (
        <table>

            <th>ID</th>
            <th>NAME</th>
            <th>birthday year</th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}



export default AuthorList