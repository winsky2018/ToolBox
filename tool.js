/** 
 *
 *功能： 返回数据类型
 */
function type(target) {

	var ret = typeof (target);
	var template = {
		"[object Object]": "object",
		"[object Array]": "array",
		"[object Number]": "number _ object",
		"[object Boolean]": "boolean _ object",
		"[object String]": "string _ object"
	}
	if (target === null) {
		return "null";
	}
	if (ret == "object") {
		var str = Object.prototype.toString.call(target);
		return template[str];
	} else {
		return ret;
	}

}

//返回字符串的字节长度

function retBytes(str) {
	var num = str.length;
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 255) {
			num++;
		}
	}
	return num;
}

//字符串str由[a-z]26个字母组成，求第一个只出现一次的字母
function onePice(str) {
	var arr = str.split('');
	var num = 0;
	var len = arr.length;
	var arr1 = [];
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < len; j++) {
			if (arr[i] === arr[j]) {
				num++;
			}
		}
		if (num === 1) {
			arr1.push(arr[i]);
		}
		num = 0;
	}
	if (arr1 == 0) {
		return 'none';
	} else {
		return arr1[0];
	}
}
//数组push模拟
Array.prototype.push1 = function () {
	for (var i = 0; i < arguments.length; i++) {
		this[this.length] = arguments[i];
	}
	return this.length;
}

//数组pop模拟
Array.prototype.pop1 = function () {
	var num = this[this.length - 1];
	this.length--;
	return num;
}

//模拟unshift方法
Array.prototype.unshift1 = function () {
	var arr1 = arguments;
	var len = this.length;
	for (var i = 0; i < len; i++) {
		arr1[length] = this[i];
	}
	return arr1.length;
}

//模拟shift方法
Array.prototype.shift1 = function () {
	var num = this[0];
	for (var i = 0; i < this.length; i++) {
		this[i] = this[i + 1];
	}
	this.length--;
	return num;
}

//模拟reverse方法
Array.prototype.reverse1 = function () {
	var arr1 = [];
	for (var i = this.length - 1; i >= 0; i--) {
		arr1[arr1.length] = this[i];
	}
	for (var j = 0; j < arr1.length; j++) {
		this[j] = arr1[j];
	}
	return this;
}

//模拟reduce方法
Array.prototype.newReduce = function (fn, init){
	var len = this.length;
	var pre = init;
	var i = 0;
	if(init === undefined){
		pre = this[0];
		i = 1;
	}
	for(; i < len; i++){
	   pre = fn(pre, this[i], i);
	}
	return pre;
}

//字符串去重
function strUnique(str) {
	var arr = str.split("");
	var arr1 = [];
	var len = arr.length;
	var obj = {};
	for (var i = 0; i < len; i++) {
		if (!obj[arr[i]]) {
			obj[arr[i]] = "abc";
			arr1.push(arr[i]);
		}
	}
	return arr1.join("");
}

//原生sort
Array.prototype.newSort = function (){
	var len = this.length,
		arr = [],
		temp;
	for(var i = 0; i < len; i++){
		for(var j = i; j < len; j++){
			if(this[i] > this[j]){
				temp = this[i];
				this[i] = this[j];
				this[j] = temp;
			}else{
				continue;
			}
		}
		arr[arr.length] = this[i];
	}

	return arr;
	
}

//数组快速排序

function quickSort(arr){
	var len = arr.length;
	//出口
	if(len <= 1){
		return arr;
	}
	//基底角标
	var targetIndex = Math.floor(len / 2);
	//基底
	var target = arr.splice(targetIndex, 1)[0];
	var left = [],
		right = [];

	//因为原数组已经改变，在每次循环中len都要减1
	for(var i = 0; i < len - 1; i++){
		if(arr[i] < target){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	
	//递归
	return quickSort(left).concat(target, quickSort(right));
}

// 归并排序

//meger期待传入的两个数组是有序的数组
function meger(leftArr, rightArr){
	var resultArr = [];
	while(leftArr.length && rightArr.length){
		leftArr[0] > rightArr[0] ? resultArr.push(rightArr.shift()) : resultArr.push(leftArr.shift());
	}

	return [].concat(resultArr, leftArr, rightArr);
}

//megerSort会将传入的数组一分为二，直至数组的长度为1，然后调用meger开始向上回溯。
function megerSort(arr){
	if(arr.length == 1){
		return arr;
	}
	var midIndex = Math.floor(arr.length / 2),
		leftArr = arr.slice(0, midIndex),
		rightArr = arr.slice(midIndex);

	return meger(megerSort(leftArr), megerSort(rightArr));

}

/**
 *
 * 功能：数组去重，在数组的原型链上编程
 *
 * 分析：
 * var arr = [1,1,1,1,2,2,2,2,2];
 * var obj = {
 * 			1 : "abc",
 * 			2 : "abc"
 * }
 * obj[1]	---->	undefined
 * obj[1]	---->	'abc'
 * obj[2]	---->	undefined
 *
 * 思路：定义一个空对象，和一个空数组。利用for循环遍历数组，将每一位取出来。判断
 * 在对象中有没有值，如果为undefined就把它当作对象属性名赋一个值给它。并把它push到
 * 预先定义好的数组中。如果不为空，继续循环。
 */

Array.prototype.unique = function () {
	var temp = {},
		arr = [],
		len = this.length;
	for (var i = 0; i < len; i++) {
		if (!temp[this[i]]) {
			temp[this[i]] = 'abc';
			arr.push(this[i]);
		}
	}
	return arr;
}

//封装一个insertAfter方法，类似于insertBefore,在原型链上编程。
Element.prototype.insertAfter = function (target, origin) {
	var afterNode = origin.nextElementSibling;

	if (afterNode == null) {
		this.appendChild(target);
	} else if (afterNode) {
		this.insertBefore(target, afterNode)
	} else {
		for (origin = origin.nextSibling; origin && origin.nodeType != 1; origin = origin.nextSibling);
		this.insertBefore(target, origin);
	}
	return target;
}

//封装一个方法，将目标节点内的元素节点逆序。在原型链上编程。
Element.prototype.reverse = function () {
	var elemNodes = this.children;
	var len = elemNodes.length;
	for (var i = len - 2; i >= 0; i--) {
		this.appendChild(elemNodes[i]);
	}
}

//深度克隆
function deepClone(target, origin) {
	var target = target || {};
	var toStr = Object.prototype.toString;
	for (var prop in origin) {
		//判断是否为自身属性
		if (origin.hasOwnProperty(prop)) {
			//判断是否为引用值,并且不能为空
			if (origin[prop] !== 'null' && typeof (origin[prop]) == 'object') {
				//判断是数组还是对象
				target[prop] = toStr.call(origin[prop]) == '[object Array]' ? [] : {};
				//递归
				deepClone(target[prop], origin[prop]);
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}


//圣杯模式

function inherit(target, origin) {
	var F = function () {};
	F.prototype = origin.prototype;
	target.prototype = new F();
	target.prototype.constructor = target;
	target.prototype.uber = origin;
}


//封装兼容性方法，求滚动条滚动距离
function getScrollOffset() {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

//模拟fixed定位
Element.prototype.fixed = function () {
	var self = this,
		offset,
		disX = this.offsetLeft,
		disY = this.offsetTop;
	window.onscroll = function () {
		offset = getScrollOffset();
		self.style.left = parseInt(disX) + offset.x + 'px';
		self.style.top = parseInt(disY) + offset.y + 'px';

	}
}

//封装兼容方法，求可视窗口尺寸
function getViewportOffset() {
	if (window.innerWidth) {
		return {
			x: window.innerWidth,
			y: window.innerHeight
		}
	} else {
		if (document.compatMode === "BackCompat") {
			return {
				x: document.body.clientWidth,
				y: document.body.clientHeight
			}
		} else {
			return {
				x: document.documentElement.clientWidth,
				y: document.documentElement.clientHeight
			}
		}
	}
}

//封装方法获取元素的样式

function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];
	} else {
		return elem.currentStyle[prop];
	}
}

//封装一个兼容性的绑定事件处理函数的方法
function addEvent(elem, type, handle) {
	if (elem.addEventListener) {
		elem.addEventListener(type, handle, false);
	} else if (elem.attachEvent) {
		elem.attachEvent("on" + type, function () {
			//改变this指向
			handle.call(elem);
		})
	} else {
		elem['on' + type] = handle;
	}
}

//封装一个解除事件处理函数

function removeEvent(elem, type, handler) {
	if (elem.removeEventListener) {
		elem.removeEventListener(type, handler, false)
	} else {
		elem.datachEvent("on" + type, handler);
	}
}

//封装取消冒泡的函数stopBubble(event);


function stopBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation();
	} else {
		event.cancleBubble = true;
	}
}


//封装阻止默认事件的函数cancleHandler(event)

function cancelHandler(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}


//拖拽运动函数

function drag(elem) {
	var disX,
		disY;
	addEvent(elem, 'mousedown', function (e) {
		var event = e || window.event;
		//判断是否为左键
		if (event.button == 0) {
			disX = event.clientX - parseInt(getStyle(elem, 'left'));
			disY = event.clientY - parseInt(getStyle(elem, 'top'));
			addEvent(document, 'mousemove', mouseMove);
			addEvent(document, 'mouseup', mouseUp);
			stopBubble(event);
			cancelHandler(event);
		}

	});

	function mouseMove(e) {
		var event = e || window.event;
		elem.style.left = event.clientX - disX + "px";
		elem.style.top = event.clientY - disY + "px";
	}

	function mouseUp(e) {
		var event = e || window.event;
		document.removeEventListener("mousemove", mouseMove, false);
		document.removeEventListener("mouseup", mouseUp, false);

	}


}


//多物体多值运动链式框架

function startMove(elem, json, callback) {
	clearInterval(elem.timer);
	var iSpeed,
		iCur;
	elem.timer = setInterval(function () {
		var bStop = true;

		for (var prop in json) {
			//判断属性
			if (prop == 'opacity') {
				iCur = parseFloat(getStyle(elem, prop)) * 100;
			} else {
				iCur = parseInt(getStyle(elem, prop));
			}
			//给速度赋值
			iSpeed = (json[prop] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//给传入的对象赋值
			if (prop == 'opacity') {
				elem.style.opacity = (iCur + iSpeed) / 100;
			} else {
				elem.style[prop] = iCur + iSpeed + 'px';
			}
			//判断当前状态是否等于目标值
			if (iCur != json[prop]) {
				bStop = false;
			}
		}
		//循环结束，关闭定时器，判断传入的回掉函数的类型。
		if (bStop) {
			clearInterval(elem.timer);
			typeof callback == 'function' ? callback() : '';
		}
	}, 30)
}

//异步加载JS
function asyncLoad(url, callBack) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	//判断script是否存在readyState属性，(IE独有)
	if (script.readyState) {
		//script触发onreadystatechange事件
		script.onreadystatechange = function () {
			//判断script的状态码是否为'complete'和'loaded'
			if (script.readyState == 'complete' || script.readyState == 'loaded') {
				script.onreadystatechange = null;
				callBack();
			}
		}
	} else {
		//Google Chrome  safari  firefox  opera
		script.onload = function () {
			callBack();
		}
	}
	//为了防止js加载完毕，才给script绑定事件的情况发生，将url的加载放在绑定事件之后。
	script.src = url;
	document.head.appendChild(script);
}
//调用方式1。
asyncLoad('test.js', function () {
	show()
});
//分析：为什么不用asyncLoad("test.js", show())的方式调用？？
//如果采用这种方法会报错，show is not defined因为在asyncLoad()函数执行之前，必须拿到show()执行的结果，
//然后再将show()执行结果作为参数，去执行asyncLoad()函数。总的来说就是show()执行会发生在asyncLoad()执行之前。
//调用方式2。asyncLoad('test.js', 'show');函数体内部将callBack()====>eval(callBack);
//调用方式3。asyncLoad('test.js', 'show')函数体内部将callBack()====>tools[callBack]，
//test.js中将callBack等方法写在var tools = {show : function(){}}对象中。




//模拟bind方法的函数封装
Function.prototype.newBind = function (target) {
	target = target || window;

	//this---->show
	var self = this;
	//声明一个空数组，并调用它的slice方法去截取arguments，从第1位开始截，最后返回给args
	var args = [].slice.call(arguments, 1);

	var temp = function () {};

	var F = function () {

		//show调用newBind这个方法，返回此函数，我们用一个变量newShow来接收，当我们调用newShow可能还会传
		//所以我们需要用一个数组把他存起来。

		var _args = [].slice.call(arguments, 0);

		//return show();执行后的返回值
		return self.apply(this instanceof temp ? this : target, args.concat(_args))
		//如果newShow被当作构造函数new newShow();通过instanceof判断是否继承自temp
	}

	//继承show的原型
	temp.prototype = this.prototype;
	F.prototype = new temp();
	return F;
}

//防抖函数封装，handler指代要防抖的函数，delay指代延迟时间

function debounce(handler, delay) {
	var timer = null;
	return function () {
		var _self = this,
			_arg = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			handler.apply(_self, _arg);
		}, delay);
	}

}

//节流
//常用场景： 窗口调整(resize)    页面滚动(scoll)     抢购疯狂点击(mousedown)

function throttle(handler, wait) {
	var lastTime = 0;
	return function (e) {
		var nowTime = new Date().getTime();
		if (nowTime - lastTime > wait) {
			handler.apply(this, arguments);
			lastTime = nowTime;
		}
	}
}

//模拟apply方法
Function.prototype.newApply = function (ctx, arr) {
	var ctx = ctx || window;
	ctx.fn = this;
	if (!arr) {
		var result = ctx.fn();
		delete ctx.fn;
		return result;
	} else {
		var args = [];
		for (var i = 0; i < arr.length; i++) {
			args.push('arr[' + i + ']');

		}
		var result = eval('ctx.fn(' + args.join(',') + ')');
		delete ctx.fn;
		return result;
	}
}

//封装一个newCall方法类似call,ctx指代让this指向的对象
Function.prototype.newCall = function () {
	var ctx = arguments[0] || Window;
	var args = [];
	ctx.fn = this;
	for (var i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']');
	}
	//args = ['arguments[1]', 'arguments[2]'].join(',')
	var result = eval('ctx.fn(' + args.join(',') + ')');

	delete ctx.fn;
	return result
}

//柯里化函数

function FixedParmasCurry(fn) {
	var _arg = [].slice.call(arguments, 1);
	return function () {
		var newArgs = _arg.concat([].slice.call(arguments, 0));
		return fn.apply(this, newArgs);
	}
}

function curry(fn, length) {
	//length 为参数的长度
	var length = length || fn.length;

	return function () {
		if (arguments.length < length) {
			var combined = [fn].concat([].slice.call(arguments, 0));
			//递归，并且需要传入length，因为FixedParmasCurry函数执行后return的是匿名函数
			return curry(FixedParmasCurry.apply(this, combined), length - arguments.length);
		} else {
			return fn.apply(this, arguments);
		}
	}
}

//数组扁平化函数

//方法一
Array.prototype.flatten = function () {
	var resArr = [],
		toStr = Object.prototype.toString;
	this.forEach(function (item) {
		//判断是否为数组，如果是就递归，因为我们不知道arr[i]是不是一维数组，所以不能直接concat
		toStr.call(item) == '[object Array]' ? resArr = resArr.concat(item.flatten()) : resArr.push(item)
	})

	return resArr;
}

//方法二
function flatten1(arr) {
	var arr = arr || [],
		toStr = Object.prototype.toString;
	return arr.reduce(function (prev, next) {
		return toStr.call == '[object Array]' ? prev.concat(flatten1(next)) : prev.concat(next);
	}, [])
}

//方法三  es6方法

const flatten2 = arr => arr.reduce((prev, next) => Object.prototype.toString.call(next) == '[object Array]' ? prev.concat(flatten2(next)) : prev.concat(next), [])


//ajax交互函数
function ajaxfun(method, url, data, callback, flag) {

	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHttp');
	}
	method = method.toUpperCase();
	if (method == 'GET') {
		xhr.open(method, url + '?' + data, flag);
		xhr.send();
	} else if (method == 'POST') {
		xhr.open(method, url, flag);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}


	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				callback(xhr.responseText);
			}
		}
	}
}

//cookie增、删、改、查链式调用

var manageCookie = {
	setCookie: function (name, value, time){
		document.cookie = name + '=' + value + ';max-age=' + time;
		return this;
	},
	removeCookie: function (name){
		this.setCookie(name, '', -1);
		return this;
	},
	//查看某个cookie时，不要使用正则匹配，因为name值和value值可能重叠。
	getCookie: function (name, callBack){
		//最好使用for循环，不要使用forEach,因为forEach需要把全部的cookie遍历一遍。
		var allCookie = document.cookie.split('; ');
		for(var i = 0; i < allCookie.length; i++){
			var temp = allCookie[i].split('=');
			if(temp[0] == name){
				callBack(temp[1]);
				return this;
			}
		}
		callBack(undefined);
		return this;
	}
}

//返回长度为n的随机数字字符串的函数,用于Hash和ID值

function Random(n){
	let max = 10 ** n;
	
	return function (){
		let str = "" + parseInt(Math.random() * max);

		//防止出现Math.random() = 0.0000534523423;
		let count = n - str.length;

		for(let i = 0; i < count; i++){
			str += "0";
		}

		return str;
	}
}

let random6 = Random(6);



//ES6-Class模拟实现



	//功能：检查构造函数是否通过new 操作符来实例化对象。
	function _classCallCheck(_this, _constructor) {
		if (!(_this instanceof _constructor)) {     //判断this 是否继承自　传入的constructor，如果使用new操作符this指代创建的实例，如果空执行则指代window
			throw "TypeError: Class constructor Plane cannot be invoked without 'new'"
		}
	}
	//功能：　判断是否在原型和构造器本身添加属性。如果有就进行下一步操作。
	function _createClass(_constructor, _protoProps, _staticProps){
		if( _protoProps ){

			_defineProperty(_constructor.prototype, _protoProps);   //如果原型属性存在，调用_defineProperty函数处理，传入构造器的原型，和需要添加的属性。
			
		}
		if( _staticProps ){

			_defineProperty(_constructor, _staticProps);        //如果静态属性存在，调用_defineProperty函数处理，传入构造器本身，和需要添加的属性。

		}
	}
	//功能：　接收传递过来的对象(原型和构造器本身)，和它们的属性集合props，使用Object.defineProperty来定义它们的属性。
	function _defineProperty(targetObj, props){

		props.forEach(function (item) {

			Object.defineProperty(targetObj, item.key, {
				value: item.value,
				writable: true,
				enumerable: false,      //ES6中通过Class定义的原型方法和静态方法不能枚举。
				configurable: true      //ES6中通过Class定义的原型方法和静态方法都可以通过delete　操作符删除。
			})
			
		})
		
	}
	//功能：　实现原型继承

	function _inherits(subClass, supClass){

		//判断传入的supClass是不是一个函数，并且不是null
		if(typeof supClass !== 'function' && supClass !== null){
			throw new TypeError("super expression must either be null or function")
		}

		subClass.prototype = Object.create(
											supClass || supClass.prototype,
											{
												constructor: {
													value: subClass,
													writable: true,
													configurable: true,
													enumerable: false
												}
											});
		
		var _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p }

		_setPrototypeOf(subClass.prototype, supClass.prototype)
		
	}

	// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝        

	var Plane = (function () {
		function Plane(name) {
			_classCallCheck(this, Plane);      //1.检测是否通过new操作符来实例化对象。

			this.name = name || '普通飞机';
			
			this.blood = 100;

			// return {
			//     sex: 'male'
			// }
			
		}

		_createClass(Plane, [           //这是原型属性
			{
				key: 'fly',
				value: function (){
					console.log('I can do it')
				}
			}
		], [            //这是静态属性
			{
				key: 'greeting',
				value: function (){
					console.log('Hello World')
				}
			}
		])

		return Plane;
		
	})()

	var p1 = new Plane('dkb的普通飞机')

	// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝


	var AttackPlane = (function (Plane){

		_inherits(AttackPlane, Plane);      //实现继承，　AttackPlane继承Plane

		function AttackPlane(name){

			_classCallCheck(this, AttackPlane)      //检查是否通过new操作符来实例化对象。

			var _this = this;
			var that = Plane.call(_this, name)      //接收Plane中的返回值,如果没有返回值就继承Plane的name属性。

			if( typeof that === 'object' && Object.prototype.toString.call(that).split('').slice(8,14).join('') === 'Object'){

				//如果that是一个对象
				_this = that;       //将该对象赋给实例
				
			}
			
			_this.logo = 'Sunny'                //
			
			return _this
			
		}

		_createClass(AttackPlane, [
			{
				key: 'dan',
				value: function (){
					console.log('biu~~~biu~~~biu~~~')
				}
			}
		], [
			{
				key: 'sayGoodBay',
				value: function (){
					console.log(`good bay my weak`)
				}
			}
		])

		return AttackPlane;
		
	})(Plane)


	var oAPlane = new AttackPlane('dkb的战斗机');


	
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

//ES6Map模拟实现


function MMP(){
    this.bucketLength = 8;
    this.init();
}

MMP.prototype.init = function (){
    //初始化 桶
    this.bucket = new Array(this.bucketLength)
    for(var i = 0; i < this.bucketLength; i++){
        this.bucket[i] = {
            type: 'bucket_' + i,
            next: null
        }
    }

}

MMP.prototype.makeHash = function (key){
    //key可能为：string  boolean  null  number  {}  []  NaN  function (){}
    var hash = 0;

    if(typeof key !== 'string'){

        if(typeof key === 'number'){

            hash = key + '' === 'NaN' ? 0 : key;           //number && NaN

        }else if(typeof key === 'object'){
            var toStr = Object.prototype.toString;
            if(toStr.call(key).split('').slice(8, -1).join("") === 'Array'){
                hash = 1
            }else{
                hash = 2
            }
        }else{
            hash = 3
        }
        
    }else{
        //string长度不确定，如： 'a'  'bcd'  'dfaphuidfu'
        //取前3位字符，把他们的ASCII码累加

        for(var i = 0; i < 3; i++){
            hash += key[i] ? key[i].charCodeAt(0) : 0
        }
    }


    return hash % 8;
    
}

MMP.prototype.set = function (key, value){

    var hash = this.makeHash(key),
        tempBucket = this.bucket[hash];

    while(tempBucket.next){

        if(tempBucket.next.key === key){    //如果桶里面有该属性，则覆盖该属性的值。
            tempBucket.next.value = value
            return;
        }

        tempBucket = tempBucket.next;       //如果桶里面没有该属性，并且tempBucket.next !== null。则不断循环。

    }

    tempBucket.next = {
        key: key,
        value: value,
        next: null
    }    

}

MMP.prototype.get = function (key){

    var hash = this.makeHash(key),
        tempBucket = this.bucket[hash];

    while(tempBucket.next){
        if(tempBucket.next.key === key){
            return tempBucket.next.value;
        }

        tempBucket = tempBucket.next;
        
    }

    

}

MMP.prototype.delete = function (key){
    var hash = this.makeHash(key),
        tempBucket = this.bucket[hash];

    while(tempBucket.next){
        if(tempBucket.next.key === key){
            tempBucket.next = tempBucket.next.next;
            return true;
        }
        tempBucket = tempBucket.next;

    }

    return false;
    
}

MMP.prototype.has = function (key){
    var hash = this.makeHash(key),
        tempBucket = this.bucket[hash];

    while(tempBucket.next){
        if(tempBucket.next.key === key){
            return true;
        }
        tempBucket = tempBucket.next;
    }
    return false;
}

MMP.prototype.clear = function (){
    this.init()
}

let m1 = new MMP();
let arr = [123]
let obj = {}

m1.set('name1', 'sunny')
m1.set('name2', 'winsky')
m1.set(arr, 123)
m1.set(666, 666)
m1.set(obj, 777)
m1.set(function (){}, '00000')

// =======================================================================================================================================

//Promise源码封装


class myPromise{
	constructor(fn){
		if(typeof fn !== 'function'){
			throw TypeError(`myPromise resolver ${fn} is not a function`)
		}

		this.status = 'pending'
		this.data = undefined

		let resolve = (data) => {
			if(this.status === 'pending'){
				this.data = data
				this.status = 'resolved'
			}
		}

		let reject = (data) => {
			if(this.status === 'pending'){
				this.data = data
				this.status = 'rejected'
			}
		}

		fn(resolve, reject)
	}

	//在原型上定义then方法
	then(resolveFn, rejectFn){
		if(this.status === 'resolved'){
			
			let res = resolveFn(this.data)

			//判断返回值是否为promise对象，如果是promise对象就返回它自身，否则返回一个成功的Promise对象
			if(res instanceof myPromise){
				return res
			}else{
				return myPromise.resolve(res)
			}
		}
		if(this.status === 'rejected'){

			let res = rejectFn(this.data)

			//判断返回值是否为promise对象，如果是promise对象就返回它自身，否则返回一个成功的Promise对象
			if(res instanceof myPromise){
				return res
			}else{
				return myPromise.resolve(res)
			}
		}

		
	}

	//定义静态成员resolve、reject

	static resolve(data=undefined){
		return new myPromise((resolve, reject) => resolve(data))
	}
	static reject(data=undefined){
		return new myPromise((resolve, reject) => reject(data))
	}

}