(function() {  
  'use strict';

  // set up a request
  var getWantedList = function() {
    axios.get('https://api.fbi.gov/@wanted?pageSize=20&page=1&sort_on=modified&sort_order=desc')
      .then(function(response) {     
        // console.log(response.data);
        const container = document.getElementById('wanted-cards');
        
        response.data.items.forEach(function(item) {
          // console.log(item);
          // create card content          
          const content = `
            <div class="max-w-sm rounded overflow-hidden shadow-xl cursor-pointer rounded card">
              ${ item.images && item.images.length > 0 ?
                `<img class="w-full" src="${item.images[0].thumb}" alt="${item.uid}" />`
                : 
                `<img class="w-full" src="https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325" alt="${item.uid}">`
              }
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${item.aliases ? item.aliases[0] : 'No especificado'}</div>
                <div class="text-sm mb-2"><b>Fecha de Nacimiento:</b> ${item.dates_of_birth_used ? item.dates_of_birth_used[0] : 'No especificado'}</div>
                <p class=" text-base">${item.description ? item.description : 'No especificado'}</p>
              </div>
            </div>
          `
          // append newyly created card element to the card container
          container.innerHTML += content;
        });
      })
      .catch(function(error) {
        console.log(error);
        const container = document.getElementById('wanted-cards');

        container.innerHTML += '<p>Error al cargar la lista de personas buscadas</p>';    
      });
  };  
  
  getWantedList();  
})();