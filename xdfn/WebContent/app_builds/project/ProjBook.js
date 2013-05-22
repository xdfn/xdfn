Ext.define("xdfn.project.ProjBook",{extend:"xdfn.project.ui.ProjBook",grid:null,initComponent:function(){var a=this;a.bookStore=Ext.create("xdfn.project.store.ProjBookJsonStore");a.rowEditing=Ext.create("Ext.grid.plugin.RowEditing",{errorSummary:false});a.callParent(arguments);a.down('button[text="增加标书"]').on("click",a.OnAddProjBookBtnClick,a);a.down('button[text="删除标书"]').on("click",a.OnDeleteProjBookBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportBookBtnClick,a);a.rowEditing.on("edit",a.OnGridEdit,a);a.rowEditing.on("beforeedit",a.OnGridBeforeEdit,a)},OnGridBeforeEdit:function(b,c,a){xdfn.user.Rights.noRights("XMGL-XMZL-23",function(){b.cancelEdit()})},OnGridEdit:function(b,f){var c=this;if(!f.record.dirty){return}var a="./proExec.do?method=modifyBidbook";if(Ext.isEmpty(f.record.get("ID_VIEW"))){var d=c.grid.getSelectionModel().getSelection();f.record.set("ID_VIEW",d[0].get("ID_VIEW"));a="./proExec.do?method=addBidbook"}f.record.commit();Ext.Ajax.request({url:a,method:"post",params:{ID:f.record.get("ID_VIEW"),V_BID_CODE:f.record.get("V_BID_CODE_VIEW"),V_BID_ADDR:f.record.get("V_BID_ADDR_VIEW"),V_BID_STATE:f.record.get("V_BID_STATE_VIEW"),D_BID_DEATH_DATE:Ext.util.Format.date(f.record.get("D_BID_DEATH_DATE_VIEW"),"Y-m-d"),D_BID_OPEN_DATE:Ext.util.Format.date(f.record.get("D_BID_OPEN_DATE_VIEW"),"Y-m-d"),V_DELEGATE:f.record.get("V_DELEGATE_VIEW"),V_TENDERS:f.record.get("V_TENDERS_VIEW"),V_AUDI:f.record.get("V_AUDI_VIEW")},success:function(g,h){var e=Ext.JSON.decode(g.responseText);f.record.set(e.data);f.record.commit()},failure:function(e,g){Ext.Msg.alert("提示","提交失败！")}})},OnAddProjBookBtnClick:function(a,f,b){var c=this,g=c.grid.getSelectionModel(),d=g.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-22",function(){if(d.length>0){c.rowEditing.cancelEdit();c.bookStore.insert(0,{});c.rowEditing.startEdit(0,0)}else{Ext.Msg.alert("提示","请先选择相应的项目！")}})},OnDeleteProjBookBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-XMZL-24",function(){if(g.length>0){if(Ext.isEmpty(g[0].get("ID_VIEW"))){f.rowEditing.cancelEdit();var e=a.indexOf(g[0]);a.remove(g);var j=a.getCount();if(j>0){i.select((e==j)?--e:e)}return}Ext.MessageBox.confirm("提示","确定删除该标书吗？",function(k){if(k=="yes"){Ext.Ajax.request({url:"./proExec.do?method=deleteBidbook",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(l,o){f.rowEditing.cancelEdit();var m=a.indexOf(g[0]);a.remove(g);var n=a.getCount();if(n>0){i.select((m==n)?--m:m)}},failure:function(l,m){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的标书！")}})},OnExportBookBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("XMGL-XMZL-25",function(){c.bookStore.load({limit:c.bookStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"项目标书"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});