const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getPostsByID(productID) {
  const url = "https://anjakvernenes.no/wp-json/wp/v2/posts/" + id;
  const response = await fetch(url);
  const post = await response.json();

  postDetails(post);
}

function postDetails(post) {
  const recipeName = document.getElementById("recipe-name");
  const recipeImage = document.getElementById("recipe-image");
  const recipePost = document.getElementById("recipe-post");

  document.title = "Duchess Delights | " + post.title.rendered;

  recipeName.innerText = post.title.rendered;
  recipeImage.src = post.yoast_head_json.og_image[0].url;
  recipeImage.alt = post.title.rendered;
  recipePost.innerHTML = post.content.rendered;

  recipeImage.classList.add("imgstyle");

  // image modal

  const images = document.querySelectorAll(".recipe-image");
  const modal = document.getElementById("imageModal");
  const modalImage = document.querySelector(".modal-image");

  images.forEach((img) => {
    img.onclick = function () {
      modal.classList.remove("hidden");
      modalImage.src = post.yoast_head_json.og_image[0].url;
      modalImage.alt = img.alt;
    };
  });

  modal.onclick = function () {
    modal.classList.add("hidden");
  };
}

getPostsByID(id);
