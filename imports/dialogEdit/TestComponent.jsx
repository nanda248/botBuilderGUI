import React,{Component} from 'react';

class TestComponent extends Component{

	constructor(){
		super();

		this.state={
			value: ""
		}
	}


	componentDidMount(){
		$(React.findDOMNode(this.refs.testSelect)).on('change',this.handleSelectChange);
	}

	handleSelectChange(event) {
     setState({value: event.target.value});
   }

	render(){

		return(
			<div>
				<h5>Test Component</h5>
				<div>
					<div className="input-field col s12">
					    <select ref="testSelect" value={this.state.value}>
					      <option value="" disabled selected>Choose your option</option>
					      <option value="1">Option 1</option>
					      <option value="2">Option 2</option>
					      <option value="3">Option 3</option>
					    </select>
					    <label>Materialize Select</label>
					  </div>
				</div>
			</div>
		)
	}
}

export default TestComponent;