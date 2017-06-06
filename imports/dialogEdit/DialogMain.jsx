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
		$(document).ready(function() {
		  $('.modal').modal();
		});
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

	componentDidMount(){
		// $(document).ready(function(){
		//       	$('.modal').modal();
		// });
		$(document).ready(function() {
		  $('.modal').modal();
		});
		 
	}

	dialog(dialogName){
		return Dialogs.findOne({name: dialogName})
	}

	openRequestIdModal(){
		console.log("open modal")
		// $('#requestIdModal').modal('open');
		$('#modal1').modal('open');
	}

	// closeRequestIdModal(){
	// 	$('#requestIdModal').closeModal();
	// }
	getNewModuleId(event){
		event.preventDefault();
		newId = this.refs.moduleId.value.trim();
		Session.set("newModuleId", newId);
	}

	render(){
		let dialogName = this.props.dialogName;
		let dialog = this.dialog(dialogName); 
		var addNextModule = 0;
		if(Meteor.isClient){
			promptType = Session.get("promptTypeChosen");	
			addNextModule = Session.get("addNextModule");
			yesConfirmModule = Session.get("addYesModule");
			noConfirmModule = Session.get("addNoModule");
			newId = Session.get("newModuleId");
		}
		if(addNextModule>1 && yesConfirmModule===null && noConfirmModule===null)
			dialogName = this.openRequestIdModal();
		var newModule = []
		if(addNextModule>0){
			for(i=0 ; i<addNextModule ; i++){
				newModule.push(<DialogModule dialogName={dialogName} dialog={dialog} key={addNextModule}/>) 	// following new module
			}
		}

		console.log("yesConfirmModule", yesConfirmModule)
		
		yesModule = yesConfirmModule!==null ? (<DialogModule dialogName={yesConfirmModule} dialog={dialog} />) : <span></span>
		noModule = noConfirmModule!==null ? (<DialogModule dialogName={noConfirmModule} dialog={dialog} />): <span></span>
		Session.set("addYesModule", null);
		Session.set("addNoModule", null);

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
							<a className="waves-effect waves-light btn modal-trigger">See Modal</a>
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
					<a className="waves-effect waves-light btn modal-trigger" data-target="modal1">Test Modal</a>

					<div id="modal1" className="modal">
						<div className="modal-content">
					      <h4>Provide ID for new module</h4>
					      	<form onSubmit={this.getNewModuleId.bind(this)} >
						      <div className="input-field col s12">
						      	<input type="text" id="moduleId" ref="moduleId"/>
					          	<label for="moduleId" className="active">Module ID:</label>
				        	  </div>
				        	</form>
					    </div>
					    <div className="modal-footer">
					      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Ok</a>
					    </div>
					</div>

					
				</div>
			</div>
		);
	}
}

export default DialogMain;