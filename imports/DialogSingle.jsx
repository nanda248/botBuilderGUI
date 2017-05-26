import React,{Component} from 'react';

class DialogList extends Component {
  
  
    render(){
  		let dialog = this.props.dialog;

  		console.log("DIALOG: ", dialog);

        return (
        	<li>
        		{dialog}
        	</li>
        )
    }
}

export default DialogList;