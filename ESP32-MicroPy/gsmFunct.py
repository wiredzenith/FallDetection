# boot.py 
# 
# Tomasz Klebek
# 2020
# 
# GSM function and handling of incoming and outgoing messages 
#
# Referenced material https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo
#

import machine, time, sys
import os
import gsm
import json
import urequests as req

#Variables
contactsPath = "contactFile.txt"

# APN credentials
GSM_APN = 'data.myeirmobile.ie'  # APN
GSM_USER = ''  # User name
GSM_PASS = ''  # Password

# Power on the GSM module
GSM_PWR = machine.Pin(4, machine.Pin.OUT)
GSM_RST = machine.Pin(5, machine.Pin.OUT)
GSM_MODEM_PWR = machine.Pin(23, machine.Pin.OUT)

GSM_PWR.value(0)
GSM_RST.value(1)
GSM_MODEM_PWR.value(1)

# create output
GRN_LED = machine.Pin(12, machine.Pin.INOUT)  

#* Init PPPoS

#gsm.debug(True)  # this to see more logs, investigate issues, etc.

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
    """send an out going text message 

    Arguments:
        outgoingNumber {string} -- The number of the person receiving the message 
        outgoingMsg {string} -- The message you want to send
    """
    gsm.sendSMS(outgoingNumber, outgoingMsg)

#* end of sendSMS gsmFunct.sendMessageToAllContacts()

def printAllContacts():
    with open(contactsPath, 'r') as contacts_json:
        contactsList = json.load(contacts_json)

    return contactsList
        

def sendMessageToAllContacts():
    """ send an alert message to all registers contacts using the .txt file 
    stored on the device
    """
    with open(contactsPath, 'r') as contacts_json:
        contactsList = json.load(contacts_json)

    for contact in contactsList:
        recipient = contact['name']
        outgoingNumber = contact['number']
        outgoingMsg = "Dear " + recipient + " we regret to inform you that an emergency alert has been triggered"
        sendSMS(outgoingNumber, outgoingMsg)
    

def getContacts():
    """Makes a rest call to wiredzenith.tech that get a 
    list of the users stored in the database

    Returns:
        json object -- array of object contaning users names and numbers
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
    """Uses getContacts() to retrive contact list and 
    store it as a .txt file on the device 
    """
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
    """Call back function that is called on the arrival of new messages

    Arguments:
        indexes {tuple} -- indexes of unread messages 
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
                sendSMS(sendersNo, "generic response ;)")
                
            elif inboundMsg == "contacts":
                contacts = printAllContacts()
                sendSMS(sendersNo, contacts)
           
            elif inboundMsg == "my number":
                sendSMS(sendersNo, sendersNo)
           
            elif inboundMsg == "999":
                sendMessageToAllContacts()
            
            elif inboundMsg is "led":
                if (GRN_LED.value() == 1):
                    GRN_LED.value(0)
                else:
                    GRN_LED.value(1)
          
            else:
                msg = """
                Help: 
                'test' = Send a generic response. 
                'contacts' = Returns list of contacts.
                'my number' = Returns senders number.
                'led' = Toggle the green led on the device.
                '999' = Send alert message to all registered contacts.
                """
                sendSMS(sendersNo,msg)


#* end of smscb()
 
#! WARNING do not add this again, causes device to hang and require reflash
#uart = machine.UART(2, tx=27, rx=26, timeout=5000,  buffer_size=1024)
#uart.callback(uart.CBTYPE_PATTERN, uart_cb, pattern= "D: ")

# Get contacts list when the device starts
saveContactsToFile() 

# regester callback function that is called on the arrival of new messages 
#
# smscb = callback function
# 5 = Interval at which to check if a new message has arrived 
gsm.sms_cb(smscb, 5)