Ext.define("xdfn.service.Service",{extend:"xdfn.service.ui.Service",initComponent:function(){var a=this;a.serviceStore=Ext.create("xdfn.service.store.ServiceJsonStore");a.psStore=Ext.create("xdfn.project.store.PSListJsonStore",{proxy:{type:"ajax",url:"./serRec.do?method=getPishiList",reader:{type:"json",root:"data"}}});a.callParent(arguments);a.down('button[text="增加记录"]').on("click",a.OnAddServiceBtnClick,a);a.down('button[text="修改记录"]').on("click",a.OnModifyServiceBtnClick,a);a.down('button[text="删除记录"]').on("click",a.OnDeleteServiceBtnClick,a);a.down('button[text="增加批示"]').on("click",a.OnAddPSBtnClick,a);a.down('button[text="修改批示"]').on("click",a.OnModifyPSBtnClick,a);a.down('button[text="删除批示"]').on("click",a.OnDeletePSBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportProjectBtnClick,a);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a);a.down("gridpanel").on("select",a.OnServiceGridSelect,a);a.down("gridpanel").on("itemdblclick",a.OnServiceGridItemDbClick,a);a.serviceStore.on("load",a.OnServiceStoreLoad,a)},OnServiceStoreLoad:function(b,a,e,c){var d=this;Ext.apply(d.psStore.getProxy(),{extraParams:{}});d.psStore.loadRawData([])},OnAddServiceBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("FWGL-FWJL-2",function(){Ext.create("xdfn.service.ServiceWindow",{url:"./serRec.do?method=add",grid:a.up("gridpanel")}).show()})},OnServiceGridItemDbClick:function(b,a,h,d,i,f){var g=this;var c=Ext.create("xdfn.service.ServiceWindow",{title:"查看服务记录",enableSubmit:false});c.down("form").getForm().load({url:"./serRec.do?method=findById",params:{ID:a.get("ID_VIEW")},method:"get",success:function(e,j){c.show()},failure:function(e,j){c.destroy();Ext.Msg.alert("提示","无法查看！")}})},OnModifyServiceBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("FWGL-FWJL-3",function(){if(f.length>0){var e=Ext.create("xdfn.service.ServiceWindow",{title:"修改服务记录",url:"./serRec.do?method=modify",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./serRec.do?method=findById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的服务记录！")}})},OnDeleteServiceBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("FWGL-FWJL-4",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该服务记录吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./serRec.do?method=delete",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}else{a.fireEvent("load",a)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的服务记录！")}})},OnAddPSBtnClick:function(a,g,b){var d=this,c=d.down("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("FWGL-FWJL-6",function(){if(f.length>0){Ext.create("xdfn.project.PSWindow",{url:"./serRec.do?method=addPishi",grid:a.up("gridpanel"),ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的服务记录！")}})},OnModifyPSBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("FWGL-FWJL-7",function(){if(f.length>0){var e=Ext.create("xdfn.project.PSWindow",{title:"修改批示",url:"./serRec.do?method=modifyPishi",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./serRec.do?method=findPishiById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的批示！")}})},OnDeletePSBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("FWGL-FWJL-8",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该批示吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./serRec.do?method=deletePishi",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的批示！")}})},OnServiceGridSelect:function(e,a,b,c){var d=this;Ext.apply(d.psStore.getProxy(),{extraParams:{ID:a.get("ID_VIEW")}});d.psStore.load()},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}Ext.apply(d.serviceStore.getProxy(),{extraParams:c.getValues()});d.serviceStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()},OnExportProjectBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("FWGL-FWJL-5",function(){c.serviceStore.load({limit:c.serviceStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"服务记录信息表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});