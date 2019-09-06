import React, { Component } from 'react';
import axios from 'axios';
import CardProduct from './CardProduct';

export class FilterData extends Component {
	state = {
		product: [],
		sort: localStorage.getItem('sort') || 'asc',
		limit: localStorage.getItem('limit') || 9,
		sortBy: localStorage.getItem('sortBy') || 'id',
		page: localStorage.getItem('page') || 1,
		key: localStorage.getItem('key') || '%%'
	};
	async componentDidMount() {
		console.log(this.state);
		const { sort, limit, sortBy, page, key } = this.state;
		await axios
			.get(`/products?sort=${sort}&limit=${limit}&sortBy=${sortBy}&page=${page}&key=%${key}%`)
			.then((res) =>
				this.setState({
					product: res.data.data
				})
			);
		console.log(this.state);
	}

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlerSubmit = () => {
		localStorage.setItem('sortBy', this.state.sortBy);
		localStorage.setItem('sort', this.state.sort);
		localStorage.setItem('limit', this.state.limit);
		localStorage.setItem('page', this.state.page);
		localStorage.setItem('key', this.state.key);
	};

	render() {
		const renderData = this.state.product.map((product) => {
			return <CardProduct product={product} key={product.id} refresh={this.componentDidMount} />;
		});
		return (
			<div className="container">
				<h2>Home</h2>

				<form onSubmit={this.handlerSubmit}>
					<table>
						{/* <tbody> */}
						<tr>
							<td>
								<select
									id="list"
									name="sortBy"
									value={this.state.sortBy}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">----- SORT BY -----</option>
									<option value="id">sort by - ID</option>
									<option value="name">sort by - NAME</option>
									<option value="category">sort by - CATEGORY</option>
									<option value="quantity">sort by - QUANTITY</option>
								</select>
							</td>
							{/* </tr> */}
							{/* <tr> */}
							{/* <td>limit</td> */}
							<td>
								<select
									id="list"
									name="limit"
									value={this.state.limit}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">----- LIMIT -----</option>
									<option value="3">limit - 3</option>
									<option value="6">limit - 6</option>
									<option value="9">limit - 9</option>
									<option value="12">limit - 12</option>
									<option value="18">limit - 18</option>
								</select>
							</td>
							{/* </tr> */}
							{/* <tr> */}
							{/* <td>page</td> */}
							<td>
								<select
									id="list"
									name="page"
									value={this.state.page}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">----- PAGE -----</option>
									<option value="1">page - 1</option>
									<option value="2">page - 2</option>
									<option value="3">page - 3</option>
									<option value="4">page - 4</option>
									<option value="5">page - 5</option>
								</select>
							</td>
							{/* </tr> */}
							{/* <tr> */}
							{/* <td>Sort</td> */}
							<td>
								<select
									id="list"
									name="sort"
									value={this.state.sort}
									className="form-control"
									onChange={this.handlerChange}
								>
									<option value="">----- SORT -----</option>
									<option value="asc">ASCENDING</option>
									<option value="desc">DESCENDING</option>
								</select>
							</td>
							{/* </tr> */}
							{/* <tr> */}
							{/* <td>Search</td> */}
							<td>
								<input
									type="text"
									name="key"
									value={this.state.key}
									className="form-control"
									onChange={this.handlerChange}
								/>
							</td>
							{/* </tr> */}
							{/* <tr> */}
							<td />
							<td>
								<input type="submit" value="Show" className="btn btn-success" />
							</td>
						</tr>
						{/* </tbody> */}
					</table>
				</form>
				<div className="container">
					<div className="card-title">
						<div className="">{renderData}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FilterData;
