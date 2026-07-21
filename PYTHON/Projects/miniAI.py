import random


class MiniAI:
    def __init__(self):
        self.score = 0

    # 1. SENSING
    def sense(self):
        print("\n--- SENSING ---")
        temperature = random.randint(20, 40)
        obstacle_distance = random.randint(1, 100)

        print(f"Temperature Sensor: {temperature}°C")
        print(f"Distance Sensor: {obstacle_distance} cm")

        return {"temperature": temperature, "distance": obstacle_distance}

    # 2. ANALYZING
    def analyze(self, sensor_data):
        print("\n--- ANALYZING ---")

        if sensor_data["temperature"] > 35:
            weather = "Hot"
        else:
            weather = "Normal"

        if sensor_data["distance"] < 20:
            obstacle = True
        else:
            obstacle = False

        analysis = {"weather": weather, "obstacle": obstacle}

        print("Analysis:", analysis)
        return analysis

    # 3. PREDICTING
    def predict(self, analysis):
        print("\n--- PREDICTING ---")

        if analysis["weather"] == "Hot":
            prediction = "Battery may drain faster"
        else:
            prediction = "Battery should last longer"

        print("Prediction:", prediction)
        return prediction

    # 4. PLAYING (simple decision game)
    def play(self):
        print("\n--- PLAYING ---")

        moves = {
            "Move A": random.randint(1, 10),
            "Move B": random.randint(1, 10),
            "Move C": random.randint(1, 10),
        }

        print("Possible Moves:", moves)

        best_move = max(moves, key=moves.get)

        print("Chosen Move:", best_move)

        return best_move

    # 5. COMMUNICATING
    def communicate(self, prediction):
        print("\n--- COMMUNICATING ---")
        message = f"Hello Human! My prediction is: {prediction}"
        print(message)

    # 6. GENERATING
    def generate(self):
        print("\n--- GENERATING ---")

        reports = [
            "System operating normally.",
            "Minor obstacle detected.",
            "Battery usage optimized.",
            "Navigation successful.",
        ]

        report = random.choice(reports)

        print("Generated Report:")
        print(report)

        return report

    # 7. MOVING
    def move(self, analysis):
        print("\n--- MOVING ---")

        if analysis["obstacle"]:
            action = "Turn Left"
        else:
            action = "Move Forward"

        print("Robot Action:", action)

        return action

    # Reinforcement Learning Concept
    def reward(self, action):
        print("\n--- REWARD ---")

        if action == "Move Forward":
            reward = 10
        else:
            reward = 5

        self.score += reward

        print(f"Reward Received: {reward}")
        print(f"Total Score: {self.score}")


# MAIN PROGRAM

ai = MiniAI()

sensor_data = ai.sense()

analysis = ai.analyze(sensor_data)

prediction = ai.predict(analysis)

ai.play()

ai.communicate(prediction)

ai.generate()

action = ai.move(analysis)

ai.reward(action)
