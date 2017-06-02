import React, {Component} from 'react';

class NavBarLayout extends Component {

	render(){
		return(
			<div>
				<nav>
			    <div className="nav-wrapper teal lighten-1">
			      <a href="/" className="brand-logo"> <span className="logo blue-grey-text text-darken-3">Bot Builder GUI</span></a>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li><a href="sass.html">Setting</a></li>
			        <li><a href="badges.html">Help</a></li>
			      </ul>
			    </div>
			  </nav>
			</div>
		)
	}
}

export default NavBarLayout;