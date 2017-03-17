var AppDispatcher = require('../dispatcher/AppDispatcher');

// Esta función se encargará de cargar y decodificar la base de datos localStorage
// cada vez que queramos modificar algo. El código es muy similar al que veníamos usando
function loadDatabase() {
    var charts = window.localStorage.getItem('chart');

    if (charts === null) {
        charts = [];
    } else {
        charts = JSON.parse(charts);
    }

    return charts;
}

// Esta otra función realizará el proceso inverso, codificar la base de datos
// para almacenarla una vez que hayamos realizado las operaciones
function saveDatabase(chart) {
    window.localStorage.setItem('chart', JSON.stringify(chart));
}

var ClientRestServiceActions = {

    readChart: function() {
        var charts = loadDatabase();

        // Enviamos un objeto plano como mensaje a las stores
        AppDispatcher.dispatch({
            type: 'READ', // esta propiedad servirá para identificar el mensaje en la store y actuar acorde
            charts: charts
        });
    },

    // Usaremos el nombre 'create' en vez 'save' para concordar con "CRUD"
    createChart: function(serviceResponse) {
        var data = [];
        var tmp = [];
        var labels = [];
        for(var index in serviceResponse)
        {
            tmp.push(serviceResponse[index].averageTimeResponse);
            labels.push(serviceResponse[index].region);
        }

        data.push(tmp);

        // Construimos el objeto a almacenar
        var chart = {
            labels: labels,
            data: data
        };

        // Abrimos la base de datos
        var charts = loadDatabase();

        // Insertamos la nota nueva
        charts.unshift(chart);

        // Guardamos
        saveDatabase(charts);

        // Enviamos como mensaje la nota que hemos creado
        AppDispatcher.dispatch({
            type: 'CREATE',
            charts: chart
        });
    }
}

module.exports = ClientRestServiceActions;