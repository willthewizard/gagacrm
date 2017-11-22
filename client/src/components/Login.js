import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

var generic_errMsg = "Some error occured, please consult with the technical support";
class Login extends Component{
    constructor(props){
        super(props)
        this.state= {
            email:"",
            password:"",
        }
    }
    

    onChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]:value
        })
    }
	render(){
        return (
            <div>
			<div name="userForm">
                <input name ="email" type="text" placeholder="Email:" value={this.state.name} onChange={this.onChange.bind(this)}></input>
                <input name ="password" type="password" placeholder="Password:" value={this.state.password} onChange={this.onChange.bind(this)}></input>
                <button onClick={()=>this.submitForm()}>Login</button>
               </div>
    
            </div>
            
		);
    }

   
   submitForm(){
        var self = this
        var params = this.state
        axios.post('/api/login', params)
        .then(function (res,err) {
            var data = res.data;
            var message = data.message;            
            if(data.Success ==true){
                window.location="/";                                    
            }else if (data.Success==false){
                alert(message);
            }else{
                alert(err);
            }
        })
        .catch(function (error) {
            alert(error);
        });
   }


}

export default Login;