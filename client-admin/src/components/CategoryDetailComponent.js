import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {

    static contextType = MyContext ; // using this . context to access global state

    constructor(props){
        super(props);
        this.state = {
            txtID: '',
            txtName: ''
        };
    }

    render(){
        return (
            <div className ="float-right">
                <h2 className="text-center">CATEGORY DETAIL</h2>
                <form className='form-container'>
                    <div class="mb-3 row">
                        <label for="staticID" class="col-sm-2 col-form-label">ID</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticID" value={ this.state.txtID } onChange={(e) => { this.setState({ txtID: e.target.value }) }}/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={ this.state.txtName } onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnAddClick(e)}>ADD NEW</button>
                        <button type="submit" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnUpdateClick(e)}>UPDATE</button>
                        <button type="submit" class="btn btn-primary m-2 table-button" onClick={(e) => this.btnDeleteClick(e)}>DELETE</button>
                    </div>
                </form>
            </div>
        );
    }

    // event-handlers
    btnAddClick(e){
        e.preventDefault();
        const name = this.state.txtName;
        if(name){
            const cate = { name: name };
            this.apiPostCategory(cate);
        } else {
            alert('Please input name');
        }
    }

    btnUpdateClick(e){
        e.preventDefault();
        const id = this.state.txtID;
        const name = this.state.txtName;
        if(id && name){
            const cate = { name: name };
            this.apiPutCategory(id, cate);
        } else {
            alert('Please input id and name');
        }
    }

    btnDeleteClick(e){
        e.preventDefault();
        if(window.confirm('ARE YOU SURE?')){
            const id = this.state.txtID;
            if(id){
                this.apiDeleteCategory(id);
            } else {
                alert('Please input id');
            }
        }
    }

    // apis
    apiPostCategory(cate){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/admin/categories', cate, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetCategories();
            } else {
                alert('SORRY BABY!');
            }
        });
    }

    apiGetCategories(){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/categories', config).then((res) => {
            const result = res.data;
            this.props.updateCategories(result);
        });
    }

    apiPutCategory(id, cate){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
            const result = res.data;
            if(result){
                alert('OK BABY!');
                this.apiGetCategories();
            } else {
                alert('SORRY BABY!');
            }
        });
    }    

    apiDeleteCategory(id){
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.delete('/api/admin/categories/' + id, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetCategories();
            } else {
                alert('SORRY BABY!');
            }
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.item !== prevProps.item){
            this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
        }
    }
}

export default CategoryDetail; 