import logging
import random
import math
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import flask_login
from flask_login import UserMixin
from enum import Enum

db = SQLAlchemy()

class Rarity(Enum):
    COMMON = 1
    UNCOMMON = 2
    RARE = 3
    COSMIC = 4

class User(db.Model, UserMixin):
    """
    ORM Class: An object that represents a user (with all their game progess)
    """
    __tablename__ = "Users"
    id              = db.Column('id',           db.Integer,             primary_key=True)
    email           = db.Column('email',        db.String(128),         unique=True)
    passwordhash    = db.Column('passwordhash', db.String(128))
    gold            = db.Column('gold',         db.Float)
    currentcooldown = db.Column('currentcooldown', db.Integer)
    hook0price      = db.Column('hook0price',   db.Integer)
    hook1price      = db.Column('hook1price',   db.Integer)
    hook0           = db.Column('hook0',        db.String(64))
    hook1           = db.Column('hook1',        db.String(64))

    def __init__(self, email, password):
        self.email = email
        self.passwordhash = generate_password_hash(password)
        self.gold = 0
        self.hook0price = 15
        self.hook1price = 100
        self.hook0 = "0,0,0,0,0,0,0"
        self.hook1 = "0,0,0,0,0,0,0"
        self.currentcooldown = 0


    def check_password(self, password_attempt):
        return check_password_hash(self.passwordhash, password_attempt)

    def cooldown_tick(self):
        self.currentcooldown -= 1
        if self.currentcooldown < 0:
            self.currentcooldown = 0
        data = {
            "cd": self.currentcooldown
        }
        return data
        
    def buyhook(self, hookNum):
        # Hooks will have 7 possible fish: 
        # 3 Commons, 2 Uncommons, 1 Rare, and 1 Cosmic Rare
        # COM% = 89/140
        # UNC% = 40/140
        # RAR% = 10/140
        # COS% = 1/140

        rng = random.randint(0, 140)
        if rng <= 89:
            rarity = Rarity.COMMON
            whichFish = random.randint(0, 2)
            hookIndex = whichFish
        elif rng > 89 and rng <= 129:
            rarity = Rarity.UNCOMMON
            whichFish = random.randint(0, 1)
            hookIndex = whichFish + 3
        elif rng > 129 and rng <= 139:
            rarity = Rarity.RARE
            hookIndex = 5
        elif rng > 139:
            rarity = Rarity.COSMIC
            hookIndex = 6
        else:
            logging.info("RNG for rarity generation failed")
        
        logging.info("Fish got: " + str(hookIndex))

        if hookNum == 0:
            if self.gold < self.hook0price: # Ensure user has enough gold
                return self.loadfish()
            self.gold -= self.hook0price # Take away gold from user
            self.hook0price = math.ceil(self.hook0price * 1.15) # Increase price of hook0
            hook0list = self.csvToList(self.hook0) # Convert string csv to list
            hook0list[hookIndex] = str(int(hook0list[hookIndex]) + 1) # Increment the fish that you got
            self.hook0 = self.listToCsv(hook0list) # Send back to database
        elif hookNum == 1:
            logging.info("buying hook 1")
        return self.loadfish()

    def loadfish(self):
        hookprices = []
        hookprices.append(self.hook0price)
        hookprices.append(self.hook1price)
        hooks = []
        hooks.append(self.csvToList(self.hook0))
        hooks.append(self.csvToList(self.hook1))
        data = {
            "hooks": hooks,
            "totalg": self.gold,
            "hookprices" : hookprices
        }
        return data

    def loaddie(self):
        data = {
            "startg": self.gold,
            "cd": self.currentcooldown
        }
        return data

    def csvToList(self, csv):
        return csv.split(",")

    def listToCsv(self, lis):
        csv = ",".join(lis)
        logging.info(csv)
        return csv


    def rolldie(self):
        # Sends a json containing the roll result, the multiplier, the cooldown, and the total gold
        min = 1
        max = 6
        mult = 1
        cd = 0

        # Hook 0
        hook0list = self.csvToList(self.hook0)
        mult += 0.5 * int(hook0list[0]) # Common 1
        max += 1 * int(hook0list[1]) # Common 2
        min += 1 * int(hook0list[2]) # Common 3
        mult += 2 * int(hook0list[3]) # Uncommon 1
        cd += 1 * int(hook0list[3]) # Uncommon 1
        max += 2 * int(hook0list[4]) # Uncommon 2
        mult += 40 * int(hook0list[6]) # Cosmic

        


        self.currentcooldown = cd      # Cooldown is 1 second
        roll = random.randint(min, max)
        if roll == min:
            if int(hook0list[5]):
                roll = 0
                roll += max * hook0list[5] # Hook 0 Rare
            
        self.gold += (roll * mult)

        data = {
            "roll": roll,
            "mult": mult,
            "cd": self.currentcooldown,
            "totalg": self.gold
        }

        return data

        