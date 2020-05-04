# boot.py 
# 
# Tomasz Klebek
# 2020
# 
# Referenced material https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo
#
# This file is executed on every boot (including wake-boot from deepsleep)


#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()

import gsmFunct
from machine import Pin
from machine import Timer



def timerIrq_0(timer):
    """Timer interrupt handler. 
    flashes an led 
    """
    if (RED_LED.value() == True):
        RED_LED.value(0)
    else:
        RED_LED.value(1)


#* end of timerIrq_0


def swInterrupt(pin):
    """Switch interrupt handler. Calls sendMessageToAllContacts()
    
    """
    print('SW Pressed')
    gsmFunct.sendMessageToAllContacts()
    if (GRN_LED.value() == 1):
        GRN_LED.value(0)
    else:
        GRN_LED.value(1)


#* end of swInterrupt

# create output pins
RED_LED = Pin(13, Pin.INOUT)  
GRN_LED = Pin(12, Pin.INOUT)  

# create pin 22 and set it as input and enable pull up
SW = Pin(14,
         Pin.IN,
         Pin.PULL_UP,
         trigger=Pin.IRQ_FALLING,
         handler=swInterrupt,
         debounce=200)

timer0 = Timer(0)
timer0.init(period=200, mode=Timer.PERIODIC, callback=timerIrq_0)

