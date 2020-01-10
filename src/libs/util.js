import VueRouter from 'vue-router';
import Config from '@/config/common';
import { Message } from 'element-ui';
import Qs from 'qs';
import axios from 'axios'

// todo: 具体名称待调整
/* if(Config.debug && Config.hasOwnProperty('debug_config')){
	console.log(Config.debug_config);
	Config = Config.debug_config;
} */

axios.defaults.withCredentials=false;

let util = {

	/** 
	 * 生成api网站请求网址
	 */
	url(url){
		return Config.api_url + url;
	},
	
	/**
	 * 发送AJAX请求
	 *
	 * @param url            请求URL
	 * @param method         请求类型，取值post|get
	 * @param params         发送数据，对象格式：如{id: 1, ...}；字符串形式：如'id=1&cid=0...'
	 * @param responseType   服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
	 * @param before         提交请求前回调方法
	 * 
	 * @return Promise
	 */
	request(url='', method='', params={}, responseType='json', before=null) {
		return new Promise((resolve, reject) => {

			if(typeof(url) === 'undefined' || url === ''){
				if(window.location.hash != ''){
					url = '/' + window.location.hash.substr(1, window.location.hash.length);
				}else{
					url = window.location.href;
				}
			}

			if(url != '' && url[0] == '/'){
				url = util.url(url);
				// config.baseURL = Config.api_url;
			}

			let config = {
				url
			};

			console.log(url);
		
			let axioxBefore = {};
		
			config.method = (typeof(method) === 'undefined' || method === '') ? 'get' : method;
			params = (typeof(params) === 'undefined' || params === '') ? {} : params;
			config.responseType = (typeof(responseType) === 'undefined' || responseType === '') ? 'json' : responseType;
			config.headers = {
				// 'hash': store.getters.hash
				'key': Config.key
			};

			if(config.method == 'post'){
				config['data'] = Qs.stringify(params);
				config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}else{
				config['params'] = params;
			}

			if (typeof(before) === 'function') {
				axioxBefore = axios.interceptors.request.use(function (cfg) {
					return cfg;
				}, function (error) {
					return Promise.reject(error);
				});
			}

			axios(config).then(function(response){
				axioxBefore && axios.interceptors.request.eject(axioxBefore);

				/** 
				 * 20180605 注释
				 *
				 * 因微信安卓版本app调用接口后返回正常，response.statusText 为空导致程序异常问题
				 * 注释掉 response.statusText 字段验证，以便程序正常运行
				 */
				if(response.status !== 200){
				// if(response.status !== 200 || response.statusText !== 'OK'){
					Message({
						showClose: true,
						message: '服务器未响应，请稍后重试'+response.statusText,
						type: 'error',
						duration: 3000
					});
				}

				if(response.data && typeof(response.data.status) != 'undefined' && response.data.status < 0){
					// 这里退出登录

					// store.commit('logout');
					return false;
				}

				if(response.headers && typeof(response.headers.hash) != 'undefined'){
					// store.commit('updateHash',response.headers.hash);
				}

				resolve(response.data);
			}).catch(function(error){
				axioxBefore && axios.interceptors.request.eject(axioxBefore);

				reject(error);
			});

		});
	},

	post(url='', params={}){
		return util.request(url, 'post', params);
	},

	get(url=''){
		return util.request(url, 'get');
	}
}

export default util;
