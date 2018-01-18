import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

var generic_errMsg = "Some error occured, please consult with the technical support";
class UserForm extends Component{
    constructor(props){
        super(props)
        this.state= {
            firstName:"",
            lastName:"",
            accountNumber:"",
            birthday:"",
            phone:"",
            email:"",
            address:"",
            sin:"",
            school:"",
            grade:"",
            passportExpiry:"",
            studentExpiry:"",
            trvExpiry:"",
            usVisa:"true",
            userStatus:"",
            referrer:"",
            userList:[]


        }
    }
    renderContent(){
        if(this.props.match==undefined){
            return this.createUserForm();
        }
        switch(this.props.match.params.action){
            case '':
                return this.createUserForm();
            case 'create':
                return this.createUserForm();
            case 'modify':
                return this.workWithUser();
            case 'userList':
                return this.userList();
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
        var formProperties = this.renderContent();     
        return (
            <div>
            <nav class="blue">
                <a class = "waves-effect waves-light btn"
                    href = "/dashboard/user/create" >Create New User</a>
                <a class = "waves-effect waves-light btn" href = "/dashboard/user/modify" >Working With Existing User</a>
                <a class = "waves-effect waves-light btn" href = "/dashboard/user/userList" >List All Users</a>

            </nav>
			<div name="userForm" hidden={formProperties.userList}>
                <input id = "firstName" name ="firstName" type="text" placeholder="First Name:" value={this.state.firstName} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input id = "lastName" name ="lastName" type="text" placeholder="Last Name:" value={this.state.lastName} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="accountNumber" type="text" placeholder="Account Number:" value={this.state.accountNumber} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                {/* <input name ="picture" type="text" placeholder="Picture" required={formProperties.required} disabled={formProperties.disabled}></input> */}
                <input name ="birthday" type="text" placeholder="Date of birth:" value={this.state.birthday} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="phone" type="text" placeholder="Phone:" value={this.state.phone} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="email" type="email" placeholder="Email:" value={this.state.email} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="address" type="text" placeholder="Address:" value={this.state.address} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="sin" type="text" placeholder="Social Insurance Number(S.I.N.):" value={this.state.sin} onChange={this.onChange.bind(this)} required="false" disabled={formProperties.disabled}></input>
                <input name ="school" type="text" placeholder="School" value={this.state.school} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="grade" type="text" placeholder="Grade:" value={this.state.grade} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="passportExpiry" type="text" placeholder="Passport Expiry Date:" value={this.state.passportExpiry} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="studentExpiry" type="text" placeholder="Student Permit Expiry Date:" value={this.state.studentExpiry} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="trvExpiry" type="text" placeholder="TRV Expiry Date:" value={this.state.trvExpiry} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <label>
                    U.S. Visa Status
                </label>
                <select name="usVisa" class="browser-default" value={this.state.usVisa} onChange={this.onChange.bind(this)}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
          
                <input name ="userStatus" type="text" placeholder="User Status:" value={this.state.userStatus} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="referrer" type="text" placeholder="Referrer:" value={this.state.referrer} onChange={this.onChange.bind(this)} required={false} disabled={formProperties.disabled}></input>
                 

                <button hidden ={formProperties.hideCreate} disabled={formProperties.hideCreate} onClick={()=>this.submitForm()}>Create</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.findUser()}>Find</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.updateUser()}>Update</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.deleteUser()}>Delete</button>
                </div>
                <div hidden={!formProperties.userList}>
                    {this.displayAllUsers()}
                </div>
            </div>
            
		);
    }
    displayAllUsers(){
        const userList = this.state.userList.map((user)=>
            <li>{"Account Number: " +user.accountNumber+", User Email: "+user.email+", First Name: "+user.firstName+", Last Name: "+user.lastName}</li>
        );
        if(this.state.userList.length==0){
            this.listAllUsers();
        }
        return(
            <ul>
                <li>User count:{this.state.userList.length}</li>
                {userList}
            </ul>
        );
    }

    createUserForm(){
         let formProperties = {
            required:true,
            disabled:false,
            hideCreate:false,
            hideModify:true,
            userList:false
         };
         
         return formProperties;
    }

    workWithUser(){
        let formProperties = {
           required:false,
           disabled:false,
           hideCreate:true,
           hideModify:false,
           userList:false
        };
        
        return formProperties;
   }
    userList(){
        let formProperties = {
            userList:true
        }
        return formProperties;
    }
   
   submitForm(){
        var self = this
        var params = this.state
        var birthDate = params.birthday
        if(birthDate!=""){
            alert(birthDate)
        }else{
            axios.post('/api/user', params)
            .then(function (res,err) {
                var data = res.data;
                var message = data.message;            
                if(data.Success ==true){
                    alert(message);
                    window.location.reload();                                    
                }else if (data.Success==false){
                    alert(message);
                }else{
                    alert();
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }
   }


   findUser(){
            var self = this
            var params = this.state
            axios.get('/api/user', {
                params
            })
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    alert("User successfully found");
                    var user = data.user
                    self.setState(user);
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }

        updateUser(){
            var self = this
            var params = this.state
            axios.put('/api/user', params)
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    var user = data.user
                    self.setState(user);
                   alert("User successfully updated");
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }

        deleteUser(){
            var self = this;
            var params = this.state;
            axios.delete('/api/user',{
                params:{
                    accountNumber:params.accountNumber
                }})
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    alert("User successfully deleted");                    
                    window.location.reload();                    
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }

        listAllUsers(){
                var self = this;
            axios.get('/api/listAllUsers', {})
                .then(function (res) {
                    var data = res.data;
                    if(data.Success ==true){
                        self.setState({userList:data.userList});
                    }else{
                        alert(data.message)
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
            }
}

export default UserForm;