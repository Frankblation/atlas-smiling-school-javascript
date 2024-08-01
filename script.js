$(document).ready(function () {
  // Initialize data fetching and event listeners
  getQuoteData();
  getVideoData();
  getCourseData();
  setupEventListeners();
});


function setupEventListeners() {
  // Keyword search on input
  $(".searchInput").on("input", function() {
      var searchValue = $(this).val();
      var selectedTopic = $("#selectedTopic").text();
      var sort = $("#sortBy").text();
      getCourseData(searchValue, selectedTopic, sort);
  });

  // Topic sort click event
  $(".sortOptions").on("click", "a", function() {
      var selectedTopic = $(this).text();
      $("#selectedTopic").text(selectedTopic);
      var searchValue = $(".searchInput").val();
      var sort = $("#sortBy").text();
      getCourseData(searchValue, selectedTopic, sort);
  });

  // Sort by click event
  $(".sortBy").on("click", "a", function() {
      var sortBy = $(this).text();
      $("#sortBy").text(sortBy);
      var searchValue = $(".searchInput").val();
      var selectedTopic = $("#selectedTopic").text();
      getCourseData(searchValue, selectedTopic, sortBy);
  });
}

// Show or hide the loader
function showOrHideLoader(shouldShow) {
  if (shouldShow) {
      $(".loader").show();
  } else {
      $(".loader").hide();
  }
}

// Calculate star totals needed
function calculateRatingStars(video) {
  const maxStars = 5;
  const rating = video.star;
  let stars = "";

  for (let i = 1; i <= maxStars; i++) {
      stars += (i <= rating)
          ? '<img src="images/star_on.png" alt="star" width="15px" height="15px" />'
          : '<img src="images/star_off.png" alt="star" width="15px" height="15px" />';
  }

  return stars;
}


function createVideoCard(video) {
  const starCount = calculateRatingStars(video);
  return `<div class="row align-items-center mx-auto">
              <div class="d-flex flex-column">
                  <div class="card">
                      <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail" />
                      <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                      </div>
                      <div class="card-body">
                          <h5 class="card-title font-weight-bold">${video.title}</h5>
                          <p class="card-text text-muted">Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod.</p>
                          <div class="creator d-flex align-items-center">
                              <img src="images/profile_1.jpg" alt="Creator of Video" width="30px" class="rounded-circle" />
                              <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                              <div class="rating d-flex flex-row">${starCount}</div>
                              <span class="main-color">8 min</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
}


function getQuoteData() {
  showOrHideLoader(true);
  $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      type: "GET",
      success: function(response) {
          response.forEach(function(quote) {
              const item = `<div class="carousel-item text-white d-flex flex-row align-items-center justify-content-center mt-5 m-0">
                              <img class="m-4" src="${quote.pic_url}" alt="Image">
                              <div class="d-flex flex-column">
                                  <p class="col-5 quote-text">${quote.text}</p>
                                  <p class=" col-3quote-text"><strong>${quote.name}</strong></p>
                                  <p class="quote-text"><em>${quote.title}</em></p>
                              </div>
                            </div>`;
              $(".quoteCarousel").append(item);
          });

          $(".quoteCarousel").slick({
              centerMode: true,
              centerPadding: "0px",
              slidesToShow: 1,
              prevArrow: '<img src="/images/arrow_white_left.png" class="quoteImage" />',
              nextArrow: '<img src="/images/arrow_white_right.png" class="quoteImage" />',
              responsive: [{
                  breakpoint: 768,
                  settings: {
                      slidesToShow: 1,
                      centerMode: false,
                  }
              }]
          });

          showOrHideLoader(false);
      },
      error: function(error) {
          console.error(error);
      }
  });
}

// Gets video data from API with AJAX
function getVideoData() {
  showOrHideLoader(true);
  $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      type: "GET",
      success: function(response) {
          response.forEach(function(video) {
              const item = createVideoCard(video);
              $(".videoCarousel").append(item);
          });

          $(".videoCarousel").slick({
              centerPadding: "0px",
              slidesToShow: 4,
              infinite: true,
              prevArrow: '<img src="/images/arrow_black_left.png" class="videoImage" />',
              nextArrow: '<img src="/images/arrow_black_right.png" class="videoImage" />',
              responsive: [{
                  breakpoint: 768,
                  settings: {
                      slidesToShow: 1,
                      centerMode: false,
                  }
              }]
          });

          showOrHideLoader(false);
      },
      error: function(error) {
          console.error(error);
      }
  });
}

// Gets courses from API using AJAX
function getCourseData(searchValue = '', selectedTopic = '', sort = '') {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      type: "GET",
      data: {
          q: searchValue,
          topic: selectedTopic,
          sort: sort,
      },
      success: function(response) {
          const courses = response.courses;
          $(".apiVideos").empty();
          $(".videoCount").text(`${courses.length} videos`);
          courses.forEach(function(video) {
              const item = createVideoCard(video);
              $(".apiVideos").append(item);
          });
      },
      error: function(error) {
          console.error(error);
      }
  });
}
