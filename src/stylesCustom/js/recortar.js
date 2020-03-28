

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

$.fn.recortar = function(text, font, lineWidth) {
    var size = $.fn.textWidth(text, font);
    var retext = text;
    var recortar = size > lineWidth;
    while (size > lineWidth) {
        text = text.toString().substr(0,text.length-1);
        size = $.fn.textWidth(text, font);
    }
    
    if (recortar) {
        text = text.toString().substr(0,text.length-5);
        text = text + '...'
    }
    
    return text;
    
};

function recortarTituloPrincipal(text) {
    return $.fn.recortar(text, '23pt Roboto', 990);
}

function recortarTituloSecundario(text) {
    return $.fn.recortar(text, '20px Roboto', 890);
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