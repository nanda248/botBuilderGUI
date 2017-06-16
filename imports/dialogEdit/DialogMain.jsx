import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from '../api/dialogs.js';
import {DialogSet} from '../api/dialogSet.js';

import DialogModule from './DialogModule';
import StepModule from './StepModule';

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

	getSteps(dialog){
		steps = []
		if(dialog.steps){
			for(i=0 ; i<dialog.steps.length ; i++)
				steps.push(dialog.steps[i])
		}
		return steps;
	}

	render(){
		let dialogName = this.props.dialogName;
		let dialog = this.dialog(dialogName); 
		if(Meteor.isClient){
			// addNextModule = Session.get("addNextModule");
			yesConfirmModule = Session.get("addYesModule");
			noConfirmModule = Session.get("addNoModule");
		}

		MainModule = (<DialogModule dialogName={dialogName} dialog={dialog}/>)

		steps = this.getSteps(dialog);
		
		console.log("dialogName", dialogName)	
		
		// yesModule = yesConfirmModule!==null ? (<DialogModule dialogName={yesConfirmModule} dialog={dialog} />) : <span></span>
		// noModule = noConfirmModule!==null ? (<DialogModule dialogName={noConfirmModule} dialog={dialog} />): <span></span>
		// Session.set("addYesModule", null);
		// Session.set("addNoModule", null);

		// addModule = addNextModule ? (<DialogModule dialogName={dialogName}/>) : <span></span>

		return(			
			<div className="row">
				<div className="col m2 grey lighten-1 ">			
						<br />
						<div className="paddingTopBottom">
							<a className="waves-effect waves-light btn">Add Id and Type</a>
						</div>
						<br /><br />
						<div className="paddingTopBottom">
							<a className="waves-effect waves-light btn "> Test</a>
						</div>				
						<div className="paddingTopBottom">

						</div>		
				</div>
				<div className="col m10">
					<div className="row">
						<div className="col s4 offset-s4 grey lighten-4">
						{MainModule}
						{steps.map((step)=>{
							return <StepModule stepId={step.id} dialog={dialog} key={step.id} step={step}/>
						})}
						
						</div>
					</div>					
					<div className="row">
						<div className="col m4">
							{/*yesModule*/}
						</div>
						<div className="col m4"></div>
						<div className="col m4">
							{/*noModule*/}
						</div>
					</div>			
				</div>
			</div>
		);
	}
}

export default DialogMain;