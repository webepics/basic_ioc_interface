# Basic IOC Interface

## Overview

This repository will be made up of three parts:

- ioc_to_websocket: maps IOCs to websockets to be read by client, and provides testing/debugging interface at :8080/epics2web
- test_iocs: testing IOCs made with python's caproto library

Before beginning, make sure you've installed and started Docker. For more information see the [docker docs](https://docs.docker.com/install/).

## ioc_to_websocket

To run the _ioc_to_websocket_ tomcat server, navigate to the _ioc_to_websocket_ folder, and build and run a docker container.

See steps below.

### Building

```bash 
docker build -t ioc_to_websocket --build-arg epic_ca_addr_list="<IOC IPs>" .
```

Note that `<IOC IPs>` must be replaced with actual IPs. Information about the formatting of this can be found [here](https://epics.anl.gov/base/R3-14/10-docs/CAref.html#EPICS).

If you'd like to connect to the test IOCs within the bridge network, you can put the broadcast address of the bridge network here, which by default should be `172.17.255.255`, or something similar.

If you're not sure what the broadcast address is, you can start an alpine terminal (``` docker run alpine ash ```) and check the output of `ifconfig`.

### Running

Simply run `docker run -p 8080:8080 ioc_to_websocket`.

If you wish to run a detached container, simply add the `-d` flag.

Note that the `-p 8080:8080` will bind the debug interface to `localhost:8080/epics2web`. If you do not wish to publish this interface, omit this argument.

## host_ioc_a and host_ioc_b

The _host_ioc_a_ and _host_ioc_b_ are practically identical, apart from containing different sample PVs.

_host_ioc_a_ contains the PVs `sample:a` and `sample:b`, whilst _host_ioc_b_ contains the PVs `sample:c` and `sample:d`.

To run these, navigate to their folders and build them with `docker build .`, and run with `docker run <container>` where `<containe>` is the name or id of the container you just build.

To specify a container name when building, use the `-t` flag, otherwise you can use the auto-generated id. 

## Testing

Once you have setup the _epics_to_web_ container, and at least one _host_ioc_, you will be able to test it. You can navigate to http://localhost:8080/epics2web/test-camonitor if you have bound the ports for _epics_to_web_, and test the connection using the PVs `sample:a`, `sample:b`, `sample:c`, or `sample:d`, depending on the IOCs you've configured.

If this does not connect, check that your `<IOC IPs>` is set correctly; it should be either the bridge broadcast address, or the specific address of an IOC. (You will likely need to use the internal container IP if you're using the containerized IOCs)

You should also check that the containers are on the correct network, by running `docker container inspect bridge`, and checking that the `Containers` key contains the correct amount of containers. If you've used a custom docker network configuration, just replace `bridge` with the name of your network.

## Use

After setting up and testing that everything works, you should be able to connect to the _epics2web_ web socket with no issues, at the host IP. For more information on how to use this, see the [_epics2web_ documentation](https://github.com/JeffersonLab/epics2web).