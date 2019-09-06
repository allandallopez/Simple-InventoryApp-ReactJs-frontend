import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: ''
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state);
		await axios.post('/register', this.state);
		this.props.history.push('/');
	};

	handlerSelect = (e) => {
		this.setState({ [e.target.name]: Number(e.target.options[e.target.selectedIndex].value) });
	};

	render() {
		return (
			<div className="container">
				<h1>Register</h1>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
							<tr>
								<td>Username</td>
								<td>
									<input type="text" name="username" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Password</td>
								<td>
									<input type="password" name="password" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>
									<input type="text" name="email" onChange={this.handlerChange} />
								</td>
							</tr>

							<td>
								<input type="submit" value="Register" className="btn btn-primary" />
							</td>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

export default Register;
