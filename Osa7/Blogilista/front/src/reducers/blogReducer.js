import blogService from "../services/blogs";
/* 
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
 */

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch({
      type: "ADD",
      data: newBlog,
    });
  };
};
export const addLike = (blogObject, id) => {
  return async (dispatch) => {
    const data = blogService.update(id, blogObject);
    console.log(data);
    dispatch({
      type: "LIKE",
      data: { id: id, blog: blogObject },
    });
    console.log("toimii");
    console.log(id);
  };
};
export const remove = (id) => {
  return async (dispatch) => {
    blogService.remove(id);
    dispatch({
      type: "REMOVE",
      data: id,
    });
  };
};
export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOG",
      data: blogs,
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "LIKE":
      /*  state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      ); */
      /* update.map((blog) => {
            if (blog.id === id) {
              return (blog.likes = blogObject.likes);
            }
          }); */

      const id = action.data.id;
      console.log("hep");
      return state.map((blog) =>
        blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
      );
    case "REMOVE":
      return state.filter((blog) => blog.id !== action.data);

    case "ADD":
      //const c = action.data.content

      const blogToAdd =
        action.data; /* {
        title: action.data.content,
        id: action.data.id,
        votes: 0,
      }; */
      console.log(blogToAdd);
      return state.concat(blogToAdd);

    case "INIT_BLOG":
      return action.data;

    default:
      return state;
  }
};

export default reducer;
