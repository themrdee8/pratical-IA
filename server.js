const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
    surname: String,
    othernames: String,
    phone: String,
    residential: String,
})

const Patient = mongoose.model('Patient', patientSchema);

const emergencySchema = new Schema({
    name: String,
    contact: String,
    relationship: String,
})

const Emergency = mongoose.model('Emergency', emergencySchema);

const visitationSchema = new Schema({ 
    id: { type: String, required: true },
    date: Date,
    encounter: [String, "Emergency / OPD / Specialist Care"]
})

const Visitation = mongoose.model('Visitation', visitationSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/patients', async (req, res) => {
    console.log(req.body);
    const patientObj = new Patient({
        name: req.body.name,
        contact: req.body.contact,
        relationship: req.body.relationship
    })
    try {
        const patient = await patientObj.save();
        console.log(patient);
        res.json(patient);
    } catch (err) {
        console.log(err);
    }
})

app.post("/emergency", async (req, res) => {
    console.log(req.body);
    const emergencyObj = new Emergency({
        name: req.body.name,
        contact: req.body.contact,
        relationship: req.body.relationship
    })
    try {
        const emergency = await emergencyObj.save();
        console.log(emergency);
        res.json
    } catch (error) {
        console.log(error);
    }
})

app.post("/visitation", async (req, res) => {
    console.log(req.body);
    const visitationObj = new Visitation({

    })
   try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
   }
})

mongoose.connect('mongodb+srv://themrdee:kaRNXVTrNF7iTsiX@cluster0.tzt20ql.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log('Node api app listening on port 3000!');
    });
  })
  .catch((err) => console.log(err))
