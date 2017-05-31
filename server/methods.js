Meteor.methods({
	initialDialogSetCreate(){
		DialogSet.insert({
			createdAt: new Date()
		});
	},

	dialogSetCreate(pathName, regex, scenario, dialogSetId){
		if(!pathName || !regex || !scenario)
			throw new Meteor.Error('Error creating dialog set.');
		DialogSet.update({_id: dialogSetId} , {			
			$addToSet: {
				dialogs: {
					"path": pathName,
					"regex": regex,
					"scenario": scenario
				}
			}
		})
	},

	dialogSetRemove(scenario, dialogSetId){
		// if(!scenario)
		// 	throw new Meteor.Error('Error removing dialog set.');
		DialogSet.update({_id: dialogSetId}, { 
			$pull: {
				dialogs:{
					scenario: scenario
				}
			}
		})
	},

	dialogCreate(name, regex){
		if(!name || !regex)
			throw new Meteor.Error('Please ensure all fields are filled.');
		Dialogs.insert({
			name: name,
			regex: regex,
			createdAt: new Date()
		})
	},

	dialogDelete(dialogId){
		Dialogs.remove(dialogId);
	},

	dialogAddIdType(id,type){

	},

	dialogAddText(){

	},

	dialogAddStep(){

	},

	dialogAddPrompt(){

	},

	dialogEndText(){

	}

});