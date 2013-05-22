Ext.define("xdfn.customer.CustomInfo",{extend:"xdfn.customer.ui.CustomInfo",initComponent:function(){var a=this;a.custStore=Ext.create("xdfn.customer.store.CustomInfoJsonStore");a.linkStore=Ext.create("xdfn.customer.store.CustomLinkJsonStore");a.callParent(arguments);a.down('button[text="增加客户"]').on("click",a.OnAddCustomBtnClick,a);a.down('button[text="修改客户"]').on("click",a.OnModifyCustomBtnClick,a);a.down('button[text="删除客户"]').on("click",a.OnDeleteCustomBtnClick,a);a.down('button[text="增加联系人"]').on("click",a.OnAddLinkBtnClick,a);a.down('button[text="修改联系人"]').on("click",a.OnModifyLinkBtnClick,a);a.down('button[text="删除联系人"]').on("click",a.OnDeleteLinkBtnClick,a);a.down('button[text="查找"]').on("click",a.OnSearchBtnClick,a);a.down('button[text="重置"]').on("click",a.OnResetBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportCustomerBtnClick,a);a.down('button[text="导出 "]').on("click",a.OnExportLinkBtnClick,a);a.down("gridpanel").on("select",a.OnCustomerGridSelect,a);a.down("gridpanel").on("itemdblclick",a.OnCustomerGridItemDbClick,a);a.down('gridpanel[title="客户联系人"]').on("itemdblclick",a.OnLinkGridItemDbClick,a);a.custStore.on("load",a.OnCustomStoreLoad,a)},OnCustomStoreLoad:function(b,a,e,c){var d=this;Ext.apply(d.linkStore.getProxy(),{extraParams:{}});d.linkStore.loadRawData([])},OnAddCustomBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("KHGL-KHXX-2",function(){Ext.create("xdfn.customer.CustomInfoWindow",{url:"./cusManage.do?method=addCusInfo",grid:a.up("gridpanel")}).show()})},OnCustomerGridItemDbClick:function(b,a,h,d,i,f){var g=this;var c=Ext.create("xdfn.customer.CustomInfoWindow",{title:"查看客户",enableSubmit:false});c.down("form").getForm().load({url:"./cusManage.do?method=findCusById",params:{ID:a.get("ID_VIEW")},method:"get",success:function(e,j){c.show()},failure:function(e,j){c.destroy();Ext.Msg.alert("提示","无法查看！")}})},OnModifyCustomBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("KHGL-KHXX-3",function(){if(f.length>0){var e=Ext.create("xdfn.customer.CustomInfoWindow",{title:"修改客户",url:"./cusManage.do?method=modifyCusInfo",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./cusManage.do?method=findCusById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的客户！")}})},OnDeleteCustomBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("KHGL-KHXX-4",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该客户吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./cusManage.do?method=deleteCus",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}else{a.fireEvent("load",a)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的客户！")}})},OnAddLinkBtnClick:function(a,g,b){var d=this,c=d.down("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("KHGL-KHXX-6",function(){if(f.length>0){Ext.create("xdfn.customer.CustomLinkWindow",{url:"./cusManage.do?method=addCusRela",grid:a.up("gridpanel"),ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的客户！")}})},OnLinkGridItemDbClick:function(b,a,h,d,i,f){var g=this;var c=Ext.create("xdfn.customer.CustomLinkWindow",{title:"查看联系人",enableSubmit:false});c.down("form").getForm().load({url:"./cusManage.do?method=findCusLinkById",params:{ID:a.get("ID_VIEW")},method:"get",success:function(e,j){c.show()},failure:function(e,j){c.destroy();Ext.Msg.alert("提示","无法查看！")}})},OnModifyLinkBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("KHGL-KHXX-7",function(){if(f.length>0){var e=Ext.create("xdfn.customer.CustomLinkWindow",{title:"修改联系人",url:"./cusManage.do?method=modifyCusRela",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./cusManage.do?method=findCusLinkById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的联系人！")}})},OnDeleteLinkBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("KHGL-KHXX-8",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该联系人吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./cusManage.do?method=delCusRela",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的联系人！")}})},OnSearchBtnClick:function(a,f,b){var d=this;var c=a.up("form").getForm();Ext.apply(d.custStore.getProxy(),{extraParams:c.getValues()});d.custStore.load()},OnResetBtnClick:function(a,c,b){a.up("form").getForm().reset()},OnCustomerGridSelect:function(e,a,b,c){var d=this;Ext.apply(d.linkStore.getProxy(),{extraParams:{ID:a.get("ID_VIEW")}});d.linkStore.load()},OnExportCustomerBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("KHGL-KHXX-5",function(){c.custStore.load({limit:c.custStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"客户信息表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})},OnExportLinkBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("KHGL-KHXX-9",function(){c.linkStore.load({limit:c.linkStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"客户联系人信息表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});