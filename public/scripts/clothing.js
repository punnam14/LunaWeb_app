$(document).ready(function () {
    $("#navbar").load("/pages/navbar.html");
    $("#footer").load("/pages/footer.html");
});

var Dresses = [{image: '/images/clothing/Dresses/Flounce Trimmed Dress.png',price: '$140.00',color: 'lavender'},
    {image: '/images/clothing/Dresses/Knot-detail Dress.png',price: '$220.00',color: 'beige'},
    {image: '/images/clothing/Dresses/Lyocell-blend Dress.png',price: '$300.00',color: 'yellow'},
    {image: '/images/clothing/Dresses/Slit-sleeved Dress.png',price: '$180.00',color: 'purple'},
    {image: '/images/clothing/Dresses/Twist-detail Dress.png',price: '$220.00',color: 'purple'},
    {image: '/images/clothing/Dresses/Twist-detail Satin Dress.png',price: '$350.00',color: 'black'},];

var Tops = [{image: '/images/clothing/Tops/Draped crop Top.png',price: '$170.00',color: 'beige'},
    {image: '/images/clothing/Tops/Draped Halternect Top.png',price: '$150.00',color: 'green'},
    {image: '/images/clothing/Tops/Flounce-trimmed Top.png',price: '$210.00',color: 'yellow'},
    {image: '/images/clothing/Tops/Lace Camisole Top.png',price: '$80.00',color: 'white'},]

var Sweatshirts = [{image: '/images/clothing/Sweatshirts/Beige Sweatshirt.png',price: '$75.00',color: 'beige'},
    {image: '/images/clothing/Sweatshirts/Oversized Sweatshirt.png',price: '$80.00',color: 'green'},
    {image: '/images/clothing/Sweatshirts/Printed Sweatshirt.png',price: '$65.00',color: 'grey'},
    {image: '/images/clothing/Sweatshirts/Yale Sweatshirt.png',price: '$60.00',color: 'white'},]

var Office = [{image: '/images/clothing/Office/Baloon Satin Dress.png',price: '$75.00',color: 'green'},
    {image: '/images/clothing/Office/Circle Skirt.png',price: '$80.00',color: 'black'},
    {image: '/images/clothing/Office/Crop Jacket.png',price: '$65.00',color: 'black'},
    {image: '/images/clothing/Office/Halter Bodysuit.png',price: '$60.00',color: 'white'},
    {image: '/images/clothing/Office/Wide-leg Pants.png',price: '$60.00',color: 'black'},]

var products = Dresses.concat(Tops, Office, Sweatshirts);
var wedding = Dresses.concat(Tops);
var party = Tops.concat(Dresses, Office)

window.onload = function () {
    filterProducts();
}

function filterProducts(category) {
    var container = document.querySelector('.products-container');
    container.innerHTML = '';

    var filteredProducts;

    switch (category) {
        case 'Dresses':
            filteredProducts = Dresses;
            break;
        case 'Tops':
            filteredProducts = Tops;
            break;
        case 'Sweatshirts':
            filteredProducts = Sweatshirts;
            break;
        case 'Wedding':
            filteredProducts = wedding;
            break;
        case 'Office':
            filteredProducts = Office;
            break;
        case 'Party':
            filteredProducts = party;
            break;
        default:
            filteredProducts = products;
    }

    filteredProducts.forEach(function (product) {
        var imagePath = product.image;
        var productPrice = product.price;
        var productTitle = imagePath.split('/').pop().split('.')[0];
        var productColor = product.color;
        var heartButton = document.createElement('button');

        var priceContainer = document.createElement('div');
        priceContainer.className = 'price-container';

        heartButton.className = 'btn heart-button';
        heartButton.innerHTML = '<i class="bi-heart"></i>';

        var col = document.createElement('div');
        col.className = 'col-md-3 mb-4';

        var card = document.createElement('div');
        card.className = 'card';

        var img = document.createElement('img');
        img.src = imagePath;
        img.className = 'card-img-top';
        img.alt = productTitle;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = productTitle;

        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = productPrice;

        heartButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const favoriteData = {
                imagePath: imagePath,
                price: productPrice,
                color: productColor,
            };
            
            $.post('/addFavorite', favoriteData)
                .done(function(response) {
                  console.log('Favorite added successfully:', response);
                })
                .fail(function(error) {
                  console.error('Failed to add favorite:', error);
                });
        });

        cardBody.appendChild(title);
        priceContainer.appendChild(price);
        priceContainer.appendChild(heartButton);
        cardBody.appendChild(priceContainer);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        container.appendChild(col);

        card.addEventListener('click', function () {
            window.location.href = '/pages/product-details.html?image=' + encodeURIComponent(imagePath) + '&title=' + encodeURIComponent(productTitle) + '&price=' + encodeURIComponent(productPrice) + '&color=' + encodeURIComponent(productColor);
        });
    });
}