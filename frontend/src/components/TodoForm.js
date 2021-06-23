import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {description: '', project: props.projects[0].id, user_create: props.users[0].id}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleSubmit(event) {
      this.props.createTodo(this.state.description, this.state.project,this.state.user_create)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="description">description</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={(event)=>this.handleChange(event)} />
            </div>

        <div className="form-group">
            <label for="project">project</label>
            <input type="number" className="form-control" name="project" value={this.state.project} onChange={(event)=>this.handleChange(event)} />
            <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.projects.map((project)=><option value={project.id}>{project.name}</option>)}
                        </select>

          </div>

            <div className="form-group">
                <label htmlFor="user">user</label>
                <input type="number" className="form-control" name="user" value={this.state.user_create}
                       onChange={(event) => this.handleChange(event)}/>
                <select name="user" className='form-control' onChange={(event) => this.handleChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>
            </div>

          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default TodoForm

