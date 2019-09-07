import React, { Component } from 'react';
import axios from 'axios';
import CardProduct from './CardProduct';

export class Product extends Component {
	state = {
		product: [],
		sort: localStorage.getItem('sort') || 'asc',
		limit: localStorage.getItem('limit') || 6,
		sortBy: localStorage.getItem('sortBy') || 'id',
		page: localStorage.getItem('page') || 1,
		search: localStorage.getItem('search')
	};

	componentDidMount = async () => {
		const { sort, sortBy, limit, page, search } = this.state;
		await axios
			.get(`/products?sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}&search=%${search}%`)
			.then((response) =>
				this.setState({
					product: response.data.data
				})
			);
		console.log(this.state);
	};

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = () => {
		localStorage.setItem('sortBy', this.state.sortBy);
		localStorage.setItem('sort', this.state.sort);
		localStorage.setItem('limit', this.state.limit);
		localStorage.setItem('page', this.state.page);
		localStorage.setItem('search', this.state.search);
	};

	render() {
		const renderData = this.state.product.map((product) => {
			return <CardProduct Product={product} search={product.id} refresh={() => this.forceUpdate()} />;
		});
		return (
			<div className="container">
				<h2> </h2>

				<form onSubmit={this.handlerSubmit}>
					<table>
						<tr>
							<td>
								<select
									class="mdb-select md-form"
									id="list"
									name="sortBy"
									value={this.state.sortBy}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">SELECT</option>
									<option value="id">ID</option>
									<option value="name">NAME</option>
									<option value="category">CATEGORY</option>
									<option value="quantity">QUANTITY</option>
								</select>
							</td>
							<td>
								<select
									id="list"
									name="limit"
									value={this.state.limit}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">SELECT</option>
									<option value="3">3</option>
									<option value="6">6</option>
									<option value="9">9</option>
									<option value="12">12</option>
									<option value="18">18</option>
								</select>
							</td>
							<td>
								<select
									id="list"
									name="page"
									value={this.state.page}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">SELECT</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</select>
							</td>
							<td>
								<select
									id="list"
									name="sort"
									value={this.state.sort}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">SELECT</option>
									<option value="asc">ASCENDING</option>
									<option value="desc">DESCENDING</option>
								</select>
							</td>

							<td>
								<input
									placeholder="Search here.."
									type="text"
									name="search"
									value={this.state.search}
									className="form-control"
									onChange={this.handlerChange}
								/>
							</td>

							<td />
							<td>
								<input type="submit" value="Show" className="btn btn-info" />
							</td>
						</tr>
					</table>
				</form>
				<div className="container">
					<div className="row">{renderData}</div>
				</div>
			</div>
		);
	}
}

export default Product;
