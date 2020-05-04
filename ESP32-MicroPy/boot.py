# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()

import gsmFunct
from machine import Pin
from machine import Timer



def timerIrq_0(timer):
    """[summary]

    Arguments:
        timer {[type]} -- [description]
    """
    if (RED_LED.value() == True):
        RED_LED.value(0)
    else:
        RED_LED.value(1)


#* end of timerIrq_0


def swInterrupt(pin):
    """[summary]

    Arguments:
        pin {[type]} -- [description]
    """
    print('SW Pressed')
    gsmFunct.sendSMS("00353852302163", "hey sexy")
    if (GRN_LED.value() == 1):
        GRN_LED.value(0)
    else:
        GRN_LED.value(1)


#* end of swInterrupt

RED_LED = Pin(13, Pin.INOUT)  # create output
GRN_LED = Pin(12, Pin.INOUT)  # create output

# create pin 22 and set it as input and enable pull up
SW = Pin(14,
         Pin.IN,
         Pin.PULL_UP,
         trigger=Pin.IRQ_FALLING,
         handler=swInterrupt,
         debounce=200)

timer0 = Timer(0)
timer0.init(period=200, mode=Timer.PERIODIC, callback=timerIrq_0)

