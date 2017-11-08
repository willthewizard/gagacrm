import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import adminDashboard from './adminDashboard';

const DashBoard = () =><h2>DashBoard</h2>;
const Users = () =><h2>Users</h2>;

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
						<Route path="/dashboard/admin" component={adminDashboard} />
						<Route path="/dashboard/admin/user" component={DashBoard} />

					</div>
				</BrowserRouter>
			</div>
			);
	}
};

export default connect(null,actions) (App);