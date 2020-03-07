import machine, time, sys 
import gsm

# APN credentials

GSM_APN  = 'data.myeirmobile.ie' # Your APN
GSM_USER = '' # Your User
GSM_PASS = '' # Your Pass

# Power on the GSM module

GSM_PWR = machine.Pin(4, machine.Pin.OUT)
GSM_RST = machine.Pin(5, machine.Pin.OUT)
GSM_MODEM_PWR = machine.Pin(23, machine.Pin.OUT)

GSM_PWR.value(0)
GSM_RST.value(1)
GSM_MODEM_PWR.value(1)

GRN_LED = machine.Pin(12, machine.Pin.INOUT)  # create output

def smscb(indexes):
    if indexes:
        print(indexes[0])
        msg = gsm.readSMS(int(indexes[0]), True)
        if msg[6] == 'Done':
            if (GRN_LED.value() == 1):
                GRN_LED.value(0)
            else:
                GRN_LED.value(1)  

        if msg:
            print("New message from", msg[2])
            print(msg[6])
def send_SMS():
    msg = 'test string'
    gsm_num = '00353852302163'
    gsm.sendSMS(gsm_num, msg)

# Init PPPoS

gsm.debug(True)  # this to see more logs, investigate issues, etc.

gsm.start(tx=27, rx=26, apn=GSM_APN, user=GSM_USER, password=GSM_PASS)

sys.stdout.write('Waiting for AT command response...')
for retry in range(20):
    if gsm.atcmd('AT'):
        break
    else:
        sys.stdout.write('.')
        time.sleep_ms(5000)
else:
    raise Exception("Modem not responding!")
print()



gsm.sms_cb(smscb, 30)