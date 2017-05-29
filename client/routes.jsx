import React from 'react';
import {mount} from 'react-mounter';

import {MainLayout} from './layouts/MainLayout.jsx';
import App from '../imports/App.jsx';
import DialogMain from '../imports/dialogEdit/DialogMain';

FlowRouter.route('/', {
	action() {
		mount( MainLayout, {
			content: (<App />)
		})
	}
});


FlowRouter.route('/editDialog/:dialogName', {
	action(params) {
		mount( MainLayout, {
			content: (<DialogMain dialogName={params.dialogName}/>)
		})
	},
	name: "dialogEditMain"
});