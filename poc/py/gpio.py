import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(17,GPIO.OUT)
GPIO.setup(22,GPIO.OUT)
GPIO.setup(27,GPIO.OUT)

while True:
	GPIO.output(17, 1)
	GPIO.output(27, 0)
	time.sleep(0.002)
	GPIO.output(22, 1)
	GPIO.output(17, 0)
	time.sleep(0.1)
	GPIO.output(27, 1)
	GPIO.output(22, 0)
	time.sleep(0.01)

p = GPIO.PWM(27, 100)
p.start(25)
p.ChangeFrequency(200)
p.ChangeDutyCycle(75)
p.stop()


GPIO.cleanup()