module.exports = {

	/**
	 * api请求基础路径
	 * 
	 * @description 路径后面不需要加 /
	 * @description 当请求的路径第一个字符为 / 时, 系统会自动拼接
	 */
	baseUrl: {
		dev: 'http://127.0.0.1:8000/client',
		pro: 'http://admin.demo.syin.top'
	},

	// 应用标识
	key: 'r1bTzaRzQKCoJg3swTnyx1Kni0zGb4yV',

	/**
	 * 默认请求超时的毫秒数(0 表示无超时时间)
	 */
	timeout: 5000,
}