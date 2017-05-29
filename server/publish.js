Dialogs = new Mongo.Collection('dialogs');
DialogSet = new Mongo.Collection('dialogSet');

Meteor.publish("allDialogs", function(){
	return Dialogs.find();
});

Meteor.publish("allDialogSets", function(){
	return DialogSet.find();
});