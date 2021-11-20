import express from "express";
import path from "path";
import * as fs from "fs";
import sharp from 'sharp';

const app = express();
    const CORS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Accept'
    };
    const login = 'tatiana.shirshikova';


    app
    .all('/login/', (req, res) => {
        res.set(CORS);
        res.send(login);
        })

      .get("/", function (req, res) {
            const tempPath = path.resolve();
            res.sendFile(path.join(tempPath, "/img/ficus.png"));
        })
      .get("/makeimage/", function(req, res) {
            const width = parseInt(req.query.width);
            const height = parseInt (req.query.height);
            const tempPath1 = path.resolve();
            
            sharp(path.join(tempPath1, "/img/ficus.png")).resize({ width: width, height: height }).toFile(path.join(tempPath1, "/img/ficus-resized.png"))
                .then(function(newFileInfo) {
                    console.log("Success");
                })
                .catch(function(err) {
                    console.log("Error occured");
                });
                                                                                                         
            res.set(CORS);
            res.setHeader('Content-Type', 'image/png');
            res.download(path.join(tempPath1, "/img/ficus.png"));
          },
        )
      .listen(process.env.PORT || 4321);