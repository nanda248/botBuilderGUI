import React, {Component} from 'react';

class NextModule extends Component{

	addNextModule(){

		if(Meteor.isClient){
			console.log("In next module bottom.")
			// if(Session.get("addNextModule")===null){
			// 	Session.set("addNextModule", 1);
			// }else {
				var value = Session.get("addNextModule");
				value++;
				Session.set("addNextModule", value);
			// }
			
		}
	}

	render(){

		return(
			<div className="paddingBottom">
				<a className="btn waves-effect waves-light" onClick={this.addNextModule.bind(this)}>Next Module</a>
			</div>
		)
	}
}

export default NextModule;