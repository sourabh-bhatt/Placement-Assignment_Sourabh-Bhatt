// fetching data from the api
// https://jsonplaceholder.typicode.com/posts
function fetchPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => displayPosts(posts))
    .catch((error) => console.log("Error:", error));
}

// Display the blog posts
function displayPosts(posts) {
  const blogPostsContainer = document.getElementById("blogPosts");
  blogPostsContainer.innerHTML = "";

  posts.forEach((post) => {
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-container");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.classList.add("body");
    body.textContent = post.body;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deletePost(post.id));

    blogContainer.appendChild(title);
    blogContainer.appendChild(body);
    blogContainer.appendChild(deleteBtn);

    blogPostsContainer.appendChild(blogContainer);
  });
}

// Add a new blog post
function addBlog(event) {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("body");

  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      titleInput.value = "";
      bodyInput.value = "";
      fetchPosts();
    })
    .catch((error) => console.log("Error:", error));
}

// Delete a blog post
function deletePost(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  })
    .then(() => fetchPosts())
    .catch((error) => console.log("Error:", error));
}

// Fetch posts when the page loads
window.addEventListener("load", fetchPosts);

// Add event listener to the form submit event
const addBlogForm = document.getElementById("addBlogForm");
addBlogForm.addEventListener("submit", addBlog);
