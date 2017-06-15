import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactDOM from 'react-dom';

import NextFieldInput from './NextFieldInput'

class DialogModule extends Component {

	constructor(props){
		super(props);
		this.state={
			type: "",
			showField: false
		}
		// if(this.props.dialog.type){
		// 	this.state={type: this.props.dialog.type, showField: true}
		// }
		// else{
		// 	this.state={type: "", showField: false}
		// }
	}

	componentWillMount(){
		if(this.props.dialog.type){
			// this.state={type: this.props.dialog.type, showField: true}
			this.setState({type: this.props.dialog.type, showField: true})
		}
	}


	logChange(val){
		var type = val.value;
		this.setState({type: type, showField: true});
		Meteor.call('dialogAddType', this.props.dialogName, type, (error, data)=> {
			if(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			else 
				console.log("dialogAddType Successful!")
		})
	}

	render(){
		let selectedTypeValue = this.state.type;
		let dialog = this.props.dialog;
		var typeSelected = "Choose type";
		var typeSelectedValue = "";
		var options = [
		  { value: 'text', label: 'Text' },
		  { value: 'sequence', label: 'Sequence' },
		  { value: 'prompt', label: 'Prompt' },
		  { value: 'end', label: 'End' },
		];

		typeSelected = "Select Type:"
		disabled = false;
		if(dialog.type)
			typeSelected = dialog.type;
		if(dialog.type === "prompt" && dialog.data){
			disabled = true
		}

		// console.log("preselected type: ", typeSelected)
		// console.log("selectedType: ", selectedTypeValue)
		// console.log("showField: ", this.state.showField)
		console.log("disabled: ", disabled)

		let fieldArea = this.state.showField ? <NextFieldInput type={selectedTypeValue} dialog={this.props.dialog}/> : <span></span>
		
		return(			
					<div className="card-panel blue-grey lighten-2 z-depth-3">             
	                  	<div className="row">
	              				<span>Please select type:</span>
	              				<Select
								  name={this.props.dialogName}
								  value={typeSelected}
								  options={options}
								  onChange={this.logChange.bind(this)}
								  disabled={disabled}
								/>  
	              			<div className="col s12">
			                	{fieldArea}
			                </div>                		
	                  	</div>        
	              </div>

		);
	}
}

export default DialogModule;