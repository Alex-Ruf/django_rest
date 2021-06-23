import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {name: '', user: props.users[0].id}
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
      this.props.createProject(this.state.name, this.state.user)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="login">name</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
            </div>

        <div className="form-group">
            <label for="user">user</label>
            <input type="number" className="form-control" name="user" value={this.state.user} onChange={(event)=>this.handleChange(event)} />
            <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                            {this.props.users.map((user)=><option value={user.id}>{user.username}</option>)}
                        </select>
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default ProjectForm

