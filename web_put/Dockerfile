FROM python


# Install required python packages
RUN python -m venv /opt/venv
RUN /opt/venv/bin/python -m pip install --force --upgrade pip
RUN /opt/venv/bin/python -m pip install --force --upgrade setuptools
RUN /opt/venv/bin/python -m pip install tox
ADD . /opt/project
RUN /opt/venv/bin/python -m pip install /opt/project


# Entrypoint
WORKDIR /opt/project
EXPOSE 8081
ENV FLASK_APP=src/webput/app.py
ENV FLASK_ENV=development
ENTRYPOINT ["/opt/venv/bin/flask"]
CMD ["run", "--host=0.0.0.0", "--port=8081"]
