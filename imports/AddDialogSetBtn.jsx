import React, {Component} from 'react';
import jsonfile from 'jsonfile';
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
    let dialogSet = this.props.dialogSet;
    var found = false;
    // var dialogsArrray = []
    // for(i=0 ; i<dialogs.length ; i++ ){
    //   var pathNameTest = "/" + dialogs[i].name;
    //   var regexTest = "^"+ dialogs[i].regex;
    //   var scenarioTest = dialogs[i].name;
    //   dialogsArrray.push({
    //     pathName: pathNameTest,
    //     regex: regexTest,
    //     scenario: scenarioTest
    //   })
    // }

    // console.log("Dialogs Array: ", dialogsArrray)
 
    // var file = '/data.json'
    // var obj = dialogSet;
     
    // jsonfile.writeFile(file, obj, function (err) {
    //   console.error(err)
    // })

    for(i=0 ; i<dialogs.length ; i++){
      found = false;
      var pathName = "/" + dialogs[i].name;
      var regex = "^("+ dialogs[i].regex+ ")";
      var scenario = dialogs[i].name;
      var separator = "|";
      regex = regex.split(',').join(separator);
      regex = regex.replace(" ","");
       for(j=0 ; j<dialogSet[0].dialogs.length ; j++){ 
        if(dialogSet[0].dialogs[j].scenario === dialogs[i].name){
          found = true;
          break;
        }
      }
      if(found)
        console.log("FOUND IT.")
      else{
        Meteor.call('dialogSetCreate',pathName, regex, scenario, dialogSetId, (error,data) => {
        if(error)
          Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
        else
          console.log("SUCCESS!", dialogs[i].name);
      })
      }
    }
   
  }

  render(){

      return (
        <div>
          <a className="btn-small waves-effect waves-light" onClick={this.addDialogSet.bind(this)}>
            Add to dialogs  
          </a>
        </div>
      )
  }
}

export default AddDialogSetBtn;