const dummy = (blogs) => {
  return 1;
};

const totalLikes = (bloglist) => {
  return bloglist
    .map((blog) => blog.likes)
    .reduce((sum, like) => sum + like, 0);
};

const favoriteBlog = (bloglist) => {
  blogWithMostLikes = bloglist.sort((a, b) => b.likes - a.likes)[0];

  const simpleBlogObject = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  };
  return simpleBlogObject;
};

const mostBlogs = (blogs) => {
  if (blogs.length !== 0) {
    const authors = [...new Set(blogs.map((p) => p.author))].map((a) => ({
      author: a,
      blogs: 0,
    }));

    authors.map((author) => {
      const blogCount = blogs.filter((blog) => blog.author === author.author);
      author.blogs = blogCount.length;
    });

    console.log(authors);

    const authorWithMostBlogs = authors.sort((a, b) => b.blogs - a.blogs)[0];
    return authorWithMostBlogs;
  }
  return -1;
};

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    const authors = [...new Set(blogs.map((p) => p.author))].map((a) => ({
      author: a,
      likes: 0,
    }));

    authors.map((author) => {
      const likesCount = blogs
        .filter((blog) => blog.author === author.author)
        .map((blog) => blog.likes)
        .reduce((a, b) => a + b, 0);

      console.log(likesCount);

      author.likes = likesCount;
      console.log(authors);
    });
    return authors.sort((a, b) => b.likes - a.likes)[0];
  }
  return -1;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
