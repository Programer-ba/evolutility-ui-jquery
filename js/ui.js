/*! ***************************************************************************
 *
 * evol-utility : ui.js
 *
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

var Evol = Evol || {};

Evol.UI = {

    version: '0.0.1',

    // html fragments
    html: {
        trTableEnd: '</tr></table>',
        TdTrTableEnd: '</td></tr></table>',
        clearer: '<div class="clearfix"></div>',
        emptyOption: '<option value=""></option>'
    },

    icons: {
        customize: function (id, type) {
            return ['<i class="glyphicon glyphicon-wrench" data-id="', id, '" data-type="', type, '"></i>'].join('');
        }
    },

    styles:{
        'success':'success',
        'info':'info',
        'warning':'warning',
        'danger':'danger'
    },

    // reusable html
    html_more: function (label) {
        return ['<a href="javascript:void(0)" class="evol-more">', label, '</a>'].join('');
    },

    fieldLabel: function (fID, fLbl) {
        return ['<div class="evol-field-label"><label for="', fID, '">', fLbl, '</label></div>'].join('');
    },
    fieldLabelSpan: function (fID, fLbl) {
        return ['<span class="evol-field-label"><label for="', fID, '">', fLbl, '</label></span>'].join('');
    },

    link: function (fID, label, url) {
        return ['<a class="Field" href="', url, '" id="', fID, '">', label, '</a>'].join('');
    },
    linkEmail: function (fID, label, email) {
        return EvoUI.link(fID, label, email ? 'mailto:' + email : '');
    },
    inputText: function (fID, fV, fd) {
        var h = ['<input class="form-control" type="text" id="', fID, '" value="', fV];
        if (fd) {
            _.each(['min', 'max', 'maxlength', 'max-width', 'min-width', 'placeholder'], function (item) {
                if (fd[item] !== 'undefined') {
                    h.push('" ', item, '="', fd[item]);
                }
            });
            _.each(['readonly'], function (item) {
                var fi = fd[item];
                if (fi || fi == '1') {
                    h.push('" ', item, '="', item);
                }
            });
        }
        h.push('" class="Field">');
        return h.join('');
    },
    inputTextInt: function (fID, fV) {
        return ['<input class="form-control" type="number" id="', fID, '" value="', fV,
            '" class="Field" maxlength="12">'].join('');
    },
    inputTextM: function (fID, fV, ml, h) {
        return [
            '<textarea name="', fID, '" id="', fID, '" class="Field form-control"" rows="', h,
            (ml > 0) ? '" onKeyUp="EvoVal.checkMaxLen(this,' + ml + ')' : '',
            '">', fV, '</textarea>'
        ].join('');
    },
    inputTextMJSON: function (fID, fVobj, h) {
        return ['<textarea rows="',h,'" class="evol-json">', _.escape(JSON.stringify(fVobj, null, '\t')), '</textarea>'].join('');
    },
    inputAny: function (type, fId, fVal) {
        return [
            '<input type="', type, '" id="', fId, '" value="', fVal,
            '" class="Field form-control" size="15">'
        ].join('');
    },
    inputDate: function (fID, fV) {
        return EvoUI.inputAny('date', fID, fV);
        //+'&nbsp;<a href="javascript:ShowDatePicker(\'', fID, '\');" class="ico Calendar"></a></nobr>'
    },
    inputDateTime: function (fID, fV) {
        return EvoUI.inputAny('datetime-local', fID, fV);
    },
    inputTime: function (fID, fV) {
        return EvoUI.inputAny('time', fID, fV);
    },
    inputColor: function (fId, fVal) {
        return [
            '<input type="color" id="', fId, '" value="', fVal, '" size="15">'
        ].join('');
    },
    inputCheckbox: function (fID, fV) {
        var fh = ['<input type="checkbox" id="', fID, '"'];
        if (fV !== null && fV !== '' && fV !== '0') {
            fh.push(' checked="checked"');
        }
        fh.push(' value="1">');
        return fh.join('');
    },
    inputCheckboxLOV:function(fLOV){
        var h=[];
        for(var i in fLOV){
            var lv=fLOV[i];
            h.push('<input type="checkbox" id="',lv.id,'" value="',lv.id,'"/>',
                '<label for="',lv.id,'">',lv.text,'</label> ');
        }
        return h.join('');
    },
    inputRadio: function (fN, fV, fLbl, sel, fID) {
        return ['<label for="', fID, '"><input id="', fID, '" name="', fN, '" type="radio" value="', fV,
            (sel) ? '" checked="checked' : '',
            '">', fLbl, '</label>&nbsp;'
        ].join('');
    },
    inputLOV: function (fID, fV, fVLabel, fLOV) {
        var h = ['<select class="form-control Field" id="', fID, '"><option value="', fV, '" selected>', fVLabel, '</option>'];
        _.each(fLOV, function (f) {
            h.push(EvoUI.inputOption(f.id, f.text));
        });
        h.push('</select>');
        return h.join('');
    },
    inputHidden: function (fID, fV) {
        return ['<input type="hidden" name="', fID, '" id="', fID, '" value="', fV, '"/>'].join('');
    },
    inputSelectBegin: function (fID, css, emptyOption) {
        var h=['<select id="', fID, '" class="form-control ',css,'">'];
        if(emptyOption){
            h.push(Evol.UI.html.emptyOption);
        }
        return h.join('');
    },
    inputOption: function (fID, fV) {
        return ['<option value="', fID, '">', fV, '</option>'].join('');
    },
    inputOptions: function (fields) {
        var opts=[];
        _.each(fields,function(f){
            opts.push(EvoUI.inputOption(f.id, f.text));
        });
        return opts.join('');
    },
    inputButton: function (id, label, cls) {
        return '<button type="button" id="' + id + '" class="btn' + (cls ? ' ' + cls : '') + '">' + label + '</button>';
    },

    inputToggle: function  (items) {
        var h=['<div class="btn-group" data-toggle="buttons">'];
        _.each(items, function(item){
            h.push('<label class="btn btn-info"><input type="radio" name="options" id="',item.id,'">',item.text,'</label>');
        });
        h.push('</div>');
        return h.join('');
    },

    icon: function (icon, cls) {
        return ['<span class="', cls? cls+' ':'', 'glyphicon glyphicon-', icon, '"></span>'].join('');
    },

    HTMLPanelLabel: function (PanelLabel) {
        return [
            '<div class="panel-heading">', EvoUI.icon('chevron-up', 'evol-title-toggle'),
            '<h3 class="panel-title">', PanelLabel, '</h3></div>'
        ].join('');
    },

    HTMLEmptyPanel: function(id, css, style){
        return '<div class="'+css+' panel panel-'+style+'" data-id="'+id+'"></div>';
    },

    HTMLMsg: function (title, content, style, dismissable) {
        return [
            '<div data-id="msg" class="alert alert-',style || 'info',
            dismissable?
                ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                :'">',
            '<strong>',title,'</strong> ', content,'</div>'
        ].join('');
    },

    formatDate: function(d){
        return (d.getMonth()+1) + "/" + (d.getDate()+1) + "/" + d.getFullYear();
    },
    formatTime: function(d){
        return (d.getHours()) + ":" + (d.getMinutes());
    },

    // get w/ automatic create if not in DOM
    getOrCreate: function (fID,$holder) {
        var e = $holder.find('#' + fID);
        if (e.length===0) {
            $('<div id="' + fID + '"></div>');
            ($holder || $(body)).append(e);
            e = $holder.find('#' + fID);
        }
        return e;
    },

    // insert a dataSet into a Backbone collection
    insertCollection: function (collection, dataSet){
        if(collection.length===0){
            _.each(dataSet,function(d){
                collection.create(d);
            });
        }
    },

    capFirstLetter: function(word){ // TODO use _.capitalize(word);
        if(word && word.length>0){
            //return _.capitalize(word);
            return word.substring(0,1).toUpperCase() + word.substring(1);
        }else{
            return '';
        }
    },

    trim: function(stringValue){ // TODO use _.trim(word);
        if(stringValue){
            return stringValue.replace(/^\s+|\s+$/g,'');
        }else{
            return '';
        }
    },

    setVisible: function($e, visible){
        if(visible){
            $e.show();
        }else{
            $e.hide();
        }
    }

};