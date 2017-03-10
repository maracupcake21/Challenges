module.exports = {
 entry: './main.js', //cual es la entrada de nuestra aplicacion
 output: {
   path: './', //donde colocará los archivos al terminar
   filename: 'index.js' //el nombre de nuestro bundle
 },
 devServer: { // opciones para el servidor de desarrollo
   inline: true, // para que se recargue automáticamente cuando cambie un archivo
   port: 3333 // puerto donde funcionará el servidor
 },
 module: {
   loaders: [
     {
       test: /\.js$/, //probamos por la extensión .js
       exclude: /node_modules/, //no queremos procesar los archivos en node_modules
       loader: 'babel', //utilizamos babel
       query: { //cargamos los presets que instalamos
         presets: ['es2015', 'react']
       }
     }
   ]
 }
};