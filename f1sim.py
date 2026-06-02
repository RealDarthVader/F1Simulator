import random
drivers={"Max Verstappen":{"Pace":100, "Racecraft": 98, "Experience": 97, "Awareness":99, "Quali":99},
            "Lewis Hamilton":{"Pace":99, "Racecraft": 97, "Experience": 98, "Awareness":98, "Quali":96},
            "Charles Leclerc":{"Pace":98, "Racecraft": 95, "Experience": 96, "Awareness":97, "Quali":100},
            "Sergio Perez":{"Pace":90, "Racecraft": 94, "Experience": 95, "Awareness":96, "Quali":90},
            "Lando Norris":{"Pace":90, "Racecraft": 92, "Experience": 94, "Awareness":95, "Quali":91},
            "Michael Schumacher":{"Pace":99, "Racecraft": 99, "Experience": 100, "Awareness":100, "Quali":95},
            "Ayrton Senna":{"Pace":99, "Racecraft": 99, "Experience": 99, "Awareness":99, "Quali":100},
            "Sebastian Vettel":{"Pace":98, "Racecraft": 93, "Experience": 94, "Awareness":95, "Quali":96},
            "Fernando Alonso":{"Pace":99, "Racecraft": 91, "Experience": 93, "Awareness":94, "Quali":98},
            "Valtteri Bottas":{"Pace":87, "Racecraft": 90, "Experience": 92, "Awareness":93, "Quali":87},
            "Nico Rosberg":{"Pace":92, "Racecraft": 89, "Experience": 91, "Awareness":92, "Quali":93},
            "Kimi Raikkonen":{"Pace":93, "Racecraft": 88, "Experience": 90, "Awareness":91, "Quali":92},
            "Daniel Ricciardo":{"Pace":91, "Racecraft": 87, "Experience": 89, "Awareness":90, "Quali":90},
            "Oscar Piastri":{"Pace":90, "Racecraft": 86, "Experience": 88, "Awareness":89, "Quali":90},
            "George Russell":{"Pace":88, "Racecraft": 85, "Experience": 87, "Awareness":88, "Quali":90},
            "Carlos Sainz":{"Pace":88, "Racecraft": 84, "Experience": 86, "Awareness":87, "Quali":89},
            "Alan Prost":{"Pace":95, "Racecraft": 98, "Experience": 99, "Awareness":99, "Quali":93},
            "Niki Lauda":{"Pace":99, "Racecraft": 97, "Experience": 98, "Awareness":98, "Quali":95},
            "James Hunt":{"Pace":95, "Racecraft": 95, "Experience": 96, "Awareness":97, "Quali":91},
}
calendar=["Australian Grand Prix", "Bahrain Grand Prix", "Chinese Grand Prix", "Azerbaijan Grand Prix", "Spanish Grand Prix", "Monaco Grand Prix", "Canadian Grand Prix", "French Grand Prix", "Austrian Grand Prix", "British Grand Prix", "Hungarian Grand Prix", "Belgian Grand Prix", "Italian Grand Prix", "Singapore Grand Prix", "Russian Grand Prix", "Japanese Grand Prix", "United States Grand Prix", "Mexico City Grand Prix", "Brazilian Grand Prix", "Abu Dhabi Grand Prix"]

tracks = {

    "Monaco Grand Prix": {
        "pace": 0.8,
        "racecraft": 1.0,
        "awareness": 1.4
    },

    "Italian Grand Prix": {
        "pace": 1.4,
        "racecraft": 0.8,
        "awareness": 1.0
    },

    "Japanese Grand Prix": {
        "pace": 1.2,
        "racecraft": 1.0,
        "awareness": 1.2
    },

    "British Grand Prix": {
        "pace": 1.2,
        "racecraft": 1.1,
        "awareness": 1.1
    }
    
}

def simulate_quali():
    results=[]
    for driver, stats in drivers.items():
        score=(stats["Quali"]*0.8+ stats["Pace"]*0.7+stats["Awareness"]*0.2+ stats["Experience"]*0.1+ stats["Racecraft"]*0.3+ random.uniform(-10,10))
        results.append((driver, score))
        results.sort(
            key=lambda x:x[1],
            reverse=True
        )
    return results
    
quali = simulate_quali()
print("\n===== QUALIFYING =====\n")
for pos, (driver, score) in enumerate(quali, start=1):
    print(f"{pos}. {driver} ({score:.2f})")

# for i in range(10):
#     quali = simulate_quali()

#     print(f"\nRun {i+1}")

#     for pos, (driver, score) in enumerate(quali[:5], start=1):
#         print(pos, driver)

def simulate_race(quali_results, race_name):
    track = tracks.get(
    race_name,
    {
        "pace":1.0,
        "racecraft":1.0,
        "awareness":1.0
    }
)
    race_results = []

    for position, (driver, quali_score) in enumerate(quali_results):

        stats = drivers[driver]

        race_score = (

        stats["Pace"] * track["pace"] * 0.35 +

        stats["Racecraft"] * track["racecraft"] * 0.30 +

        stats["Experience"] * 0.20 +

        stats["Awareness"] * track["awareness"] * 0.15
)

        starting_bonus = (20 - position) * 0.2

        randomness = random.uniform(-5, 5)

        final_score = race_score + starting_bonus + randomness

        race_results.append((driver, final_score))

    race_results.sort(
        key=lambda x: x[1],
        reverse=True
    )

    return race_results
# race = simulate_race(
#     quali,
#     race_name
# )
def simulate_quali():
    results = []

    for driver, stats in drivers.items():

        score = (
            stats["Quali"] * 0.8
            + stats["Pace"] * 0.7
            + stats["Awareness"] * 0.2
            + stats["Experience"] * 0.1
            + stats["Racecraft"] * 0.3
            + random.uniform(-10, 10)
        )

        results.append((driver, score))

    results.sort(
        key=lambda x: x[1],
        reverse=True
    )

    return results


points = [25,18,15,12,10,8,6,4,2,1]

championship = {}

for driver in drivers:
    championship[driver] = 0


def award_points(race_results):

    for pos, (driver, score) in enumerate(race_results):

        if pos < len(points):
            championship[driver] += points[pos]


for race_name in calendar:

    print(f"\n===== {race_name} =====")

    quali = simulate_quali()

    race = simulate_race(quali, race_name)
    award_points(race)

    print("\nPodium:")

    for pos, (driver, score) in enumerate(race[:3], start=1):
        print(f"{pos}. {driver}")


sorted_standings = sorted(
    championship.items(),
    key=lambda x: x[1],
    reverse=True
)

print("\n==============================")
print(" FINAL CHAMPIONSHIP STANDINGS ")
print("==============================\n")

for pos, (driver, points) in enumerate(sorted_standings, start=1):

    print(f"{pos}. {driver} - {points} pts")

