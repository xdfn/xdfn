/**
 * File: app/project/store/ProjectsExportJsonStore.js
 * Author: liusha
 */
 
Ext.define('xdfn.project.store.ProjectsExportJsonStore', {
    extend: 'Ext.data.Store',

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            proxy: {
                type: 'ajax',
                url: './projectMgr.do?method=getProjectList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'V_PRO_NO_VIEW',
                    type: 'string',
                    text: '项目编号'
                },
                {
                    name: 'V_PRO_NAME_VIEW',
                    type: 'string',
                    text: '项目名称'
                },
                {
                    name: 'D_PRO_PRE_TIME_VIEW',
                    type: 'date',
                    text: '预报时间',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'D_LAST_UPDATE_VIEW',
                    type: 'date',
                    text: '项目更新时间',
                    dateFormat: 'Y-m-d H:i:s'
                },
                {
                    name: 'V_PRO_PORER_VIEW',
                    type: 'string',
                    text: '预报人'
                },
                {
                    name: 'V_PRO_SOURCE_VIEW',
                    type: 'string',
                    text: '信息来源'
                },
                {
                    name: 'V_PRO_TYPE_VIEW',
                    type: 'string',
                    text: '项目类别'
                },
                {
                    name: 'V_OFFICE_BRANCH_VIEW',
                    type: 'string',
                    text: '责任办事处'
                },
                {
                    name: 'V_PROVINCE_VIEW',
                    type: 'string',
                    text: '风场所在省'
                },
                {
                    name: 'V_INNER_MANAGER_VIEW',
                    type: 'string',
                    text: '本部责任项目经理'
                },
                {
                    name: 'V_OUT_MANAGER_VIEW',
                    type: 'string',
                    text: '驻外办主任'
                },
                {
                    name: 'V_OUT_MASTER_VIEW',
                    type: 'string',
                    text: '驻外办项目负责人'
                },
                {
                    name: 'V_PRO_PHASE_VIEW',
                    type: 'string',
                    text: '项目所处阶段'
                },
                {
                    name: 'V_FIN_CUSTOM',
                    type: 'string',
                    text: '最终用户（业主）'
                },
                {
                    name: 'V_DESIGN_VIEW',
                    type: 'string',
                    text: '设计院'
                },
                {
                    name: 'V_WIND_ADDR_VIEW',
                    type: 'string',
                    text: '风场地址'
                },
                {
                    name: 'V_WIND_TYPE_VIEW',
                    type: 'string',
                    text: '风场类别'
                },
                {
                    name: 'V_PRO_PROCESS_VIEW',
                    type: 'string',
                    text: '项目审批进度'
                }
            ]
        }, cfg)]);
    }
});