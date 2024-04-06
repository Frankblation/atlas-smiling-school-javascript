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
                quoteCarousel.empty();
                $.each(response, function(index, quote) {
                    var quoteItem = $("<div>").addClass("carousel-item");
                    var quoteContent = $(`
                        <div class="">
                            <div class="col-sm-6 text-center">
                                <div class="testimonial-item">
                                    <img class="col-md-3 rounded-circle" src="${quote.pic_url}" class="d-block w-100" alt="Testimonial">
                                    </div>
                                    <div class="row-sm-6 ml-3 d-flex flex-column">
                                    <div class="col-sm-4">&lt;&lt;${quote.text}&gt;&gt;</div>
                                    <h3 class="font-weight-bold mt-3">${quote.name}</h3>
                                    <div>${quote.title}</div>
                                </div>
                            </div>
                        </div>`);
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

$(document).ready(function () {
    function showLoader() {
        $(".loader").show();
    }

    function hideLoader() {
        $(".loader").hide();
    }

    function fetchPopularTutorials() {
        var popularCarousel = $(".slick-car");
        showLoader();

        $.ajax({
            url: "https://smileschool-api.hbtn.info/popular-tutorials",
            method: "GET",
            success: function (response) {
                hideLoader();
                popularCarousel.empty();
                $.each(response, function (index, tutorial) {
                    var tutorialItem = $("<div>").addClass("carousel-item");
                    var tutorialContent = $(`
                        <div class="">
                            <div class="col-sm-6 text-center">
                                <div class="tutorial-item">
                                    <img class="col--4 d-flex justify-content-evenly" src="${tutorial.thumb_url}" alt="Tutorial Thumbnail">
                                </div>
                                <div class="row-sm-6 ml-3 d-flex flex-column">
                                    <h5 class="card-title font-weight-bold">${tutorial.title}</h5>
                                    <p class="card-text text-muted">${tutorial["sub-title"]}</p>
                                    <div class="creator d-flex align-items-center">
                                        <img src="${tutorial.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                                        <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
                                    </div>
                                    <div class="info pt-3 d-flex justify-content-between">
                                        <div class="rating">
                                            <img src="images/star_on.png" alt="star on" width="15px">
                                            <img src="images/star_on.png" alt="star on" width="15px">
                                            <img src="images/star_on.png" alt="star on" width="15px">
                                            <img src="images/star_on.png" alt="star on" width="15px">
                                            <img src="images/star_off.png" alt="star on" width="15px">
                                        </div>
                                        <span class="main-color">${tutorial.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                    tutorialItem.html(tutorialContent);
                    popularCarousel.append(tutorialItem);
                });

                popularCarousel.slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: true,
                    prevArrow: '<a class="carousel-control-prev arrow-left" href="#"><img src="images/arrow_white_left.png" alt="Previous" aria-hidden="true"/><span class="sr-only">Previous</span></a>',
                    nextArrow: '<a class="carousel-control-next arrow-right" href="#"><img src="images/arrow_white_right.png" alt="Next" aria-hidden="true"/><span class="sr-only">Next</span></a>',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            },
            error: function (xhr, status, error) {
                hideLoader();
                console.error("Failed to fetch popular tutorials. Status code: " + xhr.status);
            }
        });
    }

    // Fetch popular tutorials when the page loads
    fetchPopularTutorials();

    // Your existing code in popular_scripts.js remains unchanged
});
