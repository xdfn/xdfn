Ext.define("Ext.ux.exporter.Button",{extend:"Ext.Component",alias:"widget.exporterbutton",html:"<p></p>",config:{swfPath:"/extjs/src/ux/exporter/downloadify.swf",downloadImage:"/extjs/src/ux/exporter/download.png",width:62,height:22,downloadName:"download"},constructor:function(b){b=b||{};this.initConfig();Ext.ux.exporter.Button.superclass.constructor.call(this,b);var a=this;this.on("afterrender",function(){a.setComponent(a.store||a.component||a.up("gridpanel")||a.up("treepanel"),b)})},setComponent:function(b,a){this.component=b;this.store=!b.is?b:b.getStore();this.setDownloadify(a)},setDownloadify:function(b){var a=this;Downloadify.create(this.el.down("p").id,{filename:function(){return a.getDownloadName()+"."+Ext.ux.exporter.Exporter.getFormatterByName(a.formatter).extension},data:function(){return Ext.ux.exporter.Exporter.exportAny(a.component,a.formatter,b)},transparent:false,swf:this.getSwfPath(),downloadImage:this.getDownloadImage(),width:this.getWidth(),height:this.getHeight(),transparent:true,append:false})}});