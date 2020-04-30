import machine, time, sys 
import gsm
import urequests as req

#Variables

usersList = []

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

# Init PPPoS
def initGsm():
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

def resB():
    gsmFunct.gsm.atcmd('AT+CUSD=1')
    gsmFunct.gsm.atcmd('AT+CUSD=1,"*#100#",15', printable=True)
    time.sleep_ms(5000)
            
def smsCB(indexes):
    if indexes:
        print(indexes[0])
        msg = gsm.readSMS(int(indexes[0]), True)
        reqMsg = msg[6]
        
        def resA():
            if (GRN_LED.value() == 1):
                GRN_LED.value(0)
            else:
                GRN_LED.value(1)
        
        def resB():
            GsmFunct.gsm.atcmd('AT+CUSD=1')
            GsmFunct.gsm.atcmd('AT+CUSD=1,"*#100#",15', printable=True)
            
            
            
        
                
        def resInvalid():
            sendersNumber = msg[2]
            sendersMsg = msg[6]
            reply = "The request you made ' " + sendersMsg + "' is not a valid request. Please try again."
            sendSMS(sendersNumber, reply)
              
        
        
        def receivedMessage(reqMsg):
            switch = {
            
            'Done':resA,
            'Balance':resB
            }
            switch.get(reqMsg,lambda: resInvalid())

        if msg:
            print("New message from", msg[2])
            print(msg[6])
            
def sendSMS(outgoingNumber , outgoingMsg):
    gsm.sendSMS(outgoingNumber, outgoingMsg)
    
def getContacts():
    gsm.connect()
    if gsm.status() == "98, 'Not started'" :
        pass
        r = req.get("http://wiredzenith.tech/contacts/list")
        usersList = r.json()
        gsm.disconnect()
        return usersList
    
    




gsm.sms_cb(smsCB, 2)