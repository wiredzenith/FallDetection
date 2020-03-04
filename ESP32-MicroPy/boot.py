# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()

from machine import Pin
from machine import Timer
from time import sleep_ms


def timerIrq_0(timer):
    if (RED_LED.value() == 1):
        RED_LED.value(0)
    else:
        RED_LED.value(1)


def handle_interrupt(pin):
    print('SW Pressed')
    if (GRN_LED.value() == 1):
        GRN_LED.value(0)
    else:
        GRN_LED.value(1) 


RED_LED = Pin(13, Pin.OUT)  # create output
GRN_LED = Pin(12, Pin.OUT)  # create output
SW = Pin(22, Pin.IN,
         Pin.PULL_UP)  #create pin 15 and set it as input and enable pull up
SW.irq(trigger=Pin.IRQ_FALLING, handler=handle_interrupt)
timer0 = Timer(0)
timer0.init(period=200, mode=Timer.PERIODIC, callback=timerIrq_0)


