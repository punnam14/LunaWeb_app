$(document).ready(function () {
    $("#navbar").load("/pages/navbar.html");
    $("#footer").load("/pages/footer.html");
});

var Ceramics = [{image: '/images/ceramics/Body Vase.png',price: '$380',color: 'White'},
        {image: '/images/ceramics/Curved Vase.png',price: '$550',color: 'White'},
        {image: '/images/ceramics/Flower Vase.png',price: '$330',color: 'White'},
        {image: '/images/ceramics/Vase Set.png',price: '$690',color: 'Brown'},
];

window.onload = function () {
    showCandles(Ceramics);
}

function showCandles(ceramics) {
    var container = document.querySelector('.ceramics-container');
    container.innerHTML = '';

    ceramics.forEach(function (ceramic) {
        var imagePath = ceramic.image;
        var ceramicPrice = ceramic.price;
        var ceramicTitle = imagePath.split('/').pop().split('.')[0];

        var col = document.createElement('div');
        col.className = 'col-md-3 mb-4';

        var card = document.createElement('div');
        card.className = 'card';

        var img = document.createElement('img');
        img.src = imagePath;
        img.className = 'card-img-top';
        img.alt = title;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = ceramicTitle;

        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = ceramicPrice;

        var preorderButton = document.createElement('button');
        preorderButton.className = 'btn btn-secondary';
        preorderButton.textContent = 'Preorder';

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(preorderButton);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        container.appendChild(col);

        preorderButton.addEventListener('click', function () {
            handlePreorder(ceramic);
        });
    });
}

function handlePreorder(ceramic) {
    var params = new URLSearchParams();
    params.set('image', ceramic.image);
    params.set('price', ceramic.price);
    params.set('color', ceramic.color);
    window.location.href = '/pages/preorder.html?' + params.toString();
}