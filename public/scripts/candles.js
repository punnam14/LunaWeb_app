$(document).ready(function () {
    $("#navbar").load("/pages/navbar.html");
    $("#footer").load("/pages/footer.html");
});

var Candles = [{image: '/images/candles/David Beige Candle.png',price: '$35.99',color: 'Beige'},
        {image: '/images/candles/David Grey Candle.png',price: '$35.99',color: 'Grey'},
        {image: '/images/candles/David White Candle.png',price: '$35.99',color: 'White'},
        {image: '/images/candles/Roman Candle.png',price: '$34.99',color: 'White'},
];

window.onload = function () {
    showCandles(Candles);
}

function showCandles(candles) {
    var container = document.querySelector('.candles-container');
    container.innerHTML = '';

    candles.forEach(function (candle) {
        var imagePath = candle.image;
        var candlePrice = candle.price;
        var candleTitle = imagePath.split('/').pop().split('.')[0];

        var col = document.createElement('div');
        col.className = 'col-md-3 mb-4';

        var card = document.createElement('div');
        card.className = 'card';

        var img = document.createElement('img');
        img.src = imagePath;
        img.className = 'card-img-top';
        img.alt = candleTitle;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var title = document.createElement('h6');
        title.className = 'card-title';
        title.textContent = candleTitle;

        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = candlePrice;

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
            handlePreorder(candle);
        });
    });
}

function handlePreorder(candle) {
    var params = new URLSearchParams();
    params.set('image', candle.image);
    params.set('price', candle.price);
    params.set('color', candle.color);
    window.location.href = '/pages/preorder.html?' + params.toString();
}