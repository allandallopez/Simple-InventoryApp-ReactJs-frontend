import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
	state = {
		email: '',
		password: '',
		token: ''
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state);
		await axios.post('/login', this.state).then((response) =>
			this.setState({
				token: response.data.token
				// this.props.history.push('/Product');
			})
		);
		console.log(this.state.token);

		localStorage.setItem('auth', this.state.token);
		this.props.history.push('/Product');
	};

	handlerSelect = (e) => {
		this.setState({ [e.target.name]: Number(e.target.options[e.target.selectedIndex].value) });
	};

	render() {
		return (
			<div className="container">
				<h1>Login</h1>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
							<tr>
								<td>Email</td>
								<td>
									<input type="text" name="email" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Password</td>
								<td>
									<input type="password" name="password" onChange={this.handlerChange} />
								</td>
							</tr>

							<td>
								<input type="submit" value="Login" className="btn btn-primary" />
							</td>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

export default Login;
