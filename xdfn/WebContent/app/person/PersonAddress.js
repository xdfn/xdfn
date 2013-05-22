/**
 * File: app/person/PersonAddress.js
 * Author: liusha
 */

Ext.define('xdfn.person.PersonAddress', {
    extend: 'xdfn.person.ui.PersonAddress',
    
    initComponent: function() {
        var me = this;
        
        me.addrStore = Ext.create('xdfn.person.store.PersonAddressJsonStore');
        
        me.callParent(arguments);

        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportBtnClick, me);
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	    	
    	Ext.apply(me.addrStore.getProxy(), {
    		url: './userManage.do?method=getAddrList',
    	    extraParams:{
    	        V_USER_NAME: me.down('textfield[name=V_USER_NAME]').getValue(),
    	        V_DEPT_ID: me.down('combotree[name=V_DEPT_ID]').getSubmitValue()
    	    }
    	});
    	me.addrStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	var me = this;
    	me.down('textfield[name=V_USER_NAME]').reset();
    	me.down('combotree[name=V_DEPT_ID]').reset();
    },
    
    OnExportBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('GRPT-TXL-2', function() {
    		me.addrStore.load({
       	    	limit: me.addrStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '通讯录'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});