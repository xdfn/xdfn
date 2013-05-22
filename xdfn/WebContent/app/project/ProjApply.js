/**
 * File: app/project/ProjApplyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjApply', {
    extend: 'xdfn.project.ui.ProjApply',

    grid: null,
    
    initComponent: function() {
        var me = this;

        me.applyStore = Ext.create('xdfn.project.store.ProjApplyJsonStore');
        
        me.callParent(arguments);
        
        me.down('button[text="项目报送"]').on('click', me.OnProjApplyBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportApplyBtnClick, me);
    },
    
    OnProjApplyBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = me.grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMZL-6', function() {
	    	if (rows.length > 0) {
	    		var wForm = Ext.create('xdfn.project.ProjApplyWindow', {
		    		url: './projectMgr.do?method=addProApply',
		    	    grid: grid,
		    	    ID: rows[0].get('ID_VIEW')
		    	});
		    	wForm.down('form').getForm().setValues({
		    	    V_OLD_TYPE: rows[0].get('V_PRO_PHASE_VIEW')
		    	});
		    	wForm.show();
	    	} else {
	    		Ext.Msg.alert('提示','请先选择相应的项目！');
	    	}
    	});
    },
    
    OnExportApplyBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMZL-7', function() {
    		me.applyStore.load({
       	    	limit: me.applyStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目报送表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});