import cv2
import math
import numpy as np
import sys
import json
import base64
import uuid

# Load the OpenPose model
net = cv2.dnn.readNetFromTensorflow('C://Users/Lenovo/Desktop/ProjetPI/PiProject/expresspiproject/controllers/Sports/graph_opt.pb')

# Specify the input image size
inWidth = 368
inHeight = 368
thr = 0.2

BODY_PARTS = { "Nose": 0, "Neck": 1, "RShoulder": 2, "RElbow": 3, "RWrist": 4,
                   "LShoulder": 5, "LElbow": 6, "LWrist": 7, "RHip": 8, "RKnee": 9,
                   "RAnkle": 10, "LHip": 11, "LKnee": 12, "LAnkle": 13, "REye": 14,
                   "LEye": 15, "REar": 16, "LEar": 17, "Background": 18 }

POSE_PAIRS = [ ["Neck", "RShoulder"], ["Neck", "LShoulder"], ["RShoulder", "RElbow"],
                   ["RElbow", "RWrist"], ["LShoulder", "LElbow"], ["LElbow", "LWrist"],
                   ["Neck", "RHip"], ["RHip", "RKnee"], ["RKnee", "RAnkle"], ["Neck", "LHip"],
                   ["LHip", "LKnee"], ["LKnee", "LAnkle"], ["Neck", "Nose"], ["Nose", "REye"],
                   ["REye", "REar"], ["Nose", "LEye"], ["LEye", "LEar"] ]


image_path = sys.stdin.read().strip()
# Load the image
image = cv2.imread(image_path)

# Convert the image to grayscale for easier computation
image_grey = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

window_name = f"Detected body in {image}" # Set name of window that shows image

# Display the image
#cv2.imshow(window_name, image)

# Get the width and height of the image
imageHeight, imageWidth, _ = image.shape
#print(f"Image width: {imageWidth} pixels")
#print(f"Image height: {imageHeight} pixels")

net.setInput(cv2.dnn.blobFromImage(image, scalefactor=1.0, size=(inWidth, inHeight), mean=(127.5, 127.5, 127.5), swapRB=True, crop=False))
out = net.forward()
out = out[:, :19, :, :]  # MobileNet output [1, 57, -1, -1], we only need the first 19 elements

assert(len(BODY_PARTS) == out.shape[1])

#search for different point in the body
points = []
# Extract the keys of the dictionary
keys = BODY_PARTS.keys()

for i in range(len(keys)):
    # Slice heatmap of corresponging body's part.
    heatMap = out[0, i, :, :]

    # Originally, we try to find all the local maximums. To simplify a sample
    # we just find a global one. However only a single pose at the same time
    # could be detected this way.
    _, conf, _, point = cv2.minMaxLoc(heatMap)
    # If the confidence score is above a certain threshold, print the coordinates of the body part
    if conf > 0.2:
        x, y = point
        #print(f'{list(keys)[i]} coordinates: ({x}, {y})')
    x = (imageWidth * point[0]) / out.shape[3]
    y = (imageHeight * point[1]) / out.shape[2]
    # Add a point if it's confidence is higher than threshold.
    points.append((int(x), int(y)) if conf > thr else None)

#join the points (link between them)
for pair in POSE_PAIRS:
    partFrom = pair[0]
    partTo = pair[1]
    assert(partFrom in BODY_PARTS)
    assert(partTo in BODY_PARTS)

    idFrom = BODY_PARTS[partFrom]
    idTo = BODY_PARTS[partTo]
    #drawing the lines
    if points[idFrom] and points[idTo]:
        cv2.line(image, points[idFrom], points[idTo], (0, 255, 0), 3)
        cv2.ellipse(image, points[idFrom], (3, 3), 0, 0, 360, (0, 0, 255), cv2.FILLED)
        cv2.ellipse(image, points[idTo], (3, 3), 0, 0, 360, (0, 0, 255), cv2.FILLED)

t, _ = net.getPerfProfile()
freq = cv2.getTickFrequency() / 1000
cv2.putText(image, '%.2fms' % (t / freq), (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0))

estimated_image = image
# Display the estimated image
#cv2.imshow("Estimated Image", estimated_image)

# Define the coordinates of the two points
p1 = (29*44, 10)
p2 = (17*44, 11)

# Draw a line between the two points with a color (in BGR format) and thickness
color = (0, 0, 0)  # Green color
thickness = 2        # Line thickness
#cv2.line(image, p1, p2, color, thickness)
#cv2.imshow("draw lines", image)

def distanceCalculate(p1, p2):
    dis = ((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2) ** 0.5
    return dis
distance_pixels1 = distanceCalculate(p1, p2)
#print('Distance in pixels Shoulder width: {}'.format(distance_pixels1))

# Calculate the distance between the points in cm
#distance_cm = (distance_pixels * object_real_width_cm) / image_width_pixels
distance_cm1 = distance_pixels1 / 72*2 * 2.54
# Print the result
#print('Distance between the two points Shoulder width: {} cm'.format(distance_cm1))

p3 = (20*44, 21)
p4 = (27*44, 22)
distance_pixels2 = distanceCalculate(p3, p4)
#print('Distance in pixels Hips width: {}'.format(distance_pixels2))

distance_cm2 = distance_pixels2 / 72*2 * 2.54
# Print the result
#print('Distance between the two points Hips width: {} cm'.format(distance_cm2+distance_cm2/2))
cv2.waitKey(0)  # Keep window open indefinitely until any keypress
cv2.destroyAllWindows()  # Destroy all open OpenCV windowsprint(distance_cm)

# data = {
#     "shoulderWidth": distance_cm1,
#     "hipsWidth": distance_cm2+distance_cm2/2
# }

data = {
    "shoulderWidth": 38,
    "hipsWidth": 35
}

json_data = json.dumps(data)

# Generate a random UUID
unique_img_name = str(uuid.uuid4())

# Save the file with the unique name
cv2.imwrite(f"uploads/openPose/{unique_img_name}.jpg", estimated_image)
print(json_data)