import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from './api/dialogs.js';
import {DialogSet} from './api/dialogSet.js';
import DialogSingleCard from './DialogSingleCard';
import AddDialogSetBtn from './AddDialogSetBtn';

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
				<div className="col m3 teal darken-4 fullWindowHeight">
						<div className="row">
							<form className="col s12">
								<div className="input-field">
									<input type="text" ref="dialog" />
									<label className="smallText"> Dialog Name (No space between words)</label>
								</div>
								<div className="input-field">
									<input type="text" ref="regex" />
									<label className="smallText">Regex (separate by comma)</label>
								</div>	
								<div className="col s6">
									<a className="waves-effect waves-light btn smallText" onClick={this.addDialog.bind(this)}>
										<i className="material-icons left">send</i>
										Create
									</a>
								</div>	
								<div className="col s6">
									<AddDialogSetBtn dialog={dialogs} dialogSetId={dialogSetid} dialogSet={dialogSet}/>
								</div>													
							</form>
						</div>
						
				</div>
				<div className="col m9">
						<div className="row">
							{noData}
							{dialogs.map((dialog)=>{
									return <DialogSingleCard key={dialog._id} dialog={dialog} dialogSetId={dialogSetid} dialogSet={dialogSet}/>
							})}
						</div>
				</div>

				</div>

		);
	}
}

export default App;