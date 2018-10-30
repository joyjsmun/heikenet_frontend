import React, { Component } from 'react';
import {DropdownButton,MenuItem} from 'react-bootstrap';
import  {Link,NavLink,Redirect} from 'react-router-dom';
import 'styles/SignIn.scss';
import {Image} from 'react-bootstrap';
import axios from 'axios';

class SignUpFormFreelancer extends Component {
    constructor() {
        super();

        this.state = {
            email : '',
            password : '',
            rate :'',
            currency :'',
            wallet_address :'',
            hasAgreed: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]:value
        });
    }

 
    handleSubmit(e) {
        e.preventDefault();
        
       console.log('The form was submitted with the following data:');
       console.log(this.state);
       axios.post('https://heike-net.herokuapp.com/api/v1/login',{
        name:this.state.email,
        password:this.state.password,
        // need to add more data to send to the server
        
    }).then(function (res) {
        console.log(res);
        
        if(res.data === 'ok'){
            console.log("signup success");
            
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log('unauthorized, logging out ...');
      });
       
   }

    render() {
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/userinfo'/>;
        }

        return (
            <div className="Background">
                <div className="App__Aside">
                <h1><Image src="assets/logo2.svg" />HeikeNet</h1>
                </div>
                <div className="App__Form">
                <div className="FormTitle">
                        {/* <NavLink to="/signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or  */}
                        <NavLink exact to="/signup_freelancer" activeClassName="FormTitle__Link--Active" className="FormTitle__Link ">Join As Freelancer</NavLink>
                </div>
                 <div className="FormInput">
                        <div className="FormCenter">
                            <form className="FormField" onSubmit={this.handleSubmit} >
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="email">Email</label>
                                    <input type="email" id="email" className="FormField__Input" placeholder="Enter your email address" name="email" 
                                    value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your Password" name="password" 
                                    value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                
                                    <div className="FormField">
                                        <label className="FormField__Label" htmlFor="password">Rate</label>
                                        <input type="text" id="rate" className="FormField__Input Rate" placeholder="Enter your rate" name="rate" 
                                        value={this.state.rate} onChange={this.handleChange}/>
                                    
                                            <DropdownButton 
                                                // bsStyle={title.toLowerCase()}
                                                // title={title}
                                                // key={i}
                                                // id={`dropdown-basic-${i}`}
                                                // onSelect={this.handlSelect}
                                                >
                                                <MenuItem eventKey="1" >USD $</MenuItem>
                                                <MenuItem eventKey="2" >RMB $</MenuItem>
                                                <MenuItem eventKey="3" >SGD $</MenuItem>
                                                <MenuItem eventKey="3" >WON $</MenuItem>
                                                <MenuItem eventKey="3" >RUB $</MenuItem>
                                                <MenuItem eventKey="4" active>
                                                    Active Item
                                                </MenuItem>
                                        
                                            </DropdownButton>
                                 </div>
                                <div className="FormField">
                                    <label className="FormField__Label" htmlFor="password">Wallet Address</label>
                                    <input type="password" id="wallet_address" className="FormField__Input" placeholder="Enter your Wallet Address" 
                                    name="wallet_address" value={this.state.wallet_address} onChange={this.handleChange}/>
                                </div>
                                 <div className="FormField">
                                    <label className="FormField__CheckboxLabel">
                                        <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.value} onChange={this.handleChange}/>
                                        I agree all statement in <Link to="#"href="#" className="FormField__TermsLink">terms of service</Link>
                                    </label>
                                </div>

                                <div className="FormField">
                                    <button className="FormField__Button mr-20">Sign Up</button><Link to="/signin"
                                    className="FormField__Link haveMember">I'm already member</Link>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>    
            
        );
    }
}

export default SignUpFormFreelancer;