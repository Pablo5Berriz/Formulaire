let currentStep = 1; 
const formSections = document.querySelectorAll(".form-section");
const totalSteps = formSections.length;
const titleSection = document.getElementById("title-section");

// Sélection des boutons de navigation
const nextButton = document.querySelector(".btn-primary");
const prevButton = document.querySelector(".btn-secondary");
const submitButton = document.getElementById("submit-button");

// Sélection des champs dynamiques
const etatCivil = document.getElementById("etat-civil");
const travailleurAutonome = document.getElementById("Travailleur");
const enfantsChargeRadios = document.querySelectorAll("input[name='enfants']");
const sectionEnfants = document.getElementById("infos-enfants");
const sectionTravailleur = document.querySelector("[data-step='7']");
const enfantsContainer = document.getElementById("enfants-container");
const tarifPersonneSeule = document.getElementById("tarif-personne-seule");
const tarifCouple = document.getElementById("tarif-couple");
const tarifTravailleurAutonome = document.getElementById("tarif-travailleur-autonome");
const documentsInput = document.getElementById("documents");
const fileListContainer = document.getElementById("file-list");
documentsInput.parentElement.appendChild(fileListContainer);

// ✅ Fonction pour mettre à jour l'affichage des sections et boutons
function updateStepVisibility() {
    formSections.forEach((section, index) => {
        section.style.display = (index + 1 === currentStep) ? "block" : "none";
    });

    // Affichage du titre uniquement à l'étape 1
    titleSection.style.display = (currentStep === 1) ? "block" : "none";

    // Affichage des boutons de navigation
    prevButton.style.display = (currentStep === 1) ? "none" : "inline-block";
    nextButton.style.display = (currentStep < totalSteps) ? "inline-block" : "none";
    submitButton.style.display = (currentStep === totalSteps) ? "inline-block" : "none";

    // ✅ S'assurer que le bouton "Retour" reste visible dans la dernière section
    if (currentStep === totalSteps) {
        prevButton.style.display = "inline-block"; 
        nextButton.style.display = "none";
    }

    // ✅ Vérifier si la section 4 est atteinte
    if (currentStep === 4) {
        genererChampsConjoint();
    }

    // ✅ Générer les champs enfants uniquement lorsque l'utilisateur arrive en section 5
    if (currentStep === 5) {
        const selectedEnfants = document.querySelector("input[name='enfants']:checked")?.value || "0";
        genererChampsEnfants(parseInt(selectedEnfants));
    }
}

// ✅ Fonction pour mettre à jour la tarification en section 8
function updateTarification() {
    const etatCivilValue = etatCivil.value;
    const isTravailleur = travailleurAutonome.value === "Oui";

    // ✅ Réinitialisation des affichages
    tarifPersonneSeule.style.display = "none";
    tarifCouple.style.display = "none";
    tarifTravailleurAutonome.style.display = "none";

    // ✅ Cas : Marié(e) ou Conjoint(e) de fait
    if (["Marié(e)", "Conjoint(e) de fait"].includes(etatCivilValue)) {
        if (isTravailleur) {
            tarifTravailleurAutonome.style.display = "block"; 
        } else {
            tarifCouple.style.display = "block"; 
        }
    } 
    else {
        if (isTravailleur) {
            tarifTravailleurAutonome.style.display = "block"; 
        } else {
            tarifPersonneSeule.style.display = "block"; 
        }
    }
}


// ✅ Fonction pour générer dynamiquement les champs enfants
function genererChampsEnfants(nombre) {
    enfantsContainer.innerHTML = ""; 

    for (let i = 1; i <= nombre; i++) {
        let enfantHtml = `
            <div class="form-group enfant-section">
                <h3>Enfant ${i}</h3>
                
                <label>Nom </label>
                <div class="input-group">
                    <input type="text" placeholder="Prénom" required>
                    <input type="text" placeholder="Deuxième prénom">
                    <input type="text" placeholder="Nom de famille" required>
                </div>

                <label>Date de naissance </label>
                <input type="date" required>

                <label>Numéro d'assurance sociale </label>
                <input type="text" placeholder="ex: 123123123" required>

                <h4>Où vit l'enfant?</h4>
                <div class="radio-group">
                    <label><input type="radio" name="adresse-enfant-${i}" value="meme" required> Vit à la même adresse que vous</label>
                    <label><input type="radio" name="adresse-enfant-${i}" value="autre"> Vit à une autre adresse</label>
                </div>

                <div class="adresse-container" id="adresse-container-${i}">
                    <h4>Si adresse différente, veuillez la renseigner ici</h4>

                    <label>Numéro et rue </label>
                    <input type="text" placeholder="Ex: 123 Rue Principale">
                    
                    <label>Ville </label>
                    <input type="text" placeholder="Ex: Montréal">
                    
                    <label>Province </label>
                    <select>
                        <option value="">Veuillez sélectionner votre province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">Colombie-Britannique</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">Nouveau-Brunswick</option>
                        <option value="NL">Terre-Neuve-et-Labrador</option>
                        <option value="NS">Nouvelle-Écosse</option>
                        <option value="NT">Territoires du Nord-Ouest</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Île-du-Prince-Édouard</option>
                        <option value="QC">Québec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                        <option value="Autre">Autre</option>
                    </select>

                    <label>Code Postal </label>
                    <input type="text" pattern="[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d" placeholder="Ex: A1A 1A1">

                    <label>Pays </label>
                    <select>
                    <option value="">Veuillez sélectionner votre pays</option>
                                <option value="Autre">Burkina Faso</option>
                                <option value="Autre">Burundi</option>
                                <option value="Autre">Cameroun</option>
                                <option value="Autre">Canada</option>
                                <option value="Autre">Cap-Vert</option>
                                <option value="Autre">Côte d'Ivoire</option>
                                <option value="Autre">Congo</option>
                                <option value="Autre">Djibouti</option>
                                <option value="Autre">Gabon</option>
                                <option value="Autre">Gambia</option>
                                <option value="Autre">Ghana</option>
                                <option value="Autre">Guinée</option>
                                <option value="Autre">Guinée-Bissau</option>
                                <option value="Autre">Léopoldville</option>
                                <option value="Autre">Liberia</option>
                                <option value="Autre">Libye</option>
                                <option value="Autre">Madagascar</option>
                                <option value="Autre">Malawi</option>
                                <option value="Autre">Mali</option>
                                <option value="Autre">Mauritanie</option>
                                <option value="Autre">Maurice</option>
                                <option value="Autre">Niger</option>
                                <option value="Autre">Nigeria</option>
                                <option value="Autre">Rwanda</option>
                                <option value="Autre">Sénégal</option>
                                <option value="Autre">Serbie</option>
                                <option value="Autre">Sierra Leone</option>
                                <option value="Autre">Tchad</option>
                                <option value="Autre">Togo</option>
                                <option value="Autre">Tunisie</option>
                                <option value="Autre">Yémen</option>
                                <option value="Autre">Zambie</option>
                                <option value="Autre">Zimbabwe</option>
                    </select>
                </div>
            </div>
        `;
        enfantsContainer.insertAdjacentHTML("beforeend", enfantHtml);
    }

    // ✅ Appliquer la gestion du masquage de l'adresse pour chaque enfant
    document.querySelectorAll(".enfant-section").forEach((enfantSection, index) => {
        const radioButtons = enfantSection.querySelectorAll(`input[name="adresse-enfant-${index + 1}"]`);
        const adresseContainer = document.getElementById(`adresse-container-${index + 1}`);

        radioButtons.forEach(radio => {
            radio.addEventListener("change", function () {
                adresseContainer.style.display = (radio.value === "meme") ? "none" : "block";
            });
        });
    });
}


function genererChampsConjoint() {
    const conjointsContainer = document.getElementById("conjoints-container");
    const etatCivilValue = document.getElementById("etat-civil").value;
    const sectionConjoint = document.getElementById("infos-conjoints"); 

    // ✅ Vérification si on est dans la section 4 avant d'afficher le formulaire
    if (currentStep !== 4) {
        sectionConjoint.style.display = "none";
        return;
    }

    // ✅ Vérification de l'état civil pour afficher ou masquer la section conjoint
    if (["Marié(e)", "Conjoint(e) de fait"].includes(etatCivilValue)) {
        sectionConjoint.style.display = "block";
    } else {
        sectionConjoint.style.display = "none";
        return; 
    }

    // ✅ Vérifier si les champs existent déjà pour éviter la duplication
    if (!document.querySelector(".conjoint-section")) {
        let conjointHtml = `
            <div class="form-group conjoint-section">
                <label>Nom <span style='color: red;'>*</span></label>
                <div class="input-group">
                    <input type="text" name="conjoint-prenom" placeholder="Prénom" required>
                    <input type="text" name="conjoint-deuxieme-prenom" placeholder="Deuxième prénom">
                    <input type="text" name="conjoint-nom" placeholder="Nom de famille" required>
                </div>

                <label>Date de naissance <span style='color: red;'>*</span></label>
                <input type="date" name="conjoint-dob" required>

                <label>Numéro d'assurance sociale <span style='color: red;'>*</span></label>
                <input type="text" name="conjoint-num-as" placeholder="ex: 123123123" required>

                <h4>Où vit l'époux(se) ou conjoint(e) de fait?</h4>
                <div class="radio-group">
                    <label><input type="radio" name="adresse-conjoint" value="meme" required> Vit à la même adresse que vous</label>
                    <label><input type="radio" name="adresse-conjoint" value="autre"> Vit à une autre adresse</label>
                </div>

                <div class="adresse-container" id="adresse-conjoint-container" style="display: none;">
                    <h4>Si adresse différente, veuillez la renseigner ici</h4>

                    <label>Numéro et rue <span style='color: red;'>*</span></label>
                    <input type="text" name="conjoint-adresse" placeholder="Ex: 123 Rue Principale">

                    <label>Ville <span style='color: red;'>*</span></label>
                    <input type="text" name="conjoint-ville" placeholder="Ex: Montréal">

                    <label>Province <span style='color: red;'>*</span></label>
                    <select name="conjoint-province">
                        <option value="">Veuillez sélectionner votre province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">Colombie-Britannique</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">Nouveau-Brunswick</option>
                        <option value="NL">Terre-Neuve-et-Labrador</option>
                        <option value="NS">Nouvelle-Écosse</option>
                        <option value="NT">Territoires du Nord-Ouest</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Île-du-Prince-Édouard</option>
                        <option value="QC">Québec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                        <option value="Autre">Autre</option>
                    </select>

                    <label>Code Postal <span style='color: red;'>*</span></label>
                    <input type="text" name="conjoint-codepostal" pattern="[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d" placeholder="Ex: A1A 1A1">

                    <label>Pays <span style='color: red;'>*</span></label>
                    <select name="conjoint-pays">
                        <option value="">Veuillez sélectionner votre pays</option>
                        <option value="Autre">Burkina Faso</option>
                        <option value="Autre">Burundi</option>
                        <option value="Autre">Cameroun</option>
                        <option value="Canada">Canada</option>
                        <option value="Autre">Cap-Vert</option>
                        <option value="Autre">Côte d'Ivoire</option>
                        <option value="Autre">Congo</option>
                        <option value="Autre">Djibouti</option>
                        <option value="Autre">Gabon</option>
                        <option value="Autre">Gambia</option>
                        <option value="Autre">Ghana</option>
                        <option value="Autre">Guinée</option>
                        <option value="Autre">Guinée-Bissau</option>
                        <option value="Autre">Léopoldville</option>
                        <option value="Autre">Liberia</option>
                        <option value="Autre">Libye</option>
                        <option value="Autre">Madagascar</option>
                        <option value="Autre">Malawi</option>
                        <option value="Autre">Mali</option>
                        <option value="Autre">Mauritanie</option>
                        <option value="Autre">Maurice</option>
                        <option value="Autre">Niger</option>
                        <option value="Autre">Nigeria</option>
                        <option value="Autre">Rwanda</option>
                        <option value="Autre">Sénégal</option>
                        <option value="Autre">Serbie</option>
                        <option value="Autre">Sierra Leone</option>
                        <option value="Autre">Tchad</option>
                        <option value="Autre">Togo</option>
                        <option value="Autre">Tunisie</option>
                        <option value="Autre">Yémen</option>
                        <option value="Autre">Zambie</option>
                        <option value="Autre">Zimbabwe</option>
                    </select>
                </div>
            </div>
        `;
        conjointsContainer.innerHTML = conjointHtml; 
    }

    // ✅ Gérer l'affichage de l'adresse selon le choix de l'utilisateur
    const radioButtons = document.querySelectorAll("input[name='adresse-conjoint']");
    const adresseContainer = document.getElementById(adresse-conjoint-container);

    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            adresseContainer.style.display = (radio.value === "meme") ? "none" : "block";
        });
    });
}


// ✅ Fonction pour déterminer la prochaine section
function getNextStep(step) {
    const selectedEtatCivil = document.getElementById("etat-civil").value;
    const selectedEnfants = document.querySelector("input[name='enfants']:checked")?.value || "0";
    const isTravailleur = document.getElementById("Travailleur").value === "Oui";

    if (step === 3) {
        if (["Marié(e)", "Conjoint(e) de fait"].includes(selectedEtatCivil)) {
            return 4; 
        }
        if (selectedEnfants === "0") {
            return 6; 
        }
        return 5; 
    }

    if (step === 4) {
        if (selectedEnfants === "0") {
            return 6; 
        }
        return 5;
    }

    if (step === 5 && selectedEnfants === "0") {
        return 6; 
    }

    if (step === 6 && !isTravailleur) {
        return 8; 
    }

    return step + 1; 
}

// ✅ Fonction pour déterminer la section précédente
function getPreviousStep(step) {
    const selectedEtatCivil = document.getElementById("etat-civil").value;
    const selectedEnfants = document.querySelector("input[name='enfants']:checked")?.value || "0";
    const isTravailleur = document.getElementById("Travailleur").value === "Oui";

    if (step === 5) {
        if (!["Marié(e)", "Conjoint(e) de fait"].includes(selectedEtatCivil)) {
            return 3; 
        }
        return 4; 
    }

    if (step === 6) {
        if (selectedEnfants === "0") {
            if (["Marié(e)", "Conjoint(e) de fait"].includes(selectedEtatCivil)) {
                return 4; 
            }
            return 3; 
        }
        return 5;
    }

    if (step === 8 && !isTravailleur) {
        return 6; 
    }

    return step - 1; 
}


// ✅ Validation avant de passer à la section suivante
function validateSection(step) {
    const section = document.querySelector(`[data-step="${step}"]`);
    const inputs = section.querySelectorAll("[required]");
    let isValid = true;

    inputs.forEach(input => {
        input.classList.remove("invalid");
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add("invalid");
        }
    });

    return isValid;
}

// ✅ Navigation : Bouton suivant
function nextSection() {
    if (!validateSection(currentStep)) return;

    let nextStep = getNextStep(currentStep);
    if (nextStep <= totalSteps) {
        currentStep = nextStep;
        updateStepVisibility();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// ✅ Navigation : Bouton retour
function previousSection() {
    let previousStep = getPreviousStep(currentStep);
    if (previousStep >= 1) {
        currentStep = previousStep;
        updateStepVisibility();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// ✅ Gestion du téléversement multiple
document.getElementById("documents").addEventListener("change", function(event) {
    let fileList = document.getElementById("file-list");
    fileList.innerHTML = ""; // Nettoyage de la liste

    Array.from(event.target.files).forEach(file => {
        let fileType = file.name.split('.').pop().toLowerCase();
        let icon = getFileIcon(fileType);

        let fileItem = document.createElement("div");
        fileItem.classList.add("file-item");
        fileItem.innerHTML = `<i class="${icon}"></i> ${file.name}`;

        fileList.appendChild(fileItem);
    });
});

function getFileIcon(extension) {
    const icons = {
        "pdf": "fas fa-file-pdf",
        "doc": "fas fa-file-word",
        "docx": "fas fa-file-word",
        "xls": "fas fa-file-excel",
        "xlsx": "fas fa-file-excel",
        "png": "fas fa-file-image",
        "jpg": "fas fa-file-image",
        "jpeg": "fas fa-file-image",
        "txt": "fas fa-file-alt",
        "zip": "fas fa-file-archive"
    };

    return icons[extension] || "fas fa-file";
}

// ✅ Gestion de la soumission du formulaire
function submitForm(event) {
    event.preventDefault(); // Empêche la soumission par défaut

    let formData = new FormData(document.getElementById("taxForm"));
    let formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // 🔹 Vérifiez les valeurs en console
    console.log("Données du formulaire envoyées :", formObject);

    // 🔹 Envoi des données au serveur
    fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Email envoyé avec succès !");
            document.getElementById("taxForm").reset(); // Réinitialisation du formulaire
            
            // 🔹 Redirection vers la page confirmation.html après soumission
            window.location.href = "confirmation.html"; 
        } else {
            alert("❌ Échec de l'envoi de l'email.");
        }
    })
    .catch(error => console.error("Erreur lors de l'envoi :", error));
}

// ✅ Ajout de l'écouteur d'événement
document.getElementById("taxForm").addEventListener("submit", submitForm);



// ✅ Ajout des événements aux boutons
nextButton.addEventListener("click", () => { 
    if (validateSection(currentStep)) { 
        currentStep = getNextStep(currentStep); 
        updateStepVisibility();
    }
});

prevButton.addEventListener("click", () => { 
    currentStep = getPreviousStep(currentStep); 
    updateStepVisibility();
});

// ✅ Ajout des événements aux boutons
nextButton.addEventListener("click", nextSection);
prevButton.addEventListener("click", previousSection);

// ✅ Ajout d'un écouteur d'événements pour surveiller les changements de l'état civil
document.getElementById("etat-civil").addEventListener("change", genererChampsConjoint);
document.addEventListener("DOMContentLoaded", genererChampsConjoint);
travailleurAutonome.addEventListener("change", updateTarification);

// ✅ Initialisation
document.addEventListener("DOMContentLoaded", function () {
    updateTarification();
    updateStepVisibility();
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("input[required], select[required], textarea[required]").forEach(field => {
        let label = field.closest(".form-group")?.querySelector("label");
        if (label && !label.innerHTML.includes("<span style='color: red;'>*</span>")) {
            label.innerHTML += " <span style='color: red;'>*</span>";
        }
    });
});
