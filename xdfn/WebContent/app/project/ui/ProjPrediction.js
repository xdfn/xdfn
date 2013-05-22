/**
 * File: app/project/ui/ProjPrediction.js
 * Author: liusha
 */

Ext.define('xdfn.project.ui.ProjPrediction', {
    extend: 'Ext.panel.Panel',

    id: 'ProjPrediction',
    closable: true,
    iconCls: 'project_tabs',
    title: '项目预报',

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
});