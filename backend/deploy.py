from flask import Flask, jsonify,request
# from flask_cors import CORS
from twilio.rest import Client
from env import *

sid = sid
auth_token = auth_token

client = Client(sid, auth_token)
import json
import pickle
import pandas as pd
import numpy as np

import requests

with open('NaiveBayes.sav','rb') as f:
        gnb = pickle.load(f)
with open('RandomForestClassifier.sav','rb') as f:
        rfc = pickle.load(f)
with open('DecisionTree.sav','rb') as f:
        dt = pickle.load(f)
    



app=Flask(__name__)

Tab="--------------->"
@app.route('/',methods=['POST'])
def hello_world():
    data=request.data
    print(Tab,data)

    
    with open('NaiveBayes.sav','rb') as f:
        gnb = pickle.load(f)
    with open('RandomForestClassifier.sav','rb') as f:
        rfc = pickle.load(f)
    with open('DecisionTree.sav','rb') as f:
        dt = pickle.load(f)
    

    train=pd.read_csv('Training.csv',)
    l1=[]
    for i in train:
        if(i!='prognosis'):
            l1.append(i)

    
    # l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
    # 'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
    # 'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
    # 'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
    # 'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
    # 'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
    # 'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
    # 'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
    # 'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
    # 'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
    # 'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
    # 'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
    # 'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
    # 'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
    # 'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
    # 'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
    # 'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
    # 'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
    # 'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
    # 'yellow_crust_ooze']

    # print(len(l1))
    # disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
    # 'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
    # ' Migraine','Cervical spondylosis',
    # 'Paralysis (brain hemorrhage)','Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A',
    # 'Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Alcoholic hepatitis','Tuberculosis',
    # 'Common Cold','Pneumonia','Dimorphic hemmorhoids(piles)',
    # 'Heartattack','Varicoseveins','Hypothyroidism','Hyperthyroidism','Hypoglycemia','Osteoarthristis',
    # 'Arthritis','(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis',
    # 'Impetigo']

    l2=[]
    for x in range(0,len(l1)):
        l2.append(0)
    

    a=train[['prognosis']]
    b=np.ravel(a)
    disease=np.unique(b)
    total_disease=len(np.unique(b))


    element=json.loads(data)
    Symptom1=element['S1']
    Symptom2=element['S2']
    Symptom3=element['S3']
    Symptom4=element['S4']
    Symptom5=element['S5']
    psymptoms=[Symptom1,Symptom2,Symptom3,Symptom4,Symptom5]
    
    j={}
    for i in range(0,total_disease):
        key=disease[i]
        value=i
        j[key]=value
    res={}
    res['prognosis']=j
         
         
    train.replace(res,inplace=True)

    for k in range(0,len(l1)):
        for z in psymptoms:
            if(z==l1[k]):
                l2[k]=1

    inputtest = [l2]
    print("----------------------------------->>>>>>>>>>>>>>>>>>>>>>>")
    print(inputtest)
    predict1 = gnb.predict(inputtest)
    predicted1=predict1[0]
    answer1=disease[predicted1]

    predict2 = rfc.predict(inputtest)
    predicted2=predict2[0]
    answer2=disease[predicted2]

    predict3 = dt.predict(inputtest)
    predicted3=predict3[0]
    answer3=disease[predicted3]
    result={
        'result1':{
        'model1':'NaiveBayes',
        'answer1':answer1,
        },
        'result2':{
        'model2':'RandomForestClassifier',
        'answer2':answer2,
        },
        'result3':{
        'model3':'DecisionTreeClassifier',
        'answer3':answer3,
        }
        }
    requests.post('http://localhost:3000/posts', json=result)
    print(answer1," ",answer2," ",answer3)


    
    return jsonify('hello')


# update

@app.route('/update',methods=['POST'])
def hello():
    
    result=requests.get('http://localhost:3000/Disease_Information')
    data=result.json()
    # print(result.json()[0]['disease'])
    New_disease=data[-1]['disease']
    
    
    df=pd.read_csv('Training.csv',)
    # a=train[['prognosis']]
    # b=np.ravel(a)
    # disease=np.unique(b)
    # total_disease=len(np.unique(b))

    
    symptoms=[]
    for i in df:
        if(i!='prognosis'):
            symptoms.append(i)
    # print(len(symptoms))

    
    New_Symptoms=[]
    
    if data[-1]['Symptom1']  not in symptoms:
            New_Symptoms.append(data[-1]['Symptom1'])
    if data[-1]['Symptom2']  not in symptoms:
            New_Symptoms.append(data[-1]['Symptom2'])
    if data[-1]['Symptom2']  not in symptoms:
            New_Symptoms.append(data[-1]['Symptom3'])
    if data[-1]['Symptom2']  not in symptoms:
            New_Symptoms.append(data[-1]['Symptom4'])
    if data[-1]['Symptom2']  not in symptoms:
            New_Symptoms.append(data[-1]['Symptom5'])
            
       
    for i in New_Symptoms:
         df[i]=0
    print(New_Symptoms)
    

    new_row_data=[]
    count_col=len(df.columns)
    for i in range(count_col):
        new_row_data.append(0)
    new_row_dict = {}
    for i, col in enumerate(df.columns):
        new_row_dict[col] = new_row_data[i]

    # # Append the new row to the DataFrame
    t= pd.concat([df, pd.DataFrame([new_row_dict])], ignore_index=True)
    
    last_index = df.index[-1]
    t.loc[last_index,data[-1]['Symptom1']]=1
    t.loc[last_index,data[-1]['Symptom2']]=1
    t.loc[last_index,data[-1]['Symptom3']]=1
    t.loc[last_index,data[-1]['Symptom4']]=1
    t.loc[last_index,data[-1]['Symptom5']]=1
    t.loc[last_index,"prognosis"]=New_disease

    t.to_csv("Training.csv")


    # Model Training 

    l1=[]
    for i in df:
        if(i!='prognosis'):
            l1.append(i)

    l2=[]
    for x in range(0,len(l1)):
        l2.append(0)
    

    a=df[['prognosis']]
    b=np.ravel(a)
    disease=np.unique(b)
    total_disease=len(np.unique(b))


    j={}
    for i in range(0,total_disease):
        key=disease[i]
        value=i
        j[key]=value
    res={}
    res['prognosis']=j
         
         
    df.replace(res,inplace=True)
    
    X= df[l1]

    y = df[["prognosis"]]
    # np.ravel(y)

# --------------------------------------------------------------------------------------------------------
    # Testing data 
    # tr=pd.read_csv("Testing.csv")
    # tr.replace(res,inplace=True)
    # X_test= tr[l1]
    # y_test = tr[["prognosis"]]
    # np.ravel(y_test)
# --------------------------------------------------------------------------------------------------------
    # Model Training 

    # Naive Bayes 
    from sklearn.naive_bayes import GaussianNB
    nb = GaussianNB()
    nb=nb.fit(X,np.ravel(y))

    # Random Forest
    from sklearn.ensemble import RandomForestClassifier
    rf = RandomForestClassifier()
    rf = rf.fit(X,np.ravel(y))

    # Decision Tree 
    from sklearn import tree
    dt = tree.DecisionTreeClassifier()   # empty model of the decision tree
    dt = dt.fit(X,y)

# -------------------------------------------------------------------------------------------------------
    # Pickle Dump 
    import pickle
    pickle.dump(nb,open('NaiveBayes.sav','wb'))
    pickle.dump(rf,open('RandomForestClassifier.sav','wb'))
    pickle.dump(dt,open('DecisionTree.sav','wb'))
    


    return jsonify('hello')

# sending information to mobile 
@app.route('/sms',methods=['POST'])
def phone():
        sms=request.data
        print("        ")
        # print("------------------------------------------------------",sms)
        res=json.loads(sms)
        # print("------------",res['hospitalName'])
        data={'Disease':res['disease'],
                #   'Hospital_Name':res['hospitalName'],
                #   'Hospital_Address':res['hospitalAddress'],
                #   'Doctor_Name':res['doctorName'],
                #   'Doctor_Address':res['doctorAddress'],
            }
        json_data = json.dumps(data)
        message=client.messages.create(
            body=json_data,
            from_="+12708106437",
            to="+919140918621"
        )
        print(message.body)
    
        return jsonify('hello')





  

# df = df.drop(last_index)

if __name__ == '__main__':
    app.run(debug=True)