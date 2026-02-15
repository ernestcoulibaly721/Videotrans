import os
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Dossier pour les photos
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
annonces = [] 

@app.route('/')
def index():
    return render_template('index.html', annonces=annonces)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        titre = request.form.get('titre')
        prix = request.form.get('prix')
        file = request.files['photo']
        if file:
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            annonces.append({'titre': titre, 'prix': prix, 'image': filename})
            return redirect(url_for('index'))
    return render_template('admin.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 5000))
    
