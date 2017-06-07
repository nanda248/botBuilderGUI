import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NextFieldInput from './NextFieldInput';

class StepModule extends Component {

	constructor(props){
		super(props);
		this.state={
			type: "",
			showField: false
			// showNextModule: false
		}
	}


	// componentDidMount(){
	// 	$(document).ready(function(){
	// 		$('select').material_select();
	// 	    $(this.refs.type).material_select(this.handleChangeSelect.bind(this));
	// 	});
		
	// }

	componentDidMount() {
	  var element = ReactDOM.findDOMNode(this.refs.typeSelect)

	  $(element).ready(function() {
	    $('select').material_select();
	    $(this.refs.type).material_select(this.handleChangeSelect.bind(this));
	  });
	}

	handleChangeSelect(event){
		event.preventDefault();
		var type = event.target.value;
		this.setState({type: type, showField:true})
		// Meteor.call('dialogAddType', this.props.dialogName, type, (error, data)=> {
		// 	if(error)
		// 		Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
		// 	else 
		// 		console.log("dialogAddType Successful!")
		// })
	}

	render(){
		let selectedType = this.state.type;
		console.log("Selected type in steps", selectedType)
		let fieldArea = this.state.showField ? <NextFieldInput type={selectedType} dialog={this.props.dialog}/> : <span></span>
		return(
			<div className="blue lighten-3 lighten-2 z-depth-3">             
              	<div className="row">
          			<form className="col s12 bigMarginBottom">
          				<span className="boldText">ID: {this.props.dialogName}</span>
          				<div className="input-field">
					    <select className="browser-default" ref="type" onChange={this.handleChangeSelect.bind(this)}>
					      <option value="" disabled selected>Select module type</option>
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
		)
	}
}

export default StepModule;