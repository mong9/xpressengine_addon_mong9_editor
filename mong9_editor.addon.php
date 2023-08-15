<?php
/*
Plugin Name: Mong9 Editor
Plugin URI: https://mong9editor.com/
Description: The most advanced frontend drag & drop content editor. Mong9 Editor is a responsive page builder which can be used to extend the Classic Editor.
Tags: post, wysiwyg, content editor, drag & drop builder, page builder.
Version: 1.2.1
Author: Mong9 Team
Author URI: https://mong9editor.com/
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html
Text Domain: mong9-editor

	Mong9 Editor is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	any later version.

	Mong9 Editor is distributed in the hope that it will be useful,
	Mong9 Editorbut WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	Copyright (c) 2019 Mong9 Team. All rights reserved.
*/

if(!defined("__ZBXE__")) exit();

// You can set the constants below according to your own needs.
// 아래 상수는 본인에 맞게 설정하시면 됩니다.
$mode_m = 768; // mobile phone landscape settings(휴대폰 가로 설정값)
$mode_e = 576; // mobile phone vertical settings(휴대폰 세로 설정값)
$google_token = ''; // Google Maps Token (When using Google Maps, an authentication token is required.) // 구글지도 토큰(구글지도 사용시, 인증토큰이 필요합니다.)
$image_upload_size = 2; // Image upload capacity (2M) // 이미지 업로드 용량(2M)

$m9_folder = basename(__DIR__);

define('MONG9','true');
define('MONG9_EDITOR_VERSION','1.2.1');
define('MONG9_EDITOR__MINIMUM_XE_VERSION','1.11.6');
define('MONG9_NOW_SITE_DOMAIN',getUrl());
define('MONG9_NOW_SITE_DIR',_XE_PATH_);
define('MONG9_EDITOR__PLUGIN_URL',MONG9_NOW_SITE_DOMAIN .'addons/'. $m9_folder .'/');
define('MONG9_EDITOR__PLUGIN_DIR',MONG9_NOW_SITE_DIR .'addons/'. $m9_folder .'/');
define('MONG9_EDITOR_DELETE_LIMIT',100000);
define('MONG9_SCREEN_SIZE_m',(isset($_REQUEST['mode_m']) && $_REQUEST['mode_m'] != '') ? $_REQUEST['mode_m'] : $mode_m );
define('MONG9_SCREEN_SIZE_e',(isset($_REQUEST['mode_e']) && $_REQUEST['mode_e'] != '') ? $_REQUEST['mode_e'] : $mode_e );
define('MONG9_GOOGLE_TOKEN',(isset($_REQUEST['google_token']) && $_REQUEST['google_token'] != '') ? $_REQUEST['google_token'] : $google_token );
define('MONG9_UPLOAD_DIR',MONG9_NOW_SITE_DIR .'files/mong9/'); // Image upload folder name(이미지 업로드 폴더명)
define('MONG9_IMAGE_UPLOAD_SIZE',$image_upload_size);

if ($called_position == 'after_module_proc') {

	Context::addBodyClass('m9-content');

	require_once(MONG9_EDITOR__PLUGIN_DIR.'includes/functions/editor-function.php');

	$mong9_editor_use = 0;

	$logged_info = Context::get('logged_info');

	// 관리자이면
	if ($logged_info && $logged_info->is_admin == 'Y') {
		$mong9_editor_use = 1; // 사용가능
	}
	// 관리자가 아니면
	else {

		$grants = Context::get('grant');

		// 현재페이지의 관리자(매니저)이면
		if ($grants->manager == 1) {
			$mong9_editor_use = 1; // 사용가능
		}

	}

	define('MONG9_EDITOR_POSSIBLE',$mong9_editor_use);

	// mong9_action
	if (isset($_REQUEST['mong9_action']) && $_REQUEST['mong9_action'] != '') {

		mong9editor_parse_request($_REQUEST['mong9_action']);

	} else {

		// common
		mong9editor_enqueue_int();

		// 관리자 페이지가 아니면(사용자 페이지이면)
		if ($_REQUEST['module'] != 'admin') {
			// Add custom js,css in user mode
			mong9editor_site_enqueue_scripts();
		}

	}

	# 게시판 글보기이면
	if (isset($_REQUEST['document_srl']) && $_REQUEST['document_srl'] != '') {

		$oDocument = Context::get('oDocument');
		$html = $oDocument->variables['content'];

		require_once(MONG9_EDITOR__PLUGIN_DIR . 'includes/functions/content-filter.php');
		$html = Mong9_Html_Convert($html);

		$oDocument->add('content',$html);

	}

} // if

?>