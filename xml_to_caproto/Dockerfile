FROM python

RUN pip install -U "caproto[complete]"

COPY ioc.py /

EXPOSE 5064:5064

CMD ["python", "ioc.py", "--list-pvs"]