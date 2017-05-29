import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from './api/dialogs.js';
import {DialogSet} from './api/dialogSet.js';
import DialogSingle from './DialogSingle';
import DialogSingleCard from './DialogSingleCard';
import AddDialogSetBtn from './AddDialogSetBtn';

import ConvertCode from '../imports/ConvertCode.jsx';

class App extends TrackerReact(Component) {

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

	addDialog(event){
		event.preventDefault();
		var dialogName = this.refs.dialog.value.trim();
		var regex = this.refs.regex.value.trim();
		var pathName= '/' + dialogName;
		let dialogSet = this.dialogSet();

		if(dialogSet.length<1)
			Meteor.call('initialDialogSetCreate');

		Meteor.call('dialogCreate', dialogName, regex, (error,data)=> {
			console.log("ERROR:", error);
			console.log("DATA:", data);
			if(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			else{
				this.refs.dialog.value="";
				this.refs.regex.value="";
			}

		})	
		var dialogSetId = this.dialogSet()._id;
		
	}

	render(){
		let dialogs = this.dialogs();
		let dialogSet = this.dialogSet();
		var dialogSetid = null;
		if(dialogSet.length>0)
			dialogSetid = dialogSet[0]._id;
		// console.log("DIALOGS: " , dialogs);
		// console.log("Meteor USER ID: ", Meteor.userId());
		let noData = null; 
		if(dialogs.length<1){
			noData = (<div>No dialogs created</div>);
		}

		return(
			
				<div className="row">
				<div className="col s2 teal darken-4 fullWindowHeight">
					
						<form className="center-align">
							<input type="text" ref="dialog" placeholder="Dialog Name" label="Dialog Name"/>
							<input type="text" ref="regex" placeholder="Regex" label="Regex (separate by comma)"/>
							<a className="waves-effect waves-light btn smallText" onClick={this.addDialog.bind(this)}>
								<i className="material-icons left">send</i>
								Create
							</a>
						</form>

						<br />
						<AddDialogSetBtn dialog={dialogs} dialogSetId={dialogSetid}/>
				</div>
				<div className="col s10">
						<div className="row">
							{noData}
							{dialogs.map((dialog)=>{
									return <DialogSingleCard key={dialog._id} dialog={dialog} />
							})}
						</div>
				</div>

				</div>

		);
	}
}

export default App;