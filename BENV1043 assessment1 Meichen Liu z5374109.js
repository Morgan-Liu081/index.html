(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_1", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_2", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_3", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_4", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_5", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_6", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_7", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_8", frames: [[0,0,3508,2480],[3510,0,3508,2480],[0,2482,3508,2480],[0,4964,3508,2480],[3510,2482,3508,2480],[3510,4964,3508,2480]]},
		{name:"BENV1043 assessment1 Meichen Liu z5374109_atlas_9", frames: [[0,2482,1527,1079],[1529,2482,1527,1079],[0,0,3508,2480]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.未命名作品_0 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_1 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_10 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_11 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_12 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_13 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_14 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_15 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_2 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_3 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_4 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_5 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_6 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_7 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_8 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.未命名作品_9 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_0 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_10 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_11 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_12 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_2 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_3 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_4 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_5 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_6 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_7 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_8 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.听到震动_9 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._17ecc22dd92f5ea763c2a313136d695 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._99e85a9807d0459fd32cde377f0cabb = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_9"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.手机屏幕_0 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.手机屏幕_1 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.手机屏幕_2 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.手机屏幕_3 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.手机屏幕_4 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.发现播放器_0 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.发现播放器_2 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.发现播放器_3 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.发现播放器_4 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_0 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_1 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_10 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_11 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_12 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_2 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_3 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_4 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_6 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_7 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_8 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.播音乐_9 = function() {
	this.initialize(ss["BENV1043 assessment1 Meichen Liu z5374109_atlas_9"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib._17ecc22dd92f5ea763c2a313136d695();
	this.instance.setTransform(0,0,0.259,0.251);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,395.6,270.8);


(lib.song3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.播音乐_0();
	this.instance.setTransform(0,0,0.1266,0.1266);

	this.instance_1 = new lib.播音乐_4();

	this.instance_2 = new lib.播音乐_0();
	this.instance_2.setTransform(0,0,0.1266,0.1266);

	this.instance_3 = new lib.播音乐_4();

	this.instance_4 = new lib.播音乐_9();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,3508,2480);


(lib.song1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.播音乐_0();
	this.instance.setTransform(0,0,0.1266,0.1266);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,444.1,314);


(lib.元件1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.听到震动_0();
	this.instance.setTransform(-193.4,-136.75,0.1103,0.1103);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(-193.4,-136.7,386.9,273.5), null);


(lib.song2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.song1 = new lib.song1();
	this.song1.name = "song1";
	this.song1.setTransform(222,157,1,1,0,0,0,222,157);
	new cjs.ButtonHelper(this.song1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.song1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,444.1,314);


// stage content:
(lib.恢复_10431 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,43,49,55,61,67,73,192,193,290,291,384,385,482];
	this.streamSoundSymbolsList[43] = [{id:"提示音",startFrame:43,endFrame:49,loop:1,offset:667}];
	this.streamSoundSymbolsList[49] = [{id:"提示音",startFrame:49,endFrame:55,loop:1,offset:667}];
	this.streamSoundSymbolsList[55] = [{id:"提示音",startFrame:55,endFrame:61,loop:1,offset:667}];
	this.streamSoundSymbolsList[61] = [{id:"提示音",startFrame:61,endFrame:67,loop:1,offset:667}];
	this.streamSoundSymbolsList[67] = [{id:"提示音",startFrame:67,endFrame:73,loop:1,offset:667}];
	this.streamSoundSymbolsList[73] = [{id:"提示音",startFrame:73,endFrame:79,loop:1,offset:667}];
	this.streamSoundSymbolsList[193] = [{id:"_1",startFrame:193,endFrame:290,loop:1,offset:0}];
	this.streamSoundSymbolsList[291] = [{id:"_2",startFrame:291,endFrame:384,loop:1,offset:1126}];
	this.streamSoundSymbolsList[385] = [{id:"_3",startFrame:385,endFrame:481,loop:1,offset:751}];
	this.streamSoundSymbolsList[482] = [{id:"_4",startFrame:482,endFrame:719,loop:1,offset:1209}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* 在此帧处停止
		时间轴将在插入此代码的帧处停止/暂停。
		也可用于停止/暂停影片剪辑的时间轴。
		*/
		
		this.stop();
		
		/* 单击以转到帧并播放
		单击指定的元件实例会将播放头移动到时间轴中的指定帧并继续从该帧回放。
		可在主时间轴或影片剪辑时间轴上使用。
		
		说明:
		1. 单击元件实例时，用希望播放头移动到的帧编号替换以下代码中的数字 5。
		2. EaselJS 中的帧编号从 0 开始而不是从 1 开始
		*/
		
		this.startbutton.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_4.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_4()
		{
			this.gotoAndPlay(1);
		}
	}
	this.frame_43 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,43,49,1,667);
	}
	this.frame_49 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,49,55,1,667);
	}
	this.frame_55 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,55,61,1,667);
	}
	this.frame_61 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,61,67,1,667);
	}
	this.frame_67 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,67,73,1,667);
	}
	this.frame_73 = function() {
		var soundInstance = playSound("提示音",0,667);
		this.InsertIntoSoundStreamData(soundInstance,73,79,1,667);
	}
	this.frame_192 = function() {
		/* 在此帧处停止
		时间轴将在插入此代码的帧处停止/暂停。
		也可用于停止/暂停影片剪辑的时间轴。
		*/
		
		this.stop();
		
		/* 单击以转到帧并播放
		单击指定的元件实例会将播放头移动到时间轴中的指定帧并继续从该帧回放。
		可在主时间轴或影片剪辑时间轴上使用。
		
		说明:
		1. 单击元件实例时，用希望播放头移动到的帧编号替换以下代码中的数字 5。
		2. EaselJS 中的帧编号从 0 开始而不是从 1 开始
		*/
		
		this.song1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(193);
		}
	}
	this.frame_193 = function() {
		var soundInstance = playSound("_1",0);
		this.InsertIntoSoundStreamData(soundInstance,193,290,1);
	}
	this.frame_290 = function() {
		/* 在此帧处停止
		时间轴将在插入此代码的帧处停止/暂停。
		也可用于停止/暂停影片剪辑的时间轴。
		*/
		
		this.stop();
		
		/* 单击以转到帧并播放
		单击指定的元件实例会将播放头移动到时间轴中的指定帧并继续从该帧回放。
		可在主时间轴或影片剪辑时间轴上使用。
		
		说明:
		1. 单击元件实例时，用希望播放头移动到的帧编号替换以下代码中的数字 5。
		2. EaselJS 中的帧编号从 0 开始而不是从 1 开始
		*/
		
		this.song2.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_6.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_6()
		{
			this.gotoAndPlay(292);
		}
	}
	this.frame_291 = function() {
		var soundInstance = playSound("_2",0,1126);
		this.InsertIntoSoundStreamData(soundInstance,291,384,1,1126);
	}
	this.frame_384 = function() {
		/* 在此帧处停止
		时间轴将在插入此代码的帧处停止/暂停。
		也可用于停止/暂停影片剪辑的时间轴。
		*/
		
		this.stop();
		
		/* 单击以转到帧并播放
		单击指定的元件实例会将播放头移动到时间轴中的指定帧并继续从该帧回放。
		可在主时间轴或影片剪辑时间轴上使用。
		
		说明:
		1. 单击元件实例时，用希望播放头移动到的帧编号替换以下代码中的数字 5。
		2. EaselJS 中的帧编号从 0 开始而不是从 1 开始
		*/
		
		this.song3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_7.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_7()
		{
			this.gotoAndPlay(386);
		}
	}
	this.frame_385 = function() {
		var soundInstance = playSound("_3",0,751);
		this.InsertIntoSoundStreamData(soundInstance,385,481,1,751);
	}
	this.frame_482 = function() {
		var soundInstance = playSound("_4",0,1209);
		this.InsertIntoSoundStreamData(soundInstance,482,719,1,1209);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(43).call(this.frame_43).wait(6).call(this.frame_49).wait(6).call(this.frame_55).wait(6).call(this.frame_61).wait(6).call(this.frame_67).wait(6).call(this.frame_73).wait(119).call(this.frame_192).wait(1).call(this.frame_193).wait(97).call(this.frame_290).wait(1).call(this.frame_291).wait(93).call(this.frame_384).wait(1).call(this.frame_385).wait(97).call(this.frame_482).wait(237));

	// 图层_14
	this.instance = new lib.未命名作品_0();
	this.instance.setTransform(-58,-30,0.1447,0.1447);

	this.instance_1 = new lib.未命名作品_1();
	this.instance_1.setTransform(-58,-30,0.1447,0.1447);

	this.instance_2 = new lib.未命名作品_2();
	this.instance_2.setTransform(-58,-30,0.1447,0.1447);

	this.instance_3 = new lib.未命名作品_3();
	this.instance_3.setTransform(-58,-30,0.1447,0.1447);

	this.instance_4 = new lib.未命名作品_4();
	this.instance_4.setTransform(-58,-30,0.1447,0.1447);

	this.instance_5 = new lib.未命名作品_5();
	this.instance_5.setTransform(-58,-30,0.1447,0.1447);

	this.instance_6 = new lib.未命名作品_6();
	this.instance_6.setTransform(-58,-30,0.1447,0.1447);

	this.instance_7 = new lib.未命名作品_7();
	this.instance_7.setTransform(-58,-30,0.1447,0.1447);

	this.instance_8 = new lib.未命名作品_8();
	this.instance_8.setTransform(-58,-30,0.1447,0.1447);

	this.instance_9 = new lib.未命名作品_9();
	this.instance_9.setTransform(-58,-30,0.1447,0.1447);

	this.instance_10 = new lib.未命名作品_10();
	this.instance_10.setTransform(-58,-30,0.1447,0.1447);

	this.instance_11 = new lib.未命名作品_11();
	this.instance_11.setTransform(-58,-30,0.1447,0.1447);

	this.instance_12 = new lib.未命名作品_12();
	this.instance_12.setTransform(-58,-30,0.1447,0.1447);

	this.instance_13 = new lib.未命名作品_13();
	this.instance_13.setTransform(-58,-30,0.1447,0.1447);

	this.instance_14 = new lib.未命名作品_14();
	this.instance_14.setTransform(-58,-30,0.1447,0.1447);

	this.instance_15 = new lib.未命名作品_15();
	this.instance_15.setTransform(-45,-30,0.1447,0.1447);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},482).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},6).to({state:[{t:this.instance_3}]},6).to({state:[{t:this.instance_4}]},6).to({state:[{t:this.instance_5}]},6).to({state:[{t:this.instance_6}]},6).to({state:[{t:this.instance_7}]},6).to({state:[{t:this.instance_8}]},6).to({state:[{t:this.instance_9}]},6).to({state:[{t:this.instance_10}]},6).to({state:[{t:this.instance_11}]},6).to({state:[{t:this.instance_12}]},6).to({state:[{t:this.instance_13}]},6).to({state:[{t:this.instance_14}]},6).to({state:[{t:this.instance_15}]},6).wait(147));

	// background
	this.instance_16 = new lib._99e85a9807d0459fd32cde377f0cabb();
	this.instance_16.setTransform(-27,-6,0.2896,0.2896);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(482).to({_off:false},0).wait(237));

	// 图层_9
	this.instance_17 = new lib.播音乐_10();
	this.instance_17.setTransform(-24,12,0.128,0.128);

	this.instance_18 = new lib.播音乐_11();
	this.instance_18.setTransform(-24,12,0.128,0.1271);

	this.instance_19 = new lib.播音乐_12();
	this.instance_19.setTransform(-24,12,0.128,0.1271);

	this.instance_20 = new lib.播音乐_12();
	this.instance_20.setTransform(-24,12,0.128,0.1271);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_17}]},385).to({state:[{t:this.instance_18}]},25).to({state:[{t:this.instance_19}]},24).to({state:[{t:this.instance_20},{t:this.instance_19}]},24).to({state:[]},24).wait(237));

	// 图层_8
	this.instance_21 = new lib.播音乐_6();
	this.instance_21.setTransform(-24,12,0.128,0.128);

	this.instance_22 = new lib.播音乐_7();
	this.instance_22.setTransform(-24,12,0.128,0.128);

	this.instance_23 = new lib.播音乐_8();
	this.instance_23.setTransform(-24,12,0.128,0.128);

	this.song3 = new lib.song3();
	this.song3.name = "song3";
	this.song3.setTransform(1754,1253.2,1,1,0,0,0,1754,1240);
	new cjs.ButtonHelper(this.song3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_21}]},291).to({state:[{t:this.instance_21}]},25).to({state:[{t:this.instance_22}]},24).to({state:[{t:this.instance_23}]},20).to({state:[{t:this.song3}]},24).to({state:[]},1).wait(334));

	// 图层_7
	this.instance_24 = new lib.播音乐_1();
	this.instance_24.setTransform(-31,7,0.1315,0.1315);

	this.instance_25 = new lib.播音乐_2();
	this.instance_25.setTransform(-28,9,0.1301,0.1301);

	this.instance_26 = new lib.播音乐_3();
	this.instance_26.setTransform(-28,10,0.1299,0.1299);

	this.instance_27 = new lib.播音乐_4();
	this.instance_27.setTransform(-26,11,0.1288,0.1288);

	this.song2 = new lib.song2();
	this.song2.name = "song2";
	this.song2.setTransform(222,193.7,1,1,0,0,0,222,157);
	new cjs.ButtonHelper(this.song2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_24}]},193).to({state:[{t:this.instance_25}]},25).to({state:[{t:this.instance_26}]},24).to({state:[{t:this.instance_27}]},24).to({state:[{t:this.song2}]},24).to({state:[]},1).to({state:[]},94).wait(334));

	// 图层_6
	this.song1 = new lib.song1();
	this.song1.name = "song1";
	this.song1.setTransform(215,172,1,1,0,0,0,222,157);
	this.song1._off = true;
	new cjs.ButtonHelper(this.song1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.song1).wait(192).to({_off:false},0).to({_off:true},1).wait(526));

	// 图层_5
	this.instance_28 = new lib.发现播放器_0();
	this.instance_28.setTransform(44,57,0.1015,0.1015);

	this.instance_29 = new lib.发现播放器_2();
	this.instance_29.setTransform(39,55,0.1028,0.1028);

	this.instance_30 = new lib.发现播放器_3();
	this.instance_30.setTransform(46,59,0.101,0.101);

	this.instance_31 = new lib.发现播放器_4();
	this.instance_31.setTransform(42,57,0.1022,0.1022);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_28}]},164).to({state:[{t:this.instance_29}]},6).to({state:[{t:this.instance_30}]},6).to({state:[{t:this.instance_31}]},6).to({state:[]},10).wait(527));

	// 图层_4
	this.instance_32 = new lib.手机屏幕_0();
	this.instance_32.setTransform(-70,-32,0.159,0.1591);

	this.instance_33 = new lib.手机屏幕_1();
	this.instance_33.setTransform(-71,-28,0.157,0.157);

	this.instance_34 = new lib.手机屏幕_2();
	this.instance_34.setTransform(-62,-15,0.1478,0.1478);

	this.instance_35 = new lib.手机屏幕_3();
	this.instance_35.setTransform(-30,-3,0.1303,0.1303);

	this.instance_36 = new lib.手机屏幕_4();
	this.instance_36.setTransform(21,27,0.1017,0.1017);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_32}]},79).to({state:[{t:this.instance_33}]},6).to({state:[{t:this.instance_34}]},6).to({state:[{t:this.instance_35}]},6).to({state:[{t:this.instance_36}]},6).to({state:[]},61).wait(555));

	// 图层_2
	this.movieClip_1 = new lib.元件1();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(145.4,185.75);

	this.instance_37 = new lib.听到震动_2();
	this.instance_37.setTransform(-40,53,0.1086,0.1086);

	this.instance_38 = new lib.听到震动_3();
	this.instance_38.setTransform(-45,52,0.1095,0.1095);

	this.instance_39 = new lib.听到震动_4();
	this.instance_39.setTransform(-46,50,0.1106,0.1106);

	this.instance_40 = new lib.听到震动_5();
	this.instance_40.setTransform(-38,57,0.1064,0.1064);

	this.instance_41 = new lib.听到震动_6();
	this.instance_41.setTransform(-34,57,0.1056,0.1056);

	this.instance_42 = new lib.听到震动_7();
	this.instance_42.setTransform(-34,56,0.1057,0.1057);

	this.instance_43 = new lib.听到震动_8();
	this.instance_43.setTransform(-36,55,0.1065,0.1065);

	this.instance_44 = new lib.听到震动_9();
	this.instance_44.setTransform(-42,53,0.1078,0.1078);

	this.instance_45 = new lib.听到震动_10();
	this.instance_45.setTransform(-37,55,0.1063,0.1063);

	this.instance_46 = new lib.听到震动_11();
	this.instance_46.setTransform(-43,53,0.1077,0.1077);

	this.instance_47 = new lib.听到震动_12();
	this.instance_47.setTransform(-46,51,0.1091,0.1091);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.movieClip_1}]},1).to({state:[{t:this.instance_37}]},6).to({state:[{t:this.instance_38}]},6).to({state:[{t:this.instance_39}]},6).to({state:[{t:this.instance_40}]},6).to({state:[{t:this.instance_41}]},6).to({state:[{t:this.instance_42}]},6).to({state:[{t:this.instance_43}]},6).to({state:[{t:this.instance_44}]},6).to({state:[{t:this.instance_45}]},6).to({state:[{t:this.instance_44}]},6).to({state:[{t:this.instance_46}]},6).to({state:[{t:this.instance_47}]},6).to({state:[]},6).wait(640));

	// 图层_1
	this.startbutton = new lib.start();
	this.startbutton.name = "startbutton";
	this.startbutton.setTransform(202.25,150.4,1,1,0,0,0,197.8,135.4);
	new cjs.ButtonHelper(this.startbutton, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.startbutton).to({_off:true},1).wait(718));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(129,118,3379,2375.2);
// library properties:
lib.properties = {
	id: '8E4EEE88FF45B442AF9A566BFC672601',
	width: 400,
	height: 300,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_1.png?1742098343491", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_1"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_2.png?1742098343491", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_2"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_3.png?1742098343491", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_3"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_4.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_4"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_5.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_5"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_6.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_6"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_7.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_7"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_8.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_8"},
		{src:"images/BENV1043 assessment1 Meichen Liu z5374109_atlas_9.png?1742098343492", id:"BENV1043 assessment1 Meichen Liu z5374109_atlas_9"},
		{src:"sounds/_1.mp3?1742098343520", id:"_1"},
		{src:"sounds/_2.mp3?1742098343520", id:"_2"},
		{src:"sounds/_3.mp3?1742098343520", id:"_3"},
		{src:"sounds/_4.mp3?1742098343520", id:"_4"},
		{src:"sounds/提示音_.mp3?1742098343520", id:"提示音"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['8E4EEE88FF45B442AF9A566BFC672601'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;