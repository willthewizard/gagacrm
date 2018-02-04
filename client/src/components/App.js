import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import AdminForm from './AdminForm';
import UserForm from './UserForm';
import Scan from './Scan';
import Dashboard from './Dashboard';


import Login from './Login';


class App extends Component{
	componentDidMount(){
		this.props.fetchUser();
	}

	render(){
		return(
			<div className = "container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />

						{/* component for admin user management routes */}
						<Route path="/dashboard/admin/:action" component={AdminForm} />
						<Route exact path="/dashboard/user/:action/" component={UserForm} />
						<Route path="/dashboard/user/:action/:accountId" component={UserForm} />
						<Route path="/dashboard/scan" component={Scan} />

						<Route path="/login" component={Login}/>

					</div>
				</BrowserRouter>
			</div>
			);
	}
};

export default connect(null,actions) (App);