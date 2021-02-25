const getPermutations = (N, R) => {

    let perm = [...N];
    
    const generate = (perm, R, currLen) =>{
        if (currLen === R) return perm;

            for (let i0 = 0,len = perm.length; i0 < len; i0++) {
                  
                let currPerm = perm.shift();
                
                for (let i1 = 0; i1 < N.length; i1++) {
                    perm.push( currPerm.concat(N[i1]) );
                };
                
            };

        return generate(perm, R, currLen + 1);
    };

    return generate(perm, R, 1);
};

const imprimirCombinacionesDetails = function() {
    let dataN = this.parentElement.dataN;
    let dataR = this.dataR;

    if(!this.querySelector('ol') && !this.querySelector('details')){
        let combinacion = getPermutations(dataN,dataR);

        if(combinacion.length <= 7500){
            let ol = document.createElement('ol');
                ol.innerHTML = combinacion.map((el) => `<li>${el}</li>`).join(' ');
    
            this.append(ol);
            
        } else {
            const dividirMatriz = (arr, espacio) =>{
                let salida = [];

                for (let i0 = 0; i0 < arr.length; i0 += espacio){
                    salida.push(arr.slice(i0, i0 + espacio));
                };
            
                return salida;
            };
                 
            let datosFragmentados0 = document.createDocumentFragment(),
                x0 = 1,
                x1 = 0;

            for(let arr of dividirMatriz(combinacion,7500)){
                let template = document.querySelector('#plantilla-permutaciones-dividido');
                let newTemplate = template.content.cloneNode(true);
    
                    newTemplate.querySelector('h4').textContent = x0 + ' - ' + (x1 += arr.length);
                        x0 += arr.length;
    
                let ol = document.createElement('ol');
                    ol.innerHTML = arr.map((el) => `<li>${el}</li>`).join(' ');
    
                newTemplate.querySelector('details').append(ol);
                datosFragmentados0.append(newTemplate);
            };

            this.append(datosFragmentados0);
        };
    };
};


document.querySelector('#generador').addEventListener('submit',(event) => {
    // No recargar la pagina
    event.preventDefault();

    // Datos lista
    let elemento_N = filtro_TextArea(document.querySelector('#elementosInput_N')),
        elemento_R = Math.round(Number(document.querySelector('#elementoInput_R').value)) || 's';

        // Validar datos
        let verificar_R = document.querySelector('#verificar_R');
        let verificar_N = document.querySelector('#verificar_N');

        let comprobacion = false;

            if(elemento_N.length < 1){
                verificar_N.classList.remove('display-none');
                comprobacion = true;
            } else verificar_N.classList.add('display-none');
        
            if(isNaN(elemento_R) || elemento_R < 1){
                verificar_R.classList.remove('display-none');
                comprobacion = true;
            } else verificar_R.classList.add('display-none');

        if(comprobacion) return false;

    // Calcular combinaciones
    let combinaciones = [];

    for(let i = 1; i <= elemento_R; i++) {
        combinaciones.push( Math.pow(elemento_N.length,i) );
    };

    // Imrprimir datos en el DOM
    let indice = document.querySelector('#indice'),
        listaIndice = indice.querySelector('#indice-contenido');

    let datosFragmentados0 = document.createDocumentFragment(),
        datosFragmentados1 = document.createDocumentFragment();

        listaIndice.innerHTML = '';
        contenedor.innerHTML = '';
        contenedor.dataN = elemento_N;
        document.querySelector('h2 > span').textContent = combinaciones.reduce((acc,el) => acc += el ,0);

        for(let i0 = 0, i1 = 1; i0 < combinaciones.length; i0++, i1++){
            const idDetails = 'subconjunto' + i1 ;
            const template = document.querySelector('#plantilla-permutaciones');

            let newTemplate = template.content.cloneNode(true);
        
                newTemplate.querySelector('details').id = idDetails;
                newTemplate.querySelector('details').dataR = i1;
                newTemplate.querySelector('h3').textContent = 'Subconjunto ' + i1 + (i0 == 0 ? ' indice' : ' indices');
                newTemplate.querySelector('p').textContent = 'Numero de combinaciones posibles ' + combinaciones[i0];

            let li = document.createElement('li');
                li.innerHTML = `<a href="#${idDetails}">Indice °${i1}</a>`;
            
            datosFragmentados0.append(newTemplate);
            datosFragmentados1.append(li);
        };

    contenedor.append(datosFragmentados0);
    listaIndice.append(datosFragmentados1);

    Array.from(contenedor.querySelectorAll('details')).forEach((el) => el.addEventListener('click', imprimirCombinacionesDetails));


    // Mostrar etiquetas ocultas
    const etiquetas =[   
        document.querySelectorAll('h2')[0]  ,
        document.querySelector('#botones')  ,
        indice                              ,
        contenedor                          
    ];

    for(let etiqueta of etiquetas){
        etiqueta.classList.remove('display-none');
    };

    document.querySelector('#verificar-localstorage').classList.add('display-none');

    adaptarAside();
});