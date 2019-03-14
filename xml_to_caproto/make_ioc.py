import sys
import xml.etree.ElementTree as ElementTree
import re

if len(sys.argv) < 3:
    print('Two arguments expected')
    sys.exit(1)

pvset = ''
with open(sys.argv[1], 'w') as file:
    i = 0
    for f in sys.argv[2:]:
        with open(f) as xml:
            tree = ElementTree.parse(xml)

        root = tree.getroot()
        pCount = 36
        if 'paf' in f:
            cardCount = 1
        else:
            cardCount = 12

        for pv in root.iter('pv'):
            formattable = pv.text.replace('$(', '{').replace(')', '}:')
            thing = re.sub('(\$\(.*\))|:', '', pv.text)

            for p in range(pCount):
                for card in range(cardCount):
                    name = formattable.format(p='ak{:02d}'.format(p+1), card='card{:02d}'.format(card+1))
                    pvset += '\tpv_{}_{} = pvproperty(name="{}", value={})\n'.format(thing, 'p{:02d}_card{:02d}'.format(p + 1, card + 1), name, p + card)


    file.write('''#!/usr/bin/env python3
import random
from caproto.server import pvproperty, PVGroup, ioc_arg_parser, run

class {group}IOC(PVGroup):
    
{pvset}

if __name__ == '__main__':
    ioc_options, run_options = ioc_arg_parser(
        default_prefix="",
        desc='Run an IOC with a random-walking value.')
    ioc = {group}IOC(**ioc_options)
    run(ioc.pvdb, **run_options)
'''.format(group=root[0].attrib['name'].split(':')[0], pvset=pvset))
