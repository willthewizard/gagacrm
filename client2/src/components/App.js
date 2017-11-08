import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Header from './Header';	
import {connect} from 'react-redux';
import * as actions from '../actions';

const DashBoard = () =><h2>DashBoard</h2>;
const Users = () =><h2>Users</h2>;
const Landing = () =><h2>Landing</h2>;

class App extends Component{
	componentDidMount() {
		this.props.fetchUser();
	}

	render(){
			return (
				<div className = "container">
						<BrowserRouter>
							<div>
								<Header />
								<Route exact path="/" component={Landing} />
								<Route path="/dashboard/admin" component={DashBoard} />
								<Route path="/dashboard/admin/user" component={DashBoard} />

							</div>
						</BrowserRouter>
					</div>

			);
	}

};

export default connect(null, actions)(App);