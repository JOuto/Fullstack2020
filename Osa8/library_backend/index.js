const {
  ApolloServer,
  gql,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./Models/book");
const Author = require("./Models/author");
const User = require("./Models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();
require("dotenv").config();
const DataLoader = require("dataloader");

const JWT_SECRET = "kissa";

const MONGO = process.env.MONGODB_URI;

console.log("connecting to MongoDB");

mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    genre: String!
  }
  type Subscription {
    bookAdded: Book!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /*   if (!args.author && !args.genre) {
          return books;
        }
        if (args.author && !args.genre) {
          return books.filter((book) => book.author === args.author);
        }
        if (!args.author && args.genre) {
          return books.filter((book) => book.genres.includes(args.genre));
        }
  
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        ); */

      //const b = await Book.find({}).populate("author");

      if (!args.author && !args.genre) {
        return await Book.find({}).populate("author");
      }
      if (args.author && !args.genre) {
        const authorForId = await Author.findOne({ name: args.author });
        return await Book.find({ author: authorForId.id }).populate("author");
      }
      if (!args.author && args.genre) {
        return await Book.find({ genres: args.genre }).populate("author");
      }
      const authorForId = await Author.findOne({ name: args.author });
      return await Book.find({
        genres: args.genre,
        author: authorForId.id,
      }).populate("author");
    },

    allAuthors: async () => {
      const a = await Author.find({});
      //console.log(a);
      return a;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save(); /* .catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }); */
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const authorInDb = await Author.findOne({ name: args.author });
      if (!authorInDb) {
        const author2 = new Author({
          name: args.author,
          id: uuid(),
          born: null,
        });
        //console.log(author);
        //authors = authors.concat(author);
        author2.save();
        const book = new Book({ ...args, author: author2.id, id: uuid() });
        try {
          book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        pubsub.publish("BOOK_ADDED", {
          bookAdded: {
            ...args,
            author: { name: author2.name, id: author2.id },
            id: book.id,
          },
        });
        return;
        //return book.save();
      }

      const book = new Book({ ...args, author: authorInDb.id, id: uuid() });
      book.save(book);
      return { ...args, author: { name: args.author }, id: uuid() };
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      console.log(user);
      console.log(args.username);
      console.log(args.password);

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
        genre: user.favouriteGenre,
      };
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      try {
        return Author.findByIdAndUpdate(author.id, {
          born: args.setBornTo,
        });
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return resultAuthor;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
  Author: {
    bookCount: (root) => {
      const bookCountLoader = new DataLoader(async (keys) => {
        const books1 = await Book.find({}).populate("author");

        const result = keys.map((key) => {
          return books1.filter((book) => book.author.name === key).length;
        });
        return Promise.resolve(result);
      });

      return bookCountLoader.load(root.name);
    },
  },
  /* 
      const books1 = await Book.find({}).populate("author");
      //console.log(books1);

      return books1.filter((book) => book.author.name === root.name).length;
    },
  }, */
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
