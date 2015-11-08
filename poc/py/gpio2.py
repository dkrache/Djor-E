# Import des modules
import RPi.GPIO as GPIO
import time
from threading import Thread

GPIO.cleanup()
# Initialisation de la numerotation et des E/S
GPIO.setmode(GPIO.BCM)

class worker(Thread):
	def __init__(self, minPin, ratio):
		Thread.__init__(self)
		self.minPin = minPin
		self.ratio = ratio
		
	def run(self):
		GPIO.setup(self.minPin, GPIO.OUT, initial = GPIO.LOW)
		rapport = 10.0
		sens = True
		
		p = GPIO.PWM(self.minPin, 200)
		p.start(rapport) #ici, rapport_cyclique vaut entre 0.0 et 100.0
		
		# On fait varier l'intensite de la LED
		i=0
		while True:
			i = i + 1
			if sens and rapport < 100.0:
				rapport += 10.0
			elif sens and rapport >= 100.0:
				sens = False
			elif not sens and rapport > 10.0:
				rapport -= 10.0
			elif rapport == 10.0:
				sens = True
			p.ChangeDutyCycle(rapport)
			time.sleep(self.ratio)

t1 = worker(17,0.5)
t2 = worker(22,0.7)
t3 = worker(27,0.3)
t1.start()
t2.start()
t3.start()
