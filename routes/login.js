const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const fs = require('fs');
const path = require('path');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/login', (req,res,next) => {
    res.send(`<html>
    <head>
    <title>Login Page</title>
    </head>
    <body>
    <h1>Group Chat Application</h1>
    <form action="/" method="POST">
    <input type="text" name="name" id="name">
    <button type="submit" id="btn">Login</button>
    </form>
    
    <script>
    const btn = document.getElementById('btn');
    btn.addEventListener('click',() => {
        const name = document.getElementById('name').value;
        localStorage.setItem('username',name);
    })
    </script>
    </body>
    </html>`);
    
});
router.get('/', (req,res,next) => {
  const filePath = path.join(__dirname="chatMsgs.txt");
        fs.readFile(filePath, {encoding: "utf-8"},(err,data) => {
            if(err){
              data = "No Data";
                console.log(err);
            }
            res.send(`<html>
            <head><title>Chat App</title></head>
            <body><h1>${data}</h1><form action="/" method="POST">
            <input type="text" name="msg" id="msg" >
            <input type="text" name="uname" id="uname"><br><button id="btn1" type="submit">send</button></form>
            <script>
            const btn1 = document.getElementById('btn1');
            btn1.addEventListener('click',() => {
              document.getElementById("uname").value=localStorage.getItem('username');
              
            })
            </script>
            </body></html>`);
          });

});

router.post('/',(req,res,next) => {
  fs.appendFile("chatMsgs.txt",`${req.body.uname}:${req.body.msg}`,(err) =>
  err ? console.log(err) : res.redirect('/')
  );
});



module.exports = router;