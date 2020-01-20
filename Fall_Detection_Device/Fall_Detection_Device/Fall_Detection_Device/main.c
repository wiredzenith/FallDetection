#include <atmel_start.h>
#include "examples/include/spi_basic_example.h"

int main(void)
{

	uint8_t buffer[3] = {0x45, 5, 0};
	uint8_t dummy_byte = 0;

	/* Initializes MCU, drivers and middleware */
	atmel_start_init();
	
	/* Replace with your application code */
	/* Really ??? */

	printf("\r\nSend byte 0xAA to SPI");
	
	SPI_SS_A_set_level(false);
	dummy_byte = SPI_0_exchange_byte(0xAA);
	SPI_SS_A_toggle_level;

	for (uint8_t i=0; i<sizeof(buffer);i++)
	{
		SPI_SS_A_toggle_level;
		dummy_byte = SPI_0_exchange_byte(buffer[i]);
		SPI_SS_A_toggle_level;
	}
	SPI_SS_A_set_level(true);
	

	if (dummy_byte)
	printf("first spi example test successfully run.");
	else
	printf("first spi example test :( wrong :( ");
	
	
	while (1) {
		
	}
}

