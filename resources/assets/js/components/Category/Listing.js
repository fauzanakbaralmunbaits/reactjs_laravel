import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default class Listing extends Component {
	constructor(){
		super();
		this.state={
			categories:[],
			activePage:1,
			itemsCountPerpage:1,
			totalItemsCount:1,
			pageRangeDisplayed:3,
		}
		this.handlePageChange=this.handlePageChange.bind(this);
	}

	componentDidMount(){
		axios.get('http://localhost:8080/category')
		.then(response=>{
			this.setState({categories:response.data.data});
			// this.setState({
			// 	categories:response.data.data,
			// 	itemsCountPerpage:response.data.per_page,
			// 	totalItemsCount:response.data.total,
			// 	activePage:response.data.current_page,
			// });
		});
	}

	handlePageChange(pageNumber){
		console.log(`active page is ${pageNumber}`);
		// this.setState({activePage: pageNumber});
		axios.get('http://localhost:8080/category?page='+pageNumber)
		.then(response=>{
			this.setState({
				categories:response.data.data,
				itemsCountPerpage:response.data.per_page,
				totalItemsCount:response.data.total,
				activePage:response.data.current_page,
			});
		});
	}

	onDelete(category_id){
		axios.delete('http://localhost:8080/category/delete/'+category_id)
		.then(response=>{

			var categories = this.state.categories;

			for(var i = 0; i<categories.length; i++){
				if (categories[i].id==category_id) {
					categories.splice(i,1);
					this.setState({categories:categories});
				}
			}

		});
	}

    render() {
        return (
            <div>
            <br />
            	<table className="table">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">Category Name</th>
				      <th scope="col">Status</th>
				      <th scope="col">Created At</th>
				      <th scope="col">Updated At</th>
				      <th scope="col">Action</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{
				  		this.state.categories.map(category =>{
			  			return(
						    <tr>
						      <th scope="row">{category.id}</th>
						      <td>{category.name}</td>
						      <td>{category.active=1?("Active"):("InActive")}</td>
						      <td>{category.created_at}</td>
						      <td>{category.updated_at}</td>
						      <td>
						      	<Link to={`/category/edit/${category.id}`}>Edit </Link>|
						      	<a href="#" onClick={this.onDelete.bind(this,category.id)}> Delete</a>
						      </td>
						    </tr>
			    			)
				    	})
					}
				  </tbody>
				</table>

				{/*
				<div className='d-flex justify-content-center'>
				<Pagination
					activePage={this.state.activePage}
					itemsCountPerpage={this.state.itemsCountPerpage}
					totalItemsCount={this.state.totalItemsCount}
					pageRangeDisplayed={this.state.pageRangeDisplayed}
					onChange={this.handlePageChange}
					itemClass='page-item'
					linkClass='page-link'
				/>
				</div>
				*/}

            </div>
        );
    }
}