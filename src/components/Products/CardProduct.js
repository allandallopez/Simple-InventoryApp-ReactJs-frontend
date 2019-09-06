import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function CardProduct({ Product, refresh }) {
	async function deleteProduct() {
		await axios.delete('/products/' + Product.id);
		return refresh();
	}

	return (
		<div className="col-md-4 card" style={{ margin: 7 }}>
			<img src={Product.image} />
			<h3>{Product.name}</h3>
			<p>Quantity : {Product.quantity}</p>
			<p>Category: {Product.category}</p>
			<hr />
			<div className="text-center">
				<Link to={'/edit/' + Product.id}>
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
}

export default CardProduct;
