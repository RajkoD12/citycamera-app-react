import React from 'react';
import { toast } from 'react-toastify';
import { userService } from '../../services/user.service';
import { sessionService } from '../../sessionService/storage';
import { Link, Redirect } from 'react-router-dom';

export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.options = {
            autoClose: 3000,
            hideProgressBar: true,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        userService.login(user)
            .then(response => {
                console.log('this',this)
                sessionService.create(response.data);
                if (sessionService.isAuth()) {
                    this.setState({ redirectToReferrer: true })
                    this.props.history.push("/dashboard");
                    toast.success("User is successfully loged !", this.options)
                }
            }).catch(error => {
                toast.error("Error Wrong username or password!", this.options)
            });
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 3;
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state;

        console.log('redirectToReferrer', redirectToReferrer, this.state)

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="container">
            <div className="auth-page">
                <h1>Login page</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>  Username:</label>
                        <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange} />

                    </div>
                    <div className="form-group">
                        <label>  Password:</label>
                        <input className="form-control" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-primary" disabled={!this.validateForm()} >Login</button>
                </form>
                <br />
                <Link to='/register'>Register</Link>
                </div>
            </div>
        );
    }
}
