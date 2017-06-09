import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NextFieldInput from './NextFieldInput'

class DialogModule extends Component {

	constructor(props){
		super(props);
		
		if(this.props.dialog.type){
			this.state={type: this.props.dialog.type, showField: true}
		}
		else{
			this.state={type: "", showField: false}
		}
		console.log(this.state.type)
	}


	componentDidMount(){
		$(document).ready(function() {
			console.log("SELECT", $('select'))
	    	$('select').material_select();
	  	});		  
	  	$(ReactDOM.findDOMNode(this.refs.type)).on('change',this.handleSelectChange.bind(this));
	}

	componentWillUnmount(){
		 $('select').material_select('destroy');
	}


	handleSelectChange(event){
		event.preventDefault();
		var type = event.target.value;
		
		this.setState({type: type, showField:true})
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

		if(dialog.type)
			typeSelected = dialog.type;
		console.log("preselected type: ", typeSelected)
		console.log("selectedType: ", selectedTypeValue)
		console.log("showField: ", this.state.showField)

		let fieldArea = this.state.showField ? <NextFieldInput type={selectedTypeValue} dialog={this.props.dialog}/> : <span></span>
		// let fieldArea = (<span></span>)
		return(			

					<div className="card-panel blue-grey lighten-2 z-depth-3">             
	                  	<div className="row">
	              			<form className="col s12">
	              				<span className="boldText">ID: {this.props.dialogName}</span>
	              				<div className="input-field">
							    <select ref="type">
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