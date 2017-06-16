import React,{Component} from 'react';

class DialogSingleCard extends Component {
  
    removeDialog(){
      let dialogId = this.props.dialog._id;
      let dialogName = this.props.dialog.name;
      let dialogSetId = this.props.dialogSetId;
      swal({
        title: "Are you sure?",
        text: `${dialogName} and all the contents inside will be removed from the category.`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function(){
        Meteor.call('dialogDelete', dialogId);
        Meteor.call('dialogSetRemove', dialogName, dialogSetId);       // dialogName = scenario (in this case), need to change later
        swal("Deleted!",`${dialogName} has been removed from the category.`,"success");
      }); 
    }
  
    render(){
  		let dialogName = this.props.dialog.name;
      let dialogSet = this.props.dialogSet;
      var addedToDialogSet = false;
      for(i=0 ; i<dialogSet[0].dialogs.length ; i++){
        if(dialogSet[0].dialogs[i].scenario === dialogName){
          addedToDialogSet = true;
        }
      }
      badgeArea = addedToDialogSet ? (<div><span className="badge badgeBox black-text">Added</span></div>) : (<span className="red-text text-darken-1">Not Added</span>)

        return (
        	<div className="col s4 l3">
            <div className="row">
              <div className="card small blue-grey darken-1 z-depth-3">
                <div className="card-content white-text">
                  <span className="card-title">{dialogName}</span>
                  <p>This is a dialog module. Please edit me to structure your bot.</p>
                </div>
                <div className="card-action">
                  <div className="row">
                    <div className=" col s8">
                      <a href="#" onClick={this.removeDialog.bind(this)} className="smallText">Remove </a>
                      <i className="tiny material-icons">mode_edit</i>
                      <a href={`/editDialog/${dialogName}`}  className="smallText">Edit </a>
                    </div>
                    <div className=" col s4">
                      {badgeArea}
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        )
    }
}

export default DialogSingleCard;