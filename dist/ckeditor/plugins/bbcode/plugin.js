/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function(){CKEDITOR.on("dialogDefinition",function(a){var b;b=a.data.name;a=a.data.definition;"link"==b?(a.removeContents("target"),a.removeContents("upload"),a.removeContents("advanced"),b=a.getContents("info"),b.remove("emailSubject"),b.remove("emailBody")):"image"==b&&(a.removeContents("advanced"),b=a.getContents("Link"),b.remove("cmbTarget"),b=a.getContents("info"),b.remove("txtAlt"),b.remove("basic"))});var j={b:"strong",u:"u",i:"em",color:"span",size:"span",quote:"blockquote",code:"code",url:"a",
email:"span",img:"span","*":"li",list:"ol"},u={strong:"b",b:"b",u:"u",em:"i",i:"i",code:"code",li:"*"},k={strong:"b",em:"i",u:"u",li:"*",ul:"list",ol:"list",code:"code",a:"link",img:"img",blockquote:"quote"},v={color:"color",size:"font-size"},w={url:"href",email:"mailhref",quote:"cite",list:"listType"},m=CKEDITOR.dtd,x=CKEDITOR.tools.extend({table:1},m.$block,m.$listItem,m.$tableContent,m.$list),z=/\s*(?:;\s*|$)/,o={smiley:":)",sad:":(",wink:";)",laugh:":D",cheeky:":P",blush:":*)",surprise:":-o",
indecision:":|",angry:">:(",angel:"o:)",cool:"8-)",devil:">:-)",crying:";(",kiss:":-*"},y={},p=[],q;for(q in o)y[o[q]]=q,p.push(o[q].replace(/\(|\)|\:|\/|\*|\-|\|/g,function(a){return"\\"+a}));var p=RegExp(p.join("|"),"g"),A=function(){var a=[],b={nbsp:" ",shy:"­",gt:">",lt:"<"},c;for(c in b)a.push(c);a=RegExp("&("+a.join("|")+");","g");return function(c){return c.replace(a,function(e,a){return b[a]})}}();CKEDITOR.BBCodeParser=function(){this._={bbcPartsRegex:/(?:\[([^\/\]=]*?)(?:=([^\]]*?))?\])|(?:\[\/([a-z]{1,16})\])/ig}};
CKEDITOR.BBCodeParser.prototype={parse:function(a){for(var b,c,i=0;b=this._.bbcPartsRegex.exec(a);){c=b.index;if(c>i)this.onText(a.substring(i,c),1);i=this._.bbcPartsRegex.lastIndex;if((c=(b[1]||b[3]||"").toLowerCase())&&!j[c])this.onText(b[0]);else if(b[1]){var e=j[c],g={},h={};if(b=b[2])if("list"==c&&(isNaN(b)?/^[a-z]+$/.test(b)?b="lower-alpha":/^[A-Z]+$/.test(b)&&(b="upper-alpha"):b="decimal"),v[c]){"size"==c&&(b+="%");h[v[c]]=b;b=g;var f="",d=void 0;for(d in h)var r=(d+":"+h[d]).replace(z,";"),
f=f+r;b.style=f}else w[c]&&(g[w[c]]=b);if("email"==c||"img"==c)g.bbcode=c;this.onTagOpen(e,g,CKEDITOR.dtd.$empty[e])}else if(b[3])this.onTagClose(j[c])}if(a.length>i)this.onText(a.substring(i,a.length),1)}};CKEDITOR.htmlParser.fragment.fromBBCode=function(a){function b(e){if(0<h.length)for(var a=0;a<h.length;a++){var b=h[a],c=b.name,g=CKEDITOR.dtd[c],f=d.name&&CKEDITOR.dtd[d.name];if((!f||f[c])&&(!e||!g||g[e]||!CKEDITOR.dtd[e]))b=b.clone(),b.parent=d,d=b,h.splice(a,1),a--}}function c(a,e){var b=d.children.length,
c=0<b&&d.children[b-1],b=!c&&s.getRule(k[d.name],"breakAfterOpen"),c=c&&c.type==CKEDITOR.NODE_ELEMENT&&s.getRule(k[c.name],"breakAfterClose"),g=a&&s.getRule(k[a],e?"breakBeforeClose":"breakBeforeOpen");f&&(b||c||g)&&f--;f&&a in x&&f++;for(;f&&f--;)d.children.push(new CKEDITOR.htmlParser.element("br"))}function i(a,e){c(a.name,1);var e=e||d||g,b=e.children.length;a.previous=0<b&&e.children[b-1]||null;a.parent=e;e.children.push(a);a.returnPoint&&(d=a.returnPoint,delete a.returnPoint)}var e=new CKEDITOR.BBCodeParser,
g=new CKEDITOR.htmlParser.fragment,h=[],f=0,d=g,r;e.onTagOpen=function(a,g,f){var l=new CKEDITOR.htmlParser.element(a,g);if(CKEDITOR.dtd.$removeEmpty[a])h.push(l);else{var t=d.name,n=t&&(CKEDITOR.dtd[t]||(d._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span));if(n&&!n[a]){var n=!1,j;a==t?i(d,d.parent):(a in CKEDITOR.dtd.$listItem?(e.onTagOpen("ul",{}),j=d):(i(d,d.parent),h.unshift(d)),n=!0);d=j?j:d.returnPoint||d.parent;if(n){e.onTagOpen.apply(this,arguments);return}}b(a);c(a);l.parent=d;l.returnPoint=
r;r=0;l.isEmpty?i(l):d=l}};e.onTagClose=function(a){for(var e=h.length-1;0<=e;e--)if(a==h[e].name){h.splice(e,1);return}for(var b=[],c=[],g=d;g.type&&g.name!=a;)g._.isBlockLike||c.unshift(g),b.push(g),g=g.parent;if(g.type){for(e=0;e<b.length;e++)a=b[e],i(a,a.parent);d=g;i(g,g.parent);g==d&&(d=d.parent);h=h.concat(c)}};e.onText=function(a){var e=CKEDITOR.dtd[d.name];if(!e||e["#"])c(),b(),a.replace(/(\r\n|[\r\n])|[^\r\n]*/g,function(a,e){if(void 0!==e&&e.length)f++;else if(a.length){var b=0;a.replace(p,
function(e,c){i(new CKEDITOR.htmlParser.text(a.substring(b,c)),d);i(new CKEDITOR.htmlParser.element("smiley",{desc:y[e]}),d);b=c+e.length});b!=a.length&&i(new CKEDITOR.htmlParser.text(a.substring(b,a.length)),d)}})};for(e.parse(CKEDITOR.tools.htmlEncode(a));d.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT;)a=d.parent,i(d,a),d=a;return g};var s=new (CKEDITOR.tools.createClass({$:function(){this._={output:[],rules:[]};this.setRules("list",{breakBeforeOpen:1,breakAfterOpen:1,breakBeforeClose:1,breakAfterClose:1});
this.setRules("*",{breakBeforeOpen:1,breakAfterOpen:0,breakBeforeClose:1,breakAfterClose:0});this.setRules("quote",{breakBeforeOpen:1,breakAfterOpen:0,breakBeforeClose:0,breakAfterClose:1})},proto:{setRules:function(a,b){var c=this._.rules[a];c?CKEDITOR.tools.extend(c,b,!0):this._.rules[a]=b},getRule:function(a,b){return this._.rules[a]&&this._.rules[a][b]},openTag:function(a){a in j&&(this.getRule(a,"breakBeforeOpen")&&this.lineBreak(1),this.write("[",a))},openTagClose:function(a){"br"==a?this._.output.push("\n"):
a in j&&(this.write("]"),this.getRule(a,"breakAfterOpen")&&this.lineBreak(1))},attribute:function(a,b){"option"==a&&("string"==typeof b&&(b=b.replace(/&amp;/g,"&")),this.write("=",b))},closeTag:function(a){a in j&&(this.getRule(a,"breakBeforeClose")&&this.lineBreak(1),"*"!=a&&this.write("[/",a,"]"),this.getRule(a,"breakAfterClose")&&this.lineBreak(1))},text:function(a){this.write(a)},comment:function(){},lineBreak:function(){!this._.hasLineBreak&&this._.output.length&&(this.write("\n"),this._.hasLineBreak=
1)},write:function(){this._.hasLineBreak=0;this._.output.push(Array.prototype.join.call(arguments,""))},reset:function(){this._.output=[];this._.hasLineBreak=0},getHtml:function(a){var b=this._.output.join("");a&&this.reset();return A(b)}}}));CKEDITOR.plugins.add("bbcode",{requires:"entities",beforeInit:function(a){CKEDITOR.tools.extend(a.config,{enterMode:CKEDITOR.ENTER_BR,basicEntities:!1,entities:!1,fillEmptyBlocks:!1},!0);a.filter.disable()},init:function(a){function b(a){var b=a.data,a=CKEDITOR.htmlParser.fragment.fromBBCode(a.data.dataValue),
c=new CKEDITOR.htmlParser.basicWriter;a.writeHtml(c,i);a=c.getHtml(!0);b.dataValue=a}var c=a.config,i=new CKEDITOR.htmlParser.filter;i.addRules({elements:{blockquote:function(a){var b=new CKEDITOR.htmlParser.element("div");b.children=a.children;a.children=[b];if(b=a.attributes.cite){var c=new CKEDITOR.htmlParser.element("cite");c.add(new CKEDITOR.htmlParser.text(b.replace(/^"|"$/g,"")));delete a.attributes.cite;a.children.unshift(c)}},span:function(a){var b;if(b=a.attributes.bbcode)"img"==b?(a.name=
"img",a.attributes.src=a.children[0].value,a.children=[]):"email"==b&&(a.name="a",a.attributes.href="mailto:"+a.children[0].value),delete a.attributes.bbcode},ol:function(a){a.attributes.listType?"decimal"!=a.attributes.listType&&(a.attributes.style="list-style-type:"+a.attributes.listType):a.name="ul";delete a.attributes.listType},a:function(a){a.attributes.href||(a.attributes.href=a.children[0].value)},smiley:function(a){a.name="img";var b=a.attributes.desc,h=c.smiley_images[CKEDITOR.tools.indexOf(c.smiley_descriptions,
b)],h=CKEDITOR.tools.htmlEncode(c.smiley_path+h);a.attributes={src:h,"data-cke-saved-src":h,title:b,alt:b}}}});a.dataProcessor.htmlFilter.addRules({elements:{$:function(b){var c=b.attributes,h=CKEDITOR.tools.parseCssText(c.style,1),f,d=b.name;if(d in u)d=u[d];else if("span"==d)if(f=h.color)d="color",f=CKEDITOR.tools.convertRgbToHex(f);else{if(f=h["font-size"])if(c=f.match(/(\d+)%$/))f=c[1],d="size"}else if("ol"==d||"ul"==d){if(f=h["list-style-type"])switch(f){case "lower-alpha":f="a";break;case "upper-alpha":f=
"A"}else"ol"==d&&(f=1);d="list"}else if("blockquote"==d){try{var i=b.children[0],j=b.children[1],k="cite"==i.name&&i.children[0].value;k&&(f='"'+k+'"',b.children=j.children)}catch(m){}d="quote"}else if("a"==d){if(f=c.href)-1!==f.indexOf("mailto:")?(d="email",b.children=[new CKEDITOR.htmlParser.text(f.replace("mailto:",""))],f=""):((d=1==b.children.length&&b.children[0])&&(d.type==CKEDITOR.NODE_TEXT&&d.value==f)&&(f=""),d="url")}else if("img"==d){b.isEmpty=0;h=c["data-cke-saved-src"]||c.src;c=c.alt;
if(h&&-1!=h.indexOf(a.config.smiley_path)&&c)return new CKEDITOR.htmlParser.text(o[c]);b.children=[new CKEDITOR.htmlParser.text(h)]}b.name=d;f&&(b.attributes.option=f);return null},br:function(a){if((a=a.next)&&a.name in x)return!1}}},1);a.dataProcessor.writer=s;if(a.elementMode==CKEDITOR.ELEMENT_MODE_INLINE)a.once("contentDom",function(){a.on("setData",b)});else a.on("setData",b)},afterInit:function(a){var b;a._.elementsPath&&(b=a._.elementsPath.filters)&&b.push(function(b){var i=b.getName(),e=k[i]||
!1;"link"==e&&0===b.getAttribute("href").indexOf("mailto:")?e="email":"span"==i?b.getStyle("font-size")?e="size":b.getStyle("color")&&(e="color"):"img"==e&&(b=b.data("cke-saved-src")||b.getAttribute("src"))&&0===b.indexOf(a.config.smiley_path)&&(e="smiley");return e})}})})();