from geopy.distance import great_circle

# Houston, Texas coordinates
houston_coordinates = (29.749907, -95.358421)

# List of coordinates from the attachment
coordinates_list = [
    (19.08348, -155.54211), (18.91619, -155.68817), (19.05939, -155.93665), (19.33888, -155.90806),
    (19.70294, -156.07347), (19.81422, -156.02368), (19.97729, -155.85008), (20.17395, -155.91907),
    (20.26721, -155.86108), (20.2487, -155.78505), (20.07975, -155.40214), (19.99302, -155.22452),
    (19.8591, -155.06226), (19.50871, -154.80741), (19.45328, -154.83147), (19.23972, -155.22217),
    (20.64397, -156.07926), (20.57241, -156.41445), (20.783, -156.58673), (20.8643, -156.70167),
    (20.92676, -156.71055), (21.01249, -156.61258), (20.91745, -156.25711), (20.76404, -155.99566),
    (20.64397, -156.07926), (21.17684, -156.75824), (21.06873, -156.78933), (21.09777, -157.32521),
    (21.21958, -157.25027), (21.32217, -157.65283), (21.26442, -157.70703), (21.27729, -157.7786),
    (21.31244, -158.12667), (21.53919, -158.2538), (21.57912, -158.29265), (21.71696, -158.0252),
    (21.65272, -157.94161), (21.982, -159.34512), (21.88299, -159.46372), (22.06533, -159.80051),
    (22.1382, -159.74877), (22.23618, -159.5962), (22.21494, -159.36569), (21.982, -159.34512),
    (49.38905, -94.81758), (48.8400000000001, -94.6399999999999), (48.67074, -94.32914), (48.60926, -93.63087),
    (48.45, -92.61), (48.14, -91.64), (48.27, -90.8299999999999), (48.01, -89.6),
    (48.0198082545828, -89.2729174466367), (48.3029175888938, -88.3781141832865), (47.94, -87.4397926233002),
    (47.553338019392, -86.4619908312281), (47.2202188177305, -85.6523632474032), (46.9000833196824, -84.8760798815149),
    (46.6371019557491, -84.7792382473998), (46.5386841904492, -84.5437487454456), (46.4396, -84.6049),
    (46.4087700000001, -84.3367), (46.5122258571157, -84.1421195136733), (46.2754186061383, -84.0918512641615),
    (46.1169269882992, -83.8907653470057), (46.1169269882992, -83.6161309475905), (45.9946863877126, -83.4695507473946),
    (45.8168936224125, -83.5928507148431), (45.3475165879054, -82.5509246487582), (44.44, -82.3377631254311)
]

# Calculate distances from each coordinate to Houston and find the closest one
closest_coordinate = None
closest_distance = float('inf')
for coord in coordinates_list:
    distance = great_circle(houston_coordinates, coord).miles
    if distance < closest_distance:
        closest_distance = distance
        closest_coordinate = coord

# Print the closest coordinate and distance
print(f'Closest Coordinate: {closest_coordinate}')
print(f'Distance: {closest_distance} miles')