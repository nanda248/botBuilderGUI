import React, {Component} from 'react';

class NewModuleIdModal extends Component{


	getNewModuleId(event){
		event.preventDefault();
		newId = this.refs.moduleId.value.trim();
		Session.set("newModuleId", newId);
	}

	render(){

		return(
			<div>
				
						<div className="modal-content">
					      <h4>Provide ID for new module</h4>
					      	<form onSubmit={this.getNewModuleId.bind(this)} >
						      <div className="input-field col s12">
						      	<input type="text" id="moduleId" ref="moduleId"/>
					          	<label for="moduleId" className="active">Module ID:</label>
				        	  </div>
				        	</form>
					    </div>
					    <div className="modal-footer">
					      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Ok</a>
					    </div>

			</div>
		)
	}
}

export default NewModuleIdModal;