import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component {
	state = {
		name: '',
		description: '',
		image: '',
		id_category: '',
		quantity: ''
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async (e) => {
		var token = localStorage.getItem('auth');
		e.preventDefault();
		console.log(this.state);
		await axios.post('/products', this.state, {
			headers: {
				authorization: 'Dello ' + token //
			}
		});
		this.props.history.push('/Product');
	};

	handlerSelect = (e) => {
		this.setState({ [e.target.name]: Number(e.target.options[e.target.selectedIndex].value) });
	};

	render() {
		return (
			<div className="container">
				<h2>Add Product</h2>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									<input type="text" name="name" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Description</td>
								<td>
									<input type="text" name="description" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Image</td>
								<td>
									<input type="text" name="image" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Category</td>
								<td>
									<select id="list" name="id_category" onChange={this.handlerSelect}>
										<option>Select</option>
										<option value="1">Car</option>
										<option value="2">Motocycle</option>
										<option value="6">Outfit</option>
										<option value="7">food</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>Quantity</td>
								<td>
									<input type="number" name="quantity" min="0" onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td />
								<td>
									<input type="submit" value="Add" className="btn btn-primary" />
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

export default AddProduct;
