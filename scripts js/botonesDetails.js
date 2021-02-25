let contenedor = document.querySelector('#contenedor');

// Contrar, incluyendo los hijos
    const contraer = () =>{
        for(let etiqueta0 of Array.from(contenedor.children)){
            etiqueta0.removeAttribute('open');
            
            for(let etiqueta1 of Array.from(etiqueta0.querySelectorAll('details'))){
                etiqueta1.removeAttribute('open');
            };
        };   
    };

document.querySelector('#boton-2').addEventListener('click', contraer);
document.querySelector('#boton-2-1').addEventListener('click', contraer);