function mong9_btn_attach(editor_names) {

	for (var i=0;i<editor_names.length;i++) {
		var editor_name = editor_names[i];
		if (mong9_extend_connect[editor_name]) {
			mong9_extend_connect[editor_name].excute();
		}
	}

}

var mong9_extend_connect = {

	cheditor5 : {

		excute : function() {

			jQuery(".cheditor-container").each( function(index){

				var textarea_id = jQuery(this).parent().find('textarea').eq(0).attr("id");
				var get_id = textarea_id.replace(/^tx_/,"");

				m9_delay_checking(
					function() {
						var d = eval('ed_'+get_id);
						var iframe_obj = jQuery(textarea_id).parent().find('iframe').eq(0);
						return (!d || !d.doc || !iframe_obj) ? false : true;
					},
					function() {
						mong9_extend_connect['cheditor5'].int(get_id);
					}
				);

			});

		},

		int : function(id) {

			var textarea_name = '#tx_' + id;
			var iframe_obj = jQuery(textarea_name).parent().find('iframe')[0];

			mong9_connect.int({
				editor : 'cheditor5',
				name : id,
				lang : M9_SET['lang'],
				path : M9_SET['mong9_url'],
				path_editor : M9_SET['mong9_window_url'],
				iframe : iframe_obj,
				obj : eval('ed_' + id)
			});

		},


		attach_button : function(id) {

			var _html = '<div name="Mong9_Editor" title="Mong9 Editor" onclick="mong9_connect.open(\''+ id +'\');return false;" class="cheditor-tb-bg-first __mong9_editor_btn_box_for_cheditor">'
			+ '<div class="cheditor-tb-icon __mong9_editor_btn_open __cheditor"></div>'
			+ '</div>';
			jQuery(mong9_connect.objs[id]['iframe']).parents('.cheditor-container').find('.cheditor-tb-wrapper').find('.cheditor-tb-split').last().before(_html);

		},

		editor_in : function(id,_html) {
			var _objects = mong9_connect._objects[id];
			_objects.replaceContents(_html);
		},

		get_html : function(id) {
			var _objects = mong9_connect._objects[id];
			return _objects.outputBodyHTML();
		}

	}, // cheditor5

	xpresseditor : {

		excute : function() {
			for (var id in xe.Editors) {

				m9_delay_checking(
					function() {
						return (!xe.Editors[id].getFrame()) ? false : true;
					},
					function() {
						mong9_extend_connect['xpresseditor'].int(id);
					}
				);

			}
		},

		int : function(id) {

			mong9_connect.int({
				editor : 'xpresseditor',
				name : id,
				lang : M9_SET['lang'],
				path : M9_SET['mong9_url'],
				path_editor : M9_SET['mong9_window_url'],
				iframe : xe.Editors[id].getFrame(),
			});

		},


		attach_button : function(id) {

			var _html = '<ul class="mong9editor"><li class="left xpress_xeditor_ui_mong9editor">'
			+ '<button type="button" title="Mong9 Editor" onclick="mong9_connect.open(\''+ id +'\');return false;" class="__mong9_editor_btn_open __xpresseditor"><span>Mong9 Editor</span></button>'
			+ '</li></ul>';

			jQuery('#xe-editor-container-' + id).parents('.xpress-editor').find('.tool').append(_html);

		},

		editor_in : function(id,_html) {
			var E_name = mong9_connect.targets[id];
			var oEditor = xe.Editors[id] || null;
			oEditor.setIR(_html,true);
		},

		get_html : function(id) {
			var oEditor = xe.Editors[id] || null;
			return oEditor.getIR();
		}

	}, // xpresseditor

	ckeditor4 : {

		excute : function() {

			for (var id in CKEDITOR.instances) {

				m9_delay_checking(
					function() {
						return (!jQuery('#cke_'+id).find('.cke_wysiwyg_frame').length > 0) ? false : true;
					},
					function() {
						mong9_extend_connect['ckeditor4'].int(id);
					}
				);

			}
		},

		int : function(id) {

			mong9_connect.int({
				editor : 'ckeditor4',
				name : id,
				lang : M9_SET['lang'],
				path : M9_SET['mong9_url'],
				path_editor : M9_SET['mong9_window_url'],
				iframe : jQuery('#cke_'+id).find('.cke_wysiwyg_frame').eq(0)[0],
			});

		},


		attach_button : function(id) {

			var editor = CKEDITOR.instances[id];
			var config = editor.config;

			editor.config.bodyClass += ' m9-content _m9editor';

			if (typeof(editor.config.contentsCss) == 'string') {
				var _array = [];
				_array.push(editor.config.contentsCss);
				editor.config.contentsCss = _array;
			}

			for (var z=0;z<mong9_connect.file_list.length;z++) {
				var Dfile = mong9_connect.file_list[z];
				Dfile = Dfile.replace(new RegExp('__mong9_url__','gi'),mong9_connect.objs[id]['path']);
				editor.config.contentsCss.push(Dfile);
			}

			var target = jQuery(editor.container.$).find('.cke_toolbox').find('.cke_toolbar_break').eq(0);

			var Dhash = mong9_connect.objs[id];

			var _html = '<span id="cke_m9b" class="cke_toolbar" aria-labelledby="cke_m9b_label" role="toolbar"><span id="cke_m9b_label" class="cke_voice_label">Mog9 Editor</span><span class="cke_toolbar_start"></span><span class="cke_toolgroup" role="presentation">'
			+ '<a id="cke_m9c" class="cke_button cke_button__mong9editor cke_button_off" href="javascript:void(\'Mong9Editor\')" title="" tabindex="-1" hidefocus="true" role="button" aria-labelledby="cke_m9c_label" aria-describedby="cke_m9c_description" aria-haspopup="false" aria-disabled="false" onclick="mong9_connect.open(\''+id+'\');return false;"><span class="cke_button_icon cke_button__mong9editor_icon __mong9_editor_btn_open">&nbsp;</span><span id="cke_m9c_label" class="cke_button_label cke_button__mong9editor_label" aria-hidden="false">Mong9 Editor</span><span id="cke_m9c_description" class="cke_button_label" aria-hidden="false"></span></a>'
			+ '</span><span class="cke_toolbar_end"></span></span>';

			if (target.length == 0) {
				jQuery(editor.container.$).find('.cke_toolbox').append(_html);
			} else {
				target.before(_html);
			}

		},

		editor_in : function(id,_html) {
			CKEDITOR.instances[id].setData(_html);
		},

		get_html : function(id) {
			return CKEDITOR.instances[id].getData();
		}

	}, // ckeditor4

	smarteditor2 : {

		excute : function() {
			for (var id in oEditors.getById) {

				m9_delay_checking(
					function() {
						return (!oEditors.getById[id].getWYSIWYGWindow || !oEditors.getById[id].getWYSIWYGWindow().name) ? false : true;
					},
					function() {
						mong9_extend_connect['smarteditor2'].int(id);
					}
				);

			}
		},

		int : function(id) {

			var _iframe = false;
			var _target = jQuery('#'+id).siblings('iframe').eq(0);
			if (jQuery(_target).contents().find('body').find('iframe').length > 0) {
				_iframe = jQuery(_target).contents().find('body').find('iframe');
			}

			mong9_connect.int({
				editor : 'smarteditor2',
				name : id,
				lang : M9_SET['lang'],
				path : M9_SET['mong9_url'],
				path_editor : M9_SET['mong9_window_url'],
				iframe : _iframe
			});

		},

		attach_button : function(id) {
			// 이중 IFRAME 으로 inline style 처리
			var _html = '<ul><li class="husky_seditor_ui_mong9_editor single_child">'
			+ '<button type="button" title="Mong9 Editor" onclick="window.parent.mong9_connect.open(\''+ id +'\');return false;" style="background-image: url(\'' + mong9_connect.objs[id]['path'] + 'icons/mong9-editor.png\');background-repeat:no-repeat;background-position:center;background-size:contain"><span class="_buttonRound tool_bg">Mong9 Editor</span></button>'
			+ '</li></ul>';
			jQuery('#'+id).siblings('iframe').contents().find('.husky_seditor_text_tool').append(_html);

		},

		editor_in : function(id,_html) {
			oEditors.getById[id].setIR(_html);
		},

		get_html : function(id) {
			return oEditors.getById[id].getIR();
		}

	}, // smarteditor2

	tinymce : {

		excute : function() {
			for (var i=0;i<tinyMCE.editors.length;i++) {

				var id = tinyMCE.editors[i].id;

				m9_delay_checking(
					function() {
						return (!id || !tinyMCE.editors[id].iframeElement) ? false : true;
					},
					function() {
						mong9_extend_connect['tinymce'].int(id);
					}
				);

			}
		},

		int : function(id) {

			var _iframe = jQuery(tinymce.editors[id].iframeElement)[0];
			var _be = (tinymce.editors[id].plugins && tinymce.editors[id].plugins['mong9editor']) ? 1 : 0;

			mong9_connect.int({
				editor : 'tinymce',
				name : id,
				lang : M9_SET['lang'],
				path : M9_SET['mong9_url'],
				path_editor : M9_SET['mong9_window_url'],
				iframe : _iframe,
				be : _be,
			});

		},

		attach_button : function(id) {

			tinyMCE.ui.Factory.create({
				image: mong9_connect.objs[id]['path'] + '/icons/mong9-editor.png',
				type: 'button',
				tooltip : 'Mong9 Editor',
			}).on('click', function(e){
				mong9_connect.open(id);
			})
			.renderTo(jQuery(tinyMCE.editors[id].editorContainer).find('.mce-container-body .mce-toolbar').not('[style*="display:none"]').find('.mce-btn-group:last > div').eq(0));

		},

		editor_in : function(id,_html) {
			tinyMCE.editors[id].setContent(_html);
		},

		get_html : function(id) {
			return tinyMCE.editors[id].getContent();
		}

	} // tinymce

};

var mong9_connect = {

	objs : {},
	targets : {},
	_objects : {},

	file_list : [
		'__mong9_url__/source/etc/bootstrap-icons/bootstrap-icons.min.css',
		'__mong9_url__/source/css/mong9-base.css',
		'__mong9_url__/source/css/mong9.css'
	],

	int : function(Eref) {

		var E_name = Eref['name'];

		if (!mong9_connect.objs[E_name]) {
			var _target = random_str();
			mong9_connect.objs[E_name] = {
				target : _target,
				editor : Eref['editor']
			};
			mong9_connect.targets[_target] = E_name;
			if (Eref['obj']) {
				mong9_connect._objects[E_name] = Eref['obj'];
			}
		}

		mong9_connect.objs[E_name]['lang'] = (Eref['lang']) ? Eref['lang'] : get_mong9_lang();
		mong9_connect.objs[E_name]['path'] = (Eref['path']) ? Eref['path'] : (get_m9_file_info(window.location.href))['path'] + '/addons/mong9_editor';

		mong9_connect.objs[E_name]['path_editor'] = (Eref['path_editor']) ? Eref['path_editor'] : (get_m9_file_info(window.location.href))['path_editor'] + '/addons/mong9_editor';

		mong9_connect.objs[E_name]['iframe'] = Eref['iframe'];
		mong9_connect.objs[E_name]['mode_m'] = (Eref['mode_m']) ? Eref['mode_m'] : (M9_SET['mong9_screen_size'] && M9_SET['mong9_screen_size']['m']) ? M9_SET['mong9_screen_size']['m'] : '';
		mong9_connect.objs[E_name]['mode_e'] = (Eref['mode_e']) ? Eref['mode_e'] : (M9_SET['mong9_screen_size'] && M9_SET['mong9_screen_size']['e']) ? M9_SET['mong9_screen_size']['e'] : '';

		if (Eref['be'] != 1) {
			mong9_extend_connect[Eref['editor']].attach_button(E_name);

			mong9_connect.addFile_editor(E_name);
		}

	},

	addFile_editor : function(E_name) {

		var Dhash = mong9_connect.objs[E_name];

		jQuery(Dhash['iframe']).contents().find('body').addClass('m9-content').addClass('_m9editor');

		for (var z=0;z<mong9_connect.file_list.length;z++) {
			var Dfile = mong9_connect.file_list[z];
			Dfile = Dfile.replace(new RegExp('__mong9_url__','gi'),Dhash['path']);
			jQuery(Dhash['iframe']).contents().find('head').append('<link rel="stylesheet" type="text/css" href="' + Dfile + '">');
		}

	},

	open : function(E_name) {
		var Dhash = mong9_connect.objs[E_name];
		openWindow(Dhash['path_editor']+'&editor_id='+Dhash['target']+'&lang='+Dhash['lang']+'&mong9_url='+encodeURIComponent(Dhash['path']),{'fullscreen':1,'scrollbars':1,'resizable':1});

	},

	editor_in : function(Etarget,_html) {
		var E_name = mong9_connect.targets[Etarget];
		var Dhash = mong9_connect.objs[E_name];
		var editor_name = Dhash['editor'];
		mong9_extend_connect[editor_name].editor_in(E_name,_html);
	},

	get_html : function(Etarget) {
		var E_name = mong9_connect.targets[Etarget];
		var Dhash = mong9_connect.objs[E_name];
		var editor_name = Dhash['editor'];
		return mong9_extend_connect[editor_name].get_html(E_name);
	}

};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
*  Javascript open window
*  http://www.webtoolkit.info/
**/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openWindow_full(anchor,name) {
 window.open(anchor,name,"");
}


function openWindow(anchor, options) {

	var args = '';

	if (typeof(options) == 'undefined') { var options = new Object(); }
	if (typeof(options.name) == 'undefined') { options.name = 'win' + Math.round(Math.random()*100000); }

	if (typeof(options.height) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "height=" + options.height + ",";
	}

	if (typeof(options.width) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "width=" + options.width + ",";
	}

	if (typeof(options.fullscreen) != 'undefined') {
		args += "width=" + screen.availWidth + ",";
		args += "height=" + screen.availHeight + ",";
	}

	if (typeof(options.center) == 'undefined') {
		options.x = 0;
		options.y = 0;
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}

	if (typeof(options.center) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		options.y=Math.floor((screen.availHeight-(options.height || screen.height))/2)-(screen.height-screen.availHeight);
		options.x=Math.floor((screen.availWidth-(options.width || screen.width))/2)-(screen.width-screen.availWidth);
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
	args += "status=no,"; 

	if (typeof(options.location) != 'undefined') { args += "location=" + options.location + ","; }
	if (typeof(options.directories) != 'undefined') { args += "directories=" + options.directories + ","; }
	if (typeof(options.scrollbars) != 'undefined') { args += "scrollbars=" + options.scrollbars + ","; }
	if (typeof(options.menubar) != 'undefined') { args += "menubar="+options.menubar+","; }
	if (typeof(options.locationbar) != 'undefined') { args += "location="+options.locationbar+","; }
	if (typeof(options.resizable) != 'undefined') { args += "resizable=" + options.resizable + ","; }
	if (typeof(options.statusbar) != 'undefined') { args += "statusbars=" + options.statusbar + ","; }

	var win = window.open(anchor, options.name, args);

	return false;

}