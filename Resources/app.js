Ti.UI.backgroundColor = '#ddd';

var win = Ti.UI.createWindow({
	backgroundColor:'#ddd'
});
var options = {
	barHeight: 30,
	barColor: '#8888ff'
};

var viewBackground = Ti.UI.createView({
	layout: 'vertical',
	left:10,
	right: 10
});

for (var i = 0; i < 5; i++) {
	viewBackground.add(Ti.UI.createLabel({
		text:'Here is some text that will be covered by the sliding drawer.',
		top:30,
		height:'auto',
		width:'auto',
		color: '#000'
	}));
}

var viewContent = Ti.UI.createView({
	layout: 'vertical', 
	height: 'auto',
	width: 'auto',
	backgroundColor: '#000'
});
for (var i = 0; i < 5; i++) {
	viewContent.add(Ti.UI.createLabel({
		text:'Labels inside the sliding drawer.',
		top:30,
		height:'auto',
		width:'auto',
		color: '#fff'
	}));
}

var handles = require('SlidingDrawer').createSlidingDrawer({ 
	position:'left',
	contentView: viewContent 
});

win.add(viewBackground);
win.add(handles[2]);
win.add(handles[0]);
win.add(handles[1]);

win.open();