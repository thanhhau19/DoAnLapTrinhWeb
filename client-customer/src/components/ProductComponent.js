import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    render(){
        const prods = this.state.products.map((item) => (
            <div key={item._id} className="col-md-3">
              <div className="card p-3">
                <div className="text-center">
                  <Link to={'/product/' + item._id}>
                    <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                  </Link>
                </div>
                <div className="product-details">
                  <span className="font-weight-bold d-block">Price: {item.price}</span>
                  <span>{item.name}</span>
                </div>
                    <Link to={'/product/' + item._id}>
                        <button type="button" class="btn btn-dark">View Products</button>
                    </Link>
              </div>
            </div>
          ));
          
          return (
            <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div class="my-3 py-3">
                <div className="text-center">
                <h2 className="text-center">LIST PRODUCTS</h2>
                  <div className="row justify-content-center g-3">
                  {prods}
                  </div>
                </div>
              </div>
            </div>
          );
              
    }

    componentDidMount(){ // first : / product /...
        const params = this.props.params;
        if(params.cid){
            this.apiGetProductsByCatID(params.cid);
        }else if(params.keyword){
            this.apiGetProductsByKeyword(params.keyword);
        }
    }

    componentDidUpdate(prevProps){ // changed : / product /...
        const params = this.props.params;
        if(params.cid && params.cid !== prevProps.params.cid){
            this.apiGetProductsByCatID(params.cid);
        }else if(params.keyword && params.keyword !== prevProps.params.keyword){
            this.apiGetProductsByKeyword(params.keyword);
        }    
    }

    // apis
    apiGetProductsByCatID(cid){
        axios.get('/api/customer/products/category/' + cid).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }

    apiGetProductsByKeyword(keyword){
        axios.get('/api/customer/products/search/' + keyword).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }
}

export default withRouter(Product);