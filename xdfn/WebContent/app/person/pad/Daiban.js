/**
 * File: app/person/pad/Daiban.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.pad.Daiban', {
    extend: 'Ext.ux.portal.Portlet',

    id: 'daiban',
    title: '待办日程',
    layout: {
        type: 'fit'
    },
    height: 268,
    listeners: {
    	'destroy': function(self, eOpts) {
    		Ext.getCmp('PersonPad').down('menucheckitem[text="待办日程"]').setChecked(false);
    	}
    },
    
    getTools: function(){
    	var me = this;
        return [{
            xtype: 'tool',
            type: 'refresh',
            handler: function(e, target, panelHeader, tool){
                //var portlet = panelHeader.ownerCt;
                //portlet.setLoading('Loading...');
                me.schStore.load();
            }
        }];
    },
    
    initComponent: function() {
        var me = this;
        
        me.schStore = Ext.create('xdfn.person.store.ScheduleJsonStore', {
        	autoLoad: true,
            proxy: {
                type: 'ajax',
                url: './userManage.do?method=getAgendaList', //显示未完成的事项，按时间排序
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });
        me.tools = me.getTools();
        me.items = [
           {
                xtype: 'gridpanel',
                forceFit: true,
                store: me.schStore,
                flex: 1,
                border: false,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'ID_VIEW',
                        text: 'ID',
                        hidden: true,
                        hideable: false
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TITLE_VIEW',
                        width: 200,
                        text: '日程标题'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TYPE_SHIYOU_VIEW',
                        text: '事由类型'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_TYPE_BELONG_VIEW',
                        text: '归属类型'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'V_LEVEL_VIEW',
                        text: '等级'
                    }
                ],
                viewConfig: {

                },
                dockedItems: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        store: me.schStore,
                        dock: 'bottom'
                    }
                ]
            }
        ];
        me.callParent(arguments);
        
        me.down('gridpanel').on('itemdblclick', me.OnGridItemDbClick, me);
    },
    
    OnGridItemDbClick: function(view, record, item, index, e, eOpts) {
    	var me = this,
    	    tabPanel = me.up('tabpanel'),
    	    currentTab = Ext.getCmp('PersonSchedule');
	    if (currentTab == undefined) {
	    	tabPanel.setActiveTab(tabPanel.add(Ext.create('xdfn.person.PersonSchedule', {ID: record.get('ID_VIEW')})));
	    } else {
	    	tabPanel.setActiveTab(currentTab);
	    	var store = currentTab.down('gridpanel').getStore();
	    	Ext.apply(store.getProxy(), {
	    	    extraParams:{
	    	        ID: record.get('ID_VIEW')
	    	    }
	    	});
	    	store.load();
	    }
    }
});