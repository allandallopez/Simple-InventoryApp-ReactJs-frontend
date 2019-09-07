import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const CardProduct = (props) => {
	async function deleteProduct() {
		await axios.delete('/products/' + props.Product.id);
	}

	return (
		<div className="col-md-4 card" style={{ margin: 7 }}>
			<img
				src={props.Product.image}
				onError={() => {
					props.Product.image =
						'https://cdn4.vectorstock.com/i/1000x1000/18/93/silhouette-modern-car-vector-4951893.jpg';
					props.refresh();
				}}
			/>
			<h3>{props.Product.name}</h3>
			<p>Quantity : {props.Product.quantity}</p>
			<p>Category: {props.Product.category}</p>
			<p>Date Added : {props.Product.date_added}</p>
			<hr />
			<div className="text-center">
				<Link to={'/edit/' + props.Product.id}>
					<Button variant="outline-info" style={{ margin: 7 }}>
						Edit
					</Button>
				</Link>
			</div>
			<Link to={'/'} />
			<Button variant="info">Detail</Button>
			<br />
			<Link to={'/'} />
			<Button variant="danger" onClick={deleteProduct}>
				Delete
			</Button>
		</div>
	);
};

export default CardProduct;
