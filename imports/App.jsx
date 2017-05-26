import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import {Dialogs} from './api/dialogs.js'
import DialogSingle from './DialogSingle';
import DialogSingleCard from './DialogSingleCard';

import ConvertCode from '../imports/ConvertCode.jsx';

class App extends TrackerReact(Component) {

	constructor(){
		super();

		this.state={
			subscription: {
				dialogs: Meteor.subscribe("allDialogs")
			}
		}
	}

	componentWillUnmount(){
		this.state.subscription.dialogs.stop();
	}

	dialogs(){
		return Dialogs.find().fetch();
	}

	addDialog(event){
		event.preventDefault();
		var dialogName = this.refs.dialog.value.trim();
		var type = this.refs.type.value.trim();
		Dialogs.insert({
			dialog: dialogName,
			type: type,
			createdAt: new Date()
		});
		this.refs.dialog.value="";
	}

	render(){
		let dialogs = this.dialogs();
		console.log("DIALOGS: " , dialogs)
		// if(dialog.length<1){
		// 	return (<div>No dialogs created</div>)
		// }
		return(
			<div className="row">
				<div className="row">
					<div className="col s3 teal lighten-2">
						<ul>
							{dialogs.map((dialog)=>{
								return <DialogSingle key={dialog._id} dialog={dialog.dialog} />
							})}
						</ul>
						<form className="col s3 new-dialog">
							<input type="text" ref="dialog" placeholder="Dialog Name"/>
							<input type="text" ref="type" placeholder="Type"/>
							<a className="waves-effect waves-light btn topGapSmall" onClick={this.addDialog.bind(this)}>
								<i className="material-icons left">send</i>
								Add
							</a>
						</form>
					</div>

					<div className="col s9">
						
						{dialogs.map((dialog)=>{
								return <DialogSingleCard key={dialog._id} dialog={dialog.dialog} />
						})}

					</div>

				</div>

			</div>
		)
	}
}

export default App;
