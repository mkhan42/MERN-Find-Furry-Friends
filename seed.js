require("dotenv").config();
require("./config/database");

const Post = require("./models/post");
const Comment = require("./models/comment");
const User = require("./models/user")(
  // IIFE - Immediately Invoked Function Expression
  async function () {
    await User.deleteMany({});
    const users = await User.create([
      { name: "Tina", email: "tina@email.com", password: "123" },
      { name: "Tony", email: "tony@email.com", password: "123" },
    ]);

    await Post.deleteMany({});
    const posts = await Post.create([
      {
        user: User[0],
        postType: "Lost",
        title: "Help! I lost my dog!",
        name: "Pepper",
        imgURL:
          "https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80",
        animalType: "mixed",
        age: "1yo",
        lastAddress: "New York, NY",
        description: "white, timid",
        reward: "100 dollars",
        contactInfo: "please email to xxx@email.com",
        date: "2022/07/07",
        comments: Comment[0],
      },
      {
        user: User[1],
        name: "unknown",
        postType: "Found",
        title: "I found a dog!",
        imgURL:
          "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d",
        animalType: "mixed",
        age: "looks like 3 mo",
        lastAddress: "Hong Kong, China",
        description: "white, grey",
        reward: "100 dollars",
        contactInfo: "please text to 1-101-111-1234",
        date: "2022/07/04",
        comments: Comment[1],
      },
    ]);

    await Comment.deleteMany({});
    const comments = await Comment.create([
      {
        user: User[1],
        post: Post[0],
        commentTitle: "not sure...",
        content: "I may find your dog. Will email you later.",
      },
      {
        user: User[0],
        post: Post[1],
        commentTitle: "This is mine",
        content: "Thank you so much! This is my puppy!",
      },
    ]);

    console.log(posts);
    console.log(comments);
    process.exit();
  }
)();
