import React, { Component } from 'react';
import axios from 'axios';
// import Modal from 'react-modal';

class EditProduct extends Component {
	state = {
		name: '',
		description: '',
		image: '',
		id_category: '',
		quantity: ''
	};

	componentDidMount = async () => {
		const id = this.props.match.params.id;
		await axios.get('/products/' + id).then((res) =>
			this.setState({
				name: res.data.data[0]['name'],
				description: res.data.data[0]['description'],
				image: res.data.data[0]['image'],
				id_category: res.data.data[0]['id_category'],
				quantity: res.data.data[0]['quantity']
			})
		);
		console.log(this.state);
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = async (e) => {
		var token = localStorage.getItem('auth');
		const id = this.props.match.params.id;
		e.preventDefault();
		console.log(this.state);
		await axios.put('/products/' + id, this.state, {
			headers: {
				authorization: 'Dello ' + token //the token is a variable which holds the token
			}
		});
		this.props.history.push('/Product');
	};
	handlerSelect = (e) => {
		this.setState({ [e.target.name]: Number(e.target.options[e.target.selectedIndex].value) });
	};

	render() {
		const { name, description, image, id_category, quantity } = this.state;
		return (
			<div className="container">
				<h2>Edit Products</h2>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tbody>
							<tr>
								<td>Name</td>
								<td>
									<input type="text" name="name" value={name} onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Description</td>
								<td>
									<input
										type="text"
										name="description"
										value={description}
										onChange={this.handlerChange}
									/>
								</td>
							</tr>
							<tr>
								<td>Image</td>
								<td>
									<input type="text" name="image" value={image} onChange={this.handlerChange} />
								</td>
							</tr>
							<tr>
								<td>Category</td>
								<td>
									<select
										id="list"
										name="id_category"
										value={id_category}
										onChange={this.handlerSelect}
									>
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
									<input
										type="number"
										name="quantity"
										value={quantity}
										min="0"
										onChange={this.handlerChange}
									/>
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

export default EditProduct;
