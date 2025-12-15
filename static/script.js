document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const videoUpload = document.getElementById('video-upload');
    const startButton = document.querySelector('.start-button');
    
    let videoFile = null;

    // --- 1. Gestion de la zone de Dépôt (Drag and Drop) ---

    // Empêche le comportement par défaut (ouvrir le fichier dans le navigateur)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Ajout d'une classe visuelle quand on survole
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }

    // Gestion du dépôt de fichiers
    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            handleFiles(files[0]);
        }
    }

    // Gestion de la sélection par le bouton
    videoUpload.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files[0]);
        }
    });

    function handleFiles(file) {
        if (file.type.startsWith('video/')) {
            videoFile = file;
            dropZone.innerHTML = `<p>✅ Fichier sélectionné : ${file.name}</p><p>Cliquez sur "Lancer la Traduction"</p>`;
            startButton.disabled = false;
        } else {
            alert("Veuillez sélectionner un fichier vidéo valide.");
            videoFile = null;
            startButton.disabled = true;
        }
    }

    // --- 2. Gestion du Bouton de Traduction ---

    startButton.addEventListener('click', () => {
        if (!videoFile) {
            alert("Veuillez d'abord sélectionner un fichier vidéo.");
            return;
        }

        const sourceLang = document.getElementById('source-language').value;
        const targetLang = document.getElementById('target-language').value;
        const voiceStyle = document.getElementById('voice-style').value;
        
        // Affichage des options (à remplacer par l'envoi au serveur)
        console.log("Démarrage de la traduction...");
        console.log(`Fichier: ${videoFile.name}`);
        console.log(`Source: ${sourceLang}, Cible: ${targetLang}, Voix: ${voiceStyle}`);

        // 🛑 Ceci est la partie critique : En
        