import React from 'react';
import Loading from '../Loading';

export default class IframeContent extends React.Component {

	static displayName = 'IframeContent';

	static defaultProps = {
		width:window.innerWidth,
		height:800,
		params:{}
	}

	static propTypes = {
		className: React.PropTypes.string,
		src:React.PropTypes.string,
		width: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		height: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		onClose:React.PropTypes.func,
		onLoad:React.PropTypes.func,
		params:React.PropTypes.object,
	}

	constructor(props){
		super(props);

		this.onClose = this.onClose.bind(this);
		this.onLoad = this.onLoad.bind(this);

		this.iframeElement = '';
		this.iframeWindow = '';

		this.state = {
			isLoading:false,
			src:this.props.src
		}
		this.isInit = false;

		this.createIframe = this.createIframe.bind(this);

		var _this = this;
		//	global.window = new Object();
		window.top.setReturnValue = function(data){
			_this.onClose(data);
		}
	}

	componentDidMount(){
		this.createIframe();
		this.initialParams(this.props.params);
	}

	//初始化变量
	initialParams = (params)=>{
			window.iframeRequestParams = params;
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.src) {

			let src = nextProps.src;
			let params = nextProps.params;

			this.setState({
				src
			},function(){
				this.createIframe();
				this.initialParams(params);
			});
		}
	}

	onClose(data){
		const {onClose} = this.props;
		onClose && onClose(data.data);
	}

	onLoad(){

		const _this = this;
		const {width,height,onLoad} = this.props;
		let iframeElement = this.iframeElement;

		iframeElement.width = width;
		iframeElement.height = height;
		_this.iframeWindow =  iframeElement.contentWindow;
			window.ele = _this.iframeWindow;

		onLoad && onLoad(iframeElement.contentWindow);

	}

	createIframe(){
			const _this = this;
			const {src} = this.state;

			var iframe = document.createElement("iframe");
			iframe.src = src;

			window.ifr = iframe;

			//	默认样式
			iframe.frameBorder = 0;
			iframe.width = 0;
			iframe.height = 0;

			this.iframeElement = iframe;

			if (iframe.attachEvent){
				iframe.attachEvent("onload", function(){
					this.document.domain = "krspace.cn";
					_this.onLoad();
				});
			} else {
				iframe.onload = function(){
					_this.onLoad();
				};
			}

			this.iframeWrap.innerHTML = '';
			this.iframeWrap.appendChild(iframe);
	}

	render() {

		let {className,children,src,width,height} = this.props;
		let {isLoading} = this.state;

		let styles = {
			height:height,
		}

		return (
			<div style={styles}>
				{isLoading && <Loading />}
				<div ref={(c)=>this.iframeWrap = c} ></div>
			</div>
		);
	}
}

// <iframe src={src} className="ui-iframe-content" ref={(c)=>this.iframeElement=c} width={width} height={height} frameBorder="0" />


/*


	renderIframWidth(iframe){

		function autoFitIframe(iframe) {
			var doc = iframe.contentDocument || iframe.contentWindow.document;
			// 设置iframe宽度
			iframe.style.width = '100%';

			function update() {
				var containerWidth = iframe.parentNode.offsetWidth;
				// 在iphone、ipad等移动浏览器中，为iframe设置width和height样式起不了作用
				// iframe的高宽由其内容决定，故设置iframe中body的宽度来限制iframe高宽
				doc.body.style.width =  + 'px';
				doc.body.style.padding = '0';
				doc.body.style.margin = '0';
				doc.body.style.border = 'none';

				// 自适应iframe高度，确保没有纵向滚动条
				// iphone、ipad等移动浏览会器忽略width/height自适应高度
				// NOTE: 没有支持Quirks mode

				// 确保scrollHeight是iframe所需的最小高度
				iframe.style.height = '0';
				iframe.style.height = Math.max(
					// 其他浏览器
					doc.body.scrollHeight,
					// IE7
					doc.documentElement.scrollHeight
				) + 'px';
			}
			if (doc.readyState === 'complete') {
				update();
			}

			if (iframe.addEventListener) {
				iframe.addEventListener('load', update, false);
			}
			else if (iframe.attachEvent) {
				iframe.attachEvent('onload', update);
			}
		};
	}

*/
