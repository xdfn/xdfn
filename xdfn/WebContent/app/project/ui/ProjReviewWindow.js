/**
 * File: app/project/ui/ProjReviewWindow.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.ui.ProjReviewWindow', {
    extend: 'Ext.window.Window',

    height: 318,
    width: 515,
    resizable: false,
    layout: {
        type: 'fit'
    },
    iconCls: 'project_tabs',
    title: '项目审核',
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
                        name: 'V_PRO_NAME',
                        readOnly: true,
                        submitValue: false,
                        fieldLabel: '项目名称',
                        enforceMaxLength: true,
                        maxLength: 50
                    },
                    {
                        xtype: 'displayfield',
                        margin: '5 25 10 0',
                        name: 'V_OLD_TYPE',
                        submitValue: false,
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
                        xtype: 'displayfield',
                        margin: '5 25 10 0',
                        name: 'V_TYPE',
                        submitValue: false,
                        fieldLabel: '报送阶段'
                    },
                    {
					    xtype: 'checkboxfield',
					    margin: '5 25 10 0',
					    name: 'B_AGREE',
					    checked: false,
					    boxLabel: '同意'
					},
                    {
                        xtype: 'textareafield',
                        height: 137,
                        margin: '5 25 10 0',
                        width: 455,
                        name: 'V_REVIEW_MEMO',
                        fieldLabel: '审核说明',
                        allowBlank: false,
                        blankText: '不能为空！',
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