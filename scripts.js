// script.js

$(document).ready(function() {

    
    function fetchQuotes() {
        var quoteCarousel = document.querySelector("#quote-carousel .carousel-inner");
        var loader = document.createElement("div");
        loader.className = "loader";
        quoteCarousel.appendChild(loader);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://smileschool-api.hbtn.info/quotes");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    quoteCarousel.innerHTML = ""; // Clear loader and existing quotes
                    response.forEach(function (quote, index) {
                        var quoteItem = document.createElement("div");
                        quoteItem.className = "carousel-item" + (index === 0 ? " active" : "");
                        quoteItem.innerHTML = `
                            <div class="row align-items-center mx-auto">
                                <div class="col-md-8 mx-auto">
                                    <div class="testimonial-item">
                                        <img src="${quote.pic_url}" class="testimonial-img" alt="Testimonial">
                                        <h3>${quote.name}</h3>
                                        <p>${quote.text}</p>
                                    </div>
                                </div>
                            </div>`;
                        quoteCarousel.appendChild(quoteItem);
                    });
                } else {
                    console.error("Failed to fetch quotes. Status code: " + xhr.status);
                }
            }
        };
        xhr.send();
    }

    // Fetch quotes when the page loads
    fetchQuotes();
});

$(document).ready(function(){
    $('.carousel-inner"').slick({

    });
  });