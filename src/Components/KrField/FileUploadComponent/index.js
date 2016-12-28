import React from 'react';
import Notify from '../../Notify';
import Promise from 'promise-polyfill';
import {
	Actions,
	Store
} from 'kr/Redux';


import WrapComponent from '../WrapComponent';

import './index.less';

export default class FileUploadComponent extends React.Component {

	static defaultProps = {
		multiple: true,
		defaultValue: []
	}

	static PropTypes = {
		multiple: React.PropTypes.bool,
		accept: React.PropTypes.string,
		defaultValue: React.PropTypes.array,
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.onTokenSuccess = this.onTokenSuccess.bind(this);
		this.onTokenError = this.onTokenError.bind(this);

		this.onSetInputValue = this.onSetInputValue.bind(this);
		this.setInitValue = this.setInitValue.bind(this);

		let {
			defaultValue
		} = this.props;

		this.state = {
			isInit: true,
			form: {},
			files: defaultValue,
			isUploading: false,
			progress: 0
		}

	}

	componentWillUnmount() {
		this.setState({
			files: []
		});
	}

	componentDidMount() {
		let {
			defaultValue
		} = this.props;
		console.log('---defaultValue', defaultValue);
	}


	componentWillReceiveProps(nextProps) {
		this.setInitValue(nextProps.defaultValue);
	}

	setInitValue(defaultValue) {
		let {
			files,
			isInit
		} = this.state;
		if (!isInit) {
			return;
		}
		if (!defaultValue.length) {
			return;
		}
		files = defaultValue;
		this.setState({
			files,
			isInit: false
		});

		var _this = this;
		window.setTimeout(function() {
			_this.onSetInputValue();
		}, 0);
	}

	onSetInputValue() {
		let {
			files
		} = this.state;
		let {
			input
		} = this.props;

		let fileIds = [];
		files.forEach(function(item, index) {
			fileIds.push(item.id);
		});
		input.onChange(fileIds.toString());
	}

	onFileDelete(index) {
		let {
			files
		} = this.state;
		let {
			input
		} = this.props;

		files.splice(index, 1);

		this.setState({
			files
		});

		this.onSetInputValue();

	}

	onError(message) {
		message = message || '上传文件失败';
		Notify.show([{
			message: message,
			type: 'danger',
		}]);

		this.setState({
			progress: 0,
			isUploading: false
		});
	}

	onSuccess(response) {
		response = Object.assign({}, response);

		let {
			form
		} = this.state;

		let fileUrl = `/krspace_oa_web/doc/docFile/downFile?sourceservicetoken=${form.sourceservicetoken}&operater=${form.operater}&fileId=${response.id}`;

		response.fileUrl = fileUrl;
		response.fileName = response.filename;

		let {
			input,
			onChange
		} = this.props;
		let {
			files
		} = this.state;

		files.unshift(response);

		console.log('files', files);
		this.setState({
			files,
			progress: 0,
			isUploading: false
		});

		this.onSetInputValue();

		Notify.show([{
			message: '上传文件成功',
			type: 'success',
		}]);
		onChange && onChange(files);
	}

	onTokenSuccess(form) {
		this.setState({
			form
		});
	}

	onTokenError() {
		Notify.show([{
			message: '初始化上传文件失败',
			type: 'danger',
		}]);
	}

	onChange(event) {

		var _this = this;


		let file = event.target.files[0];
		console.log('file-----', file)
		if (!file) {
			return;
		}

		this.setState({
			isUploading: true
		});


		if (file) {
			var progress = 0;
			var timer = window.setInterval(function() {
				if (progress >= 100) {
					window.clearInterval(timer);
					_this.setState({
						progress: 0,
						isUploading: false
					});
				}
				progress += 10;
				_this.setState({
					progress
				});
			}, 300);


		}

		var form = new FormData();
		form.append('file', file);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {

					var response = xhr.response.data;
					form.append('sourceservicetoken', response.token);
					form.append('docTypeCode', response.docTypeCode);
					form.append('operater', response.operater);

					_this.onTokenSuccess({
						sourceservicetoken: response.token,
						docTypeCode: response.docTypeCode,
						operater: response.operater
					});

					var xhrfile = new XMLHttpRequest();
					xhrfile.onreadystatechange = function() {
						if (xhrfile.readyState === 4) {
							var fileResponse = xhrfile.response;
							if (xhrfile.status === 200) {
								if (fileResponse && fileResponse.code > 0) {
									_this.onSuccess(fileResponse.data);

								} else {
									_this.onError(fileResponse.msg);
								}
							} else if (xhrfile.status == 413) {

								_this.onError('您上传的文件过大！');
							} else {
								_this.onError('后台报错请联系管理员！');
							}
						}
					};
					xhrfile.onerror = function(e) {
						console.error(xhr.statusText);
					};

					xhrfile.open('POST', '/api-old/krspace_oa_web/doc/docFile/uploadSingleFile', true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			}
		};

		xhr.onerror = function(e) {
			console.error(xhr.statusText);
		};
		xhr.open('GET', '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken', true);
		xhr.responseType = 'json';
		xhr.send(null);
	}

	render() {

		let {
			input,
			label,
			type,
			meta: {
				touched,
				error
			},
			style,
			requireLabel,
			multiple,
			accept,
			inline
		} = this.props;
		let {
			files,
			progress,
			isUploading
		} = this.state;

		let fileBgStyles = {};

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<div className="ui-file">
					<div className="file-button">
						<span className="file-icon">+</span>
						<input type="file" name="file" onChange={this.onChange}  multiple={multiple?'multiple':null} accept={accept} />
						添加文件
						{isUploading && <span className="progress" style={{width:progress}}></span>}
					</div>
				</div>
				<ul className="file-list">
					{files && files.map((item,index)=>{
						return (
							<li key={index}>
								<a href={item.fileUrl} target="_blank">{item.fileName}</a>
								<span className="del" onTouchTap={this.onFileDelete.bind(this,index)}>删除</span>
							</li>
						);
					})}
				</ul>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
				</WrapComponent>
		);


	}
}


// <input type="file" onChange={this.onChange} name={input.name}/>