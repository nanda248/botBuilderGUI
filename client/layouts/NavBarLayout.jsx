import React, {Component} from 'react';

class NavBarLayout extends Component {

	render(){
		return(
			<div>
				<nav>
			    <div className="nav-wrapper teal lighten-1">
			      <a href="#" className="brand-logo">Bot Builder GUI</a>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li><a href="sass.html">Sass</a></li>
			        <li><a href="badges.html">Components</a></li>
			        <li><a href="collapsible.html">JavaScript</a></li>
			      </ul>
			    </div>
			  </nav>
			</div>
		)
	}
}

export default NavBarLayout;