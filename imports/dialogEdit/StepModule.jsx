import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import NextFieldInput from './NextFieldInput';

class StepModule extends Component {

	constructor(props){
		super(props);
		this.state={
			type: "",
			showField: false,
		}
	}

	logChange(val){
		var type = val.value;
		this.setState({type: type, showField: true});

		// get index of the step ID in array steps[]
		let dialog = this.props.dialog;
		let stepId = this.props.stepId;
		var index = 0;
		for(i=0 ; i<dialog.steps.length ; i++){
			if(dialog.steps[i].id === stepId)
				break;
			else
				index++;
		}

		console.log("dialogID", dialog.id)
		console.log("index", index)
		console.log("stepId", stepId)
		console.log("type", type)

		Meteor.call('dialogAddTypeInStep', dialog.id, stepId, type, index, (error, data)=> {
			if(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			else 
				console.log("dialogAddType Successful!")
		})
	}

	handleChangeSelect(event){
		event.preventDefault();
		var type = event.target.value;
		this.setState({type: type, showField:true})
	}

	render(){
		let selectedType = this.state.type;
		// console.log("Selected type in steps", selectedType)

		var typeSelected = ""

		var options = [
		  { value: 'text', label: 'Text' },
		  { value: 'sequence', label: 'Sequence' },
		  { value: 'prompt', label: 'Prompt' },
		  { value: 'end', label: 'End' },
		];

		let fieldArea = this.state.showField ? <NextFieldInput type={selectedType} dialog={this.props.dialog} isStep={true} stepId={this.props.stepId}/> : <span></span>
		return(
			<div className="blue lighten-3 lighten-2 z-depth-3">             
              	<div className="row">
              		<div className="col s12 bottomGap">
              			<p>ID: {this.props.stepId}</p>
          				<span>Please select type:</span>
	              				<Select
								  name={this.props.stepId}
								  value={typeSelected}
								  options={options}
								  onChange={this.logChange.bind(this)}
								  disabled={disabled}
								/>  
              		</div>
              		
          			<div className="col s12">
	                	{fieldArea}
	                </div>                		
              	</div>          
          </div>
		)
	}
}

export default StepModule;