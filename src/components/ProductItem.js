import React, { Component } from 'react'
import {Link} from 'react-router-dom'



class ProductItem extends Component { 
    render () {

        var {id, name, desc, price, src} = this.props.barang
        
        return (
            <div className="card col-3 m-4 " >
                <img className='card-img-top' src={src} width='250px' alt=''/>
                <div className='card-body' >
                    <h5 className='card-title' >{name}</h5>
                    {/* <p className='card-text'>{desc}</p> */}
                    <p className='card-text'>Rp. {price}</p>
                    <input type='number' className='form-control btn-block'/>
                    <Link to={'/detailproduct/' + id}>
                        <button className='btn btn-outline-primary btn-block m-auto'>Details</button>
                    </Link>
                    <button className='btn btn-primary btn-block'>Add To Cart</button>
                </div>                
            </div>
        )
    }
}

export default ProductItem 