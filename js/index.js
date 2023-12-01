async function getData() {
  const url = `https://anjakvernenes.no/wp-json/wp/v2/posts?per_page=9&offset=0`;

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
  return [posts, categories];
}

getData();

function printData(posts, categories) {
  const slide1 = document.querySelector("#slide1");
  const slide2 = document.querySelector("#slide2");
  const slide3 = document.querySelector("#slide3");

  slide1.innerHTML = ``;
  slide2.innerHTML = ``;
  slide3.innerHTML = ``;

  for (let i = 0; i < posts.length; i++) {
    const container = document.createElement("a");
    container.href = `post.html?id=${posts[i].id}`;
    container.classList.add("container");

    slide1.appendChild(container);

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

    slide1.appendChild(container);

    // readmore
    const readMore = document.createElement("p");
    readMore.innerText = "Read more";
    readMore.classList.add("txtstyle");
    container.appendChild(readMore);

    if (i === 2) {
      break;
    }
  }

  for (let i = 3; i < posts.length; i++) {
    const container = document.createElement("a");
    container.href = `post.html?id=${posts[i].id}`;
    container.classList.add("container");

    slide2.appendChild(container);

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

    slide2.appendChild(container);

    // readmore
    const readMore = document.createElement("p");
    readMore.innerText = "Read more";
    readMore.classList.add("txtstyle");
    container.appendChild(readMore);

    if (i === 5) {
      break;
    }
  }

  for (let i = 6; i < posts.length; i++) {
    const container = document.createElement("a");
    container.href = `post.html?id=${posts[i].id}`;
    container.classList.add("container");

    slide3.appendChild(container);

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

    slide3.appendChild(container);

    // readmore
    const readMore = document.createElement("p");
    readMore.innerText = "Read more";
    readMore.classList.add("txtstyle");
    container.appendChild(readMore);

    if (i === 8) {
      break;
    }
  }
}

function getCategoryById(categories, categoryId) {
  return categories.find((category) => category.id === categoryId);
}
