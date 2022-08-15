import sys
import math
import time
import os
from flask import Flask, request, jsonify
from flask.globals import session
#from flaskext.mysql import MySQL
import json
import random
import datetime
import secrets
#import numpy as np
import pandas as pd
import db_conf
from flask import send_file

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config['MYSQL_DATABASE_HOST'] = db_conf.host
app.config['MYSQL_DATABASE_USER'] = db_conf.user
app.config['MYSQL_DATABASE_PASSWORD'] = db_conf.password
app.config['MYSQL_DATABASE_DB'] = db_conf.db
db_table_prefix = 'miniVlat'


global_session = {}

print('ready')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/get_time')
def get_time():
    return jsonify({'time': time.time()})


@app.route('/new_session_id', methods=['GET', 'POST'])
def get_new_session_id():
    """
        Returns a new session ID and sets up the session.
        """
    data = request.json
    print(data)

    # session id
    id = secrets.token_urlsafe(16)
    global_session[id] = {
    }

    # insert session into database
    '''
    conn = mysql.connect()
    cur = conn.cursor()
    sql_statement = f"insert into {db_table_prefix}_participants (id, data_condition, policy_condition, presentation_condition, tutorial_loaded_client_time, tutorial_loaded) values (" + ", ".join(
        [f"\"{str(item)}\"" for item in [id, data_condition, policy_condition, presentation_condition, tutorial_loaded_client_time, datetime.datetime.today()]]) + ")"
    cur.execute(sql_statement)
    conn.commit()
    cur.fetchall()
    conn.close()
    '''

    print('%d active users' % len(global_session.keys()))
    print(global_session.keys())

    return jsonify({'new_id': id})


@app.route('/record_responses_to_db', methods=['POST'])
def record_responses_to_db():
    data = request.json
    session_id = data['session_id']
    fname = str(session_id)+'.txt'
    fname = './surveys/quiz/' + fname
    with open(fname, 'w+') as test:
        test.write(json.dumps(data) + "\n")

    print('TODO: Record quiz responses into a file or DB')
    print('Collected quiz data: ', data)
    return {'response': "json post succeeded"}


@app.route('/get_random_images', methods=['GET', 'POST'])
def get_random_images():
    # fname = '../imageData/government/'
    # file_list=os.listdir(fname)
    # new_list = random.sample(file_list, 5)
    # new_new_list = ["government/"+x for x in new_list]
    # print(new_new_list)
    # return jsonify({'files': new_list})
    sub_list = fold_name()
    for sf in sub_list:
        if (sf != '.DS_Store' and sf != '.git'):
            if (sf == 'government'):
                l1 = get_img(sf)
            elif(sf == 'news'):
                l2 = get_img(sf)
            elif(sf == 'science'):
                l3 = get_img(sf)
            elif(sf == 'vis1'):
                l4 = get_img(sf)
            elif(sf == 'vis2'):
                l5 = get_img(sf)
            elif(sf == 'vis3'):
                l6 = get_img(sf)
    union = list(set().union(l1, l2, l3, l4, l5,l6))
    print(union)
    return jsonify({'files': union})

@app.route('/get_image')
def get_image():
    print('get_image called')
    image_name = request.args['image_name']
    print(image_name)
    return send_file(f'../imageData/{image_name}', mimetype='image/gif')

def fold_name():
    fname = '../imageData/'
    file_list = os.listdir(fname)
    return file_list

def get_img(sub_fold):
    fname = '../imageData/' + sub_fold + "/"
    file_list = os.listdir(fname)
    new_list = random.sample(file_list, 5)
    new_new_list = [ sub_fold + "/"+x for x in new_list]
    return new_new_list

