# Import des modules
import RPi.GPIO as GPIO
from time import sleep

# Initialisation de la numerotation et des E/S
GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)
p = GPIO.PWM(17, 10)
p.start(100);
GPIO.output(17,GPIO.HIGH)
sleep(0.2);
GPIO.cleanup()