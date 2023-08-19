from machine import Pin, I2C
import ssd1306
import network
import time
import urequests

# Function to fetch and display the USD values
def update_display():
    resp = urequests.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    usd_array = resp.json()
    blue = usd_array[1]
    L1 = "Dolar blue"
    L2 = "Compra: "
    L3 = "Venta: "
    if 'casa' in blue:
        L2 = L2 + blue['casa']['compra']
        L3 = L3 + blue['casa']['venta']
    else:
        L2 = L2 + "-"
        L3 = L3 + "-"

    # Clear the display
    oled.fill(0)

    # Set the font size for lines 1, 2, and 3
    font_size_l1 = 1
    font_size_l2_l3 = 2

    # Display line 1
    oled.text(L1, 5, 5, font_size_l1)

    # Calculate the height of lines 2 and 3 based on the font size used
    line_height = 10 if font_size_l2_l3 == 1 else 20

    # Display line 2
    oled.text(L2, 5, 5 + line_height, font_size_l2_l3)

    # Display line 3
    if L3:
        oled.text(L3, 5, 5 + 2 * line_height, font_size_l2_l3)

    # Show the complete content on the OLED display
    oled.show()

# Connect to WiFi
print("Connecting to WiFi", end="")
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect('Wokwi-GUEST', '')
while not sta_if.isconnected():
    print(".", end="")
    time.sleep(0.1)
print(" Connected!")

# ESP32 Pin assignment
i2c = I2C(0, scl=Pin(22), sda=Pin(21))

oled_width = 128
oled_height = 64
oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)

while True:
    # Update and display USD values
    update_display()

    # Delay for 12 hours (12 hours = 12 * 60 * 60 seconds)
    time.sleep(12 * 60 * 60)
