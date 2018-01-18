import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

var generic_errMsg = "Some error occured, please consult with the technical support";
class AdminForm extends Component{
    constructor(props){
        super(props)
        this.state= {
            email:"",
            password:"",
            type:"system",
            organizationName:"",
            contactName:"",
            contactPhone:"",
            address:""

        }
    }
    renderContent(){
        if(this.props.match==undefined){
            return this.createAdminForm();
        }
        switch(this.props.match.params.action){
            case '':
                return this.createAdminForm();
            case 'create':
                return this.createAdminForm();
            case 'modify':
                return this.workWithAdmin();
            
        }
    }

    onChange(event){
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]:value
        })
    }

    onBlur(event){
        const required = event.target.required;
    }
	render(){
        var formProperties = this.renderContent();     
        return (
            <div>
            <nav class="blue">
                <a class = "waves-effect waves-light btn"
                    href = "/dashboard/admin/create" >Create New Admin</a>
                <a class = "waves-effect waves-light btn" href = "/dashboard/admin/modify" >Working With Existing Admin</a>

            </nav>
			<div name="adminForm">
                <input name ="email" type="email" placeholder="Email:" value={this.state.name} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input name ="password" type="password" placeholder="Please Enter Your Password:" value={this.state.password} onChange={this.onChange.bind(this)} required={formProperties.required} disabled={formProperties.disabled}></input>
                <input id="password2" type="password" placeholder="Please Re-Enter Your Password:" required={formProperties.required} disabled={formProperties.disabled}></input>
                
                <label>
                    Admin Type
                </label>    
                    <select name="type" class="browser-default" value={this.state.type} onChange={this.onChange.bind(this)}>
                        <option value="system">System Admin</option>
                        <option value="vendor">Partnered Organization Admin</option>
                    </select>
                <br></br>
                <input name ="organizationName" type="text" placeholder="Organization Name:" value={this.state.organizationName} onChange={this.onChange.bind(this)} required={!this.isSystemAdmin()} disabled={this.isSystemAdmin()} hidden={this.isSystemAdmin()}></input>
                <input name ="contactName" type="text" placeholder="Organization Name of Contact:" value={this.state.contactName} onChange={this.onChange.bind(this)} required={!this.isSystemAdmin()} disabled={this.isSystemAdmin()} hidden={this.isSystemAdmin()}></input>
                <input name ="contactPhone" type="text" placeholder="Organization Contact Phone Number:" value={this.state.contactPhone} onChange={this.onChange.bind(this)} required={!this.isSystemAdmin()} disabled={this.isSystemAdmin()} hidden={this.isSystemAdmin()}></input>
                <input name ="address" type="text" placeholder="Organization Address:" value={this.state.address} onChange={this.onChange.bind(this)} required={!this.isSystemAdmin()} disabled={this.isSystemAdmin()} hidden={this.isSystemAdmin()}></input>


                <button hidden ={formProperties.hideCreate} disabled={formProperties.hideCreate} onClick={()=>this.submitForm()}>Create</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.findAdmin()}>Find</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.updateAdmin()}>Update</button>
                <button hidden ={formProperties.hideModify} disabled={formProperties.hideModify} onClick={()=>this.deleteAdmin()}>Delete</button>
                </div>
    
            </div>
            
		);
    }
    createAdminForm(){
         let formProperties = {
            required:true,
            disabled:false,
            hideCreate:false,
            hideModify:true
         };
         
         return formProperties;
    }

    workWithAdmin(){
        let formProperties = {
           required:false,
           disabled:false,
           hideCreate:true,
           hideModify:false
        };
        
        return formProperties;
   }
   
   isSystemAdmin(){
       if(this.state.type=="system"){
           return true;
       }else{
           return false;
       }
   }

   submitForm(){
        var self = this;
        var params = this.state;
        var passwordReenter = document.getElementById("password2").value; 
        if(passwordReenter!=params.password&&params.password!=""){
            alert("password and password re-enter mismatch");
        }else{
            axios.post('/api/admin', params)
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


   findAdmin(){
            var self = this
            var params = this.state
            axios.get('/api/admin', {
                params
            })
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    alert("Admin successfully found");
                    var admin = data.admin
                    self.setState(admin);
                    self.setState({
                        password:""
                    });
                    
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }

        updateAdmin(){
            var self = this
            var params = this.state
            axios.put('/api/admin', params)
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    var admin = data.admin
                    self.setState(admin);
                   alert("Admin successfully updated");
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }

        deleteAdmin(){
            var self = this;
            var params = this.state;
            axios.delete('/api/admin',{
                params:{
                    accountNumber:params.accountNumber
                }})
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    alert("Admin successfully deleted");                    
                    window.location.reload();                    
                }else{
                    alert("No results found")
                }
            })
            .catch(function (error) {
                alert(error);
            });
        }
}

export default AdminForm;