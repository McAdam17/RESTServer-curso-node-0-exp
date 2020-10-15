// Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '48h';
// Semilla de token
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'semilla-token';
//Url de conexion
let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB='mongodb://localhost:27017/cafe';
}else{

}

process.env.URL_DB = urlDB;