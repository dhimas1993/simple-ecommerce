import React from 'react';
import axios from 'axios'

class Cart extends React.Component {

    state = {
        cart: []
    }

    componentDidMount (){
        this.getCart()
    }

    getCart = ()=> {
        axios.get(
            'http://localhost:2019/Cart'
        ).then (res => {
            this.setState({
                cart: res.data
            })
        })
    }

    renderList = () => {
        return this.state.cart.map( item => { // {id, name, price, desc, src}
            return (
                <tr>
                    <td>{item.idUser}</td>
                    <td>{item.productName}</td>
                    <td>{item.productPrice}</td>
                    <td>{item.inputCart}</td>
                    
                </tr>
            )
        })
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderList()}
                        
                    </tbody>

                </table>
            </div>
        )
    }
}




export default Cart 