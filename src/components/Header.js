import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import { onLogoutUser } from '../actions'

import {
    Button,
    Badge,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      onButtonClick = () => {
          // menghapus username dari redux state
          this.props.onLogoutUser()
      }

    render () {
        if(this.props.user.username === ''){
            // Render ketika belum login
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/' >All Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 
        
        // Render setelah login
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2 wh' >
                        <Link to='/' >All Products</Link>
                    </NavItem>
                    <NavItem>
                          
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hi {this.props.user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link to='/manageproduct'>Manage Product</Link>
                        </DropdownItem>
                        <DropdownItem>
                            <Link to="/cart" className=''>Shoping Cart<Badge color="secondary" className='ml-1'>4</Badge></Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <Button className='dropdown-item' href='/login' onClick={this.onButtonClick}>
                            Logout
                        </Button>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>     
          );
        }
    }


const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)