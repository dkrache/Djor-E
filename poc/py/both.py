# Import des modules
import RPi.GPIO as GPIO
from time import sleep

# Initialisation de la numerotation et des E/S
GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)
GPIO.output(17,GPIO.HIGH)
GPIO.setup(18,GPIO.OUT)
GPIO.output(18,GPIO.HIGH)
sleep(1);
GPIO.cleanup()