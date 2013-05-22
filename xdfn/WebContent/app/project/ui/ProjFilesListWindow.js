/**
 * File: app/project/ui/ProjFilesListWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjFilesListWindow', {
    extend: 'Ext.window.Window',

    height: 364,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '增加档案',
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
                        width: 455,
                        name: 'V_FILENAME',
                        fieldLabel: '档案名称',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入档案名称',
                        enforceMaxLength: true,
                        maxLength: 150
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_CODE',
                        fieldLabel: '档案编号',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入编号',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'combobox',
                        margin: '5 25 10 0',
                        name: 'V_TYPE',
                        fieldLabel: '档案类别',
                        queryMode: 'local',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择...',
                        store: 'FilesTypeStore',
                        displayField: 'V_COMBOX_NAME_VIEW',
                        valueField: 'V_COMBOX_VALUE_VIEW',
                        editable: false
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_RECEIVER',
                        fieldLabel: '接收人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入接收人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'textfield',
                        margin: '5 25 10 0',
                        name: 'V_SENDER',
                        fieldLabel: '提交人',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请输入提交人',
                        enforceMaxLength: true,
                        maxLength: 20
                    },
                    {
                        xtype: 'filefield',
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_FILE_ATT',
                        fieldLabel: '附件链接',
                        allowBlank: false,
                        blankText: '不能为空！',
                        emptyText: '请选择附件',
                        buttonText: '选择附件'
                    },
                    {
                        xtype: 'textareafield',
                        height: 110,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_MEMO',
                        fieldLabel: '备注',
                        enforceMaxLength: true,
                        maxLength: 500
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