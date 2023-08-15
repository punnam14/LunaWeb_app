$(document).ready(function () {
    $("#navbar").load("/pages/navbar.html");
    $("#footer").load("/pages/footer.html");
    loadFavorites();
});

function loadFavorites() {
    $.get('/getFavorites') // Add the appropriate endpoint to get the favorites
        .done(function (favorites) {
            displayFavorites(favorites);
        })
        .fail(function (error) {
            console.error('Failed to fetch favorites:', error);
        });
}

function displayFavorites(favorites) {
    var container = document.querySelector('.favorites-container');
    container.innerHTML = '';

    favorites.forEach(function (favorite) {
        var imagePath = favorite.imagePath;
        var favoritePrice = favorite.price;
        var favoriteTitle = imagePath.split('/').pop().split('.')[0];
        var productColor = favorite.color;

        var col = document.createElement('div');
        col.className = 'col-md-3 mb-4';

        var card = document.createElement('div');
        card.className = 'card';

        var img = document.createElement('img');
        img.src = imagePath;
        img.className = 'card-img-top';
        img.alt = favoriteTitle;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = favoriteTitle;

        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = favoritePrice;

        cardBody.appendChild(title);
        cardBody.appendChild(price);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        container.appendChild(col);

        card.addEventListener('click', function () {
            window.location.href = '/pages/product-details.html?image=' + encodeURIComponent(imagePath) + '&title=' + encodeURIComponent(favoriteTitle) + '&price=' + encodeURIComponent(favoritePrice) + '&color=' + encodeURIComponent(productColor);
        });
    });
}