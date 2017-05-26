import React, {Component} from 'react';

class ConvertCode extends Component {

	handleCode(event){
		console.log(event);
		var data = this.refs.code.value;
		console.log("data in convertCode", data)
	}

	render(){
		return(
			  <div className="row">
			    <form className="col s12">
			      <div className="row">
			        <div className="input-field col s12">
			          <textarea 
			          	id="json" 
			          	className="materialize-textarea"
			          	onChange={this.handleCode.bind(this)}
			          	ref="code">
			          </textarea>
			          <label for="JSON"> Insert your data here</label>
			        </div>
			      </div>
			    </form>
			  </div>
		)
	}
}

export default ConvertCode;