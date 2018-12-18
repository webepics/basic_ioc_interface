FROM tomcat:8-alpine

COPY lib/* /usr/local/tomcat/lib/
COPY epics2web.war /usr/local/tomcat/webapps/epics2web.war

ARG epic_ca_addr_list
ENV EPICS_CA_ADDR_LIST=$epic_ca_addr_list

EXPOSE 8080:8080

CMD ["catalina.sh", "run"]
