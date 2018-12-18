# Basic IOC Interface

## Overview

This repository will be made up of three parts:

- ioc_to_websocket: maps IOCs to websockets to be read by client, and provides testing/debugging interface at :8080/epics2web
- client: react project for reading and displaying from websockets
- test_iocs: testing IOCs made with python's caproto library



## ioc_to_websocket

To run the ioc_to_websocket tomcat server, simply build and run a docker container.

```bash 
docker build \
	-t ioc_to_websocket \
	--build-arg epic_ca_addr_list=<IOC IPs> \
	.
```

Note that `<IOC IPs>` must be replaced with actual IPs. Information about the formatting of this can be found [here](https://epics.anl.gov/base/R3-14/10-docs/CAref.html#EPICS).

``` bash
docker run -p 8080:8080 ioc_to_websocket
```

Note that the `-p 8080:8080` will bind the debug interface to `localhost:8080/epics2web`. If you do not wish to publish this interface, omit this argument.