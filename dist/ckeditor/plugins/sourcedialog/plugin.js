/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.plugins.add("sourcedialog",{lang:"af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sq,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh",icons:"sourcedialog,sourcedialog-rtl",init:function(a){a.addCommand("sourcedialog",new CKEDITOR.dialogCommand("sourcedialog"));CKEDITOR.dialog.add("sourcedialog",this.path+"dialogs/sourcedialog.js");a.ui.addButton&&a.ui.addButton("Sourcedialog",{label:a.lang.sourcedialog.toolbar,
command:"sourcedialog",toolbar:"mode,10"})}});