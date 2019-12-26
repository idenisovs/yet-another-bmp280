# Yet another BMP280.

Yet another [Bosch Sensortect BMP280 sensor](https://www.bosch-sensortec.com/products/environmental-sensors/pressure-sensors/pressure-sensors-bmp280-1.html) library for Node.js

This library uses [i2c-bus](https://www.npmjs.com/package/i2c-bus) which should provide access with [Node.js](https://nodejs.org/en/) on Linux boards like the Raspberry Pi, BeagleBone or Intel Edison.

This library is heavily inspired by **Ptax**'s [BMP 280 sensor library](https://www.npmjs.com/package/bmp280-sensor).

## Install

```bash
npm install @idenisovs/bmp280 --save
```

## Usage

### Simple

In this case you need to provide just _bus number_ and _address of the device_.

* Device address can be found by `i2cdetect -y 1` command, where `1` is number of I2C bus.

```javascript
const { BMP280 } = require('@idenisovs/bmp280');

(async () => {
    const bmp280 = new BMP280({
        bus: 1,
        address: 0x76
    });

    await bmp280.connect();

    const values = await bmp280.sensors();
    console.log(values);

    await bmp280.disconnect();
})();
```

Expected output:

```json
{ 
  "temperature": 22.81, 
  "pressure": 991.9874688444662 
}
```

If configuration is not provided, then library will use the configuration options from [official datasheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/environmental_sensors_2/pressure_sensors_1/bmp280/bst-bmp280-ds001.pdf), page **19** ("_Weather station_" use case):

```javascript
{
    mode: Mode.forced,
    filter: Filter.off,
    standby: Standby.SB_1000MS,
    oversampling: {
        temperature: Oversampling.x1,
        pressure: Oversampling.x1
    }
}
```
