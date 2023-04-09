from flask import Flask, jsonify,request
# from flask_cors import CORS
import json
import pickle

import requests
with open('backend/NaiveBayes.sav','rb') as f:
    gnb = pickle.load(f)
with open('backend\RandomForestClassifier.sav','rb') as f:
    rfc = pickle.load(f)
with open('backend\DecisionTree.sav','rb') as f:
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
'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
' Migraine','Cervical spondylosis',
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


if __name__ == '__main__':
    app.run(debug=True)