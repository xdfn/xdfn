/**
 * File: app/project/ui/ProjApplyWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjApplyWindow', {
    extend: 'Ext.window.Window',

    height: 228,
    width: 514,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '项目报送',
    modal: true,

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'column'
                },
                bodyPadding: 10,
                bodyStyle: 'background-color:#d8e6f4;border:0px',
                items: [
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        width: 165,
                        name: 'V_OLD_TYPE',
                        readOnly: true,
                        fieldLabel: '现在阶段'
                    },
                    {
                        xtype: 'image',
                        height: 25,
                        margin: '5 25 10 0',
                        src: 'resources/images/arrow_right.png',
                        weight: 25
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE',
                        fieldLabel: '报送阶段',
                        allowBlank: false,
                        blankText: '不能为空！',
                        editable: false,
                        queryMode: 'local',
                        store: 'ProjPhaseStore',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW'
                    },
                    {
                        xtype: 'textareafield',
                        height: 85,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_SUBMIT_MEMO',
                        fieldLabel: '报送说明',
                        allowBlank: false,
                        blankText: '不能为空！',
                        enforceMaxLength: true,
                        maxLength: 200
                    },
                    {
                        xtype: 'button',
                        margin: '5 10 10 325',
                        width: 60,
                        iconCls: 'ok_btn',
                        text: '提交'
                    },
                    {
                        xtype: 'button',
                        margin: '5 25 10 0',
                        width: 60,
                        iconCls: 'stop_btn',
                        text: '关闭'
                    }
                ]
            }
        ];
        me.callParent(arguments);
    }
});