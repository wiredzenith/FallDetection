#include <atmel_start.h>

int main(void)
{
	/* Initializes MCU, drivers and middleware */
	atmel_start_init();

	/* Replace with your application code */
	while (1) {
		if (USER_SW0_get_level() == 0)
		{
			printf("hello main\n\r");
			USER_LED0_set_level(0);
			while(USER_SW0_get_level() == 0){}
		} 
		else
		{
			USER_LED0_set_level(1);
		}
	}
}
