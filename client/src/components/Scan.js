import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

var generic_errMsg = "Some error occured, please consult with the technical support";
class Scan extends Component{
    constructor(props){
        super(props);
        if(this.props.auth==undefined){
            this.state= {
                email:"",
                type:"",
                scanRecords:[]
            }
        }else{
            this.state= {
                email:props.auth.data.email,
                type:props.auth.data.type,
                scanRecords:[]
            }
        }
    }
    renderContent(){
        if(this.props.match==undefined){
            return this.userScanField();
        }
        switch(this.props.match.params.action){
            case '':
                return this.userScanField();
            case 'create':
                return this.userScanField();
            case 'modify':
                return this.workWithScan();
            
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
        if(this.props.auth!=null&&this.props.auth.data!=undefined&&this.state.type==""){
            this.setState({
                email:this.props.auth.data.email,
                type:this.props.auth.data.type
            });
        }
        return (
            <div>
                {this.renderContent()}
                {this.displayBoard()}
            </div>
            
		);
    }
    userScanField(){
         let formProperties = {
            required:true,
            disabled:false,
            hideCreate:false,
            hideModify:true
         };
         
         return formProperties;
    }

    displayBoard(){
        if(this.props.auth==null||this.props.auth.data.type=="vendor"){
            return(
                <div>
                    <input name="currentCode" id="currentCode" onChange={()=>this.setUserCode()} placeholder="Enter the user membership # here:" />
                    <ul>{this.displayScanRecords()}</ul>
                </div>
            );
        }else{       
            return(
                <div>
                    <input name="currentCode" id="currentCode" onChange={()=>this.setUserCode()} placeholder="Enter the user membership # here:" />
                    <input name="adminEmail" id="adminEmail" placeholder="Enter organization admin email:" />
                    <button onClick={()=>this.findScan()}>List Transactions</button>
                    <br />
                    {this.displayScanRecords()}

                </div>
            );
        }
    }

    displayScanRecords(){
        const recordList = this.state.scanRecords.map((record)=>
            <li>{"Account Number: " +record.accountNumber+", Admin Email: "+record.email+", Timestamp: "+record.timeStamp}</li>
        );
        if(this.state.scanRecords.length==0){
            this.findScan();
        }
        return(
            <ul>
                <li>Record count:{this.state.scanRecords.length}</li>
                {recordList}
            </ul>
        );
    }

    setUserCode(){
        var currentCode = document.getElementById("currentCode").value; 
        if(currentCode.length>=8){
            this.scanUser(currentCode);
        }
    }
   
   isSystemScan(){
       if(this.state.type=="system"){
           return true;
       }else{
           return false;
       }
   }

   scanUser(currentCode){
            axios.post('/api/scan', {accountNumber:currentCode})
            .then(function (res,err) {
                document.getElementById("currentCode").value = "";                
                var data = res.data;
                var message = data.message;            
                if(data.Success ==true){
                    alert(message);
                    window.location.reload();                    
                }else if (data.Success==false){
                    alert(message);
                }else{
                    alert("Error Occured");
                }
            })
            .catch(function (error) {
                alert(error);
            });
   }


   findScan(){
        if(document.getElementById("adminEmail")!=null){
            var adminEmail = document.getElementById("adminEmail").value;
          }
            var self = this;
            axios.get('/api/scan', {
                params:{
                    email:adminEmail
                }
            })
            .then(function (res) {
                
                var data = res.data;
                if(data.Success ==true){
                    self.setState({scanRecords:data.records});
                }else{

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

export default connect(mapStateToProps)(Scan);
// export default Scan;