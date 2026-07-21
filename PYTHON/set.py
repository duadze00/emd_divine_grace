# Declaring or creating a set
myset = {"Eric","Mawule",9}
print(type(myset))

# Set constructor
m = set()

# Set are unordered and unindexed and do not allow duplicates but can add new items

# Adding to the set
myset.add("Kwadwo")
print(myset)

# Copying set
new_set = myset.copy()
print(new_set)

# Finding the differece in two set
new_set.add("Chilling")
n = myset.difference(new_set)
print(n)

#  Can not access the index of a set with index or key but can loop through them
for i in new_set:
    print(i)

# Add two different set or list or tuple by using the update fnx or union
thisset = {"apple", "banana", "cherry"}
tropical = {"pineapple", "mango", "papaya"}
thisset.update(tropical)
print(thisset)
m = tropical.union(thisset)
print(m)

# Remove item from a  set
thisset = {"apple", "banana", "cherry"}
thisset.remove("apple")
print(thisset)
# OR
thisset.discard("banana")
print(thisset)

# SET COMPREHENSION 
tropical = {"pineapple", "mango", "papaya"}
mynewset = {i for i in tropical if "mango" in tropical}
print(mynewset)

n = {1,20,3,13,15,4,0,5}
m = {i for i in n if i % 2 == 0}
print(m)

# Do well to try other set methods

fruits = {"apple", "banana", "cherry"}
if "apple" in fruits:
  print("Yes, apple is a fruit!")