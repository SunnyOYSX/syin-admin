<?php

return [

	/**
	 * 访问白名单, 在该名单中的路由, 未登录时可直接访问
	 */
	'whitelist' => array(
		'login' => ['index'],
		'index' => ['refreshtoken']
	),

	/**
	 * token加密密钥
	 */
	'token_key' => '9#!^CJ8a3oJo^A01X3EWmvc@jxNYsBz!',

	/**
	 * refresh token 加密公钥存储文件名称
	 */
	'refresh_token_pub' => 'jwt_pub.key',

	/**
	 * refresh token 加密私钥存储文件名称
	 */
	'refresh_token_pri' => 'jwt_pri.key',

	/**
	 * token 授权过期时长, 单位: 秒
	 */
	'token_expire' => 300,

	/**
	 * refresh token 授权过期时长, 单位: 秒
	 */
	'refresh_token_expire' => 86400*2,
];