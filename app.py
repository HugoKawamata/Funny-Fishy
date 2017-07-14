__author__ = "Hugo Kawamata"
import os
import logging
from flask import Flask, request, render_template
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user

from backend.models import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://DB_USER:PASSWORD@HOST/DATABASE'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True

login_manager = LoginManager()
login_manager.init_app(app)

db.init_app(app)


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
        if User.query.filter(User.email == email).first().check_password(password):
            user = User.query.filter(User.email == email).first()
            login_user(user)
            return redirect(request.args.get("next"))
        else:
            return abort(401)
    else:
        return render_template("login.html")


### Main Jeff ###

if __name__ == "__main__":
    app.run()
    muser = User("test@email.com", "password1")
    db.session.add(muser)
    db.session.commit()