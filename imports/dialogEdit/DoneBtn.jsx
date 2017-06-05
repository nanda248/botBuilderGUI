import React, {Component} from 'react';

class DoneBtn extends Component{

	handleTextField(event){
		event.preventDefault();
		var text = this.refs.textField.value.trim();
		let dialog = this.props.dialog;
		console.log("Dialog in DoneBtn", dialog)
		console.log("TEXT in DoneBtn", text);
		Meteor.call('dialogTextText', dialog.id, text, (error,data)=> {
			if(error){
				console.log(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			}
			else{
				console.log("dialogTextText successful!")
			}
		})
	}

	handleEndField(event){
		event.preventDefault();
		var text = this.refs.endField.value.trim();
		let dialog = this.props.dialog;

		Meteor.call('dialogEndText', dialog.id, text, (error,data)=> {
			if(error){
				console.log(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			}
			else{
				console.log("dialogEndText successful!")
			}
		})
	}

	handlePromptField(event){
		event.preventDefault();
		var text = this.refs.promptField.value.trim();
		var promptType = this.props.promptType;
		let dialog = this.props.dialog;
		Meteor.call('dialogPromptTextField', dialog.id, promptType, text, (error,data)=>{
			if(error)
				Bert.alert(error.error, 'danger','fixed-bottom','fa-frown-o');
			else
				console.log("dialogPromptTextField successful!")
		})
	}

	handleConfirmYes(){
		let dialog = this.props.dialog;
		var name = "is" + dialog.id;
		Session.set("addYesModule", name);	
	}

	handleConfirmNo(){
		let dialog = this.props.dialog;
		var name = "isNot" + dialog.id;
		Session.set("addNoModule", name);
	}

	// doneModule(){
	// 	var type=this.props.type;
	// 	switch(type){
	// 		case 'text': 
	// 			break;
	// 		case 'prompText':
	// 			break;
	// 		case 'promptNumber':
	// 			break;
	// 		case 'promptTime':
	// 			break;
	// 		case 'promptConfirm':
	// 			break;
	// 		default: console.log("Error: nothing chosen")
	// 			break;
	// 	}

	// }

	render(){

		console.log('TYPE in DoneBtn', this.props.type)
		let content = null;
		switch(this.props.type){
			case 'text': content= (
					<div className="input-field">						
							<input id="text" type="text" ref="textField" className="validate"/>
							<label>Text</label>		
							<a className="btn waves-effect waves-light" onClick={this.handleTextField.bind(this)}>Done</a>				
					</div>	
				)
				break;
			case 'end': content= (
					<div className="input-field">						
							<input id="text" type="text" ref="endField" className="validate"/>
							<label>Text</label>		
							<a className="btn waves-effect waves-light" onClick={this.handleEndField.bind(this)}>Done</a>				
					</div>	
				)
				break;
			case 'prompttext': content= (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate"/>
							<label>Text</label>		
							<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>				
					</div>
				)
				break;
			case 'promptnumber': content = (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate"/>
							<label>Text</label>		
							<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>				
					</div>
				)
				break;
			case 'prompttime': content = (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate"/>
							<label>Text</label>		
							<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>				
					</div>
				)
				break;
			case 'promptconfirm': content=(
					<div className="row input-field">
						<div className="col s12">
							<input id="text" type="text" ref="promptField" className="validate"/>
							<label>Text</label>	
						</div>
						<div className="col s3">
							<a className="btn waves-effect waves-light" onClick={this.handleConfirmYes.bind(this)}>Yes</a>
						</div>
						<div className="col s6"></div>
						<div className="col s3">
							<a className="btn waves-effect waves-light" onClick={this.handleConfirmNo.bind(this)}>No</a>
						</div>						
					</div>
				)
				break;
			default: console.log("Error: nothing chosen");
				content =(<span></span>)
				break;
		}

		return(
			<div className="marginTop">
				{content}
			</div>
		)
	}
}

export default DoneBtn;