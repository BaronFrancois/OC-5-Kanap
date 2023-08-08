// // <!--           <a href="./product.html?id=42">
// <article>
// <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
// <h3 class="productName">Kanap name1</h3>
// <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
// </article>
// </a> -->
// http://localhost:3000/api/products/

fetch('http://localhost:3000/api/products/')
    // we convert the response into response.json = into an object
    .then(res => res.json())
    // we create a variable data 
    .then(data => {
        console.log(data)
        let itemsContainer = document.getElementById('items')
        let html = ''
        for (let i = 0; i < data.length; i++) {
            html += `
            
                <a href="./product.html?id=${data[i]._id}">
                    <article>
                        <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
                        <h3>${data[i].name}</h3>
                        <p>${data[i].description}</p>
                    </article>
                </a>`
        }
        itemsContainer.innerHTML = html;
        
    })
    .catch(function(err){
        console.log(err)
    }) 

// for(let i = 0; i < arr.length; i++){
//     arr[i].color
// }



