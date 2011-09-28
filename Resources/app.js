Ti.UI.backgroundColor = '#ddd';

var win = Ti.UI.createWindow({
	backgroundColor:'#ddd'
});
var options = {
	barHeight: 30,
	barColor: '#8888ff'
};

var viewContent = Ti.UI.createView({
	layout: 'vertical',
	left:10,
	right: 10
});

for (var i = 0; i < 5; i++) {
	viewContent.add(Ti.UI.createLabel({
		text:'Here is some text that will be covered by the sliding drawer.',
		top:30,
		height:'auto',
		width:'auto',
		color: '#000'
	}));
}

win.add(viewContent);

var handles = require('SlidingDrawer').createSlidingDrawer({position:'left'});

win.add(handles[0]);
win.add(handles[1]);

win.open();