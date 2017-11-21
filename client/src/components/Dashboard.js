import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

var generic_errMsg = "Some error occured, please consult with the technical support";
class Dashboard extends Component{
    constructor(props){
        super(props);
        
        this.state= {
                email:"",
                type:"",
                organizationName:"",
                contactName:"",
                contactPhone:"",
                address:""
            }
       this.findAdmin();
    }


	render(){
        return (
            <div>
            <div name="adminForm">
                <input name ="email" type="email" placeholder="Email:" value={this.state.email} disabled="true"></input>
                <input name ="organizationName" type="text" placeholder="Organization Name:" value={this.state.organizationName} disabled="true"></input>
                <input name ="contactName" type="text" placeholder="Organization Name of Contact:" value={this.state.contactName} disabled="true"></input>
                <input name ="contactPhone" type="text" placeholder="Organization Contact Phone Number:" value={this.state.contactPhone} disabled="true"></input>
                <input name ="address" type="text" placeholder="Organization Address:" value={this.state.address} disabled="true"></input>
             </div>
            </div>
            
		);
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
                var admin = data.admin
                self.setState(admin);
                
            }else{
                alert("No results found")
            }
        })
        .catch(function (error) {
            alert(error);
        });
    }

}

function mapStateToProps({auth}){
	return{auth:auth};
}

export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;