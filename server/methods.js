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
			createdAt: new Date(),
			id: name
		})
	},

	dialogDelete(dialogId){
		Dialogs.remove(dialogId);
	},

	dialogAddType(id,type){
		if(!id || !type)
			throw new Meteor.Error('Error in dialogAddType')
		Dialogs.update({id: id},{
			$set: {
				type: type
			}
		})
	},

	dialogTextText(id, text){
		if(!id || !text)
			throw new Meteor.Error('Error in dialogTextText')
		let dialog = Dialogs.findOne({"id": id});

		if(dialog.data){
			Dialogs.update({id: id, "data.text": dialog.data[0].text},{
				$set: {
					'data.$.text': text
				}
			})
		} else{
			Dialogs.update({id: id},{
				$addToSet: {
					data: {
						"text": text
					}
				}
			})
		}
		
	},

	dialogEndText(id, text){
		if(!id || !text)
			throw new Meteor.Error('Error in dialogTextText')
		let dialogs = Dialogs.findOne({"id": id});
		if(dialogs.data){
			Dialogs.update({id: id, "data.text": dialogs.data[0].text},{
				$set: {
					'data.$.text': text
				}
			})
		} else{
			Dialogs.update({id: id},{
				$addToSet: {
					data: {
						"text": text
					}
				}
			})
		}
	},

	dialogPromptTextField(id, type, text){
		if(!id || !text)
			throw new Meteor.Error('Error in dialogPromptText')
		let dialogs = Dialogs.findOne({"id": id});
		if(dialogs.data){
			Dialogs.update({id: id, "data.text": dialogs.data[0].text},{
				$set: {
					'data.$.type': type,
					'data.$.text': text
				}
			})
		} else{
			Dialogs.update({id: id},{
				$addToSet: {
					data: {
						"type":type,
						"text": text
					}
				}
			})
		}
	},

	RemovePromptTypeAndData(id, text){
		if(!id || !text)
			throw new Meteor.Error('Error in RemovePromptTypeAndData')
		Dialogs.update({id: id}, { 
			$unset: {
				data: ""
			}
		})
	},

// For step operations
	addNextStep(id, newId){
		if(!id || !newId)
			throw new Meteor.Error('Error in addNextStep')
		Dialogs.update({id: id},{
				$addToSet: {
					steps: {
						"id": newId
					}
				}
		})
	},

	dialogAddTypeInStep(id, stepId, type, index){
		// console.log(id);
		// console.log(stepId);
		// console.log(type);
		// console.log(index);
		if(!id || !type || !stepId){
			throw new Meteor.Error('Error in dialogAddTypeInStep')
		}
		let dialog = Dialogs.findOne({"id": id});
		console.log(dialog.steps[index].id)
		if(dialog.steps){
			console.log("true loop")
			Dialogs.update({id: id, "steps.id": dialog.steps[index].id },{ // step id is not needed actually
				$set: {
					'steps.$.type': type
				}
			})
		} else {
			console.log("false loop")
			Dialogs.update({id: id}, {
				$addToSet: {
					steps: {
						"id": stepId,
						"type": type
					}
				}
			})
		}
		
	},

	stepTextText(id, stepId, text, index){
		if(!id || !stepId || !text)
			throw new Meteor.Error('Error in stepTextText')
		// let dialog = Dialogs.findOne({"id": id})
		Dialogs.update({id: id, "steps.id": stepId},{
			$addToSet: {
				'steps.$.data': {
					text: text
				}
			}

		})
	},

	stepPromptText(id, stepId, type, text){
		if(!id || !stepId || !type || !text)
			throw Meteor.Error('Error in stepPromptText')
		Dialogs.update({id: id, "steps.id": stepId},{
			$addToSet:{
				'steps.$.data': {
					type: type,
					text:text
				}
			}
		})

	}
});