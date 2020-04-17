

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

$.fn.recortar = function(text, font, lineWidth) {
    if (text != undefined && text != null) {
        var retext = $.fn.primerAjuste(text);
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
        return retext;
    }
    return "";
};

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
    return $.fn.recortar(text, '23pt Roboto', 900);
}

function recortarTituloSecundario(text) {
    return $.fn.recortar(text, '20px Roboto', 950);
}

function recortarSummary(text) {
    return $.fn.recortar(text, '12pt Roboto', 1800);
}

function recortarTituloProductoExterno(text) {
    return $.fn.recortar(text, '16px Roboto', 230);
}

function recortarHeaderProductoExterno(text) {
    return $.fn.recortar(text, '20px Roboto', 420);
}

function recortarDescriptionProductoExterno(text) {
    return $.fn.recortar(text, '16px Roboto', 1000);
}

function recortarTituloListado(text)  {
    return $.fn.recortar(text, '26px sans-serif', 940);
}

function recortarSummaryListado(text) {
    return $.fn.recortar(text, '12px sans-serif', 1710);
}

function recortarTituloListadoTemplateOne(text)  {
    return $.fn.recortar(text, '26px sans-serif', 800);
}

function recortarSummaryListadoTemplateOne(text) {
    return $.fn.recortar(text, '14px sans-serif', 1360);
}

function recortarTituloBeneficio(text)  {
    return $.fn.recortar(text, '26px sans-serif', 450);
}

function recortarSummaryBeneficio(text) {
    return $.fn.recortar(text, '14px sans-serif', 1340);
}

function recortarTituloListadoTemplateFour(text)  {
    return $.fn.recortar2(text, '26px sans-serif', 1400);
}

function recortarSummaryListadoTemplateFour(text) {
    return $.fn.recortar2(text, '14px sans-serif', 2250);
}
