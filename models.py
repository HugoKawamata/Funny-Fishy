import logging
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import flask_login
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    """
    ORM Class: An object that represents a user (with all their game progess)
    """
    __tablename__ = "Users"
    id              = db.Column('id',           db.Integer,             primary_key=True)
    email           = db.Column('email',        db.String(128),         unique=True)
    passwordhash    = db.Column('passwordhash', db.String(128))
    gold            = db.Column('gold',         db.Integer)
    hook0           = db.Column('hook0',        db.String(64))
    hook1           = db.Column('hook1',        db.String(64))

    def __init__(self, email, password):
        self.email = email
        self.passwordhash = generate_password_hash(password)
        self.hook0 = "0000000000"
        self.hook1 = "0000000000"

        logging.info("creating user with email and pw:" + email + " " + password)

    def check_password(self, password_attempt):
        return check_password_hash(self.passwordhash, password_attempt)
