const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
    PORT,
    HOST_URL,
} = process.env;

//Validação de Porta e Host de endereço
assert(PORT, 'É necessário indicar a porta de endereço!');
assert(HOST_URL, 'É necessário indicar o host!');

module.exports = {
    PORT,
    HOST_URL
}