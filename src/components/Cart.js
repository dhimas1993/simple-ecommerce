import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {
    Link,
} from 'reactstrap'



class Cart extends React.Component {

    state = {
        cart: []
    }

    componentDidMount (){
        axios.get(
            'http://localhost:2019/Cart'
            
        ).then (res => {
            this.setState({
                cart: res.data
            })
            console.log(this.state.cart)
        })
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

    deleteCart = ( item ) => {
        var ID= item.id

        axios.delete(
            'http://localhost:2019/Cart/' + ID,
        ).then(res=> {
            console.log('berhasi dihapus');
            console.log({cart: res.data});
            this.getCart()
            
        })
    }

    handleTotalQty = () => {
        var totalQty = 0
        var cart = this.state.cart.map(item => {
            return {
                qty: item.inputCart
            }
        })


        for( var i = 0; i < this.state.cart.length; i++){
            totalQty += parseInt(cart[i].qty)
        }
        
        return (<td>{totalQty}</td>)
    }


    handleTotalPrice = () => {
        var totalPrice = 0
        var cart = this.state.cart.map(item => {
            return {
                price: item.productPrice
            }
        })

        for (let i = 0; i < this.state.cart.length; i++) {
            totalPrice += parseInt(cart[i].price)
            
        }
        return (<td>{totalPrice}</td>)
    }

    

    renderList = () => {
        return this.state.cart.map( item => { // {id, name, price, desc, src}
           
            if(item.idUser === this.props.user.id){
                return (
                    <tr>
                        <td className='text-center'>{item.idUser}</td>
                        <td className='text-center'>{item.productName}</td>
                        <td className='text-center'>{item.productPrice}</td>
                        <td className='text-center'>{item.inputCart}</td>
                        <td className='text-center'>
                            <img src={item.inputGambar} className='' width='65px'></img>
                        </td>
                        <td className='text-center'>{item.productPrice  * item.inputCart}</td>
                        <td className='text-center'>
                            <button className='btn btn-outline-primary'onClick = { () => {this.deleteCart(item)}} > Edit </button>
                            <button className='btn btn-outline-primary ml-2'onClick = { () => {this.deleteCart(item)}} > Delete</button>
                        </td>     
                        
                    </tr> 
                )
            }
        })
    }

    render () {
        return (
            <div className="container ">
                <div className=''>
                    
                        <button className='btn btn-outline-primary mt-2' href='/'>                        
                            Continue Shoping
                        </button>
                    
                    <button className='btn btn-outline-primary mt-2 ml-2' >Checkout</button>
                    <h1 className="display-4 text-center .col-6 .col-sm-4">List Cart</h1>
                </div>                
                <table className="table table-hover mb-5">
                    <thead>
                        <tr className='text-center'>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>NAME</th>                            
                            <th className='text-center'>PRICE</th>
                            <th className='text-center'>Qty</th>
                            <th className='text-center'>PICTURE</th>
                            <th className='text-center'>TOTAL</th>
                            <th className='text-center'>ACTION</th>                            
                        </tr>
                            
                    </thead>

                    <tbody>
                        {this.renderList()}
                        <tr>
                            <td className='text-center'>TOTAL</td>             
                            <td className='text-center'></td>
                            <div className='text-center'>
                                {this.handleTotalPrice()}
                                {this.handleTotalQty()}   
                            </div>
                                                  
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps)(Cart) 