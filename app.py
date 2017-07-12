__author__ = "Hugo Kawamata"

from flask import Flask

app = Flask(__name__)
app.config['DEBUG'] = True


### Endpoints ###

@app.route('/')
def main():
    return "Hello world!"


### Main Jeff ###

if __name__ == "__main__":
    app.run()