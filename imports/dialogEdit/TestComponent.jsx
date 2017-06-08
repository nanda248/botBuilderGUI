import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class TestComponent extends Component{

	constructor(){
		super();

		this.state={
			value: ""
		}
	}


	componentDidMount(){
	  $(document).ready(function() {
	    $('select').material_select();
	  });		  
	  $(ReactDOM.findDOMNode(this.refs.testSelect)).on('change',this.handleSelectChange.bind(this));
	}

	handleSelectChange(event) {
		event.preventDefault();
		var test = event.target.value;
     	this.setState({value: test});
   }

	render(){
		console.log(this.state.value)
		dValue = "Nanda";
		dText = "Nothing here"
		return(
			<div>
				<h5>Test Component</h5>
				<div>
						<div className="input-field col s12">
					    <select ref="testSelect">
					      <option value={dValue} disabled selected>{dText}</option>
					      <option value="123">Option 1</option>
					      <option value="223">Option 2</option>
					      <option value="332">Option 3</option>
					    </select>
					    <label>Materialize Select</label>
					  </div>		
				</div>
			</div>
		)
	}
}

export default TestComponent;