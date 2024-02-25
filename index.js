const express = require("express");
const mongoose = require("mongoose");

const app = express();

// with Article we can add article and connection with database by Article.
const Article = require("./models/Article");

app.use(express.json());

//    "mongodb+srv://ahmedbasuony:AmAaB1998AtLaS@myfirstnodjscluster.nxeffan.mongodb.net/?retryWrites=true&w=majority"
// mongodb+srv://ahmedbasuony:AmAaB1998AtLaS@myfirstnodjscluster.nxeffan.mongodb.net/?retryWrites=true&w=majority
// connect to database
mongoose
  .connect(
    "mongodb+srv://ahmedbasuony:AmAaB1998AtLaS@myfirstnodjscluster.nxeffan.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connecting Successfully");
  })
  .catch((error) => {
    console.log("Error in connecting with DB", error);
  });

// app.get("/test", (req, res) => {
//   let number = "";
//   for (let i = 0; i <= 100; i++) {
//     number += i + "-";
//   }
//   res.render("numbers.ejs", {
//     name: "ahmed",
//     number: number,
//   });
// });

// ==== Articles endpoints ====

// save the article with data from  client side req body
app.post("/articles", async (req, res) => {
  //   return the list of all articles from the db
  const newArticle = new Article();
  const reqBody = req.body;
  newArticle.title = reqBody.articleTitle;
  newArticle.body = reqBody.articleBody;
  newArticle.numberOfLikes = reqBody.articleNumberOfLikes;
  // save the data  to the database it is Asynchrounce function
  await newArticle.save();

  console.log(reqBody);
  res.send("the new article has been stored");
});

// find  an article by its id
app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error while reading article of id ", error);
    return res.send("error");
  }
});

// delete article by its id that comes from url with params
app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error while deleting article", error);
    return res.send("error Deleting");
  }
});

// show all articles in html file
app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();

  res.render("articles.ejs", {
    allArticles: articles,
  });
});

app.listen(3000, () => {
  console.log("iam lisntning  on port 3000");
});
