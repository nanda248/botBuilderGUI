import React, {Component} from 'react';

import {Dialogs} from './api/dialogs.js';
import {DialogSet} from './api/dialogSet.js';

class AddDialogSetBtn extends Component {
  
  constructor(){
    super();
    this.state={
      subscription: {
        dialogSet: Meteor.subscribe("allDialogSets")
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.dialogSet.stop();
  }


  addDialogSet(){
    let dialogs = this.props.dialog;
    let dialogSetId = this.props.dialogSetId;

    var dialogsArrray = []
    for(i=0 ; i<dialogs.length ; i++ ){
      var pathNameTest = "/" + dialogs[i].name;
      var regexTest = "^"+ dialogs[i].regex;
      var scenarioTest = dialogs[i].name;
      dialogsArrray.push({
        pathName: pathNameTest,
        regex: regexTest,
        scenario: scenarioTest
      })
    }

    console.log("Dialogs Array: ", dialogsArrray)

    for(i=0 ; i<dialogs.length ; i++){
      console.log("each dialog: ", dialogs[i].name)
      var pathName = "/" + dialogs[i].name;
      var regex = "^"+ dialogs[i].regex;
      var scenario = dialogs[i].name;

      Meteor.call('dialogSetCreate',pathName, regex, scenario, dialogSetId, (error,data) => {
      if(error)
        Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
      else
        console.log("SUCCESS!", dialogs[i].name);
    })

    }
   
  }

  render(){

      return (
        <div>
          <a className="waves-effect waves-light btn smallerText" onClick={this.addDialogSet.bind(this)}>
            Add to dialogs  
          </a>
        </div>
      )
  }
}

export default AddDialogSetBtn;