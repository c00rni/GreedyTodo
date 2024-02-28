from flask import Flask, g, jsonify, request
import sqlite3

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt
import flask_cors

from flask_bcrypt import Bcrypt

app = Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config['JWT_BLACKLIST_ENABLED'] = True
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
blacklist = set()

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

def insert_db(query, args=()):
    cur = get_db().execute(query, args)
    get_db().commit()
    rv = cur.fetchall()
    return rv[0] if rv else None

@app.route('/api/login', methods=["POST"])
def authentification():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = query_db('select user_id, password from users where username = ?', [username], one=True)
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Bad username or password"}), 401

    access_token = create_access_token(identity=user["user_id"])
    return jsonify(access_token=access_token)

# @jwt.token_in_blocklist_loader
# def check_if_token_in_blacklist(decrypted_token):
#     jti = decrypted_token['jti']
#     return jti in blacklist

@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200


@app.route("/api/users", methods=["POST"])
def createUser():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username and password:
        if query_db('select * from users where username = ?;', [username], one=True):
            return jsonify({"error": "Username already exist"}), 401
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        insert_db('INSERT INTO users (username, password) VALUES (?, ?);', [username, hashed_password])
        return jsonify({"success":"User created."}), 200
    return jsonify({"error": "One or both arguments username and password are missing"}), 401

@app.route("/api/tasks", methods=["GET"])
@jwt_required()
def tasks():
    current_user_id = get_jwt_identity()
    rows = []
    for task in query_db('select * from tasks, personnes where tasks.user_id = ? and tasks.user_id = personnes.user_id order by priority_score, creation_date;', [str(current_user_id)]):
        rows.append({"task_id": task["task_id"], "title": task["title"], "description": task["description"], "personne_id": task["personne_id"]})
    return jsonify(tasks=rows), 200

@app.route("/api/tasks", methods=["POST"])
@jwt_required()
def createTask():
    current_user_id = get_jwt_identity()

    title = request.json.get("title", None)
    if not title:
        return jsonify({"error": "A title must be define"}), 401
    description = request.json.get("description", None)
    personne_id = request.json.get("personne_id", None)

    insert_db('INSERT INTO tasks (title, description, user_id, personne_id) VALUES (?, ?, ?, ?);', [title, description, current_user_id, personne_id])
    return jsonify({"success":"Task created."}), 200

@app.route("/api/tasks/<task_id>", methods=["DELETE"])
@jwt_required()
def deleteTask(task_id: int):
    current_user_id = get_jwt_identity()
    if not query_db('select * from tasks where user_id = ? and task_id = ?;', [current_user_id, task_id], one=True):
        return jsonify({"error": "You can't delete this task."}), 401
    insert_db('DELETE from tasks where task_id = ? and user_id = ?;', [task_id, current_user_id])
    return jsonify({"success":"Task deleted."}), 200

@app.route("/api/personnes", methods=["GET"])
@jwt_required()
def personnes():
    current_user_id = get_jwt_identity()
    rows = []
    for personne in query_db('select * from personnes where user_id = ? order by fullname;', [current_user_id]):
        rows.append({"personne_id": personne["personne_id"], "fullname": personne["fullname"], "description": personne["description"], "priority_score": personne["priority_score"]})
    return jsonify(personnes=rows), 200

@app.route("/api/personnes", methods=["POST"])
@jwt_required()
def createPersonnes():
    current_user_id = get_jwt_identity()
    full_name = request.json.get("fullName", None)
    description = request.json.get("description", None)
    priority_score = request.json.get("priorityRank", None)
    if full_name and priority_score != None and type(full_name) == type("") and type(priority_score) == type(0):
        insert_db('INSERT INTO personnes (fullname, description, priority_score, user_id) VALUES (?, ?, ?, ?);', [full_name, description, priority_score, current_user_id])

        return jsonify({"success":"Task deleted."}), 200
    else:
        return jsonify({"error":"Arguments are missing or are in the wrong type."}), 401

@app.route("/api/personnes/<personne_id>", methods=["DELETE"])
@jwt_required()
def deletePersonne(personne_id: int):
    current_user_id = get_jwt_identity()
    if not query_db('select * from personnes where user_id = ? and personne_id = ?;', [current_user_id, personne_id], one=True):
        return jsonify({"error": "You can't delete this personne."}), 401
    insert_db('DELETE from personnes where personne_id = ? and user_id = ?;', [personne_id, current_user_id])
    return jsonify({"success":"Personne deleted."}), 200


