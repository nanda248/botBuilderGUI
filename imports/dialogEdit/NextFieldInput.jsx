import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NextModule from './NextModule';
import DoneBtn from './DoneBtn';

class NextFieldInput extends TrackerReact(Component){

	constructor(props){
		super(props);

		this.state={
			textField: "",
			promptType: ""
		}
	}

	componentDidMount(){
		let text = ""
		if(this.props.dialog.data)
			text = props.dialog.data[0].text;
		if(this.props.isStep){
			// if it is step
		} else {
			if(this.props.dialog.type === "prompt" && this.props.dialog.data){
				this.setState({textField: text, promptType: this.props.dialog.data[0].type})
			}else if(this.props.dialog.data && this.props.type!=="sequence"){
				this.setState({textField: text, promptType: ""})
			}
			else{
				this.setState({textField: "", promptType: ""})
			}
		}
	}

	close(event){
		event.preventDefault();
		let dialog = this.props.dialog;
		var text = dialog.data[0].text;
		Meteor.call('RemovePromptTypeAndData', dialog.id, text, (error,data)=>{
			if(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			else
				console.log("RemovePromptTypeAndData successful")
		})
	}

	logChange(val){
		var dataType = val.value;
		if(Meteor.isClient)
			Session.set('promptTypeChosen', dataType)
		this.setState({promptType: dataType})
	}

	handleFieldContent(){
		let type = this.props.type;
		let dialog = this.props.dialog;
		var pType = type;
		var selectPromptType = this.state.promptType;
		var promptText = "";

		if(dialog.type === "prompt" && dialog.data){
			selectPromptType = this.state.promptType;
			pType = "prompt" + this.state.promptType;
		}

		if((dialog.type === "prompt" && !dialog.data) || this.props.isStep){
			pType = "prompt" + this.state.promptType;
		}


		var options = [
		  { value: 'text', label: 'Text' },
		  { value: 'number', label: 'Number' },
		  { value: 'time', label: 'Time' },
		  { value: 'confirm', label: 'Confirm' },
		];

		
		
		// if(dialog.type==="prompt" && dialog.data){
		// 	selectPromptType = dialog.data[0].type;
		// 	pType = "prompt" + selectPromptType;
		// 	this.setState({promptType: selectPromptType})
		// 	if(dialog.data)
		// 		promptText = dialog.data[0].text;
		// }
		// console.log("ptype: " , pType)
		// console.log("prefilled Text:", this.state.textField)
		console.log("selected prompt type: ", this.state.promptType)
		console.log("pType: ", pType)

		let content = null;
		switch(type){
			case "text": content = (
					<form className="marginTop">
						<div className="teal lighten-2">Please input text field to send.</div>
						<DoneBtn type="text" dialog={dialog} textField={this.state.textField} isStep={this.props.isStep} stepId={this.props.stepId}/>
					</form>				
				);
				break;

			case "sequence":content = (
					<form className="marginTop">
						<div className="teal lighten-2">Please input the steps</div>
						<NextModule dialog={dialog}/>
					</form>	
				);
				break;

			case "prompt":content = (
					<div> 
						<div className="divider"></div>
							
						<span>Please choose prompt type and input a text to Send</span>
	              				<Select
								  name={this.props.dialogName}
								  value={selectPromptType}
								  options={options}
								  onChange={this.logChange.bind(this)}
								/>
						
						<DoneBtn 
							type={pType} 
							dialog={dialog} 
							promptType={this.state.promptType} 
							textField={this.state.textField} 
							isStep={this.props.isStep} stepId={this.props.stepId}/>
					</div>
				);
				break;

			case "end":content = (
					<form>
						<div className="teal lighten-2">Please input a final text to end the dialog.</div>
						<DoneBtn type="end" dialog={dialog} textField={this.state.textField}/>
					</form>
				);
				break;
			default: content = (
					<span> None chosen </span>
				)
				break;
		}

		return content;
	}


	render(){
		let content = this.handleFieldContent();
		// console.log("PROMPT type: ",this.state.promptType)
		
		return(
			<div className="row">
				<div className="col s12">
					<div className="right-align">
								<a className="white-text" onClick={this.close.bind(this)}>
									<i className="material-icons">clear</i>
								</a>
							</div>
					{content}
				</div>
			</div>
		)
	}
}

export default NextFieldInput;