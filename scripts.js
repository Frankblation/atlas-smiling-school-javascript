$(document).ready(function() {
    function showLoader() {
        $(".loader").show();
    }

    function hideLoader() {
        $(".loader").hide();
    }

    function fetchQuotes() {
        var quoteCarousel = $(".slick-carousel");
        showLoader();

        $.ajax({
            url: "https://smileschool-api.hbtn.info/quotes",
            method: "GET",
            success: function(response) {
                hideLoader();
                quoteCarousel.empty(); // Clear loader and existing quotes
                $.each(response, function(index, quote) {
                    var quoteItem = $("<div>").addClass("carousel-item");
                    var quoteContent = `
                        <div class="row align-items-center mx-auto">
                            <div class="col-md-8 mx-auto">
                                <div class="testimonial-item">
                                    <img src="${quote.pic_url}" class="testimonial-img" alt="Testimonial">
                                    <h3>${quote.name}</h3>
                                    <p>${quote.text}</p>
                                </div>
                            </div>
                        </div>`;
                    quoteItem.html(quoteContent);
                    quoteCarousel.append(quoteItem);
                });

                quoteCarousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: true,
                    prevArrow: '<a class="carousel-control-prev arrow-left" href="#"><img src="images/arrow_white_left.png" alt="Quote Previous" aria-hidden="true"/><span class="sr-only">Previous</span></a>',
                    nextArrow: '<a class="carousel-control-next arrow-right" href="#"><img src="images/arrow_white_right.png" alt="Quote Next" aria-hidden="true"/><span class="sr-only">Next</span></a>'
                });
            },
            error: function(xhr, status, error) {
                hideLoader();
                console.error("Failed to fetch quotes. Status code: " + xhr.status);
            }
        });
    }

    // Fetch quotes when the page loads
    fetchQuotes();
});
