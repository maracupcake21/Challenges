var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

//var _charts = [];
var _charts = [];

// El callback será siempre ejecutado pasandole el mensaje como primer argumento
function callback(payload) {
    // Basándonos en la propiedad type del mensaje, podemos inferir qué datos
    // contiene el mensaje y qué debemos hacer con ellos
    switch (payload.type) {
        case 'READ':
            //_charts.push.apply(_charts, payload.charts);
            _charts  = payload.charts;
            break;
        case 'CREATE':
            //_charts.unshift(payload.charts);
            _charts = payload.charts;
            break;
        case 'DELETE':
            for (var i = 0, l = _charts.length; i < l; i++) {
                _charts.splice(i, 1);
            }
            break;
        // Si se ignora el mensaje, directamente termina
        default: return true;
    }

    // Si no se ignora el mensaje, emitimos el evento
    ChartStore.emit('change');

    // Es necesario devolver true para que el Dispatcher sepa que las operaciones han terminado
    return true;
}


var ChartStore = new EventEmitter();

// Obtener todas las notas
ChartStore.getChart = function() {
    // Usamos slice para devolver el propio array, sino una copia
    return _charts;
};


AppDispatcher.register(callback);
module.exports = ChartStore;