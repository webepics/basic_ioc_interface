# Basic IOC Interface

Before beginning, make sure you've installed and started Docker. For more information see the [docker docs](https://docs.docker.com/install/).

## Deploy Docker Composition

Simply navigate to the root folder of this repository and use the command

```shell
docker-compose up --build
```

This will build and deploy the epics2web tomcat server, a simple http to caproto server, and a testing IOC.

Feel free to modify the docker-compose file to add/remove any required servers.

To change the `EPICS_CA_ADDR_LIST` variable, modify _docker-compose.yml_.

## Run React

To run react, simply navigate to the _react_client/_ folder and type `npm start`. This will start a hot-reloading development server and open `localhost:3000`. 

## ioc_to_websocket independently (optional)

To run the _ioc_to_websocket_ tomcat server independently, navigate to the _ioc_to_websocket_ folder, and build and run a docker container.

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

## Todo

- Integrate epics2web max-bytes argument into Docker Build step rather than use custom _epics2web.war_

- Give the option to use a custom network

- Add basic Authentication/Authorization in UI
- Add basic React Routing
- Parse JSON into React table widgets
- Figure out how to get control data through epics2web and handle that in client
- Add support for array PVs (e.g. waveforms)
- 