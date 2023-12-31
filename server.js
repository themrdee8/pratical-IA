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

const labsSchema = new Schema({
    bloodPressure: String,
    temperature: String,
    pulse: String,
    sp02: String,
})

const Labs = mongoose.model('Labs', labsSchema);

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

app.post("/patients/emergency", async (req, res) => {
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

app.post("/patients/visitation", async (req, res) => {
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

app.post("/patients/:id/labs", async (req, res) => {
    const id = req.params.id;
    const { bloodPressure, temperature, pulse, sp02 } = req.body;
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            res.send(404).json({ message: "Patient not found"});
        } else {
            const labsObj = new Labs({
                bloodPressure,
                temperature,
                pulse,
                sp02
            })
        }
        const labs = await labsObj.save();
        res.send(200).json({
            id: patient.id,
            name: patient.name,
            bloodPressure: labs.bloodPressure,
            temperature: labs.temperature,
            pulse: labs.pulse,
            sp02: labs.sp02
        });
    } catch (error) {
        console.log(error);
        res.send(404).json({ message: "Error saving labs" });
    } 
})

app.get("/patients", async (req, res) => {
    console.log(req.body);
    const patients = await Patient.find({});
    if(!patients) {
        res.send("No patients found");
    }
    res.json(patients);
})

app.get("/patients/:id", async (req, res) => {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    if(!patient) {
        res.send("No patients found");
        return;
    }
    res.json(patient);
})

mongoose.connect('mongodb+srv://themrdee:kaRNXVTrNF7iTsiX@cluster0.tzt20ql.mongodb.net/node-api?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, () => {
        console.log('Node api app listening on port 3000!');
    });
  })
  .catch((err) => console.log(err))
