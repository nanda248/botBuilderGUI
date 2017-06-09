import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import NextModule from './NextModule';
import DoneBtn from './DoneBtn';

class NextFieldInput extends TrackerReact(Component){

	constructor(props){
		super(props);
		let text = ""
		if(props.dialog.data)
			text = props.dialog.data[0].text;
		
		if(props.dialog.type === "prompt" && props.dialog.data){
			console.log("in true loop")
			this.state = {textField: text, promptType: props.dialog.data[0].type}
		}else if(props.dialog.data && props.type!=="sequence"){
			this.state = {textField: text, promptType: "" }
		}
		else{
			this.state = {textField: "", promptType: ""}
		}
		
	}

	componentDidMount(){
		$(document).ready(function() {
	    	$('select').material_select();
	  	});		  
	  	$(ReactDOM.findDOMNode(this.refs.dataType)).on('change',this.handleSelectChange.bind(this));
	}

	componentWillUnmount(){
		 $('select').material_select('destroy');
	}

	handleSelectChange(event){
		event.preventDefault();
		const dataType = event.target.value;
		if(Meteor.isClient)
			Session.set('promptTypeChosen', dataType)
		this.setState({promptType: dataType})
	}

	handleFieldContent(){
		let type = this.props.type;
		let dialog = this.props.dialog;
		var pType = type;
		var selectPromptType = "Choose Prompt Type";
		var promptText = "";

		if(this.state.promptType !== ""){
			selectPromptType = this.state.promptType;
			pType = "prompt" + this.state.promptType;
		}
		
		// if(dialog.type==="prompt" && dialog.data){
		// 	selectPromptType = dialog.data[0].type;
		// 	pType = "prompt" + selectPromptType;
		// 	this.setState({promptType: selectPromptType})
		// 	if(dialog.data)
		// 		promptText = dialog.data[0].text;
		// }
		// console.log("ptype: " , pType)
		console.log("prefilled Text:", this.state.textField)
		console.log("preselected prompt type: ", this.state.promptType)

		let content = null;
		switch(type){
			case "text": content = (
					<form className="marginTop">
						<div className="teal lighten-2">Please input text field to send.</div>
						<DoneBtn type="text" dialog={dialog} textField={this.state.textField}/>
					</form>				
				);
				break;

			case "sequence":content = (
					<form className="marginTop">
						<div className="teal lighten-2">Please input the steps</div>
						{/*<NextModule dialog={dialog}/>*/}
					</form>	
				);
				break;

			case "prompt":content = (
					<div> 
						<div className="divider"></div>
						<div className="teal lighten-2">Please choose prompt type and input a text to Send</div>
						<div className="input-field">
							<select ref="dataType">
						      <option value="" disabled selected>{selectPromptType}</option>
						      <option value="text">text</option>
						      <option value="number">number</option>
						      <option value="time">time</option>
						      <option value="confirm">confirm</option>
						    </select>
						    <label>Choose prompt type</label>							
						</div>	
						
						<DoneBtn type={pType} dialog={this.props.dialog} promptType={this.state.promptType} textField={this.state.textField}/>
					</div>
				);
				break;

			case "end":content = (
					<form>
						<div className="teal lighten-2">Please input a final text to end the dialog.</div>
						<DoneBtn type="end" dialog={this.props.dialog} textField={this.state.textField}/>
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
					{content}
				</div>
			</div>
		)
	}
}

export default NextFieldInput;