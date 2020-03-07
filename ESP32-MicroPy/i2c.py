from machine import I2C

i2c = I2C(0, sda=21, scl=22)

i2c.scan()

nbytes=0
 
i2c.readfrom(117, nbytes)

print(nbytes)

i2c.readfrom_mem(29, 0, 6)