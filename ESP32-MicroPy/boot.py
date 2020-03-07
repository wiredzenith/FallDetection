# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()

import GSM_Funct
from machine import Pin
from machine import Timer


def timerIrq_0(timer):
    if (RED_LED.value() == True):
        RED_LED.value(0)
    else:
        RED_LED.value(1)


def SW_interrupt(pin):
    print('SW Pressed')
    GSM_Funct.send_SMS()
    if (GRN_LED.value() == 1):
        GRN_LED.value(0)
    else:
        GRN_LED.value(1) 


RED_LED = Pin(13, Pin.INOUT)  # create output
GRN_LED = Pin(12, Pin.INOUT)  # create output

#create pin 22 and set it as input and enable pull up
SW = Pin(14, Pin.IN,Pin.PULL_UP,trigger=Pin.IRQ_FALLING, handler=SW_interrupt,debounce=200) 

timer0 = Timer(0)
timer0.init(period=200, mode=Timer.PERIODIC, callback=timerIrq_0)


