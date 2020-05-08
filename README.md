# Fall Detection For The Elderly

Fall detection device to detect fall by the elderly. Based on an ESP32 development board. the webpage is using Node.js, Express, MongoDB and is running on a virtual machine hosted on digital ocean

## [Project Log](ProjectLog.md)

Falls among the elderly is a serious issue. And to help reduce the effects of a bad fall it is imperative that help comes as soon as possible. That is the point of my project, to develop a device that is able to detect a serious fall and alert next of kin, emergency services, care workers or any other people added to the devices internal call list.

## Flash Micropython to ESP32

The recommended version of Micropython for this board is
[`MicroPython_LoBo_esp32_psram_all.zip`](https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo/raw/master/MicroPython_BUILD/firmware/MicroPython_LoBo_esp32_psram_all.zip)
from [LoBo prebuilt packages](https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo/tree/master/MicroPython_BUILD/firmware).

Flash using [`esptool`](https://github.com/espressif/esptool):
```sh
esptool --chip esp32 --port PORT --baud BAUD --before default_reset --after no_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 0x1000 bootloader/bootloader.bin 0xf000 phy_init_data.bin 0x10000 MicroPython.bin 0x8000 partitions_mpy.bin
```
