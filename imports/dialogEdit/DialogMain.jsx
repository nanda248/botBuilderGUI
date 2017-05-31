import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from '../api/dialogs.js';
import {DialogSet} from '../api/dialogSet.js';

import DialogModule from './DialogModule';

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
				<div className="col s2">
					<div className="row brown lighten-1 fullWindowHeight noMarginLeft">
						<br />
						<div className="col s12 paddingTopBottom">
							<a className="waves-effect waves-light btn">Add Id and Type</a>
						</div>
						<br />
						<br />
						<div className="col s12 paddingTopBottom">
							<a className="waves-effect waves-light btn">Add text</a>
						</div>
					</div>
				</div>
				<div className="col s3 offset-s1">
					<DialogModule dialogName={dialogName}/>
				</div>
				
			</div>
		);
	}
}

export default DialogMain;