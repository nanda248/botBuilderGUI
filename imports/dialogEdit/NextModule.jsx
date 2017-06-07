import React, {Component} from 'react';

class NextModule extends Component{

	addNextModule(){
		dialog = this.props.dialog;
		id = dialog.id;
		swal({
		  title: "New Module ID",
		  text: "Write new name for module ID:",
		  type: "input",
		  showCancelButton: true,
		  closeOnConfirm: false,
		  animation: "slide-from-top",
		  inputPlaceholder: "Write something"
		},
		function(inputValue){
		  if (inputValue === false) return false;
		  
		  if (inputValue === "") {
		    swal.showInputError("You need to write something!");
		    return false
		  }
		  Meteor.call('addNextStep',id, inputValue, (error,data)=>{
			if(error)
				Bert.alert(error.error, 'danger','growl-top-right','fa-frown-o');
			else
				console.log("addNextStep successful!")
		})
		  
		  swal("Nice!", inputValue + " added to the stack.", "success");
		});

			
	}


	render(){

		return(
			<div className="paddingBottom">
				<a className="btn waves-effect waves-light" onClick={this.addNextModule.bind(this)}>Next Module</a>
			</div>
		)
	}
}

export default NextModule;