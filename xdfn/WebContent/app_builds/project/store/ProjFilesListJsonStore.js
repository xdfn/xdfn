Ext.define("xdfn.project.store.ProjFilesListJsonStore",{extend:"Ext.data.Store",constructor:function(a){var b=this;a=a||{};b.callParent([Ext.apply({proxy:{type:"ajax",url:"./projectMgr.do?method=getProFileList",reader:{type:"json",root:"data"}},fields:[{name:"ID_VIEW",type:"string"},{name:"V_FILENAME_VIEW",type:"string"},{name:"V_CODE_VIEW",type:"string"},{name:"V_TYPE_VIEW",type:"string"},{name:"V_RECEIVER_VIEW",type:"string"},{name:"V_SENDER_VIEW",type:"string"},{name:"V_MEMO_VIEW",type:"string"},{name:"V_FILE_ATT_VIEW",type:"string"}]},a)])}});