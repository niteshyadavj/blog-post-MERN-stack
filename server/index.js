const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection");
const BlogPost = require("./models/BlogPost");

const app = express();
const port = 5000;

//connect database
connectDb();

//middlewares
app.use(express.json());
app.use(cors());
 
//routes
app.post("/post-blog", async (req, res) => {
  let blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();

  res.json({ message: "Blog post saved successfully", blog });
});
 
app.get("/get-blog", async (req, res) => {
  let blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({ message: "No Blogs Found" });
  } 
  res.json({ blogs });
});

app.delete("/delete-blog/:id", async (req, res) => {
  let blogs = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blogs) { 
    res.status(404).json({ message: "No Blog Found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
}); 
 
app.put("/update-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndUpdate(req.params.id);
  if (!blog) { 
    res.status(404).json({ message: "No Blog Found" });
  }
  if (!req.body.title && !req.body.description) {
    res.json({ message: "Please enter title or description" });
  } else if (!req.body.title) {
    blog.description = req.body.description;
  } else if (!req.body.title) {
    blog.description = req.body.description;
  } else if (!req.body.description) {
    blog.title = req.body.title;
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description; 
  }
  await blog.save();
  res.status(200).json({message: "Blog updated successfully"})
});

//listen port
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
