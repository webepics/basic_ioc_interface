#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
from os import path

from setuptools import setup


BASE_DIR = path.dirname(path.abspath(__file__))

sys.path.insert(0, path.join(BASE_DIR, "src"))


setup()
