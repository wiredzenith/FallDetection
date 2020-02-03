# This is your main script.
from machine import Pin
from time import sleep_ms


p0 = Pin(13, Pin.OUT)    # create output pin on GPIO0

while True:
    p0.value(1)             # set pin to on/high
    sleep_ms(500)
    p0.value(0)             # set pin to on/high
    sleep_ms(500)
    


