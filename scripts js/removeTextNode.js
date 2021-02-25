const removeText = (nodeList) =>{
    let elementos = Array.from(nodeList);
        elementos.forEach((el) =>{
            if(el.nodeType == 3) el.remove();
        });
};

const lista = [
    document.querySelector('#localStorage').childNodes,
    document.querySelector('#generador').querySelectorAll('fieldset')[1].childNodes
];

for(let index of lista) removeText(index);