# ================================================================================================
# ASYNCHRONOUS PROGRAMMING
# ================================================================================================
# Normally, Python executes code line by line
import time

print("Start")
time.sleep(3)
print("End")

# Output:
# # Start
# # (wait 3 seconds)
# # End

# During those 3 seconds Python is doing absolutely nothing.
# This is called blocking code.

# ========================================================
# WHEN TO USE ASYNC
# ========================================================
# Async is useful for:
# ✅ API requests
# ✅ Database queries
# ✅ Reading files
# ✅ Downloading data
# ✅ Chat applications
# ✅ Web servers
# ✅ Bots
# ✅ Streaming
# ✅ Web scraping

# ========================================================
# WHEN NOT TO USE ASYNC
# ========================================================
# Not useful for:
# ❌ Heavy calculations
# ❌ Image processing
# ❌ Machine Learning training
# ❌ CPU intensive work

# ========================================================
# THE CORE KEYWORD
# ========================================================
# Python async uses:
# # async
# # await
# # asyncio

# Think:
# # async = this function can pause
# # await = pause here until result arrives
# # asyncio = manages async tasks


# ========================================================
# CREATING YOUR FIRST ASYNC FUNCTION
# ========================================================
# Normal function:
def greet():
    return "Hello"


# Async function:
async def greet():
    return "Hello"


# Notice: async def


# ========================================================
# RUNNING ASYNC FUNCTION
# ========================================================
# This won't work:
async def greet():
    return "Hello"


greet()
# Because async functions return a coroutine.

# INSTEAD USE:
import asyncio


async def greet():
    return "Hello"


print(asyncio.run(greet()))

# ========================================================
# AWAIT
# ========================================================
# Suppose:
import asyncio


async def get_data():
    await asyncio.sleep(2)
    return "Data received"


# The line: await asyncio.sleep(2)
# Means:
# # Pause this task
# # Let other tasks run
# # Come back later

# EG.
import asyncio


async def main():
    print("Start")
    result = await get_data()
    print(result)


asyncio.run(main())

# ========================================================
# ASYNCIO.SLEEP()
# ========================================================
# Synchronous version:
import time

time.sleep(2)
# Blocks everything.


# Async version:
async def main():
    await asyncio.sleep(2)


# Allows other tasks to continue.


# ========================================================
# MULTIPLE TASKS
# ========================================================
# Without async:
import time


def task1():
    time.sleep(3)


def task2():
    time.sleep(3)


task1()
task2()
# Time: 6 seconds

# Async version:
import asyncio


async def task1():
    await asyncio.sleep(3)


async def task2():
    await asyncio.sleep(3)


async def main():
    await asyncio.gather(task1(), task2())


asyncio.run(main())
# Time: 3 seconds
# Both task run together

# ========================================================
# ASYNCIO.GATHER()
# ========================================================
# This is like: Promise.all()

# JS
# await Promise.all([
#   fetch(url1),
#   fetch(url2)
# ]);


# PYTHON
async def main():
    await asyncio.gather(task1(), task2())


# Runs multiple coroutines concurrently.

# ========================================================
# REAL API EXAMPLE
# ========================================================
# Install:
# # pip install aiohttp

import aiohttp
import asyncio


async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()


async def main():
    html = await fetch("https://jsonplaceholder.typicode.com/posts")

    print(html[:100])


asyncio.run(main())

# ========================================================
# MULTIPLE API REQUESTS
# ========================================================
import aiohttp
import asyncio


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()


async def main():
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]

    async with aiohttp.ClientSession() as session:
        results = await asyncio.gather(*(fetch(session, url) for url in urls))

    print(results)


asyncio.run(main())
# Much faster than fetching one by one.


# ========================================================
# CREATING TASKS
# ========================================================
# Sometimes you want something to run in the background.
async def my_function():
    pass


task = asyncio.create_task(my_function())

# Example:
import asyncio


async def work():
    await asyncio.sleep(5)
    print("Done")


async def main():
    task = asyncio.create_task(work())
    print("Doing other work")
    await task


asyncio.run(main())

# Output:
# # Doing other work
# # Done


# ========================================================
# TASK VS AWAIT
# ========================================================
# Direct await
async def main():
    await work()  # Runs immediately.


# Task
task = asyncio.create_task(work())
# Starts running in background.

# ========================================================
# ASYNC ITERATION
# ========================================================
# Equivalent to:
data = []
for item in data:
    pass


# But async.
stream = []


async def task():
    async for item in stream:
        print(item)


# Used in:
# # streaming
# # websockets
# # live data feeds

# Example:
import asyncio


async def numbers():
    for i in range(5):
        await asyncio.sleep(1)
        yield i


async def main():
    async for num in numbers():
        print(num)


asyncio.run(main())


# ========================================================
# ASYNC GENERATORS
# ========================================================
# Normal generator:
def nums():
    yield 1


# Async generator:
async def nums():
    yield 1


# Used with: async for

# ========================================================
# ASYNC CONTEXT MANAGERS
# ========================================================
# Normal:
with open("file.txt") as f:
    pass


# Async:
async def file():
    async with aiohttp.ClientSession() as session:
        pass


# Used when resources require async cleanup.


# ========================================================
# ASYNC EXCEPTION HANDLING
# ========================================================
async def data():
    try:
        result = await fetch()
    except Exception as e:
        print(e)


# Same as normal Python.

# ========================================================
# ASYNC TIMEOUT
# ========================================================
# Prevent waiting forever.
import asyncio


async def timeouts():
    await asyncio.wait_for(fetch(), timeout=5)


# If it takes longer than 5 seconds: TimeoutError


# ========================================================
# CANCELING TASKS
# ========================================================
task.cancel()

# Example
task = asyncio.create_task(work())
task.cancel()

# Useful for:
# # stopping downloads
# # stopping requests
# # shutting down servers

# ========================================================
# ASYNC QUEUE
# ========================================================
# Producer-consumer pattern.
queue = asyncio.Queue()


# Producer:
async def producer():
    await queue.put(data)


# Consumer:
async def consumer():
    data = await queue.get()


# Used in:
# # chat systems
# # workers
# # job processing

# ========================================================
# ASYNC vs MULTITHREADING
# ========================================================
# Async
# One thread
# Many waiting tasks
# Best for I/O.

# Threading
# Multiple threads
# Useful when libraries are blocking.

# Module:
import threading

# ========================================================
# ASYNC vs MULTIPROCESSING
# ========================================================
# Multiprocessing
import multiprocessing

# Uses multiple CPU cores.
# Best for:
# # image processing
# # ML
# # data science
# # heavy calculations

# ========================================================
# THE MOST COMMON ASYN PATTERN IN REAL PROJECTS
# ========================================================
import aiohttp
import asyncio


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()


async def main():
    urls = ["url1", "url2", "url3", "url4"]

    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]

        results = await asyncio.gather(*tasks)

    print(results)


asyncio.run(main())
# This pattern is constantly used in production code

# ========================================================
# MENTAL MODEL TO REMEMBER
# ========================================================
# Think of async as a restaurant:

"""
async def
    = a waiter

await
    = waiting for food

asyncio.create_task()
    = another waiter starts working

asyncio.gather()
    = many orders handled together

asyncio.run()
    = opens the restaurant

event loop
    = restaurant manager coordinating everyone
"""
