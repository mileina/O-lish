/* =====  reviews.js  ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. Charger les avis Google --- */
  const placeId = "YOUR_PLACE_ID";
  const apiKey  = "YOUR_GOOGLE_MAPS_API_KEY";

  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`)
    .then(r => r.json())
    .then(data => {
      const reviews = data.result.reviews || [];
      const container = document.getElementById("reviews-container");

      reviews.slice(0,8).forEach(r => {
        const slide   = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
          <div class="review-card">
            <p class="review-text">“${r.text}”</p>
            <p class="review-author">— ${r.author_name}</p>
          </div>`;
        container.appendChild(slide);
      });

      /* --- 2. Initialiser Swiper --- */
      new Swiper(".reviews-slider",{
        slidesPerView:1,
        spaceBetween:30,
        navigation:{
          nextEl:".next",
          prevEl:".prev"
        },
        autoplay:{delay:6000},
        loop:true,
        breakpoints:{
          768:{slidesPerView:2}
        }
      });
    })
    .catch(console.error);
});
