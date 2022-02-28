const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["24156.svg","9965.png","digital-paper-g6298e2fa2_1920.jpg","digital-paper.jpg","favicon.png"]),
	_: {
		mime: {".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg"},
		entry: {"file":"start-73e16791.js","js":["start-73e16791.js","chunks/vendor-c359f3f4.js"],"css":["assets/vendor-327fceeb.css"]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			}
		]
	}
});
