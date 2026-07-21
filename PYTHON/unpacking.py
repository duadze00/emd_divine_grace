# *args
first, *second = input("What's you name? ").split(" ")
print(f"Hello {first}")


coins = [100, 50, 25]


def total(galleon, sickles, knuts):
    return galleon * 17 + sickles * 29 + knuts


print(total(*coins))


# **kwargs
coins = {"galleon": 100, "sickles": 50, "knuts": 25}
print(total(**coins))


def unknow_pass_arguments(*args, **kwargs):
    print("Positional:", args)
    print("Named", kwargs)


unknow_pass_arguments(100, x="Eric", y=50)
