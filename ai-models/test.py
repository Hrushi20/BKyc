import io
import os
from google.cloud import vision

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'D:\Bilal\Self\Projects\BKyc\BKyc\ai-models\BKYC_GoogleServiceAccount.json'

client = vision.ImageAnnotatorClient()
with io.open(r"images\1.jfif", 'rb') as image_file:
        content = image_file.read()
image = vision.Image(content=content)
response = client.text_detection(image=image)
