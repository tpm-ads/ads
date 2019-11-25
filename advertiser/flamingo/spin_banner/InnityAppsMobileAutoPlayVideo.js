(function(w){var H=function(){return w.requestAnimationFrame||w.webkitRequestAnimationFrame||w.mozRequestAnimationFrame||function(a){w.setTimeout(a,1E3/60)}}(),d=w.jsmpeg=function(a,c){c=c||{};this.progressive=!1!==c.progressive;this.benchmark=!!c.benchmark;this.canvas=c.canvas||document.createElement("canvas");this.wantsToPlay=this.autoplay=!!c.autoplay;this.loop=!!c.loop;this.seekable=!!c.seekable;this.externalLoadCallback=c.onload||null;this.externalDecodeCallback=c.ondecodeframe||null;this.externalFinishedCallback=c.onfinished||null;this.customIntraQuantMatrix=new Uint8Array(64);this.customNonIntraQuantMatrix=new Uint8Array(64);this.blockData=new Int32Array(64);this.zeroBlockData=new Int32Array(64);this.fillArray(this.zeroBlockData,0);!c.forceCanvas2D&&this.initWebGL()?this.renderFrame=this.renderFrameGL:(this.canvasContext=this.canvas.getContext("2d"),this.renderFrame=this.renderFrame2D);a instanceof WebSocket?(this.client=a,this.client.onopen=this.initSocketClient.bind(this)):this.load(a)};d.prototype.waitForIntraFrame=!0;d.prototype.socketBufferSize=524288;d.prototype.initSocketClient=function(){this.buffer=new v(new ArrayBuffer(this.socketBufferSize));this.nextPictureBuffer=new v(new ArrayBuffer(this.socketBufferSize));this.nextPictureBuffer.writePos=0;this.nextPictureBuffer.chunkBegin=0;this.nextPictureBuffer.lastWriteBeforeWrap=0;this.client.binaryType="arraybuffer";this.client.onmessage=this.receiveSocketMessage.bind(this)};d.prototype.decodeSocketHeader=function(a){a[0]===A.charCodeAt(0)&&a[1]===A.charCodeAt(1)&&a[2]===A.charCodeAt(2)&&a[3]===A.charCodeAt(3)&&(this.width=256*a[4]+a[5],this.height=256*a[6]+a[7],this.initBuffers())};d.prototype.receiveSocketMessage=function(a){var c=new Uint8Array(a.data);this.sequenceStarted||this.decodeSocketHeader(c);a=this.buffer;var b=this.nextPictureBuffer;b.writePos+c.length>b.length&&(b.lastWriteBeforeWrap=b.writePos,b.writePos=0,b.index=0);b.bytes.set(c,b.writePos);b.writePos+=c.length;for(c=0;;){c=b.findNextMPEGStartCode();if(c===v.NOT_FOUND||b.index>>3>b.writePos){b.index=Math.max(b.writePos-3,0)<<3;return}if(c===x)break}if(this.waitForIntraFrame)b.advance(10),b.getBits(3)===B&&(this.waitForIntraFrame=!1,b.chunkBegin=b.index-13>>3);else{this.currentPictureDecoded||this.decodePicture(D);c=b.index>>3;if(c>b.chunkBegin)a.bytes.set(b.bytes.subarray(b.chunkBegin,c)),a.writePos=c-b.chunkBegin;else{a.bytes.set(b.bytes.subarray(b.chunkBegin,b.lastWriteBeforeWrap));var f=b.lastWriteBeforeWrap-b.chunkBegin;a.bytes.set(b.bytes.subarray(0,c),f);a.writePos=c+f}a.index=0;b.chunkBegin=c;this.currentPictureDecoded=!1;H(this.scheduleDecoding.bind(this),this.canvas)}};d.prototype.scheduleDecoding=function(){this.decodePicture();this.currentPictureDecoded=!0};d.prototype.isRecording=!1;d.prototype.recorderWaitForIntraFrame=!1;d.prototype.recordedFrames=0;d.prototype.recordedSize=0;d.prototype.didStartRecordingCallback=null;d.prototype.recordBuffers=[];d.prototype.canRecord=function(){return this.client&&this.client.readyState===this.client.OPEN};d.prototype.startRecording=function(a){this.canRecord()&&(this.discardRecordBuffers(),this.recorderWaitForIntraFrame=this.isRecording=!0,this.didStartRecordingCallback=a||null,this.recordedSize=this.recordedFrames=0,this.recordBuffers.push(new Uint8Array([0,0,1,179,this.width>>4,(this.width&15)<<4|this.height>>8,this.height&255,19,255,255,225,88,0,0,1,184,0,8,0,0,0,0,1,0])))};d.prototype.recordFrameFromCurrentBuffer=function(){if(this.isRecording){if(this.recorderWaitForIntraFrame){if(this.pictureCodingType!==B)return;this.recorderWaitForIntraFrame=!1;this.didStartRecordingCallback&&this.didStartRecordingCallback(this)}this.recordedFrames++;this.recordedSize+=this.buffer.writePos;this.recordBuffers.push(new Uint8Array(this.buffer.bytes.subarray(0,this.buffer.writePos)))}};d.prototype.discardRecordBuffers=function(){this.recordBuffers=[];this.recordedFrames=0};d.prototype.stopRecording=function(){var a=new Blob(this.recordBuffers,{type:"video/mpeg"});this.discardRecordBuffers();this.isRecording=!1;return a};d.prototype.intraFrames=[];d.prototype.currentFrame=-1;d.prototype.currentTime=0;d.prototype.frameCount=0;d.prototype.duration=0;d.prototype.progressiveMinSize=131072;d.prototype.fetchReaderPump=function(a){var c=this;a.read().then(function(b){c.fetchReaderReceive(a,b)})};d.prototype.fetchReaderReceive=function(a,c){if(c.done){if(this.seekable){var b=this.buffer.index;this.collectIntraFrames();this.buffer.index=b}this.duration=this.frameCount/this.pictureRate;this.lastFrameIndex=this.buffer.writePos<<3}else this.buffer.bytes.set(c.value,this.buffer.writePos),this.buffer.writePos+=c.value.byteLength,this.lastFrameIndex=this.findLastPictureStartCode(),!this.sequenceStarted&&this.buffer.writePos>=this.progressiveMinSize?(this.findStartCode(E),this.firstSequenceHeader=this.buffer.index,this.decodeSequenceHeader(),this.nextFrame(),this.autoplay&&this.play(),this.externalLoadCallback&&this.externalLoadCallback(this)):this.sequenceStarted&&this.wantsToPlay&&!this.playing?this.play():this.sequenceStarted||(b={loaded:this.buffer.writePos,total:this.progressiveMinSize},this.gl?this.updateLoaderGL(b):this.updateLoader2D(b)),this.fetchReaderPump(a)};d.prototype.findLastPictureStartCode=function(){for(var a=this.buffer.bytes,c=this.buffer.writePos;3<c;c--)if(a[c]==x&&1==a[c-1]&&0==a[c-2]&&0==a[c-3])return c-3<<3;return 0};d.prototype.load=function(a){this.url=a;var c=this;if(this.progressive&&w.fetch&&w.ReadableByteStream){var b=new Headers;b.append("Content-Type","video/mpeg");fetch(a,{headers:b}).then(function(a){var b=a.headers.get("Content-Length");a=a.body.getReader();c.buffer=new v(new ArrayBuffer(b));c.buffer.writePos=0;c.fetchReaderPump(a)})}else{var f=new XMLHttpRequest;f.onreadystatechange=function(){f.readyState===f.DONE&&200===f.status&&c.loadCallback(f.response)};f.onprogress=this.gl?this.updateLoaderGL.bind(this):this.updateLoader2D.bind(this);f.open("GET",a);f.responseType="arraybuffer";f.send()}};d.prototype.updateLoader2D=function(a){a=a.loaded/a.total;var c=this.canvas.width,b=this.canvas.height,f=this.canvasContext;f.fillStyle="#222";f.fillRect(0,0,c,b);f.fillStyle="#fff";f.fillRect(0,b-b*a,c,b*a)};d.prototype.updateLoaderGL=function(a){var c=this.gl;c.uniform1f(c.getUniformLocation(this.loadingProgram,"loaded"),a.loaded/a.total);c.drawArrays(c.TRIANGLE_STRIP,0,4)};d.prototype.loadCallback=function(a){this.buffer=new v(a);this.seekable&&(this.collectIntraFrames(),this.buffer.index=0);this.findStartCode(E);this.firstSequenceHeader=this.buffer.index;this.decodeSequenceHeader();this.duration=this.frameCount/this.pictureRate;this.nextFrame();this.autoplay&&this.play();this.externalLoadCallback&&this.externalLoadCallback(this)};d.prototype.collectIntraFrames=function(){var a;for(a=0;this.findStartCode(x)!==v.NOT_FOUND;a++)this.buffer.advance(10),this.buffer.getBits(3)===B&&this.intraFrames.push({frame:a,index:this.buffer.index-13});this.frameCount=a};d.prototype.seekToFrame=function(a,c){if(0>a||a>=this.frameCount||!this.intraFrames.length)return!1;for(var b=null,f=0;f<this.intraFrames.length&&this.intraFrames[f].frame<=a;f++)b=this.intraFrames[f];this.buffer.index=b.index;this.currentFrame=b.frame-1;if(c){for(b=b.frame;b<a;b++)this.decodePicture(D),this.findStartCode(x);this.currentFrame=a-1}this.decodePicture();return!0};d.prototype.seekToTime=function(a,c){this.seekToFrame(a*this.pictureRate|0,c)};d.prototype.play=function(){this.playing||(this.targetTime=this.now(),this.wantsToPlay=this.playing=!0,this.scheduleNextFrame())};d.prototype.pause=function(){this.wantsToPlay=this.playing=!1};d.prototype.stop=function(){this.currentFrame=-1;this.buffer&&(this.buffer.index=this.firstSequenceHeader);this.playing=!1;this.client&&(this.client.close(),this.client=null);this.wantsToPlay=!1};d.prototype.readCode=function(a){var c=0;do c=a[c+this.buffer.getBits(1)];while(0<=c&&0!==a[c]);return a[c+2]};d.prototype.findStartCode=function(a){for(var c=0;;)if(c=this.buffer.findNextMPEGStartCode(),c===a||c===v.NOT_FOUND)return c};d.prototype.fillArray=function(a,c){for(var b=0,f=a.length;b<f;b++)a[b]=c};d.prototype.pictureRate=30;d.prototype.lateTime=0;d.prototype.firstSequenceHeader=0;d.prototype.targetTime=0;d.prototype.benchmark=!1;d.prototype.benchFrame=0;d.prototype.benchDecodeTimes=0;d.prototype.benchAvgFrameTime=0;d.prototype.now=function(){return w.performance?w.performance.now():Date.now()};d.prototype.nextFrame=function(){if(this.buffer)for(var a=this.now();;){var c=this.buffer.findNextMPEGStartCode();if(c===E)this.decodeSequenceHeader();else{if(c===x){if(this.progressive&&this.buffer.index>=this.lastFrameIndex){this.playing=!1;break}this.playing&&this.scheduleNextFrame();this.decodePicture();this.benchDecodeTimes+=this.now()-a;return this.canvas}if(c===v.NOT_FOUND)return this.stop(),this.externalFinishedCallback&&this.externalFinishedCallback(this),this.loop&&this.sequenceStarted&&this.play(),null}}};d.prototype.scheduleNextFrame=function(){this.lateTime=this.now()-this.targetTime;var a=Math.max(0,1E3/this.pictureRate-this.lateTime);this.targetTime=this.now()+a;this.benchmark?(this.benchFrame++,120<=this.benchFrame&&(this.benchAvgFrameTime=this.benchDecodeTimes/this.benchFrame,this.benchDecodeTimes=this.benchFrame=0,w.console&&console.log("Average time per frame:",this.benchAvgFrameTime,"ms")),setTimeout(this.nextFrame.bind(this),0)):18>a?this.scheduleAnimation():setTimeout(this.scheduleAnimation.bind(this),a)};d.prototype.scheduleAnimation=function(){H(this.nextFrame.bind(this),this.canvas)};d.prototype.decodeSequenceHeader=function(){this.width=this.buffer.getBits(12);this.height=this.buffer.getBits(12);this.buffer.advance(4);this.pictureRate=K[this.buffer.getBits(4)];this.buffer.advance(30);this.initBuffers();var a;if(this.buffer.getBits(1)){for(a=0;64>a;a++)this.customIntraQuantMatrix[F[a]]=this.buffer.getBits(8);this.intraQuantMatrix=this.customIntraQuantMatrix}if(this.buffer.getBits(1)){for(a=0;64>a;a++)this.customNonIntraQuantMatrix[F[a]]=this.buffer.getBits(8);this.nonIntraQuantMatrix=this.customNonIntraQuantMatrix}};d.prototype.initBuffers=function(){this.intraQuantMatrix=L;this.nonIntraQuantMatrix=M;this.mbWidth=this.width+15>>4;this.mbHeight=this.height+15>>4;this.mbSize=this.mbWidth*this.mbHeight;this.codedWidth=this.mbWidth<<4;this.codedHeight=this.mbHeight<<4;this.codedSize=this.codedWidth*this.codedHeight;this.halfWidth=this.mbWidth<<3;this.halfHeight=this.mbHeight<<3;this.quarterSize=this.codedSize>>2;if(!this.sequenceStarted){this.sequenceStarted=!0;var a=w.Uint8ClampedArray||w.Uint8Array;w.Uint8ClampedArray||(this.copyBlockToDestination=this.copyBlockToDestinationClamp,this.addBlockToDestination=this.addBlockToDestinationClamp);this.currentY=new a(this.codedSize);this.currentY32=new Uint32Array(this.currentY.buffer);this.currentCr=new a(this.codedSize>>2);this.currentCr32=new Uint32Array(this.currentCr.buffer);this.currentCb=new a(this.codedSize>>2);this.currentCb32=new Uint32Array(this.currentCb.buffer);this.forwardY=new a(this.codedSize);this.forwardY32=new Uint32Array(this.forwardY.buffer);this.forwardCr=new a(this.codedSize>>2);this.forwardCr32=new Uint32Array(this.forwardCr.buffer);this.forwardCb=new a(this.codedSize>>2);this.forwardCb32=new Uint32Array(this.forwardCb.buffer);this.canvas.width=this.width;this.canvas.height=this.height;this.gl?(this.gl.useProgram(this.program),this.gl.viewport(0,0,this.width,this.height)):(this.currentRGBA=this.canvasContext.getImageData(0,0,this.width,this.height),this.fillArray(this.currentRGBA.data,255))}};d.prototype.currentY=null;d.prototype.currentCr=null;d.prototype.currentCb=null;d.prototype.currentRGBA=null;d.prototype.pictureCodingType=0;d.prototype.forwardY=null;d.prototype.forwardCr=null;d.prototype.forwardCb=null;d.prototype.fullPelForward=!1;d.prototype.forwardFCode=0;d.prototype.forwardRSize=0;d.prototype.forwardF=0;d.prototype.decodePicture=function(a){this.currentFrame++;this.currentTime=this.currentFrame/this.pictureRate;this.buffer.advance(10);this.pictureCodingType=this.buffer.getBits(3);this.buffer.advance(16);if(!(0>=this.pictureCodingType||this.pictureCodingType>=N)){if(this.pictureCodingType===C){this.fullPelForward=this.buffer.getBits(1);this.forwardFCode=this.buffer.getBits(3);if(0===this.forwardFCode)return;this.forwardRSize=this.forwardFCode-1;this.forwardF=1<<this.forwardRSize}var c=0;do c=this.buffer.findNextMPEGStartCode();while(c===O||c===P);for(;c>=Q&&c<=R;)this.decodeSlice(c&255),c=this.buffer.findNextMPEGStartCode();this.buffer.rewind(32);this.recordFrameFromCurrentBuffer();a!==D&&(this.renderFrame(),this.externalDecodeCallback&&this.externalDecodeCallback(this,this.canvas));if(this.pictureCodingType===B||this.pictureCodingType===C){a=this.forwardY;var c=this.forwardY32,b=this.forwardCr,f=this.forwardCr32,d=this.forwardCb,h=this.forwardCb32;this.forwardY=this.currentY;this.forwardY32=this.currentY32;this.forwardCr=this.currentCr;this.forwardCr32=this.currentCr32;this.forwardCb=this.currentCb;this.forwardCb32=this.currentCb32;this.currentY=a;this.currentY32=c;this.currentCr=b;this.currentCr32=f;this.currentCb=d;this.currentCb32=h}}};d.prototype.YCbCrToRGBA=function(){for(var a=this.currentY,c=this.currentCb,b=this.currentCr,f=this.currentRGBA.data,d=0,h=this.codedWidth,p=this.codedWidth+(this.codedWidth-this.width),l=0,e=this.halfWidth-(this.width>>1),k=0,u=4*this.width,g=4*this.width,n=this.width>>1,v=this.height>>1,t,m,r,w=0;w<v;w++){for(var x=0;x<n;x++){t=c[l];m=b[l];l++;r=m+(103*m>>8)-179;m=(88*t>>8)-44+(183*m>>8)-91;t=t+(198*t>>8)-227;var y=a[d++],z=a[d++];f[k]=y+r;f[k+1]=y-m;f[k+2]=y+t;f[k+4]=z+r;f[k+5]=z-m;f[k+6]=z+t;k+=8;y=a[h++];z=a[h++];f[u]=y+r;f[u+1]=y-m;f[u+2]=y+t;f[u+4]=z+r;f[u+5]=z-m;f[u+6]=z+t;u+=8}d+=p;h+=p;k+=g;u+=g;l+=e}};d.prototype.renderFrame2D=function(){this.YCbCrToRGBA();this.canvasContext.putImageData(this.currentRGBA,0,0)};d.prototype.gl=null;d.prototype.program=null;d.prototype.YTexture=null;d.prototype.CBTexture=null;d.prototype.CRTexture=null;d.prototype.createTexture=function(a,c){var b=this.gl,f=b.createTexture();b.bindTexture(b.TEXTURE_2D,f);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.uniform1i(b.getUniformLocation(this.program,c),a);return f};d.prototype.compileShader=function(a,c){var b=this.gl,f=b.createShader(a);b.shaderSource(f,c);b.compileShader(f);if(!b.getShaderParameter(f,b.COMPILE_STATUS))throw Error(b.getShaderInfoLog(f));return f};d.prototype.initWebGL=function(){var a;try{a=this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl")}catch(b){return!1}if(!a)return!1;this.buffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,this.buffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,0,1,1,0,1,1]),a.STATIC_DRAW);this.program=a.createProgram();a.attachShader(this.program,this.compileShader(a.VERTEX_SHADER,I));a.attachShader(this.program,this.compileShader(a.FRAGMENT_SHADER,S));a.linkProgram(this.program);if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw Error(a.getProgramInfoLog(this.program));a.useProgram(this.program);this.YTexture=this.createTexture(0,"YTexture");this.CBTexture=this.createTexture(1,"CBTexture");this.CRTexture=this.createTexture(2,"CRTexture");var c=a.getAttribLocation(this.program,"vertex");a.enableVertexAttribArray(c);a.vertexAttribPointer(c,2,a.FLOAT,!1,0,0);this.loadingProgram=a.createProgram();a.attachShader(this.loadingProgram,this.compileShader(a.VERTEX_SHADER,I));a.attachShader(this.loadingProgram,this.compileShader(a.FRAGMENT_SHADER,T));a.linkProgram(this.loadingProgram);a.useProgram(this.loadingProgram);c=a.getAttribLocation(this.loadingProgram,"vertex");a.enableVertexAttribArray(c);a.vertexAttribPointer(c,2,a.FLOAT,!1,0,0);return!0};d.prototype.renderFrameGL=function(){var a=this.gl,c=new Uint8Array(this.currentY.buffer),b=new Uint8Array(this.currentCr.buffer),f=new Uint8Array(this.currentCb.buffer);a.activeTexture(a.TEXTURE0);a.bindTexture(a.TEXTURE_2D,this.YTexture);a.texImage2D(a.TEXTURE_2D,0,a.LUMINANCE,this.codedWidth,this.height,0,a.LUMINANCE,a.UNSIGNED_BYTE,c);a.activeTexture(a.TEXTURE1);a.bindTexture(a.TEXTURE_2D,this.CBTexture);a.texImage2D(a.TEXTURE_2D,0,a.LUMINANCE,this.halfWidth,this.height/2,0,a.LUMINANCE,a.UNSIGNED_BYTE,b);a.activeTexture(a.TEXTURE2);a.bindTexture(a.TEXTURE_2D,this.CRTexture);a.texImage2D(a.TEXTURE_2D,0,a.LUMINANCE,this.halfWidth,this.height/2,0,a.LUMINANCE,a.UNSIGNED_BYTE,f);a.drawArrays(a.TRIANGLE_STRIP,0,4)};d.prototype.quantizerScale=0;d.prototype.sliceBegin=!1;d.prototype.decodeSlice=function(a){this.sliceBegin=!0;this.macroblockAddress=(a-1)*this.mbWidth-1;this.motionFwV=this.motionFwVPrev=this.motionFwH=this.motionFwHPrev=0;this.dcPredictorCb=this.dcPredictorCr=this.dcPredictorY=128;for(this.quantizerScale=this.buffer.getBits(5);this.buffer.getBits(1);)this.buffer.advance(8);do this.decodeMacroblock();while(!this.buffer.nextBytesAreStartCode())};d.prototype.macroblockAddress=0;d.prototype.mbRow=0;d.prototype.mbCol=0;d.prototype.macroblockType=0;d.prototype.macroblockIntra=!1;d.prototype.macroblockMotFw=!1;d.prototype.motionFwH=0;d.prototype.motionFwV=0;d.prototype.motionFwHPrev=0;d.prototype.motionFwVPrev=0;d.prototype.decodeMacroblock=function(){for(var a=0,c=this.readCode(G);34===c;)c=this.readCode(G);for(;35===c;)a+=33,c=this.readCode(G);a+=c;if(this.sliceBegin)this.sliceBegin=!1,this.macroblockAddress+=a;else{if(this.macroblockAddress+a>=this.mbSize)return;1<a&&(this.dcPredictorCb=this.dcPredictorCr=this.dcPredictorY=128,this.pictureCodingType===C&&(this.motionFwV=this.motionFwVPrev=this.motionFwH=this.motionFwHPrev=0));for(;1<a;)this.macroblockAddress++,this.mbRow=this.macroblockAddress/this.mbWidth|0,this.mbCol=this.macroblockAddress%this.mbWidth,this.copyMacroblock(this.motionFwH,this.motionFwV,this.forwardY,this.forwardCr,this.forwardCb),a--;this.macroblockAddress++}this.mbRow=this.macroblockAddress/this.mbWidth|0;this.mbCol=this.macroblockAddress%this.mbWidth;this.macroblockType=this.readCode(U[this.pictureCodingType]);this.macroblockIntra=this.macroblockType&1;this.macroblockMotFw=this.macroblockType&8;0!==(this.macroblockType&16)&&(this.quantizerScale=this.buffer.getBits(5));this.macroblockIntra?this.motionFwV=this.motionFwVPrev=this.motionFwH=this.motionFwHPrev=0:(this.dcPredictorCb=this.dcPredictorCr=this.dcPredictorY=128,this.decodeMotionVectors(),this.copyMacroblock(this.motionFwH,this.motionFwV,this.forwardY,this.forwardCr,this.forwardCb));for(var a=0!==(this.macroblockType&2)?this.readCode(V):this.macroblockIntra?63:0,c=0,b=32;6>c;c++)0!==(a&b)&&this.decodeBlock(c),b>>=1};d.prototype.decodeMotionVectors=function(){var a,c;c=0;this.macroblockMotFw?(a=this.readCode(J),0!==a&&1!==this.forwardF?(c=this.buffer.getBits(this.forwardRSize),c=(Math.abs(a)-1<<this.forwardRSize)+c+1,0>a&&(c=-c)):c=a,this.motionFwHPrev+=c,this.motionFwHPrev>(this.forwardF<<4)-1?this.motionFwHPrev-=this.forwardF<<5:this.motionFwHPrev<-this.forwardF<<4&&(this.motionFwHPrev+=this.forwardF<<5),this.motionFwH=this.motionFwHPrev,this.fullPelForward&&(this.motionFwH<<=1),a=this.readCode(J),0!==a&&1!==this.forwardF?(c=this.buffer.getBits(this.forwardRSize),c=(Math.abs(a)-1<<this.forwardRSize)+c+1,0>a&&(c=-c)):c=a,this.motionFwVPrev+=c,this.motionFwVPrev>(this.forwardF<<4)-1?this.motionFwVPrev-=this.forwardF<<5:this.motionFwVPrev<-this.forwardF<<4&&(this.motionFwVPrev+=this.forwardF<<5),this.motionFwV=this.motionFwVPrev,this.fullPelForward&&(this.motionFwV<<=1)):this.pictureCodingType===C&&(this.motionFwV=this.motionFwVPrev=this.motionFwH=this.motionFwHPrev=0)};d.prototype.copyMacroblock=function(a,c,b,f,d){var h,p,l,e,k,u,g=this.currentY32,n=this.currentCb32,v=this.currentCr32;h=this.codedWidth;p=h-16;l=1===(c&1);e=((this.mbRow<<4)+(c>>1))*h+(this.mbCol<<4)+(a>>1);k=this.mbRow*h+this.mbCol<<2;u=k+(h<<2);var t,m,r;if(1===(a&1))if(l)for(;k<u;){t=b[e]+b[e+h];e++;for(l=0;4>l;l++)m=b[e]+b[e+h],e++,r=t+m+2>>2&255,t=b[e]+b[e+h],e++,r|=t+m+2<<6&65280,m=b[e]+b[e+h],e++,r|=t+m+2<<14&16711680,t=b[e]+b[e+h],e++,r|=t+m+2<<22&4278190080,g[k++]=r;k+=p>>2;e+=p-1}else for(;k<u;){t=b[e++];for(l=0;4>l;l++)m=b[e++],r=t+m+1>>1&255,t=b[e++],r|=t+m+1<<7&65280,m=b[e++],r|=t+m+1<<15&16711680,t=b[e++],r|=t+m+1<<23&4278190080,g[k++]=r;k+=p>>2;e+=p-1}else if(l)for(;k<u;){for(l=0;4>l;l++)r=b[e]+b[e+h]+1>>1&255,e++,r|=b[e]+b[e+h]+1<<7&65280,e++,r|=b[e]+b[e+h]+1<<15&16711680,e++,r|=b[e]+b[e+h]+1<<23&4278190080,e++,g[k++]=r;k+=p>>2;e+=p}else for(;k<u;){for(l=0;4>l;l++)r=b[e],e++,r|=b[e]<<8,e++,r|=b[e]<<16,e++,r|=b[e]<<24,e++,g[k++]=r;k+=p>>2;e+=p}h=this.halfWidth;p=h-8;l=1===(c/2&1);e=((this.mbRow<<3)+(c/2>>1))*h+(this.mbCol<<3)+(a/2>>1);k=this.mbRow*h+this.mbCol<<1;u=k+(h<<1);if(1===(a/2&1))if(l)for(;k<u;){a=f[e]+f[e+h];g=d[e]+d[e+h];e++;for(l=0;2>l;l++)c=f[e]+f[e+h],t=d[e]+d[e+h],e++,b=a+c+2>>2&255,m=g+t+2>>2&255,a=f[e]+f[e+h],g=d[e]+d[e+h],e++,b|=a+c+2<<6&65280,m|=g+t+2<<6&65280,c=f[e]+f[e+h],t=d[e]+d[e+h],e++,b|=a+c+2<<14&16711680,m|=g+t+2<<14&16711680,a=f[e]+f[e+h],g=d[e]+d[e+h],e++,b|=a+c+2<<22&4278190080,m|=g+t+2<<22&4278190080,v[k]=b,n[k]=m,k++;k+=p>>2;e+=p-1}else for(;k<u;){a=f[e];g=d[e];e++;for(l=0;2>l;l++)c=f[e],t=d[e++],b=a+c+1>>1&255,m=g+t+1>>1&255,a=f[e],g=d[e++],b|=a+c+1<<7&65280,m|=g+t+1<<7&65280,c=f[e],t=d[e++],b|=a+c+1<<15&16711680,m|=g+t+1<<15&16711680,a=f[e],g=d[e++],b|=a+c+1<<23&4278190080,m|=g+t+1<<23&4278190080,v[k]=b,n[k]=m,k++;k+=p>>2;e+=p-1}else if(l)for(;k<u;){for(l=0;2>l;l++)b=f[e]+f[e+h]+1>>1&255,m=d[e]+d[e+h]+1>>1&255,e++,b|=f[e]+f[e+h]+1<<7&65280,m|=d[e]+d[e+h]+1<<7&65280,e++,b|=f[e]+f[e+h]+1<<15&16711680,m|=d[e]+d[e+h]+1<<15&16711680,e++,b|=f[e]+f[e+h]+1<<23&4278190080,m|=d[e]+d[e+h]+1<<23&4278190080,e++,v[k]=b,n[k]=m,k++;k+=p>>2;e+=p}else for(;k<u;){for(l=0;2>l;l++)b=f[e],m=d[e],e++,b|=f[e]<<8,m|=d[e]<<8,e++,b|=f[e]<<16,m|=d[e]<<16,e++,b|=f[e]<<24,m|=d[e]<<24,e++,v[k]=b,n[k]=m,k++;k+=p>>2;e+=p}};d.prototype.blockData=null;d.prototype.decodeBlock=function(a){var c=0,b;if(this.macroblockIntra){4>a?(c=this.dcPredictorY,b=this.readCode(W)):(c=4===a?this.dcPredictorCr:this.dcPredictorCb,b=this.readCode(X));if(0<b){var f=this.buffer.getBits(b);this.blockData[0]=0!==(f&1<<b-1)?c+f:c+(-1<<b|f+1)}else this.blockData[0]=c;4>a?this.dcPredictorY=this.blockData[0]:4===a?this.dcPredictorCr=this.blockData[0]:this.dcPredictorCb=this.blockData[0];this.blockData[0]<<=8;b=this.intraQuantMatrix;c=1}else b=this.nonIntraQuantMatrix;for(f=0;;){var d=0,f=this.readCode(Y);if(1===f&&0<c&&0===this.buffer.getBits(1))break;65535===f?(d=this.buffer.getBits(6),f=this.buffer.getBits(8),0===f?f=this.buffer.getBits(8):128===f?f=this.buffer.getBits(8)-256:128<f&&(f-=256)):(d=f>>8,f&=255,this.buffer.getBits(1)&&(f=-f));c+=d;d=F[c];c++;f<<=1;this.macroblockIntra||(f+=0>f?-1:1);f=f*this.quantizerScale*b[d]>>4;0===(f&1)&&(f-=0<f?1:-1);2047<f?f=2047:-2048>f&&(f=-2048);this.blockData[d]=f*Z[d]}4>a?(b=this.currentY,d=this.codedWidth-8,f=this.mbRow*this.codedWidth+this.mbCol<<4,0!==(a&1)&&(f+=8),0!==(a&2)&&(f+=this.codedWidth<<3)):(b=4===a?this.currentCb:this.currentCr,d=(this.codedWidth>>1)-8,f=(this.mbRow*this.codedWidth<<2)+(this.mbCol<<3));this.macroblockIntra?1===c?(this.copyValueToDestination(this.blockData[0]+128>>8,b,f,d),this.blockData[0]=0):(this.IDCT(),this.copyBlockToDestination(this.blockData,b,f,d),this.blockData.set(this.zeroBlockData)):1===c?(this.addValueToDestination(this.blockData[0]+128>>8,b,f,d),this.blockData[0]=0):(this.IDCT(),this.addBlockToDestination(this.blockData,b,f,d),this.blockData.set(this.zeroBlockData))};d.prototype.copyBlockToDestination=function(a,c,b,d){for(var q=0;64>q;q+=8,b+=d+8)c[b+0]=a[q+0],c[b+1]=a[q+1],c[b+2]=a[q+2],c[b+3]=a[q+3],c[b+4]=a[q+4],c[b+5]=a[q+5],c[b+6]=a[q+6],c[b+7]=a[q+7]};d.prototype.addBlockToDestination=function(a,c,b,d){for(var q=0;64>q;q+=8,b+=d+8)c[b+0]+=a[q+0],c[b+1]+=a[q+1],c[b+2]+=a[q+2],c[b+3]+=a[q+3],c[b+4]+=a[q+4],c[b+5]+=a[q+5],c[b+6]+=a[q+6],c[b+7]+=a[q+7]};d.prototype.copyValueToDestination=function(a,c,b,d){for(var q=0;64>q;q+=8,b+=d+8)c[b+0]=a,c[b+1]=a,c[b+2]=a,c[b+3]=a,c[b+4]=a,c[b+5]=a,c[b+6]=a,c[b+7]=a};d.prototype.addValueToDestination=function(a,c,b,d){for(var q=0;64>q;q+=8,b+=d+8)c[b+0]+=a,c[b+1]+=a,c[b+2]+=a,c[b+3]+=a,c[b+4]+=a,c[b+5]+=a,c[b+6]+=a,c[b+7]+=a};d.prototype.copyBlockToDestinationClamp=function(a,c,b,d){for(var q=0,h=0;8>h;h++){for(var p=0;8>p;p++){var l=a[q++];c[b++]=255<l?255:0>l?0:l}b+=d}};d.prototype.addBlockToDestinationClamp=function(a,c,b,d){for(var q=0,h=0;8>h;h++){for(var p=0;8>p;p++){var l=a[q++]+c[b];c[b++]=255<l?255:0>l?0:l}b+=d}};d.prototype.IDCT=function(){var a,c,b,d,q,h,p,l,e,k,u,g,n=this.blockData;for(g=0;8>g;++g)a=n[32+g],c=n[16+g]+n[48+g],b=n[40+g]-n[24+g],h=n[8+g]+n[56+g],p=n[24+g]+n[40+g],d=n[8+g]-n[56+g],q=h+p,l=n[0+g],u=(473*d-196*b+128>>8)-q,h=u-(362*(h-p)+128>>8),p=l-a,e=(362*(n[16+g]-n[48+g])+128>>8)-c,k=l+a,a=p+e,l=k+c,p-=e,c=k-c,b=-h-(473*b+196*d+128>>8),n[0+g]=q+l,n[8+g]=u+a,n[16+g]=p-h,n[24+g]=c-b,n[32+g]=c+b,n[40+g]=h+p,n[48+g]=a-u,n[56+g]=l-q;for(g=0;64>g;g+=8)a=n[4+g],c=n[2+g]+n[6+g],b=n[5+g]-n[3+g],h=n[1+g]+n[7+g],p=n[3+g]+n[5+g],d=n[1+g]-n[7+g],q=h+p,l=n[0+g],u=(473*d-196*b+128>>8)-q,h=u-(362*(h-p)+128>>8),p=l-a,e=(362*(n[2+g]-n[6+g])+128>>8)-c,k=l+a,a=p+e,l=k+c,p-=e,c=k-c,b=-h-(473*b+196*d+128>>8),n[0+g]=q+l+128>>8,n[1+g]=u+a+128>>8,n[2+g]=p-h+128>>8,n[3+g]=c-b+128>>8,n[4+g]=c+b+128>>8,n[5+g]=h+p+128>>8,n[6+g]=a-u+128>>8,n[7+g]=l-q+128>>8};var A="jsmp",D=1,K=[0,23.976,24,25,29.97,30,50,59.94,60,0,0,0,0,0,0,0],F=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),L=new Uint8Array([8,16,19,22,26,27,29,34,16,16,22,24,27,29,34,37,19,22,26,27,29,34,34,38,22,22,26,27,29,34,37,40,22,26,27,29,32,35,40,48,26,27,29,32,35,40,48,58,26,27,29,34,38,46,56,69,27,29,35,38,46,56,69,83]),M=new Uint8Array([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]),Z=new Uint8Array([32,44,42,38,32,25,17,9,44,62,58,52,44,35,24,12,42,58,55,49,42,33,23,12,38,52,49,44,38,30,20,10,32,44,42,38,32,25,17,9,25,35,33,30,25,20,14,7,17,24,23,20,17,14,9,5,9,12,12,10,9,7,5,2]),G=new Int16Array([3,6,0,9,12,0,0,0,1,15,18,0,21,24,0,27,30,0,33,36,0,0,0,3,0,0,2,39,42,0,45,48,0,0,0,5,0,0,4,51,54,0,57,60,0,0,0,7,0,0,6,63,66,0,69,72,0,75,78,0,81,84,0,-1,87,0,-1,90,0,93,96,0,99,102,0,105,108,0,111,114,0,0,0,9,0,0,8,117,120,0,123,126,0,129,132,0,135,138,0,0,0,15,0,0,14,0,0,13,0,0,12,0,0,11,0,0,10,141,-1,0,-1,144,0,147,150,0,153,156,0,159,162,0,165,168,0,171,174,0,177,180,0,183,-1,0,-1,186,0,189,192,0,195,198,0,201,204,0,207,210,0,213,216,0,219,222,0,0,0,21,0,0,20,0,0,19,0,0,18,0,0,17,0,0,16,0,0,35,0,0,34,0,0,33,0,0,32,0,0,31,0,0,30,0,0,29,0,0,28,0,0,27,0,0,26,0,0,25,0,0,24,0,0,23,0,0,22]),d=new Int8Array([3,6,0,-1,9,0,0,0,1,0,0,17]),aa=new Int8Array([3,6,0,9,12,0,0,0,10,15,18,0,0,0,2,21,24,0,0,0,8,27,30,0,33,36,0,-1,39,0,0,0,18,0,0,26,0,0,1,0,0,17]),ba=new Int8Array([3,6,0,9,15,0,12,18,0,24,21,0,0,0,12,27,30,0,0,0,14,39,42,0,36,33,0,0,0,4,0,0,6,54,48,0,45,51,0,0,0,8,0,0,10,-1,57,0,0,0,1,60,63,0,0,0,30,0,0,17,0,0,22,0,0,26]),V=new Int16Array([6,3,0,9,18,0,12,15,0,24,33,0,36,39,0,27,21,0,30,42,0,60,57,0,54,48,0,69,51,0,81,75,0,63,84,0,45,66,0,72,78,0,0,0,60,105,120,0,132,144,0,114,108,0,126,141,0,87,93,0,117,96,0,0,0,32,135,138,0,99,123,0,129,102,0,0,0,4,90,111,0,0,0,8,0,0,16,0,0,44,150,168,0,0,0,28,0,0,52,0,0,62,183,177,0,156,180,0,0,0,1,165,162,0,0,0,61,0,0,56,171,174,0,0,0,2,0,0,40,153,186,0,0,0,48,192,189,0,147,159,0,0,0,20,0,0,12,240,249,0,0,0,63,231,225,0,195,219,0,252,198,0,0,0,24,0,0,36,0,0,3,207,261,0,243,237,0,204,213,0,210,234,0,201,228,0,216,222,0,258,255,0,264,246,0,-1,282,0,285,291,0,0,0,33,0,0,9,318,330,0,306,348,0,0,0,5,0,0,10,279,267,0,0,0,6,0,0,18,0,0,17,0,0,34,339,357,0,309,312,0,270,276,0,327,321,0,351,354,0,303,297,0,294,288,0,300,273,0,342,345,0,315,324,0,336,333,0,363,375,0,0,0,41,0,0,14,0,0,21,372,366,0,360,369,0,0,0,11,0,0,19,0,0,7,0,0,35,0,0,13,0,0,50,0,0,49,0,0,58,0,0,37,0,0,25,0,0,45,0,0,57,0,0,26,0,0,29,0,0,38,0,0,53,0,0,23,0,0,43,0,0,46,0,0,42,0,0,22,0,0,54,0,0,51,0,0,15,0,0,30,0,0,39,0,0,47,0,0,55,0,0,27,0,0,59,0,0,31]),J=new Int16Array([3,6,0,12,9,0,0,0,0,18,15,0,24,21,0,0,0,-1,0,0,1,27,30,0,36,33,0,0,0,2,0,0,-2,42,45,0,48,39,0,60,54,0,0,0,3,0,0,-3,51,57,0,-1,69,0,81,75,0,78,63,0,72,66,0,96,84,0,87,93,0,-1,99,0,108,105,0,0,0,-4,90,102,0,0,0,4,0,0,-7,0,0,5,111,123,0,0,0,-5,0,0,7,114,120,0,126,117,0,0,0,-6,0,0,6,153,162,0,150,147,0,135,138,0,156,141,0,129,159,0,132,144,0,0,0,10,0,0,9,0,0,8,0,0,-8,171,198,0,0,0,-9,180,192,0,168,183,0,165,186,0,174,189,0,0,0,-10,177,195,0,0,0,12,0,0,16,0,0,13,0,0,14,0,0,11,0,0,15,0,0,-16,0,0,-12,0,0,-14,0,0,-15,0,0,-11,0,0,-13]),W=new Int8Array([6,3,0,18,15,0,9,12,0,0,0,1,0,0,2,27,24,0,21,30,0,0,0,0,36,33,0,0,0,4,0,0,3,39,42,0,0,0,5,0,0,6,48,45,0,51,-1,0,0,0,7,0,0,8]),X=new Int8Array([6,3,0,12,9,0,18,15,0,24,21,0,0,0,2,0,0,1,0,0,0,30,27,0,0,0,3,36,33,0,0,0,4,42,39,0,0,0,5,48,45,0,0,0,6,51,-1,0,0,0,7,0,0,8]),Y=new Int32Array([3,6,0,12,9,0,0,0,1,21,24,0,18,15,0,39,27,0,33,30,0,42,36,0,0,0,257,60,66,0,54,63,0,48,57,0,0,0,513,51,45,0,0,0,2,0,0,3,81,75,0,87,93,0,72,78,0,96,90,0,0,0,1025,69,84,0,0,0,769,0,0,258,0,0,1793,0,0,65535,0,0,1537,111,108,0,0,0,1281,105,102,0,117,114,0,99,126,0,120,123,0,156,150,0,162,159,0,144,147,0,129,135,0,138,132,0,0,0,2049,0,0,4,0,0,514,0,0,2305,153,141,0,165,171,0,180,168,0,177,174,0,183,186,0,0,0,2561,0,0,3329,0,0,6,0,0,259,0,0,5,0,0,770,0,0,2817,0,0,3073,228,225,0,201,210,0,219,213,0,234,222,0,216,231,0,207,192,0,204,189,0,198,195,0,243,261,0,273,240,0,246,237,0,249,258,0,279,276,0,252,255,0,270,282,0,264,267,0,0,0,515,0,0,260,0,0,7,0,0,1026,0,0,1282,0,0,4097,0,0,3841,0,0,3585,315,321,0,333,342,0,312,291,0,375,357,0,288,294,0,-1,369,0,285,303,0,318,363,0,297,306,0,339,309,0,336,348,0,330,300,0,372,345,0,351,366,0,327,354,0,360,324,0,381,408,0,417,420,0,390,378,0,435,438,0,384,387,0,0,0,2050,396,402,0,465,462,0,0,0,8,411,399,0,429,432,0,453,414,0,426,423,0,0,0,10,0,0,9,0,0,11,0,0,5377,0,0,1538,0,0,771,0,0,5121,0,0,1794,0,0,4353,0,0,4609,0,0,4865,444,456,0,0,0,1027,459,450,0,0,0,261,393,405,0,0,0,516,447,441,0,516,519,0,486,474,0,510,483,0,504,498,0,471,537,0,507,501,0,522,513,0,534,531,0,468,477,0,492,495,0,549,546,0,525,528,0,0,0,263,0,0,2562,0,0,2306,0,0,5633,0,0,5889,0,0,6401,0,0,6145,0,0,1283,0,0,772,0,0,13,0,0,12,0,0,14,0,0,15,0,0,517,0,0,6657,0,0,262,540,543,0,480,489,0,588,597,0,0,0,27,609,555,0,606,603,0,0,0,19,0,0,22,591,621,0,0,0,18,573,576,0,564,570,0,0,0,20,552,582,0,0,0,21,558,579,0,0,0,23,612,594,0,0,0,25,0,0,24,600,615,0,0,0,31,0,0,30,0,0,28,0,0,29,0,0,26,0,0,17,0,0,16,567,618,0,561,585,0,654,633,0,0,0,37,645,648,0,0,0,36,630,636,0,0,0,34,639,627,0,663,666,0,657,624,0,651,642,0,669,660,0,0,0,35,0,0,267,0,0,40,0,0,268,0,0,266,0,0,32,0,0,264,0,0,265,0,0,38,0,0,269,0,0,270,0,0,33,0,0,39,0,0,7937,0,0,6913,0,0,7681,0,0,4098,0,0,7425,0,0,7169,0,0,271,0,0,274,0,0,273,0,0,272,0,0,1539,0,0,2818,0,0,3586,0,0,3330,0,0,3074,0,0,3842]),B=1,C=2,N=3,E=179,Q=1,R=175,x=0,O=181,P=178,S="precision mediump float;\nuniform sampler2D YTexture;\nuniform sampler2D CBTexture;\nuniform sampler2D CRTexture;\nvarying vec2 texCoord;\nvoid main() {\nfloat y = texture2D(YTexture, texCoord).r;\nfloat cr = texture2D(CBTexture, texCoord).r - 0.5;\nfloat cb = texture2D(CRTexture, texCoord).r - 0.5;\ngl_FragColor = vec4(\ny + 1.4 * cr,\ny + -0.343 * cb - 0.711 * cr,\ny + 1.765 * cb,\n1.0\n);\n}",T="precision mediump float;\nuniform float loaded;\nvarying vec2 texCoord;\nvoid main() {\nfloat c = ceil(loaded-(1.0-texCoord.y));\ngl_FragColor = vec4(c,c,c,1);\n}",I="attribute vec2 vertex;\nvarying vec2 texCoord;\nvoid main() {\ntexCoord = vertex;\ngl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);\n}",U=[null,d,aa,ba],v=function(a){this.bytes=new Uint8Array(a);this.writePos=this.length=this.bytes.length;this.index=0};v.NOT_FOUND=-1;v.prototype.findNextMPEGStartCode=function(){for(var a=this.index+7>>3;a<this.writePos;a++)if(0===this.bytes[a]&&0===this.bytes[a+1]&&1===this.bytes[a+2])return this.index=a+4<<3,this.bytes[a+3];this.index=this.writePos<<3;return v.NOT_FOUND};v.prototype.nextBytesAreStartCode=function(){var a=this.index+7>>3;return a>=this.writePos||0===this.bytes[a]&&0===this.bytes[a+1]&&1===this.bytes[a+2]};v.prototype.nextBits=function(a){var c=this.index>>3,b=8-this.index%8;if(b>=a)return this.bytes[c]>>b-a&255>>8-a;var d=(this.index+a)%8;a=this.index+a-1>>3;b=this.bytes[c]&255>>8-b;for(c++;c<a;c++)b<<=8,b|=this.bytes[c];0<d?b=b<<d|this.bytes[c]>>8-d:(b<<=8,b|=this.bytes[c]);return b};v.prototype.getBits=function(a){var c=this.nextBits(a);this.index+=a;return c};v.prototype.advance=function(a){return this.index+=a};v.prototype.rewind=function(a){return this.index-=a}})(window);

function generateVideoSVGIcon() {
    this.fullstatus  = _fullstatussvg;
    this.nomp4       = _nomp4statussvg;
    this.midcircle   = _midcircle;
    this.midplay     = _midplaysvg;
    this.midnosound  = _midnosoundsvg;
    this.midreplay   = _midreplaysvg;
    this.audio       = _audiosvg;
    this.fullscreen  = _fssvg;
    this.landing     = _landingsvg;

    function _fullstatussvg(){
        var c = '<svg class="video-player-icons" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="speaker" d="M0.5,14.026H3.317V7.973H0.5v6.053Zm4.347,0.132,6.54,6.339V1.5L4.849,7.842v6.316Z"></path>';
        c += '<polygon class="cross" points="20.672 8.412 19.641 7.381 16.925 10.097 14.209 7.381 13.178 8.412 15.894 11.128 13.178 13.844 14.209 14.875 16.925 12.159 19.641 14.875 20.672 13.844 17.956 11.128 20.672 8.412"></polygon>';
        c += '<path class="play" d="M8 5v14l11-7z" />';
        c += '<path class="pause" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />';
        c += '<path class="replay" d="M17.825,6.442l-0.014-.013,2.165-2.062H14v5.689l2.2-2.1,0.014,0.013a5.48,5.48,0,0,1,.277,7.744q-0.133.143-.277,0.277a6.179,6.179,0,0,1-8.431,0A5.48,5.48,0,0,1,7.507,8.25q0.133-.143.277-0.277a6.06,6.06,0,0,1,3.484-1.618V4.177A8.389,8.389,0,0,0,6.175,6.442a7.572,7.572,0,0,0-.383,10.7q0.185,0.2.383,0.383a8.539,8.539,0,0,0,11.651,0,7.572,7.572,0,0,0,.383-10.7Q18.024,6.627,17.825,6.442Z" />';
        c += '</svg>';
        return c;
    };
    function _nomp4statussvg(){
        var c = '<svg class="buffer" viewBox="0 0 40 40"><circle class="loader-base" cx="20" cy="19" r="16" />';
        c += '<circle class="loader-dot" cx="20" cy="19" r="16" /></svg>';
        return c;
    };
    function _midcircle(){
        var c = '<svg class="buffer" viewBox="0 0 80 80" preserveAspectRatio="xMidYMid meet"><circle class="loader-base" cx="40" cy="39" r="36" />';
        c += '<circle class="loader-dot" cx="40" cy="39" r="36" /></svg>';
        return c;
    };
    function _midplaysvg(){
        var c = '<svg class="video-player-icons" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="play" d="M8 5v14l11-7z" /></svg>';
        return c;
    };
    function _midnosoundsvg(){
        var c = '<svg class="video-player-icons" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="speaker" d="M0.5,14.026H3.317V7.973H0.5v6.053Zm4.347,0.132,6.54,6.339V1.5L4.849,7.842v6.316Z"></path>';
        c += '<polygon class="cross" points="20.672 8.412 19.641 7.381 16.925 10.097 14.209 7.381 13.178 8.412 15.894 11.128 13.178 13.844 14.209 14.875 16.925 12.159 19.641 14.875 20.672 13.844 17.956 11.128 20.672 8.412"></polygon>';
        c += '</svg>';
        return c;
    };
    function _midreplaysvg(){
        var c = '<svg class="video-player-icons" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="replay" d="M17.825,6.442l-0.014-.013,2.165-2.062H14v5.689l2.2-2.1,0.014,0.013a5.48,5.48,0,0,1,.277,7.744q-0.133.143-.277,0.277a6.179,6.179,0,0,1-8.431,0A5.48,5.48,0,0,1,7.507,8.25q0.133-.143.277-0.277a6.06,6.06,0,0,1,3.484-1.618V4.177A8.389,8.389,0,0,0,6.175,6.442a7.572,7.572,0,0,0-.383,10.7q0.185,0.2.383,0.383a8.539,8.539,0,0,0,11.651,0,7.572,7.572,0,0,0,.383-10.7Q18.024,6.627,17.825,6.442Z" />';
        c += '</svg>';
        return c;
    };
    function _audiosvg(){
        var c = '<svg class="video-audiosvg" viewBox="0 0 22 22" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="speaker" d="M0.5,14.026H3.317V7.973H0.5v6.053Zm4.347,0.132,6.54,6.339V1.5L4.849,7.842v6.316Z" />';
        c += '<path class="wave2" d="M14,3.154V4.569a6.721,6.721,0,0,1,5.941,6.6A6.721,6.721,0,0,1,14,17.76v1.42a8.107,8.107,0,0,0,7.5-8.016A8.1,8.1,0,0,0,14,3.154Z" />';
        c += '<path class="wave1" d="M17.993,11.165a4.257,4.257,0,0,0-4-4.41V8.289a2.779,2.779,0,0,1,2.584,2.876A2.781,2.781,0,0,1,14,14.042v1.534A4.259,4.259,0,0,0,17.993,11.165Z" />';
        c += '<polygon class="cross" points="20.672 8.412 19.641 7.381 16.925 10.097 14.209 7.381 13.178 8.412 15.894 11.128 13.178 13.844 14.209 14.875 16.925 12.159 19.641 14.875 20.672 13.844 17.956 11.128 20.672 8.412" />';
        c += '</svg>';
        return c;
    };
    function _fssvg(){
        var c = '<svg class="video-fssvg" viewBox="0 0 22 22" preserveAspectRatio="xMidYMid meet">';
        c += '<path class="openfs" d="M4.354,9.162a1.1,1.1,0,0,0,1.1-1.1V6.717l3.34,3.342A0.893,0.893,0,0,0,10.056,8.8L6.714,5.454h1.35a1.1,1.1,0,1,0,0-2.2H4.354a1.1,1.1,0,0,0-1.1,1.1h0V8.063a1.1,1.1,0,0,0,1.1,1.1h0Zm7.375,3.815,3.344,3.347H13.726a1.1,1.1,0,0,0,0,2.2h3.7a1.1,1.1,0,0,0,1.1-1.1V13.717a1.1,1.1,0,1,0-2.2,0h0v1.351L12.982,11.72a0.893,0.893,0,0,0-1.257,1.257h0Z" />';
        c += '<path class="closefs" d="M9.2,4.392a1.1,1.1,0,0,0-1.1,1.1v1.34L4.758,3.5A0.893,0.893,0,0,0,3.5,4.758L6.832,8.1H5.487a1.1,1.1,0,0,0,0,2.2H9.2a1.1,1.1,0,0,0,1.1-1.1h0V5.491a1.1,1.1,0,0,0-1.1-1.1h0Zm9.119,12.67-3.345-3.35h1.346a1.1,1.1,0,1,0,0-2.2h-3.7a1.1,1.1,0,0,0-1.1,1.1V16.32a1.1,1.1,0,1,0,2.2,0h0V14.972l3.344,3.345a0.893,0.893,0,0,0,1.258-1.255h0Z" />';
        c += '</svg>';
        return c;
    };
    function _landingsvg(){
        var c = '<svg class="icon-cta" viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet"><path d="M6,0.5A5.5,5.5,0,1,0,11.5,6,5.5,5.5,0,0,0,6,.5ZM5.2,9.736L3.9,8.443,6.346,6,3.9,3.557,5.2,2.264,8.932,6Z"></path></svg>';
        return c;
    };
};

function InnityAppsMobileAutoPlayVideo(containerID, videoID, options, videoScreenCapImgSrc, canvasOptions, videouioptions) {
    this.playVideo = playVideo;
    this.forcePlayVideo = forcePlayVideo;
    this.pauseVideo = pauseVideo;
    this.replayVideo = replayVideo;
    this.muteVideo = muteVideo;
    this.unmuteVideo = unmuteVideo;
    this.getFallbackPlayer = getFallbackPlayer;

    var container = document.getElementById(containerID);
    var platform;
    var version = '4.6.4';
    var videoPlayer = null;
    var fallbackPlayer = null;

    var extraOptions = mergeObject({
        webm: null,
        mp4: null,
        poster: null,
        tracking: true,
        playInline: false,
        autoplay: true,
        loop: true,
        hideStatus: false,
        hideFullscreenIcon: false,
        hideReplayIcon: false,
        preventClickPropagation: false,
        forceFallback: false,
        cpm: false,
        // Callback events options.
        onLoad: null,
        onPaused: null,
        onEnded: null,
        onClickPlay: null,
        onVideoTimeUpdate: null,
        onEnterFullscreen: null,
        onExitFullscreen: null,
        // ==========
        // Fallback options
        // ==========
        mpg: null,
        canvaswidth:'320',
        canvasheight:'180',
        hideMpgWhenHtmlPlayed: true,
        clickCallback: null,
        videoEndedCallback: null,
        autostart: true,
        automute: true,
        mouseoverSound: false,
        advertisementlabel: false,
        midctatext: "Click to Find Out More",
        playstatectatext: "Learn More",
        adtext: "Advertisement",
        urls: 'clickTAG',
        fullscreen: false,
        fullscreenCallBack: null
    }, options, 'extraOptions');

    initClass();

    function initClass() {
      innityAppsMobileVideoFallbackHelper();

        if (checkCreativeRequirement() === false) {
            errorLog('Creative failed to follow requirement!');
            return;
        }

        platformDetectorWrapper();

        if (isNativeVideoSupported() === true) {
            if (platform.getOS() === 'ios' || platform.getOS() === 'android') {
                videoPlayer = new MobileNativeVideo(container, videoID, extraOptions, platform);
            }
            else {
                videoPlayer = new DesktopNativeVideo(container, videoID, extraOptions, platform);
            }
        }
        else {
            fallbackPlayer = new InnityAppsVideoPreview(containerID, videoID, extraOptions, videoScreenCapImgSrc, canvasOptions, videouioptions);
        }
    };

    function checkCreativeRequirement() {
        if (innityAppsMobileVideoElementGenerator === null) {
            errorLog('generateMaterial or innityAppsMaterialGenerator function didn\'t exist.');
            return false;
        }

        if (typeof (InnityHTMLAd) !== 'object') {
            errorLog('InnityHTMLAd object from Advenue didn\'t exist.');
            return false;
        }

        if (typeof(Browser) !== 'function' && typeof(MobilePlatform) !== 'function' &&
            typeof InnityAppsMobilePlatform !== 'function') {
            errorLog('Browser detection function from Browser.js OR MobilePlatform.js didn\'t exist.');
            return false;
        }

        if (container === null) {
            errorLog('Container with id ['+containerID+'] cannot be found.');
            return false;
        }

        if (extraOptions.webm === null && extraOptions.mp4 === null) {
            console.warn('Both MP4 & WEBM video source didn\'t exist.');
        }

        return true;
    };
    function platformDetectorWrapper() {
        if (typeof(Browser) === 'function') {
            platform = new Browser();
        }
        else if (typeof(MobilePlatform) === 'function') {
            platform = new MobilePlatform();
        } else if (typeof InnityAppsMobilePlatform === 'function') {
          platform = new InnityAppsMobilePlatform();
        }
    };
    function isNativeVideoSupported() {
        if (extraOptions.forceFallback === true) {
            return false;
        }

        if (platform.getOS() === 'ios') {
            if (platform.getOSVersion()[0] < 10) {
                return false;
            }
        }

        if (platform.getBrowserVersion().chrome <= 53 && platform.getBrowserVersion().chrome > 0) {
            return false;
        }

        if (platform.getBrowserVersion().samsungbrowser > 0) {
            return false;
        }

        return true;
    };

    function mergeObject(defaultObj, overrideObject, reference) {
        for (var attributeKey in overrideObject) {
            if (defaultObj.hasOwnProperty(attributeKey)) {
                defaultObj[attributeKey] = overrideObject[attributeKey];
            }
            else {
                console.warn('[Version '+version+'] Key ['+attributeKey+'] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    };
    function errorLog(msg) {
        console.error('[Version '+version+'] '+msg);
    };

    function playVideo() {
        // Disable video from play if iOS Skype.
        if (platform.isIosSkype() === true) {
            return;
        }

        videoPlayer.play();
    };
    function forcePlayVideo() {
        videoPlayer.play();
    }
    function pauseVideo() {
        videoPlayer.pause();
    };
    function replayVideo() {
        videoPlayer.replay();
    };
    function muteVideo() {
        videoPlayer.mute();
    };
    function unmuteVideo() {
        videoPlayer.unmute();
    };

    function getFallbackPlayer() {
        return fallbackPlayer;
    };
}

function MobileNativeVideo(container, videoID, extraOptions, platform) {
    this.play = play;
    this.pause = pause;
    this.replay = replay;
    this.mute = mute;
    this.unmute = unmute;

    var videoWrapperEl;
    var mutedVideoEl;
    var videoControlUI;
    var timeLeftEl;
    var isVideoEnded = false;
		var videoHasSound = false;
    var performanceTracker;
    var videoSvg = new generateVideoSVGIcon();

    let disableSoundToggle_ = false;

    initClass();

    function initClass() {
        videoWrapperEl = document.createElement('div');
        videoWrapperEl.id = videoID+'-wrapper';
        videoWrapperEl.classList.add('apps-video-wrapper');

        generatePoster();
        generateMutedVideo();

        // iOS WeChat cannot trigger by user without the controls.
        if (platform.isIosWeChat() === false) {
            generateControls();
        }

        container.appendChild(videoWrapperEl);

        if (extraOptions.tracking === true) {
           InnityHTMLAd.attachVideo(mutedVideoEl);
           performanceTracker = new PerformanceTracker(mutedVideoEl);
       }
    };

    function generateMutedVideo() {
        mutedVideoEl = document.createElement('video');
        mutedVideoEl.id = videoID;
        mutedVideoEl.setAttribute('preload', 'metadata');
        mutedVideoEl.setAttribute('playsinline', '');
        mutedVideoEl.setAttribute('muted', '');
        mutedVideoEl.classList.add('apps-creative-video');
        mutedVideoEl.style.opacity = 0;
        mutedVideoEl.poster = extraOptions.poster;
        mute();

        if (extraOptions.autoplay === true) {
            // Don't allow autoplay if is iOS Skype.
            if (platform.isIosSkype() === false) {
                mutedVideoEl.setAttribute('autoplay', '');
            }
        }

        if (extraOptions.mp4 !== null) {
            mutedVideoEl.appendChild(generateMp4Source());
        }
        if (extraOptions.webm !== null) {
            mutedVideoEl.appendChild(generateWebmSource());
        }

        // iOS WeChat cannot trigger by user without the controls.
        if (platform.isIosWeChat() === true) {
            mutedVideoEl.setAttribute('controls', '');
            mutedVideoEl.style.opacity = 1;
        }
        else {
            bindMutedVideoEvents();
        }

        videoWrapperEl.appendChild(mutedVideoEl);
    };
    function bindMutedVideoEvents() {
        mutedVideoEl.addEventListener('loadeddata', eventAutoPlayVideoOnLoad, false);
        mutedVideoEl.addEventListener('play', videoPlayed, false);
        mutedVideoEl.addEventListener('pause', videoPaused, false);
        mutedVideoEl.addEventListener('ended', videoEnded, false);
        mutedVideoEl.addEventListener('timeupdate', videoTimeUpdate, false);
        mutedVideoEl.addEventListener('timeupdate', extraOptions.onVideoTimeUpdate, false);
        mutedVideoEl.addEventListener('fullscreenchange', fullscreenChanged, false);
        mutedVideoEl.addEventListener('webkitfullscreenchange', fullscreenChanged, false);
        mutedVideoEl.addEventListener('webkitendfullscreen', iosDelayFullScreenEnded, false);

				// MS and Moz need document for fullscreenchange
				document.addEventListener('mozfullscreenchange', fullscreenChanged, false);
    };
    function generateWebmSource() {
        var sourceEl = document.createElement('source');
        sourceEl.src = extraOptions.webm;
        sourceEl.type = 'video/webm';

        return sourceEl;
    };
    function generateMp4Source() {
        var sourceEl = document.createElement('source');
        sourceEl.src = extraOptions.mp4;
        sourceEl.type = 'video/mp4';

        return sourceEl;
    };

    function generatePoster() {
        var posterContainer = document.createElement('div');
        posterContainer.classList.add('apps-video-poster-container');

        var imageEl = document.createElement('img');
        imageEl.src = extraOptions.poster;

        posterContainer.appendChild(imageEl);
        videoWrapperEl.appendChild(posterContainer);

        generatePlayButtonForPoster();
    };
    function generatePlayButtonForPoster() {
        var buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('apps-video-poster-play-container');

        buttonWrapper.innerHTML = videoSvg.midcircle() + videoSvg.midplay();

        videoWrapperEl.appendChild(buttonWrapper);
    };

    function generateControls() {
        videoControlUI = new VideoControllerUI(controlLayerClicked, videoEnterFullScreenByUser, toggleSound);
    };
    function controlLayerClicked(e) {
      if (extraOptions.preventClickPropagation === true) {
        e.stopPropagation();
      }

      if (extraOptions.playInline === false) {
        if (mutedVideoEl.requestFullScreen) {
          mutedVideoEl.requestFullScreen();
        } else if (mutedVideoEl.webkitRequestFullScreen) {
          mutedVideoEl.webkitRequestFullScreen();
        }

        if (platform.getOS() === 'ios') {
          mutedVideoEl.webkitEnterFullScreen();
        }

        enterFullscreen();
      }

      play();
      unmute();
      setTimeout(iosFullScreenAudioCheck, 500);
      performanceTracker.fireClickToPlay();

      if (typeof (extraOptions.onClickPlay) === 'function') {
        extraOptions.onClickPlay();
      }
    }

		function videoEnterFullScreenByUser(e) {
				if (extraOptions.preventClickPropagation === true) {
						e.stopPropagation();
				}

				if (extraOptions.playInline === false) {
						if (mutedVideoEl.requestFullScreen) {
								mutedVideoEl.requestFullScreen();
						}
						else if (mutedVideoEl.webkitRequestFullScreen) {
								mutedVideoEl.webkitRequestFullScreen();
						}

						if (platform.getOS() === 'ios') {
								mutedVideoEl.webkitEnterFullScreen();
						}

						enterFullscreen();
				}

				play();
				unmute();
				setTimeout(iosFullScreenAudioCheck, 500);
				performanceTracker.fireClickToPlay();

				if (typeof(extraOptions.onClickPlay) === 'function') {
						extraOptions.onClickPlay();
				}
		}

    function toggleSound() {
        if (disableSoundToggle_ === true) {
            disableSoundToggle_ = false;
            return;
        }

        if(mutedVideoEl.muted === true) {
            unmute();
        }
        else {
            mute();
        }
    }
    function replayLayerClicked() {
        play();
        unmute();
        setTimeout(iosFullScreenAudioCheck, 500);
        performanceTracker.fireClickToPlay();

        if (typeof(extraOptions.onClickPlay) === 'function') {
            extraOptions.onClickPlay();
        }
    }

    function eventAutoPlayVideoOnLoad() {
        timeLeftEl = document.getElementById('text_remain_'+videoID);
        videoControlUI.videoLoaded();

        if (typeof(extraOptions.onLoad) === 'function') {
            extraOptions.onLoad({
                videoDuration: mutedVideoEl.duration
            });
        }
    };
    function videoPlayed() {
        videoControlUI.videoPlayed();
    };
    function videoPaused() {
        videoControlUI.videoPaused();

        if (typeof(extraOptions.onPaused) === 'function') {
            extraOptions.onPaused();
        }
    };
    function videoEnded() {
        if (document.exitFullscreen) {
						if (mutedVideoEl.fullscreenElement || // alternative standard method
						mutedVideoEl.mozFullScreenElement ||
						mutedVideoEl.webkitFullscreenElement ||
						mutedVideoEl.msFullscreenElement) {
							document.exitFullscreen();
						}
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        if (platform.getOS() === 'ios') {
            mutedVideoEl.webkitExitFullscreen();
        }

        mute();
        isVideoEnded = true;

        if (extraOptions.loop === true) {
          play();
        } else {
          videoControlUI.videoEnded();
        }

        if (typeof(extraOptions.onEnded) === 'function') {
            extraOptions.onEnded();
        }

        exitFullscreen();
    };
    function videoTimeUpdate() {
        mutedVideoEl.style.opacity = 1;

        var remainingTime = Math.round(mutedVideoEl.duration - mutedVideoEl.currentTime);
        if (isNaN(remainingTime)) {
            remainingTime = 0;
        }
        var minute = Math.floor(remainingTime / 60);
        var seconds = remainingTime - minute * 60;
        if (seconds < 10) {
            seconds = '0'+seconds;
        }
        timeLeftEl.innerHTML = minute+':'+seconds;
    };
    function fullscreenChanged() {
        var fsstate = 'openfs';
        var appsFullScreen = document.fullscreenElement;
        if (document.webkitFullscreenElement !== undefined) {
            appsFullScreen = document.webkitFullscreenElement;
        }

        if (appsFullScreen === null || appsFullScreen === undefined) {
            // Exit fullscreen mode.
            mute();

            // Pause the video if iOS Skype in-app browser.
            if (platform.isIosSkype() === true) {
                pause();
                return;
            }

            fsstate = 'closefs';
            exitFullscreen();
        }

        if (typeof(extraOptions.fullscreenCallBack) === 'function') {
            extraOptions.fullscreenCallBack(fsstate);
        }
    };
    function iosDelayFullScreenEnded() {
        setTimeout(iosFullScreenEnded, 500);
    };
    function iosFullScreenEnded() {
        if (isVideoEnded === true) {
            return;
        }

        if (mutedVideoEl.webkitDisplayingFullscreen === false) {
            if (typeof(extraOptions.fullscreenCallBack) === 'function') {
                extraOptions.fullscreenCallBack('closefs');
            }

            exitFullscreen();
            mute();

            // Pause the video if iOS Skype in-app browser.
            if (platform.isIosSkype() === true) {
                pause();
                return;
            }

            // Need extra delay to make sure video is always playing.
            if (mutedVideoEl.paused === true) {
                play();
                iosDelayFullScreenEnded();
            }
        }
    };
    /**
     * In IOS 11, full screen video need delay to unmuted.
     */
    function iosFullScreenAudioCheck() {
        if (mutedVideoEl.muted === false) {
            return;
        }

        unmute();
        setTimeout(iosFullScreenAudioCheck, 500);
    };

    function play() {
        var videoPromise = mutedVideoEl.play();
        if (videoPromise !== undefined) {
            videoPromise.catch(function(error) {})
            .then(function() {});
        }

				// Check on video has sound / no sound as video loaded did not load sound.
				setTimeout(videoControlUI.videoSoundCheck, 100);

        isVideoEnded = false;
    };
    function pause() {
        mutedVideoEl.pause();
    };
    function replay() {
        mutedVideoEl.currentTime = 0;
        play();
    };
    function mute() {
        mutedVideoEl.muted = true;
    };
    function unmute() {
        mutedVideoEl.muted = false;
    };
		function videohasAudio(_video) {
				return Boolean(_video.mozHasAudio) ||
				Boolean(_video.audioTracks && _video.audioTracks.length) ||
				(function(){
					if(_video.webkitAudioDecodedByteCount) {
						if(_video.webkitAudioDecodedByteCount > 66) { return true; }
					}
					return false;
				})();
		};

    /**
     * When video enter fullscreen.
     */
    function enterFullscreen() {
        performanceTracker.fireEnterFullScreen();

        if (typeof(extraOptions.onEnterFullscreen) === 'function') {
            extraOptions.onEnterFullscreen();
        }
    };
    /**
     * When video exit fullscreen.
     */
    function exitFullscreen() {
        performanceTracker.fireExitFullScreen();

        if (typeof(extraOptions.onExitFullscreen) === 'function') {
            extraOptions.onExitFullscreen();
        }
    };

    function VideoControllerUI(clickCallback, enterFullScreenCallback, toggleSoundCallback) {
        this.videoLoaded = videoLoaded;
        this.videoPlayed = videoPlayed;
        this.videoEnded = videoEnded;
        this.videoPaused = videoPaused;
				this.videoSoundCheck = videoSoundCheck;

        var controlWrapperEl = null;
        var endedWrapperEl = null;
        var playButtonWrapperEl = null;

        let totalCtaClicked_ = 1;

        initClass();

        function initClass() {
            controlWrapperEl = document.createElement('div');
            controlWrapperEl.classList.add('apps-video-control-wrapper');
            controlWrapperEl.addEventListener('click', clickCallback, false);

            endedWrapperEl = document.createElement('div');
            endedWrapperEl.classList.add('apps-video-ended-wrapper');
            endedWrapperEl.style.display = 'none';
            endedWrapperEl.addEventListener('click', enterFullScreenCallback, false);

            generateControlComponent();
            generateEndedComponent();

            videoWrapperEl.appendChild(endedWrapperEl);
            videoWrapperEl.appendChild(controlWrapperEl);

            setTimeout(checkSalesModel_, 500);
            setInterval(iosCssWorkaround_, 1000);
        };

        function generateControlComponent() {
            // Controllers
            var controllerEl = [
                generateControlsWrapper(),
                {id: 'play_btn_when_paused_'+videoID, cssClass: ['status-container'], cssStyle: {display: 'none'}, childs: [
                    {cssClass: ['btn-wrapper'], childs: [
                        {cssClass: ['video-round-btn'], innerHTML: videoSvg.midcircle() + videoSvg.midplay()}
                    ]}
                ]},
                {cssClass:['top-vidcta-container','full-video-height'], cssStyle: {opacity: 1}, clickFunc:clickOnCTA_, childs:[
                    {cssClass:['text-vidcta-wrapper'], childs:[
                        {elType:'span', cssClass:['cta-text'], innerHTML:extraOptions.playstatectatext},
                        {elType:'span', innerHTML:videoSvg.landing()}
                    ]}
                ]}
            ];

            for (var i = 0; i < controllerEl.length; i++) {
                innityAppsMobileVideoElementGenerator(controllerEl[i], controlWrapperEl);
            }

            /**
             * Generate controls wrapper with volumn, duration & fullscreen icon.
             * @returns {object} JSON object for generateMaterial function.
             */
            function generateControlsWrapper() {
                var controlsContainer = {cssClass: [], childs: []};

                var controlsContainerCss = ['controllers-container'];
                if (extraOptions.hideStatus !== true) {
                    controlsContainerCss.push('show-controller');
                }
                controlsContainer.cssClass = controlsContainerCss;

                // Volumn icon & duration layer.
                controlsContainer.childs.push(
                    {cssClass:['controls_wrapper','float-to-left'], childs:[
                        {id:'btn_sound_'+videoID, cssClass:['video-round-btn','audio'], cssStyle:{display:'block'}, innerHTML:videoSvg.audio()},
                        {id:'text_remain_'+videoID, cssClass:['player-time','hidden-player-icon'], innerHTML:'0:00'}
                    ]}
                );

                // Fullscreen icon.
                if (extraOptions.hideFullscreenIcon === false) {
                    controlsContainer.childs.push(
                        {cssClass:['controls_wrapper','float-to-right'], childs:[
                            {id:'btn_fs_'+videoID, cssClass:['video-round-btn','fs'], cssStyle:{display:'block'}, clickFunc:enterFullScreenCallback, innerHTML:videoSvg.fullscreen()}
                        ]}
                    );
                }

                return controlsContainer;
            };
        };
        function generateEndedComponent() {
            endedWrapperEl.innerHTML = '';
            // Replay icon.
            if (extraOptions.hideReplayIcon === false) {
                endedWrapperEl.innerHTML = videoSvg.midcircle() + videoSvg.midreplay();
            }
            // Fullscreen icon.
            if (extraOptions.hideStatus === false && extraOptions.hideFullscreenIcon === false) {
                endedWrapperEl.innerHTML += videoSvg.fullscreen();
            }

            var ctaMaterials = [{cssClass:['top-vidcta-container'], cssStyle: {opacity: 1}, clickTag:extraOptions.urls, childs:[
                {cssClass:['text-vidcta-wrapper'], childs:[
                    {elType:'span', cssClass:['cta-text'], innerHTML:extraOptions.playstatectatext},
                    {elType:'span', innerHTML:videoSvg.landing()}
                ]}
            ]}];

            for (var i = 0; i < ctaMaterials.length; i++) {
                innityAppsMobileVideoElementGenerator(ctaMaterials[i], endedWrapperEl);
            }
        };

        function videoLoaded() {
            queryRequiredElements();
        };
        function videoEnded() {
            controlWrapperEl.style.display = 'none';
            endedWrapperEl.style.display = '';
        };
        function videoPlayed() {
            controlWrapperEl.style.display = '';
            endedWrapperEl.style.display = 'none';
            // Sometime video trigger played faster than video loaded, that why need this checking.
            // playButtonWrapperEl is initial after video had loaded in queryRequiredElements().
            if (playButtonWrapperEl !== null) {
                playButtonWrapperEl.style.display = 'none';
            }
						// Delay Check on video has sound / no sound as video loaded did not load sound.
						videoSoundCheck();
        };
        function videoPaused() {
            // Sometime video trigger played faster than video loaded, that why need this checking.
            // playButtonWrapperEl is initial after video had loaded in queryRequiredElements().
            if (playButtonWrapperEl !== null) {
                playButtonWrapperEl.style.display = 'block';
            }
        };

    function iosCssWorkaround_() {
      if (platform.getOS() !== 'ios') {
        return;
      }

      controlWrapperEl.style.left = '0%';
      setTimeout(function() {
        controlWrapperEl.style.left = '0';
      }, 500);
    }

        function checkSalesModel_() {
          // Only CPM sales model come with 1st & 2nd clicks to landing.
          if (extraOptions.cpm === false) {
            totalCtaClicked_ = 2;

            let ctaContainers = document.getElementsByClassName('top-vidcta-container');
            for (let i = 0; i < ctaContainers.length; i++) {
              ctaContainers[i].classList.remove('full-video-height');
            }

          }
        }

        function clickOnCTA_() {
          if (totalCtaClicked_ >= 2) {
            let ctaContainers = document.getElementsByClassName('top-vidcta-container');
            for (let i = 0; i < ctaContainers.length; i++) {
              ctaContainers[i].classList.remove('full-video-height');
            }
          }

          innityAppsTriggerClicktagHandler(extraOptions.urls);
          totalCtaClicked_++;
        }

        /**
         * This is a workaround to query HTML elements after they had append into DOM.
         */
        function queryRequiredElements() {
            playButtonWrapperEl = document.getElementById('play_btn_when_paused_'+videoID);
        };

				function videoSoundCheck(){
						var btnSound = document.getElementById('btn_sound_'+videoID);
						if(btnSound === null) {
							return;
						}
						if(!videohasAudio(mutedVideoEl)) {
							btnSound.classList.add("is-muted");
							btnSound.classList.add("video-no-sound");
							videoHasSound = false;
						} else {
							btnSound.classList.remove("is-muted");
							btnSound.classList.remove("video-no-sound");
							videoHasSound = true;
						}
				};
    };

    /**
     * Performance tracker to record down video click to play & video loaded.
     * @argument {VideoElement} videoEl
     */
    function PerformanceTracker(videoEl) {
        this.fireClickToPlay = fireClickToPlay;
        this.fireEnterFullScreen = fireEnterFullScreen;
        this.fireExitFullScreen = fireExitFullScreen;

        var trackingVideoID = '';
        var isClicked = false;

        initClass();

        function initClass() {
            if (typeof(videoEl) === 'undefined' || videoEl === null) {
                return;
            }

            var videoID = mutedVideoEl.id;
            trackingVideoID = '_' + videoID[0].toUpperCase() + videoID.substr(1);

            bindVideoEvent();
        };

        function bindVideoEvent() {
            videoEl.addEventListener('loadeddata', fireLoaded, false);
        };

        function fireLoaded() {
            InnityHTMLAd.track(trackingVideoID + '_AutoLoaded');
        };
        function fireClickToPlay() {
            if (isClicked === true) {
                return;
            }

            InnityHTMLAd.track(trackingVideoID + '_ClickAutoToPlay');
            isClicked = true;
        };
        function fireEnterFullScreen() {
            if(extraOptions.tracking === true) {
                InnityHTMLAd.track(trackingVideoID + '_OpenFullscreen');
            }
        };
        function fireExitFullScreen() {
            if(extraOptions.tracking === true) {
                InnityHTMLAd.track(trackingVideoID + '_CloseFullscreen');
            }
        };
    };
}

function DesktopNativeVideo(container, videoID, extraOptions, platform) {
    this.play = play;
    this.pause = pause;
    this.replay = replay;
    this.mute = mute;
    this.unmute = unmute;

    var videoWrapperEl;
    var mutedVideoEl;
    var videoControlUI;
    var timeLeftEl;
    var isVideoEnded = false;
		var videoHasSound = false;
    /**
     * Special control to skip sound toggle in below condition.
     * When video was paused.
     * When video was played, it will disable the skip.
     * @type Boolean
     */
    var disableSoundToggle = false;
    var performanceTracker;
    var videoSvg = new generateVideoSVGIcon();
    var audioSvg = videoSvg.audio(), fullscreenSvg = videoSvg.fullscreen();

    initClass();

    function initClass() {
        videoWrapperEl = document.createElement('div');
        videoWrapperEl.id = videoID+'-wrapper';
        videoWrapperEl.classList.add('apps-video-wrapper');

        generatePoster();
        generateMutedVideo();
        generateControls();

        container.appendChild(videoWrapperEl);

        if (extraOptions.tracking === true) {
            InnityHTMLAd.attachVideo(mutedVideoEl);
            performanceTracker = new PerformanceTracker(mutedVideoEl);
       }
    };

    function generateMutedVideo() {
        mutedVideoEl = document.createElement('video');
        mutedVideoEl.id = videoID;
        mutedVideoEl.setAttribute('preload', 'metadata');
        mutedVideoEl.setAttribute('playsinline', '');
        mutedVideoEl.setAttribute('muted', '');
        mutedVideoEl.classList.add('apps-creative-video');
        mutedVideoEl.style.opacity = 0;
        mutedVideoEl.poster = extraOptions.poster;
        mute();

        if (extraOptions.autoplay === true) {
            mutedVideoEl.setAttribute('autoplay', '');
        }

        if (extraOptions.mp4 !== null) {
            mutedVideoEl.appendChild(generateMp4Source());
        }
        if (extraOptions.webm !== null) {
            mutedVideoEl.appendChild(generateWebmSource());
        }

        bindMutedVideoEvents();
        videoWrapperEl.appendChild(mutedVideoEl);
    };
    function bindMutedVideoEvents() {
        mutedVideoEl.addEventListener('loadeddata', eventAutoPlayVideoOnLoad, false);
        mutedVideoEl.addEventListener('play', videoPlayed, false);
        mutedVideoEl.addEventListener('pause', videoPaused, false);
        mutedVideoEl.addEventListener('ended', videoEnded, false);
        mutedVideoEl.addEventListener('timeupdate', videoTimeUpdate, false);
        mutedVideoEl.addEventListener('timeupdate', extraOptions.onVideoTimeUpdate, false);
        mutedVideoEl.addEventListener('fullscreenchange', fullscreenChanged, false);
        mutedVideoEl.addEventListener('webkitfullscreenchange', fullscreenChanged, false);

				// MS and Moz need document for fullscreenchange
				document.addEventListener('mozfullscreenchange', fullscreenChanged, false);
				document.addEventListener('MSFullscreenChange', fullscreenChanged, false);

        videoWrapperEl.appendChild(mutedVideoEl);
    };
    function generateWebmSource() {
        var sourceEl = document.createElement('source');
        sourceEl.src = extraOptions.webm;
        sourceEl.type = 'video/webm';

        return sourceEl;
    };
    function generateMp4Source() {
        var sourceEl = document.createElement('source');
        sourceEl.src = extraOptions.mp4;
        sourceEl.type = 'video/mp4';

        return sourceEl;
    };

    function generatePoster() {
        var posterContainer = document.createElement('div');
        posterContainer.classList.add('apps-video-poster-container');

        var imageEl = document.createElement('img');
        imageEl.src = extraOptions.poster;

        posterContainer.appendChild(imageEl);
        videoWrapperEl.appendChild(posterContainer);

        generatePlayButtonForPoster();
    };
    function generatePlayButtonForPoster() {
        var buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('apps-video-poster-play-container');

        buttonWrapper.innerHTML = videoSvg.midcircle() + videoSvg.midplay();

        videoWrapperEl.appendChild(buttonWrapper);
    };

    function generateControls() {
        videoControlUI = new VideoControllerUI(controlLayerClicked, videoEnterFullScreenByUser, toggleSound, replayLayerClicked);
    };
    function controlLayerClicked(e) {
        toggleSound();
        play();
        performanceTracker.fireClickToPlay();

        if (typeof(extraOptions.onClickPlay) === 'function') {
            extraOptions.onClickPlay();
        }
    };
    function videoEnterFullScreenByUser() {
        if (!mutedVideoEl.fullscreenElement && // alternative standard method
            !mutedVideoEl.mozFullScreenElement &&
            !mutedVideoEl.webkitFullscreenElement &&
            !mutedVideoEl.msFullscreenElement) { //current working methods
            var requestFullScreen = mutedVideoEl.requestFullscreen || mutedVideoEl.msRequestFullscreen || mutedVideoEl.mozRequestFullScreen || mutedVideoEl.webkitRequestFullscreen;
						if(requestFullScreen == mutedVideoEl.msRequestFullscreen) {
							mutedVideoEl.controls = 'controls';
						}
            requestFullScreen.call(mutedVideoEl);
        }

        unmute();
        enterFullscreen();
    };
    function toggleSound() {
        if (disableSoundToggle === true) {
            disableSoundToggle = false;
            return;
        }

        if(mutedVideoEl.muted === true) {
            unmute();
        }
        else {
            mute();
        }
    };
    function replayLayerClicked() {
        play();
    };

    function eventAutoPlayVideoOnLoad() {
        timeLeftEl = document.getElementById('text_remain_'+videoID);
        videoControlUI.videoLoaded();

        if (typeof(extraOptions.onLoad) === 'function') {
            extraOptions.onLoad({
                videoDuration: mutedVideoEl.duration
            });
        }
    };
    function videoPlayed() {
        videoControlUI.videoPlayed();
        disableSoundToggle = false;
    };
    function videoPaused() {
        if (mutedVideoEl.currentTime >= mutedVideoEl.duration) {
            return;
        }

        videoControlUI.videoPaused();
        disableSoundToggle = true;

        if (typeof(extraOptions.onPaused) === 'function') {
            extraOptions.onPaused();
        }
    };
    function videoEnded() {
        if (document.exitFullscreen) {
						if (mutedVideoEl.fullscreenElement || // alternative standard method
						mutedVideoEl.mozFullScreenElement ||
						mutedVideoEl.webkitFullscreenElement ||
						mutedVideoEl.msFullscreenElement) {
							document.exitFullscreen();
						}
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        isVideoEnded = true;

        if (extraOptions.loop === true) {
          play();
        } else {
          videoControlUI.videoEnded();
        }

        if (typeof(extraOptions.onEnded) === 'function') {
            extraOptions.onEnded();
        }
    };
    function videoTimeUpdate() {
        mutedVideoEl.style.opacity = 1;

        var remainingTime = Math.round(mutedVideoEl.duration - mutedVideoEl.currentTime);
        if (isNaN(remainingTime)) {
            remainingTime = 0;
        }
        var minute = Math.floor(remainingTime / 60);
        var seconds = remainingTime - minute * 60;
        if (seconds < 10) {
            seconds = '0'+seconds;
        }
        timeLeftEl.innerHTML = minute+':'+seconds;
    };
    function fullscreenChanged() {
        var fsstate = 'openfs';
        var appsFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

				mutedVideoEl.controls = 'controls';

        if (appsFullScreen === null || appsFullScreen === undefined) {
            // Exit fullscreen mode.
            fsstate = 'closefs';
            exitFullscreen();

						mutedVideoEl.controls = '';
        }

        if (typeof(extraOptions.fullscreenCallBack) === 'function') {
            extraOptions.fullscreenCallBack(fsstate);
        }

        performanceTracker[fsstate].call();
    };

    function play() {
        var videoPromise = mutedVideoEl.play();
        if (videoPromise !== undefined) {
            videoPromise.catch(function(error) {})
            .then(function() {});
        }
        videoPlayed();

				// Check on video has sound / no sound as video loaded did not load sound.
				setTimeout(videoControlUI.videoSoundCheck, 100);

        isVideoEnded = false;
    };
    function pause() {
        mutedVideoEl.pause();
    };
    function replay() {
        mutedVideoEl.currentTime = 0;
        play();
    };
    function mute() {
        mutedVideoEl.muted = true;
    };
    function unmute() {
        mutedVideoEl.muted = false;
    };
		function videohasAudio(_video) {
				return Boolean(_video.mozHasAudio) ||
				Boolean(_video.audioTracks && _video.audioTracks.length) ||
				(function(){
					if(_video.webkitAudioDecodedByteCount) {
						if(_video.webkitAudioDecodedByteCount > 66) { return true; }
					}
					return false;
				})();
		};

    /**
     * When video enter fullscreen.
     */
    function enterFullscreen() {
        if (typeof(extraOptions.onEnterFullscreen) === 'function') {
            extraOptions.onEnterFullscreen();
        }
    };
    /**
     * When video exit fullscreen.
     */
    function exitFullscreen() {
        if (typeof(extraOptions.onExitFullscreen) === 'function') {
            extraOptions.onExitFullscreen();
        }
    };

    function VideoControllerUI(clickCallback, enterFullScreenCallback, toggleSoundCallback, replayCallback) {
        this.videoPlayed = videoPlayed;
        this.videoPaused = videoPaused;
        this.videoEnded = videoEnded;
        this.videoLoaded = videoLoaded;
				this.videoSoundCheck = videoSoundCheck;

        var controlWrapperEl = null, endedWrapperEl = null;
        var playButtonWrapperEl = null;
        var soundBtnEl = null, fsBtnEl = null, controllersEl = null, slidingIntv = null;

        let totalCtaClicked_ = 1;

        initClass();

        function initClass() {
            controlWrapperEl = document.createElement('div');
            controlWrapperEl.classList.add('apps-video-control-wrapper');

            endedWrapperEl = document.createElement('div');
            endedWrapperEl.classList.add('apps-video-ended-wrapper');
            endedWrapperEl.style.display = 'none';
            endedWrapperEl.addEventListener('click', endedLayerClicked, false);

            generateControlComponent();
            generateEndedComponent();

            videoWrapperEl.appendChild(endedWrapperEl);
            videoWrapperEl.appendChild(controlWrapperEl);

            setTimeout(checkSalesModel_, 500);
        };

        function generateControlComponent() {
            // Controllers
            var controllerEl = [
                generateControlsWrapper(),
                {id: 'play_btn_when_paused_'+videoID, cssClass: ['status-container'], cssStyle: {display: 'none'}, childs: [
                    {cssClass: ['btn-wrapper'], childs: [
                        {cssClass: ['video-round-btn'], innerHTML: videoSvg.midcircle() + videoSvg.midplay()}
                    ]}
                ]},
                {id:'topcta_'+videoID, cssClass:['top-vidcta-container','full-video-height'], cssStyle: {opacity: 1}, clickFunc:clickOnCTA_, childs:[
                    {cssClass:['text-vidcta-wrapper'], childs:[
                        {elType:'span', cssClass:['cta-text'], innerHTML:extraOptions.playstatectatext},
                        {elType:'span', innerHTML:videoSvg.landing()}
                    ]}
                ]}
            ];

            for (var i = 0; i < controllerEl.length; i++) {
                innityAppsMobileVideoElementGenerator(controllerEl[i], controlWrapperEl);
            }

            /**
             * Generate controls wrapper with volumn, duration & fullscreen icon.
             * @returns {object} JSON object for generateMaterial function.
             */
            function generateControlsWrapper() {
                var controlsContainer = {id:'controllers_'+videoID, cssClass: [], childs: []};

                var controlsContainerCss = ['controllers-container'];
                if (extraOptions.hideStatus !== true) {
                    controlsContainerCss.push('show-controller');
                }
                controlsContainer.cssClass = controlsContainerCss;

                // Volumn icon & duration layer.
                controlsContainer.childs.push(
                    {cssClass:['controls_wrapper','float-to-left'], childs:[
                        {id:'btn_sound_'+videoID, cssClass:['video-round-btn','audio'], cssStyle:{display:'block'}, clickFunc: toggleVideoSound, innerHTML:audioSvg},
                        {id:'text_remain_'+videoID, cssClass:['player-time','hidden-player-icon'], innerHTML:'0:00'}
                    ]}
                );

                // Fullscreen icon.
                if (extraOptions.hideFullscreenIcon === false) {
                    controlsContainer.childs.push(
                        {cssClass:['controls_wrapper','float-to-right'], childs:[
                            {id:'btn_fs_'+videoID, cssClass:['video-round-btn','fs'], cssStyle:{display:'block'}, clickFunc: enterFullScreenCallback, innerHTML:fullscreenSvg}
                        ]}
                    );
                }

                return controlsContainer;
            };
        };
        function generateEndedComponent() {
            endedWrapperEl.innerHTML = '';
            // Replay icon.
            if (extraOptions.hideReplayIcon === false) {
                endedWrapperEl.innerHTML = videoSvg.midcircle() + videoSvg.midreplay();
            }

            var ctaMaterials = [{cssClass:['top-vidcta-container'], cssStyle: {opacity: 1}, clickTag:extraOptions.urls, childs:[
                {cssClass:['text-vidcta-wrapper'], childs:[
                    {elType:'span', cssClass:['cta-text'], innerHTML:extraOptions.playstatectatext},
                    {elType:'span', innerHTML:videoSvg.landing()}
                ]}
            ]}];

            for (var i = 0; i < ctaMaterials.length; i++) {
                innityAppsMobileVideoElementGenerator(ctaMaterials[i], endedWrapperEl);
            }
        };

        function videoLoaded() {
            queryRequiredElements();
        };
        function videoEnded() {
            controlWrapperEl.style.display = 'none';
            endedWrapperEl.style.display = '';
        };
        function videoPlayed() {
            controlWrapperEl.style.display = '';
            endedWrapperEl.style.display = 'none';
            // Sometime video trigger played faster than video loaded, that why need this checking.
            // playButtonWrapperEl is initial after video had loaded in queryRequiredElements().
            if (playButtonWrapperEl !== null) {
                playButtonWrapperEl.style.display = 'none';
            }
						// Check on video has sound / no sound as video loaded did not load sound.
						videoSoundCheck();
        };
        function videoPaused() {
            // Sometime video trigger played faster than video loaded, that why need this checking.
            // playButtonWrapperEl is initial after video had loaded in queryRequiredElements().
            if (playButtonWrapperEl !== null) {
                playButtonWrapperEl.style.display = 'block';
            }
        };

        function videoSoundChange() {
            if (mutedVideoEl.muted === true) {
                soundBtnEl.classList.add("is-muted");
            }
            else {
                soundBtnEl.classList.remove("is-muted");
            }
        };
        function toggleVideoSound() {
            toggleSoundCallback();
        };
        function controlLayerClicked(e) {
            if (extraOptions.preventClickPropagation === true) {
                e.stopPropagation();
            }

            clickCallback();
        }
        function endedLayerClicked(e) {
            e.stopPropagation();

            replayCallback();
        };

        function showController(e) {
            if (extraOptions.hideStatus !== true) {
                clearTimeout(slidingIntv);
                controllersEl.style.display = "block";
                slidingIntv = setTimeout(function() {
                    controllersEl.classList.add('show-controller');
                }, 300);
            }
        };
        function hideController(e) {
            clearTimeout(slidingIntv);
            controllersEl.classList.remove('show-controller');
            slidingIntv = setTimeout(function() {
                controllersEl.style.display = "none";
            }, 300);
        };

        function checkSalesModel_() {
          // Only CPM sales model come with 1st & 2nd clicks to landing.
          if (extraOptions.cpm === false) {
            totalCtaClicked_ = 2;

            let ctaContainers = document.getElementsByClassName('top-vidcta-container');
            for (let i = 0; i < ctaContainers.length; i++) {
              ctaContainers[i].classList.remove('full-video-height');
            }

          }
        }

        function clickOnCTA_() {
          if (totalCtaClicked_ >= 2) {
            let ctaContainers = document.getElementsByClassName('top-vidcta-container');
            for (let i = 0; i < ctaContainers.length; i++) {
                ctaContainers[i].classList.remove('full-video-height');
            }
          }

          innityAppsTriggerClicktagHandler(extraOptions.urls);
          totalCtaClicked_++;
        }

        /**
         * This is a workaround to query HTML elements after they had append into DOM.
         */
        function queryRequiredElements() {
            playButtonWrapperEl = document.getElementById('play_btn_when_paused_'+videoID);

            soundBtnEl = document.getElementById('btn_sound_'+videoID);
            controllersEl = document.getElementById('controllers_'+videoID);
            if(extraOptions.hideFullscreenIcon === false) {
                fsBtnEl = document.getElementById('btn_fs_'+videoID);
            }

            videoWrapperEl.addEventListener('click', controlLayerClicked, false);
            videoWrapperEl.addEventListener('mouseenter', showController, false);
            videoWrapperEl.addEventListener('mouseleave', hideController, false);
        };

				function videoSoundCheck(){
						var btnSound = document.getElementById('btn_sound_'+videoID);
						if(btnSound === null) {
							return;
						}
						if(videohasAudio(mutedVideoEl)) {
							videoSoundChange();
							if(videoHasSound === false) {
								btnSound.classList.remove("video-no-sound");
								mutedVideoEl.addEventListener('volumechange', videoSoundChange, false);
							}
							videoHasSound = true;
						} else {
							btnSound.classList.add("is-muted");
							btnSound.classList.add("video-no-sound");
							videoHasSound = false;
						}
				};
    };

    /**
     * Performance tracker to record down video click to play & video loaded.
     * @argument {VideoElement} videoEl
     */
    function PerformanceTracker(videoEl) {
        this.fireClickToPlay = fireClickToPlay;
        this.openfs = openfs;
        this.closefs = closefs;

        var trackingVideoID = '';
        var isClicked = false;

        initClass();

        function initClass() {
            if (typeof(videoEl) === 'undefined' || videoEl === null) {
                return;
            }

            var videoID = mutedVideoEl.id;
            trackingVideoID = '_' + videoID[0].toUpperCase() + videoID.substr(1);

            bindVideoEvent();
        };

        function bindVideoEvent() {
            videoEl.addEventListener('loadeddata', fireLoaded, false);
        };

        function fireLoaded() {
            InnityHTMLAd.track(trackingVideoID + '_AutoLoaded');
        };
        function fireClickToPlay() {
            if (isClicked === true) {
                return;
            }

            InnityHTMLAd.track(trackingVideoID + '_ClickAutoToPlay');
            isClicked = true;
        };
        function openfs() {
            if(extraOptions.tracking === true) {
                InnityHTMLAd.track(trackingVideoID + "_OpenFullscreen");
            }
        };
        function closefs() {
            if(extraOptions.tracking === true) {
                InnityHTMLAd.track(trackingVideoID + "_CloseFullscreen");
            }
        };
    };
};

function InnityAppsVideoPreview(containerID, videoID, options, videoScreenCapImgSrc, canvasOptions, videouioptions) {
    this.currentTime = 0;
    this.duration = 0;

    // Class design to ease designer.
    this.noLoop = noLoop;
    this.noAutoplay = noAutoplay;
    this.remainPreviewAfterClick = remainPreviewAfterClick;
    this.setClickCallback = setClickCallback;
    this.startEngine = startEngine;
        this.setVideoEndedCallback = setVideoEndedCallback;
        this.setFullScreenCallback = setFullScreenCallback;

        this.playPreview = playPreview;
        this.pausePreview = pausePreview;
        this.restartPreview = restartPreview;
        this.startVideoPlay = startVideoPlay;
        this.getCurrentTime = getCurrentTime;
        this.getDuration = getDuration;
        this.getVideoElement = getVideoElement;
        this.getVersion = getVersion;

        // This is call by internal library only.
    this.initVideoPlayer = initVideoPlayer;
        this.addListener = addListener;

        // Modified on 4/4/2019.
    var version = '3.2.2';

        var extraOptions = mergeObject({webm: null, mp4: null, poster: null, onLoad: null, mpg: null, canvaswidth:'320', canvasheight:'180', tracking: true, autoplay: true, loop: true, hideMpgWhenHtmlPlayed: true, clickCallback: null, videoEndedCallback: null, autostart:true, automute:true, mouseoverSound:false, advertisementlabel:false, playstatectatext:"Learn More", adtext:"Advertisement",urls:'clickTAG',fullscreen:false, fullscreenCallBack: null, forceFallback:false}, options, 'extraOptions');
        var self = this;
        var videoPlayer;
        var videoUI = null;
        var canvasID = 'innityAppsVideoCanvas-'+videoID;
        var trackVideoID = videoID;
        var autoplaybrowser = false;
        platformDetectorWrapper();
        var mobileVideo = true;
        var requireHTMLVideo = false;
        var performanceTracker = null;
        var videoSvg = new generateVideoSVGIcon();
				var videoHasSound = false;

        var loadListeners = [];
        var playListeners = [];
        var pauseListeners = [];
        var endedListeners = [];
        var timeUpdateListeners = [];
        var timeUpdateInterval = null;

    var isPreviewPause = false;
    var bindVideoEvent;

    function initClass() {
        if (checkRequirement() === false) {
            errorLog('Class init fail.');
            return;
        }

                requireHTMLVideo = (extraOptions.mp4 === null || extraOptions.mp4 == "") ? false : true;
                extraOptions.tracking = requireHTMLVideo;
                if(!requireHTMLVideo) mobileVideo = true;

                performanceTracker = new PerformanceTracker(videoID);
                videoUI = new InnityAppsVideoUI(containerID, canvasID, videoID, extraOptions, videoScreenCapImgSrc, self);

                try {
                    // Force html add user agent for css usage
                    var doc = document.documentElement;
                    doc.setAttribute('data-useragent',  navigator.userAgent);
                    doc.setAttribute('data-platform', navigator.platform );
                }catch(error){}

    };
    function checkRequirement() {
        if (innityAppsMobileVideoElementGenerator === null) {
          errorLog('generateMaterial or innityAppsMaterialGenerator function didn\'t exist.');
          return false;
        }

                if (typeof(InnityHTMLAd) !== 'object') {
                    errorLog('InnityHTMLAd object from Advenue didn\'t exist.');
                                return false;
                }

                if(autoplaybrowser) {
                    mobileVideo = (autoplaybrowser.getOS() == 'ios' || autoplaybrowser.getOS() == 'android') ? true : false;
                    if(extraOptions.mpg === null) mobileVideo = false;
                } else {
                    errorLog('Browser detection function from Browser.js didn\'t exist.');
                    return false;
                }

                return true;
    };
    function initVideoPlayer() {
        videoPlayer = new jsmpeg(
            extraOptions.mpg,
            {
                canvas: document.getElementById(canvasID),
                loop: extraOptions.loop,
                seekable: true,
                onload: previewOnLoad,
                onfinished: previewEnded,
                autoplay: extraOptions.autoplay
            });
    };

    function platformDetectorWrapper() {
      if (typeof (Browser) === 'function') {
        autoplaybrowser = new Browser();
      } else if (typeof (MobilePlatform) === 'function') {
        autoplaybrowser = new MobilePlatform();
      } else if (typeof InnityAppsMobilePlatform === 'function') {
        autoplaybrowser = new InnityAppsMobilePlatform();
      }
    }

    function addListener(event, handler) {
        switch(event) {
            case 'load':
                loadListeners.push(handler);
                break;
            case 'play':
                playListeners.push(handler);
                break;
            case 'pause':
                pauseListeners.push(handler);
                break;
            case 'ended':
                endedListeners.push(handler);
                break;
            case 'timeupdate':
                timeUpdateListeners.push(handler);
                break;
            default:
                errorLog('Incorrect eventlistener. ['+event+']');
                break;
        }
    };
    function previewOnLoad() {
        performanceTracker.fireLoaded();

        self.duration = videoPlayer.duration;
        videoUI.videoIsReady();

        for (var i = 0; i < loadListeners.length; i++) {
            var curEventListener = loadListeners[i];
            if (typeof(curEventListener) === 'function') {
                curEventListener();
            }
        }

        if (extraOptions.autoplay === true) {
            previewPlayed();
        }
    };
    function previewPlayed() {
        if (timeUpdateInterval !== null) {
            return;
        }

        for (var i = 0; i < playListeners.length; i++) {
            var curEventListener = playListeners[i];
            if (typeof(curEventListener) === 'function') {
                curEventListener({type: 'play'});
            }
        }

        timeUpdateInterval = setInterval(preivewOnTimeUpdate, 163);
    };
    function previewPaused() {
        clearInterval(timeUpdateInterval);
        timeUpdateInterval = null;

        for (var i = 0; i < pauseListeners.length; i++) {
            var curEventListener = pauseListeners[i];
            if (typeof(curEventListener) === 'function') {
                curEventListener({type: 'pause'});
            }
        }
    };
    function previewEnded() {
        videoPlayer.currentTime = 0;

        if (extraOptions.loop !== true) {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }

        for (var i = 0; i < endedListeners.length; i++) {
            var curEventListener = endedListeners[i];
            if (typeof(curEventListener) === 'function') {
                curEventListener({type: 'ended'});
            }
        }
    };
    function preivewOnTimeUpdate() {
        self.currentTime = videoPlayer.currentTime;

        for (var i = 0; i < timeUpdateListeners.length; i++) {
            var curEventListener = timeUpdateListeners[i];
            if (typeof(curEventListener) === 'function') {
                curEventListener({type: 'timeupdate'});
            }
        }

        if (isPreviewPause === true) {
                if(videoUI)
                pausePreview();
        }
    };

    function noLoop() {
        extraOptions.loop = false;
    };
    function noAutoplay() {
        extraOptions.autoplay = false;
    };
    function remainPreviewAfterClick() {
        extraOptions.hideMpgWhenHtmlPlayed = false;
    };
    function setClickCallback(clickCallback) {
        extraOptions.clickCallback = clickCallback;
    };
        function setVideoEndedCallback(videoEndedCallback) {
              extraOptions.videoEndedCallback = videoEndedCallback;
        };
        function setFullScreenCallback(fullscreenCallBack){
                extraOptions.fullscreenCallBack = fullscreenCallBack;
        };
    function startEngine() {
        initClass();
    };

    function playPreview() {
        if(requireHTMLVideo && document.getElementById(videoID)) {
            if(Boolean(document.getElementById(videoID).played.length)) {
                if(autoplaybrowser.getOS() !== 'ios') {
                    document.getElementById(videoID).play();
                }
                return;
            }
        }
        if(mobileVideo == false) return;
        isPreviewPause = false;
        videoPlayer.play();
        previewPlayed();
    };
    function pausePreview() {
        if(requireHTMLVideo && document.getElementById(videoID)) {
            if(Boolean(document.getElementById(videoID).played.length)) {
                videoUI.pauseHTMLVideo();
                return;
            }
        }
        if(mobileVideo == false) return;
        isPreviewPause = true;
        videoPlayer.pause();
        previewPaused();
    };
    function restartPreview() {
        if(mobileVideo) videoPlayer.currentTime = 0;
        playPreview();
    };
    function startVideoPlay(){
        if(videoUI != null)
        videoUI.playHTMLVideo();
    };
    function getCurrentTime(){
        var c = 0; if(videoUI != null) c = Math.ceil(videoUI.currentTime());
        return c;
    };
    function getDuration(){
        var d = 0; if(videoUI != null) d = Math.ceil(videoUI.duration());
        return d;
    };

    function getVideoElement() {
        if(requireHTMLVideo) {
            return document.getElementById(videoID);
        }
    };

    function mergeObject(defaultObj, overrideObject, reference) {
        for (var attributeKey in overrideObject) {
            if (defaultObj.hasOwnProperty(attributeKey)) {
                defaultObj[attributeKey] = overrideObject[attributeKey];
            }
            else {
                console.warn('[Version '+version+'] Key ['+attributeKey+'] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    };

    function getVersion() {
        return version;
    };
    function errorLog(msg) {
        console.error('[Version '+version+'] '+msg);
    };

    function InnityAppsVideoUI(containerID, canvasID, videoID, options, videoScreenCapImgSrc, innityAppsVideoPreview) {
                this.playHTMLVideo = playHTMLVideo;
                this.pauseHTMLVideo = pauseHTMLVideo;
        this.videoIsReady = videoIsReady;
                this.currentTime = currentTimeHTMLVideo;
                this.duration = durationHTMLVideo;

        var customVideoID = '-'+videoID;

                var videoEl = [], videoMuted = options.automute;
                var vid,soundBtn,invisibleBtn,playBtn,
                        playerState,container,controllers,topctaBtn,txtRemain,
                        videoprogress_interval = null, videoStarted = false, videoFinished = true;

                var slidingIntv = null, allowHideController = false, mouseAvailable = (autoplaybrowser.getOS() == 'ios' || autoplaybrowser.getOS() == 'android') ? false : true;

                videoEl = [
                    {id: 'innityAppsLoadContainer'+customVideoID, cssClass:['preview-ui-container'], childs: [
                        {elType:'img', id:'innityAppsLoadBg'+customVideoID, cssClass:['backupimage'], attrs:{'src':videoScreenCapImgSrc}}
                    ]}
                ];

                if(mobileVideo) {
                    videoEl.push({id: canvasID, elType: 'canvas', cssClass:['preview-canvas'], cssStyle: {opacity: 0}, attrs:{width:options.canvaswidth, height:options.canvasheight}});
                }

                initClass();

        function initClass() {
                generateHTMLVideo();

            for (var i = 0; i < videoEl.length; i++) {
                innityAppsMobileVideoElementGenerator(videoEl[i], document.getElementById(containerID));
            }

            trackHTML5Video();
                        checkAutoplayCondition();
            bindVideoEvent = new bindPlayerControllerComponent();

            if(mobileVideo) {
                innityAppsVideoPreview.initVideoPlayer();
            }
            else {
                if (requireHTMLVideo) {
                    toggleHTML5VideoStatus("previewend");
                }
            }

        };

                function checkAutoplayCondition(){
                    if(options.autostart) {
                        options.automute = true;
                    }
                    videoMuted = options.automute;
                };

        function generateHTMLVideo() {
                var videoJSON = {id: videoID, elType: 'video', cssClass:['preview-video'], attrs: {preload: 'metadata', poster:videoScreenCapImgSrc, controlsList: 'nodownload', playsinline:''}, cssStyle: {opacity:'0'}, childs:[]};
                if(options.mp4 != null) {
                    var _mp4El = {elType: 'source', attrs: {src: options.mp4, type: 'video/mp4'}};
                    videoJSON.childs.push(_mp4El);
                };
                if(options.webm != null) {
                    var _webmEl = {elType: 'source', attrs: {src: options.webm, type: 'video/webm'}};
                    videoJSON.childs.push(_webmEl);
                };
                // Player Status
                var playerstateEl = {id:'playerstate_'+videoID, cssClass:['status-container','preload-state','pause-preloader-animation'], childs:[
                        {id:'btn_invisible_'+videoID, cssClass:['invisible-tap-area']},
                        {cssClass:['btn-wrapper'],childs:[
                            {id:'btn_player_'+videoID, cssClass:['video-round-btn'], innerHTML:(function(){return videoSvg.midcircle() + videoSvg.fullstatus()})()}
                        ]}
                    ]};
                    // topCTA
                var topctaEl = {id:'topcta_'+videoID, cssClass:['top-vidcta-container'], clickTag:options.urls, childs:[
                        {cssClass:['text-vidcta-wrapper'], childs:[
                            {elType:'span', cssClass:['cta-text'], innerHTML:options.playstatectatext},
                            {elType:'span', innerHTML:videoSvg.landing()},
                        ]}
                    ]};
                    // Controllers
                var controllerEl = {id:'controllers_'+videoID, cssClass:['controllers-container'], childs:[
                        {cssClass:['controls_wrapper','float-to-left'], childs:[
                            {id:'btn_sound_'+videoID, cssClass:['video-round-btn','audio'], cssStyle:{display:'block'}, innerHTML:videoSvg.audio()},
                            {id:'text_remain_'+videoID, cssClass:['player-time','hidden-player-icon'], clickTag:options.urls, innerHTML:'0:00'}
                        ]}
                    ]};
                    // ProgressBar
                var progressEl = {cssClass:['progress-container'], childs:[
                        {id:'progressbar_'+videoID, cssClass:['timebar'], cssStyle:{width:'0'}}
                    ]};
                    // Advertisement
                var adLabelEl = {cssClass:['advertisement-label-container'], clickTag:options.urls, childs:[
                    {elType:'span', cssClass:['advertisement'], innerHTML:options.adtext}
                ]};

                if(options.fullscreen) {
                    var _btnfs = {cssClass:['controls_wrapper','float-to-right','hidden-player-icon'], childs:[
                        {id:'btn_fs_'+videoID, cssClass:['video-round-btn','fs'], cssStyle:{display:'block'}, innerHTML:videoSvg.fullscreen()}
                    ]};
                    controllerEl.childs.push(_btnfs);
                }

                // Check if HTML Video is needed.
                if(requireHTMLVideo) {
                    videoEl.push(videoJSON, playerstateEl, controllerEl, topctaEl, adLabelEl);
                }
                else {
                    playerstateEl = {id:'playerstate_'+videoID, cssClass:['status-container','preload-state','no-mp4'], clickFunc:playHTMLVideo, childs:[
                        {id:'btn_invisible_'+videoID, cssClass:['invisible-tap-area']},
                        {cssClass:['btn-wrapper'],childs:[{id:'btn_player_'+videoID, cssClass:['video-round-btn'], innerHTML:videoSvg.nomp4()}]}
                    ]};
                    videoEl.push(playerstateEl, topctaEl);
                }
        };

        function playHTMLVideo() {
                if(requireHTMLVideo) {
                    if(mobileVideo){
                        if (options.hideMpgWhenHtmlPlayed === true) {
                                document.getElementById(canvasID).style.display = 'none';
                                innityAppsVideoPreview.pausePreview();

                                if(options.automute && !videoStarted) {
                                    toggleHTML5VideoAudio();
                                }
                        }
                    }

                    document.getElementById(videoID).style.opacity = '1';
                    document.getElementById(videoID).play();
                    document.getElementById('innityAppsLoadContainer'+customVideoID).style.display = 'none';
                    performanceTracker.fireClickToPlay();
                }

                if (!videoStarted && typeof(options.clickCallback) === 'function') {
                    options.clickCallback();
                }

                // Check on video has sound / no sound as video loaded did not load sound.
				setTimeout(videoSoundCheck, 100);

        };
        function pauseHTMLVideo() {
            if(requireHTMLVideo) {
                document.getElementById(videoID).pause();
            }
        };
        function currentTimeHTMLVideo() {
            if(requireHTMLVideo) {
                return document.getElementById(videoID).currentTime;
            } else {
                return videoPlayer.currentTime;
            }
        };
        function durationHTMLVideo() {
            if(requireHTMLVideo) {
                return document.getElementById(videoID).duration;
            } else {
                return videoPlayer.duration;
            }
        };

        function videoIsReady() {
            document.getElementById(canvasID).style.opacity = 1;
            document.getElementById('innityAppsLoadContainer'+customVideoID).style.display = 'none';

            if(requireHTMLVideo) {
                innityAppsVideoPreview.addListener("play", function(){
                        if(!videoStarted) {
                            toggleHTML5VideoStatus("nosound");
                            playerState.classList.remove("pause-preloader-animation");
                        }
                });
                innityAppsVideoPreview.addListener("pause", function(){
                        if(!videoStarted) {
                            playerState.classList.add("pause-preloader-animation");
                        }
                });
                innityAppsVideoPreview.addListener("ended", function(){
                        if(!videoStarted) {
                            toggleHTML5VideoStatus("previewend");
                        }
                });
            }
            else {
                playerState.classList.remove("preload-state");
                playerState.classList.add("playing-state");
            }
        };

        function trackHTML5Video() {
            if (options.tracking === true) {
                InnityHTMLAd.attachVideo(document.getElementById(videoID));
                trackVideoID = "_Video" + InnityHTMLAd.vids.length;
            }
        };

        function toggleHTML5VideoStatus(_status){

            var cur = _status + "-state";
            var classtype = ["preload-state","nosound-state","previewend-state","playing-state","paused-state","ended-state"];
            classtype.splice(classtype.indexOf(cur), 1);

            classtype.forEach(function(i){
                playerState.classList.remove(i);
                controllers.classList.remove(i);
            })

            playerState.classList.add(cur);
            controllers.classList.add(cur);
        };

        function toggleHTML5VideoAudio(e){
            if(typeof e !== 'undefined') {
                e.stopPropagation();
                if(e.type == "mouseover" || e.type == "mouseout"){
                    if(videoMuted == false) return;
                }
            }
            if(vid.muted) {
                vid.muted = false;
                videoMuted = false;
            } else {
                vid.muted = true;
            }
        };

        function toggleHTML5VideoPlay(e){
            if(vid.paused) {
                playHTMLVideo();
            } else {
                pauseHTMLVideo();
            }
        };

        function videohasAudio(_video) {
            return Boolean(_video.mozHasAudio) ||
            Boolean(_video.audioTracks && _video.audioTracks.length) ||
            (function(){
                if(_video.webkitAudioDecodedByteCount) {
                    if(_video.webkitAudioDecodedByteCount > 66) { return true; }
                }
                return false;
            })();
        };

        function videoSoundCheck(){
            var vid = document.getElementById(videoID),
                soundBtn = document.getElementById("btn_sound_"+videoID);

            if(videohasAudio(vid)) {
                    if(vid.muted){
                        soundBtn.classList.add("is-muted");
                    }
                    soundBtn.classList.remove('video-no-sound');
                    if(videoHasSound === false) {
                        vid.addEventListener("volumechange", bindVideoEvent.videoStatus, false);
                        soundBtn.addEventListener("click", toggleHTML5VideoAudio, false);
                    }
                    videoHasSound = true;
            } else {
                    soundBtn.classList.add('is-muted');
                    soundBtn.classList.add('video-no-sound');
                    videoHasSound = false;
            }
        };

        function convert_toMMSS(secs) {
            var sec_num = Math.ceil(secs, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (minutes < 10) {minutes = ""+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = minutes+':'+seconds;
            return time;
        };

        function bindPlayerControllerComponent(){
                // For No MP4
                container     = document.getElementById(containerID);
                playerState   = document.getElementById("playerstate_"+videoID);

                this.videoStatus = videoStatus;

                if (requireHTMLVideo === false) {
                        return;
                }

                vid			      = document.getElementById(videoID);
                soundBtn      = document.getElementById("btn_sound_"+videoID);
                invisibleBtn  = document.getElementById("btn_invisible_"+videoID);
                playBtn       = document.getElementById("btn_player_"+videoID);
                controllers   = document.getElementById("controllers_"+videoID);
                topctaBtn   	= document.getElementById("topcta_"+videoID);
                txtRemain     = document.getElementById("text_remain_"+videoID);

                vid.addEventListener("play", videoStatus, false);
                vid.addEventListener("pause", videoStatus, false);
                vid.addEventListener("timeupdate", videoStatus, false);
                vid.addEventListener("ended", videoStatus,  false);
                vid.setAttribute('playsinline', '');

                if(videoMuted){vid.muted = true;}
                if(options.autostart && mobileVideo == false){toggleHTML5VideoPlay();}
                if(options.advertisementlabel == false){container.classList.add("no-ad-label");}

                invisibleBtn.addEventListener("click", function(e){
                    e.stopPropagation();
                    if(videoStarted) {
                        InnityHTMLAd.click({clickTAG:options.urls});
                    }
                    if(!vid.paused || !videoStarted) {
                        toggleHTML5VideoPlay();
                    }
                }, false);

                playBtn.addEventListener("click", function(e){
                    e.stopPropagation();
                    toggleHTML5VideoPlay();
                }, false);

                if(mouseAvailable) {
                    container.addEventListener("mouseenter", showController, false);
                    container.addEventListener("mouseleave", hideController, false);
                }

                function showController(e){
                    clearTimeout(slidingIntv);
                    controllers.style.display = "block";
                    slidingIntv = setTimeout(function(){
                        controllers.classList.add('show-controller');
                        topctaBtn.classList.add('show-controller');
                    }, 300);
                    //if(options.mouseoverSound) {toggleHTML5VideoAudio();}
                };

                function hideController(e){
                    if(allowHideController) {
                        clearTimeout(slidingIntv);
                        controllers.classList.remove('show-controller');
                        topctaBtn.classList.remove('show-controller');
                        slidingIntv = setTimeout(function(){
                            controllers.style.display = "none";
                        }, 300);
                    }
                };

                if(options.fullscreen) {
                    var isFSMode = false;
                    var expandFullScreenBtn = document.getElementById("btn_fs_"+videoID);
                    var fsEl = "undefined";
                    var fsEvent = "fullscreenchange";
                    var track = {
                        openfs: (options.tracking === true) ? function(){InnityHTMLAd.track(trackVideoID + "_OpenFullscreen");} : function(){return;},
                        closefs: (options.tracking === true) ? function(){InnityHTMLAd.track(trackVideoID + "_CloseFullscreen");} : function(){return;}
                    };

                    var getPrefix = function() {
                        this.dom = dom;
                        this.lowercase = lowercase;
                        this.css = css;
                        this.js = js;
                        var _styles,_pre,_dom,throwerror=false;
                        try{
                            _styles = window.getComputedStyle(document.documentElement, '');
                            _pre = (Array.prototype.slice
                                .call(_styles)
                                .join('')
                                .match(/-(moz|webkit|ms)-/) || (_styles.OLink === '' && ['', 'o'])
                            )[1];
                        } catch(e){
                            throwerror = true;
                        }
                        _dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + _pre + ')', 'i'))[1];
                        if( navigator.userAgent === "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0") {
                            _dom = '';
                        };
                        function dom() {return _dom;}
                        function lowercase() {var l = (_dom == '' || throwerror == true)  ? '' : _pre; return l;}
                        function css() {var c = (_dom == '' || throwerror == true)  ? '' : '-' + _pre + '-'; return c;}
                        function js() {var j = (_dom == '' || throwerror == true) ? '' : _pre[0].toUpperCase() + _pre.substr(1); return j;}
                    };

                    try{
                        var prefix = new getPrefix(), list = ["webkit","moz","ms","o"];
                        if(list.indexOf(prefix.lowercase())> -1) {
                            if(prefix.lowercase() == "ms") { fsEvent = "MSFullscreenChange"; }
                            else { fsEvent = prefix.lowercase() + fsEvent; }
                        }
                    }catch(error){}

                    document.addEventListener(fsEvent, function(e) {
                        var state = document.fullscreenElement  || document.mozFullScreenElement  || document.webkitFullscreenElement || document.msFullscreenElement;
                        if(!state){isFSMode = false;} else {fsEl = state;}
                        resizeFullScreenHandler(Boolean(state));
                    });

                    var resizeFullScreenHandler = function(val) {
                        if(val){
                            expandFullScreenBtn.classList.add("exit-fs");
                            vid.controls = 'controls';
                            if(typeof(options.fullscreenCallBack) === 'function') {
                                options.fullscreenCallBack("openFS");
                            }
                            if(fsEl !== "undefined" && fsEl.id == videoID && fsEl.nodeName.toLowerCase() == "video") {
                                track.openfs();
                            }
                        }
                        else {
                            expandFullScreenBtn.classList.remove("exit-fs");
                            if(vid.controls = 'controls') vid.controls = "";
                            if(typeof(options.fullscreenCallBack) === 'function') {
                                options.fullscreenCallBack("closeFS");
                            }
                            if(fsEl !== "undefined" && fsEl.id == videoID && fsEl.nodeName.toLowerCase() == "video") {
                                track.closefs();
                            }
                        }
                    };

                    var setFullScreenHandler = function(elem) {
                        if (autoplaybrowser.getOS() == 'ios') {
                            // Toggle fullscreen in Safari for iPad
                            try{
                                vid.webkitEnterFullScreen();
                            } catch(e){}
                        } else {
                            if (!elem.fullscreenElement &&    // alternative standard method
                                !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement ) { //current working methods
                                var requestFullScreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
																if(requestFullScreen == elem.msRequestFullscreen) {
																		vid.controls = 'controls';
																}
                                requestFullScreen.call(elem);
                            }
                            isFSMode = true;
                        }
                    };

                    var exitFullScreenHandler = function(){
                        var exitFullScreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
                        exitFullScreen.call(document);
                        isFSMode = false;
                    };

                    var toggleFSExpand = function(e){
                        if(!isFSMode) {
                            setFullScreenHandler(document.getElementById(videoID));
                        }
                        else {
                            exitFullScreenHandler();
                        }
                        e.stopPropagation();
                    };

                    expandFullScreenBtn.addEventListener("click", toggleFSExpand, false);
                    if (autoplaybrowser.getOS() == 'ios') {
                        function enterIOSfs(){isFSMode = true;track.openfs();if(typeof(options.fullscreenCallBack) === 'function') {options.fullscreenCallBack("openFS");}};
                        function exitIOSfs(){isFSMode = false;track.closefs();if(typeof(options.fullscreenCallBack) === 'function') {options.fullscreenCallBack("closeFS");}};
                        vid.addEventListener("webkitbeginfullscreen",enterIOSfs, false);
                        vid.addEventListener("webkitendfullscreen", exitIOSfs, false);
                    }
                }

                function videoStatus(e) {
                    switch(e.type){
                        case "play":
                            videoStarted = true;
                            if(videoFinished) {
                                videoFinished = false;
                                videoprogress_interval = setInterval(video_progressUpdate, 50);
                            }
                            soundBtn.style.display = "block";
                            controllers.style.display = "block";
                            toggleHTML5VideoStatus("playing");
                            controllers.classList.add('show-controller');
                            topctaBtn.classList.add('show-controller');
                            allowHideController = true;
                            if(mobileVideo) {
                                setTimeout(hideController, 1000);
                            }
														//Check on video has sound / no sound as video loaded did not load sound.
														videoSoundCheck();
                            break;
                        case "pause":
                            if(autoplaybrowser.getOS() == 'ios') {
                                if(vid.controls = 'controls') vid.controls = "";
                            }
                            toggleHTML5VideoStatus("paused");
                            showController();
                            allowHideController = false;
														//Check on video has sound / no sound as video loaded did not load sound.
														videoSoundCheck();
                            break;
                        case "volumechange":
                            if(vid.muted){
                                soundBtn.classList.add("is-muted");
                            } else {
                                soundBtn.classList.remove("is-muted");
                            }
                            break;
                        case "timeupdate":
                            break;
                        case "ended":
                            videoFinished = true;
                            clearInterval(videoprogress_interval);
                            if(!this.paused) pauseHTMLVideo();
                            setTimeout(function(){toggleHTML5VideoStatus("ended")}, 50);

                            if(typeof(options.videoEndedCallback) === 'function') {
                                setTimeout(options.videoEndedCallback, 100);
                            }

                            if(options.fullscreen) {
                                if(isFSMode && typeof(exitFullScreenHandler) === 'function') {
                                    exitFullScreenHandler();
                                }
                            }

                            showController();
                            allowHideController = false;

                            break;
                    }
                };

                function video_progressUpdate(){
                    var value = (100 / vid.duration) * vid.currentTime;
                    txtRemain.innerHTML = "" + convert_toMMSS(Math.ceil(vid.currentTime));
                };

        };
    };

    /**
     * Performance tracker to record down video click to play & video loaded.
     * @argument {string} videoID
     */
    function PerformanceTracker(videoID) {
        this.fireLoaded = fireLoaded;
        this.fireClickToPlay = fireClickToPlay;

        var trackingVideoID = '';
        var isClicked = false;

        initClass();

        function initClass() {
            trackingVideoID = '_' + videoID[0].toUpperCase() + videoID.substr(1);
        };

        function fireLoaded() {
            InnityHTMLAd.track(trackingVideoID + '_PreviewLoaded');
        };
        function fireClickToPlay() {
            if (isClicked === true) {
                return;
            }

            InnityHTMLAd.track(trackingVideoID + '_ClickPreviewToPlay');
            isClicked = true;
        };
    };
};

/**
 * Variable to store the generateMaterial or innityAppsMaterialGenerator
 * function reference.
 * @type function
 */
var innityAppsMobileVideoElementGenerator = null;

/**
 * This function help to convert functions that are different from development
 * version to use same variable.
 */
function innityAppsMobileVideoFallbackHelper() {
  if (typeof generateMaterial === 'function') {
    innityAppsMobileVideoElementGenerator = generateMaterial
  } else if (typeof innityAppsMaterialGenerator === 'function') {
    innityAppsMobileVideoElementGenerator = innityAppsMaterialGenerator;
  }
}

/**
 * This function help to convert clicktag trigger function that are different
 * from development version.
 */
function innityAppsTriggerClicktagHandler(clicktag) {
  if (typeof triggerClickTag === 'function') {
    triggerClickTag(clicktag);
    return;
  }

  if (typeof innityAppsTriggerClickTag === 'function') {
    innityAppsTriggerClickTag(clicktag);
    return;
  }

  if (InnityHTMLAd !== null && InnityHTMLAd !== undefined) {
    if (typeof InnityHTMLAd.click === 'function') {
      InnityHTMLAd.click({clickTAG: clicktag});
    }
  }
}
