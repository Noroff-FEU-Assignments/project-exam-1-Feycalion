let postIds = [76, 110, 107];

async function getData() {
  const postsUrl = "https://anjakvernenes.no/wp-json/wp/v2/posts";
  const categoriesUrl = "https://anjakvernenes.no/wp-json/wp/v2/categories";

  const postsResponse = await fetch(`${postsUrl}?include=${postIds.join(",")}`);
  const categoriesResponse = await fetch(categoriesUrl);

  const [posts, categories] = await Promise.all([
    postsResponse.json(),
    categoriesResponse.json(),
  ]);

  Data(posts, categories);
  return [posts, categories];
}

getData();

function Data(posts, categories) {
  const trendContainer = document.querySelector(".trending-wrapper");

  posts.forEach((post) => {
    const container = document.createElement("a");
    container.href = `post.html?id=${post.id}`;
    container.classList.add("container");

    // image
    const recipeImage = document.createElement("img");
    recipeImage.src = post.yoast_head_json.og_image[0].url;
    recipeImage.classList.add("imgstyle");
    container.appendChild(recipeImage);
    recipeImage.alt = "Photo of " + post.title.rendered;

    // categories
    const categoriesContainer = document.createElement("div");
    categoriesContainer.classList.add("categories");

    for (let categoryId of post.categories) {
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
    recipeName.innerText = post.title.rendered;
    recipeName.classList.add("txtstyle");
    container.appendChild(recipeName);

    // readmore
    const readMore = document.createElement("p");
    readMore.innerText = "Read more";
    readMore.classList.add("txtstyle");
    container.appendChild(readMore);

    trendContainer.appendChild(container);
  });
}

function getCategoryById(categories, categoryId) {
  return categories.find((category) => category.id === categoryId);
}
