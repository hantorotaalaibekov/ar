import math

def geo_to_cartesian(latitude, longitude, altitude):
    R = 6371000.0

    lat_rad = math.radians(latitude)
    lon_rad = math.radians(longitude)

    x = R * math.cos(lat_rad) * math.cos(lon_rad)
    y = R * math.cos(lat_rad) * math.sin(lon_rad)
    z = R * math.sin(lat_rad) + altitude

    return x, y, z

coordinates = [
    [42.87996089554084, 74.58550362847747, 744],
    [42.87974076232562, 74.58548217080535, 750],
    [42.87969752178035, 74.58644776605071, 750],
    [42.87991372420372, 74.58646385930481, 744]
]

cartesian_coordinates = [geo_to_cartesian(lat, lon, alt) for lat, lon, alt in coordinates]

for geo, cartesian in zip(coordinates, cartesian_coordinates):
    print(f"{cartesian}")

