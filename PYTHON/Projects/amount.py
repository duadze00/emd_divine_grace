def main():
    getAmount()


def getAmount():
    while True:
        n = input("Amount: ")
        try:
            n = float(n)
            return n
        except ValueError:
            print("Invalid amount")
            continue


if __name__ == "__main__":
    main()
