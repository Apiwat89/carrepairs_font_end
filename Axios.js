const path = require("path");
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

const base_url = "http://localhost:3000";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/public/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static (__dirname + '/public'));

const part = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, path.join(__dirname, './public/picture/products'));
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname);
    }
})

const ap = multer({storage: part});

app.get("/", async (req, res) => {
    try {
        return res.render("index", {addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error /');
    }
});

app.get("/spareparts", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/spareparts");
        return res.render("spareparts", {sp: response.data, addpart: true});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error spareparts');
    }
});

app.get("/addpart", async (req, res) => {
    try {
        return res.render("addpart", {addpart: true});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error addpart');
    }
});

app.post("/addpart", ap.single('image'), async (req, res) => {
    try {
        const response = await axios.get(base_url + "/suppliers");
        const suppliers = response.data;

        let IDSupplier = null;
        for (let spl of suppliers) {
            if (spl.name == req.body.supplier) {
                IDSupplier = spl.supplierID;
            }
        }

        if (IDSupplier == null || !req.file) {
            return res.redirect("/spareparts");
        } 

        const data = {
            supplierID: IDSupplier,
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            url: req.file.filename
        }

        await axios.post(base_url + "/spareparts", data);
        return res.redirect("/spareparts");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error addpart post');
    }
});

app.get("/editpart/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/spareparts/" + req.params.id)
        return res.render("editpart", {sp_one: response.data, addpart: true});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editpart');
    }
});

app.post("/editpart/:id", ap.single('image'), async (req, res) => {
    try {
        const response = await axios.get(base_url + "/suppliers");
        const suppliers = response.data;

        const data = {
            supplierID: suppliers.supplierID,
            name: !req.body.name ? suppliers.name : req.body.name,
            price: !req.body.price ? suppliers.price : req.body.price,
            quantity: !req.body.quantity ? suppliers.quantity : req.body.quantity,
            url: !req.file ? suppliers.url : req.file.filename
        }

        await axios.put(base_url + "/spareparts/" + req.params.id, data);
        return res.redirect("/spareparts");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editpart post');
    }
});

app.get("/deletepart/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/spareparts/" + req.params.id);
        return res.redirect("/spareparts");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deletepart');
    }
});

app.get("/repairs", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/repairs");
        return res.render("repairs", {rp: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error repairs');
    }
});

app.get("/repairinfo/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/repairs/" + req.params.id);
        return res.render("repairinfo", {rp_one: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error repairinfo');
    }
});

app.get("/deleterepair/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/repairs/" + req.params.id);
        return res.redirect("/repairs");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleterepair');
    }
});

app.get("/supplier", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/suppliers");
        return res.render("supplier", {spl: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error supplier');
    }
});

app.get("/supplierinfo/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/suppliers/" + req.params.id);
        return res.render("supplierinfo", {spl_one: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error supplierinfo');
    }
});

app.get("/deletesupplier/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/suppliers/" + req.params.id);
        return res.redirect("/supplier");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deletesupplier');
    }
});

app.get("/customers", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/customers");
        return res.render("customers", {cm: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error customers');
    }
});

app.get("/customersinfo/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + "/customers/" + req.params.id);
        return res.render("customersinfo", {cm_one: response.data, addpart: false});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error supplierinfo');
    }
});

app.get("/deletecustomer/:id", async (req, res) => {
    try {
        await axios.delete(base_url + "/customers/" + req.params.id);
        return res.redirect("/customers");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deletecustomer');
    }
});

app.listen(5500, () => console.log('Server started on port http://localhost:5500'));