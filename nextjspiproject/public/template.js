
// import jQuery from "jquery"

 document.documentElement.className = document.documentElement.className + ' yes-js js_active js'

  window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/14.0.0\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/wp-includes\/js\/wp-emoji-release.min.js"}};
!function(e,a,t){var n,r,o,i=a.createElement("canvas"),p=i.getContext&&i.getContext("2d");function s(e,t){var a=String.fromCharCode,e=(p.clearRect(0,0,i.width,i.height),p.fillText(a.apply(this,e),0,0),i.toDataURL());return p.clearRect(0,0,i.width,i.height),p.fillText(a.apply(this,t),0,0),e===i.toDataURL()}function c(e){var t=a.createElement("script");t.src=e,t.defer=t.type="text/javascript",a.getElementsByTagName("head")[0].appendChild(t)}for(o=Array("flag","emoji"),t.supports={everything:!0,everythingExceptFlag:!0},r=0;r<o.length;r++)t.supports[o[r]]=function(e){if(p&&p.fillText)switch(p.textBaseline="top",p.font="600 32px Arial",e){case"flag":return s([127987,65039,8205,9895,65039],[127987,65039,8203,9895,65039])?!1:!s([55356,56826,55356,56819],[55356,56826,8203,55356,56819])&&!s([55356,57332,56128,56423,56128,56418,56128,56421,56128,56430,56128,56423,56128,56447],[55356,57332,8203,56128,56423,8203,56128,56418,8203,56128,56421,8203,56128,56430,8203,56128,56423,8203,56128,56447]);case"emoji":return!s([129777,127995,8205,129778,127999],[129777,127995,8203,129778,127999])}return!1}(o[r]),t.supports.everything=t.supports.everything&&t.supports[o[r]],"flag"!==o[r]&&(t.supports.everythingExceptFlag=t.supports.everythingExceptFlag&&t.supports[o[r]]);t.supports.everythingExceptFlag=t.supports.everythingExceptFlag&&!t.supports.flag,t.DOMReady=!1,t.readyCallback=function(){t.DOMReady=!0},t.supports.everything||(n=function(){t.readyCallback()},a.addEventListener?(a.addEventListener("DOMContentLoaded",n,!1),e.addEventListener("load",n,!1)):(e.attachEvent("onload",n),a.attachEvent("onreadystatechange",function(){"complete"===a.readyState&&t.readyCallback()})),(e=t.source||{}).concatemoji?c(e.concatemoji):e.wpemoji&&e.twemoji&&(c(e.twemoji),c(e.wpemoji)))}(window,document,window._wpemojiSettings);

var ajax_login_object = {"ajaxurl":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/wp-admin\/admin-ajax.php","redirecturl":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/blog","loadingmessage":"Sending user info, please wait..."};

var wc_add_to_cart_params = {"ajax_url":"\/themes\/wp\/weefly\/wp-admin\/admin-ajax.php","wc_ajax_url":"\/themes\/wp\/weefly\/?wc-ajax=%%endpoint%%","i18n_view_cart":"View cart","cart_url":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/cart\/","is_cart":"","cart_redirect_after_add":"no"};

var vb_reg_vars = {"vb_ajax_url":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/wp-admin\/admin-ajax.php","redirecturl":"https:\/\/slidesigma.com\/themes\/wp\/weefly\/"};

function setREVStartSize(e){
  window.requestAnimationFrame (function() {
    window.RSIW = window.RSIW===undefined ? window.innerWidth : window.RSIW;
    window.RSIH = window.RSIH===undefined ? window.innerHeight : window.RSIH;
    try {
      var pw = document.getElementById(e.c).parentNode.offsetWidth,
        newh;
      pw = pw===0 || isNaN(pw) || (e.l=="fullwidth" || e.layout=="fullwidth") ? window.RSIW : pw;
      e.tabw = e.tabw===undefined ? 0 : parseInt(e.tabw);
      e.thumbw = e.thumbw===undefined ? 0 : parseInt(e.thumbw);
      e.tabh = e.tabh===undefined ? 0 : parseInt(e.tabh);
      e.thumbh = e.thumbh===undefined ? 0 : parseInt(e.thumbh);
      e.tabhide = e.tabhide===undefined ? 0 : parseInt(e.tabhide);
      e.thumbhide = e.thumbhide===undefined ? 0 : parseInt(e.thumbhide);
      e.mh = e.mh===undefined || e.mh=="" || e.mh==="auto" ? 0 : parseInt(e.mh,0);
      if(e.layout==="fullscreen" || e.l==="fullscreen")
        newh = Math.max(e.mh,window.RSIH);
      else{
        e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
        for (var i in e.rl) if (e.gw[i]===undefined || e.gw[i]===0) e.gw[i] = e.gw[i-1];
        e.gh = e.el===undefined || e.el==="" || (Array.isArray(e.el) && e.el.length==0)? e.gh : e.el;
        e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
        for (var i in e.rl) if (e.gh[i]===undefined || e.gh[i]===0) e.gh[i] = e.gh[i-1];
                  
        var nl = new Array(e.rl.length),
          ix = 0,
          sl;
        e.tabw = e.tabhide>=pw ? 0 : e.tabw;
        e.thumbw = e.thumbhide>=pw ? 0 : e.thumbw;
        e.tabh = e.tabhide>=pw ? 0 : e.tabh;
        e.thumbh = e.thumbhide>=pw ? 0 : e.thumbh;
        for (var i in e.rl) nl[i] = e.rl[i]<window.RSIW ? 0 : e.rl[i];
        sl = nl[0];
        for (var i in nl) if (sl>nl[i] && nl[i]>0) { sl = nl[i]; ix=i;}
        var m = pw>(e.gw[ix]+e.tabw+e.thumbw) ? 1 : (pw-(e.tabw+e.thumbw)) / (e.gw[ix]);
        newh =  (e.gh[ix] * m) + (e.tabh + e.thumbh);
      }
      var el = document.getElementById(e.c);
      if (el!==null && el) el.style.height = newh+"px";
      el = document.getElementById(e.c+"_wrapper");
      if (el!==null && el) {
        el.style.height = newh+"px";
        el.style.display = "block";
      }
    } catch(e){
      console.log("Failure at Presize of Slider:" + e)
    }
  });
}
  
// (function () {
//   var c = document.body.className;
//   c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
//   document.body.className = c;
// })()

if(typeof revslider_showDoubleJqueryError === "undefined") {function revslider_showDoubleJqueryError(sliderID) 
  {console.log("You have some jquery.js library include that comes after the Slider Revolution files js inclusion.");
  console.log("To fix this, you can:");console.log("1. Set 'Module General Options' -> 'Advanced' -> 'jQuery & OutPut Filters' -> 'Put JS to Body' to on");
  console.log("2. Find the double jQuery.js inclusion and remove it");return "Double Included jQuery Library";}}


jQuery('.inner-add-to-cart').on('click', function() {
  var $this = $(this);
$this.button('loading');
  setTimeout(function() {
     $this.button('reset');
 }, 300);
})

setREVStartSize({c: 'rev_slider_18_2',rl:[1240,1024,778,480],el:[400,600,600,600],gw:[450,450,800,450],gh:[400,600,600,600],type:'carousel',justify:'',layout:'fullwidth',mh:"0"});if (window.RS_MODULES!==undefined && window.RS_MODULES.modules!==undefined && window.RS_MODULES.modules["revslider182"]!==undefined) {window.RS_MODULES.modules["revslider182"].once = false;window.revapi18 = undefined;if (window.RS_MODULES.checkMinimal!==undefined) window.RS_MODULES.checkMinimal()}


    window.RS_MODULES = window.RS_MODULES || {};
    window.RS_MODULES.modules = window.RS_MODULES.modules || {};
    window.RS_MODULES.waiting = window.RS_MODULES.waiting || [];
    window.RS_MODULES.defered = true;
    window.RS_MODULES.moduleWaiting = window.RS_MODULES.moduleWaiting || {};
    window.RS_MODULES.type = 'compiled';

 
    (function() {function maybePrefixUrlField () {
const value = this.value.trim()
if (value !== '' && value.indexOf('http') !== 0) {
  this.value = 'http://' + value
}
}
const urlFields = document.querySelectorAll('.mc4wp-form input[type="url"]')
for (let j = 0; j < urlFields.length; j++) {
urlFields[j].addEventListener('blur', maybePrefixUrlField)
}
})()

var sbiajaxurl = "wp-admin/admin-ajax.html";

setREVStartSize({c: 'rev_slider_15_1',rl:[1240,1024,778,480],el:[750,750,750,750],gw:[1240,1024,778,480],gh:[750,750,750,750],type:'standard',justify:'',layout:'fullwidth',mh:"0"});
if (window.RS_MODULES!==undefined && window.RS_MODULES.modules!==undefined && window.RS_MODULES.modules["revslider151"]!==undefined)
  {window.RS_MODULES.modules["revslider151"].once = false;
  window.revapi15 = undefined;
  if (window.RS_MODULES.checkMinimal!==undefined) 
  window.RS_MODULES.checkMinimal()
}

  setREVStartSize({c: 'rev_slider_15_1',rl:[1240,1024,778,480],el:[750,750,750,750],gw:[1240,1024,778,480],gh:[750,750,750,750],type:'standard',justify:'',layout:'fullwidth',mh:"0"});
          if (window.RS_MODULES!==undefined && window.RS_MODULES.modules!==undefined && window.RS_MODULES.modules["revslider151"]!==undefined)
           {window.RS_MODULES.modules["revslider151"].once = false;
           window.revapi15 = undefined;
           if (window.RS_MODULES.checkMinimal!==undefined) 
            window.RS_MODULES.checkMinimal()
          }