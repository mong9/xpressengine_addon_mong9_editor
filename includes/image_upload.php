<?php

if(!defined("MONG9")) exit();

function mong9editor_image_upload() {

	if (!defined("MONG9_EDITOR_POSSIBLE") || MONG9_EDITOR_POSSIBLE != 1) {
		print_m9_msg('error|'. m9_die_msg('Security check failed.') );
	}

	if(!defined("MONG9_UPLOAD_DIR")) {
		print_m9_msg('error|'. m9_die_msg('The setting value does not exist.') .'[MONG9_UPLOAD_DIR]' );
	}

	if(!defined("MONG9_IMAGE_UPLOAD_SIZE")) {
		print_m9_msg('error|'. m9_die_msg('The setting value does not exist.') .'[MONG9_IMAGE_UPLOAD_SIZE]' );
	}

	if (isset($_FILES) && empty($_FILES)) {
		print_m9_msg('error|'. m9_die_msg('Upload failed.') );
	}

	if (!is_dir(MONG9_UPLOAD_DIR)) {
		if (!mkdir(MONG9_UPLOAD_DIR,0755)) {
			print_m9_msg('error|'. m9_die_msg('Failed to create the folder.') );
		}
	}

	$uploaded_img = (isset($_FILES['img_upload_file']) && $_FILES['img_upload_file'] != '') ? $_FILES['img_upload_file'] : '';

	$_temp = explode(".",$uploaded_img["name"]);
	$_name = md5(mt_rand(100,200));
	$newfilename = $_name . '.'. end($_temp); // 랜덤한 이름으로

	if (empty($uploaded_img)) {
		print_m9_msg('error|'. m9_die_msg('This file is empty. Please try another.'));
	}
	 
	if ($uploaded_img['error']) {
		print_m9_msg('error|'. $uploaded_img['error']);
	}

	$upload_file_size = MONG9_IMAGE_UPLOAD_SIZE;

	$_oFileModel = getModel('file');
	$_config = $_oFileModel->getFileConfig();
	$max_upload_size = $_config->allowed_filesize;

	if ($upload_file_size > $max_upload_size) {
		$upload_file_size = $max_upload_size;
	}

	$mong9_upload_dir = m9_upload_dir(MONG9_UPLOAD_DIR);

	$new_file_path = $mong9_upload_dir .'/'. $newfilename;

	$i = 1;
	while (file_exists($new_file_path)) {
		$i++;
		$new_file_path = $mong9_upload_dir .'/'. $i .'_'. $newfilename;
	}

	$imageFileType = strtolower(pathinfo($new_file_path,PATHINFO_EXTENSION));

	// Allow certain file formats
	if ($imageFileType != 'jpg' && $imageFileType != 'png' && $imageFileType != 'jpeg' && $imageFileType != 'gif' && $imageFileType != 'bmp' && $imageFileType != 'webp') {
		print_m9_msg('type|'. m9_die_msg('Sorry, only JPG, JPEG, PNG, BMP, GIP & WEBP files are allowed.'));
	}

	// Check file size
	if ($uploaded_img['size'] > ($upload_file_size * (1024 * 1024))) {
		$_size = $upload_file_size * 1024;
		print_m9_msg('error|'. sprintf( m9_die_msg('This file is too big. Files must be less than %s KB in size.') ,$_size) );
	}

	if (move_uploaded_file($uploaded_img["tmp_name"],$new_file_path)) {

		// Show the uploaded file in browser
		$target_url = preg_replace("~^". preg_quote(MONG9_NOW_SITE_DIR,"~") ."~",MONG9_NOW_SITE_DOMAIN,$mong9_upload_dir);
		print_m9_msg('|'. basename($new_file_path) .'|'. $uploaded_img['size'] .'|'. $target_url);

	} else {

		print_m9_msg('error|'.m9_die_msg('Sorry, there was an error uploading your file') );

	}

	print_m9_msg('error|'. m9_die_msg('Upload failed.') );

	exit;

} // function

function m9_upload_dir($dir) {
	$newDir = rtrim($dir,'/') .'/'. date('Y/m');
	if (!is_dir($newDir)) {
		mkdir($newDir,0755,true);
	}
	return $newDir;
}

?>
