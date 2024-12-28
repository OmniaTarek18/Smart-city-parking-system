import requests
import random
import threading
import time

BASE_URL = "http://localhost:8080/update/spot"

STATUSES = ["AVAILABLE", "OCCUPIED"]

def simulate_parking_spot(spot_id, parking_lot_id):
    while True:
        status = random.choice(STATUSES)
        url = f"{BASE_URL}/{spot_id}/{parking_lot_id}?status={status}"

        try:
            # Send the HTTP GET request to update the spot status
            response = requests.get(url)

            if response.status_code == 200:
                print(f"Spot {spot_id} in Lot {parking_lot_id} updated to {status}.")
            else:
                print(f"Failed to update Spot {spot_id}. Status code: {response.status_code}")

        except Exception as e:
            print(f"Error updating Spot {spot_id}: {e}")

        # Wait for a random interval before the next update
        time.sleep(random.uniform(2, 5))

# Function to simulate multiple IoT devices
def simulate_multiple_devices(num_spots, parking_lot_id):
    threads = []

    for spot_id in range(1, num_spots + 1):
        thread = threading.Thread(target=simulate_parking_spot, args=(spot_id, parking_lot_id))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

if __name__ == "__main__":
    NUM_SPOTS = 10

    PARKING_LOT_ID = 1

    print("Starting IoT simulator...")
    simulate_multiple_devices(NUM_SPOTS, PARKING_LOT_ID)
