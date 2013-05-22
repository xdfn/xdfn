Ext.define("xdfn.project.ProjExecDispatch",{extend:"xdfn.project.ui.ProjExecDispatch",grid:null,initComponent:function(){var a=this;a.dispStore=Ext.create("xdfn.project.store.ProjExecListJsonStore",{proxy:{type:"ajax",url:"./proExec.do?method=getExecDispList",reader:{type:"json",root:"data"}}});a.rowEditing=Ext.create("Ext.grid.plugin.RowEditing",{errorSummary:false});a.callParent(arguments);a.down('button[text="增加记录"]').on("click",a.OnAddDispatchBtnClick,a);a.down('button[text="删除记录"]').on("click",a.OnDeleteDispatchBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportDispatchBtnClick,a);a.rowEditing.on("edit",a.OnGridEdit,a);a.rowEditing.on("beforeedit",a.OnGridBeforeEdit,a)},OnGridBeforeEdit:function(b,c,a){xdfn.user.Rights.noRights("XMGL-ZXGL-3",function(){b.cancelEdit()})},OnGridEdit:function(b,f){var c=this;if(!f.record.dirty){return}var a="./proExec.do?method=modifyExecDisp";if(Ext.isEmpty(f.record.get("ID_VIEW"))){var d=c.grid.getSelectionModel().getSelection();f.record.set("ID_VIEW",d[0].get("ID_VIEW"));a="./proExec.do?method=addExecDisp"}f.record.commit();Ext.Ajax.request({url:a,method:"post",params:{ID:f.record.get("ID_VIEW"),V_JX_NAME:f.record.get("V_JX_NAME_VIEW"),V_BJ_NAME:f.record.get("V_BJ_NAME_VIEW"),N_F_SUM:f.record.get("N_F_SUM_VIEW"),N_S_SUM:f.record.get("N_S_SUM_VIEW"),D_DISP_DATE:Ext.util.Format.date(f.record.get("D_DISP_DATE_VIEW"),"Y-m-d"),D_RECIEVED_DATE:Ext.util.Format.date(f.record.get("D_RECIEVED_DATE_VIEW"),"Y-m-d"),V_REM:f.record.get("V_REM_VIEW")},success:function(g,h){var e=Ext.JSON.decode(g.responseText);f.record.set(e.data);f.record.commit()},failure:function(e,g){Ext.Msg.alert("提示","提交失败！")}})},OnAddDispatchBtnClick:function(a,f,b){var c=this,d=c.grid.getSelectionModel().getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-2",function(){if(d.length>0){c.rowEditing.cancelEdit();c.dispStore.insert(0,{});c.rowEditing.startEdit(0,0)}else{Ext.Msg.alert("提示","请先选择相应的合同！")}})},OnDeleteDispatchBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-4",function(){if(g.length>0){if(Ext.isEmpty(g[0].get("ID_VIEW"))){var e=a.indexOf(g[0]);a.remove(g);var j=a.getCount();if(j>0){i.select((e==j)?--e:e)}return}Ext.MessageBox.confirm("提示","确定删除该发货记录吗？",function(k){if(k=="yes"){Ext.Ajax.request({url:"./proExec.do?method=delExecDisp",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(l,o){var m=a.indexOf(g[0]);a.remove(g);var n=a.getCount();if(n>0){i.select((m==n)?--m:m)}},failure:function(l,m){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的发货记录！")}})},OnExportDispatchBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("XMGL-ZXGL-5",function(){c.dispStore.load({limit:c.dispStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"发货记录表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});