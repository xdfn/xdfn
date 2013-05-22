Ext.define("Ext.ux.exporter.wikiFormatter.WikiFormatter",{extend:"Ext.ux.exporter.Formatter",contentType:"data:text/plain;base64,",cls:"wikitable",extension:"txt",lineSeparator:"\n",capitalizeHeaders:false,format:function(a,b){this.columns=b.columns||(a.fields?a.fields.items:a.model.prototype.fields.items);return"{|"+this.getHeaders()+this.lineSeparator+this.getRows(a)+this.lineSeparator+"|}"},getHeaders:function(a){var b=[];Ext.each(this.columns,function(d){var e;if(d.text!=undefined){e=d.text}else{if(d.name){e=d.name.replace(/_/g," ")}else{e=""}}if(this.capitalizeHeaders){e=Ext.String.capitalize(e)}b.push("! "+e)},this);var c=' class="'+this.cls+'" valign="top"'+this.lineSeparator;c+=b.join(this.lineSeparator);return c},getRows:function(a){var b=[];a.each(function(c){b.push("|-"+this.lineSeparator+this.getCells(c))},this);return b.join(this.lineSeparator)},getCells:function(a){var b=[];Ext.each(this.columns,function(d){var c=d.name||d.dataIndex;var e="";if(typeof c!=="undefined"){if(Ext.isFunction(d.renderer)){e=d.renderer(a.get(c),null,a)}else{e=a.get(c)}b.push("| "+e)}});return b.join(this.lineSeparator)}});