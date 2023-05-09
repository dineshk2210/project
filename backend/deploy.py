from flask import Flask, jsonify,request
# from flask_cors import CORS
import json
import pickle
import pandas as pd
import numpy as np

import requests




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

    l2=[]
    for x in range(0,len(l1)):
        l2.append(0)
    

    a=train[['prognosis']]
    b=np.ravel(a)
    disease=np.unique(b)

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






  

# df = df.drop(last_index)

if __name__ == '__main__':
    app.run(debug=True)