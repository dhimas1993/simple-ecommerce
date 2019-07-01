import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import 
    { 
        Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup 
    } from 'reactstrap';


class ManageProduct extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            editProduk: '',
            modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }

    toggle() {        
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        
    }

    componentDidMount(){
        // Akses database
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/products')
            .then(res => {
               this.setState({products: res.data})
            })
    }



    deleteProduct = (item) => {
        var  ID= item.id

        axios.delete(
            'http://localhost:2019/products/' + ID,            
            ).then(res => {
                console.log('data berhasil dihapus');                
                this.setState({product: res.data})
                this.getProduct()
            })

    }

    handleEdit = (data) => {
        this.setState({editProduk: data})
        this.toggle()

    }
    
    editProduct = () => {
        const ID = this.state.editProduk.id
        const inputName = this.name.value
        const inputDesc = this.desc.value
        const inputPrice = Number(this.price.value)
        const inputPict = this.pict.value       

        axios.put(
            'http://localhost:2019/products/' + ID,
            {
                name: inputName,
                desc: inputDesc,
                price: inputPrice,
                src: inputPict
            }

        ).then(res => {
            this.getProduct()
            
            console.log(res)
            console.log('berhasil berganti')           
            
        }).catch(res => {
            console.log(res)
            console.log('Gagal Akses DB')
        }) 
        this.toggle()
    }


    addProduct = () => {
        const name = this.name.value
        const desc = this.desc.value
        const price = parseInt(this.price.value)
        const pict = this.pict.value

        axios.post(
            'http://localhost:2019/products',
            {
                desc : desc,
                name: name,
                price : price,
                src : pict
            }
        ).then(res => {
            // GET DATA
            this.getProduct()
        })
    }

    renderList = () => {
        return this.state.products.map( item => { // {id, name, price, desc, src}
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td>
                        <img className='list' src={item.src} alt=''/>
                    </td>
                    <td>
                        <button className = 'btn btn-primary' onClick = { () => this.handleEdit (item)}>Edit</button>
                        <button className = 'btn btn-warning' onClick = { ()=>{this.deleteProduct(item)} }>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderBtnEdit() {
        return (
            <div>
                <div>
                    {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Content</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Nama</Label>
                                    <input className='form-control' type="text" ref={input => this.name = input} placeholder=" Nama " defaultValue={this.state.editProduk.name}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Deskripsi</Label>
                                    <input className='form-control' type="text" ref={input => this.desc = input} placeholder=" deskripsi " defaultValue={this.state.editProduk.desc}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Price</Label>
                                    <input className='form-control' type="text" ref={input => this.price = input} placeholder=" Harga " defaultValue={this.state.editProduk.price}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Picture</Label>
                                    <input className='form-control' type="text" ref={input => this.pict = input} placeholder="Gambar" defaultValue={this.state.editProduk.src}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick = {this.editProduct}>Ok</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
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
                        {this.renderBtnEdit()}
                    </tbody>

                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        <tr>                            
                            <th scope="col"><input ref={input => this.name = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.price = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.pict = input} className="form-control" width='40px' type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect (mapStateToProps) (ManageProduct)