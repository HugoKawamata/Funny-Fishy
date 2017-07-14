__author__ = "Hugo Kawamata"
import os
import logging
from flask import Flask, request, render_template
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user
from flask_migrate import Migrate

from models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://funny_fish:very_funny_fish@localhost/funny_fish_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "myNameIsJEFFFFF"
app.config['DEBUG'] = True

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

logging.basicConfig(level=logging.DEBUG)

db.init_app(app)
migrate = Migrate(app, db)
db.app = app

with app.app_context():
    logging.info("Creating the database")
    db.create_all()
    db.session.commit()



@login_manager.user_loader
def load_user(user_id):
    if user_id is None:
        return None
    try:
        user = User.query.get(int(id))
    except:
        return None
    return user


### Endpoints ###

@app.route('/')
def main():
    return "Hello world!"


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']        
        user = User.query.filter(User.email == email).first()
        if user is not None:
            if user.check_password(password):
                login_user(user)
                return ("Welcome" + email)
            else:
                return "wrong pw"
        else:
            return "User does not exist"
    else:
        return render_template("login.html")


### Main Jeff ###

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port)