# create a test file
from io import FileIO
import json

allAnswers = []

filename = "sowpods.txt"

mod_list = []
count = 1
for line in FileIO(filename):
    # strip ending whitespaces including newline char
    line = line.rstrip()
    # concatenate every two lines
    if count % 2 == 0:
        mod_list.append(line)
    else:
        old_line = line
    count += 1

dict1 = []
for word in mod_list:
    if len(word) == 7:
        dict1.append(word.upper())
##this is a scrabble dictionary?

# print(dict)


filename2 = "words_alpha.txt"

mod_list2 = []
count2 = 1
for line in FileIO(filename2):
    # strip ending whitespaces including newline char
    line = line.rstrip()
    # concatenate every two lines
    if count % 2 == 0:
        mod_list2.append(line)
    else:
        old_line = line
    count += 1


dict2 = []
for word in mod_list2:
    if len(word) == 7:
        dict2.append(word.upper())
##this is a scrabble dictionary?

# print(dict)


with open("dictionary.json") as ff:
    dictdata = json.load(ff)

dict3 =[]
for key in dictdata:
    dict3.append(key.upper().encode('utf-8'))

##Check largest dictionary against other two, only output words in all three
## better quality of normal word answers, hopefully

for word in dict3:
    if word in dict1:
        if word in dict2:
            allAnswers.append(word)
        else:
            continue
    else:
        continue

print(len(allAnswers))
print(allAnswers)