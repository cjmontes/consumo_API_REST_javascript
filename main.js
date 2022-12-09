
const API_KEY="live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk";
const api = axios.create ({
    baseURL: 'https://api.thecatapi.com/v1'
})
api.defaults.headers.common['X-API-KEY'] = API_KEY;

const API_URL_RAMDOM="https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk";

/* con API_KEY en URL
const API_URL_FAVORITES="https://api.thecatapi.com/v1/favourites?api_key=live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk";
*/

const API_URL_FAVORITES="https://api.thecatapi.com/v1/favourites";
const API_URL_UPLOAD="https://api.thecatapi.com/v1/images/upload";


const API_URL_FAVORITES_DELETE =  (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk`;





const b_otroGatito = document.querySelector ('#otro_gatito');
b_otroGatito.addEventListener ("click",loadRandomMichis);
const  spanError = document.getElementById ('error');
const favDiv = document.getElementById('favoritesMichis');

async function loadRandomMichis(){


    /*            hecho con then
    fetch (URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    })
    */
    
    // con async wait
        
    const res = await fetch (API_URL_RAMDOM);
    if (res.status !==200 ){
        spanError.innerHTML = 'Hubo un Error:' + res.status;
    }else{
        const data = await res.json();
        console.log('Ramdom');
        console.log(data);

        if (res.status !==200 ){
            spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
        }else{
            const img1 = document.querySelector('#img1');
            const img2 = document.querySelector('#img2');
            const btn1 = document.getElementById('btn1');
            const btn2 = document.getElementById('btn2');
            btn1.onclick = () => saveFavoriteMichi(data[0].id);
            btn2.onclick = () => saveFavoriteMichi (data[1].id);

            img1.src = data[0].url;
            img2.src = data[1].url;
        }
    }

}
async function loadFavoritesMichis(){
        
    // si se mete el api-key en la URL (Query parameter ) basta con hacer
    
    // const res = await fetch (API_URL_FAVORITES);

    // abajo hacemos el fetch metiendo el API_KEY en header (Authorization header)
    
    
    const res = await fetch (API_URL_FAVORITES, {
        method: 'GET',
        headers: {
          'X-API-KEY': "live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk",
        },
    });
    console.log ('res:');
    console.log (res);
    const data = await res.json();
    console.log('Favorites:'+data.length);
    console.log ('data:');
    console.log(data);

    if (res.status !== 200 ){
        console.log ('Error en fetch favoritos');
        spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
    }else{
       
       indx=1;
       data.forEach(michi => {

        // Creamos article    
        const article = document.createElement ('article');
        const MichiImg = document.createElement('img');
        const MichiButtom = document.createElement('button');
        const btnText = document.createTextNode ("Quitar de Favoritos");

        MichiImg.src = michi.image.url;
        MichiImg.width = 150;
        MichiImg.alt = "Foto Gatito favorito";
        article.appendChild(MichiImg);
        
        
        MichiButtom.appendChild (btnText);
        MichiButtom.onclick = () => deleteFavMichi (michi.id);
        MichiButtom.setAttribute('type',"button")
        // MichiButtom.addEventListener ('click',deleteFavMichi);
        article.appendChild(MichiButtom);

        // colgamos article del div de favoritos
        favDiv.appendChild (article);
        console.log('Añadido' + indx);
        indx=indx+1;
        
       }); 
      
    }
}

async function saveFavoriteMichi(id){

/*   Llamada con FETCH

    const res = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk',
        },
        body: JSON.stringify({
            image_id: id
        }),
     });
     const data = await res.json();

     console.log ('Salvado :'+ id);   
     console.log (res); 
     console.log (data); 
     

     if (res.status !==200 ){
       // spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
       spanError.textContent = 'Hubo un Error: ' + res.status + data.message;

    }else{
        console.log ('michi guardado');
    }
*/
     // Llamada con AXIOS

     const {data, status } = await api.post('/favourites', {

        image_id: id,
     });

     console.log ('Salvado :'+ id);   
     console.log (status); 
     console.log (data); 
     

     if (status !==200 ){
       // spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
       spanError.textContent = 'Hubo un Error: ' + status + data.message;

    }else{
        console.log ('michi guardado');
    }

}

async function deleteFavMichi(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE',
       
     });
     const data = await res.json();
     if (res.status !==200 ){
        spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
    } else{
        console.log ('michi ' + id +' borrado');
    }
}

async function uploadMichiPhoto(){
    console.log("Subir foto");
    const form = document.getElementById ('uploadingForm');
    const formData = new FormData(form); 
  
    console.log(formData.get('file'));

    res = await fetch ( API_URL_UPLOAD , {
        method: 'POST',
        headers: {
      
            //'Content-Type': 'multipart/form-data',
            // No hace falta poner Content-Type cuando es formData
            'X-API-KEY': 'live_LpGDe6NBwtKbmGADBjq92Y4XXDFnCEHjtSYFI0YWmQJwWq3QBMhrjzAsgwkOyVvk',
        },
        body: formData,           
     });
     const data = await res.json();

     if (res.status !==201 ){
        spanError.innerHTML = 'Hubo un Error: ' + res.status + data.message;
    }else{
        console.log ('Foto subida');
        console.log (data);
        console.log (data.url);
        saveFavoriteMichi(data.id);

    }   

}

loadRandomMichis();
loadFavoritesMichis();

