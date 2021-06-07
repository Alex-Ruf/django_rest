import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import axios from 'axios'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import {HashRouter, Route, Link,Switch, Redirect} from 'react-router-dom'

class App extends React.Component {

   constructor(props) {
       super(props)
       this.state = {
           'authors': [],
           'projects': [],
           'todos': []

       }
   }


componentDidMount() {
   axios.all([
       axios.get('http://127.0.0.1:8000/api/authors'),
       axios.get('http://127.0.0.1:8000/api/projects'),
       axios.get('http://127.0.0.1:8000/api/todos')
   ])
       .then(responseArr => {
           const authors = responseArr[0].data.results
           const projects = responseArr[1].data.results
           const todos = responseArr[2].data.results
            this.setState(
                {
                    'authors': authors,
                    'projects': projects,
                    'todos': todos
                }
            )
       }).catch(error => console.log(error))
}

  render() {
    return (
      <div className="App">
        <HashRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Authors</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
                <li>
                <Link to='/todos'>Todos</Link>
              </li>
            </ul>
          </nav>
          <Route exact path='/' component={() => <AuthorList authors={this.state.authors} />}  />
            <Route exact path='/todos' component={() => <TodoList items={this.state.todos} />}  />
          <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
        </HashRouter>
      </div>
    )
  }

}


export default App;