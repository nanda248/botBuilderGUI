import React,{Component} from 'react';

class DialogSingleCard extends Component {
  
    removeDialog(){
      let dialogId = this.props.dialog._id;
      let dialogName = this.props.dialog.name;

      swal({
        title: "Are you sure?",
        text: `${dialogName} will be removed from the category.`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function(){
        Meteor.call('dialogDelete', dialogId);
        Meteor.call('dialogSetRemove', dialogName);       // dialogName = scenario (in this case), need to change later
        swal("Deleted!",`${dialogName} has been removed from the category.`,"success");
      }); 
    }
  
    render(){
  		let dialogName = this.props.dialog.name;

  		console.log("DIALOG: ", dialogName);

        return (
        	<div className="col s4">
            <div className="row">
              <div className="card blue-grey darken-1 z-depth-3">
                <div className="card-content white-text">
                  <span className="card-title">{dialogName}</span>
                  <p>This is a dialog module. Please edit me to structure your bot.</p>
                </div>
                <div className="card-action">
                  <a href="#" onClick={this.removeDialog.bind(this)} className="smallText">Remove </a>
                  <a href={'/editDialog/${dialogName}'}  className="smallText">Edit </a>
                </div>  
              </div>
            </div>
          </div>
        )
    }
}

export default DialogSingleCard;