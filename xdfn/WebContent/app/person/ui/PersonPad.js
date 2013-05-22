/**
 * File: app/person/ui/PersonPad.js
 * Author: liusha
 */

Ext.define('xdfn.person.ui.PersonPad', {
    extend: 'Ext.panel.Panel',

    uses: [
        'Ext.ux.portal.PortalPanel',
        'Ext.ux.portal.Portlet'
    ],
    id: 'PersonPad',
    layout: {
        type: 'fit'
    },
    border: false,
    iconCls: 'person_tabs',
    title: '个人平台',
    
    initComponent: function() {
        var me = this;
        
        me.newsTpl = 
        
        me.items = [
			Ext.create('Ext.ux.portal.PortalPanel', {
				items: [
			        Ext.create('Ext.ux.portal.PortalColumn', {
			        	id: 'PortalCol1',
			            items: [
			                Ext.create('xdfn.person.pad.Bulletin'),
			                Ext.create('xdfn.person.pad.News')
			            ]
			        }),
			        Ext.create('Ext.ux.portal.PortalColumn', {
			        	id: 'PortalCol2',
			            items: [
			                Ext.create('xdfn.person.pad.Daiban'),
			                Ext.create('xdfn.person.pad.Projects')
			            ]
			        }),
			        Ext.create('Ext.ux.portal.PortalColumn', {
			        	id: 'PortalCol3',
			            items: [
			                Ext.create('xdfn.person.pad.Wnl')
			            ]
			        })
			     ]
			})
        ];
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
			            xtype: 'splitbutton',
			            text: '小工具',
			            iconCls: 'tools_btn',
			            menu: {
			                xtype: 'menu',
			                items: [
			                    {
			                        xtype: 'menucheckitem',
			                        text: '万年历',
			                        checked: true
			                    },
			                    {
			                        xtype: 'menucheckitem',
			                        text: '公告栏',
			                        checked: true
			                    },
			                    {
			                        xtype: 'menucheckitem',
			                        text: '待办日程',
			                        checked: true
			                    },
			                    {
			                        xtype: 'menucheckitem',
			                        text: '最新资讯',
			                        checked: true
			                    },
			                    {
			                        xtype: 'menucheckitem',
			                        text: '最近项目',
			                        checked: true
			                    }
			                ]
			            }
			        }
                ]
            }
        ];
        me.callParent(arguments);
    }
});