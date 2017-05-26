import React from 'react';
import NavBarLayout from './NavBarLayout';

export const MainLayout = ({content}) => (
	<div className="restaurantBackground fullWindowHeight grey lighten-2">
		<NavBarLayout />
	  	<div className="container main-layout">
			{content}
		</div>
	  
	</div>
	
)