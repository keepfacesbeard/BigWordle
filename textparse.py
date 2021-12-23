
import json 

   
# Opening JSON file 

f = open('dictionary.json',) 

   
# returns JSON object as  
# a dictionary 

data = json.load(f) 

   
# Iterating through the json 
# list 
words = []
for i in data: 
    if len(i) == 7:
        words.append(i)

print(len(words))

wordlist = '","'.join(words)

print(wordlist)
