/**
 * File: app/person/pad/Wnl.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.pad.Wnl', {
    extend: 'Ext.ux.portal.Portlet',

    uses: [
        'Ext.ux.wnl.Wnl'
    ],
    id: 'wnl',
	title: '万年历',
	height: 336,
    listeners: {
    	'destroy': function(self, eOpts) {
    		Ext.getCmp('PersonPad').down('menucheckitem[text="万年历"]').setChecked(false);
    	}
    },
    
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'gear',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Working...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },
    
    initComponent: function() {
        var me = this;
        me.tools = me.getTools();
        me.items = [
            Ext.create('Ext.ux.wnl.Wnl')
        ];
        me.callParent(arguments);
    }
});