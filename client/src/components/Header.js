import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Header extends Component{
	renderContent(){
		switch (this.props.auth){
			case null:
				return <a href="/login">Login</a>;
			case false:			
				return <a href="/login">Login</a>;
			default:
				return <a href="/api/logout">Logout</a>;
		}
	}
	render(){
		return (
			<nav>
				<div className = "nav-wrapper">
					<Link to="/" className ="center brand-logo">
						Logo Here
					</Link>
						<ul className ="right">
							<li>
								{this.renderContent()}
							</li>
						</ul>
						{this.getLinks()}
				</div>
			</nav>
		);
	}

	getLinks(){
		if(this.props.auth==null||this.props.auth.data==undefined){
			return <div></div>;
		}
		else if(this.props.auth.data.type=="system"){
			return(
				<ul className="center hide-on-med-and-down">
				<li><Link to="/dashboard/admin/create">
				Admin
				</Link></li>
				<li><Link to="/dashboard/user/create">
				User
				</Link></li>
				<li><Link to="/dashboard/scan">
				Scan
				</Link></li>
				</ul>
			);
		}else if(this.props.auth.data.type=="vendor"){
			return(
				<ul class="center hide-on-med-and-down">
				<li><Link to="/dashboard/scan">
				Scan
				</Link></li>
				<li><Link to="/dashboard">
				Dashboard
				</Link></li>
				</ul>
			);
		}
	}

}

function mapStateToProps({auth}){
	return{auth:auth};
}

export default connect(mapStateToProps)(Header);