import json
import datetime

task_content = []


def save():
    try:
        with open("task.json", "r") as file:
            task_content = json.load(file)
    except json.JSONDecodeError, FileNotFoundError:
        task_content = []
    task_content.append(to_do_list)
    with open("task.json", "w") as file:
        json.dump(task_content, file, indent=4)


print("1. Add task\n2. View task\n3. Remove task\n4. Delete all task")
while True:
    choice = input("Enter choice: ").strip()
    if not choice in ["1", "2", "3", "4"]:
        print("Invalid choice, try again")
        print("1. Add task\n2. View task\n3. Remove task\n4. Delete all task")
        continue
    else:
        break
if choice == "1":
    task = input("Enter task here: ")
    time_added = datetime.datetime.now()
    to_do_list = {"To do list": task, "Time": str(time_added)}
    print(f"Task added successfully at {time_added}")
    save()
elif choice == "2":
    with open("task.json", "r") as file:
        task_content = json.load(file)
        for content in task_content:
            print(content)
elif choice == "3":
    pass
else:
    pass
