// JavaScript Document
//构造函数模式用于定义每一个实例对象自己的独有的属性
var EventFunction=(function(window){
		
		//只是（声明了一个函数，同时预解析，但是并没有调用它，也就没有执行里面的代码片段啊）
		function EventFunction(){
	
			
			
		};
		
		var EventUtil={
			
			constructor:EventFunction,
			
			//添加事件处理程序
			addHandler:function(element, type, handler){
				var _this=this;
				//DOM
				if(element.addEventListener){
					element.addEventListener(type, handler, false);	
					//IE
				}else if(element.attachEvent){
					element.attachEvent('on'+type, handler);	
				}else{
					//其他
					element['on'+type]=handler;	
				}
			},
			//获取事件对象
			getEvent:function(event){
							//DOM	//IE
				return event?event:window.event;	
			},
			//获取事件目标
			getTarget:function(event){
											//DOM										//IE
				return this.getEvent(event).target || this.getEvent(event).srcElement;	
			},
			//取消默认行为
			preventDefault:function(event){
				//DOM
				if(this.getEvent(event).preventDefault){
					
					this.getEvent(event).preventDefault();	
					
				}else{
					//IE
					this.getEvent(event).returnValue=false;	
				}	
			},
			//删除事件处理程序
			removeHandler:function(element, type, handler){
				//DOM
				if(element.removeEventListener){
					element.removeEventListener(type, handler, false);	
				}else if(element.detachEvent){
					//IE
					element.detachEvent('on'+type, handler);	
				}else{
					element['on'+type]=null;	
				}
			},
			//取消冒泡
			stopPropagation:function(event){
				//DOM
				if(this.getEvent(event).stopPropagation){
					this.getEvent(event).stopPropagation();	
				}else{
					//IE
					this.getEvent(event).cancelBubble=true;	
				}
			},
			//获取向左滚动距离
			scrollLeft:function(){
						//IE							//dom
				return 	document.body.scrollLeft || document.documentElement.scrollLeft;
			},
			//获取向上滚动距离
			scrollTop:function(){
				return 	document.body.scrollTop || document.documentElement.scrollTop;
			},
			//获取可视区坐标位置
			getClientX:function(event){
		
				return this.getEvent(event).clientX;
			},
			getClientY:function(event){
				return this.getEvent(event).clientY;
			},
			//获取页面坐标位置
			getPageX:function(event){
				return 	this.getClientX(event)+this.scrollLeft();
			},
			getPageY:function(event){
				return 	this.getClientY(event)+this.scrollTop();
			},
			//获取屏幕坐标位置
			getScreenX:function(event){
				return this.getEvent(event).screenX;
			},
			getScreenY:function(event){
				return this.getEvent(event).screenY;
			},
			
			//取得相关元素
			getRelatedTarget:function(event){
				//DOM
				if(this.getEvent(event).relatedTarget){
					return this.getEvent(event).relatedTarget;	
					//IE
				}else if(this.getEvent(event).toElement){
					return this.getEvent(event).toElement;
				}else if(this.getEvent(event).fromElement){
					return this.getEvent(event).fromElement;	
				}else{
					return null;	
				}
			},
			
			//取得鼠标滚轮增量值(即判断鼠标滚轮滚动的方向)
			getWheelDelta:function(event){
				
				if(this.getEvent(event).wheelDelta){
					return (client.engine.opera && client.engine.opera < 9.5 ? -this.getEvent(event).wheelDelta : this.getEvent(event).wheelDelta);	
				}else{
					//ff
					return -this.getEvent(event).detail*40;	
				}	
			},
			
			//获取字符编码
			getCharCode: function(event){
				return typeof this.getEvent(event).charCode == 'number'?this.getEvent(event).charCode:this.getEvent(event).keyCode;	
			},
			
			//从剪切板中获取数据
			getClipboardText: function(event){
				
				var clipboardData=(this.getEvent(event).clipboardData || window.clipboardData);
				
				return clipboardData.getData('text');
			},
			
			//设置剪切板中的数据
			setClipboardText: function(event, value){
				
				if(event.clipboardData){
					
					return this.getEvent(event).clipboardData.setData('text/plain', value);	
					
				}else if(window.clipboardData){
					
					return window.clipboardData.setData('text', value);	
					
				}	
			}
			
		};
		
		//原型模式用于定义共享的方法和共享的属性
		EventFunction.prototype=EventUtil;
		
		return EventFunction;
		
})(window);
		