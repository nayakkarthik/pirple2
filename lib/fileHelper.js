const fs = require('fs');
const path = require('path');
const baseFilePath = __dirname +"/../Data/";

var fileHelp = {};

fileHelp.create = function(dir,fileName,data,callback)
{
    filePath = path.join(baseFilePath,dir,fileName+".json");
    fs.open(filePath,'wx+',(err,fd)=>{
      if(!err)
      {
          
        fs.writeFile(filePath,JSON.stringify(data),(err) =>
        {
           callback(err);
            fs.closeSync(fd); 
        });
      }
      else
      {
           callback(err);
      }
    });

}

fileHelp.update = function(dir,fileName,data,callback)
{
    filePath = path.join(baseFilePath,dir,fileName+".json");
    fs.open(filePath,'r+',(err,fd)=>{
      if(!err)
      {

        fs.truncate(filePath,(err)=>{
        
          if(!err)
          {
          fs.writeFile(filePath,JSON.stringify(data),(err) =>
          {

             callback(err);
              fs.closeSync(fd); 
          });
          }
          else
          callback(err);
         }); 
      

      }
      else
      {
           callback(err);
      }
    });
}

fileHelp.read = function(dir,fileName,callback)
{
    filePath = path.join(baseFilePath,dir,fileName+".json");
    fs.open(filePath,'r',(err,fd)=>{
      if(!err)
      {
          
        fs.readFile(fd,(err,data) =>
        {
           callback(err,data);
            fs.closeSync(fd); 
        });
      }
      else
      {
           callback(err)
      }
    });
}

fileHelp.delete = function(dir,fileName,callback)
{
    filePath = path.join(baseFilePath,dir,fileName+".json");
    fs.unlink(filePath,callback);

}

module.exports = fileHelp;
