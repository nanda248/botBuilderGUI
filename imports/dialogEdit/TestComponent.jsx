import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const styles ={
	backgroundColor: '#708090',
	height: '200px',
	margin: '10px'
}

class TestComponent extends Component{

	constructor(){
		super();

		this.state={
			value: ""
		}
	}

	close(event){
		event.preventDefault();
		this.setState({value: "closed"})
	}


	// componentDidMount(){
	//   $(document).ready(function() {
	//     $('select').material_select();
	//   });		  
	//   $(ReactDOM.findDOMNode(this.refs.testSelect)).on('change',this.handleSelectChange.bind(this));
	// }

	// handleSelectChange(event) {
	// 	event.preventDefault();
	// 	var test = event.target.value;
 //     	this.setState({value: test});
 //   }

	render(){
		console.log(this.state.value)
		
		return(
			<div  style={styles}>
				<h5 className="center-align">Test Component</h5>
				<div className="row">
					<div className="right-align">
						<a className="white-text" onClick={this.close.bind(this)}>
							<i className="material-icons">clear</i>
						</a>
					</div>
					<a className="white-text right-align" onClick={this.close.bind(this)}>
						<i className="material-icons">clear</i>
					</a>
					

					{/*
						<div className="input-field col s12">
					    <select ref="testSelect">
					      <option value={dValue} disabled selected>{dText}</option>
					      <option value="123">Option 1</option>
					      <option value="223">Option 2</option>
					      <option value="332">Option 3</option>
					    </select>
					    <label>Materialize Select</label>
					  </div>

						*/}			
				</div>
			</div>
		)
	}
}

export default TestComponent;