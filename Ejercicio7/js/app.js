function filter(technology) {

    const cards = document.querySelectorAll('.filterDiv');

    if (technology === 'all-btn') {
        cards.forEach(card => {
            card.style.display = 'flex';
            // Elimino la clase hidden si existía para que me muestre todos los elementos en flex
            card.classList.remove('hidden');
        });
        
    } else {
        cards.forEach (card => {
            
            if (card.classList.contains(technology)) {
                card.style.display = 'flex';
                // Elimino la clase hidden si existía para que me muestre todos los elementos que contengan la tecnología en flex
                card.classList.remove('hidden');
            } else {
                // Añado la clase hidden que en CSS cuenta con un display:none important! De modo que se antepone al flex que estaba en important! en el CSS
                card.classList.add('hidden'); 
            }
        });
    }
}
