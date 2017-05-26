import React,{Component} from 'react';

class DialogSingleCard extends Component {
  
  
    render(){
  		let dialog = this.props.dialog;

  		console.log("DIALOG: ", dialog);

        return (
        	<div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{dialog}</span>
              <p>This is a dialog module. Please edit me to structure your bot.</p>
            </div>
            <div className="card-action">
              <a href="#">Add Step</a>
              <a href="#">Add Condition</a>
            </div>
          </div>
        )
    }
}

export default DialogSingleCard;