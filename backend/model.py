from tkinter import *
import numpy as np
import pandas as pd
# from gui_stuff import *
import requests

result=requests.get('http://localhost:3000/Disease_Information')
data=result.json()
# print(data[0]['disease'])


disease=""
for i in data:
    if i not in data :
       disease=i['disease']

print(disease)
s1=""
s2=""
s3=""
s4=""
s5=""
symptoms=[]
for i in data:
    if i not in data:
        
        symptoms.append(i['Symptom1'])
        s1=i['Symptom1']
        symptoms.append(i['Symptom2'])
        s2=i['Symptom2']
        symptoms.append(i['Symptom3'])
        s3=i['Symptom3']
        symptoms.append(i['Symptom4'])
        s4=i['Symptom4']
        symptoms.append(i['Symptom5'])
        s5=i['Symptom5']

# df["sirdrd"]=0
for i in symptoms:
    df[i]=0

new_row_data=[]
count_col=len(df.columns)
for i in range(count_col):
  new_row_data.append(0)
new_row_dict = {}
for i, col in enumerate(df.columns):
    new_row_dict[col] = new_row_data[i]

# # Append the new row to the DataFrame
df = df.append(new_row_dict, ignore_index=True)

df = df.drop(last_index)
last_index = df.index[-1]

df.loc[last_index,s1]=1
df.loc[last_index,s2]=1
df.loc[last_index,s3]=1
df.loc[last_index,s4]=1
df.loc[last_index,s5]=1
# df.loc[last_index, "sirdrd"] = 1
df.loc[last_index,"prognosis"]=disease
# df.loc[last_index, "acidity"] = 1

