document.addEventListener('DOMContentLoaded', () => {
    // Récupération des éléments HTML
    const dropZone = document.getElementById('drop-zone');
    const videoUpload = document.getElementById('video-upload');
    const startButton = document.querySelector('.start-button');
    const dropZoneLabel = dropZone.querySelector('label'); // Le bouton de sélection dans la drop-zone
    
    let videoFile = null;

    // Désactiver le bouton de lancement au départ
    startButton.disabled = true;

    // --- 1. Gestion de la zone de Dépôt (Drag and Drop) ---

    // Empêcher le comportement par défaut du navigateur
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Effet visuel : Survol de la zone
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
             // Ajouter une classe CSS 'highlight' pour le style
            dropZone.classList.add('highlight');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            // Retirer la classe CSS 'highlight'
            dropZone.classList.remove('highlight');
        }, false);
    });

    // Événement : Fichier déposé
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files[0]);
        }
    }

    // Événement : Fichier sélectionné par le bouton
    videoUpload.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files[0]);
        }
    });

    // Traitement du fichier sélectionné
    function handleFiles(file) {
        if (file.type.startsWith('video/')) {
            videoFile = file;
            // Mise à jour de la zone d'affichage
            dropZone.innerHTML = `<p>✅ Fichier sélectionné : **${file.name}**</p><p>Prêt pour la traduction.</p>`;
            startButton.disabled = false;
        } else {
            alert("Veuillez sélectionner un fichier vidéo valide (mp4, mov, etc.).");
            videoFile = null;
            // Rétablit l'état initial (pour permettre une nouvelle sélection)
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

        // Récupération des options
        const sourceLang = document.getElementById('source-language').value;
        const targetLang = document.getElementById('target-language').value;
        const voiceStyle = document.getElementById('voice-style').value;
        
        // Changement de l'état du bouton pour indiquer le traitement
        startButton.textContent = "Traduction en cours... Veuillez patienter.";
        startButton.disabled = true;
        
        // ** SIMULATION : Remplacer ceci par le code d'envoi API au serveur Flask **
        
        // Simuler un délai de traitement de 3 secondes
        setTimeout(() => {
            alert(`Simulation de réussite : Traduction lancée pour ${videoFile.name} vers ${targetLang}.`);
            
            // Rétablissement de l'état initial
            startButton.textContent = "Lancer la Traduction";
            // Laissez le bouton désactivé jusqu'à ce qu'un nouveau fichier soit sélectionné
            // startButton.disabled = false; 
            
        }, 3000);
    });
});
     
