import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from '../api/dialogs.js';
import {DialogSet} from '../api/dialogSet.js';



class DialogMain extends TrackerReact(Component) {

	constructor(){
		super();

		this.state={
			subscription: {
				dialogs: Meteor.subscribe("allDialogs"),
				dialogSet: Meteor.subscribe("allDialogSets")
			}
		}
	}

	componentWillUnmount(){
		this.state.subscription.dialogs.stop();
		this.state.subscription.dialogSet.stop();
	}

	dialogs(){
		return Dialogs.find().fetch();
	}

	dialogSet(){
		return DialogSet.find().fetch();	
	}


	render(){
		let dialogName = this.props.dialogName;

		return(			
			<div className="row">
				<h3>Main Dialog: {dialogName}</h3>
			</div>
		);
	}
}

export default DialogMain;