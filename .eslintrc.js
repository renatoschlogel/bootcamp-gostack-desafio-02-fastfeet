module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },  
  rules: {
    "prettier/prettier": "error", // avisar do erros que erro encontrados
    "class-methods-use-this": "off", // Não obrigar a ter o this no metodos dads classes
    "no-param-reassign": "off", // permitir alterar parametros recebidos
    "camelcase": "off", 
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }] // permitir declarar variaveis sem utiliza-las.
  },
};
