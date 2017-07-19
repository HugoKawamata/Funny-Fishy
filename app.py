__author__ = "Hugo Kawamata"
import os
import logging
from flask import Flask, request, render_template, redirect, url_for
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from flask_migrate import Migrate

from models import *
from responses import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 'postgresql://funny_fish:very_funny_fish@localhost/funny_fish_db')
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
        user = User.query.get(int(user_id))
    except:
        return None
    return user


### Endpoints ###

@app.route('/')
def main():
    return app.send_static_file("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']        
        if User.query.filter(User.email == email).first() is None:
            # There is no existing user with that email
            user = User(email, password)
            db.session.add(user)
            db.session.commit()
            return "You in boi"
        else:
            return "User aready exists"
    else:
        return render_template("register.html")

@app.route("/game")
@login_required
def game():
    return app.send_static_file("game.html")


@app.route("/check_login", methods=["GET", "POST"])
def check_login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']        
        user = User.query.filter(User.email == email).first()
        if user is not None:
            # User exists
            if user.check_password(password):
                # Correct Password, log them in
                login_user(user, remember=True)
                return redirect(url_for("game"))
            else:
                # Incorrect password
                return "wrong pw"
        else:
            return "User does not exist"
    else:
        return "Got here by mistake, should have been a post request"

@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")

### Logic ###
@app.route("/rolldie", methods=["GET", "POST"])
@login_required
def rolldie():
    response = ok(current_user.rolldie())
    db.session.commit()
    return response




### Main Jeff ###

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)