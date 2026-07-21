# Used for command line agrguments
import argparse

parser = argparse.ArgumentParser(description="Meow like a cat")
parser.add_argument("-n", default=1, help="Number of times to neow", type=int)
args = parser.parse_args()

for _ in range(int(args.n)):
    print("meow")

# To use this command line argument, type the command below
# python argument_parse.py -n 4
