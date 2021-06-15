import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import axios from 'axios'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import {HashRouter, Route, Link,Switch, Redirect} from 'react-router-dom'
import LoginForm from "./components/Auth.js";
import Cookies from 'universal-cookie';

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
           axios.get('http://127.0.0.1:8000/api/users',{headers}),
           axios.get('http://127.0.0.1:8000/api/projects',{headers}),
           axios.get('http://127.0.0.1:8000/api/todos',{headers})
       ])
           .then(responseArr => {
               const users= responseArr[0].data.results
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
                <Route exact path='/todos' component={() => <TodoList items={this.state.todos} />}  />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
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