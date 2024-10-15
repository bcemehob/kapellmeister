import localAddress from "@/../src-backend/NetworkUtil"

jest.mock('os', () => ({
    networkInterfaces: jest.fn().mockImplementation(() => {
        return mockedInterfaces.current
    })
}))

afterEach(() => {
    jest.clearAllMocks()
});

const mockedInterfaces = {current: null}

describe("test", () => {
    it('should find first address (windows + wifi + ethernet) #1', () => {
        mockedInterfaces.current = mockedInterfaces_win1WithEthernet
        expect(localAddress()).toBe("192.168.8.156")
    })

    it('should find first address (windows + wifi only) #2', () => {
        mockedInterfaces.current = mockedInterfaces_win2OnlyWifi
        expect(localAddress()).toBe("192.168.8.185")
    })

    it('should find first address (windows + wifi + ethernet) #3', () => {
        mockedInterfaces.current = mockedInterfaces_win3WithEthernet
        expect(localAddress()).toBe("172.20.224.1")
    })

    it('should find first address (macos + wifi) #4', () => {
        mockedInterfaces.current = mockedInterfaces_mac4
        expect(localAddress()).toBe("192.168.0.107")
    })

    it('cannot find address - empty interfaces object', () => {
        mockedInterfaces.current = mockedInterfaces_empty
        expect(() => localAddress())
            .toThrow("Not found local ip for incoming connections. Check your network preferences")
    })

})

const mockedInterfaces_win1WithEthernet = {
    'Ethernet 5': [
        {
            address: '50b2:2dc9:42b8:ec58:ebaa:e871:ac37:c8b0',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: 'a4:57:32:8e:07:1d',
            internal: false,
            cidr: 'fd74:ae1:25b8:b400:3ced:d4b6:a5fa:7712/64',
            scopeid: 0
        },
        {
            address: '50b2:2dc9:42b8:ec58:ebaa:e871:ac37:c8b0',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: 'a4:57:32:8e:07:1d',
            internal: false,
            cidr: 'fd74:ae1:25b8:b400:c547:b020:e4d:6bb/128',
            scopeid: 0
        },
        {
            address: 'fe80::6d39:15f4:ed4:5f74',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: 'a4:57:32:8e:07:1d',
            internal: false,
            cidr: 'fe80::6d39:15f4:ed4:5f74/64',
            scopeid: 15
        },
        {
            address: '192.168.8.156',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: 'a4:57:32:8e:07:1d',
            internal: false,
            cidr: '192.168.8.156/24'
        }
    ],
    'X-AIR': [
        {
            address: '169.254.126.117',
            netmask: '255.255.0.0',
            family: 'IPv4',
            mac: '9e:b2:38:0d:21:77',
            internal: false,
            cidr: '169.254.126.117/16'
        }
    ],
    'Loopback Pseudo-Interface 1': [
        {
            address: '::1',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '::1/128',
            scopeid: 0
        },
        {
            address: '127.0.0.1',
            netmask: '255.0.0.0',
            family: 'IPv4',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '127.0.0.1/8'
        }
    ]
}

const mockedInterfaces_win2OnlyWifi = {
    'Беспроводная сеть': [
        {
            address: 'fd74:ae1:25b8:b400:ce3:60e4:16f:735a',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '4a:d6:b5:af:bb:fb',
            internal: false,
            cidr: 'fd74:ae1:25b8:b400:ce3:60e4:16f:735a/64',
            scopeid: 0
        },
        {
            address: 'fd74:ae1:25b8:b400:5c2:1b4a:7e2:c22e',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: '4a:d6:b5:af:bb:fb',
            internal: false,
            cidr: 'fd74:ae1:25b8:b400:5c2:1b4a:7e2:c22e/128',
            scopeid: 0
        },
        {
            address: 'fe80::2418:3326:d62d:cb3',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '4a:d6:b5:af:bb:fb',
            internal: false,
            cidr: 'fe80::2418:3326:d62d:cb3/64',
            scopeid: 11
        },
        {
            address: '192.168.8.185',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: '4a:d6:b5:af:bb:fb',
            internal: false,
            cidr: '192.168.8.185/24'
        }
    ],
    'Loopback Pseudo-Interface 1': [
        {
            address: '::1',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '::1/128',
            scopeid: 0
        },
        {
            address: '127.0.0.1',
            netmask: '255.0.0.0',
            family: 'IPv4',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '127.0.0.1/8'
        }
    ]
}

const mockedInterfaces_win3WithEthernet = {
    'vEthernet (Default Switch)': [
        {
            address: 'fe80::44bf:cfb6:52cf:bf6d',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:15:5d:01:b4:00',
            internal: false,
            cidr: 'fe80::44bf:cfb6:52cf:bf6d/64',
            scopeid: 29
        },
        {
            address: '172.20.224.1',
            netmask: '255.255.240.0',
            family: 'IPv4',
            mac: '87:13:5e:4b:37:9d',
            internal: false,
            cidr: '172.20.224.1/20'
        }
    ],
    Ethernet: [
        {
            address: 'fe80::91aa:e136:873a:1c74',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '94:9a:c2:05:22:eb',
            internal: false,
            cidr: 'fe80::91aa:e136:873a:1c74/64',
            scopeid: 13
        },
        {
            address: '192.168.0.111',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: '94:9a:c2:05:22:eb',
            internal: false,
            cidr: '192.168.0.111/24'
        }
    ],
    WiFi: [
        {
            address: 'fe80::dd24:720d:d54d:f4bc',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '87:f1:c1:cf:79:37',
            internal: false,
            cidr: 'fe80::dd24:720d:d54d:f4bc/64',
            scopeid: 27
        },
        {
            address: '192.168.0.104',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: '87:f1:c1:cf:79:37',
            internal: false,
            cidr: '192.168.0.104/24'
        }
    ],
    'Loopback Pseudo-Interface 1': [
        {
            address: '::1',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '::1/128',
            scopeid: 0
        },
        {
            address: '127.0.0.1',
            netmask: '255.0.0.0',
            family: 'IPv4',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '127.0.0.1/8'
        }
    ]
}

const mockedInterfaces_mac4 = {
    lo0: [
        {
            address: '127.0.0.1',
            netmask: '255.0.0.0',
            family: 'IPv4',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '127.0.0.1/8'
        },
        {
            address: '::1',
            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: '::1/128',
            scopeid: 0
        },
        {
            address: 'fe80::1',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: true,
            cidr: 'fe80::1/64',
            scopeid: 1
        }
    ],
    ap1: [
        {
            address: 'fe80::bcd0:74ff:fe61:90a5',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '6f:7b:d3:5f:c2:ae',
            internal: false,
            cidr: 'fe80::bcd0:74ff:fe61:90a5/64',
            scopeid: 14
        }
    ],
    en0: [
        {
            address: 'fe80::81:7408:f15a:3daa',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '6f:7b:d3:5f:c2:ae',
            internal: false,
            cidr: 'fe80::81:7408:f15a:3daa/64',
            scopeid: 15
        },
        {
            address: '192.168.0.107',
            netmask: '255.255.255.0',
            family: 'IPv4',
            mac: '6f:7b:d3:5f:c2:ae',
            internal: false,
            cidr: '192.168.0.107/24'
        }
    ],
    awdl0: [
        {
            address: 'fe80::c0c2:c5ff:fe15:6972',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '6f:7b:d3:5f:c2:ae',
            internal: false,
            cidr: 'fe80::c0c2:c5ff:fe15:6972/64',
            scopeid: 17
        }
    ],
    llw0: [
        {
            address: 'fe80::c0c2:c5ff:fe15:6972',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '6f:7b:d3:5f:c2:ae',
            internal: false,
            cidr: 'fe80::c0c2:c5ff:fe15:6972/64',
            scopeid: 18
        }
    ],
    utun0: [
        {
            address: 'fe80::5c8b:330:b388:3537',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: false,
            cidr: 'fe80::5c8b:330:b388:3537/64',
            scopeid: 19
        }
    ],
    utun1: [
        {
            address: 'fe80::e2ca:1f71:117f:fa77',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: false,
            cidr: 'fe80::e2ca:1f71:117f:fa77/64',
            scopeid: 20
        }
    ],
    utun2: [
        {
            address: 'fe80::597a:fbd2:83d1:c940',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: false,
            cidr: 'fe80::597a:fbd2:83d1:c940/64',
            scopeid: 21
        }
    ],
    utun3: [
        {
            address: 'fe80::ce81:b1c:bd2c:69e',
            netmask: 'ffff:ffff:ffff:ffff::',
            family: 'IPv6',
            mac: '00:00:00:00:00:00',
            internal: false,
            cidr: 'fe80::ce81:b1c:bd2c:69e/64',
            scopeid: 22
        }
    ]
}


const mockedInterfaces_empty = {}
