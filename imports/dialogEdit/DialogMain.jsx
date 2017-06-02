import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from '../api/dialogs.js';
import {DialogSet} from '../api/dialogSet.js';

import DialogModule from './DialogModule';

class DialogMain extends TrackerReact(Component) {

	constructor(){
		super();
		Session.set("promptTypeChosen", null)
		Session.set("addNextModule", 1)
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
		if(Meteor.isClient){
			promptType = Session.get("promptTypeChosen");	
			addNextModule = Session.get("addNextModule");
		}

		var newModule = []
		if(addNextModule>0){
			for(i=0 ; i<addNextModule ; i++){
				newModule.push(<DialogModule dialogName={dialogName}/>) 	// following new module
			}
		}
		

		// addModule = addNextModule ? (<DialogModule dialogName={dialogName}/>) : <span></span>

		return(			
			<div className="row">
				<div className="col m2 grey lighten-1 fullWindowHeight ">
					<div className="row">
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
				<div className="col m10">
						{newModule}
				</div>
			</div>
		);
	}
}

export default DialogMain;