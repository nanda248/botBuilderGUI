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

	dialog(dialogName){
		return Dialogs.findOne({name: dialogName})
	}

	dialogSet(){
		return DialogSet.find().fetch();	
	}


	render(){
		let dialogName = this.props.dialogName;
		let dialog = this.dialog(dialogName); // May be to use later (dialog collection)
		var addNextModule = 0;
		if(Meteor.isClient){
			promptType = Session.get("promptTypeChosen");	
			addNextModule = Session.get("addNextModule");
			yesConfirmModule = Session.get("addYesModule");
			noConfirmModule = Session.get("addNoModule");
		}

		var newModule = []
		if(addNextModule>0){
			for(i=0 ; i<addNextModule ; i++){
				newModule.push(<DialogModule dialogName={dialogName} dialog={dialog} key={addNextModule}/>) 	// following new module
			}
		}

		console.log("yesConfirmModule", yesConfirmModule)
		
		yesModule = yesConfirmModule!==null ? (<DialogModule dialogName={yesConfirmModule} dialog={dialog} />) : <span></span>
		noModule = noConfirmModule!==null ? (<DialogModule dialogName={noConfirmModule} dialog={dialog} />): <span></span>
		// addModule = addNextModule ? (<DialogModule dialogName={dialogName}/>) : <span></span>

		return(			
			<div className="row">
				<div className="col m2 grey lighten-1 ">
				
						<br />
						<div className="paddingTopBottom">
							<a className="waves-effect waves-light btn">Add Id and Type</a>
						</div>
						<br />
						<br />
						<div className="paddingTopBottom">
							<a className="waves-effect waves-light btn">Add text</a>
						</div>
					
				</div>
				<div className="col m10">

					<div className="row">
						<div className="col s4 offset-s4 grey lighten-4">
						{newModule}
						</div>
					</div>
						
					<div className="row">
						<div className="col m4">
							{yesModule}
						</div>
						<div className="col m4"></div>
						<div className="col m4">
							{noModule}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DialogMain;