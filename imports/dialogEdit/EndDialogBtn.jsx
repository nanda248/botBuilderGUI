import React, {Component} from 'react';

class EndDialogBtn extends Component{

	endDialog(){

		if(Meteor.isClient){
			console.log("In endDialogBtn.")
			
			
		}
	}

	render(){

		return(
			<div className="paddingBottom">
				<a className="btn waves-effect waves-light" onClick={this.endDialog.bind(this)}>End Dialog</a>
			</div>
		)
	}
}

export default EndDialogBtn;