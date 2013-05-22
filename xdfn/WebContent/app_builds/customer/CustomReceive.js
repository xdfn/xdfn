Ext.define("xdfn.customer.CustomReceive",{extend:"xdfn.customer.ui.CustomReceive",initComponent:function(){var a=this;a.recStore=Ext.create("xdfn.customer.store.CustomReceiveJsonStore");a.callParent(arguments);a.down('button[text="增加记录"]').on("click",a.OnAddRecBtnClick,a);a.down('button[text="修改记录"]').on("click",a.OnModifyRecBtnClick,a);a.down('button[text="删除记录"]').on("click",a.OnDeleteRecBtnClick,a);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportCustomerRecBtnClick,a);a.down("gridpanel").on("itemdblclick",a.OnRecGridItemDbClick,a)},OnAddRecBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("KHGL-KHJD-2",function(){Ext.create("xdfn.customer.CustomRecWindow",{url:"./cusManage.do?method=addCusRec",grid:a.up("gridpanel")}).show()})},OnRecGridItemDbClick:function(b,a,h,d,i,f){var g=this;var c=Ext.create("xdfn.customer.CustomRecWindow",{title:"查看记录",enableSubmit:false});c.down("form").getForm().load({url:"./cusManage.do?method=findCusRecById",params:{ID:a.get("ID_VIEW")},method:"get",success:function(e,j){c.show()},failure:function(e,j){c.destroy();Ext.Msg.alert("提示","无法查看！")}})},OnModifyRecBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("KHGL-KHJD-3",function(){if(f.length>0){var e=Ext.create("xdfn.customer.CustomRecWindow",{title:"修改记录",url:"./cusManage.do?method=modifyCusRec",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./cusManage.do?method=findCusRecById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的记录！")}})},OnDeleteRecBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("KHGL-KHJD-4",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该记录吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./cusManage.do?method=deleteCusRec",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的记录！")}})},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();if(!c.isValid()){return}Ext.apply(d.recStore.getProxy(),{extraParams:c.getValues()});d.recStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()},OnExportCustomerRecBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("KHGL-KHJD-5",function(){c.recStore.load({limit:c.recStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"客户接待信息表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});