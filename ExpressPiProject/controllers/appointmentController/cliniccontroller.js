const userSchema = require("../../models/Users/userSchema");
const clinicdb= require("../../models/appointment/clinic");
const  cheerio= require('cheerio');
const request= require('request-promise');

const puppeteer = require('puppeteer');
const fs=require('fs/promises');


// create and save  a new clinic 

exports.create= (req,res)=>{
    //validate a request 
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty !"});
        return; 
    }
    //new clinic
    const clinic= new clinicdb({
        Name:req.body.Name,
        Adress:req.body.Adress,
        phone_number:req.body.phone_number,
        
    })

    //save the user in the database

    clinic
    .save()
    .then(data=>{res.send(data)})
    .catch(err=>{res.status(500).send({message:err.message || "Some errors occured while creating a new clinic"})})
}

exports.scrapeAndSaveData = async (req, res) => {
    const url = "";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const tables = [];
    
    try {
      for (let i = 1; i <= 10; i++) {
        const pageUrl = `https://www.annuairepro-tunisie.com/sous-activite-cliniques.html?page=${i}`;
        await page.goto(pageUrl);
  
        const items = await page.evaluate(() => {
          const itemList = Array.from(document.querySelectorAll('ul.companies >li'));
          const data = [];
  
          itemList.forEach(item => {
            const Name = item.querySelector('.title a').textContent.trim();
            const Adress = item.querySelector('.body p').textContent.trim();
            const phone_number = item.querySelector('.right ul li.phone').textContent.trim();
            data.push({ Name, Adress, phone_number });
          });
  
          return data;
        });
  
        tables.push(...items);
        console.log(tables)
      }
  
      for (let i = 0; i < tables.length; i++) {
        const clinic = new clinicdb({
          Name: tables[i].Name,
          Adress: tables[i].Adress,
         phone_number: tables[i].phone_number,
        });
  
        try {
          await clinic.save();
        } catch (error) {
          console.log(error);
        }
        
       }
     res.send({tables:tables});
      await browser.close();
  
      
    } catch (error) {
      console.log(error);
      await browser.close();
      res.status(500).send(error);
    }
  };

     
   
    
      

     // retrieve and return all users 
    exports.find=(req,res)=>{
        clinicdb.find()
        .then(clinic=>{
        res.send(clinic)})
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured while trying to retieve data"})
        })
    }
    
    exports.update=(req,res)=>{
        if(!req.body){
            return res
            .status(400)
            .send({message:"Data to update cannot be empty !"})
        }
        const id=req.params.id;
        clinicdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false })
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update clinic with ${id}.May be the clinic is not found `})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{res.status(500).send({message:"Error while updating the clinic"})})

     }

    exports.delete=(req,res)=>{
        const id=req.params.id;
        clinicdb.findByIdAndRemove(id)
        .then(data=>{if(!data){
               res.status(404).send({message:`Cannot delete using ${id}.May be the id is wrong !`})
        } else{
           res.send({message: "Clinic was deleted successfully !"}) 
        }
       

        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete clinic with id=" + id
            });
        });
    }

    exports.findClinicById = async (req, res) => {
      const id = req.params.id;
    
      try {
        const clinic = await clinicdb.findById(id);
    
        if (!clinic) {
          return res.status(404).send({ message: "User not found" });
        }
    
        res.send(clinic);
      } catch (err) {
        res.status(500).send({ message: "Internal server error" });
      }
    };
    