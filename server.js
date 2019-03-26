const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const aes = require('./client/src/utils/aes_utils.js');
const fs = require('fs');


//for body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/api',router);

const port = 3001;

//for multer storage
const storage = multer.diskStorage({
  destination : function(req , file, callback){
    callback(null, './uploads');
  },
  filename : function(req, file, callback){
    callback(null,file.originalname +"_" + Date.now());
  }
});
const upload = multer({storage : storage}).single('encryptedImg');


app.get('/', (req, res) =>{
    res.send("welcome to the server");
});

router.post('/upload',upload, (req, res) =>{
  console.log(req.file);
  fs.readFile(`./uploads/${req.file.filename}`, 'base64', function(err, data){
      if(err) throw err;
      let decrypted = aes.decrypt(data);
      let buf = Buffer.from(decrypted,"base64");
      fs.writeFile(`./uploads/${req.file.originalname}`, buf, function(err){
        if(err) throw err;
        fs.unlink(`./uploads/${req.file.filename}`, function(err){
          if(err){
            res.status(400).json({
              success : false
            });
          };
          console.log('file saved succesfully');
          res.json({
            success : true
          });
        }) ;
      });
   });
});

//listening to a port
app.listen(port,()=>{
  console.log('server is running on port '+port);
});

module.exports = app ;
