#!/usr/bin/env python3
import random
from caproto.server import pvproperty, PVGroup, ioc_arg_parser, run


class RandomWalkIOC(PVGroup):
    a = pvproperty(value=3.0)
    b = pvproperty(value=3.14159265358972 * 2)

    @a.startup
    async def a(self, instance, async_lib):
        'Periodically update the value'
        while True:
            # compute next value
            b = self.b.value + 2 * random.random() - 1

            # update the ChannelData instance and notify any subscribers
            await instance.write(value=b)

            # Let the async library wait for the next iteration
            await async_lib.library.sleep(self.a.value)


if __name__ == '__main__':
    ioc_options, run_options = ioc_arg_parser(
        default_prefix='sample:',
        desc='Run an IOC with a random-walking value.')
    ioc = RandomWalkIOC(**ioc_options)
    run(ioc.pvdb, **run_options)