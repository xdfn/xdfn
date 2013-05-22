/**
 * File: app/project/ProjReview.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ProjReview', {
    extend: 'xdfn.project.ui.ProjReview',

    initComponent: function() {
        var me = this;

        me.reviewStore = Ext.create('xdfn.project.store.ProjApplyJsonStore', {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProApplyAuditList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
                
        me.callParent(arguments);
        
        me.down('button[text="审核项目"]').on('click', me.OnReviewProjectBtnClick, me);
        me.down('button[text="删除审核"]').on('click', me.OnDeleteReviewBtnClick, me);
        me.down('button[text="查找"]').on('click', me.OnSearchBtnClick, me);
        me.down('button[text="重置"]').on('click', me.OnResetBtnClick, me);
        me.down('button[text="导出"]').on('click', me.OnExportReviewBtnClick, me);
    },
    
    OnReviewProjectBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMSH-2', function() {    
	    	if (rows.length > 0) {
	    		if (rows[0].get('V_REVIEW_STATUS_VIEW') == "未审核") {
					var wForm = Ext.create('xdfn.project.ProjReviewWindow', {
			    		url: './projectMgr.do?method=proApplyAudit',
			    		ID: rows[0].get('ID_VIEW'),
			    	    grid: grid
			    	});
			    	wForm.down('form').getForm().setValues({
			    	   V_PRO_NAME: rows[0].get('V_PRO_NAME_VIEW'),
			    	   V_OLD_TYPE: rows[0].get('V_OLD_TYPE_VIEW'),
			    	   V_TYPE: rows[0].get('V_TYPE_VIEW'),
			    	   V_REVIEW_MEMO: rows[0].get('V_REVIEW_MEMO_VIEW')
			    	});
			    	wForm.show();
	    	    } else {
	    	    	Ext.Msg.alert('提示','该项已经审核过了！');
	    	    }
	    	} else {
	    		Ext.Msg.alert('提示','请选择要审核的项目！');
	    	}
    	});
    },
    
    OnDeleteReviewBtnClick: function(self, e, options) {
    	var me = this,
    	    grid = self.up('gridpanel'),
    	    store = grid.getStore(),
    	    sm = grid.getSelectionModel(),
    	    rows = sm.getSelection();
    	    
    	xdfn.user.Rights.hasRights('XMGL-XMSH-3', function() {
	    	if (rows.length > 0) {
	    		Ext.MessageBox.confirm('提示', '确定删除该审核项吗？', function(id) {
	            	if (id == 'yes') {
	            		//TODO 删除审核项
		    			Ext.Ajax.request({
				    	    url: './projectMgr.do?method=deleteApplyAudit',
				    	    method: 'get',
				    	    params: {
				    	    	ID: rows[0].get('ID_VIEW')
				    	    },
				    	    success: function(response, opts) {
							    var i = store.indexOf(rows[0]);
				    	    	    
				    	    	store.remove(rows);
				    	    	
				    	    	var count = store.getCount();
				    	    	
				    	    	if (count > 0) {
				    	    		sm.select((i == count)? --i : i);
				    	    	}
							},
							failure: function(response, opts) {
								Ext.Msg.alert('提示','删除失败！');
							}
				    	});
	                }
	            });
	    	} else {
	    		Ext.Msg.alert('提示','请选择要删除的审核项！');
	    	}
    	});
    },
    
    OnSearchBtnClick: function(self, e, options) {
    	var me = this;
    	
    	var form = self.up('form').getForm();
    	if (!form.isValid()) return;
    	Ext.apply(me.reviewStore.getProxy(), {
    	     extraParams: form.getValues()
    	});
    	me.reviewStore.loadPage(1);
    },
    
    OnResetBtnClick: function(self, e, options) {
    	self.up('form').getForm().reset();
    },
    
    OnExportReviewBtnClick: function(self, e, options) {
    	var me = this;
    	//导出为excel文件
    	xdfn.user.Rights.hasRights('XMGL-XMSH-4', function() {
    		me.reviewStore.load({
       	    	limit: me.reviewStore.getTotalCount(),
       	    	scope: this,
       	    	callback: function(records, operation, success) {
       	    		var excelXml = Ext.ux.exporter.Exporter.exportGrid(self.up('gridpanel'), 'excel', {title: '项目审核表'});
        		    document.location = 'data:application/vnd.ms-excel;base64,' + Ext.ux.exporter.Base64.encode(excelXml);
       	    	}
       	    });
    	});
    }
});