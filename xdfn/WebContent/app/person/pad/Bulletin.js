/**
 * File: app/person/pad/Bulletin.js
 * Author: liusha
 */
 
Ext.define('xdfn.person.pad.Bulletin', {
    extend: 'Ext.ux.portal.Portlet',

    id: 'bulletin',
    title: '公告栏',
    height: 220,
    bodyPadding: '5 0 2 5',
    tpl: new Ext.XTemplate(
        '<ul class="bull-line">',
        '<tpl for=".">',
        '<li><a href="infoPub.do?method=bulletinById&ID={ID_VIEW}" target="_blank">{V_TITLE_VIEW}</a></li>',
        '</tpl>',
        '</ul>'
    ),
    loader: {
    	autoLoad: true,
    	url: 'infoPub.do?method=getBulletinList',
    	renderer: 'data',
    	success: function(loader, response, options) {
            var result = Ext.JSON.decode(response.responseText);
            loader.getTarget().update(result.data);
            return true;
        }
    },
    listeners: {
    	'destroy': function(self, eOpts) {
    		Ext.getCmp('PersonPad').down('menucheckitem[text="公告栏"]').setChecked(false);
    	}
    },
    
    getTools: function(){
    	var me = this;
        return [{
            xtype: 'tool',
            type: 'refresh',
            handler: function(e, target, panelHeader, tool){
                var portlet = panelHeader.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                	me.getLoader().load();
                    portlet.setLoading(false);
                }, 500);
            }
        }];
    },
    
    initComponent: function() {
        var me = this;
        me.tools = me.getTools();
        me.callParent(arguments);
    }
});