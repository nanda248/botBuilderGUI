import React, {Component} from 'react';
import NextModule from './NextModule';

class DoneBtn extends Component{

	componentDidMount(){
		$(document).ready(function() {
		    Materialize.updateTextFields();
	  	});
	}

	handleTextField(event){
		event.preventDefault();
		var text = this.refs.textField.value.trim();
		let dialog = this.props.dialog;
		// console.log("Dialog in DoneBtn", dialog)
		// console.log("TEXT in DoneBtn", text);

		if(this.props.isStep){
			stepId = this.props.stepId;
			var index = 0;
			for(i=0 ; i<dialog.steps.length ; i++){
				if(dialog.steps[i].id === stepId)
					break;
				else
					index++;
			}

			Meteor.call('stepTextText', dialog.id, stepId, text, index, (error,data)=>{
				if(error){
					Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
				}else{
					console.log("stepTextText successful")
				}
			})
		}else{
			Meteor.call('dialogTextText', dialog.id, text, (error,data)=> {
				if(error){
					Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
				}else{
					console.log("dialogTextText successful!")
				}
			})
		}
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
		if(this.props.isStep){
			stepId = this.props.stepId;

			Meteor.call('stepPromptText', dialog.id, stepId, promptType, text, (error,data)=>{
				if(error)
					Bert.alert(error.error, 'danger','fixed-bottom','fa-frown-o');
				else
					console.log("stepPromptText successful!")
			})

		} else {
			Meteor.call('dialogPromptTextField', dialog.id, promptType, text, (error,data)=>{
				if(error)
					Bert.alert(error.error, 'danger','fixed-bottom','fa-frown-o');
				else
					console.log("dialogPromptTextField successful!")
			})
		}
	}

	handleConfirmYes(){
		let dialog = this.props.dialog;
		var name = "is" + dialog.id;
		var value = Session.get("addNextModule");
		value++;
		Session.set("addNextModule", value);
		Session.set("addYesModule", name);	
	}

	handleConfirmNo(){
		let dialog = this.props.dialog;
		var name = "isNot" + dialog.id;
		var value = Session.get("addNextModule");
		value++;
		Session.set("addNextModule", value);
		Session.set("addNoModule", name);
	}


	render(){
		// promptText = this.props.promptText;
		dialog = this.props.dialog;
		prefilledText = this.props.textField; 
		console.log('prefilledText: ', prefilledText)
		contentNextModule = this.props.isStep ? (<NextModule dialog={dialog}/>) : <span></span>

		// console.log('TYPE in DoneBtn', this.props.type)
		let content = null;
		switch(this.props.type){
			case 'text': content= (
					<div className="input-field">					
							<input id="text" type="text" ref="textField" className="validate" placeholder={prefilledText}/>
							<label className="active" htmlFor="text">Text</label>
							<div className="row">
								<div className="col s6">
									<a className="btn waves-effect waves-light" onClick={this.handleTextField.bind(this)}>Done</a>
								</div>
								<div className="col s6">
									{contentNextModule}		
								</div>
							</div>		
					</div>	
				)
				break;
			case 'end': content= (
					<div className="input-field">						
							<input id="text" type="text" ref="endField" className="validate" placeholder={prefilledText}/>
							<label className="active" htmlFor="text">Text</label>
							<div className="row">
								<div className="col s6">
									<a className="btn waves-effect waves-light" onClick={this.handleEndField.bind(this)}>Done</a>
								</div>
								<div className="col s6">
									{contentNextModule}		
								</div>
							</div>			
					</div>	
				)
				break;
			case 'prompttext': content= (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate" placeholder={prefilledText}/>
							<label className="active" htmlFor="text">Text</label>	
							<div className="row">
								<div className="col s6">
									<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>
								</div>
								<div className="col s6">
									{contentNextModule}		
								</div>
							</div>			
					</div>
				)
				break;
			case 'promptnumber': content = (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate" placeholder={prefilledText}/>
							<label className="active" htmlFor="text">Text</label>		
							<div className="row">
								<div className="col s6">
									<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>
								</div>
								<div className="col s6">
									{contentNextModule}		
								</div>
							</div>				
					</div>
				)
				break;
			case 'prompttime': content = (
					<div className="input-field">						
							<input id="text" type="text" ref="promptField" className="validate" placeholder={prefilledText}/>
							<label>Text</label>		
							<div className="row">
								<div className="col s6">
									<a className="btn waves-effect waves-light" onClick={this.handlePromptField.bind(this)}>Done</a>
								</div>
								<div className="col s6">
									{contentNextModule}		
								</div>
							</div>				
					</div>
				)
				break;
			case 'promptconfirm': content=(
					<div className="row input-field">
						<div className="col s12">
							<input id="text" type="text" ref="promptField" className="validate" placeholder={prefilledText}/>
							<label className="active" htmlFor="text">Text</label>	
						</div>
						<div className="col s3">
							<a className="btn waves-effect waves-light" onClick={this.handleConfirmYes.bind(this)}>Yes</a>
						</div>
						<div className="col s6">
							{contentNextModule}
						</div>
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