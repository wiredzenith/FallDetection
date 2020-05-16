from machine import I2C

i2c = I2C(0, sda=21, scl=22)

''' i2c.scan()

nbytes=0
 
i2c.readfrom(117, nbytes)

print(nbytes)

i2c.readfrom_mem(29, 0, 6) '''

ADXL342_ADDR = 0x1D

DATAX0 = 0x32
DATAX1 = 0x33
DATAY0 = 0x34
DATAY1 = 0x35
DATAZ0 = 0x36

DATA_FORMAT_ADDR = 0x31
POWER_CTL_ADDR = 0x2D
INT_ENABLE_ADDR = 0x2E

DATA_FORMAT = bytearray(0x0B)
POWER_CTL = bytearray(0x08)
INT_ENABLE = bytearray(0x80)

bite_bufferX0 = bytearray(16)
bite_bufferX1 = bytearray(16)

def ADXLInit():
    i2c.writeto_mem(ADXL342_ADDR, DATA_FORMAT_ADDR, DATA_FORMAT)
    i2c.writeto_mem(ADXL342_ADDR, POWER_CTL_ADDR, POWER_CTL)
    i2c.writeto_mem(ADXL342_ADDR, INT_ENABLE_ADDR, INT_ENABLE)
    
def readX():
    
    i2c.readfrom_mem_into(ADXL342_ADDR, DATAX0, bite_bufferX0)
    i2c.readfrom_mem_into(ADXL342_ADDR, DATAX1, bite_bufferX1)
    print("X0: ",bite_bufferX0)
    print("X1: ",bite_bufferX1)
    
ADXLInit()
readX()