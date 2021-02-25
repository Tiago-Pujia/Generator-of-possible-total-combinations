// Abrir y Cerrar carpeta
const guardados = document.querySelector('#guardados');
document.querySelector('#carpeta-localstorage').addEventListener('click', ()=> guardados.classList.toggle('display-none') );

// Guardar elementos en localstorage y obtener los datos
document.querySelector('#localStorage').addEventListener('submit', (event) =>{
    event.preventDefault();

    // Obtencion de datos
    let elemento_N = filtro_TextArea(document.querySelector('#elementosInput_N')),
        elemento_R = Math.round(Number(document.querySelector('#elementoInput_R').value)) || 's',
        nombre = document.querySelector('#nombre').value.trim();

        // Validar Datos
        const verificar_N = document.querySelector('#verificar_N'),
              verificar_R = document.querySelector('#verificar_R'),
              verificar_Nombre = document.querySelector('#verificar-localstorage');

        let comprobacion = false;

            if(elemento_N.length < 1){
                verificar_N.classList.remove('display-none');
                comprobacion = true;
            } else verificar_N.classList.add('display-none');
            
            if(isNaN(elemento_R) || elemento_R < 1){
                verificar_R.classList.remove('display-none');
                comprobacion = true;
            } else verificar_R.classList.add('display-none');
    
            if(nombre.length < 2){
                verificar_Nombre.classList.remove('display-none');
                comprobacion = true;
            } else verificar_Nombre.classList.add('display-none');

        if(comprobacion) return false;

    const combinacionCliente = {
        nombre,
        elemento_N,
        elemento_R
    };
    
    localStorage.setItem(combinacionCliente.nombre,JSON.stringify(combinacionCliente));

    document.querySelector('#nombre').value = '';
    imprimir_localStorage();
})

// Imprimir todos los objetos de local-storage
const imprimir_localStorage = () => {
    
    let datosFragmentados = document.createDocumentFragment();

    const template = document.querySelector('#plantilla-guardados');
    
        for(let i0 = 0; i0 < localStorage.length; i0++){
            
            let newTemplate = template.content.cloneNode(true),
                td = newTemplate.querySelectorAll('td');
            
            const datos = JSON.parse(localStorage.getItem(localStorage.key(i0)));
            const datos_N = datos.elemento_N;

            td[0].textContent = datos.nombre;    
            td[1].textContent = datos.elemento_R;
            td[2].querySelector('ul').innerHTML = datos_N.map((el) => `<li>${el}</li>`).join(' ');
                
            newTemplate.querySelector('tr').id = datos.nombre;
            newTemplate.querySelector('p > span').textContent = datos_N.length;

            datosFragmentados.append(newTemplate);
        };

    document.querySelector('#guardados_tabla').querySelector('tbody').innerHTML = '';
    document.querySelector('#guardados_tabla').querySelector('tbody').append(datosFragmentados);
} 

imprimir_localStorage();

// Boton imprimir o borrar
document.querySelector('#guardados_tabla').addEventListener('click', (e) => {

    let eTarget = e.target;
    let eClass = eTarget.classList;

        if(eClass == 'boton-si-celda'){
            let datos = JSON.parse(localStorage.getItem(eTarget.parentElement.parentElement.id));

            document.querySelector('#elementosInput_N').value = datos.elemento_N.join(' ');
            document.querySelector('#elementoInput_R').value = datos.elemento_R;
            document.querySelector('.formulario').querySelectorAll('button')[0].click();

            indicarCantidadIngresada();
        }

        else if(eClass == 'boton-no-celda'){
            localStorage.removeItem(eTarget.parentElement.parentElement.id);
            imprimir_localStorage();
        };
});

// Limpiar tabla
document.querySelector('#limpiar-localStorage').addEventListener('click',()=>{
    localStorage.clear();
    imprimir_localStorage();
});

