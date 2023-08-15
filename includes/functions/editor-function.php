<?php

function mong9editor_enqueue_int() {

	$rn = "\n";
	$_script = '<script>'. $rn;
	$_script .= "if (!M9_SET) { var M9_SET = {}; }". $rn;
	$_script .= "M9_SET['mong9_editor_use'] = '". MONG9_EDITOR_POSSIBLE . "'; // Mong9 에디터 사용". $rn;
	$_script .= "M9_SET['mong9_url'] = '". MONG9_EDITOR__PLUGIN_URL ."'; // Mong9 에디터 주소". $rn;
	$_script .= "M9_SET['mong9_screen_size'] = { 'm' : '". MONG9_SCREEN_SIZE_m ."' , 'e' : '". MONG9_SCREEN_SIZE_e ."' };". $rn;
	$_script .= "M9_SET['google_token'] = '". MONG9_GOOGLE_TOKEN ."'; // 구글지도 토큰(구글지도 사용시, 인증토큰이 필요합니다.)". $rn;

	$mong9_window_url = MONG9_NOW_SITE_DOMAIN .'index.php?mong9_action=editor';
	if (isset($_REQUEST['bo_table']) && $_REQUEST['bo_table'] != '') {
		$mong9_window_url .= '&bo_table='. $_REQUEST['bo_table'];
	}

	$_script .= "M9_SET['mong9_window_url'] = '". $mong9_window_url . "';". $rn;
	$_script .= '</script>'. $rn;

	Context::addHtmlHeader($_script);

	Context::addJsFile(MONG9_EDITOR__PLUGIN_URL.'source/js/mong9.js');

} // function

// Add custom js,css in user mode
function mong9editor_site_enqueue_scripts() {

	Context::addCSSFile(MONG9_EDITOR__PLUGIN_URL.'source/etc/bootstrap-icons/bootstrap-icons.min.css');
	Context::addCSSFile(MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-base.css');
	Context::addCSSFile(MONG9_EDITOR__PLUGIN_URL.'source/css/mong9.css');
	Context::addCSSFile(MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-m.css',FALSE,'all and (max-width: '. MONG9_SCREEN_SIZE_m .'px)');
	Context::addCSSFile(MONG9_EDITOR__PLUGIN_URL.'source/css/mong9-e.css',FALSE,'all and (max-width: '. MONG9_SCREEN_SIZE_e .'px)');

} // function

// 몽9 action 처리
function mong9editor_parse_request($mong9_action = '') {

	if (MONG9_EDITOR_POSSIBLE == 1) {

		if ($mong9_action != '') {

			if (file_exists(MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php')) {

				include MONG9_EDITOR__PLUGIN_DIR .'includes/'. $mong9_action .'.php';
				$func = 'mong9editor_' . $mong9_action;
				$func();
				exit();

			}

		}

    }

	print_m9_msg( m9_die_msg('Security check failed.') );
	exit();

} // function

// print ajax message
function print_m9_msg($msg = '') {
	echo $msg;
	exit();
}

function m9_die_msg($msg) {
	return $msg;
} // function

function check_html_link_nofollow($type=''){
    return true;
}

?>