import io
import os
from google.cloud import vision


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'BKYC_GoogleServiceAccount.json'

def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()
    with io.open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations
    f = open("detected_text.json", "x")
    f.write(str(response))
    f.close()
    # print(response)
    # print('Texts:')
    # for text in texts:
    #     print('\n"{}"'.format(text.description))
    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in text.bounding_poly.vertices])
    #     print('bounds: {}'.format(','.join(vertices)))
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
        
        
detect_text(r"images\1.jfif")





def detect_faces(path):
    """Detects faces in an image."""
    client = vision.ImageAnnotatorClient()
    with io.open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.face_detection(image=image)
    faces = response.face_annotations
    # Names of likelihood from vision.enums
    likelihood_name = ('UNKNOWN', 'VERY_UNLIKELY', 'UNLIKELY', 'POSSIBLE',
                       'LIKELY', 'VERY_LIKELY')
    f = open("detected_face.json", "x")
    f.write(str(response))
    f.close()
    # print(type(response))
    # print('Faces:')
    # for face in faces:
    #     print('anger: {}'.format(likelihood_name[face.anger_likelihood]))
    #     print('joy: {}'.format(likelihood_name[face.joy_likelihood]))
    #     print('surprise: {}'.format(likelihood_name[face.surprise_likelihood]))
    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in face.bounding_poly.vertices])
    #     print('face bounds: {}'.format(','.join(vertices)))
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
detect_faces("images\\2.jfif")