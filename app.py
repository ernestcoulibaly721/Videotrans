import os
from flask import Flask, render_template, request, redirect, url_for, Response
from functools import wraps

app = Flask(__name__)

# --- CONFIGURATION SÉCURITÉ ---
# Tu peux changer 'admin' et 'yak2026' par ce que tu veux
USER_ADMIN = "admin"
PASSWORD_ADMIN = "yak2026"

def check_auth(username, password):
    return username == USER_ADMIN and password == PASSWORD_ADMIN

def authenticate():
    return Response(
    'Accès refusé. Veuillez entrer les identifiants corrects.', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated
# ------------------------------

UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
annonces = []

@app.route('/')
def index():
    return render_template('index.html', annonces=annonces)

# On ajoute @requires_auth pour protéger cette page
@app.route('/admin', methods=['GET', 'POST'])
@requires_auth
def admin():
    if request.method == 'POST':
        titre = request.form.get('titre')
        prix = request.form.get('prix')
        file = request.files['photo']
        
        if file:
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            annonces.append({
                'titre': titre,
                'prix': prix,
                'image': filename
            })
            return redirect(url_for('index'))
            
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000))
        
