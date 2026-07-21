import json
import datetime

task_content = []
task = input("Enter task here: ")
time_added = datetime.datetime.now()
to_do_list = {"To do list": task, "Time": str(time_added)}
try:
    with open("task.json", "r") as file:
        task_content = json.load(file)
except json.JSONDecodeError, FileNotFoundError:
    task_content = []
task_content.append(to_do_list)
with open("task.json", "w") as file:
    json.dump(task_content, file, indent=4)
