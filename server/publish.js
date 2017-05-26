
Dialogs = new Mongo.Collection('dialogs');

Meteor.publish("allDialogs", function(){
	return Dialogs.find();
});