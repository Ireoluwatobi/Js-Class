import express, {Express ,Request, Response } from "express";
const mailFunction = require('./mailFunction')
import fs from "fs";
import cookieParser from "cookie-parser";
let vis:number = 0
const PORT: number = 8000;







var app: Express = express();
app.use(express.json());
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }));

app.get("/register", function (req: Request, res: Response) {
  res.status(200)
  .json({ result: "Register Here" });
});

interface USERS {
    users: {
        User: string;
        email: string;
    }[];
}
app.get("/register/user/email",  function (req: Request, res: Response) {
  fs.readFile(
    'newlyRegistered.json', 'utf8',  function (err:any, data:any) {
    if (err)throw err;
    
   
    var regData : USERS = JSON.parse(data)

    var newData: any[] = regData['users']
    

    res.status(200)
  .json({ result : newData[vis].email });
  }) 
});

app.get("/register/user", function (req: Request, res: Response) {
 
  res.status(200)
  .json({ result : req.cookies['name_of_user'] });
});


app.post("/register", async function (req: Request, res: Response) {
 
  const { email, username } = req.body;
 
  if (!email || !username) {
    res.status(400).json({
      message: "Enter all fields",
    });
  } else {

    res.cookie('name_of_user', `${username}`);
                   fs.readFile(
                      "newlyRegistered.json", 'utf8',  function (err: any, data:any) {
                        if (err) throw err;
                  
                        if (data == '')
                        {
                          let oldData =  {
                              "users": [
                                { User : `${username}`, email : `${email}`}
                              ]
                            }
                          fs.writeFile("newlyRegistered.json", JSON.stringify(oldData), (err:any)=>{
                              if(err) throw err;
                              console.log(`Users Saved!`);
                            })
                              }else{
                        let myData = JSON.parse(data);
                        myData['users'].push({ User : `${username}`, email : `${email}`})

                        fs.writeFile("newlyRegistered.json", JSON.stringify(myData), (err:any)=>{
                          if(err) throw err;
                          console.log(`Users Saved!`);
                        } )
                        vis++
                              }
                      })  
                                   
   await mailFunction.mailer(email, username)
  


    res.status(200).json({
      status: "OK",
    });
  }
});

async function startApp() {
    try {
        app.listen(PORT);
        console.log(`Server is running on ${PORT}`);
    } catch (error: any) {
        console.log(error);
    }
}

startApp();




