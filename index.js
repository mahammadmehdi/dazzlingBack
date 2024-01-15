import express from 'express'
import mongoose, { Schema } from 'mongoose'
import cors from 'cors'
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const dazzlingSchema = new Schema({
    name: String, 
    time: String,
    comment: String,
    folder: String,
    image: String,
    description: String,

  });

  const dazzlingModel = mongoose.model('Dazzling', dazzlingSchema);

app.get('/', async(req, res) => {
    const dazzling = await dazzlingModel.find({})
  res.send(dazzling)
})

app.get('/:id', async(req, res) => {
    const {id} = req.params
    const dazzling =  await dazzlingModel.findById(id)
    res.send(dazzling)
  })
  
  app.post('/', async(req, res) => {
    const {name,time,comment,image,folder,description} = req.body
    const newDazzling = new dazzlingModel({name,time,comment,image,folder,description})
    await newDazzling.save()
    res.send('Got a POST request')
  })
  
  app.put('/:id', async(req, res) => {
    const {id} = req.params
    const {name,time,comment,image,folder,description} = req.body
const dazzling = await dazzlingModel.findByIdAndUpdate(id,{name,time,comment,image,folder,description})
    res.send(dazzling)
  })
  
  app.delete('/:id', async(req, res) => {
    const {id} = req.params
     const dazzling = await dazzlingModel.findByIdAndDelete(id)
    res.send(dazzling)
  })

  mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/')
  .then(() => console.log('Connected!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})