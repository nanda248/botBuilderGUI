import React, {Component} from 'react';

class NextModule extends Component{

	addNextModule(){

		if(Meteor.isClient){
			console.log("In next module bottom.")
			if(Sessoin.get("addNextModule")===null){
				Session.set("addNextModule", 0);
			}else {
				var value = Session.get(NextModule);
				value = value +1;
				Session.set("addNextModule", value);
			}
			
		}
	}

	render(){

		return(
			<div>
				<a className="btn waves-effect waves-light" onClick={this.addNextModule.bind(this)}>Next Module</a>
			</div>
		)
	}
}

export default NextModule;