import React, {Component} from 'react';

import NextFieldInput from './NextFieldInput'

class DialogModule extends Component {

	constructor(props){
		super(props);
		this.state={
			type: "",
			showField: false
			// showNextModule: false
		}
	}


	componentDidMount(){
		$(document).ready(function(){
			$('select').material_select();
		    // $(this.refs.type).material_select(this.handleChangeSelect.bind(this));
		});
		
	}

	handleChangeSelect(event){
		event.preventDefault();
		var type = this.refs.type.value;
		// var type = event.target.value;
		this.setState({type: type, showField:true})
		Meteor.call('dialogAddType', this.props.dialogName, type, (error, data)=> {
			if(error)
				Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
			else 
				console.log("dialogAddType Successful!")
		})
	}

	render(){
		let selectedType = this.state.type;
		console.log("selectedType: ", selectedType)
		let dialog = this.props.dialog;
		let fieldArea = this.state.showField ? <NextFieldInput type={selectedType} dialog={this.props.dialog}/> : <span></span>
		var typeSelected = "Choose type";
		if(dialog.type)
			typeSelected=dialog.type;
		console.log("preselected type: ", typeSelected)
		return(			

					<div className="card-panel blue-grey lighten-2 z-depth-3">             
	                  	<div className="row">
	              			<form className="col s12">
	              				<span className="boldText">ID: {this.props.dialogName}</span>
	              				<div className="input-field">
							    <select ref="type" onChange={this.handleChangeSelect.bind(this)} >
							      <option value="" disabled selected>{typeSelected}</option>
							      <option value="text">text</option>
							      <option value="sequence">sequence</option>
							      <option value="prompt">prompt</option>
							      <option value="end">end</option>
							    </select>				    
							  </div>	
	              			</form>   
	              			<div className="col s12">
			                	{fieldArea}
			                </div>                		
	                  	</div>        
	              </div>

		);
	}
}

export default DialogModule;