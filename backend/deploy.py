from flask import Flask, jsonify,request
# from flask_cors import CORS
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
    l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
'yellow_crust_ooze']
    

    
disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
'Peptic ulcer disease','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
'Migraine','Cervical spondylosis',
'Paralysis (brain hemorrhage)','Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A',
'Hepatitis B','Hepatitis C','Hepatitis D','Hepatitis E','Alcoholic hepatitis','Tuberculosis',
'Common Cold','Pneumonia','Dimorphic hemmorhoids(piles)',
'Heartattack','Varicoseveins','Hypothyroidism','Hyperthyroidism','Hypoglycemia','Osteoarthristis',
'Arthritis','(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis',
'Impetigo']

l2=[]
for x in range(0,len(l1)):
    l2.append(0)



app=Flask(__name__)

Tab="--------------->"
@app.route('/',methods=['POST'])
def hello_world():
    data=request.data
    print(Tab,data)
    element=json.loads(data)
    Symptom1=element['S1']
    Symptom2=element['S2']
    Symptom3=element['S3']
    Symptom4=element['S4']
    Symptom5=element['S5']
    psymptoms=[Symptom1,Symptom2,Symptom3,Symptom4,Symptom5]
    
    for k in range(0,len(l1)):
        for z in psymptoms:
            if(z==l1[k]):
                l2[k]=1

    inputtest = [l2]
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
    
    
    train=pd.read_csv('Training.csv',)
    # a=train[['prognosis']]
    # b=np.ravel(a)
    # disease=np.unique(b)
    # total_disease=len(np.unique(b))

    
    symptoms=[]
    for i in train:
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
         train[i]=0
    print(New_Symptoms)
    

    new_row_data=[]
    count_col=len(train.columns)
    for i in range(count_col):
        new_row_data.append(0)
    new_row_dict = {}
    for i, col in enumerate(train.columns):
        new_row_dict[col] = new_row_data[i]

    # print(new_row_dict)
    # # Append the new row to the DataFrame
    # train = train.append(new_row_dict, ignore_index=True)
    t= pd.concat([train, pd.DataFrame([new_row_dict])], ignore_index=True)
    
    last_index = train.index[-1]
    t.loc[last_index,data[-1]['Symptom1']]=1
    t.loc[last_index,data[-1]['Symptom2']]=1
    t.loc[last_index,data[-1]['Symptom3']]=1
    t.loc[last_index,data[-1]['Symptom4']]=1
    t.loc[last_index,data[-1]['Symptom5']]=1
    t.loc[last_index,"prognosis"]=New_disease
 
    

    t.to_csv("Training.csv")


    # train.loc[last_index,"prognosis"]=New_disease
    # print(train['prognosis'])
    
    
    



    return jsonify('hello')


# data=request.get('http://localhost:3000/Disease_Information')




  

# print(disease)
# s1=""
# s2=""
# s3=""
# s4=""
# s5=""
# symptoms=[]
# for i in data:
#     if i not in data:
        
#         symptoms.append(i['Symptom1'])
#         s1=i['Symptom1']
#         symptoms.append(i['Symptom2'])
#         s2=i['Symptom2']
#         symptoms.append(i['Symptom3'])
#         s3=i['Symptom3']
#         symptoms.append(i['Symptom4'])
#         s4=i['Symptom4']
#         symptoms.append(i['Symptom5'])
#         s5=i['Symptom5']

# # df["sirdrd"]=0
# for i in symptoms:
#     df[i]=0

# new_row_data=[]
# count_col=len(df.columns)
# for i in range(count_col):
#   new_row_data.append(0)
# new_row_dict = {}
# for i, col in enumerate(df.columns):
#     new_row_dict[col] = new_row_data[i]

# # # Append the new row to the DataFrame
# df = df.append(new_row_dict, ignore_index=True)

# df = df.drop(last_index)
# last_index = df.index[-1]

# df.loc[last_index,s1]=1
# df.loc[last_index,s2]=1
# df.loc[last_index,s3]=1
# df.loc[last_index,s4]=1
# df.loc[last_index,s5]=1
# # df.loc[last_index, "sirdrd"] = 1
# df.loc[last_index,"prognosis"]=disease
# # df.loc[last_index, "acidity"] = 1

if __name__ == '__main__':
    app.run(debug=True)