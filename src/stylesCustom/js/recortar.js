$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) {
        $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    }
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

$.fn.primerAjuste = function(text) {
    if(text.length > 250) {
        text = text.substr(0, 250);
    }
    return text;
}

/*$.fn.recortar = function(text, font, lineWidth) {
    if (text != undefined && text != null) {
        
        var modified = text.replace('&nbsp;',' ');
        
        modified = modified.replace(new RegExp('&aacute;', "g"),'á');
        modified = modified.replace(new RegExp('&eacute;', "g"),'é');
        modified = modified.replace(new RegExp('&iacute;', "g"),'í');
        modified = modified.replace(new RegExp('&oacute;', "g"),'ó');
        modified = modified.replace(new RegExp('&uacute;', "g"),'ú');
        
        modified = modified.replace(new RegExp('&Aacute;', "g"),'Á');
        modified = modified.replace(new RegExp('&Eacute;', "g"),'É');
        modified = modified.replace(new RegExp('&Iacute;', "g"),'Í');
        modified = modified.replace(new RegExp('&Oacute;', "g"),'Ó');
        modified = modified.replace(new RegExp('&Uacute;', "g"),'Ú');
        
        var retext = $.fn.primerAjuste(modified);
        
        var size = $.fn.textWidth(retext, font);
        var recortar = size > lineWidth || text.length > retext.length;
        while (size > lineWidth) {
            retext = retext.toString().substr(0,retext.length-1);
            size = $.fn.textWidth(retext, font);
        }

        if (recortar) {
            retext = text.toString().substr(0,retext.length-5);
            retext = retext + '...'
        }

        modified = modified.replace(new RegExp('á', "g"),'&aacute;');
        modified = modified.replace(new RegExp('é', "g"),'&eacute;');
        modified = modified.replace(new RegExp('í', "g"),'&iacute;');
        modified = modified.replace(new RegExp('ó', "g"),'&oacute;');
        modified = modified.replace(new RegExp('ú', "g"),'&uacute;');

        modified = modified.replace(new RegExp('Á', "g"),'&Aacute;');
        modified = modified.replace(new RegExp('É', "g"),'&Eacute;');
        modified = modified.replace(new RegExp('Í', "g"),'&Iacute;');
        modified = modified.replace(new RegExp('Ó', "g"),'&Oacute;');
        modified = modified.replace(new RegExp('Ú', "g"),'&Uacute;');
        
        return modified;
    }
    return "";
};*/

$.fn.recortar2 = function(text, font, lineWidth) {
    if (text != undefined && text != null) {
        
        const maxwidthLinea = 400;
        var cantLineas = 0;

        var widthacumuladoTotal = 0;
        var posText = 0;
        var linea = "";
        
        while (widthacumuladoTotal <= lineWidth && posText < text.length) {
            
            // Pongo el siguiente caracter
            caracter = text.charAt(posText);
            
            // consulto el largo en px
            var sizeChar = $.fn.textWidth(caracter, font)
            
            // Paso al siguiente caracter
            posText = posText + 1;
          
            // Incremento el acumulado
            widthacumuladoTotal = widthacumuladoTotal + sizeChar;
        }

        if ((posText) < text.length) {
            text = text.substr(0,posText-4);
            text = text + '...';
        }

        return text;
    }
    return "";
};

function recortarTituloPrincipal(text) {
    return $.fn.recortar2(text, '23pt Roboto', 900);
}

function recortarTituloSecundario(text) {
    return $.fn.recortar2(text, '20px Roboto', 950);
}

function recortarSummary(text) {
    return reemplazoCaracteres(text, '12pt Roboto', 1700);
}

function recortarTituloProductoExterno(text) {
    return $.fn.recortar2(text, '16px Roboto', 230);
}

function recortarHeaderProductoExterno(text) {
    return $.fn.recortar2(text, '20px Roboto', 380);
}

function recortarDescriptionProductoExterno(text) {
    return $.fn.recortar2(text, '16px Roboto', 1000);
}

function recortarTituloListado(text)  {
    return reemplazoCaracteres(text, '26px sans-serif', 800);
}

function recortarSummaryListado(text) {
    return reemplazoCaracteres(text, '12px sans-serif', 1400);
}

function recortarTituloListadoTemplateOne(text)  {
    return reemplazoCaracteres(text, '26px sans-serif', 630);
}

function recortarSummaryListadoTemplateOne(text) {
    return reemplazoCaracteres(text, '14px sans-serif', 1260);
}

function recortarTituloBeneficio(text)  {
    return reemplazoCaracteres(text, '26px sans-serif', 420);
}

function recortarSummaryBeneficio(text) {
    return reemplazoCaracteres(text, '14px sans-serif', 1000);
}

function recortarTituloListadoTemplateFour(text)  {
    return reemplazoCaracteres(text, '26px sans-serif', 1300);
}

function recortarSummaryListadoTemplateFour(text) {
        return reemplazoCaracteres(text, '14px sans-serif', 2050);
}

function reemplazoCaracteres(text, tipografia, size) {
        if (text){
        var modified = text.replace('&nbsp;',' ');
        
        modified = modified.replace(new RegExp('&aacute;', "g"),'á');
        modified = modified.replace(new RegExp('&eacute;', "g"),'é');
        modified = modified.replace(new RegExp('&iacute;', "g"),'í');
        modified = modified.replace(new RegExp('&oacute;', "g"),'ó');
        modified = modified.replace(new RegExp('&uacute;', "g"),'ú');
        
        modified = modified.replace(new RegExp('&Aacute;', "g"),'Á');
        modified = modified.replace(new RegExp('&Eacute;', "g"),'É');
        modified = modified.replace(new RegExp('&Iacute;', "g"),'Í');
        modified = modified.replace(new RegExp('&Oacute;', "g"),'Ó');
        modified = modified.replace(new RegExp('&Uacute;', "g"),'Ú');
    
        modified = $.fn.recortar2(modified, tipografia, size);

        modified = modified.replace(new RegExp('á', "g"),'&aacute;');
        modified = modified.replace(new RegExp('é', "g"),'&eacute;');
        modified = modified.replace(new RegExp('í', "g"),'&iacute;');
        modified = modified.replace(new RegExp('ó', "g"),'&oacute;');
        modified = modified.replace(new RegExp('ú', "g"),'&uacute;');

        modified = modified.replace(new RegExp('Á', "g"),'&Aacute;');
        modified = modified.replace(new RegExp('É', "g"),'&Eacute;');
        modified = modified.replace(new RegExp('Í', "g"),'&Iacute;');
        modified = modified.replace(new RegExp('Ó', "g"),'&Oacute;');
        modified = modified.replace(new RegExp('Ú', "g"),'&Uacute;');
        
        return modified;
    }
    return "";
}
