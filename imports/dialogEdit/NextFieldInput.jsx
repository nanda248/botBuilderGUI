import React, {Component} from 'react';
import NextModule from './NextModule';

class NextFieldInput extends Component{

	constructor(props){
		super(props);
		this.state={
			promptType: "",
		}
	}


	handleChangeSelect(event){
		event.preventDefault();
		const dataType = this.refs.dataType.value;
		console.log("handleChangeSelect: ", dataType)
		if(Meteor.isClient)
			Session.set('promptTypeChosen', dataType)
		this.setState({promptType: dataType})
	}

	handleTextInput(event){
		event.preventDefault();
		const text = this.refs.prompt.value.trim();
		console.log("TEXT for next module", text);
		
	}

	handleFieldContent(){
		let type = this.props.type;
		let content = null;
		switch(type){
			case "text": content = (
					<div>
						<div className="teal lighten-2">Please input text field to send.</div>
						<div className="input-field">						
							<input id="text" type="text" className="validate"/>
							<label>Text</label>							
						</div>	
					</div>				
				);
				break;

			case "sequence":content = (
					<div>
						<div className="teal lighten-2">Please input the steps</div>
						<div className="input-field">						
							<input id="message" type="text" className="validate"/>
							<label>Text</label>							
						</div>	
					</div>	
				);
				break;

			case "prompt":content = (
					<div> 
						<div className="teal lighten-2">Please choose prompt type and input a text to Send</div>
						<div className="input-field" onChange={this.handleChangeSelect.bind(this)}>
							<select className="browser-default" ref="dataType" onChange={this.handleChangeSelect.bind(this)}>
						      <option value="" disabled selected>Select module type</option>
						      <option value="text">text</option>
						      <option value="number">number</option>
						      <option value="time">time</option>
						      <option value="confirm">confirm</option>
						    </select>							
						</div>	
						<div className="input-field" onChange={this.handleTextInput.bind(this)}>
							<input id="prompt" type="text" className="validate"/>
							<label>Text</label>	
						</div>
						<NextModule />
					</div>
				);
				break;

			case "end":content = (
					<div>
						<div className="teal lighten-2">Please input a final text to end the dialog.</div>
						<div className="input-field">						
							<input id="endText" type="text" className="validate"/>
							<label>Text</label>							
						</div>	
					</div>
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
		console.log("PROMPT type: ",this.state.promptType)
		console.log("show next module: ", this.state.showNextModule)
		return(
			<div className="row">
				<form className="col s12">
					{content}
				</form>
			</div>
		)
	}
}

export default NextFieldInput;