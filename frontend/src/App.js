import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import axios from 'axios'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import {HashRouter, BrowserRouter, Route, Link,Switch, Redirect} from 'react-router-dom'
import LoginForm from "./components/Auth.js";
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'token': '',
           'user_token':'',

       }
   }

    set_token(token,user) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('user_token', user)
    this.setState({'token': token},()=>this.load_data())
    this.setState({'user_token':user})

    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
    this.set_token('','')
    this.load_data()
    }


    createProject(name, user) {
    const headers = this.get_headers()
    const data = {name: name, user: user}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
        .then(response => {
          let new_project = response.data
          const user = this.state.users.filter((item) => item.id === new_project.user)[0]
          new_project.user = user
          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
    }

    deleteProject(id) {
    const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
             this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
     }
    createTodo(description, project, user) {
    const headers = this.get_headers()
    const data = {description: description, user_create: user, project: project}
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
        .then(response => {
          let new_todo = response.data
          // const project = this.state.projects.filter((item) => item.id === new_todo.project)[0]
          const user = this.state.users.filter((item) => item.id === new_todo.user)[0]
          // new_todo.project = project
          new_todo.user_create = user

          this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
    }




    deleteTodo(id) {
    const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
             this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
     }

    searchProject(name){
        this.setState(
    {
    'projects': []
    })
    }

    get_token_from_storage() {
    const cookies = new Cookies()
        const user_token= cookies.get('user_token')
    const token = cookies.get('token')
    this.setState({'user_token':user_token,'token': token},()=>this.load_data())

    }

    get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'],username)
    },this.load_data()).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
          'Content-Type': 'application/json'
        }
      if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
      }

    load_data(){
       const headers = this.get_headers()
           axios.all([
           // axios.get('http://127.0.0.1:8000/api/2.0/users',{headers}),
           axios.get('http://127.0.0.1:8000/graphql/?query={allUsers{id username birthdayYear }}',{headers}),
           axios.get('http://127.0.0.1:8000/api/projects',{headers}),
           axios.get('http://127.0.0.1:8000/api/todos',{headers})
       ])
           .then(responseArr => {
               const users= responseArr[0].data.data.allUsers
               const projects = responseArr[1].data.results
               const todos = responseArr[2].data.results
                this.setState(
                    {
                        'users': users,
                        'projects': projects,
                        'todos': todos
                    }
                )
           }).catch(error => {
               this.setState(
                   {
                       'users': [],
                       'projects': [],
                       'todos': [],
                   }
               )
           })


    }

    componentDidMount() {
        this.get_token_from_storage()
    }


  render() {
    return (
      <div className="App">
        <HashRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
                <li>
                <Link to='/todos'>Todos</Link>
              </li>
              <li> User: {this.state.user_token} - {this.is_authenticated() ? <button onClick={()=>
                    this.logout()}> Выйти</button> : <Link to='/login'>Войти</Link>}
              </li>
            </ul>
          </nav>
            <Switch>
              <Route exact path='/' component={() => <UserList users={this.state.users} />}  />
                  <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects} users={this.state.users} createTodo={(description, project,user) => this.createTodo(description, project, user)} />} />}  />
                <Route exact path='/todos' component={() => <TodoList items={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)}/>}  />
                <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, user) => this.createProject(name, user)} />} />}  />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
                <Route exact path='/login' component={() =>
                    <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                <Route path="/user/:id">
                    <ProjectList items={this.state.projects} />
                </Route>
                  <Redirect from='/users' to='/' />
                <Route component={NotFound404} />
            </Switch>
        </HashRouter>
      </div>
    )
  }

}


export default App;