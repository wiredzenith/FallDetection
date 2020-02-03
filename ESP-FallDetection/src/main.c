/* Hello World Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_spi_flash.h"
#include "driver/gpio.h"
#include "driver/spi_master.h"
#include "soc/gpio_struct.h"


  //SCLK = 18, MISO = 19, MOSI = 23, SS = 5


#define PIN_NUM_MISO 19 
#define PIN_NUM_MOSI 23
#define PIN_NUM_CLK  18
#define PIN_NUM_CS   5

#define PIN_NUM_DC   21

#define GPIO_OUTPUT_PIN_SEL (1ULL << PIN_NUM_CS)


bool adxl345_read_reg(spi_device_handle_t spi,uint8_t reg, uint8_t *data);
void adxl345_get_id(spi_device_handle_t);
void cs_gpio_setting();
void adxl345_cmd(spi_device_handle_t spi, const uint8_t cmd);
void cs_low();
void cs_high();

void lcd_spi_pre_transfer_callback(spi_transaction_t *t)
{
    int dc=(int)t->user;
    gpio_set_level(PIN_NUM_DC, dc);
}

void cs_gpio_setting()
{
    gpio_config_t io_config;
   
    io_config.intr_type = GPIO_PIN_INTR_DISABLE; //disable interupt
    io_config.pin_bit_mask = GPIO_OUTPUT_PIN_SEL;
    io_config.pull_down_en = 0;
    io_config.pull_up_en =0;
    gpio_config(&io_config);
}

void adxl345_cmd(spi_device_handle_t spi, const uint8_t cmd)
{
    esp_err_t ret;
    spi_transaction_t t;
    memset(&t, 0, sizeof(t));       //Zero out the transaction
    t.length=8;                     //Command is 8 bits
    t.tx_buffer=&cmd;               //The data is the cmd itself
    t.user=(void*)0;                //D/C needs to be set to 0
    ret=spi_device_polling_transmit(spi, &t);  //Transmit!
    assert(ret==ESP_OK);            //Should have had no issues.
}





//function for reading data back from the slave device 
bool adxl345_read_reg(spi_device_handle_t spi,uint8_t reg, uint8_t *data)
{
    spi_transaction_t t; //This structure describes one SPI transaction. 
                         //The descriptor should not be modified until the transaction finishes.

    cs_low();

    reg |= 0x80;
    
    memset(&t, 0, sizeof(t));
    t.length = 8;
    t.tx_buffer = &reg;
    spi_device_transmit(spi,&t);

    memset(&t, 0, sizeof(t));
    t.length = 8;
    t.flags = SPI_TRANS_USE_RXDATA;
    spi_device_transmit(spi,&t);

    cs_high();
    *data = t.rx_data[0];

    return true;

}

void adxl345_get_id(spi_device_handle_t spi)
{
    
    uint8_t reg = 0x80;
    uint8_t id;

    adxl345_read_reg(spi,reg,&id);
    printf("ADXL345 ID: 0x%02x\n",id);

}

//set chip select(slave select) low before writing to the slave 
void cs_low()
{
    gpio_set_level(PIN_NUM_CS,0);
}
//set chip select(slave select) high after writing to the slave 
void cs_high()
{
    gpio_set_level(PIN_NUM_CS,1);
}


void app_main()
{
    esp_err_t ret;
    spi_device_handle_t spi;
    spi_bus_config_t buscfg={
        .miso_io_num=PIN_NUM_MISO,
        .mosi_io_num=PIN_NUM_MOSI,
        .sclk_io_num=PIN_NUM_CLK,
        .quadwp_io_num=-1,
        .quadhd_io_num=-1,
    };
    spi_device_interface_config_t devcfg={
#ifdef CONFIG_SLAVE_OVERCLOCK
        .clock_speed_hz=26*1000*1000,           //Clock out at 26 MHz
#else
        .clock_speed_hz=10*1000*1000,           //Clock out at 10 MHz
#endif
        .mode=0,                                //SPI mode 0
        .spics_io_num=-1,               //CS pin
        .queue_size=7,                          //We want to be able to queue 7 transactions at a time
        .pre_cb=lcd_spi_pre_transfer_callback,  //Specify pre-transfer callback to handle D/C line
    };


    ret = spi_bus_initialize(VSPI_HOST, &buscfg, 0);
    ESP_ERROR_CHECK(ret);
    
    ret = spi_bus_add_device(VSPI_HOST, &devcfg, &spi);
    ESP_ERROR_CHECK(ret);

    cs_gpio_setting();

    //uint8_t adx_addr = adxl345_get_id(spi);

    printf("Hello world!\n");
    adxl345_get_id(spi);

    for (int i = 5; i >= 0; i--) {
        printf("Restarting in %d seconds...\n", i);
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    printf("Restarting now.\n");
    }

    fflush(stdout);
    esp_restart();
}


