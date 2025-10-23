import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var blogs=[];

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        articleArray: blogs
    });
});

app.post("/submit",(req,res)=>{
    const entry = {
        id: Date.now(),
        content: req.body["article"]
    }
    blogs.push(entry);
    res.redirect("/");
});

app.get("/post/:postId",(req,res)=>{
    const id = req.params.postId;
    const foundPost = blogs.find(blog=>blog.id==id);
    res.render("post.ejs",{
        post: foundPost
    });
});

app.get("/edit/:postId",(req,res)=>{
    const idOfPost = req.params.postId;
    const result = blogs.find((blog) => blog.id == idOfPost);//== because url is a string and blog.id is a number
    res.render("edit.ejs",{
        post: result
    });
});

app.post("/update",(req,res)=>{
    const id = req.body.postId;
    const newContent = req.body.article;
    const foundIndex = blogs.findIndex(blog=>blog.id==id);
    if(foundIndex>-1) {
        blogs[foundIndex].content=newContent;
    }
    res.redirect("/");
});

app.get("/delete/:postId",(req,res)=>{
    const idOfPost = req.params.postId;
    const foundIndex = blogs.findIndex((blog) => blog.id == idOfPost);
    if(foundIndex>-1){
        blogs.splice(foundIndex,1);
    }
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`server running on ${port}.`);
})