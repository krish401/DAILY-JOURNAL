//jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");

import express from "express"
import bodyParser from "body-parser";
import lodash from "lodash"


const homeStartingContent = "Introducing a dynamic and versatile website that empowers you to effortlessly track and manage your personal affairs while fostering your creativity and individuality. This innovative platform serves as your digital hub for noting and organizing anything and everything that matters to you. The beauty of this website lies in its flexibility; it's a canvas waiting for your unique touch. Whether you're a list-maker, a visual thinker, or someone who loves to dive deep into details, this website accommodates your preferences and allows you to tailor your experience. The possibilities are boundless, from curating your dream travel itinerary to recording your daily thoughts, recipes, or artistic inspiration. Its user-friendly interface enhances your ability to express yourself, fostering a sense of ownership over your data and projects. Gone are the days of rigid note-taking; this website is your invitation to be as creative and free-spirited as you desire while staying organized and on top of your personal life. Unlock your potential, and let your imagination run wild with this all-in-one, versatile platform.";
const aboutContent = "I am currently immersed in an exciting phase of experimentation with various JavaScript frameworks, including Express and EJS, as well as harnessing the power of HTTP requests to create a fully functional website. This journey has been a fascinating exploration of web development, where I've been able to blend these technologies to craft dynamic and responsive web applications. Express has proven to be a robust and versatile framework, allowing me to effortlessly handle server-side logic and routing, while EJS has unlocked the potential for dynamic HTML templating. With the integration of HTTP requests, I'm now equipped to fetch and display real-time data from external sources, enriching the user experience. My aim is to leverage these tools to create a website that not only functions seamlessly but also offers an engaging and interactive user interface, making it an invaluable resource for its intended audience. This ongoing experiment is not just about coding; it's a journey of continuous learning and discovery within the realm of web development.";
const contactContent = "We welcome your communication and look forward to connecting with you. If you have any questions, feedback, or would like to discuss potential collaborations, please don't hesitate to reach out to us. You can contact us via email at krish40111@gmail.com. Your inquiries and messages are important to us, and we'll do our best to respond promptly. Thank you for visiting our website, and we're excited to engage with you.";

const app = express();
const port=3000
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[]
console.log(posts.length)
app.get("/",(req,res)=>{
  res.render("home.ejs",{
    homeContent:homeStartingContent,
    posts: posts
  })
})

app.get("/about",(req,res)=>{
  res.render("about.ejs",{about:aboutContent})
})


app.get("/posts/:postName",function(req,res){
  let name=lodash.lowerCase(req.params.postName)
  for(let i=0;i<posts.length;i++){
    let postName=lodash.lowerCase(posts[i].title)
    if(name==postName){
      res.render("post.ejs",{title:posts[i].title,content:posts[i].content,lotitle:name})
    } 
}})


app.get("/contact",(req,res)=>{
  res.render("contact.ejs",{contact:contactContent})
})

app.get("/compose",(req,res)=>{
  res.render("compose.ejs")
})

app.post("/compose",(req,res)=>{
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
  }

  posts.push(post)
  res.redirect("/")
})



app.listen(port, function() {
  console.log("Server started on port 3000");
});
