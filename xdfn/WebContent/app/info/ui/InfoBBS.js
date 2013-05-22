/**
 * File: app/info/ui/InfoBBS.js
 * Author: liusha
 */

Ext.define('xdfn.info.ui.InfoBBS', {
    extend: 'Ext.panel.Panel',

    id: 'InfoBBS',
    closable: true,
    iconCls: 'info_tabs',
    title: '风吧',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
});