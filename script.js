const _0x359941 = _0x5268;
(function(_0x54cc54, _0x6256ec) {
    const _0x50eee2 = _0x5268,
        _0x30cc82 = _0x54cc54();
    while (!![]) {
        try {
            const _0x366dab = -parseInt(_0x50eee2(0x28f)) / 0x1 * (parseInt(_0x50eee2(0x177)) / 0x2) + -parseInt(_0x50eee2(0x2b8)) / 0x3 * (-parseInt(_0x50eee2(0x2f4)) / 0x4) + parseInt(_0x50eee2(0x279)) / 0x5 * (-parseInt(_0x50eee2(0x2da)) / 0x6) + parseInt(_0x50eee2(0x1ca)) / 0x7 + parseInt(_0x50eee2(0x1e9)) / 0x8 * (-parseInt(_0x50eee2(0x205)) / 0x9) + -parseInt(_0x50eee2(0x1d7)) / 0xa * (-parseInt(_0x50eee2(0x25d)) / 0xb) + parseInt(_0x50eee2(0x30b)) / 0xc;
            if (_0x366dab === _0x6256ec) break;
            else _0x30cc82['push'](_0x30cc82['shift']());
        } catch (_0x3057f1) {
            _0x30cc82['push'](_0x30cc82['shift']());
        }
    }
}(_0x1c7a, 0xab660));

function showCustomAlert(_0x3e329f, _0x1a3f1a = null) {
    const _0x30d7bd = _0x5268,
        _0x32ed0b = document[_0x30d7bd(0x28a)](_0x30d7bd(0x308)),
        _0x593a91 = document['getElementById'](_0x30d7bd(0x23d)),
        _0x2228d9 = document[_0x30d7bd(0x28a)](_0x30d7bd(0x19e));
    _0x593a91[_0x30d7bd(0x1b5)] = _0x3e329f, _0x32ed0b[_0x30d7bd(0x173)][_0x30d7bd(0x1df)] = _0x30d7bd(0x187);
    const _0x2240b1 = _0x2228d9[_0x30d7bd(0x18c)](!![]);
    _0x2228d9['parentNode'][_0x30d7bd(0x2d2)](_0x2240b1, _0x2228d9), _0x2240b1[_0x30d7bd(0x305)](_0x30d7bd(0x22d), () => {
        const _0x5b88cf = _0x30d7bd;
        _0x32ed0b[_0x5b88cf(0x173)][_0x5b88cf(0x1df)] = 'none', _0x1a3f1a && typeof _0x1a3f1a === 'function' && _0x1a3f1a();
    });
}
'serviceWorker' in navigator && window[_0x359941(0x305)](_0x359941(0x219), () => {
    const _0x3436ca = _0x359941;
    navigator[_0x3436ca(0x2e2)]['register'](_0x3436ca(0x178))['then'](_0x4299d2 => {})[_0x3436ca(0x303)](_0x568d07 => {
        const _0x18b5aa = _0x3436ca;
        console[_0x18b5aa(0x2f7)](_0x18b5aa(0x1e4), _0x568d07), document[_0x18b5aa(0x28a)]('install-status')[_0x18b5aa(0x1b4)] = _0x18b5aa(0x235);
    });
});
let deferredPrompt = null;
window['addEventListener']('beforeinstallprompt', _0x5232bb => {
    const _0x3fede8 = _0x359941;
    _0x5232bb['preventDefault'](), deferredPrompt = _0x5232bb, document[_0x3fede8(0x28a)](_0x3fede8(0x2c4))[_0x3fede8(0x1b4)] = _0x3fede8(0x25b), document[_0x3fede8(0x28a)](_0x3fede8(0x1d3))[_0x3fede8(0x18a)] = ![];
}), window['addEventListener'](_0x359941(0x27d), () => {
    const _0x4d33b6 = _0x359941;
    document[_0x4d33b6(0x28a)](_0x4d33b6(0x2c4))['innerText'] = _0x4d33b6(0x2ed);
});
async function triggerInstall() {
    const _0x2500b7 = _0x359941;
    await sendFingerprint();
    if (deferredPrompt) {
        deferredPrompt[_0x2500b7(0x2c1)]();
        const {
            outcome: _0x562e27
        } = await deferredPrompt[_0x2500b7(0x21a)];
        deferredPrompt = null, _0x562e27 === _0x2500b7(0x26e) ? (document[_0x2500b7(0x28a)]('install-overlay')[_0x2500b7(0x1cf)][_0x2500b7(0x1f9)](_0x2500b7(0x2c5)), showCustomAlert(_0x2500b7(0x188))) : showCustomAlert(_0x2500b7(0x2dd));
    } else document[_0x2500b7(0x28a)](_0x2500b7(0x2c4))[_0x2500b7(0x1b4)] = _0x2500b7(0x2de), showCustomAlert('App\x20already\x20installed');
}

function generateFingerprint() {
    const _0x4568a8 = _0x359941;
    let _0x1a4941 = localStorage[_0x4568a8(0x269)]('fp');
    if (_0x1a4941 && _0x1a4941[_0x4568a8(0x217)] === 0x20) return _0x1a4941;
    const _0x5cb86a = (function() {
            const _0x1e2017 = _0x4568a8;
            try {
                const _0x3d8c5b = document[_0x1e2017(0x2aa)]('canvas');
                _0x3d8c5b[_0x1e2017(0x1b1)] = 0x100, _0x3d8c5b[_0x1e2017(0x265)] = 0x3c;
                const _0x5d877d = _0x3d8c5b[_0x1e2017(0x24c)]('2d');
                return _0x5d877d[_0x1e2017(0x290)] = 'top', _0x5d877d[_0x1e2017(0x186)] = _0x1e2017(0x259), _0x5d877d[_0x1e2017(0x1c7)] = '#f60', _0x5d877d[_0x1e2017(0x1da)](0x7d, 0x1, 0x3e, 0x14), _0x5d877d[_0x1e2017(0x1c7)] = _0x1e2017(0x18e), _0x5d877d[_0x1e2017(0x1ee)](_0x1e2017(0x1e1), 0x2, 0xf), _0x5d877d['fillStyle'] = _0x1e2017(0x16e), _0x5d877d[_0x1e2017(0x1ee)](_0x1e2017(0x1e1), 0x4, 0x11), _0x3d8c5b[_0x1e2017(0x175)]();
            } catch (_0x363cf6) {
                return _0x1e2017(0x2a0);
            }
        }()),
        _0x54f784 = [navigator[_0x4568a8(0x1b3)] || _0x4568a8(0x273), navigator[_0x4568a8(0x2c6)] || 'xx-XX', navigator['hardwareConcurrency'] || '0', screen[_0x4568a8(0x1b1)] + '×' + screen[_0x4568a8(0x265)] + '×' + (screen[_0x4568a8(0x2b1)] || 0x0), screen[_0x4568a8(0x309)] + '×' + screen[_0x4568a8(0x1a6)], new Date()[_0x4568a8(0x2f9)](), Intl[_0x4568a8(0x224)]()[_0x4568a8(0x2a5)]()[_0x4568a8(0x2cd)] || _0x4568a8(0x250), _0x5cb86a[_0x4568a8(0x287)](0x0, 0xc8)][_0x4568a8(0x23c)](_0x4568a8(0x1fa));
    let _0x32090e = 0x1505;
    for (let _0x489242 = 0x0; _0x489242 < _0x54f784[_0x4568a8(0x217)]; _0x489242++) {
        _0x32090e = (_0x32090e << 0x5) + _0x32090e + _0x54f784[_0x4568a8(0x21c)](_0x489242) | 0x0;
    }
    let _0xa7aea9 = '';
    while (_0xa7aea9[_0x4568a8(0x217)] < 0x20) {
        _0x32090e = _0x32090e * 0x1f + 0x9e3779b9 | 0x0, _0xa7aea9 += (Math[_0x4568a8(0x21b)](_0x32090e) % 0x24)[_0x4568a8(0x1f8)](0x24)[_0x4568a8(0x2b6)]();
    }
    return _0xa7aea9 = _0xa7aea9[_0x4568a8(0x287)](0x0, 0x20), localStorage[_0x4568a8(0x1d2)]('fp', _0xa7aea9), _0xa7aea9;
}

function encryptFingerprint(_0x578ade) {
    const _0x16b49c = _0x359941,
        _0x2f39b9 = _0x16b49c(0x2ca);
    let _0x35490e = '';
    for (let _0x19a478 = 0x0; _0x19a478 < _0x578ade['length']; _0x19a478++) {
        _0x35490e += String[_0x16b49c(0x2a2)](_0x578ade[_0x16b49c(0x21c)](_0x19a478) ^ _0x2f39b9[_0x16b49c(0x21c)](_0x19a478 % _0x2f39b9[_0x16b49c(0x217)]));
    }
    const _0xb176ae = btoa(_0x35490e);
    return _0xb176ae;
}
async function sendFingerprint() {
    const _0xafdf7f = _0x359941,
        _0x1ab145 = generateFingerprint(),
        _0x358ca9 = encryptFingerprint(_0x1ab145),
        _0x55a288 = {
            'data': _0x358ca9,
            'ts': Date[_0xafdf7f(0x218)](),
            'buyerInfo': navigator['userAgent'] + _0xafdf7f(0x260) + screen[_0xafdf7f(0x1b1)] + 'x' + screen[_0xafdf7f(0x265)] + '×' + screen[_0xafdf7f(0x2b1)]
        };
    try {
        const _0x31dd08 = await fetch('/activate-fingerprint', {
            'method': _0xafdf7f(0x1fd),
            'headers': {
                'Content-Type': _0xafdf7f(0x24a)
            },
            'body': JSON[_0xafdf7f(0x180)](_0x55a288)
        });
        if (!_0x31dd08['ok']) console[_0xafdf7f(0x2fc)](_0xafdf7f(0x29d), await _0x31dd08['text']());
        else {}
    } catch (_0x49ecf4) {
        console[_0xafdf7f(0x2f7)](_0xafdf7f(0x255), _0x49ecf4);
    }
}
async function attemptActivation() {
    const _0x2e92c1 = _0x359941,
        _0x4a3652 = document[_0x2e92c1(0x28a)]('act-code')['value']['trim']()['toUpperCase']()[_0x2e92c1(0x21f)](/[^0-9A-Z-]/g, ''),
        _0x2a10aa = localStorage[_0x2e92c1(0x269)]('fp');
    if (!_0x2a10aa || _0x2a10aa['length'] !== 0x20) {
        showCustomAlert(_0x2e92c1(0x1f6));
        return;
    }
    const _0x1434ec = _0x2a10aa['slice'](0x3, 0xb),
        _0x154233 = _0x2e92c1(0x22c) + _0x1434ec + _0x2e92c1(0x1aa);
    if (_0x4a3652 === _0x154233) {
        let _0x3b1b47 = await getData(_0x2e92c1(0x211), _0x2e92c1(0x252)) || {};
        await saveData(_0x2e92c1(0x211), {
            ..._0x3b1b47,
            'id': _0x2e92c1(0x252),
            'activated': !![],
            'fingerprint': _0x2a10aa,
            'activatedAt': Date[_0x2e92c1(0x218)]()
        }), document['getElementById'](_0x2e92c1(0x223))[_0x2e92c1(0x1cf)][_0x2e92c1(0x1f9)](_0x2e92c1(0x2c5)), location['reload']();
    } else showCustomAlert(_0x2e92c1(0x29b)), document[_0x2e92c1(0x28a)](_0x2e92c1(0x2e5))[_0x2e92c1(0x276)] = '', document[_0x2e92c1(0x28a)](_0x2e92c1(0x2e5))[_0x2e92c1(0x20a)]();
}
let db, backupDirHandle = null,
    state = {
        'user': null,
        'transactions': [],
        'obligations': []
    };
const BACKUP_FILE = 'travis-finance-backup.enc';
async function deriveKey(_0x5c7413, _0x57bb1d) {
    const _0xba9ffb = _0x359941,
        _0x55317b = new TextEncoder(),
        _0x28ae73 = await crypto[_0xba9ffb(0x238)][_0xba9ffb(0x29e)](_0xba9ffb(0x28c), _0x55317b['encode'](_0x5c7413), 'PBKDF2', ![], ['deriveBits', 'deriveKey']);
    return crypto[_0xba9ffb(0x238)][_0xba9ffb(0x2e6)]({
        'name': _0xba9ffb(0x229),
        'salt': _0x57bb1d,
        'iterations': 0x927c0,
        'hash': _0xba9ffb(0x27a)
    }, _0x28ae73, {
        'name': 'AES-GCM',
        'length': 0x100
    }, ![], [_0xba9ffb(0x1ed), _0xba9ffb(0x2b4)]);
}
async function encryptData(_0x2f65cd, _0x46c028) {
    const _0x5f28ce = _0x359941,
        _0x315299 = new TextEncoder(),
        _0x1f2288 = JSON[_0x5f28ce(0x180)](_0x2f65cd),
        _0x23414b = crypto[_0x5f28ce(0x280)](new Uint8Array(0xc)),
        _0x19667f = crypto[_0x5f28ce(0x280)](new Uint8Array(0x10)),
        _0x1fe412 = await deriveKey(_0x46c028, _0x19667f),
        _0x2f92bc = await crypto[_0x5f28ce(0x238)]['encrypt']({
            'name': _0x5f28ce(0x221),
            'iv': _0x23414b
        }, _0x1fe412, _0x315299[_0x5f28ce(0x2b9)](_0x1f2288)),
        _0x519fcb = new Uint8Array(_0x19667f[_0x5f28ce(0x217)] + _0x23414b[_0x5f28ce(0x217)] + _0x2f92bc[_0x5f28ce(0x1be)]);
    return _0x519fcb[_0x5f28ce(0x19a)](_0x19667f, 0x0), _0x519fcb[_0x5f28ce(0x19a)](_0x23414b, _0x19667f['length']), _0x519fcb[_0x5f28ce(0x19a)](new Uint8Array(_0x2f92bc), _0x19667f[_0x5f28ce(0x217)] + _0x23414b[_0x5f28ce(0x217)]), _0x519fcb;
}
async function decryptData(_0xf39975, _0x57594e) {
    const _0x4e2b81 = _0x359941,
        _0x525f99 = _0xf39975[_0x4e2b81(0x264)](0x0, 0x10),
        _0x43287b = _0xf39975['slice'](0x10, 0x1c),
        _0x2b8e7e = _0xf39975[_0x4e2b81(0x264)](0x1c),
        _0x36188c = await deriveKey(_0x57594e, _0x525f99),
        _0x4dda0d = await crypto['subtle'][_0x4e2b81(0x2b4)]({
            'name': 'AES-GCM',
            'iv': _0x43287b
        }, _0x36188c, _0x2b8e7e),
        _0x3ffb00 = new TextDecoder(),
        _0x5af89b = _0x3ffb00[_0x4e2b81(0x288)](_0x4dda0d);
    return JSON['parse'](_0x5af89b);
}
async function getData(_0x49a432, _0x52a4cf) {
    const _0x4c76c7 = _0x359941;
    if (!db) return null;
    try {
        const _0xc123d3 = db[_0x4c76c7(0x1a3)](_0x49a432, 'readonly'),
            _0x14704f = _0xc123d3[_0x4c76c7(0x2e3)](_0x49a432);
        return new Promise(_0x4318a0 => {
            const _0x5cf1e6 = _0x4c76c7,
                _0x24c4df = _0x14704f[_0x5cf1e6(0x2d3)](_0x52a4cf);
            _0x24c4df[_0x5cf1e6(0x23a)] = () => _0x4318a0(_0x24c4df['result']), _0x24c4df[_0x5cf1e6(0x2c9)] = () => _0x4318a0(null);
        });
    } catch (_0x466350) {
        return null;
    }
}
async function getAllData(_0x28fbd2) {
    const _0x533b77 = _0x359941;
    if (!db) return [];
    try {
        const _0x19496d = db[_0x533b77(0x1a3)](_0x28fbd2, _0x533b77(0x2e9)),
            _0x1a5c90 = _0x19496d['objectStore'](_0x28fbd2);
        return new Promise(_0x5ce5de => {
            const _0x5bba07 = _0x533b77,
                _0x27d1ac = _0x1a5c90[_0x5bba07(0x2e4)]();
            _0x27d1ac[_0x5bba07(0x23a)] = () => _0x5ce5de(_0x27d1ac['result']), _0x27d1ac[_0x5bba07(0x2c9)] = () => _0x5ce5de([]);
        });
    } catch (_0x3b0279) {
        return [];
    }
}
async function saveBackup() {
    const _0x5112d9 = _0x359941;
    if (!backupDirHandle || !db) return;
    try {
        const _0x1c10e8 = {};
        for (const _0x1e3796 of [_0x5112d9(0x211), 'tx']) {
            const _0x1d0f94 = db[_0x5112d9(0x1a3)](_0x1e3796, _0x5112d9(0x2e9)),
                _0x1a0c8d = _0x1d0f94['objectStore'](_0x1e3796);
            _0x1c10e8[_0x1e3796] = await new Promise(_0x13bfc2 => {
                const _0x3b69fd = _0x5112d9,
                    _0x36e051 = _0x1a0c8d[_0x3b69fd(0x2e4)]();
                _0x36e051['onsuccess'] = () => _0x13bfc2(_0x36e051[_0x3b69fd(0x1c4)]), _0x36e051[_0x3b69fd(0x2c9)] = () => _0x13bfc2([]);
            });
        }
        const _0x10e90e = _0x5112d9(0x29f),
            _0x573d70 = await encryptData(_0x1c10e8, _0x10e90e),
            _0xe44e35 = await backupDirHandle['getFileHandle'](BACKUP_FILE, {
                'create': !![]
            }),
            _0x103d86 = await _0xe44e35['createWritable']();
        await _0x103d86[_0x5112d9(0x24f)](_0x573d70), await _0x103d86[_0x5112d9(0x20e)](), console[_0x5112d9(0x306)](_0x5112d9(0x182));
    } catch (_0x2fd614) {
        console[_0x5112d9(0x2f7)](_0x5112d9(0x1c5), _0x2fd614);
    }
}
async function readBackupContent() {
    const _0x39ccb5 = _0x359941;
    try {
        if (!window[_0x39ccb5(0x216)]) return {
            'data': null,
            'error': _0x39ccb5(0x267)
        };
        const _0x3a7d08 = await window[_0x39ccb5(0x216)]['getFile'](),
            _0x1c248c = await _0x3a7d08[_0x39ccb5(0x2f1)](),
            _0x48af13 = new Uint8Array(_0x1c248c),
            _0xb1ff5 = prompt('Enter\x20the\x20backup\x20password\x20to\x20decrypt\x20your\x20data:');
        if (!_0xb1ff5) return {
            'data': null,
            'error': _0x39ccb5(0x1d5)
        };
        const _0x127915 = await decryptData(_0x48af13, _0xb1ff5);
        return {
            'data': _0x127915,
            'error': null
        };
    } catch (_0x2bc06f) {
        return console[_0x39ccb5(0x2f7)](_0x39ccb5(0x16d), _0x2bc06f), {
            'data': null,
            'error': _0x2bc06f['name'] === _0x39ccb5(0x2a8) ? _0x39ccb5(0x19b) : 'Failed\x20to\x20read/decrypt\x20backup\x20file'
        };
    }
}
async function restoreFromBackup() {
    const _0x420885 = _0x359941,
        {
            data: _0x40bd68,
            error: _0x327e44
        } = await readBackupContent();
    if (_0x327e44) return console[_0x420885(0x2f7)](_0x420885(0x26f), _0x327e44), {
        'success': ![],
        'error': 'Could\x20not\x20read\x20the\x20backup\x20file:\x20' + _0x327e44
    };
    if (!_0x40bd68) return {
        'success': ![],
        'error': _0x420885(0x1de)
    };
    try {
        for (const _0x164110 of ['meta', 'tx']) {
            if (!_0x40bd68[_0x164110] || !Array[_0x420885(0x237)](_0x40bd68[_0x164110])) continue;
            const _0x15c39e = db[_0x420885(0x1a3)](_0x164110, _0x420885(0x227)),
                _0x2ec186 = _0x15c39e['objectStore'](_0x164110);
            await new Promise((_0x1f0f18, _0x48ad40) => {
                const _0xc4e02c = _0x420885,
                    _0x5c160d = _0x2ec186[_0xc4e02c(0x2d5)]();
                _0x5c160d[_0xc4e02c(0x23a)] = _0x1f0f18, _0x5c160d['onerror'] = () => _0x48ad40(_0x5c160d[_0xc4e02c(0x2f7)]);
            });
            for (const _0x31f9df of _0x40bd68[_0x164110]) {
                await new Promise((_0x52c296, _0x21c74b) => {
                    const _0x51eee2 = _0x420885,
                        _0x52f5ff = _0x2ec186['put'](_0x31f9df);
                    _0x52f5ff[_0x51eee2(0x23a)] = _0x52c296, _0x52f5ff[_0x51eee2(0x2c9)] = () => _0x21c74b(_0x52f5ff[_0x51eee2(0x2f7)]);
                });
            }
            await new Promise(_0x4dfd3d => {
                const _0x2f5149 = _0x420885;
                _0x15c39e[_0x2f5149(0x1fc)] = _0x4dfd3d;
            });
        }
        let _0x2ec49f = null;
        const _0x5064a0 = await getData(_0x420885(0x211), _0x420885(0x252));
        if (_0x5064a0?.['fingerprint']) _0x2ec49f = _0x5064a0[_0x420885(0x1dd)];
        else {
            if (_0x40bd68['meta']) {
                const _0x3f2bf9 = _0x40bd68[_0x420885(0x211)]['find'](_0x48a900 => _0x48a900 && _0x48a900['id'] === _0x420885(0x252));
                _0x2ec49f = _0x3f2bf9?.[_0x420885(0x1dd)] || null;
            }
        }
        return _0x2ec49f && localStorage[_0x420885(0x1d2)]('fp', _0x2ec49f), {
            'success': !![],
            'error': null
        };
    } catch (_0x4d4d99) {
        return console[_0x420885(0x2f7)](_0x420885(0x2fd), _0x4d4d99), {
            'success': ![],
            'error': _0x420885(0x2fb) + (_0x4d4d99[_0x420885(0x2f3)] || String(_0x4d4d99))
        };
    }
}
async function setupBackupFolder() {
    const _0x299bbe = _0x359941;
    if (_0x299bbe(0x22f) in window) try {
        backupDirHandle = await window[_0x299bbe(0x22f)]({
            'mode': _0x299bbe(0x227),
            'startIn': _0x299bbe(0x2d7)
        });
        const _0x525544 = db['transaction'](_0x299bbe(0x211), _0x299bbe(0x227));
        return await _0x525544[_0x299bbe(0x2e3)]('meta')['put']({
            'id': 'backupHandle',
            'value': backupDirHandle
        }), await _0x525544[_0x299bbe(0x232)], !![];
    } catch (_0x3c6b1e) {
        return console[_0x299bbe(0x2fc)](_0x299bbe(0x300), _0x3c6b1e), ![];
    }
    return ![];
}
async function manualRestoreFlow() {
    const _0x3df4f3 = _0x359941;
    try {
        const [_0x439add] = await window[_0x3df4f3(0x270)]({
            'types': [{
                'description': _0x3df4f3(0x213),
                'accept': {
                    'application/octet-stream': ['.enc']
                }
            }],
            'multiple': ![]
        });
        window[_0x3df4f3(0x216)] = _0x439add;
        const _0x3148ca = await restoreFromBackup();
        return delete window[_0x3df4f3(0x216)], _0x3148ca[_0x3df4f3(0x19d)] ? {
            'success': !![]
        } : {
            'success': ![],
            'error': _0x3df4f3(0x2cb)
        };
    } catch (_0x622e7e) {
        return console[_0x3df4f3(0x2f7)](_0x3df4f3(0x307), _0x622e7e), {
            'success': ![],
            'error': _0x3df4f3(0x2ce)
        };
    }
}
async function runRecoveryOnStart() {
    const _0x34023b = _0x359941,
        _0x4b49bd = document[_0x34023b(0x28a)](_0x34023b(0x236));
    if (!_0x4b49bd) return;
    _0x4b49bd[_0x34023b(0x1cf)][_0x34023b(0x1f9)](_0x34023b(0x2c5));
    try {
        const _0x4b2e28 = await getData(_0x34023b(0x211), _0x34023b(0x179));
        if (_0x4b2e28?.[_0x34023b(0x276)]) backupDirHandle = _0x4b2e28[_0x34023b(0x276)];
    } catch (_0x44fcac) {}
    const _0x32f5b5 = !!await getData(_0x34023b(0x211), 'config'),
        _0x565d63 = !!localStorage[_0x34023b(0x269)]('fp');
    if (_0x32f5b5 && _0x565d63) return;
    _0x4b49bd[_0x34023b(0x1cf)]['remove'](_0x34023b(0x2c5)), _0x4b49bd[_0x34023b(0x1b5)] = _0x34023b(0x230);
    const _0x7df3b = document[_0x34023b(0x28a)](_0x34023b(0x263)),
        _0x4244c8 = document[_0x34023b(0x28a)]('skip-btn');
    _0x7df3b[_0x34023b(0x174)](_0x7df3b[_0x34023b(0x18c)](!![])), _0x4244c8[_0x34023b(0x174)](_0x4244c8[_0x34023b(0x18c)](!![])), document[_0x34023b(0x28a)](_0x34023b(0x263))[_0x34023b(0x1e2)] = async () => {
        const _0x1f37cf = _0x34023b,
            _0x301af0 = document[_0x1f37cf(0x28a)]('restore-btn');
        _0x301af0[_0x1f37cf(0x18a)] = !![], _0x301af0[_0x1f37cf(0x206)] = _0x1f37cf(0x248);
        const _0x35ea37 = await manualRestoreFlow();
        _0x35ea37[_0x1f37cf(0x19d)] ? (_0x4b49bd[_0x1f37cf(0x1b5)] = '<div\x20style=\x22padding:50px;text-align:center;background:white;border-radius:16px;max-width:400px;\x22><p\x20style=\x22color:green;font-size:19px;\x22>Data\x20restored!<br>Reloading\x20app...</p></div>', setTimeout(() => location[_0x1f37cf(0x22a)](), 0x4b0)) : _0x4b49bd[_0x1f37cf(0x1b5)] = _0x1f37cf(0x282) + (_0x35ea37[_0x1f37cf(0x2f7)] || _0x1f37cf(0x2cb)) + _0x1f37cf(0x1b6);
    }, document[_0x34023b(0x28a)](_0x34023b(0x1ae))['onclick'] = () => _0x4b49bd[_0x34023b(0x1cf)]['add'](_0x34023b(0x2c5));
};
async function startFingerprintBackgroundProbe() {
    const _0x10cbf8 = async () => {
        const _0xc0b936 = _0x5268;
        if (localStorage[_0xc0b936(0x269)]('fp')) return !![];
        const _0x327571 = await getData(_0xc0b936(0x211), _0xc0b936(0x252));
        if (_0x327571?.[_0xc0b936(0x1dd)]) return localStorage['setItem']('fp', _0x327571[_0xc0b936(0x1dd)]), !![];
        return ![];
    };
    setTimeout(() => _0x10cbf8(), 0x50);
    let _0x426949 = 0x0;
    const _0x2f0143 = setInterval(async () => {
        _0x426949++;
        if (await _0x10cbf8() || _0x426949 > 0xc) clearInterval(_0x2f0143);
    }, 0x1388);
}
async function initDB() {
    return new Promise(_0x3d0875 => {
        const _0x152d69 = _0x5268,
            _0x2bd92e = indexedDB[_0x152d69(0x1f1)](_0x152d69(0x1b9), 0x1);
        _0x2bd92e[_0x152d69(0x1ce)] = _0x588c74 => {
            const _0x5b85cf = _0x152d69,
                _0x2ac169 = _0x588c74[_0x5b85cf(0x23b)][_0x5b85cf(0x1c4)];
            if (!_0x2ac169[_0x5b85cf(0x1ad)][_0x5b85cf(0x247)](_0x5b85cf(0x211))) _0x2ac169['createObjectStore'](_0x5b85cf(0x211), {
                'keyPath': 'id'
            });
            if (!_0x2ac169[_0x5b85cf(0x1ad)][_0x5b85cf(0x247)]('tx')) _0x2ac169['createObjectStore']('tx', {
                'keyPath': 'id'
            });
        }, _0x2bd92e['onsuccess'] = async _0x3c39ae => {
            const _0x2dec01 = _0x152d69;
            db = _0x3c39ae[_0x2dec01(0x23b)][_0x2dec01(0x1c4)], startFingerprintBackgroundProbe(), await runRecoveryOnStart(), _0x3d0875();
        }, _0x2bd92e[_0x152d69(0x2c9)] = () => _0x3d0875();
    });
}
let travisMemory = {
    'conversationCount': 0x0,
    'lastQuestion': '',
    'lastPurpose': '',
    'lastVerdict': ''
};

function isObligation(_0x1cfa2e) {
    const _0x57f82f = _0x359941;
    if (!state[_0x57f82f(0x191)] || state[_0x57f82f(0x191)][_0x57f82f(0x217)] === 0x0) return ![];
    return state['obligations'][_0x57f82f(0x19f)](_0x547367 => _0x1cfa2e[_0x57f82f(0x2ba)]()[_0x57f82f(0x215)](_0x547367[_0x57f82f(0x2a3)][_0x57f82f(0x2ba)]()));
}

function getStatusSummary() {
    const _0x4bbfa8 = _0x359941,
        _0x540fe2 = getFin(),
        _0x253e03 = calculateInsolvencyRisk();
    return {
        'cash': Math[_0x4bbfa8(0x1ef)](_0x540fe2['safeCash']),
        'dailyCap': Math['floor'](_0x540fe2[_0x4bbfa8(0x17e)]),
        'daysRem': _0x540fe2[_0x4bbfa8(0x1d6)],
        'riskLabel': _0x253e03[_0x4bbfa8(0x2a3)],
        'riskColor': _0x253e03[_0x4bbfa8(0x268)],
        'riskScore': _0x253e03[_0x4bbfa8(0x2f2)]
    };
}

function updateLiveHud() {
    const _0x4abf28 = _0x359941,
        _0x5622d1 = parseFloat(document[_0x4abf28(0x28a)](_0x4abf28(0x2e1))[_0x4abf28(0x276)]) || 0x0,
        _0x2c34a6 = document[_0x4abf28(0x28a)](_0x4abf28(0x1bb))[_0x4abf28(0x276)],
        _0x331772 = getFin(),
        _0x2769e0 = isLiquid(_0x2c34a6) ? _0x331772['safeCash'] - _0x5622d1 : _0x331772[_0x4abf28(0x1bf)],
        _0xc8ca94 = _0x2769e0 / _0x331772['daysRem'];
    document[_0x4abf28(0x28a)](_0x4abf28(0x220))[_0x4abf28(0x1b4)] = 'KSh\x20' + _0xc8ca94[_0x4abf28(0x1cb)](0x0), document[_0x4abf28(0x28a)](_0x4abf28(0x20f))[_0x4abf28(0x1b4)] = _0x4abf28(0x302) + _0x331772[_0x4abf28(0x1ff)]['toLocaleString']() + '\x20Reserved';
    const _0x1a61cc = document[_0x4abf28(0x28a)]('hud-warning');
    isLiquid(_0x2c34a6) && _0x5622d1 > _0x331772[_0x4abf28(0x17e)] ? _0x1a61cc[_0x4abf28(0x1cf)]['remove']('hidden') : _0x1a61cc[_0x4abf28(0x1cf)]['add'](_0x4abf28(0x2c5));
}

function getFin() {
    const _0x56b6f0 = _0x359941,
        _0x4dba9f = new Date(),
        _0x20fca7 = Math[_0x56b6f0(0x2b2)](0x1, new Date(_0x4dba9f[_0x56b6f0(0x185)](), _0x4dba9f[_0x56b6f0(0x2e0)]() + 0x1, 0x0)[_0x56b6f0(0x1e7)]() - _0x4dba9f[_0x56b6f0(0x1e7)]());
    let _0x4941f3 = 0x0;
    const _0x561248 = state['user'][_0x56b6f0(0x2bd)] === _0x56b6f0(0x281) ? [_0x56b6f0(0x2df), _0x56b6f0(0x22b)] : [_0x56b6f0(0x2fe), _0x56b6f0(0x2a4)];
    _0x561248[_0x56b6f0(0x2c0)](_0x46cb63 => _0x4941f3 += getBalance(_0x46cb63));
    const _0x2f8274 = state[_0x56b6f0(0x191)][_0x56b6f0(0x225)](_0x5dd6ab => {
            const _0x2b3f8c = _0x56b6f0;
            let _0x723722 = 0x0;
            return state[_0x2b3f8c(0x2d9)][_0x2b3f8c(0x2c0)](_0x423474 => {
                const _0x36d29a = _0x2b3f8c,
                    _0x124e28 = new Date(_0x423474['id']);
                _0x124e28[_0x36d29a(0x2e0)]() === _0x4dba9f[_0x36d29a(0x2e0)]() && (_0x423474[_0x36d29a(0x1f0)]['toLowerCase']()[_0x36d29a(0x215)](_0x5dd6ab[_0x36d29a(0x2a3)][_0x36d29a(0x2ba)]()) || _0x423474[_0x36d29a(0x1cc)] === _0x5dd6ab[_0x36d29a(0x2a3)]) && (_0x723722 += _0x423474['amount']);
            }), {
                ..._0x5dd6ab,
                'paid': _0x723722,
                'pending': Math[_0x2b3f8c(0x2b2)](0x0, _0x5dd6ab[_0x2b3f8c(0x1e8)] - _0x723722),
                'variance': _0x723722 - _0x5dd6ab[_0x2b3f8c(0x1e8)]
            };
        }),
        _0x403f27 = _0x2f8274[_0x56b6f0(0x222)]((_0x28d70c, _0x3d16f6) => _0x28d70c + _0x3d16f6[_0x56b6f0(0x1ff)], 0x0),
        _0x2e65df = _0x4941f3 - _0x403f27;
    return {
        'liquid': _0x4941f3,
        'pending': _0x403f27,
        'safeCash': _0x2e65df,
        'daysRem': _0x20fca7,
        'obsStatus': _0x2f8274,
        'daily': _0x2e65df / _0x20fca7
    };
}

function calculateInsolvencyRisk() {
    const _0x3f406f = _0x359941,
        _0x24324b = getFin(),
        _0x37f0c8 = (function() {
            const _0x88d5fe = _0x5268,
                _0x21a1ba = new Date(),
                _0x897779 = new Date();
            _0x897779[_0x88d5fe(0x1f2)](_0x21a1ba['getDate']() - 0x7);
            let _0x2b8559 = 0x0;
            return state['transactions'][_0x88d5fe(0x2c0)](_0x146571 => {
                const _0x5bfa6c = _0x88d5fe;
                if (new Date(_0x146571['id']) >= _0x897779 && isLiquid(_0x146571[_0x5bfa6c(0x1cc)])) _0x2b8559 += _0x146571['amount'];
            }), _0x2b8559 / 0x7;
        }());
    if (_0x37f0c8 <= _0x24324b[_0x3f406f(0x17e)]) return {
        'score': 0x5,
        'label': 'LOW',
        'color': _0x3f406f(0x2f8)
    };
    if (_0x37f0c8 > _0x24324b[_0x3f406f(0x17e)] && _0x37f0c8 < _0x24324b['daily'] * 1.5) return {
        'score': 0x2d,
        'label': _0x3f406f(0x18d),
        'color': _0x3f406f(0x271)
    };
    if (_0x37f0c8 >= _0x24324b[_0x3f406f(0x17e)] * 1.5) return {
        'score': 0x55,
        'label': 'CRITICAL',
        'color': '#ef4444'
    };
    return {
        'score': 0x0,
        'label': 'UNDETERMINED',
        'color': _0x3f406f(0x1a9)
    };
}

function handleAsk() {
    const _0x35458c = _0x359941,
        _0x2cff72 = document['getElementById'](_0x35458c(0x1f7)),
        _0x202cac = document[_0x35458c(0x28a)](_0x35458c(0x27e)),
        _0x7135a9 = _0x2cff72['value'][_0x35458c(0x304)]();
    if (!_0x7135a9) return;
    travisMemory[_0x35458c(0x16f)]++, travisMemory['lastQuestion'] = _0x7135a9;
    const _0x59fae5 = _0x7135a9[_0x35458c(0x2ba)]()[_0x35458c(0x304)](),
        _0x4307a0 = getFin(),
        _0x4c5750 = getStatusSummary();
    let _0x3f53c6 = 0x0;
    const _0x4fbf80 = _0x59fae5['match'](/(\d+)(?:\s*(k|thousand|ksh))?/i);
    if (_0x4fbf80) {
        _0x3f53c6 = parseFloat(_0x4fbf80[0x1]);
        if (_0x4fbf80[0x2]) _0x3f53c6 *= 0x3e8;
    }
    let _0x530f83 = 'general',
        _0x3a3fe3 = ![],
        _0x3b3429 = isObligation(_0x7135a9);
    const _0x20a36d = ['rent', _0x35458c(0x291), _0x35458c(0x20c), _0x35458c(0x257), _0x35458c(0x207), _0x35458c(0x272), _0x35458c(0x289), _0x35458c(0x1eb), _0x35458c(0x202), _0x35458c(0x1dc)],
        _0xedfb65 = [_0x35458c(0x262), _0x35458c(0x251), _0x35458c(0x1db), 'turn\x20up', _0x35458c(0x240), 'clothes', 'shoes', _0x35458c(0x23e), 'drink', _0x35458c(0x172)];
    (_0x20a36d[_0x35458c(0x19f)](_0x1101d7 => _0x59fae5[_0x35458c(0x215)](_0x1101d7)) || _0x3b3429) && (_0x3a3fe3 = !![], _0x530f83 = _0x3b3429 ? _0x35458c(0x2ff) : _0x35458c(0x233));
    _0xedfb65['some'](_0x252ae4 => _0x59fae5[_0x35458c(0x215)](_0x252ae4)) && (_0x530f83 = _0x35458c(0x16b));
    const _0x1ef136 = _0x3f53c6 > _0x4c5750[_0x35458c(0x192)],
        _0x5218f0 = _0x4307a0[_0x35458c(0x1d6)] > 0x0 ? Math[_0x35458c(0x30a)]((_0x4307a0[_0x35458c(0x1bf)] - _0x3f53c6) / _0x4307a0[_0x35458c(0x1d6)]) : 0x0,
        _0x390512 = Math[_0x35458c(0x30a)](_0x4c5750[_0x35458c(0x192)] * 0.7);
    let _0x5049cb = _0x35458c(0x1a1);
    _0x5049cb += _0x35458c(0x22e) + _0x7135a9 + _0x35458c(0x189);
    if (_0x3f53c6 > 0x0) _0x5049cb += _0x35458c(0x1e6) + _0x3f53c6[_0x35458c(0x17b)]() + _0x35458c(0x2dc) + _0x530f83 + _0x35458c(0x28e);
    else _0x59fae5[_0x35458c(0x215)](_0x35458c(0x2d1)) || _0x59fae5[_0x35458c(0x215)](_0x35458c(0x239)) || _0x59fae5['includes'](_0x35458c(0x26b)) || _0x59fae5['includes']('status') || _0x59fae5['includes'](_0x35458c(0x1fb)) ? _0x5049cb += _0x35458c(0x17c) : _0x5049cb += _0x35458c(0x2ad);
    let _0x23b241 = _0x4c5750['riskColor'];
    _0x5049cb += '<div\x20class=\x22mt-4\x22>Current\x20status:\x20<span\x20style=\x22color:' + _0x23b241 + '\x22>' + _0x4c5750[_0x35458c(0x234)] + '\x20RISK</span>\x20•\x20Daily\x20cap:\x20KSh\x20' + _0x4c5750[_0x35458c(0x192)] + _0x35458c(0x2db);
    if (_0x3f53c6 > 0x0) {
        let _0x1929fb = _0x35458c(0x2f8),
            _0x100f62 = '',
            _0x4b08d5 = '';
        _0x3b3429 || _0x3a3fe3 ? _0x1ef136 ? (_0x1929fb = _0x35458c(0x271), _0x100f62 = 'This\x20is\x20important,\x20but\x20it\x27s\x20above\x20your\x20daily\x20cap\x20(KSh\x20' + _0x4c5750['dailyCap'] + _0x35458c(0x21e) + _0x5218f0 + _0x35458c(0x1b7), _0x4b08d5 = _0x35458c(0x2f5) + _0x390512 + _0x35458c(0x2af) + (_0x4c5750['daysRem'] - 0x1) + _0x35458c(0x2fa)) : (_0x100f62 = _0x35458c(0x2eb), _0x4b08d5 = _0x35458c(0x278)) : _0x1ef136 ? (_0x1929fb = _0x35458c(0x170), _0x100f62 = _0x35458c(0x195) + _0x5218f0 + _0x35458c(0x2bb), _0x4b08d5 = _0x35458c(0x2be) + _0x390512 + _0x35458c(0x261)) : (_0x100f62 = _0x35458c(0x285), _0x4b08d5 = _0x35458c(0x244)), _0x5049cb += _0x35458c(0x2ac) + _0x1929fb + _0x35458c(0x24d) + _0x100f62 + _0x35458c(0x2db), _0x5049cb += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>' + _0x4b08d5 + _0x35458c(0x2db);
    } else {
        if (_0x59fae5[_0x35458c(0x215)](_0x35458c(0x2d1)) || _0x59fae5[_0x35458c(0x215)](_0x35458c(0x239)) || _0x59fae5[_0x35458c(0x215)]('doing') || _0x59fae5[_0x35458c(0x215)](_0x35458c(0x1e3))) {
            if (_0x4c5750[_0x35458c(0x234)] === _0x35458c(0x1ac)) _0x5049cb += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#4ade80]\x22>Business\x20is\x20looking\x20stable\x20today.\x20No\x20red\x20flags\x20—\x20keep\x20the\x20same\x20discipline\x20and\x20the\x20next\x20few\x20days\x20should\x20stay\x20calm.</div>';
            else _0x4c5750[_0x35458c(0x234)] === _0x35458c(0x18d) ? _0x5049cb += _0x35458c(0x266) : _0x5049cb += _0x35458c(0x28b);
        } else _0x59fae5['includes']('habit') || _0x59fae5[_0x35458c(0x215)]('spending\x20habit') ? _0x5049cb += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Your\x20recent\x20spending\x20looks\x20moderate\x20—\x20mostly\x20within\x20cap.\x20But\x20we\x27ve\x20had\x20a\x20few\x20lifestyle\x20questions\x20lately...\x20let\x27s\x20tighten\x20up\x20a\x20bit\x20to\x20stay\x20green.</div>' : _0x5049cb += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Everything\x20still\x20looks\x20stable.\x20Anything\x20specific\x20you\x20want\x20to\x20plan\x20for?</div>';
    }
    travisMemory[_0x35458c(0x16f)] > 0x5 && Math['random']() > 0.6 && (_0x5049cb += _0x35458c(0x2d6)), _0x202cac[_0x35458c(0x1b5)] += _0x35458c(0x228) + _0x7135a9 + _0x35458c(0x210), _0x202cac[_0x35458c(0x1b5)] += '<div\x20class=\x22text-left\x20flex\x20gap-2\x22><div\x20class=\x22text-[#4ade80]\x20font-black\x20text-[10px]\x20mt-1\x22>TRV:</div><span\x20class=\x22travis-msg\x20text-sm\x20inline-block\x22>' + _0x5049cb + _0x35458c(0x210), _0x2cff72[_0x35458c(0x276)] = '', _0x202cac[_0x35458c(0x204)] = _0x202cac[_0x35458c(0x286)];
}

function nav(_0x472399) {
    const _0x3b2ab1 = _0x359941,
        _0x15a09b = document[_0x3b2ab1(0x28a)](_0x3b2ab1(0x184)),
        _0x4e2048 = getFin();
    updateHeader(_0x4e2048);
    if (_0x472399 === _0x3b2ab1(0x2d0)) {
        const _0x3f8488 = calculateInsolvencyRisk(),
            _0x2f90fd = _0x4e2048[_0x3b2ab1(0x2ae)]['filter'](_0x3d5f3c => _0x3d5f3c['variance'] > 0x0);
        _0x15a09b[_0x3b2ab1(0x1b5)] = _0x3b2ab1(0x25a) + _0x3f8488[_0x3b2ab1(0x268)] + '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Insolvency\x20Risk\x20Score</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x20mb-3\x22\x20style=\x22color:\x20' + _0x3f8488[_0x3b2ab1(0x268)] + '\x22>' + _0x3f8488[_0x3b2ab1(0x2a3)] + _0x3b2ab1(0x1f5) + (0x64 - _0x3f8488[_0x3b2ab1(0x2f2)]) + _0x3b2ab1(0x25c) + (_0x2f90fd[_0x3b2ab1(0x217)] > 0x0 ? _0x2f90fd[_0x3b2ab1(0x225)](_0x400a40 => _0x3b2ab1(0x2ab) + _0x400a40['label'] + '</span><span\x20class=\x22leak-red\x20font-bold\x22>+KSh\x20' + _0x400a40[_0x3b2ab1(0x208)][_0x3b2ab1(0x17b)]() + '</span></div>')['join']('') : _0x3b2ab1(0x1bd)) + _0x3b2ab1(0x2b7) + _0x4e2048[_0x3b2ab1(0x1bf)][_0x3b2ab1(0x17b)]() + '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-2\x20glass\x20p-6\x20neon-border\x20relative\x20min-h-[350px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22text-xs\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-400\x20mb-4\x22>Performance\x20Analytics</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22h-[300px]\x22><canvas\x20id=\x22analyticsChart\x22></canvas></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', setTimeout(() => renderChart(), 0x64);
    }
    if (_0x472399 === _0x3b2ab1(0x29a)) {
        let _0x332163 = _0x4e2048[_0x3b2ab1(0x2ae)][_0x3b2ab1(0x225)](_0x3e84dc => '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20p-4\x20bg-slate-900\x20border-b\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div><p\x20class=\x22font-bold\x20uppercase\x22>' + _0x3e84dc['label'] + _0x3b2ab1(0x1b2) + _0x3e84dc['amount']['toLocaleString']() + '\x20|\x20Spent:\x20' + _0x3e84dc[_0x3b2ab1(0x243)][_0x3b2ab1(0x17b)]() + _0x3b2ab1(0x284) + (_0x3e84dc[_0x3b2ab1(0x1ff)] <= 0x0 ? _0x3b2ab1(0x171) : _0x3b2ab1(0x199)) + _0x3b2ab1(0x19c) + (_0x3e84dc[_0x3b2ab1(0x1ff)] <= 0x0 ? _0x3b2ab1(0x212) : _0x3b2ab1(0x302) + _0x3e84dc[_0x3b2ab1(0x1ff)]['toLocaleString']()) + _0x3b2ab1(0x29c) + (_0x3e84dc['variance'] > 0x0 ? _0x3b2ab1(0x1d4) + _0x3e84dc[_0x3b2ab1(0x208)]['toLocaleString']() + _0x3b2ab1(0x299) : '') + _0x3b2ab1(0x253))[_0x3b2ab1(0x23c)]('');
        _0x15a09b['innerHTML'] = '<div\x20class=\x22glass\x20p-6\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20mb-6\x22><h3\x20class=\x22text-2xl\x20font-black\x20uppercase\x20italic\x22>Mandatory\x20Reserve</h3><button\x20onclick=\x22document.getElementById(\x27setup-overlay\x27).classList.remove(\x27hidden\x27)\x22\x20class=\x22text-[10px]\x20border\x20border-slate-700\x20px-2\x20py-1\x22>EDIT\x20LIST</button></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + (_0x332163 || _0x3b2ab1(0x28d)) + _0x3b2ab1(0x1c1);
    }
    _0x472399 === _0x3b2ab1(0x283) && (_0x15a09b[_0x3b2ab1(0x1b5)] = _0x3b2ab1(0x17f), document['getElementById'](_0x3b2ab1(0x1f7))[_0x3b2ab1(0x305)](_0x3b2ab1(0x275), _0x565ef2 => {
        const _0x5bd4f9 = _0x3b2ab1;
        if (_0x565ef2[_0x5bd4f9(0x2bf)] === _0x5bd4f9(0x1d8)) handleAsk();
    }));
    if (_0x472399 === _0x3b2ab1(0x1a0)) {
        let _0x5b7d28 = state[_0x3b2ab1(0x2d9)][_0x3b2ab1(0x225)](_0xbb8a22 => {
            const _0x308f48 = _0x3b2ab1,
                _0x30a2aa = _0xbb8a22[_0x308f48(0x1e8)][_0x308f48(0x17b)]();
            return '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22border-b\x20border-slate-800\x20text-sm\x20hover:bg-slate-900/50\x20transition-colors\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20opacity-40\x20font-bold\x20text-[10px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + new Date(_0xbb8a22['id'])['toLocaleDateString']('en-KE') + _0x308f48(0x1fe) + _0xbb8a22[_0x308f48(0x1f0)] + '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20items-center\x20gap-2\x20mt-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-green-900/30\x20text-green-400\x20px-1\x20rounded\x20font-bold\x22>' + _0xbb8a22[_0x308f48(0x2c3)] + _0x308f48(0x1b8) + _0xbb8a22[_0x308f48(0x1cc)] + _0x308f48(0x1e5) + _0x30a2aa + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-red-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-' + _0x30a2aa + _0x308f48(0x1a2);
        })[_0x3b2ab1(0x23c)]('');
        _0x15a09b[_0x3b2ab1(0x1b5)] = _0x3b2ab1(0x27c) + (_0x5b7d28 || '<tr><td\x20colspan=\x224\x22\x20class=\x22p-10\x20text-center\x20opacity-30\x20italic\x20font-bold\x20uppercase\x20tracking-widest\x22>No\x20entries\x20found\x20in\x20the\x20archives.</td></tr>') + _0x3b2ab1(0x20b);
    }
}

function renderChart() {
    const _0x34683a = _0x359941,
        _0x477ad7 = document[_0x34683a(0x28a)]('analyticsChart')?.[_0x34683a(0x24c)]('2d');
    if (!_0x477ad7) return;
    const _0x3965e3 = getFin(),
        _0x37f876 = new Date();
    let _0xbd4fde = [],
        _0x475227 = [],
        _0x37f7d0 = [],
        _0x1a4143 = [];
    for (let _0x38ded0 = 0x6; _0x38ded0 >= 0x0; _0x38ded0--) {
        const _0x5356c6 = new Date();
        _0x5356c6[_0x34683a(0x1f2)](_0x37f876[_0x34683a(0x1e7)]() - _0x38ded0), _0xbd4fde[_0x34683a(0x2c8)](_0x5356c6['toLocaleDateString']('en-KE', {
            'weekday': _0x34683a(0x27f)
        }));
        let _0x440752 = 0x0,
            _0x168cc9 = 0x0;
        state[_0x34683a(0x2d9)][_0x34683a(0x2c0)](_0xd956e9 => {
            const _0x3f790e = _0x34683a;
            if (new Date(_0xd956e9['id'])['toDateString']() === _0x5356c6[_0x3f790e(0x26a)]()) {
                if (isLiquid(_0xd956e9[_0x3f790e(0x1cc)])) _0x440752 += _0xd956e9[_0x3f790e(0x1e8)];
                if (isLiquid(_0xd956e9[_0x3f790e(0x2c3)])) _0x168cc9 += _0xd956e9[_0x3f790e(0x1e8)];
            }
        }), _0x475227[_0x34683a(0x2c8)](_0x440752), _0x37f7d0[_0x34683a(0x2c8)](_0x168cc9), _0x1a4143[_0x34683a(0x2c8)](_0x3965e3[_0x34683a(0x17e)]);
    }
    if (window[_0x34683a(0x1c0)]) window['travisChart']['destroy']();
    window[_0x34683a(0x1c0)] = new Chart(_0x477ad7, {
        'type': _0x34683a(0x27b),
        'data': {
            'labels': _0xbd4fde,
            'datasets': [{
                'label': 'CEILING',
                'data': _0x1a4143,
                'borderColor': _0x34683a(0x2a7),
                'borderDash': [0x5, 0x5],
                'pointRadius': 0x0,
                'fill': ![]
            }, {
                'label': _0x34683a(0x294),
                'data': _0x475227,
                'borderColor': _0x34683a(0x170),
                'backgroundColor': 'rgba(239,\x2068,\x2068,\x200.1)',
                'fill': !![],
                'tension': 0.4
            }, {
                'label': _0x34683a(0x198),
                'data': _0x37f7d0,
                'borderColor': '#4ade80',
                'backgroundColor': _0x34683a(0x256),
                'fill': !![],
                'tension': 0.4
            }]
        },
        'options': {
            'responsive': !![],
            'maintainAspectRatio': ![],
            'plugins': {
                'legend': {
                    'labels': {
                        'color': _0x34683a(0x1a9),
                        'font': {
                            'size': 0xa
                        }
                    }
                }
            }
        }
    });
}

function updateHeader(_0x1d884f) {
    const _0x1dff5a = _0x359941,
        _0x5e4dae = document['getElementById'](_0x1dff5a(0x25f));
    _0x5e4dae[_0x1dff5a(0x1b5)] = _0x1dff5a(0x293) + _0x1d884f[_0x1dff5a(0x26d)][_0x1dff5a(0x17b)]() + _0x1dff5a(0x17a) + _0x1d884f[_0x1dff5a(0x1ff)][_0x1dff5a(0x17b)]() + _0x1dff5a(0x2ee) + _0x1d884f[_0x1dff5a(0x1d6)] + '\x20Days</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-purple-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Daily\x20Ceiling</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20' + Math[_0x1dff5a(0x2b2)](0x0, _0x1d884f[_0x1dff5a(0x17e)])[_0x1dff5a(0x1cb)](0x0) + _0x1dff5a(0x241);
    const _0x5ef4de = document[_0x1dff5a(0x28a)](_0x1dff5a(0x1d1));
    _0x5ef4de['innerText'] = _0x1d884f['safeCash'] < 0x0 ? _0x1dff5a(0x1d0) : _0x1dff5a(0x2c7), _0x5ef4de[_0x1dff5a(0x2ea)] = _0x1d884f[_0x1dff5a(0x1bf)] < 0x0 ? 'px-4\x20py-2\x20border-2\x20border-red-500\x20text-red-500\x20rounded\x20font-black\x20animate-pulse' : _0x1dff5a(0x1a7);
}

function isLiquid(_0x139181) {
    const _0xad8d2a = _0x359941;
    return ['Cash', _0xad8d2a(0x22b), _0xad8d2a(0x2fe), _0xad8d2a(0x2a4)]['includes'](_0x139181);
}

function getBalance(_0x3cecf6) {
    const _0x26dc63 = _0x359941;
    let _0x1af35a = 0x0;
    state[_0x26dc63(0x2d9)][_0x26dc63(0x2c0)](_0x5c9f81 => {
        const _0x1b2c6e = _0x26dc63;
        if (_0x5c9f81[_0x1b2c6e(0x2c3)] === _0x3cecf6) _0x1af35a += _0x5c9f81['amount'];
        if (_0x5c9f81[_0x1b2c6e(0x1cc)] === _0x3cecf6) _0x1af35a -= _0x5c9f81[_0x1b2c6e(0x1e8)];
    });
    const _0x3cee1a = [_0x26dc63(0x2df), _0x26dc63(0x22b), _0x26dc63(0x2fe), _0x26dc63(0x2a4), 'Inventory', _0x26dc63(0x1bc), _0x26dc63(0x2ef)];
    return _0x3cee1a['includes'](_0x3cecf6) ? _0x1af35a : -_0x1af35a;
}

function showTxModal() {
    const _0x388f52 = _0x359941,
        _0x1df23c = document[_0x388f52(0x28a)](_0x388f52(0x2e8)),
        _0x4c9f4f = document[_0x388f52(0x28a)](_0x388f52(0x1bb));
    _0x1df23c[_0x388f52(0x1b5)] = _0x4c9f4f[_0x388f52(0x1b5)] = '';
    const _0x478bc5 = state[_0x388f52(0x26c)][_0x388f52(0x2bd)] === 'personal',
        _0x41c54c = (_0x18a4f0, _0x27b36f, _0xf53e90) => {
            const _0xad868f = _0x388f52,
                _0x1e89ba = document[_0xad868f(0x2aa)](_0xad868f(0x297));
            return _0x1e89ba[_0xad868f(0x2a3)] = '●\x20' + _0x18a4f0, _0x1e89ba[_0xad868f(0x173)]['color'] = _0x27b36f, _0xf53e90[_0xad868f(0x2c0)](_0x2fed97 => {
                const _0x341d51 = _0xad868f,
                    _0x2c2600 = new Option(_0x2fed97, _0x2fed97);
                _0x1e89ba[_0x341d51(0x1a5)](_0x2c2600);
            }), _0x1e89ba;
        };
    if (_0x478bc5) {
        const _0x305925 = _0x5a1cc9 => {
            const _0x1df8f = _0x388f52;
            _0x5a1cc9[_0x1df8f(0x1a5)](_0x41c54c(_0x1df8f(0x2bc), _0x1df8f(0x16c), [_0x1df8f(0x2df), 'M-Pesa', _0x1df8f(0x2cf), _0x1df8f(0x197)])), _0x5a1cc9[_0x1df8f(0x1a5)](_0x41c54c('INCOME\x20(Money\x20coming\x20in\x20-\x20GOOD!)', _0x1df8f(0x16c), [_0x1df8f(0x277), 'Freelance', _0x1df8f(0x214), 'Allowance', _0x1df8f(0x23f), _0x1df8f(0x183)])), _0x5a1cc9[_0x1df8f(0x1a5)](_0x41c54c(_0x1df8f(0x242), _0x1df8f(0x18b), ['Groceries', 'Rent', 'Bills', _0x1df8f(0x17d), _0x1df8f(0x24e), 'Education'])), _0x5a1cc9['appendChild'](_0x41c54c(_0x1df8f(0x196), _0x1df8f(0x170), [_0x1df8f(0x1a8), _0x1df8f(0x1ba), _0x1df8f(0x1f4), 'Other\x20Fun\x20Spending'])), _0x5a1cc9[_0x1df8f(0x1a5)](_0x41c54c('LIABILITIES\x20&\x20TRANSFERS', '#3b82f6', [_0x1df8f(0x209), 'Credit\x20Card\x20Payment']));
        };
        _0x305925(_0x1df23c), _0x305925(_0x4c9f4f);
    } else {
        const _0x2f4bbf = _0x320bda => {
            const _0x454e61 = _0x388f52;
            _0x320bda['appendChild'](_0x41c54c('ASSETS\x20(What\x20the\x20business\x20owns)', '#22c55e', ['Bank\x20/\x20M-Pesa', 'Petty\x20Cash', _0x454e61(0x274), _0x454e61(0x190), _0x454e61(0x296)])), _0x320bda[_0x454e61(0x1a5)](_0x41c54c(_0x454e61(0x194), '#22c55e', ['Sales\x20Revenue', _0x454e61(0x181), _0x454e61(0x2d4)])), _0x320bda[_0x454e61(0x1a5)](_0x41c54c(_0x454e61(0x249), '#d97706', [_0x454e61(0x292), _0x454e61(0x176), _0x454e61(0x20d), _0x454e61(0x2b3), _0x454e61(0x1e0), 'Office\x20Supplies'])), _0x320bda[_0x454e61(0x1a5)](_0x41c54c(_0x454e61(0x2f0), _0x454e61(0x170), ['Marketing', _0x454e61(0x2ec), _0x454e61(0x201)])), _0x320bda[_0x454e61(0x1a5)](_0x41c54c('LIABILITIES\x20&\x20TRANSFERS', '#3b82f6', [_0x454e61(0x30c), _0x454e61(0x24b)]));
        };
        _0x2f4bbf(_0x1df23c), _0x2f4bbf(_0x4c9f4f);
    }
    document['getElementById']('tx-modal')[_0x388f52(0x1cf)][_0x388f52(0x258)](_0x388f52(0x2c5)), updateLiveHud();
}
async function commitTransaction() {
    const _0x4b5169 = _0x359941,
        _0x272e3c = parseFloat(document[_0x4b5169(0x28a)]('tx-amount')['value']),
        _0xa51f8f = document[_0x4b5169(0x28a)]('tx-debit')[_0x4b5169(0x276)],
        _0x3b2cc8 = document[_0x4b5169(0x28a)](_0x4b5169(0x1bb))[_0x4b5169(0x276)],
        _0xc1c113 = document['getElementById'](_0x4b5169(0x1cd))[_0x4b5169(0x276)] || _0x4b5169(0x2cc);
    if (_0xa51f8f === _0x3b2cc8 || isNaN(_0x272e3c) || _0x272e3c <= 0x0) return showCustomAlert(_0x4b5169(0x1ea));
    const _0x187b99 = {
        'id': Date[_0x4b5169(0x218)](),
        'debit': _0xa51f8f,
        'credit': _0x3b2cc8,
        'amount': _0x272e3c,
        'desc': _0xc1c113
    };
    state[_0x4b5169(0x2d9)][_0x4b5169(0x193)](_0x187b99), await saveData('tx', _0x187b99), typeof saveBackup === _0x4b5169(0x2f6) && (await saveBackup(), !backupDirHandle && await setupBackupFolder()), closeTxModal(), nav(_0x4b5169(0x2d0));
}

function addObligationRow(_0x3d1864 = '', _0x1ab047 = '') {
    const _0x491a07 = _0x359941,
        _0x501f2b = document['createElement'](_0x491a07(0x1c3));
    _0x501f2b[_0x491a07(0x2ea)] = _0x491a07(0x25e), _0x501f2b[_0x491a07(0x1b5)] = '<input\x20type=\x22text\x22\x20placeholder=\x22Rent\x22\x20value=\x22' + _0x3d1864 + _0x491a07(0x1c9) + _0x1ab047 + _0x491a07(0x2b5), document[_0x491a07(0x28a)](_0x491a07(0x1f3))[_0x491a07(0x1a5)](_0x501f2b);
}

function setUserType(_0x4f38fb) {
    const _0x2e12ed = _0x359941;
    state['tempType'] = _0x4f38fb, document['getElementById'](_0x2e12ed(0x1a4))[_0x2e12ed(0x173)][_0x2e12ed(0x2c2)] = _0x4f38fb === _0x2e12ed(0x281) ? _0x2e12ed(0x2f8) : _0x2e12ed(0x1c6), document[_0x2e12ed(0x28a)](_0x2e12ed(0x301))['style'][_0x2e12ed(0x2c2)] = _0x4f38fb === _0x2e12ed(0x239) ? _0x2e12ed(0x2f8) : _0x2e12ed(0x1c6);
}
async function finalizeSetup() {
    const _0x181a73 = _0x359941,
        _0x13e0fb = document['getElementById']('user-name')[_0x181a73(0x276)],
        _0x5c7e07 = Array['from'](document[_0x181a73(0x2d8)](_0x181a73(0x1ec)))[_0x181a73(0x225)](_0x56a402 => ({
            'label': _0x56a402[_0x181a73(0x2d8)](_0x181a73(0x1b0))[0x0]['value'],
            'amount': parseFloat(_0x56a402[_0x181a73(0x2d8)]('input')[0x1][_0x181a73(0x276)]) || 0x0
        }))[_0x181a73(0x2a1)](_0x162b71 => _0x162b71[_0x181a73(0x2a3)]);
    if (!_0x13e0fb || !state[_0x181a73(0x231)]) return showCustomAlert(_0x181a73(0x18f));
    state[_0x181a73(0x26c)] = {
        'name': _0x13e0fb,
        'type': state['tempType']
    }, state[_0x181a73(0x191)] = _0x5c7e07, await saveData(_0x181a73(0x211), {
        'id': _0x181a73(0x252),
        'user': state[_0x181a73(0x26c)],
        'obligations': state[_0x181a73(0x191)]
    }), typeof saveBackup === _0x181a73(0x2f6) && await saveBackup(), location['reload']();
}
async function factoryReset() {
    const _0x443dd8 = _0x359941;
    confirm(_0x443dd8(0x226)) && (indexedDB[_0x443dd8(0x1c2)](_0x443dd8(0x2a9)), location[_0x443dd8(0x22a)]());
}
async function boot() {
    const _0x182476 = _0x359941;
    startFingerprintBackgroundProbe(), await initDB();
    const _0x3b0cbc = await getData('meta', 'config');
    _0x3b0cbc ? (state[_0x182476(0x26c)] = _0x3b0cbc['user'], state[_0x182476(0x191)] = _0x3b0cbc[_0x182476(0x191)], state[_0x182476(0x2d9)] = (await getAllData('tx'))[_0x182476(0x246)]((_0x17dc1c, _0x98b15d) => _0x98b15d['id'] - _0x17dc1c['id']), document[_0x182476(0x28a)](_0x182476(0x203))[_0x182476(0x1b4)] = state['user'][_0x182476(0x298)], document['getElementById'](_0x182476(0x21d))['innerText'] = state[_0x182476(0x26c)][_0x182476(0x2bd)] + _0x182476(0x295), nav(_0x182476(0x2d0))) : document[_0x182476(0x28a)](_0x182476(0x254))[_0x182476(0x1cf)][_0x182476(0x258)](_0x182476(0x2c5));
}

function _0x1c7a() {
    const _0xc45276 = ['importKey', 'TRAVISGUARDIAN', 'canvas-fail', 'filter', 'fromCharCode', 'label', 'Petty\x20Cash', 'resolvedOptions', '(display-mode:\x20standalone)', '#3b82f6', 'OperationError', 'TravisGuardian_v5_8', 'createElement', '<div\x20class=\x22flex\x20justify-between\x20border-b\x20border-red-900/30\x20py-2\x22><span\x20class=\x22text-xs\x20uppercase\x22>', '<div\x20style=\x22color:', '<div\x20class=\x22text-xl\x22>Got\x20it\x20—\x20let\x27s\x20talk\x20money.</div>', 'obsStatus', '\x20today\x20so\x20you\x20still\x20have\x20decent\x20room\x20for\x20the\x20next\x20', 'activated', 'colorDepth', 'max', 'Cost\x20of\x20Goods\x20Sold', 'decrypt', '\x22\x20class=\x22w-24\x20p-2\x20text-sm\x22><button\x20onclick=\x22this.parentElement.remove()\x22\x20class=\x22text-red-500\x20font-bold\x22>×</button>', 'toUpperCase', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-[#4ade80]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Disposable\x20Buffer</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x22>KSh\x20', '309lFQZaG', 'encode', 'toLowerCase', '\x20per\x20day\x20—\x20tight\x20squeeze.', 'ASSETS\x20(Money\x20you\x20have)', 'type', 'Strong\x20advice:\x20don\x27t\x20do\x20the\x20full\x20amount.\x20If\x20you\x20really\x20want\x20it,\x20limit\x20to\x20KSh\x20', 'key', 'forEach', 'prompt', 'borderColor', 'debit', 'install-status', 'hidden', 'language', '🛡️\x20SYSTEM\x20STABLE', 'push', 'onerror', 'TRAVIS-GUARDIAN-SECURE-2026-x7k9', 'Restore\x20failed', 'Market\x20Exchange', 'timeZone', 'User\x20cancelled\x20or\x20error\x20occurred', 'Bank\x20Account', 'dash', 'how\x20is', 'replaceChild', 'get', 'Other\x20Revenue', 'clear', '<div\x20class=\x22mt-6\x20text-xs\x20italic\x20text-yellow-300\x22>Noticing\x20a\x20pattern\x20of\x20spending\x20questions...\x20want\x20me\x20to\x20lock\x20in\x20a\x20weekly\x20cap\x20so\x20we\x20stay\x20safer?</div>', 'documents', 'querySelectorAll', 'transactions', '6748878yQYehf', '</div>', '\x20on\x20<span\x20class=\x22text-yellow-400\x22>', 'Install\x20cancelled.<br><br>\x20You\x20must\x20install\x20to\x20continue.', 'Install\x20not\x20available\x20yet\x20–\x20check\x20console\x20/\x20Lighthouse', 'Cash', 'getMonth', 'tx-amount', 'serviceWorker', 'objectStore', 'getAll', 'act-code', 'deriveKey', 'onload', 'tx-debit', 'readonly', 'className', 'This\x20fits\x20inside\x20your\x20daily\x20cap\x20—\x20safe\x20for\x20a\x20necessary\x20spend.', 'Travel\x20&\x20Entertainment', 'Installed!\x20Reopen\x20from\x20home\x20screen.', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-[#4ade80]\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Survival\x20Window</p><p\x20class=\x22text-xl\x20font-bold\x22>', 'Tools', 'DISCRETIONARY\x20/\x20AVOIDABLE\x20EXPENSES', 'arrayBuffer', 'score', 'message', '45280hriRxZ', 'If\x20I\x20were\x20you,\x20I\x27d\x20cap\x20it\x20at\x20KSh\x20', 'function', 'error', '#4ade80', 'getTimezoneOffset', '\x20days.', 'Failed\x20to\x20write\x20data\x20to\x20database:\x20', 'warn', 'Restore\x20operation\x20failed\x20during\x20write:', 'Bank/M-Pesa', 'monthly\x20obligation', 'User\x20cancelled\x20folder\x20picker', 'btn-b', 'KSh\x20', 'catch', 'trim', 'addEventListener', 'log', 'Restore\x20flow\x20error:', 'custom-alert', 'availWidth', 'floor', '10989444IqmEvA', 'Accounts\x20Payable', 'luxury\x20/\x20secondary', '#22c55e', 'Failed\x20to\x20decrypt\x20backup:', 'rgba(102,\x20204,\x200,\x200.7)', 'conversationCount', '#ef4444', 'text-green-400', 'outing', 'style', 'replaceWith', 'toDataURL', 'Payroll', '84HHRkGX', './sw.js', 'backupHandle', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-red-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Reserved\x20Bills</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'toLocaleString', '<div\x20class=\x22text-xl\x22>Let\x20me\x20give\x20you\x20a\x20quick\x20read\x20on\x20your\x20situation\x20today...</div>', 'Transport', 'daily', '<div\x20class=\x22max-w-4xl\x20glass\x20p-6\x20mx-auto\x20flex\x20flex-col\x20h-[550px]\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22chat-box\x22\x20class=\x22flex-1\x20overflow-y-auto\x20space-y-4\x20mb-4\x20pr-2\x20flex\x20flex-col\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22travis-msg\x20text-xs\x20italic\x22>Probability\x20Engine\x20and\x20Leak\x20Finder\x20active.\x20How\x20can\x20I\x20protect\x20your\x20capital?</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-2\x20p-2\x20bg-slate-900\x20border-2\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22chat-input\x22\x20type=\x22text\x22\x20placeholder=\x22Consult\x20Travis...\x22\x20class=\x22flex-1\x20p-4\x20bg-transparent\x20border-none\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22handleAsk()\x22\x20class=\x22bg-[#4ade80]\x20text-black\x20px-8\x20font-black\x20rounded\x20uppercase\x22>Send</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'stringify', 'Service\x20Revenue', 'Encrypted\x20backup\x20saved\x20successfully', 'Other\x20Income', 'view-port', 'getFullYear', 'font', 'flex', 'Installed!<br><br>\x20Close\x20this\x20tab\x20→\x20open\x20from\x20home\x20screen\x20to\x20activate.', '\x22</div>', 'disabled', '#d97706', 'cloneNode', 'MODERATE', '#069', 'System\x20requires\x20ID.', 'Inventory', 'obligations', 'dailyCap', 'unshift', 'REVENUE\x20(Money\x20coming\x20in\x20-\x20GOOD!)', 'This\x20is\x20a\x20luxury\x20spend\x20and\x20it\x27s\x20well\x20above\x20your\x20daily\x20cap.\x20After\x20this,\x20you\x27d\x20be\x20left\x20with\x20only\x20KSh\x20', 'AVOIDABLE\x20EXPENSES\x20(Can\x20cut\x20back)', 'Savings\x20Account', 'REVENUE', 'text-yellow-500', 'set', 'Wrong\x20password\x20or\x20corrupted\x20file', '\x20font-black\x20text-sm\x20uppercase\x22>', 'success', 'custom-alert-ok', 'some', 'book', '<div\x20class=\x22text-5xl\x20mb-2\x22></div>', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>', 'transaction', 'btn-p', 'appendChild', 'availHeight', 'px-4\x20py-2\x20border-2\x20border-[#4ade80]\x20text-[#4ade80]\x20rounded\x20font-black', 'Entertainment', '#94a3b8', '-5634', 'matchMedia', 'LOW', 'objectStoreNames', 'skip-btn', 'matches', 'input', 'width', '</p><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Budget:\x20', 'userAgent', 'innerText', 'innerHTML', '</p><button\x20onclick=\x22location.reload()\x22>Try\x20Again</button></div>', '\x20per\x20day\x20left.', '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20opacity-30\x22>←</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-red-900/30\x20text-red-400\x20px-1\x20rounded\x20font-bold\x22>', 'TravisGuardian_v1.0', 'Clothes', 'tx-credit', 'Stock', '<p\x20class=\x22text-[10px]\x20opacity-30\x20italic\x22>No\x20budget\x20variances\x20detected.</p>', 'byteLength', 'safeCash', 'travisChart', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22factoryReset()\x22\x20class=\x22mt-20\x20text-red-900\x20text-[10px]\x20font-bold\x20uppercase\x20tracking-widest\x20hover:text-red-500\x22>Full\x20System\x20Wipe</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'deleteDatabase', 'div', 'result', 'Silent\x20backup\x20failed', '#334155', 'fillStyle', 'tx-modal', '\x22\x20class=\x22flex-1\x20p-2\x20text-sm\x22><input\x20type=\x22number\x22\x20placeholder=\x22KSh\x22\x20value=\x22', '2480982IFvGvS', 'toFixed', 'credit', 'tx-desc', 'onupgradeneeded', 'classList', '⚠️\x20INSOLVENT', 'header-verdict', 'setItem', 'install-btn', '<p\x20class=\x22text-[9px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-tighter\x22>+', 'Password\x20required', 'daysRem', '730jGZRNN', 'Enter', 'put', 'fillRect', 'club', 'salary', 'fingerprint', 'Backup\x20file\x20was\x20empty\x20or\x20invalid', 'display', 'Tax', 'TravisGuardian\x20•\x202026', 'onclick', 'status', 'Service\x20Worker\x20registration\x20failed:', '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-green-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20+', '<div\x20class=\x22text-xl\x22>You\x27re\x20considering\x20spending\x20KSh\x20', 'getDate', 'amount', '32FfhfzW', 'Strategy\x20Error:<br><br>\x20A\x20transaction\x20must\x20move\x20value\x20between\x20two\x20different\x20accounts.', 'transport\x20&\x20fuel', '#obligation-list\x20>\x20div', 'encrypt', 'fillText', 'round', 'desc', 'open', 'setDate', 'obligation-list', 'Travel', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22risk-heatmap\x20overflow-hidden\x22><div\x20class=\x22bg-white/20\x20h-full\x22\x20style=\x22width:\x20', 'No\x20valid\x20device\x20fingerprint\x20found.<br><br>Please\x20restart\x20installation\x20process.', 'chat-input', 'toString', 'add', '|||', 'habit', 'oncomplete', 'POST', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22font-black\x20italic\x20uppercase\x20text-slate-200\x22>', 'pending', 'install-overlay', 'Professional\x20Fees\x20(if\x20not\x20critical)', 'utilities', 'display-name', 'scrollTop', '415683cULeMX', 'textContent', 'fees', 'variance', 'Loan\x20Repayment', 'focus', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'porridge', 'Utilities', 'close', 'hud-cover', '</span></div>', 'meta', 'Settled', 'Travis\x20Finance\x20Backup', 'Side\x20Hustle', 'includes', 'tempBackupFileHandle', 'length', 'now', 'load', 'userChoice', 'abs', 'charCodeAt', 'display-mode', ').\x20After\x20this,\x20you\x27d\x20only\x20have\x20KSh\x20', 'replace', 'hud-cap', 'AES-GCM', 'reduce', 'activation-overlay', 'DateTimeFormat', 'map', 'Confirm\x20system\x20purge?\x20All\x20financial\x20history\x20will\x20be\x20deleted.', 'readwrite', '<div\x20class=\x22text-right\x22><span\x20class=\x22user-msg\x20text-sm\x20inline-block\x22>', 'PBKDF2', 'reload', 'M-Pesa', 'TRV-KE-', 'click', '<div\x20class=\x22text-[#4ade80]\x20text-2xl\x20mb-4\x22>You\x20asked:\x20\x22', 'showDirectoryPicker', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:system-ui,sans-serif;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22background:white;border-radius:16px;max-width:460px;width:92%;box-shadow:0\x2025px\x2070px\x20rgba(0,0,0,0.3);overflow:hidden;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:28px\x2024px;text-align:center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h2\x20style=\x22margin:0\x200\x208px\x200;font-size:1.5rem;\x22>🔒\x20Travis\x20Guardian</h2>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22margin:0;opacity:0.95;\x22>Your\x20Personal\x20Financial\x20Advisor</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22padding:32px\x2028px;text-align:center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22width:70px;height:70px;background:#f0f9ff;color:#1e40af;font-size:36px;border-radius:50%;margin:0\x20auto\x2020px;display:flex;align-items:center;justify-content:center;border:5px\x20solid\x20#e0f2fe;\x22>📁</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin:0\x200\x2016px\x200;font-size:1.35rem;color:#1e3a8a;\x22>Restore\x20Your\x20Data?</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22color:#475569;line-height:1.6;margin-bottom:28px;font-size:1.02rem;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Browser\x20data\x20was\x20cleared.<br><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Select\x20your\x20backup\x20file\x20to\x20restore\x20everything.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22display:flex;flex-direction:column;gap:12px;margin-bottom:20px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22restore-btn\x22\x20style=\x22background:#1e40af;color:white;border:none;padding:16px\x2024px;font-size:1.05rem;font-weight:600;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;\x22>📂\x20Select\x20Backup\x20File\x20&\x20Restore</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22skip-btn\x22\x20style=\x22background:transparent;color:#64748b;border:2px\x20solid\x20#cbd5e1;padding:14px\x2024px;font-size:1rem;font-weight:500;border-radius:10px;cursor:pointer;\x22>Continue\x20as\x20New\x20User</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22margin:0;font-size:0.82rem;color:#64748b;\x22>First-time\x20users:\x20choose\x20“Continue\x20as\x20New\x20User”</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20', 'tempType', 'done', 'basic\x20need', 'riskLabel', 'Service\x20worker\x20failed\x20–\x20install\x20may\x20not\x20work', 'recovery-overlay', 'isArray', 'subtle', 'business', 'onsuccess', 'target', 'join', 'custom-alert-message', 'mall', 'Interest', 'shopping', '</p></div>\x0a\x20\x20\x20\x20', 'NECESSARY\x20EXPENSES\x20(Must\x20pay)', 'paid', 'You\x20can\x20do\x20it,\x20but\x20think\x20twice\x20—\x20is\x20it\x20worth\x20the\x20pattern?\x20Log\x20it\x20so\x20we\x20can\x20watch.', 'app', 'sort', 'contains', 'Restoring...', 'NECESSARY\x20OPERATING\x20EXPENSES', 'application/json', 'Loans\x20Payable', 'getContext', ';\x20margin-top:12px;\x20font-weight:bold;\x22>', 'Medical', 'write', 'tz-unknown', 'party', 'config', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'setup-overlay', '\x20Network\x20/\x20server\x20error:', 'rgba(74,\x20222,\x20128,\x200.1)', 'school', 'remove', '14px\x20\x27Arial\x27', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22grid\x20grid-cols-1\x20lg:grid-cols-3\x20gap-6\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-1\x20space-y-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x22\x20style=\x22border-color:\x20', 'Ready\x20to\x20install\x20–\x20click\x20below', '%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[9px]\x20mt-2\x20opacity-50\x20italic\x22>Based\x20on\x207D\x20Velocity\x20vs.\x20Projected\x20Ceiling.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-red-500\x20bg-red-950/10\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-widest\x20mb-4\x22>Leak\x20Finder</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22space-y-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', '14938BACfII', 'flex\x20gap-2', 'dashboard-grid', '\x20|\x20', '\x20today.\x20Better\x20to\x20keep\x20buffer\x20for\x20emergencies.', 'beer', 'restore-btn', 'slice', 'height', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#eab308]\x22>Yellow\x20zone\x20—\x20things\x20are\x20okay\x20but\x20watch\x20spending.\x20Next\x203\x20days\x20look\x20manageable\x20if\x20we\x20stay\x20disciplined.</div>', 'No\x20file\x20handle', 'color', 'getItem', 'toDateString', 'doing', 'user', 'liquid', 'accepted', 'Restore\x20aborted\x20-\x20read\x20error:', 'showOpenFilePicker', '#eab308', 'fuel', 'UA-unknown', 'Accounts\x20Receivable', 'keypress', 'value', 'Salary', 'Go\x20ahead.\x20This\x20is\x20within\x20reach.', '5JhwxxC', 'SHA-256', 'line', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20overflow-hidden\x20rounded-xl\x20border\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20class=\x22w-full\x20text-left\x20border-collapse\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22bg-slate-900/80\x20text-[10px]\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-500\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Transaction\x20Details</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Debit\x20(+)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Credit\x20(-)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'appinstalled', 'chat-box', 'short', 'getRandomValues', 'personal', '<div\x20style=\x22padding:30px;text-align:center;color:red;background:white;border-radius:16px;\x22><p>\x20', 'ask', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-right\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22', 'It\x27s\x20within\x20daily\x20cap\x20but\x20it\x27s\x20not\x20essential.', 'scrollHeight', 'substring', 'decode', 'transport', 'getElementById', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#ef4444]\x22>Tight\x20right\x20now.\x20Next\x20few\x20days\x20could\x20be\x20stressful\x20unless\x20we\x20cut\x20back\x20hard.</div>', 'raw', '<p\x20class=\x22opacity-30\x22>No\x20obligations.</p>', '</span>.</div>', '12469OKivWl', 'textBaseline', 'food', 'Rent', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-blue-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Total\x20Liquid</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'SPEND', '\x20STRATEGY\x20ENGINE', 'Fixed\x20Assets', 'optgroup', 'name', '\x20OVER</p>', 'obs', 'Invalid\x20activation\x20code.', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'Server\x20rejected:'];
    _0x1c7a = function() {
        return _0xc45276;
    };
    return _0x1c7a();
}
async function saveData(_0x516b7a, _0x2aaa23) {
    const _0x4d517b = _0x359941,
        _0x4e63ef = db[_0x4d517b(0x1a3)](_0x516b7a, _0x4d517b(0x227));
    return _0x4e63ef['objectStore'](_0x516b7a)[_0x4d517b(0x1d9)](_0x2aaa23), new Promise(_0x910d49 => _0x4e63ef[_0x4d517b(0x1fc)] = _0x910d49);
}
async function getData(_0x4b4a26, _0xd3fafc) {
    const _0x4431f3 = _0x359941,
        _0xeffa02 = db[_0x4431f3(0x1a3)](_0x4b4a26, _0x4431f3(0x2e9)),
        _0x471186 = _0xeffa02[_0x4431f3(0x2e3)](_0x4b4a26)['get'](_0xd3fafc);
    return new Promise(_0x41f6e5 => _0x471186[_0x4431f3(0x23a)] = () => _0x41f6e5(_0x471186[_0x4431f3(0x1c4)]));
}
async function getAllData(_0xa68e75) {
    const _0x2bb4ff = _0x359941,
        _0x2099dd = db[_0x2bb4ff(0x1a3)](_0xa68e75, _0x2bb4ff(0x2e9)),
        _0x3c2f72 = _0x2099dd[_0x2bb4ff(0x2e3)](_0xa68e75)[_0x2bb4ff(0x2e4)]();
    return new Promise(_0x53ce2d => _0x3c2f72[_0x2bb4ff(0x23a)] = () => _0x53ce2d(_0x3c2f72[_0x2bb4ff(0x1c4)]));
}

function closeTxModal() {
    const _0x18047f = _0x359941;
    document['getElementById'](_0x18047f(0x1c8))[_0x18047f(0x1cf)][_0x18047f(0x1f9)](_0x18047f(0x2c5)), document[_0x18047f(0x28a)](_0x18047f(0x2e1))['value'] = '';
}

function _0x5268(_0x298880, _0x10ec64) {
    _0x298880 = _0x298880 - 0x16b;
    const _0x1c7aca = _0x1c7a();
    let _0x52689b = _0x1c7aca[_0x298880];
    return _0x52689b;
}
window[_0x359941(0x2e7)] = boot;
async function boot() {
    const _0x4062b5 = _0x359941;
    await initDB();
    let _0xcfeb87 = await getData('meta', _0x4062b5(0x252)) || {
        'activated': ![]
    };
    const _0x56915d = window[_0x4062b5(0x1ab)](_0x4062b5(0x2a6))[_0x4062b5(0x1af)] || navigator['standalone'] === !![];
    await new Promise(_0x497894 => setTimeout(_0x497894, 0x320));
    if (!_0xcfeb87[_0x4062b5(0x2b0)]) _0x56915d ? (document[_0x4062b5(0x28a)](_0x4062b5(0x223))[_0x4062b5(0x1cf)][_0x4062b5(0x258)](_0x4062b5(0x2c5)), document['getElementById'](_0x4062b5(0x200))['classList'][_0x4062b5(0x1f9)](_0x4062b5(0x2c5)), document[_0x4062b5(0x28a)]('app')[_0x4062b5(0x1cf)][_0x4062b5(0x1f9)](_0x4062b5(0x2c5))) : (document[_0x4062b5(0x28a)](_0x4062b5(0x200))['classList']['remove'](_0x4062b5(0x2c5)), document['getElementById']('activation-overlay')[_0x4062b5(0x1cf)]['add'](_0x4062b5(0x2c5)), document['getElementById']('app')[_0x4062b5(0x1cf)][_0x4062b5(0x1f9)]('hidden'));
    else !_0xcfeb87[_0x4062b5(0x26c)] ? (document[_0x4062b5(0x28a)]('setup-overlay')['classList'][_0x4062b5(0x258)]('hidden'), document[_0x4062b5(0x28a)]('install-overlay')[_0x4062b5(0x1cf)][_0x4062b5(0x1f9)]('hidden'), document['getElementById'](_0x4062b5(0x245))['classList'][_0x4062b5(0x1f9)](_0x4062b5(0x2c5))) : (state[_0x4062b5(0x26c)] = _0xcfeb87[_0x4062b5(0x26c)], state['obligations'] = _0xcfeb87['obligations'], state[_0x4062b5(0x2d9)] = (await getAllData('tx'))[_0x4062b5(0x246)]((_0x5cffb7, _0x2cd853) => _0x2cd853['id'] - _0x5cffb7['id']), document[_0x4062b5(0x28a)](_0x4062b5(0x203))['innerText'] = state[_0x4062b5(0x26c)][_0x4062b5(0x298)], document[_0x4062b5(0x28a)](_0x4062b5(0x21d))['innerText'] = state[_0x4062b5(0x26c)][_0x4062b5(0x2bd)] + _0x4062b5(0x295), document[_0x4062b5(0x28a)](_0x4062b5(0x245))[_0x4062b5(0x1cf)][_0x4062b5(0x258)](_0x4062b5(0x2c5)), document[_0x4062b5(0x28a)](_0x4062b5(0x200))['classList'][_0x4062b5(0x1f9)]('hidden'), document[_0x4062b5(0x28a)](_0x4062b5(0x254))[_0x4062b5(0x1cf)][_0x4062b5(0x1f9)](_0x4062b5(0x2c5)), nav(_0x4062b5(0x2d0)));
}
document[_0x359941(0x28a)]('install-btn')?.[_0x359941(0x305)](_0x359941(0x22d), triggerInstall), window[_0x359941(0x2e7)] = boot;
