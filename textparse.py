# create a test file
from io import FileIO


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


dict = []
for word in mod_list:
    if len(word) == 7:
        dict.append(word.upper())
##this is a scrabble dictionary?
print(len(dict))
print(dict)

