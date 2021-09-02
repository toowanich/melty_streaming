from PIL import Image
import os
import fnmatch

box=(0,710,160,720)
pasteBox=(0,0,160,10)
path = "static/assets/sidebar/"
for file in os.listdir(path):
    if fnmatch.fnmatch(file, '*.bmp'):
        im = Image.open(path+file)
        region = im.crop(box)
        region = region.transpose(Image.ROTATE_180)
        im.paste(region, pasteBox)
        im.save(path+file, "BMP")


