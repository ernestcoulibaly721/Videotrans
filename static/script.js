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

    startButton.addEventListener('click', () => {
        if (!videoFile) {
            alert("Veuillez d'abord sélectionner un fichier vidéo.");
            return;
        }

        const sourceLang = document.getElementById('source-language').value;
        const targetLang = document.getElementById('target-language').value;
        const voiceStyle = document.getElementById('voice-style').value;
        
        // Affichage des options dans la console
        console.log("Démarrage de la traduction...");
        console.log(`Fichier: ${videoFile.name}`);
        console.log(`Source: ${sourceLang}, Cible: ${targetLang}, Voix: ${voiceStyle}`);

        // Changement de l'état du bouton pour indiquer le traitement
        startButton.textContent = "Traduction en cours... Veuillez patienter.";
        startButton.disabled = true;

        // ** SIMULATION DE L'ENVOI AU SERVEUR **
        
        // Simuler un délai de traitement de 3 secondes
        setTimeout(() => {
            alert(`Simulation de réussite : Traduction lancée pour ${videoFile.name} vers ${targetLang}.`);
            
            // Rétablissement de l'état initial
            startButton.textContent = "Lancer la Traduction";
            // Laisse le bouton désactivé jusqu'à ce qu'un nouveau fichier soit sélectionné
            // startButton.disabled = false; 
            
        }, 3000);
    });
});
        
