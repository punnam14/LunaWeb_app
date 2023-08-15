$(document).ready(function () {
    $("#navbar").load("/pages/navbar.html");
    $("#footer").load("/pages/footer.html");
    loadBag()
});

function loadBag(){
    $.get('/shopping-bag') // Add the appropriate endpoint to get the favorites
        .done(function (bags) {
            displayBag(bags);
        })
        .fail(function (error) {
            console.error('Failed to fetch bag:', error);
        });
}

function displayBag(bags) {
    var container = document.querySelector('.shopping-bag-container');
    container.innerHTML = '';

    bags.forEach(function (bag) {
        var imagePath = bag.image;
        var priceBag = bag.price;
        var sizeBag = bag.size;
        var titleBag = imagePath.split('/').pop().split('.')[0];

        var col = document.createElement('div');
        col.className = 'col-md-3 mb-4';

        var card = document.createElement('div');
        card.className = 'card';

        var img = document.createElement('img');
        img.src = imagePath;
        img.className = 'card-img-top';
        img.alt = titleBag;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = titleBag;

        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = priceBag;

        // Create a paragraph for the size
        var size = document.createElement('p');
        size.className = 'size';
        size.textContent = sizeBag;

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(size); // Append the size paragraph to the card body

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        container.appendChild(col);
    });
}