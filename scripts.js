$(document).ready(function () {
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
            success: function (response) {
                hideLoader();
                quoteCarousel.empty();
                $.each(response, function (index, quote) {
                    var quoteItem = $("<div>").addClass("carousel-item");
                    var quoteContent = $(`
                        <div class="row mx-auto align-items-center">
                            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                                <div class="testimonial-item">
                                    <img class="d-block align-self-center rounded-circle" src="${quote.pic_url}" class="d-block w-100" alt="Testimonial">
                                </div>
                                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                                    <div class="quote-text text-white">&lt;&lt;${quote.text}&gt;&gt;</div>
                                    <h3 class="text-white font-weight-bold">${quote.name}</h3>
                                    <div class="newtitle text-white">${quote.title}</div>
                                </div>
                            </div>
                        </div>`);
                    quoteItem.html(quoteContent);
                    quoteCarousel.append(quoteItem);
                });

                quoteCarousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    arrows: true,
                    prevArrow: '<a class="carousel-control-prev arrow-left" href="#"><img src="images/arrow_white_left.png" alt="Quote Previous" aria-hidden="true"/><span class="sr-only">Previous</span></a>',
                    nextArrow: '<a class="carousel-control-next arrow-right" href="#"><img src="images/arrow_white_right.png" alt="Quote Next" aria-hidden="true"/><span class="sr-only">Next</span></a>'
                });
            },
            error: function (xhr, status, error) {
                hideLoader();
                console.error("Failed to fetch quotes. Status code: " + xhr.status);
            }
        });
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    arrows: true,
                    prevArrow: '<a class="carousel-control-prev arrow-left" href="#"><img src="images/arrow_white_left.png" alt="Previous" aria-hidden="true"/><span class="sr-only">Previous</span></a>',
                    nextArrow: '<a class="carousel-control-next arrow-right" href="#"><img src="images/arrow_white_right.png" alt="Next" aria-hidden="true"/><span class="sr-only">Next</span></a>',
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
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

    function displayResults(data) {
        const videoCards = data.courses.map(course => `
            <div class="video-card">
                <img src="${course.thumb_url}" alt="${course.title}">
                <div>
                    <h3>${course.title}</h3>
                    <p>${course["sub-title"]}</p>
                    <p>${course.author}</p>
                </div>
            </div>
        `);
        $('#video-cards').html(videoCards.join(''));
    }

    function displaySearch(data) {
        $('#keywords').val(data.q);

        const topics = data.topics.map(topic => `<option value="${topic}">${topic}</option>`);
        $('#topics').html(topics.join(''));

        const sorts = data.sorts.map(sort => `<option value="${sort}">${sort}</option>`);
        $('#sort-by').html(sorts.join(''));
    }

    function displaySearchAndResults(data) {
        displayResults(data);
        displaySearch(data);
    }

    function displayLoader(active, id) {
        if (active) {
            let $loader = $(`<div class="loader" id="loader-${id}"></div>`);
            $(`#${id}`).append($loader);
        } else {
            let $loader = $(`#loader-${id}`);
            $loader.remove();
        }
    }

    function requestData(url, callback, id, data = {}) {
        displayLoader(true, id);
        $.ajax({
            url: url,
            type: "GET",
            data: data,
            headers: { "Content-Type": "application/json" },
            success: function (response) {
                displayLoader(false, id);
                callback(response);
            },
            error: function (error) {
                alert(`Error Getting Data from ${url}`);
            },
        });
    }

    function fetchCourses() {
        const keywords = $('#keywords').val();
        const topic = $('#topics').val();
        const sort = $('#sort-by').val();

        requestData("https://smileschool-api.hbtn.info/courses", displaySearchAndResults, 'results-items', { q: keywords, topic: topic, sort: sort });
    }

    let requestsCourses = [
        {
            url: "https://smileschool-api.hbtn.info/courses",
            func: displaySearchAndResults,
            id: "results-items",
        },
    ];

    let requestObject = requestsCourses;

    for (let r of requestObject) {
        requestData(r.url, r.func, r.id);
    }

    $('#keywords').on('input', fetchCourses);
    $('#topics').on('change', fetchCourses);
    $('#sort-by').on('change', fetchCourses);

    fetchQuotes();
    fetchPopularTutorials();
});
