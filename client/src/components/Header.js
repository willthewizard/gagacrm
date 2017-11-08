import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component{
	renderContent(){
		switch (this.props.auth){
			case null:
				return 'Still deciding';
			case false:
				return <a href="/auth/google">Login With Google</a>;
			default:
				return <a>Logout</a>;
		}
	}
	render(){
		console.log(this.props);
		return (
			<nav>
				<div className = "nav-wrapper">
					<Link to="/" className ="left brand-logo">
						Logo Here
					</Link>
						<ul className ="right">
							<li>
								{this.renderContent()}
							</li>
						</ul>
				</div>
			</nav>
		);
	}

}

function mapStateToProps({auth}){
	return{auth:auth};
}

export default connect(mapStateToProps)(Header);