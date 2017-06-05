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
		// $(React.findDOMNode(this.refs.type)).on('change', this.handleChangeSelect)
		$(this.refs.type).material_select(this.handleChangeSelect.bind(this));
	}

	handleChangeSelect(event){
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
		console.log("select type in render", this.state.type)
		// console.log("dialog module showNextModule", this.state.showNextModule);
		let selectedType = this.state.type;
		let fieldArea = this.state.showField ? <NextFieldInput type={selectedType} dialog={this.props.dialog}/> : <span></span>

		return(			

					<div className="card-panel blue-grey lighten-2 z-depth-3">             
	                  	<div className="row">
	              			<form className="col s12">
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

		);
	}
}

export default DialogModule;