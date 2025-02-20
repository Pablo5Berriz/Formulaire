require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// Rediriger vers index.html par défaut
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// ✅ Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

// ✅ Endpoint pour envoyer l'email
app.post("/send-email", async (req, res) => {
    const { nom_complet, email, message } = req.body;

    const mailOptions = {
        from: `"Comptaclems" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `Nouveau message de ${nom_complet}`,
        html: `
            <h2>Vous avez reçu un nouveau message</h2>
            <p><strong>Nom :</strong> ${nom_complet}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong> ${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email envoyé avec succès !" });
    } catch (error) {
        console.error("Erreur d'envoi d'email :", error);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email." });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
