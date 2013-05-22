Ext.define("Ext.ux.exporter.excelFormatter.Workbook",{constructor:function(a){a=a||{};Ext.apply(this,a,{title:"Workbook",worksheets:[],compiledWorksheets:[],cellBorderColor:"#e4e4e4",styles:[],compiledStyles:[],hasDefaultStyle:true,hasStripeStyles:true,windowHeight:9000,windowWidth:50000,protectStructure:false,protectWindows:false});if(this.hasDefaultStyle){this.addDefaultStyle()}if(this.hasStripeStyles){this.addStripedStyles()}this.addTitleStyle();this.addHeaderStyle()},render:function(){this.compileStyles();this.joinedCompiledStyles=this.compiledStyles.join("");this.compileWorksheets();this.joinedWorksheets=this.compiledWorksheets.join("");return this.tpl.apply(this)},addWorksheet:function(a,b){var c=new Ext.ux.exporter.excelFormatter.Worksheet(a,b);this.worksheets.push(c);return c},addStyle:function(a){var b=new Ext.ux.exporter.excelFormatter.Style(a||{});this.styles.push(b);return b},compileStyles:function(){this.compiledStyles=[];Ext.each(this.styles,function(a){this.compiledStyles.push(a.render())},this);return this.compiledStyles},compileWorksheets:function(){this.compiledWorksheets=[];Ext.each(this.worksheets,function(a){this.compiledWorksheets.push(a.render())},this);return this.compiledWorksheets},tpl:new Ext.XTemplate('<?xml version="1.0" encoding="utf-8"?>','<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">',"<o:DocumentProperties>","<o:Title>{title}</o:Title>","</o:DocumentProperties>","<ss:ExcelWorkbook>","<ss:WindowHeight>{windowHeight}</ss:WindowHeight>","<ss:WindowWidth>{windowWidth}</ss:WindowWidth>","<ss:ProtectStructure>{protectStructure}</ss:ProtectStructure>","<ss:ProtectWindows>{protectWindows}</ss:ProtectWindows>","</ss:ExcelWorkbook>","<ss:Styles>","{joinedCompiledStyles}","</ss:Styles>","{joinedWorksheets}","</ss:Workbook>"),addDefaultStyle:function(){var a=[{name:"Color",value:this.cellBorderColor},{name:"Weight",value:"1"},{name:"LineStyle",value:"Continuous"}];this.addStyle({id:"Default",attributes:[{name:"Alignment",properties:[{name:"Vertical",value:"Top"},{name:"WrapText",value:"1"}]},{name:"Font",properties:[{name:"FontName",value:"arial"},{name:"Size",value:"10"}]},{name:"Interior"},{name:"NumberFormat"},{name:"Protection"},{name:"Borders",children:[{name:"Border",properties:[{name:"Position",value:"Top"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Bottom"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Left"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Right"}].concat(a)}]}]})},addTitleStyle:function(){this.addStyle({id:"title",attributes:[{name:"Borders"},{name:"Font"},{name:"NumberFormat",properties:[{name:"Format",value:"@"}]},{name:"Alignment",properties:[{name:"WrapText",value:"1"},{name:"Horizontal",value:"Center"},{name:"Vertical",value:"Center"}]}]})},addHeaderStyle:function(){this.addStyle({id:"headercell",attributes:[{name:"Font",properties:[{name:"Bold",value:"1"},{name:"Size",value:"10"}]},{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#A3C9F1"}]},{name:"Alignment",properties:[{name:"WrapText",value:"1"},{name:"Horizontal",value:"Center"}]}]})},addStripedStyles:function(){this.addStyle({id:"even",attributes:[{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#CCFFFF"}]}]});this.addStyle({id:"odd",attributes:[{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#CCCCFF"}]}]});Ext.each(["even","odd"],function(a){this.addChildNumberFormatStyle(a,a+"date","[ENG][$-409]dd-mmm-yyyy;@");this.addChildNumberFormatStyle(a,a+"int","0");this.addChildNumberFormatStyle(a,a+"float","0.00")},this)},addChildNumberFormatStyle:function(a,c,b){this.addStyle({id:c,parentStyle:"even",attributes:[{name:"NumberFormat",properties:[{name:"Format",value:b}]}]})}});