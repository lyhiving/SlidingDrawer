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
		width:'auto'
	}));
}

var isMoving = false;
var handle = Ti.UI.createView({
	backgroundGradient: {
		type:'linear',
		colors:[
			'#8888ff',
			'#3333ff'
		]
	},
	borderWidth:1,
	borderColor:'#444',
	height: options.barHeight,
	top: Ti.Platform.displayCaps.platformHeight - options.barHeight - 20
});
var fakeHandle = Ti.UI.createView({
	height: options.barHeight,
	top: Ti.Platform.displayCaps.platformHeight - options.barHeight - 20
});
var slidingDrawer = Ti.UI.createView({
	backgroundColor: '#aaa',
	borderWidth: 1,
	borderColor: '#000',
	top:Ti.Platform.displayCaps.platformHeight - 20,
	height:500,
	layout:'vertical'
});

for (var i = 0; i < 5; i++) {
	slidingDrawer.add(Ti.UI.createLabel({
		text:'Stuff inside the sliding drawer',
		top:30,
		height:'auto',
		width:'auto'
	}));
}



var startPos = undefined;
var lastPos = undefined;
var goingUp = true;
var touchmoveHandler = function(e) {
	var newTop = fakeHandle.top + (e.y - startPos);
	if (newTop <= Ti.Platform.displayCaps.platformHeight - options.barHeight - 20 && newTop >= 0) {
		handle.top = newTop;
		slidingDrawer.top = handle.top + options.barHeight;
	}
	if (lastPos !== undefined && lastPos <= handle.top) {
		goingUp = false;	
	} else {
		goingUp = true;	
	}
	lastPos = handle.top;
};

fakeHandle.addEventListener('touchstart', function(e) {
	startPos = e.y;
	fakeHandle.addEventListener('touchmove', touchmoveHandler);
});
fakeHandle.addEventListener('touchend', function(e) {
	var fullHeight = Ti.Platform.displayCaps.platformHeight - options.barHeight;
	var bottom = fullHeight - 20;
	var duration = 660 * (goingUp ? handle.top/fullHeight : (fullHeight-handle.top)/fullHeight );
	
	fakeHandle.removeEventListener('touchmove', touchmoveHandler);
	if (handle.top !== 0 && handle.top !== bottom) {
		handle.animate({ top:(goingUp ? 0 : bottom ), duration:duration});
		slidingDrawer.animate({ top:(goingUp ? options.barHeight : bottom+20 ), duration:duration});
		fakeHandle.top = (goingUp ? 0 : bottom );
	} else {
		fakeHandle.top = handle.top;	
	}
});

win.add(viewContent);
win.add(slidingDrawer);
win.add(handle);
win.add(fakeHandle);

Ti.Gesture.addEventListener('orientationchange', function(e) {
	var bottom = Ti.Platform.displayCaps.platformHeight - options.barHeight - 20;
	handle.animate({ top:(goingUp ? 0 : bottom ), duration:250 });
	slidingDrawer.animate({ top:(goingUp ? options.barHeight : bottom+20 ), duration:250 });
	fakeHandle.top = (goingUp ? 0 : bottom );
});

Ti.API.debug(handle.top);

win.open();