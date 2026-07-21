# Dictionary constructor
my_dic = dict()
# Or
his_dic = {}


# Looping through a dictionary
thisdict = {"Name": "Eric", "Age": 23, "Occupation": "Sonographer", "Completed": True}
for i in thisdict:
    print(f"{i}: {thisdict[i]}")
    print(i)
    print(thisdict[i])

    # NB. i returns the key and thisdict[i] returns the value

# Changing the value in a dictionary
thisdict["Name"] = "Eric Mawule Duadze"
print(thisdict)

print(len(thisdict))

# Dict methods
l = thisdict.get("Age")
print(l)

# keys() returns all the keys in the dictionary
print(thisdict.keys())

# values() returns all the values in the dictionary
print(thisdict.values())

# pop() remove the specified key and it's value
print(thisdict.pop("Completed"))

# popitem() remove the last inserted item
print(thisdict.popitem())

# del remove the item with the specified key name Or delete the dictionary completely
del thisdict["Age"]
del thisdict

# clear() empties the dictionary
thisdict.clear()

# Returns each items in the dict in tuple with the key and value
print(thisdict.items())

# update() will update or add to the dic with the argument pass
thisdict["Attitude"] = "Respectful"
thisdict.update({"Age": 35})
thisdict.update({"Color": "Fair"})
print(thisdict)

# copy() copies the dict to another dict
thatdict = thisdict.copy()
print(thatdict)
# OR
that = dict(thisdict)
print(that)

# NESTED DICTIONARY
myfamily = {
    "child1": {"name": "Emil", "year": 2004},
    "child2": {"name": "Tobias", "year": 2007},
    "child3": {"name": "Linus", "year": 2011},
}

# OR
child1 = {"name": "Emil", "year": 2004}
child2 = {"name": "Tobias", "year": 2007}
child3 = {"name": "Linus", "year": 2011}

myfamily = {"child1": child1, "child2": child2, "child3": child3}

# DICTIONARY COMPREHENSION
family = {i for i in thisdict.items()}
print(family)

students = ["Hermione","Harry","Ron"]

gryfindors= {student: "Gryfindor" for student in students}
print(gryfindors)
