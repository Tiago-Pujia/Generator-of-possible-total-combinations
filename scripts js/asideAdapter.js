
const adaptarAside = () =>{
    const indice = document.querySelector('#indice');

        const calcularTamaño = () => {
            indice.classList[innerWidth < 1300 ? 'add' : 'remove']('display-none')
        };

    window.addEventListener('resize',calcularTamaño);
    calcularTamaño();
};