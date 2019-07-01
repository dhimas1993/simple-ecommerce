import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import Header from './Header'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'
import Cookies from 'universal-cookie'


import {keepLogin} from '../actions'

// localhost:3000/register
const cookie = new Cookies()


class App extends Component {

    componentDidMount(){
        //check cookie
        const objCookie = cookie.get('userName') //kalau tidak ditemukan itu hasilnya undifined

        if(objCookie !== undefined) {
            //login ulang 
            this.props.keepLogin(objCookie)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/> {/* equal, ===  */}
                    <Route path="/register" component={Register}/> {/* include() */}
                    <Route path="/login" component={Login}/> {/* include() */}
                    <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
                    <Route path='/detailproduct/:product_id' component={DetailProduct}/>
                </div>
            </BrowserRouter>
        )
    }
}


export default connect(null,{keepLogin}) (App)