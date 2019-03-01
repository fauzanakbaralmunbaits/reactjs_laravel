import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {

    constructor(props){
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            category_name:''
        }
    }

    componentDidMount(){
		axios.get('http://localhost:8080/category/edit/'+this.props.match.params.id)
		.then(response=>{
			this.setState({category_name:response.data.name});
		});
	}

    onChangeCategoryName(e){
        this.setState({
            category_name:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const category ={
            category_name : this.state.category_name
        }

        axios.put('http://localhost:8080/category/update/'+this.props.match.params.id, category)
        .then(res=>console.log(res.data));
    }

    render() {
        return (
            <div>
            <br />
            	<form onSubmit={this.onSubmit}>
				  <div className="form-group">
				    <label for="exampleInputEmail1">Category</label>
				    <input type="text" 
                    className="form-control" 
                    id="category_name" 
                    value={this.state.category_name}
                    onChange={this.onChangeCategoryName}
                    placeholder="Enter Category" />
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
            </div>
        );
    }
}