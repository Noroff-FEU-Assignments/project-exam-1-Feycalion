let offsetValue = 0;
let postLimit = 9;

async function getData() {
  const url = `https://anjakvernenes.no/wp-json/wp/v2/posts?per_page=${postLimit}&offset=${offsetValue}`;

  const categoriesUrl = "https://anjakvernenes.no/wp-json/wp/v2/categories";

  const [postsResponse, categoriesResponse] = await Promise.all([
    fetch(url),
    fetch(categoriesUrl),
  ]);
  const [posts, categories] = await Promise.all([
    postsResponse.json(),
    categoriesResponse.json(),
  ]);
  printData(posts, categories);
  let spinnerContainer = document.getElementById("spinner-container");
  spinnerContainer.style.display = "none";
  return [posts, categories];
}

getData();

function printData(posts, categories) {
  const dataContainer = document.querySelector(".data-container");

  for (let i = 0; i < posts.length; i++) {
    const container = document.createElement("a");
    container.href = `post.html?id=${posts[i].id}`;
    container.classList.add("container");

    dataContainer.appendChild(container);

    // image
    const recipeImage = document.createElement("img");
    recipeImage.src = posts[i].yoast_head_json.og_image[0].url;
    recipeImage.classList.add("imgstyle");
    container.appendChild(recipeImage);
    recipeImage.alt = "Photo of " + posts[i].title.rendered;

    // categories
    const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("categories");

    for (let categoryId of posts[i].categories) {
      const category = getCategoryById(categories, categoryId);
      if (category) {
        const categoryElement = document.createElement("span");
        categoryElement.innerText = category.name;
        categoriesContainer.appendChild(categoryElement);
      }
    }

    container.appendChild(categoriesContainer);

    // title
    const recipeName = document.createElement("h1");
    recipeName.innerText = posts[i].title.rendered;
    recipeName.classList.add("txtstyle");
    container.appendChild(recipeName);

    dataContainer.appendChild(container);

    // readmore
    const readMore = document.createElement("p");
    readMore.innerText = "Read more";
    readMore.classList.add("txtstyle");
    container.appendChild(readMore);
  }
}

function getCategoryById(categories, categoryId) {
  return categories.find((category) => category.id === categoryId);
}

// load more button

const loadMore = document.querySelector(".load-more-btn");

loadMore.onclick = function () {
  offsetValue += 9;
  getData();
  loadMore.style.display = "none";
};
