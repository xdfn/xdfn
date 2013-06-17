Ext.define("xdfn.project.ProjExecFiles",{extend:"xdfn.project.ui.ProjFiles",title:"合同执行期档案",grid:null,initComponent:function(){var a=this;a.filesStore=Ext.create("xdfn.project.store.ProjFilesJsonStore",{proxy:{type:"ajax",url:"./proExec.do?method=getProWldaList",reader:{type:"json",root:"data"}}});a.fileslistStore=Ext.create("xdfn.project.store.ProjFilesListJsonStore",{proxy:{type:"ajax",url:"./proExec.do?method=getProFileList",reader:{type:"json",root:"data"}}});a.callParent(arguments);a.down('button[text="增加记录"]').on("click",a.OnAddProjFilesBtnClick,a);a.down('button[text="修改记录"]').on("click",a.OnModifyProjFilesBtnClick,a);a.down('button[text="删除记录"]').on("click",a.OnDeleteProjFilesBtnClick,a);a.down('button[text="增加档案"]').on("click",a.OnAddFilesBtnClick,a);a.down('button[text="修改档案"]').on("click",a.OnModifyFilesBtnClick,a);a.down('button[text="删除档案"]').on("click",a.OnDeleteFilesBtnClick,a);a.down('button[text="导出"]').on("click",a.OnExportFilesBtnClick,a);a.down("gridpanel").on("select",a.OnProjFilesGridSelect,a);a.filesStore.on("load",a.OnFilesStoreLoad,a)},OnFilesStoreLoad:function(b,a,e,c){var d=this;Ext.apply(d.fileslistStore.getProxy(),{extraParams:{}});d.fileslistStore.loadRawData([])},OnAddProjFilesBtnClick:function(a,f,b){var d=this,c=a.up("gridpanel"),g=d.grid.getSelectionModel();rows=g.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-14",function(){if(rows.length>0){Ext.create("xdfn.project.ProjFilesWindow",{url:"./proExec.do?method=addProWlda",grid:c,ID:rows[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的项目！")}})},OnModifyProjFilesBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-15",function(){if(f.length>0){var e=Ext.create("xdfn.project.ProjFilesWindow",{title:"修改往来记录",url:"./proExec.do?method=modifyProWlda",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./proExec.do?method=findProWldaById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的往来记录！")}})},OnDeleteProjFilesBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-16",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该往来记录吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./proExec.do?method=deleteProWlda",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}else{a.fireEvent("load",a)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的往来记录！")}})},OnAddFilesBtnClick:function(a,g,b){var d=this,c=d.down("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-18",function(){if(f.length>0){Ext.create("xdfn.project.ProjFilesListWindow",{url:"./proExec.do?method=addProFile",grid:a.up("gridpanel"),ID:f[0].get("ID_VIEW")}).show()}else{Ext.Msg.alert("提示","请先选择相应的往来记录！")}})},OnModifyFilesBtnClick:function(a,g,b){var d=this,c=a.up("gridpanel"),h=c.getSelectionModel(),f=h.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-19",function(){if(f.length>0){var e=Ext.create("xdfn.project.ProjFilesListWindow",{title:"修改档案",url:"./proExec.do?method=modifyProFile",grid:c,ID:f[0].get("ID_VIEW")});e.down("form").getForm().load({url:"./proExec.do?method=findProFileById",params:{ID:f[0].get("ID_VIEW")},method:"get",success:function(i,j){Ext.apply(i.findField("V_FILE_ATT"),{allowBlank:true});e.show()},failure:function(i,j){e.destroy();Ext.Msg.alert("提示","无法修改！")}})}else{Ext.Msg.alert("提示","请选择要修改的档案！")}})},OnDeleteFilesBtnClick:function(b,h,c){var f=this,d=b.up("gridpanel"),a=d.getStore(),i=d.getSelectionModel(),g=i.getSelection();xdfn.user.Rights.hasRights("XMGL-ZXGL-20",function(){if(g.length>0){Ext.MessageBox.confirm("提示","确定删除该档案吗？",function(e){if(e=="yes"){Ext.Ajax.request({url:"./proExec.do?method=deleteProFile",method:"get",params:{ID:g[0].get("ID_VIEW")},success:function(j,m){var k=a.indexOf(g[0]);a.remove(g);var l=a.getCount();if(l>0){i.select((k==l)?--k:k)}},failure:function(j,k){Ext.Msg.alert("提示","删除失败！")}})}})}else{Ext.Msg.alert("提示","请选择要删除的档案！")}})},OnProjFilesGridSelect:function(e,a,b,c){var d=this;Ext.apply(d.fileslistStore.getProxy(),{extraParams:{ID:a.get("ID_VIEW")}});d.fileslistStore.loadPage(1)},OnExportFilesBtnClick:function(a,d,b){var c=this;xdfn.user.Rights.hasRights("XMGL-ZXGL-17",function(){c.filesStore.load({limit:c.filesStore.getTotalCount(),scope:this,callback:function(g,f,h){var e=Ext.ux.exporter.Exporter.exportGrid(a.up("gridpanel"),"excel",{title:"合同执行档案表"});document.location="data:application/vnd.ms-excel;base64,"+Ext.ux.exporter.Base64.encode(e)}})})}});