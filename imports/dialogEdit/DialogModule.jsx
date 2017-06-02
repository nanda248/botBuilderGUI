import React, {Component} from 'react';

import NextFieldInput from './NextFieldInput'

class DialogModule extends Component {

	constructor(props){
		super(props);
		this.state={
			type: "",
			showField: false,
			showNextModule: false
		}
	}


	componentDidMount(){
		// $(React.findDOMNode(this.refs.type)).on('change', this.handleChangeSelect)
		$(this.refs.type).material_select(this.handleChangeSelect.bind(this));
	}

	handleChangeSelect(event){
		event.preventDefault();
		this.setState({type: event.target.value, showField:true})
	}

	render(){
		console.log("select type in render", this.state.type)
		console.log("dialog module showNextModule", this.state.showNextModule);
		let selectedType = this.state.type;
		let fieldArea = this.state.showField ? <NextFieldInput type={selectedType}/> : <span></span>

		return(			
			<div className="row">
				<div className="col s4 offset-s4 grey lighten-4">
					<div className="card small blue-grey lighten-2 z-depth-3">
	                <div className="card-content">
	                  	<div className="row">
	              			<form className="col m12">
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
	                  	</div>
	        	
	                </div>
	                <div className="card-action">
	                	{fieldArea}
	                </div>  
	              </div>
				</div>
             </div>
			
		);
	}
}

export default DialogModule;