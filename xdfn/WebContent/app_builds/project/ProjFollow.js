Ext.define("xdfn.project.ProjFollow",{extend:"xdfn.project.ui.ProjFollow",grid:null,initComponent:function(){var a=this;a.followStore=Ext.create("xdfn.project.store.ProjFollowJsonStore");a.psStore=Ext.create("xdfn.project.store.PSListJsonStore");a.callParent(arguments);a.down('button[text="增加记录"]').on("click",a.OnAddProjFollowBtnClick,a);a.down('button[text="修改记录"]').on("click",a.OnModifyProjFollowBtnClick,a);a.down('button[text="删除记录"]').on("click",a.OnDeleteProjFollowBtnClick,a);a.down('button[text="增加批示"]').on("click",a.OnAddPSBtnClick,a);a.down('button[text="修改批示"]').on("click",a.OnModifyPSBtnClick,a);a.down('button[text="删除批示"]').on("click",a.OnDeletePSBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportFollowBtnClick,a);a.down("gridpanel").on("select",a.OnProjFollowGridSelect,a);a.down("gridpanel").on("itemdblclick",a.OnProjFollowGridItemDbClick,a);a.followStore.on("load",a.OnFollowStoreLoad,a)},OnFollowStoreLoad:function(b,a,e,c){var d=this;Ext.apply(d.psStore.getProxy(),{extraParams:{}});d.psStore.loadRawData([])},OnAddProjFollowBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=d.grid.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-8",function(){if(f.length>0){Ext.create("xdfn.project.ProjFollowWindow",{url:"./projectMgr.do?method=addProFollow",grid:c,ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的项目！")}})},OnProjFollowGridItemDbClick:function(b,a,h,d,i,f){var g=this;var c=Ext.create("xdfn.project.ProjFollowWindow",{title:"查看跟进记录",enableSubmit:false});c.down("form").getForm().load({url:"./projectMgr.do?method=findProFollowById",params:{ID:a.get("ID_VIEW")},method:"get",success:function(e,j){c.show()},failure:function(e,j){c.destroy();Ext.Msg.alert("提示","无法查看！")}})},OnModifyProjFollowBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-9",function(){if(f.length>0){var e=Ext.create("xdfn.project.ProjFollowWindow",{title:"修改跟进记录",url:"./projectMgr.do?method=modifyProFollow",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./projectMgr.do?method=findProFollowById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的跟进记录！")}})},OnDeleteProjFollowBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-10",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该跟进记录吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./projectMgr.do?method=deleteProFollow",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}else{a.fireEvent("load",a)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的跟进记录！")}})},OnAddPSBtnClick:function(a,g,b){var d=this,c=d.down("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-12",function(){if(f.length>0){Ext.create("xdfn.project.PSWindow",{url:"./projectMgr.do?method=addProFollowPS",grid:a.up("gridpanel"),ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的跟进记录！")}})},OnModifyPSBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-13",function(){if(f.length>0){var e=Ext.create("xdfn.project.PSWindow",{title:"修改批示",url:"./projectMgr.do?method=modifyProFollowPS",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./projectMgr.do?method=findProFollowPSById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的批示！")}})},OnDeletePSBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-14",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该批示吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./projectMgr.do?method=deleteProFollowPS",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的批示！")}})},OnProjFollowGridSelect:function(e,a,b,c){var d=this;Ext.apply(d.psStore.getProxy(),{extraParams:{ID:a.get("ID_VIEW")}});d.psStore.loadPage(1)},OnExportFollowBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("XMGL-XMZL-11",function(){c.followStore.load({limit:c.followStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"项目跟进信息表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});