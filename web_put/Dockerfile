FROM python

RUN pip install -U "caproto[complete]"
RUN pip install -U "bottle"

COPY put.py /

EXPOSE 8081:8081

CMD ["python", "put.py"]
