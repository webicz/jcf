/*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2016 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e){e.addModule(function(t){"use strict";return{name:"Radio",selector:'input[type="radio"]',options:{wrapNative:!0,checkedClass:"jcf-checked",uncheckedClass:"jcf-unchecked",labelActiveClass:"jcf-label-active",fakeStructure:'<span class="jcf-radio"><span></span></span>'},matchElement:function(e){return e.is(":radio")},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.doc=t(document),this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeStructure).insertAfter(this.realElement),this.labelElement=this.getLabelFor(),this.options.wrapNative?this.realElement.prependTo(this.fakeElement).css({position:"absolute",opacity:0}):this.realElement.addClass(this.options.hiddenClass)},attachEvents:function(){this.realElement.on({focus:this.onFocus,click:this.onRealClick}),this.fakeElement.on("click",this.onFakeClick),this.fakeElement.on("jcf-pointerdown",this.onPress)},onRealClick:function(e){var t=this;this.savedEventObject=e,setTimeout(function(){t.refreshRadioGroup()},0)},onFakeClick:function(e){this.options.wrapNative&&this.realElement.is(e.target)||this.realElement.is(":disabled")||(delete this.savedEventObject,this.currentActiveRadio=this.getCurrentActiveRadio(),this.stateChecked=this.realElement.prop("checked"),this.realElement.prop("checked",!0),this.fireNativeEvent(this.realElement,"click"),this.savedEventObject&&this.savedEventObject.isDefaultPrevented()?(this.realElement.prop("checked",this.stateChecked),this.currentActiveRadio.prop("checked",!0)):this.fireNativeEvent(this.realElement,"change"),delete this.savedEventObject)},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.focusedFlag=!0,this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur))},onBlur:function(){this.pressedFlag||(this.focusedFlag=!1,this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur))},onPress:function(e){this.focusedFlag||"mouse"!==e.pointerType||this.realElement.focus(),this.pressedFlag=!0,this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onRelease)},onRelease:function(e){this.focusedFlag&&"mouse"===e.pointerType&&this.realElement.focus(),this.pressedFlag=!1,this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onRelease)},getCurrentActiveRadio:function(){return this.getRadioGroup(this.realElement).filter(":checked")},getRadioGroup:function(e){var s=e.attr("name"),i=e.parents("form");return s?i.length?i.find('input[name="'+s+'"]'):t('input[name="'+s+'"]:not(form input)'):e},getLabelFor:function(){var e=this.realElement.closest("label"),s=this.realElement.prop("id");return!e.length&&s&&(e=t('label[for="'+s+'"]')),e.length?e:null},refreshRadioGroup:function(){this.getRadioGroup(this.realElement).each(function(){e.refresh(this)})},refresh:function(){var e=this.realElement.is(":checked"),t=this.realElement.is(":disabled");this.fakeElement.toggleClass(this.options.checkedClass,e).toggleClass(this.options.uncheckedClass,!e).toggleClass(this.options.disabledClass,t),this.labelElement&&this.labelElement.toggleClass(this.options.labelActiveClass,e)},destroy:function(){this.options.wrapNative?this.realElement.insertBefore(this.fakeElement).css({position:"",width:"",height:"",opacity:"",margin:""}):this.realElement.removeClass(this.options.hiddenClass),this.fakeElement.off("jcf-pointerdown",this.onPress),this.fakeElement.remove(),this.doc.off("jcf-pointerup",this.onRelease),this.realElement.off({blur:this.onBlur,focus:this.onFocus,click:this.onRealClick})}}})}(jcf);