document.addEventListener('DOMContentLoaded', () => {
    
    // --- LIGNE DE VÉRIFICATION 1 : Le script se charge-t-il ? ---
    alert("Vérification 1 : Le script a démarré."); 
    
    const dropZone = document.getElementById('drop-zone');
    const videoUpload = document.getElementById('video-upload');
    const startButton = document.querySelector('.start-button');

    // --- LIGNE DE VÉRIFICATION 2 : Le navigateur trouve-t-il le champ de fichier ? ---
    if (videoUpload) {
        alert("Vérification 2 : Élément de sélection trouvé !");
    } else {
        alert("ERREUR CRITIQUE : Élément 'video-upload' NON trouvé dans le HTML.");
    }

    let videoFile = null;
    
    // ... le reste du code JavaScript continue ici ...
    document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const videoUpload = document.getElementById('video-upload');
    const startButton = document.querySelector('.start-button');
    
    let videoFile = null;

    // Désactiver le bouton de lancement au départ
    startButton.disabled = true;

    // --- 1. Gestion de la zone de Dépôt (Drag and Drop) ---

    // Empêche le comportement par défaut (ouvrir le fichier dans le navigateur)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Ajout d'une classe visuelle quand on survole (si vous avez mis la classe 'highlight' dans votre CSS)
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
             dropZone.classList.add('highlight');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('highlight');
        }, false);
    });

    // Gestion du dépôt de fichiers
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files[0]);
        }
    }

    // Gestion de la sélection par le bouton (Événement "change" sur l'input masqué)
    videoUpload.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files[0]);
        }
    });

    function handleFiles(file) {
        if (file.type.startsWith('video/')) {
            videoFile = file;
            // Mise à jour de la zone d'affichage
            dropZone.innerHTML = `<p>✅ Fichier sélectionné : **${file.name}**</p><p>Prêt pour la traduction.</p>`;
            startButton.disabled = false;
        } else {
            alert("Veuillez sélectionner un fichier vidéo valide.");
            videoFile = null;
            // Si le fichier est invalide, il faut rétablir l'interface de sélection
            dropZone.innerHTML = `<p>Déposez votre fichier vidéo ici</p><p>ou</p>
                <input type="file" id="video-upload" accept="video/*" hidden>
                <label for="video-upload" class="button cta-red big-button">Sélectionner un Fichier Vidéo</label>`;
            startButton.disabled = true;
        }
    }

    // --- 2. Gestion du Bouton de Traduction (Simulation) ---

        // --- 2. Gestion du Bouton de Traduction (ENVOI RÉEL) ---

    startButton.addEventListener('click', () => {
        if (!videoFile) {
            alert("Veuillez d'abord sélectionner un fichier vidéo.");
            return;
        }
        
        startButton.textContent = "Traduction en cours... Veuillez patienter.";
        startButton.disabled = true;

        const sourceLang = document.getElementById('source-language').value;
        const targetLang = document.getElementById('target-language').value;
        const voiceStyle = document.getElementById('voice-style').value;
        
        const formData = new FormData();
        formData.append('video', videoFile); // Nom 'video' correspond à request.files['video'] dans app.py
        formData.append('source_lang', sourceLang);
        formData.append('target_lang', targetLang);
        formData.append('voice_style', voiceStyle);

        // Envoi des données au serveur Flask via la nouvelle route /translate
        fetch('/translate', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`SUCCESS : Le fichier a été reçu par le serveur. Le lien de téléchargement simulé est : ${data.download_url}`);
                
                // Mettre à jour la zone de dépôt pour afficher le lien de téléchargement
                dropZone.innerHTML = `<p>✅ Traduction lancée !</p><a href="${data.download_url}" class="button cta-green big-button">Télécharger la Vidéo Traduite (Simulée)</a>`;
                
            } else {
                alert(`ERREUR : ${data.error}`);
            }
        })
        .catch(error => {
            alert("Erreur de connexion avec le serveur.");
            console.error('Erreur:', error);
        })
        .finally(() => {
            startButton.textContent = "Lancer la Traduction";
        });
    });
}); // N'oubliez pas cette parenthèse et accolade de fermeture si elle fait partie de votre fichier !
    
    
    });
});
        
