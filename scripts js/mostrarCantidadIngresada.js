// Mostrar etiqueta "p" con id "cantidad ingresada"

let inputElementos = document.querySelector('#elementosInput_N');
let mostrarCantidadIngresada = document.querySelector('#mostrarCantidadIngresada').querySelector('span');

const filtro_TextArea = (arr) => arr.value.trim().split("\n").join(" ").split(' ').filter(x => x.length > 0);

const indicarCantidadIngresada = () => mostrarCantidadIngresada.textContent = filtro_TextArea(inputElementos).length;


                                              indicarCantidadIngresada();
inputElementos.addEventListener('keyup', indicarCantidadIngresada);
inputElementos.addEventListener('blur', indicarCantidadIngresada);
document.querySelector('#generador').addEventListener('reset',() => mostrarCantidadIngresada.textContent = 0);