from flask import Flask, render_template

app = Flask(__name__)

# Route d'API pour la page d'accueil (pour tester la structure)
@app.route('/')
def home():
    # Nécessite un dossier 'templates' contenant 'index.html'
    return render_template('index.html')

# Route de test (pour vérifier que l'API fonctionne)
@app.route('/test')
def test():
    return "Serveur Flask Fonctionnel!"

if __name__ == '__main__':
    app.run(debug=True)
            