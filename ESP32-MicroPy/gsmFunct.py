import machine, time, sys
import os
import gsm
import json
import urequests as req

#Variables


contactsPath = "contactFile.txt"

# APN credentials

GSM_APN = 'data.myeirmobile.ie'  # Your APN
GSM_USER = ''  # Your User
GSM_PASS = ''  # Your Pass

# Power on the GSM module

GSM_PWR = machine.Pin(4, machine.Pin.OUT)
GSM_RST = machine.Pin(5, machine.Pin.OUT)
GSM_MODEM_PWR = machine.Pin(23, machine.Pin.OUT)

GSM_PWR.value(0)
GSM_RST.value(1)
GSM_MODEM_PWR.value(1)

GRN_LED = machine.Pin(12, machine.Pin.INOUT)  # create output

#* Init PPPoS

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

#* end of Init PPPoS



#------------Functions-------------------#


# def uart_cb(res): #! WIP
#     """[summary]

#     Arguments:
#         res {[type]} -- [description]
#     """

#     print("[UART CB]", res)

# #* end of uart_cb


def sendSMS(outgoingNumber, outgoingMsg):
    """[summary]

    Arguments:
        outgoingNumber {[type]} -- [description]
        outgoingMsg {[type]} -- [description]
    """
    gsm.sendSMS(outgoingNumber, outgoingMsg)

#* end of sendSMS gsmFunct.sendMessageToAllContacts()

def sendMessageToAllContacts():
    
    with open(contactsPath, 'r') as contacts_json:
        contactsList = json.load(contacts_json)

    for contact in contactsList:
        recipient = contact['name']
        outgoingNumber = contact['number']
        outgoingMsg = "Dear " + recipient + " we regret to inform you that an emergency alert has been triggered"
        sendSMS(outgoingNumber, outgoingMsg)
    

def getContacts():
    """[summary]

    Returns:
        [type] -- [description]
    """
    
    usersList = []
    gsm.connect()
    if gsm.status() == "98, 'Not started'":
        gsm.connect()
    r = req.get("http://wiredzenith.tech/contacts/list")
    usersList = r.json()
    gsm.disconnect()

    return usersList

#* end of getContacts

def saveContactsToFile():
    usersList = []
        
    try:
        os.remove(contactsPath)
    except OSError:
        print("File doesn't exist, Creating " + contactsPath)
    finally:
        usersList = getContacts()
        
    with open(contactsPath, 'w') as outfile:
        json.dump(usersList, outfile)

    with open(contactsPath) as json_file:
        data = json.load(json_file)
        print(data)

#* end of saveContactsToFile

def smscb(indexes):
    """[summary]

    Arguments:
        indexes {[type]} -- [description]
    """
    if indexes:
        print(indexes[0])
        msg = gsm.readSMS(int(indexes[0]), True)
        reqMsg = msg[6]

        if msg:
            print("New message from", msg[2])
            inboundMsg = msg[6].strip().lower()
            sendersNo = msg[2]
            print(inboundMsg)
            if inboundMsg == "test":
                sendSMS(sendersNo, "test this sexy")

            elif inboundMsg == "hello":
                sendSMS(sendersNo, "hello this sexy")

            elif inboundMsg == "balance":
                sendSMS(sendersNo, "balance this sexy")

            elif inboundMsg == "contacts":
                sendSMS(sendersNo, "contacts sexy")

            elif inboundMsg == "my number":
                sendSMS(sendersNo, "0852302163")
            elif inboundMsg == "999":
                sendMessageToAllContacts()
            elif inboundMsg is "led":
                if (GRN_LED.value() == 1):
                    GRN_LED.value(0)
                else:
                    GRN_LED.value(1)
            else:
                sendSMS(
                    sendersNo,
                    """\rHelp: test = a sext test balance = sexy balance contacts = sexy contacts my number = my number """
                )


#* end of smscb()

# def resA():
#     if (GRN_LED.value() == 1):
#         GRN_LED.value(0)
#     else:
#         GRN_LED.value(1)



  
#! WARNING do not add this again, causes device to hang and require reflash
#uart = machine.UART(2, tx=27, rx=26, timeout=5000,  buffer_size=1024)
#uart.callback(uart.CBTYPE_PATTERN, uart_cb, pattern= "D: ")

# Get contacts list when the device starts
saveContactsToFile() 

gsm.sms_cb(smscb, 5)