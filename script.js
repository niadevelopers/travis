const _0x3b7550 = _0x4a6e;
(function(_0x1b8dce, _0x3112c3) {
    const _0x13f224 = _0x4a6e,
        _0x53b49c = _0x1b8dce();
    while (!![]) {
        try {
            const _0x4e2351 = -parseInt(_0x13f224(0x31a)) / 0x1 * (-parseInt(_0x13f224(0x22f)) / 0x2) + parseInt(_0x13f224(0x296)) / 0x3 + parseInt(_0x13f224(0x2e6)) / 0x4 * (parseInt(_0x13f224(0x30f)) / 0x5) + parseInt(_0x13f224(0x2ac)) / 0x6 * (-parseInt(_0x13f224(0x1b5)) / 0x7) + parseInt(_0x13f224(0x222)) / 0x8 + -parseInt(_0x13f224(0x25e)) / 0x9 + -parseInt(_0x13f224(0x1af)) / 0xa * (parseInt(_0x13f224(0x2d1)) / 0xb);
            if (_0x4e2351 === _0x3112c3) break;
            else _0x53b49c['push'](_0x53b49c['shift']());
        } catch (_0x38b458) {
            _0x53b49c['push'](_0x53b49c['shift']());
        }
    }
}(_0x5582, 0xedd65));

function showCustomAlert(_0x566012, _0x10ea0d = null) {
    const _0x2af0a4 = _0x4a6e,
        _0x3639b4 = document['getElementById']('custom-alert'),
        _0x48e6bd = document['getElementById'](_0x2af0a4(0x1a2)),
        _0x3fb630 = document[_0x2af0a4(0x1aa)]('custom-alert-ok');
    _0x48e6bd['innerHTML'] = _0x566012, _0x3639b4[_0x2af0a4(0x28a)]['display'] = _0x2af0a4(0x2b7);
    const _0xfda373 = _0x3fb630[_0x2af0a4(0x2f5)](!![]);
    _0x3fb630[_0x2af0a4(0x1a6)][_0x2af0a4(0x339)](_0xfda373, _0x3fb630), _0xfda373[_0x2af0a4(0x249)](_0x2af0a4(0x330), () => {
        const _0x5b8c25 = _0x2af0a4;
        _0x3639b4[_0x5b8c25(0x28a)]['display'] = 'none', _0x10ea0d && typeof _0x10ea0d === 'function' && _0x10ea0d();
    });
}
_0x3b7550(0x2c2) in navigator && window['addEventListener'](_0x3b7550(0x22d), () => {
    const _0x40a278 = _0x3b7550;
    navigator[_0x40a278(0x2c2)][_0x40a278(0x34f)](_0x40a278(0x36a))['then'](_0x43e1b1 => {})[_0x40a278(0x28b)](_0x27050f => {
        const _0x407124 = _0x40a278;
        console[_0x407124(0x26c)]('Service\x20Worker\x20registration\x20failed:', _0x27050f), document[_0x407124(0x1aa)](_0x407124(0x1f5))[_0x407124(0x27a)] = 'Service\x20worker\x20failed\x20–\x20install\x20may\x20not\x20work';
    });
});
let deferredPrompt = null;
window[_0x3b7550(0x249)](_0x3b7550(0x332), _0x4e5358 => {
    const _0x4aab6a = _0x3b7550;
    _0x4e5358[_0x4aab6a(0x2f0)](), deferredPrompt = _0x4e5358, document[_0x4aab6a(0x1aa)](_0x4aab6a(0x1f5))[_0x4aab6a(0x27a)] = _0x4aab6a(0x323), document[_0x4aab6a(0x1aa)]('install-btn')[_0x4aab6a(0x1b1)] = ![];
}), window['addEventListener'](_0x3b7550(0x2c3), () => {
    const _0x33bab4 = _0x3b7550;
    document[_0x33bab4(0x1aa)](_0x33bab4(0x1f5))[_0x33bab4(0x27a)] = _0x33bab4(0x294);
});
async function triggerInstall() {
    const _0x3f1a4d = _0x3b7550;
    await sendFingerprint();
    if (deferredPrompt) {
        deferredPrompt['prompt']();
        const {
            outcome: _0x31e12b
        } = await deferredPrompt[_0x3f1a4d(0x1fc)];
        deferredPrompt = null, _0x31e12b === 'accepted' ? (document['getElementById'](_0x3f1a4d(0x2a3))[_0x3f1a4d(0x1d7)][_0x3f1a4d(0x31c)](_0x3f1a4d(0x2b3)), showCustomAlert(_0x3f1a4d(0x361))) : showCustomAlert(_0x3f1a4d(0x27f));
    } else document[_0x3f1a4d(0x1aa)](_0x3f1a4d(0x1f5))['innerText'] = 'Install\x20not\x20available\x20yet\x20–\x20check\x20console\x20/\x20Lighthouse', showCustomAlert(_0x3f1a4d(0x2a4));
}

function generateFingerprint() {
    const _0x13cb8e = _0x3b7550;
    let _0x54f301 = localStorage[_0x13cb8e(0x231)]('fp');
    if (_0x54f301 && _0x54f301['length'] === 0x20) return _0x54f301;
    const _0x51563f = (function() {
            const _0x26ec8b = _0x13cb8e;
            try {
                const _0x204041 = document[_0x26ec8b(0x2ae)](_0x26ec8b(0x1dd));
                _0x204041[_0x26ec8b(0x2d6)] = 0x100, _0x204041[_0x26ec8b(0x1d5)] = 0x3c;
                const _0x1f2303 = _0x204041[_0x26ec8b(0x272)]('2d');
                return _0x1f2303['textBaseline'] = _0x26ec8b(0x2fd), _0x1f2303['font'] = _0x26ec8b(0x2a0), _0x1f2303[_0x26ec8b(0x31f)] = _0x26ec8b(0x1cf), _0x1f2303[_0x26ec8b(0x2eb)](0x7d, 0x1, 0x3e, 0x14), _0x1f2303[_0x26ec8b(0x31f)] = _0x26ec8b(0x226), _0x1f2303[_0x26ec8b(0x252)]('TravisGuardian\x20•\x202026', 0x2, 0xf), _0x1f2303[_0x26ec8b(0x31f)] = _0x26ec8b(0x340), _0x1f2303['fillText'](_0x26ec8b(0x298), 0x4, 0x11), _0x204041[_0x26ec8b(0x304)]();
            } catch (_0x440e59) {
                return _0x26ec8b(0x322);
            }
        }()),
        _0x12f4c1 = [navigator[_0x13cb8e(0x27e)] || _0x13cb8e(0x24a), navigator[_0x13cb8e(0x1bb)] || _0x13cb8e(0x23a), navigator[_0x13cb8e(0x319)] || '0', screen[_0x13cb8e(0x2d6)] + '×' + screen[_0x13cb8e(0x1d5)] + '×' + (screen[_0x13cb8e(0x1d4)] || 0x0), screen[_0x13cb8e(0x32e)] + '×' + screen[_0x13cb8e(0x30a)], new Date()['getTimezoneOffset'](), Intl['DateTimeFormat']()[_0x13cb8e(0x1b6)]()[_0x13cb8e(0x1d0)] || _0x13cb8e(0x1e1), _0x51563f[_0x13cb8e(0x368)](0x0, 0xc8)][_0x13cb8e(0x1fd)](_0x13cb8e(0x277));
    let _0x3e7a45 = 0x1505;
    for (let _0x2e4e61 = 0x0; _0x2e4e61 < _0x12f4c1['length']; _0x2e4e61++) {
        _0x3e7a45 = (_0x3e7a45 << 0x5) + _0x3e7a45 + _0x12f4c1[_0x13cb8e(0x279)](_0x2e4e61) | 0x0;
    }
    let _0x4bd281 = '';
    while (_0x4bd281['length'] < 0x20) {
        _0x3e7a45 = _0x3e7a45 * 0x1f + 0x9e3779b9 | 0x0, _0x4bd281 += (Math['abs'](_0x3e7a45) % 0x24)[_0x13cb8e(0x2bc)](0x24)[_0x13cb8e(0x347)]();
    }
    return _0x4bd281 = _0x4bd281[_0x13cb8e(0x368)](0x0, 0x20), localStorage[_0x13cb8e(0x23c)]('fp', _0x4bd281), _0x4bd281;
}

function encryptFingerprint(_0x5e3fd2) {
    const _0xc8ecd2 = _0x3b7550,
        _0x4aa71f = 'TRAVIS-GUARDIAN-SECURE-2026-x7k9';
    let _0x2d2595 = '';
    for (let _0x15ca3f = 0x0; _0x15ca3f < _0x5e3fd2[_0xc8ecd2(0x21b)]; _0x15ca3f++) {
        _0x2d2595 += String[_0xc8ecd2(0x2a6)](_0x5e3fd2[_0xc8ecd2(0x279)](_0x15ca3f) ^ _0x4aa71f[_0xc8ecd2(0x279)](_0x15ca3f % _0x4aa71f[_0xc8ecd2(0x21b)]));
    }
    const _0x59c3ef = btoa(_0x2d2595);
    return _0x59c3ef;
}
async function sendFingerprint() {
    const _0x442df9 = _0x3b7550,
        _0x4fce2c = generateFingerprint(),
        _0x2f140f = encryptFingerprint(_0x4fce2c),
        _0x35bd6b = {
            'data': _0x2f140f,
            'ts': Date[_0x442df9(0x29a)](),
            'buyerInfo': navigator[_0x442df9(0x27e)] + _0x442df9(0x1e0) + screen[_0x442df9(0x2d6)] + 'x' + screen[_0x442df9(0x1d5)] + '×' + screen[_0x442df9(0x1d4)]
        };
    try {
        const _0x186497 = await fetch(_0x442df9(0x353), {
            'method': _0x442df9(0x232),
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON[_0x442df9(0x1ab)](_0x35bd6b)
        });
        if (!_0x186497['ok']) console['warn']('Server\x20rejected:', await _0x186497[_0x442df9(0x217)]());
        else {}
    } catch (_0x2a272f) {
        console['error'](_0x442df9(0x205), _0x2a272f);
    }
}
async function attemptActivation() {
    const _0x2ed2c5 = _0x3b7550,
        _0x1d586b = document['getElementById']('act-code')[_0x2ed2c5(0x34d)]['trim']()[_0x2ed2c5(0x347)]()['replace'](/[^0-9A-Z-]/g, ''),
        _0x5897a7 = localStorage[_0x2ed2c5(0x231)]('fp');
    if (!_0x5897a7 || _0x5897a7['length'] !== 0x20) {
        showCustomAlert(_0x2ed2c5(0x36d));
        return;
    }
    const _0x3d38f0 = _0x5897a7[_0x2ed2c5(0x306)](0x3, 0xb),
        _0x6c3f97 = 'TRV-KE-' + _0x3d38f0 + _0x2ed2c5(0x208);
    if (_0x1d586b === _0x6c3f97) {
        let _0x4b51b0 = await getData(_0x2ed2c5(0x1d6), _0x2ed2c5(0x26d)) || {};
        await saveData('meta', {
            ..._0x4b51b0,
            'id': 'config',
            'activated': !![],
            'fingerprint': _0x5897a7,
            'activatedAt': Date[_0x2ed2c5(0x29a)]()
        }), document['getElementById']('activation-overlay')[_0x2ed2c5(0x1d7)][_0x2ed2c5(0x31c)](_0x2ed2c5(0x2b3)), location[_0x2ed2c5(0x233)]();
    } else showCustomAlert(_0x2ed2c5(0x1ff)), document['getElementById'](_0x2ed2c5(0x1bf))[_0x2ed2c5(0x34d)] = '', document[_0x2ed2c5(0x1aa)](_0x2ed2c5(0x1bf))[_0x2ed2c5(0x2ed)]();
}

function _0x4a6e(_0x15d857, _0x33fa3f) {
    _0x15d857 = _0x15d857 - 0x1a1;
    const _0x55828e = _0x5582();
    let _0x4a6e17 = _0x55828e[_0x15d857];
    return _0x4a6e17;
}
let db, backupDirHandle = null,
    state = {
        'user': null,
        'transactions': [],
        'obligations': []
    };
const BACKUP_FILE = _0x3b7550(0x33d);
async function deriveKey(_0x9ac624, _0x464a4a) {
    const _0x4b2595 = _0x3b7550,
        _0x56a2b2 = new TextEncoder(),
        _0x4800f5 = await crypto[_0x4b2595(0x234)][_0x4b2595(0x220)](_0x4b2595(0x2dd), _0x56a2b2[_0x4b2595(0x2e2)](_0x9ac624), _0x4b2595(0x2c7), ![], ['deriveBits', _0x4b2595(0x310)]);
    return crypto[_0x4b2595(0x234)][_0x4b2595(0x310)]({
        'name': _0x4b2595(0x2c7),
        'salt': _0x464a4a,
        'iterations': 0x927c0,
        'hash': _0x4b2595(0x29e)
    }, _0x4800f5, {
        'name': _0x4b2595(0x1d9),
        'length': 0x100
    }, ![], [_0x4b2595(0x1df), _0x4b2595(0x1fe)]);
}
async function encryptData(_0x5062f0, _0x4aceea) {
    const _0x264da8 = _0x3b7550,
        _0x5c2011 = new TextEncoder(),
        _0x396c47 = JSON[_0x264da8(0x1ab)](_0x5062f0),
        _0x585ceb = crypto[_0x264da8(0x36b)](new Uint8Array(0xc)),
        _0x251c3e = crypto['getRandomValues'](new Uint8Array(0x10)),
        _0x19fef6 = await deriveKey(_0x4aceea, _0x251c3e),
        _0x78a8b2 = await crypto[_0x264da8(0x234)][_0x264da8(0x1df)]({
            'name': _0x264da8(0x1d9),
            'iv': _0x585ceb
        }, _0x19fef6, _0x5c2011[_0x264da8(0x2e2)](_0x396c47)),
        _0x5239c2 = new Uint8Array(_0x251c3e['length'] + _0x585ceb[_0x264da8(0x21b)] + _0x78a8b2[_0x264da8(0x336)]);
    return _0x5239c2[_0x264da8(0x1e9)](_0x251c3e, 0x0), _0x5239c2['set'](_0x585ceb, _0x251c3e[_0x264da8(0x21b)]), _0x5239c2[_0x264da8(0x1e9)](new Uint8Array(_0x78a8b2), _0x251c3e[_0x264da8(0x21b)] + _0x585ceb[_0x264da8(0x21b)]), _0x5239c2;
}
async function decryptData(_0x2c7988, _0x238f43) {
    const _0x31b4a6 = _0x3b7550,
        _0x28979a = _0x2c7988['slice'](0x0, 0x10),
        _0x1888fa = _0x2c7988[_0x31b4a6(0x306)](0x10, 0x1c),
        _0x4be49a = _0x2c7988[_0x31b4a6(0x306)](0x1c),
        _0x5a4a9b = await deriveKey(_0x238f43, _0x28979a),
        _0x11dfc2 = await crypto[_0x31b4a6(0x234)][_0x31b4a6(0x1fe)]({
            'name': _0x31b4a6(0x1d9),
            'iv': _0x1888fa
        }, _0x5a4a9b, _0x4be49a),
        _0x5eab88 = new TextDecoder(),
        _0x27d4ba = _0x5eab88[_0x31b4a6(0x2fc)](_0x11dfc2);
    return JSON[_0x31b4a6(0x24c)](_0x27d4ba);
}
async function getData(_0x3afc2a, _0x366b77) {
    const _0xf15175 = _0x3b7550;
    if (!db) return null;
    try {
        const _0x37698f = db[_0xf15175(0x206)](_0x3afc2a, _0xf15175(0x1ec)),
            _0x3b08ef = _0x37698f[_0xf15175(0x36e)](_0x3afc2a);
        return new Promise(_0x45c52c => {
            const _0x1f6fd7 = _0xf15175,
                _0x573ce9 = _0x3b08ef['get'](_0x366b77);
            _0x573ce9['onsuccess'] = () => _0x45c52c(_0x573ce9['result']), _0x573ce9[_0x1f6fd7(0x210)] = () => _0x45c52c(null);
        });
    } catch (_0x6b1716) {
        return null;
    }
}
async function getAllData(_0x350312) {
    const _0x2920f7 = _0x3b7550;
    if (!db) return [];
    try {
        const _0x152493 = db['transaction'](_0x350312, 'readonly'),
            _0xda784f = _0x152493[_0x2920f7(0x36e)](_0x350312);
        return new Promise(_0x267ebf => {
            const _0x1f33c3 = _0x2920f7,
                _0x4fd324 = _0xda784f[_0x1f33c3(0x28c)]();
            _0x4fd324[_0x1f33c3(0x1f7)] = () => _0x267ebf(_0x4fd324[_0x1f33c3(0x34b)]), _0x4fd324[_0x1f33c3(0x210)] = () => _0x267ebf([]);
        });
    } catch (_0x37c299) {
        return [];
    }
}
async function backupUIAssets() {
    const _0x120830 = _0x3b7550;
    if (!backupDirHandle) return;
    const _0x4e8d9a = [{
        'name': _0x120830(0x32f)
    }];
    for (const _0x44e5bc of _0x4e8d9a) {
        try {
            const _0x4fa6c9 = await fetch(_0x44e5bc['name']);
            if (!_0x4fa6c9['ok']) continue;
            const _0x260605 = await _0x4fa6c9[_0x120830(0x2ef)](),
                _0x9024f7 = await backupDirHandle['getFileHandle'](_0x44e5bc[_0x120830(0x274)], {
                    'create': !![]
                }),
                _0x160899 = await _0x9024f7['createWritable']();
            await _0x160899[_0x120830(0x2f1)](_0x260605), await _0x160899[_0x120830(0x253)]();
        } catch (_0x25bbb1) {
            console[_0x120830(0x2b6)](_0x120830(0x1eb) + _0x44e5bc[_0x120830(0x274)], _0x25bbb1);
        }
    }
}
async function rebuildUIFromDevice() {
    const _0x20297c = _0x3b7550;
    if (!backupDirHandle) return ![];
    try {
        const _0x589396 = [_0x20297c(0x2de), _0x20297c(0x250), _0x20297c(0x32f), _0x20297c(0x349), 'input-app.css'],
            _0xfe4ad4 = await caches[_0x20297c(0x30b)]('travis-ui-cache-v1');
        for (const _0xfc9fcd of _0x589396) {
            const _0x48503e = await backupDirHandle['getFileHandle'](_0xfc9fcd),
                _0x315635 = await _0x48503e[_0x20297c(0x26b)](),
                _0xd40a35 = await _0x315635[_0x20297c(0x333)]();
            await _0xfe4ad4[_0x20297c(0x2c0)]('/' + _0xfc9fcd, new Response(_0xd40a35, {
                'headers': {
                    'Content-Type': _0xfc9fcd[_0x20297c(0x1ac)]('.css') ? 'text/css' : _0xfc9fcd[_0x20297c(0x1ac)]('.js') ? _0x20297c(0x251) : 'text/html'
                }
            }));
        }
        return !![];
    } catch (_0x41af10) {
        return console['error']('UI\x20rebuild\x20failed', _0x41af10), ![];
    }
}
async function saveBackup() {
    const _0x4ca437 = _0x3b7550;
    if (!backupDirHandle || !db) return;
    try {
        const _0x4771fe = {};
        for (const _0x50eee5 of ['meta', 'tx']) {
            const _0x4998c3 = db[_0x4ca437(0x206)](_0x50eee5, _0x4ca437(0x1ec)),
                _0x33c5b3 = _0x4998c3[_0x4ca437(0x36e)](_0x50eee5);
            _0x4771fe[_0x50eee5] = await new Promise(_0x3c2727 => {
                const _0x1a46e8 = _0x4ca437,
                    _0x50f8d7 = _0x33c5b3[_0x1a46e8(0x28c)]();
                _0x50f8d7[_0x1a46e8(0x1f7)] = () => _0x3c2727(_0x50f8d7[_0x1a46e8(0x34b)]), _0x50f8d7[_0x1a46e8(0x210)] = () => _0x3c2727([]);
            });
        }
        const _0x3ba02b = _0x4ca437(0x20e),
            _0x53e5b5 = await encryptData(_0x4771fe, _0x3ba02b),
            _0x5ca956 = await backupDirHandle[_0x4ca437(0x366)](BACKUP_FILE, {
                'create': !![]
            }),
            _0x15215a = await _0x5ca956[_0x4ca437(0x1b7)]();
        await _0x15215a[_0x4ca437(0x2f1)](_0x53e5b5), await _0x15215a['close'](), console[_0x4ca437(0x224)](_0x4ca437(0x1c5));
    } catch (_0x3c057e) {
        console[_0x4ca437(0x26c)](_0x4ca437(0x36c), _0x3c057e);
    }
}
async function readBackupContent() {
    const _0x5503ec = _0x3b7550;
    try {
        if (!window[_0x5503ec(0x1d2)]) return {
            'data': null,
            'error': _0x5503ec(0x29c)
        };
        const _0x1a7a12 = await window[_0x5503ec(0x1d2)][_0x5503ec(0x26b)](),
            _0x5e0ea3 = await _0x1a7a12[_0x5503ec(0x333)](),
            _0x4eaa9a = new Uint8Array(_0x5e0ea3),
            _0x3fde04 = prompt('Enter\x20the\x20backup\x20password\x20to\x20decrypt\x20your\x20data:');
        if (!_0x3fde04) return {
            'data': null,
            'error': 'Password\x20required'
        };
        const _0x1b3d03 = await decryptData(_0x4eaa9a, _0x3fde04);
        return {
            'data': _0x1b3d03,
            'error': null
        };
    } catch (_0x2877de) {
        return console[_0x5503ec(0x26c)](_0x5503ec(0x235), _0x2877de), {
            'data': null,
            'error': _0x2877de[_0x5503ec(0x274)] === _0x5503ec(0x1ae) ? 'Wrong\x20password\x20or\x20corrupted\x20file' : _0x5503ec(0x1ef)
        };
    }
}
async function restoreFromBackup() {
    const _0x3ec14b = _0x3b7550,
        {
            data: _0x413e67,
            error: _0x17705a
        } = await readBackupContent();
    if (_0x17705a) return console['error'](_0x3ec14b(0x356), _0x17705a), {
        'success': ![],
        'error': 'Could\x20not\x20read\x20the\x20backup\x20file:\x20' + _0x17705a
    };
    if (!_0x413e67) return {
        'success': ![],
        'error': 'Backup\x20file\x20was\x20empty\x20or\x20invalid'
    };
    try {
        for (const _0x28e480 of [_0x3ec14b(0x1d6), 'tx']) {
            if (!_0x413e67[_0x28e480] || !Array[_0x3ec14b(0x343)](_0x413e67[_0x28e480])) continue;
            const _0x57515d = db[_0x3ec14b(0x206)](_0x28e480, _0x3ec14b(0x2a1)),
                _0x5ad1a3 = _0x57515d['objectStore'](_0x28e480);
            await new Promise((_0x1cbbc3, _0x5d7bd8) => {
                const _0x1e1a46 = _0x3ec14b,
                    _0x448f5d = _0x5ad1a3[_0x1e1a46(0x307)]();
                _0x448f5d[_0x1e1a46(0x1f7)] = _0x1cbbc3, _0x448f5d[_0x1e1a46(0x210)] = () => _0x5d7bd8(_0x448f5d[_0x1e1a46(0x26c)]);
            });
            for (const _0x29c8db of _0x413e67[_0x28e480]) {
                await new Promise((_0x21b805, _0x54666d) => {
                    const _0x4d0702 = _0x3ec14b,
                        _0x2ed47b = _0x5ad1a3[_0x4d0702(0x2c0)](_0x29c8db);
                    _0x2ed47b['onsuccess'] = _0x21b805, _0x2ed47b['onerror'] = () => _0x54666d(_0x2ed47b[_0x4d0702(0x26c)]);
                });
            }
            await new Promise(_0x306b9a => {
                _0x57515d['oncomplete'] = _0x306b9a;
            });
        }
        let _0x451443 = null;
        const _0x192d3c = await getData('meta', _0x3ec14b(0x26d));
        if (_0x192d3c?.[_0x3ec14b(0x287)]) _0x451443 = _0x192d3c[_0x3ec14b(0x287)];
        else {
            if (_0x413e67[_0x3ec14b(0x1d6)]) {
                const _0x312a11 = _0x413e67[_0x3ec14b(0x1d6)]['find'](_0x10afa9 => _0x10afa9 && _0x10afa9['id'] === _0x3ec14b(0x26d));
                _0x451443 = _0x312a11?.['fingerprint'] || null;
            }
        }
        return _0x451443 && localStorage[_0x3ec14b(0x23c)]('fp', _0x451443), {
            'success': !![],
            'error': null
        };
    } catch (_0x998ba9) {
        return console[_0x3ec14b(0x26c)](_0x3ec14b(0x21f), _0x998ba9), {
            'success': ![],
            'error': _0x3ec14b(0x33e) + (_0x998ba9[_0x3ec14b(0x241)] || String(_0x998ba9))
        };
    }
}
async function setupBackupFolder() {
    const _0x3d7ca3 = _0x3b7550;
    if ('showDirectoryPicker' in window) try {
        backupDirHandle = await window[_0x3d7ca3(0x2cc)]({
            'mode': _0x3d7ca3(0x2a1),
            'startIn': _0x3d7ca3(0x29b)
        });
        const _0x12e122 = db[_0x3d7ca3(0x206)](_0x3d7ca3(0x1d6), _0x3d7ca3(0x2a1));
        return await _0x12e122['objectStore'](_0x3d7ca3(0x1d6))['put']({
            'id': 'backupHandle',
            'value': backupDirHandle
        }), await _0x12e122[_0x3d7ca3(0x25d)], console['log'](_0x3d7ca3(0x1e5)), await backupUIAssets(), !![];
    } catch (_0x5a92c0) {
        return console['warn'](_0x3d7ca3(0x2cd), _0x5a92c0), ![];
    }
    return console[_0x3d7ca3(0x224)](_0x3d7ca3(0x2ee)), ![];
}
async function manualRestoreFlow() {
    const _0x4a8f4e = _0x3b7550;
    try {
        let _0x26f23d;
        if ('showOpenFilePicker' in window) {
            const [_0x3a7816] = await window[_0x4a8f4e(0x2d5)]({
                'types': [{
                    'description': _0x4a8f4e(0x22c),
                    'accept': {
                        'application/octet-stream': ['.enc']
                    }
                }],
                'multiple': ![]
            });
            _0x26f23d = _0x3a7816;
        } else return alert(_0x4a8f4e(0x32b)), {
            'success': ![],
            'error': 'File\x20picker\x20not\x20supported'
        };
        window[_0x4a8f4e(0x1d2)] = _0x26f23d;
        const _0x2bdfae = await restoreFromBackup();
        delete window['tempBackupFileHandle'];
        if (_0x2bdfae[_0x4a8f4e(0x1ee)]) return await rebuildUIFromDevice(), await backupUIAssets(), {
            'success': !![]
        };
        return {
            'success': ![],
            'error': 'Restore\x20failed'
        };
    } catch (_0x5e6bbe) {
        return console[_0x4a8f4e(0x26c)](_0x4a8f4e(0x213), _0x5e6bbe), {
            'success': ![],
            'error': 'User\x20cancelled\x20or\x20error\x20occurred'
        };
    }
}
async function runRecoveryOnStart() {
    const _0x3144ae = _0x3b7550,
        _0x1b0023 = document[_0x3144ae(0x1aa)](_0x3144ae(0x280));
    if (!_0x1b0023) return;
    _0x1b0023['classList']['add']('hidden');
    try {
        const _0x42348f = await getData(_0x3144ae(0x1d6), _0x3144ae(0x25c));
        if (_0x42348f?.[_0x3144ae(0x34d)]) backupDirHandle = _0x42348f[_0x3144ae(0x34d)];
    } catch (_0x3bb2a3) {}
    const _0x80f067 = !!await getData(_0x3144ae(0x1d6), _0x3144ae(0x26d)),
        _0x99d38c = !!localStorage[_0x3144ae(0x231)]('fp');
    if (_0x80f067 && _0x99d38c) return;
    backupDirHandle && (console[_0x3144ae(0x224)](_0x3144ae(0x1a5)), await rebuildUIFromDevice());
    _0x1b0023[_0x3144ae(0x1d7)]['remove'](_0x3144ae(0x2b3)), _0x1b0023['innerHTML'] = _0x3144ae(0x29f);
    const _0x335fdc = document[_0x3144ae(0x1aa)](_0x3144ae(0x20a)),
        _0x5df5ff = document['getElementById'](_0x3144ae(0x2f4));
    _0x335fdc[_0x3144ae(0x30d)](_0x335fdc[_0x3144ae(0x2f5)](!![])), _0x5df5ff['replaceWith'](_0x5df5ff[_0x3144ae(0x2f5)](!![])), document[_0x3144ae(0x1aa)](_0x3144ae(0x20a))['onclick'] = async () => {
        const _0x19cdbe = _0x3144ae,
            _0x3140bc = document[_0x19cdbe(0x1aa)]('restore-btn');
        _0x3140bc[_0x19cdbe(0x1b1)] = !![], _0x3140bc[_0x19cdbe(0x2d8)] = 'Restoring\x20data\x20+\x20UI...';
        const _0x34b470 = await manualRestoreFlow();
        _0x34b470[_0x19cdbe(0x1ee)] ? (await backupUIAssets(), _0x1b0023[_0x19cdbe(0x2f9)] = _0x19cdbe(0x209), setTimeout(() => location[_0x19cdbe(0x233)](), 0x4b0)) : _0x1b0023[_0x19cdbe(0x2f9)] = _0x19cdbe(0x1f1) + (_0x34b470[_0x19cdbe(0x26c)] || _0x19cdbe(0x334)) + '</p><button\x20onclick=\x22location.reload()\x22\x20style=\x22margin-top:15px;padding:12px\x2024px;\x22>Try\x20Again</button></div>';
    }, document['getElementById'](_0x3144ae(0x2f4))[_0x3144ae(0x35b)] = () => _0x1b0023['classList'][_0x3144ae(0x31c)](_0x3144ae(0x2b3));
};
async function startFingerprintBackgroundProbe() {
    const _0x331cca = async () => {
        const _0x1626d5 = _0x4a6e;
        if (localStorage[_0x1626d5(0x231)]('fp')) return !![];
        const _0x232687 = await getData(_0x1626d5(0x1d6), _0x1626d5(0x26d));
        if (_0x232687?.[_0x1626d5(0x287)]) return localStorage[_0x1626d5(0x23c)]('fp', _0x232687[_0x1626d5(0x287)]), !![];
        return ![];
    };
    setTimeout(() => _0x331cca(), 0x50);
    let _0xf937dc = 0x0;
    const _0x13f020 = setInterval(async () => {
        _0xf937dc++;
        if (await _0x331cca() || _0xf937dc > 0xc) clearInterval(_0x13f020);
    }, 0x1388);
}
async function initDB() {
    return new Promise(_0x8d9b0f => {
        const _0x54005f = _0x4a6e,
            _0x231f07 = indexedDB[_0x54005f(0x30b)](_0x54005f(0x28d), 0x1);
        _0x231f07[_0x54005f(0x2e9)] = _0x128399 => {
            const _0x173637 = _0x54005f,
                _0x32ab51 = _0x128399[_0x173637(0x2bd)][_0x173637(0x34b)];
            if (!_0x32ab51[_0x173637(0x2fb)][_0x173637(0x1c6)](_0x173637(0x1d6))) _0x32ab51['createObjectStore'](_0x173637(0x1d6), {
                'keyPath': 'id'
            });
            if (!_0x32ab51[_0x173637(0x2fb)][_0x173637(0x1c6)]('tx')) _0x32ab51[_0x173637(0x29d)]('tx', {
                'keyPath': 'id'
            });
        }, _0x231f07[_0x54005f(0x1f7)] = async _0x39c99 => {
            const _0xd325b9 = _0x54005f;
            db = _0x39c99[_0xd325b9(0x2bd)][_0xd325b9(0x34b)], startFingerprintBackgroundProbe(), await runRecoveryOnStart(), _0x8d9b0f();
        }, _0x231f07[_0x54005f(0x210)] = () => _0x8d9b0f();
    });
}
let travisMemory = {
    'conversationCount': 0x0,
    'lastQuestion': '',
    'lastPurpose': '',
    'lastVerdict': ''
};

function isObligation(_0x5923ca) {
    const _0x5d6c4f = _0x3b7550;
    if (!state[_0x5d6c4f(0x344)] || state['obligations'][_0x5d6c4f(0x21b)] === 0x0) return ![];
    return state[_0x5d6c4f(0x344)][_0x5d6c4f(0x369)](_0x5aeaea => _0x5923ca[_0x5d6c4f(0x265)]()[_0x5d6c4f(0x318)](_0x5aeaea['label'][_0x5d6c4f(0x265)]()));
}

function getStatusSummary() {
    const _0x5bd6a9 = _0x3b7550,
        _0x21efe1 = getFin(),
        _0x3cf6cf = calculateInsolvencyRisk();
    return {
        'cash': Math[_0x5bd6a9(0x1d1)](_0x21efe1[_0x5bd6a9(0x2e0)]),
        'dailyCap': Math[_0x5bd6a9(0x247)](_0x21efe1[_0x5bd6a9(0x1bd)]),
        'daysRem': _0x21efe1['daysRem'],
        'riskLabel': _0x3cf6cf[_0x5bd6a9(0x2a7)],
        'riskColor': _0x3cf6cf[_0x5bd6a9(0x364)],
        'riskScore': _0x3cf6cf[_0x5bd6a9(0x20c)]
    };
}

function updateLiveHud() {
    const _0x449a14 = _0x3b7550,
        _0x3f715b = parseFloat(document['getElementById'](_0x449a14(0x2ab))['value']) || 0x0,
        _0x6a82e5 = document['getElementById'](_0x449a14(0x35a))[_0x449a14(0x34d)],
        _0x5c7517 = getFin(),
        _0x494469 = isLiquid(_0x6a82e5) ? _0x5c7517[_0x449a14(0x2e0)] - _0x3f715b : _0x5c7517[_0x449a14(0x2e0)],
        _0x2812d9 = _0x494469 / _0x5c7517[_0x449a14(0x321)];
    document[_0x449a14(0x1aa)](_0x449a14(0x283))['innerText'] = _0x449a14(0x337) + _0x2812d9[_0x449a14(0x2ff)](0x0), document[_0x449a14(0x1aa)]('hud-cover')[_0x449a14(0x27a)] = _0x449a14(0x337) + _0x5c7517['pending'][_0x449a14(0x2b9)]() + _0x449a14(0x1f2);
    const _0x50c778 = document[_0x449a14(0x1aa)](_0x449a14(0x2b5));
    isLiquid(_0x6a82e5) && _0x3f715b > _0x5c7517['daily'] ? _0x50c778[_0x449a14(0x1d7)]['remove'](_0x449a14(0x2b3)) : _0x50c778[_0x449a14(0x1d7)][_0x449a14(0x31c)](_0x449a14(0x2b3));
}

function getFin() {
    const _0x36147c = _0x3b7550,
        _0x4ecbd6 = new Date(),
        _0x160b0d = Math['max'](0x1, new Date(_0x4ecbd6[_0x36147c(0x268)](), _0x4ecbd6['getMonth']() + 0x1, 0x0)[_0x36147c(0x1de)]() - _0x4ecbd6[_0x36147c(0x1de)]());
    let _0x3a83bd = 0x0;
    const _0x513379 = state[_0x36147c(0x31b)]['type'] === _0x36147c(0x313) ? ['Cash', _0x36147c(0x2c8)] : ['Bank/M-Pesa', _0x36147c(0x27b)];
    _0x513379[_0x36147c(0x30e)](_0x47252a => _0x3a83bd += getBalance(_0x47252a));
    const _0x2ab149 = state[_0x36147c(0x344)][_0x36147c(0x1b2)](_0x4b7fca => {
            const _0x2e7ab1 = _0x36147c;
            let _0x14b16b = 0x0;
            return state[_0x2e7ab1(0x315)][_0x2e7ab1(0x30e)](_0x10e1ff => {
                const _0x19a0c8 = _0x2e7ab1,
                    _0x2407a7 = new Date(_0x10e1ff['id']);
                _0x2407a7[_0x19a0c8(0x2cf)]() === _0x4ecbd6[_0x19a0c8(0x2cf)]() && (_0x10e1ff[_0x19a0c8(0x359)][_0x19a0c8(0x265)]()['includes'](_0x4b7fca[_0x19a0c8(0x2a7)][_0x19a0c8(0x265)]()) || _0x10e1ff[_0x19a0c8(0x230)] === _0x4b7fca[_0x19a0c8(0x2a7)]) && (_0x14b16b += _0x10e1ff['amount']);
            }), {
                ..._0x4b7fca,
                'paid': _0x14b16b,
                'pending': Math[_0x2e7ab1(0x26e)](0x0, _0x4b7fca[_0x2e7ab1(0x258)] - _0x14b16b),
                'variance': _0x14b16b - _0x4b7fca[_0x2e7ab1(0x258)]
            };
        }),
        _0xb3a917 = _0x2ab149[_0x36147c(0x2e8)]((_0x1c8d7b, _0x55f75e) => _0x1c8d7b + _0x55f75e[_0x36147c(0x1ba)], 0x0),
        _0x2f8fd7 = _0x3a83bd - _0xb3a917;
    return {
        'liquid': _0x3a83bd,
        'pending': _0xb3a917,
        'safeCash': _0x2f8fd7,
        'daysRem': _0x160b0d,
        'obsStatus': _0x2ab149,
        'daily': _0x2f8fd7 / _0x160b0d
    };
}

function calculateInsolvencyRisk() {
    const _0x29d8cc = _0x3b7550,
        _0x3c5fc6 = getFin(),
        _0x435c94 = (function() {
            const _0x1eed88 = _0x4a6e,
                _0x2394b1 = new Date(),
                _0x1d60be = new Date();
            _0x1d60be[_0x1eed88(0x2aa)](_0x2394b1[_0x1eed88(0x1de)]() - 0x7);
            let _0x453a44 = 0x0;
            return state[_0x1eed88(0x315)][_0x1eed88(0x30e)](_0x3b1156 => {
                const _0x231fd1 = _0x1eed88;
                if (new Date(_0x3b1156['id']) >= _0x1d60be && isLiquid(_0x3b1156[_0x231fd1(0x230)])) _0x453a44 += _0x3b1156[_0x231fd1(0x258)];
            }), _0x453a44 / 0x7;
        }());
    if (_0x435c94 <= _0x3c5fc6[_0x29d8cc(0x1bd)]) return {
        'score': 0x5,
        'label': _0x29d8cc(0x360),
        'color': _0x29d8cc(0x34c)
    };
    if (_0x435c94 > _0x3c5fc6['daily'] && _0x435c94 < _0x3c5fc6[_0x29d8cc(0x1bd)] * 1.5) return {
        'score': 0x2d,
        'label': _0x29d8cc(0x1b4),
        'color': _0x29d8cc(0x2f7)
    };
    if (_0x435c94 >= _0x3c5fc6[_0x29d8cc(0x1bd)] * 1.5) return {
        'score': 0x55,
        'label': 'CRITICAL',
        'color': '#ef4444'
    };
    return {
        'score': 0x0,
        'label': _0x29d8cc(0x240),
        'color': _0x29d8cc(0x1cb)
    };
}

function handleAsk() {
    const _0x36b763 = _0x3b7550,
        _0x2dcc5f = document['getElementById'](_0x36b763(0x223)),
        _0x2cd298 = document[_0x36b763(0x1aa)](_0x36b763(0x28f)),
        _0x586b31 = _0x2dcc5f[_0x36b763(0x34d)]['trim']();
    if (!_0x586b31) return;
    travisMemory[_0x36b763(0x2f3)]++, travisMemory['lastQuestion'] = _0x586b31;
    const _0x262865 = _0x586b31[_0x36b763(0x265)]()[_0x36b763(0x256)](),
        _0xce0c82 = getFin(),
        _0x2c6795 = getStatusSummary();
    let _0x4dedd3 = 0x0;
    const _0x49f5ec = _0x262865[_0x36b763(0x225)](/(\d+)(?:\s*(k|thousand|ksh))?/i);
    if (_0x49f5ec) {
        _0x4dedd3 = parseFloat(_0x49f5ec[0x1]);
        if (_0x49f5ec[0x2]) _0x4dedd3 *= 0x3e8;
    }
    const _0x122822 = isObligation(_0x586b31),
        _0x5d6f0c = [_0x36b763(0x33c), _0x36b763(0x2d3), _0x36b763(0x305), _0x36b763(0x1bc), _0x36b763(0x1ce), _0x36b763(0x23e), 'transport', _0x36b763(0x267), _0x36b763(0x299), _0x36b763(0x33b), _0x36b763(0x1e2), 'education'][_0x36b763(0x369)](_0x3239e4 => _0x262865[_0x36b763(0x318)](_0x3239e4)) || _0x122822,
        _0x272442 = ['beer', _0x36b763(0x23b), _0x36b763(0x365), 'shopping', 'clothes', _0x36b763(0x1c3), _0x36b763(0x2b8), _0x36b763(0x1a1), _0x36b763(0x244), _0x36b763(0x35d)][_0x36b763(0x369)](_0x2c3a62 => _0x262865[_0x36b763(0x318)](_0x2c3a62)),
        _0x177ff0 = _0x262865[_0x36b763(0x318)](_0x36b763(0x269)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x215)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x254)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x1a3)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x23d)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x2d9)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x1e8)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x1ad)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x2da)),
        _0x1af45d = _0x262865[_0x36b763(0x318)](_0x36b763(0x204)) || _0x262865['includes'](_0x36b763(0x355)) || _0x262865[_0x36b763(0x318)]('pattern'),
        _0x564606 = _0x262865[_0x36b763(0x318)](_0x36b763(0x2fe)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x34e)) || _0x262865[_0x36b763(0x318)]('increase') || _0x262865[_0x36b763(0x318)](_0x36b763(0x1a8)),
        _0x2ce059 = _0x262865[_0x36b763(0x318)](_0x36b763(0x1c1)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x31e)),
        _0x54ca29 = _0x262865[_0x36b763(0x318)](_0x36b763(0x326)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x1f8)) || _0x262865['includes'](_0x36b763(0x28e)) || _0x262865[_0x36b763(0x318)](_0x36b763(0x357)),
        _0x5180e7 = !_0x4dedd3 && !_0x177ff0 && !_0x1af45d && !_0x564606 && !_0x2ce059 && !_0x54ca29 && !_0x5d6f0c && !_0x272442,
        _0xfc80c8 = _0x4dedd3 > _0x2c6795[_0x36b763(0x202)],
        _0x2ca469 = _0xce0c82[_0x36b763(0x321)] > 0x0 ? Math['floor']((_0xce0c82[_0x36b763(0x2e0)] - _0x4dedd3) / _0xce0c82[_0x36b763(0x321)]) : 0x0,
        _0x2cb60a = Math['floor'](Math['max'](0x0, _0x2c6795[_0x36b763(0x202)] * 0.7));
    let _0x4f09ae = _0x36b763(0x1d3);
    _0x4f09ae += _0x36b763(0x297) + _0x586b31 + _0x36b763(0x2db);
    if (_0x4dedd3 > 0x0) {
        const _0xcd3dcb = _0x122822 ? _0x36b763(0x289) : _0x5d6f0c ? _0x36b763(0x327) : _0x272442 ? _0x36b763(0x345) : 'item';
        _0x4f09ae += '<div\x20class=\x22text-xl\x22>You\x27re\x20considering\x20spending\x20KSh\x20' + _0x4dedd3[_0x36b763(0x2b9)]() + _0x36b763(0x227) + _0xcd3dcb + _0x36b763(0x245);
    } else _0x4f09ae += _0x36b763(0x221);
    const _0x4f2612 = _0x2c6795[_0x36b763(0x35c)];
    _0x4f09ae += _0x36b763(0x1f6) + _0x4f2612 + '\x22>' + _0x2c6795[_0x36b763(0x24f)] + '\x20RISK</span>\x20•\x20Daily\x20cap:\x20KSh\x20' + _0x2c6795[_0x36b763(0x202)]['toLocaleString']() + _0x36b763(0x316) + _0x2c6795['cash'][_0x36b763(0x2b9)]() + '</div>';
    let _0x4003c1 = '';
    if (_0x2c6795[_0x36b763(0x24f)] === 'LOW') _0x4003c1 += _0x36b763(0x342);
    else _0x2c6795['riskLabel'] === _0x36b763(0x1b4) ? _0x4003c1 += _0x36b763(0x2dc) : _0x4003c1 += _0x36b763(0x2c1);
    if (_0x2c6795[_0x36b763(0x202)] < 0x0) _0x4003c1 += '<div\x20class=\x22text-xs\x20mt-1\x20text-red-400\x22>→\x20Daily\x20cap\x20is\x20negative:\x20You\x20don\x27t\x20have\x20enough\x20money\x20to\x20cover\x20even\x20the\x20average\x20daily\x20portion\x20of\x20your\x20monthly\x20obligations.</div>';
    else {
        if (_0x2c6795[_0x36b763(0x202)] === 0x0) _0x4003c1 += '<div\x20class=\x22text-xs\x20mt-1\x20text-yellow-300\x22>→\x20Daily\x20cap\x20is\x20zero:\x20You\x20can\x20spend\x20nothing\x20extra\x20today\x20without\x20making\x20the\x20situation\x20worse.</div>';
        else _0x2c6795[_0x36b763(0x202)] < 0x64 ? _0x4003c1 += _0x36b763(0x218) + _0x2c6795['dailyCap'] + _0x36b763(0x1cc) : _0x4003c1 += _0x36b763(0x239) + _0x2c6795[_0x36b763(0x202)] + _0x36b763(0x31d);
    }
    if (_0x2c6795[_0x36b763(0x320)] < 0x0) _0x4003c1 += _0x36b763(0x264) + Math[_0x36b763(0x1e6)](_0x2c6795[_0x36b763(0x320)]) + '.\x20You\x20are\x20running\x20in\x20deficit.</div>';
    else {
        if (_0x2c6795['cash'] === 0x0) _0x4003c1 += _0x36b763(0x2c9);
        else _0x2c6795[_0x36b763(0x320)] < 0x1f4 ? _0x4003c1 += _0x36b763(0x214) + _0x2c6795[_0x36b763(0x320)] + '):\x20Very\x20little\x20safety\x20margin\x20left\x20after\x20obligations.</div>' : _0x4003c1 += _0x36b763(0x2c6) + _0x2c6795[_0x36b763(0x320)] + _0x36b763(0x1be);
    }
    _0x4f09ae += _0x4003c1;
    let _0x40bdfb = '',
        _0x2aa8ae = '';
    if (_0x2c6795['cash'] < 0x0 || _0x2c6795[_0x36b763(0x202)] <= 0x0) _0x40bdfb = _0x36b763(0x21e), _0x2aa8ae = _0x36b763(0x203);
    else {
        if (_0x4dedd3 > 0x0) {
            if (_0x122822 || _0x5d6f0c) _0xfc80c8 ? (_0x40bdfb = _0x36b763(0x1cd), _0x2aa8ae = 'I\x27d\x20reduce\x20it\x20to\x20around\x20KSh\x20' + _0x2cb60a + '\x20today\x20to\x20keep\x20breathing\x20room.') : (_0x40bdfb = _0x36b763(0x270), _0x2aa8ae = _0x36b763(0x257));
            else _0x272442 && (_0xfc80c8 ? (_0x40bdfb = _0x36b763(0x346), _0x2aa8ae = _0x36b763(0x2f8)) : (_0x40bdfb = _0x36b763(0x1f0), _0x2aa8ae = 'I\x27d\x20only\x20do\x20it\x20if\x20it\x20really\x20matters\x20—\x20and\x20I\x27d\x20log\x20it.'));
        } else {
            if (_0x177ff0 || _0x1af45d || _0x564606) {
                if (_0x2c6795[_0x36b763(0x24f)] === 'LOW') _0x2aa8ae = 'Business\x20is\x20stable.\x20Keep\x20the\x20same\x20discipline\x20—\x20you\x27re\x20in\x20a\x20good\x20position\x20to\x20reach\x20month\x20end\x20safely.';
                else _0x2c6795['riskLabel'] === _0x36b763(0x1b4) ? _0x2aa8ae = _0x36b763(0x278) : _0x2aa8ae = _0x36b763(0x2d7);
            } else _0x2aa8ae = _0x36b763(0x259);
        }
    }
    if (_0x40bdfb) _0x4f09ae += _0x36b763(0x35e) + _0x40bdfb + _0x36b763(0x24d);
    _0x4f09ae += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>' + _0x2aa8ae + _0x36b763(0x24d), travisMemory[_0x36b763(0x2f3)] > 0x5 && Math[_0x36b763(0x243)]() > 0.6 && (_0x4f09ae += _0x36b763(0x20f)), _0x2cd298['innerHTML'] += _0x36b763(0x2be) + _0x586b31 + '</span></div>', _0x2cd298[_0x36b763(0x2f9)] += _0x36b763(0x25b) + _0x4f09ae + '</span></div>', _0x2dcc5f[_0x36b763(0x34d)] = '', _0x2cd298[_0x36b763(0x26f)] = _0x2cd298[_0x36b763(0x273)];
}

function nav(_0x7d55ea) {
    const _0x525a9d = _0x3b7550,
        _0x37e508 = document[_0x525a9d(0x1aa)](_0x525a9d(0x1a9)),
        _0x9339af = getFin();
    updateHeader(_0x9339af);
    if (_0x7d55ea === _0x525a9d(0x2bf)) {
        const _0x149dd4 = calculateInsolvencyRisk(),
            _0x10499d = _0x9339af[_0x525a9d(0x324)]['filter'](_0xc23df2 => _0xc23df2[_0x525a9d(0x292)] > 0x0);
        _0x37e508[_0x525a9d(0x2f9)] = _0x525a9d(0x2af) + _0x149dd4['color'] + _0x525a9d(0x2ea) + _0x149dd4[_0x525a9d(0x364)] + '\x22>' + _0x149dd4[_0x525a9d(0x2a7)] + _0x525a9d(0x36f) + (0x64 - _0x149dd4[_0x525a9d(0x20c)]) + _0x525a9d(0x32a) + (_0x10499d[_0x525a9d(0x21b)] > 0x0 ? _0x10499d[_0x525a9d(0x1b2)](_0x323f3a => _0x525a9d(0x263) + _0x323f3a['label'] + _0x525a9d(0x341) + _0x323f3a[_0x525a9d(0x292)][_0x525a9d(0x2b9)]() + _0x525a9d(0x2e3))[_0x525a9d(0x1fd)]('') : '<p\x20class=\x22text-[10px]\x20opacity-30\x20italic\x22>No\x20budget\x20variances\x20detected.</p>') + _0x525a9d(0x2e7) + _0x9339af[_0x525a9d(0x2e0)][_0x525a9d(0x2b9)]() + '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-2\x20glass\x20p-6\x20neon-border\x20relative\x20min-h-[350px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22text-xs\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-400\x20mb-4\x22>Performance\x20Analytics</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22h-[300px]\x22><canvas\x20id=\x22analyticsChart\x22></canvas></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', setTimeout(() => renderChart(), 0x64);
    }
    if (_0x7d55ea === _0x525a9d(0x238)) {
        let _0x3a1028 = _0x9339af[_0x525a9d(0x324)][_0x525a9d(0x1b2)](_0x54fe57 => _0x525a9d(0x261) + _0x54fe57[_0x525a9d(0x2a7)] + _0x525a9d(0x309) + _0x54fe57[_0x525a9d(0x258)][_0x525a9d(0x2b9)]() + _0x525a9d(0x276) + _0x54fe57[_0x525a9d(0x207)][_0x525a9d(0x2b9)]() + _0x525a9d(0x284) + (_0x54fe57[_0x525a9d(0x1ba)] <= 0x0 ? _0x525a9d(0x1fb) : _0x525a9d(0x1c0)) + _0x525a9d(0x2f6) + (_0x54fe57[_0x525a9d(0x1ba)] <= 0x0 ? _0x525a9d(0x262) : _0x525a9d(0x337) + _0x54fe57[_0x525a9d(0x1ba)]['toLocaleString']()) + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + (_0x54fe57[_0x525a9d(0x292)] > 0x0 ? _0x525a9d(0x236) + _0x54fe57[_0x525a9d(0x292)][_0x525a9d(0x2b9)]() + _0x525a9d(0x24e) : '') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>')['join']('');
        _0x37e508[_0x525a9d(0x2f9)] = _0x525a9d(0x21d) + (_0x3a1028 || _0x525a9d(0x2a2)) + _0x525a9d(0x200);
    }
    _0x7d55ea === _0x525a9d(0x266) && (_0x37e508[_0x525a9d(0x2f9)] = _0x525a9d(0x1fa), document[_0x525a9d(0x1aa)](_0x525a9d(0x223))[_0x525a9d(0x249)]('keypress', _0x2fcbf3 => {
        const _0x740180 = _0x525a9d;
        if (_0x2fcbf3[_0x740180(0x1ed)] === _0x740180(0x325)) handleAsk();
    }));
    if (_0x7d55ea === _0x525a9d(0x27c)) {
        let _0xf7ac77 = state['transactions'][_0x525a9d(0x1b2)](_0x83dff => {
            const _0xf8ea03 = _0x525a9d,
                _0x5ea4eb = _0x83dff['amount'][_0xf8ea03(0x2b9)]();
            return '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22border-b\x20border-slate-800\x20text-sm\x20hover:bg-slate-900/50\x20transition-colors\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20opacity-40\x20font-bold\x20text-[10px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + new Date(_0x83dff['id'])[_0xf8ea03(0x362)](_0xf8ea03(0x22b)) + _0xf8ea03(0x328) + _0x83dff[_0xf8ea03(0x359)] + _0xf8ea03(0x1dc) + _0x83dff['debit'] + _0xf8ea03(0x1c7) + _0x83dff['credit'] + _0xf8ea03(0x246) + _0x5ea4eb + _0xf8ea03(0x1f9) + _0x5ea4eb + _0xf8ea03(0x35f);
        })['join']('');
        _0x37e508['innerHTML'] = _0x525a9d(0x1e7) + (_0xf7ac77 || _0x525a9d(0x329)) + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>';
    }
}

function renderChart() {
    const _0x3c72b0 = _0x3b7550,
        _0x23c5ec = document[_0x3c72b0(0x1aa)](_0x3c72b0(0x301))?.['getContext']('2d');
    if (!_0x23c5ec) return;
    const _0x5c51cf = getFin(),
        _0x35c42f = new Date();
    let _0x4058e6 = [],
        _0x3efee3 = [],
        _0x2aa4c2 = [],
        _0x234ff1 = [];
    for (let _0x3c7af0 = 0x6; _0x3c7af0 >= 0x0; _0x3c7af0--) {
        const _0x39e6ae = new Date();
        _0x39e6ae[_0x3c72b0(0x2aa)](_0x35c42f[_0x3c72b0(0x1de)]() - _0x3c7af0), _0x4058e6['push'](_0x39e6ae[_0x3c72b0(0x362)](_0x3c72b0(0x22b), {
            'weekday': 'short'
        }));
        let _0x12ac67 = 0x0,
            _0xd21df2 = 0x0;
        state[_0x3c72b0(0x315)][_0x3c72b0(0x30e)](_0x190bc1 => {
            const _0x5867b3 = _0x3c72b0;
            if (new Date(_0x190bc1['id'])[_0x5867b3(0x1db)]() === _0x39e6ae[_0x5867b3(0x1db)]()) {
                if (isLiquid(_0x190bc1[_0x5867b3(0x230)])) _0x12ac67 += _0x190bc1[_0x5867b3(0x258)];
                if (isLiquid(_0x190bc1[_0x5867b3(0x1b8)])) _0xd21df2 += _0x190bc1[_0x5867b3(0x258)];
            }
        }), _0x3efee3[_0x3c72b0(0x2cb)](_0x12ac67), _0x2aa4c2['push'](_0xd21df2), _0x234ff1[_0x3c72b0(0x2cb)](_0x5c51cf[_0x3c72b0(0x1bd)]);
    }
    if (window[_0x3c72b0(0x21c)]) window[_0x3c72b0(0x21c)][_0x3c72b0(0x2b4)]();
    window[_0x3c72b0(0x21c)] = new Chart(_0x23c5ec, {
        'type': _0x3c72b0(0x363),
        'data': {
            'labels': _0x4058e6,
            'datasets': [{
                'label': 'CEILING',
                'data': _0x234ff1,
                'borderColor': _0x3c72b0(0x312),
                'borderDash': [0x5, 0x5],
                'pointRadius': 0x0,
                'fill': ![]
            }, {
                'label': _0x3c72b0(0x335),
                'data': _0x3efee3,
                'borderColor': _0x3c72b0(0x2c4),
                'backgroundColor': _0x3c72b0(0x2a5),
                'fill': !![],
                'tension': 0.4
            }, {
                'label': _0x3c72b0(0x350),
                'data': _0x2aa4c2,
                'borderColor': _0x3c72b0(0x34c),
                'backgroundColor': _0x3c72b0(0x2b2),
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
                        'color': _0x3c72b0(0x1cb),
                        'font': {
                            'size': 0xa
                        }
                    }
                }
            }
        }
    });
}

function updateHeader(_0x11b76f) {
    const _0x5c0fd1 = _0x3b7550,
        _0x5b4b10 = document[_0x5c0fd1(0x1aa)](_0x5c0fd1(0x1ca));
    _0x5b4b10[_0x5c0fd1(0x2f9)] = _0x5c0fd1(0x1a7) + _0x11b76f[_0x5c0fd1(0x1a4)][_0x5c0fd1(0x2b9)]() + _0x5c0fd1(0x1b0) + _0x11b76f[_0x5c0fd1(0x1ba)]['toLocaleString']() + _0x5c0fd1(0x358) + _0x11b76f[_0x5c0fd1(0x321)] + _0x5c0fd1(0x219) + Math[_0x5c0fd1(0x26e)](0x0, _0x11b76f['daily'])[_0x5c0fd1(0x2ff)](0x0) + '</p></div>\x0a\x20\x20\x20\x20';
    const _0x251183 = document[_0x5c0fd1(0x1aa)](_0x5c0fd1(0x21a));
    _0x251183['innerText'] = _0x11b76f['safeCash'] < 0x0 ? _0x5c0fd1(0x1e3) : '🛡️\x20SYSTEM\x20STABLE', _0x251183[_0x5c0fd1(0x367)] = _0x11b76f[_0x5c0fd1(0x2e0)] < 0x0 ? _0x5c0fd1(0x248) : _0x5c0fd1(0x2d0);
}

function isLiquid(_0x974e5a) {
    const _0x33e39f = _0x3b7550;
    return [_0x33e39f(0x1f4), _0x33e39f(0x2c8), 'Bank/M-Pesa', _0x33e39f(0x27b)][_0x33e39f(0x318)](_0x974e5a);
}

function getBalance(_0x30d7c6) {
    const _0x2c97fa = _0x3b7550;
    let _0x4ff3a1 = 0x0;
    state[_0x2c97fa(0x315)][_0x2c97fa(0x30e)](_0x4951b1 => {
        const _0x337139 = _0x2c97fa;
        if (_0x4951b1['debit'] === _0x30d7c6) _0x4ff3a1 += _0x4951b1[_0x337139(0x258)];
        if (_0x4951b1[_0x337139(0x230)] === _0x30d7c6) _0x4ff3a1 -= _0x4951b1[_0x337139(0x258)];
    });
    const _0x3a3a59 = [_0x2c97fa(0x1f4), _0x2c97fa(0x2c8), _0x2c97fa(0x288), _0x2c97fa(0x27b), _0x2c97fa(0x242), 'Stock', _0x2c97fa(0x1d8)];
    return _0x3a3a59[_0x2c97fa(0x318)](_0x30d7c6) ? _0x4ff3a1 : -_0x4ff3a1;
}

function showTxModal() {
    const _0x3e9056 = _0x3b7550,
        _0x135fa6 = document[_0x3e9056(0x1aa)](_0x3e9056(0x33a)),
        _0x241fb3 = document[_0x3e9056(0x1aa)](_0x3e9056(0x35a));
    _0x135fa6[_0x3e9056(0x2f9)] = _0x241fb3[_0x3e9056(0x2f9)] = '';
    const _0x3118f2 = state[_0x3e9056(0x31b)]['type'] === _0x3e9056(0x313),
        _0x3a0d36 = (_0x36bf13, _0x44445a, _0x2f4a89) => {
            const _0x5f0b69 = _0x3e9056,
                _0x946bb7 = document['createElement'](_0x5f0b69(0x228));
            return _0x946bb7[_0x5f0b69(0x2a7)] = '●\x20' + _0x36bf13, _0x946bb7['style'][_0x5f0b69(0x364)] = _0x44445a, _0x2f4a89[_0x5f0b69(0x30e)](_0x37388a => {
                const _0xb3cf3b = _0x5f0b69,
                    _0x749738 = new Option(_0x37388a, _0x37388a);
                _0x946bb7[_0xb3cf3b(0x2d4)](_0x749738);
            }), _0x946bb7;
        };
    if (_0x3118f2) {
        const _0x11927f = _0x44c8c0 => {
            const _0x179389 = _0x3e9056;
            _0x44c8c0[_0x179389(0x2d4)](_0x3a0d36('ASSETS\x20(Money\x20you\x20have)', _0x179389(0x1da), [_0x179389(0x1f4), 'M-Pesa', _0x179389(0x271), _0x179389(0x2f2)])), _0x44c8c0['appendChild'](_0x3a0d36(_0x179389(0x1c8), '#22c55e', [_0x179389(0x314), _0x179389(0x1c9), _0x179389(0x34a), _0x179389(0x2c5), _0x179389(0x2fa)])), _0x44c8c0[_0x179389(0x2d4)](_0x3a0d36(_0x179389(0x293), _0x179389(0x2ec), [_0x179389(0x237), _0x179389(0x354), _0x179389(0x229), _0x179389(0x291), _0x179389(0x1b9), _0x179389(0x32c)])), _0x44c8c0['appendChild'](_0x3a0d36('AVOIDABLE\x20EXPENSES\x20(Can\x20cut\x20back)', _0x179389(0x2c4), ['Entertainment', _0x179389(0x352), _0x179389(0x32d), _0x179389(0x1ea)])), _0x44c8c0[_0x179389(0x2d4)](_0x3a0d36(_0x179389(0x300), '#3b82f6', [_0x179389(0x25f), 'Credit']));
        };
        _0x11927f(_0x135fa6), _0x11927f(_0x241fb3);
    } else {
        const _0x2b49f5 = _0x16d9ae => {
            const _0x61128a = _0x3e9056;
            _0x16d9ae[_0x61128a(0x2d4)](_0x3a0d36(_0x61128a(0x2d2), _0x61128a(0x1da), [_0x61128a(0x201), _0x61128a(0x27b), _0x61128a(0x2ad), _0x61128a(0x242), _0x61128a(0x211)])), _0x16d9ae[_0x61128a(0x2d4)](_0x3a0d36(_0x61128a(0x308), _0x61128a(0x1da), [_0x61128a(0x24b), 'Service\x20Revenue', _0x61128a(0x22e)])), _0x16d9ae[_0x61128a(0x2d4)](_0x3a0d36(_0x61128a(0x2df), _0x61128a(0x2ec), [_0x61128a(0x354), _0x61128a(0x25a), _0x61128a(0x2a8), _0x61128a(0x2a9), _0x61128a(0x1b3), _0x61128a(0x212)])), _0x16d9ae[_0x61128a(0x2d4)](_0x3a0d36(_0x61128a(0x1c2), _0x61128a(0x2c4), ['Marketing', _0x61128a(0x303), 'Professional\x20Fees\x20(if\x20not\x20critical)'])), _0x16d9ae[_0x61128a(0x2d4)](_0x3a0d36(_0x61128a(0x300), _0x61128a(0x312), ['Accounts\x20Payable', 'Loans\x20Payable']));
        };
        _0x2b49f5(_0x135fa6), _0x2b49f5(_0x241fb3);
    }
    document[_0x3e9056(0x1aa)](_0x3e9056(0x22a))[_0x3e9056(0x1d7)][_0x3e9056(0x30c)](_0x3e9056(0x2b3)), updateLiveHud();
}
async function commitTransaction() {
    const _0x55763f = _0x3b7550,
        _0x4ace88 = parseFloat(document[_0x55763f(0x1aa)]('tx-amount')[_0x55763f(0x34d)]),
        _0x254258 = document[_0x55763f(0x1aa)](_0x55763f(0x33a))[_0x55763f(0x34d)],
        _0x3b683a = document['getElementById'](_0x55763f(0x35a))['value'],
        _0xb02fd5 = document['getElementById']('tx-desc')[_0x55763f(0x34d)] || _0x55763f(0x20d);
    if (_0x254258 === _0x3b683a || isNaN(_0x4ace88) || _0x4ace88 <= 0x0) return showCustomAlert(_0x55763f(0x281));
    const _0x3c4554 = {
        'id': Date['now'](),
        'debit': _0x254258,
        'credit': _0x3b683a,
        'amount': _0x4ace88,
        'desc': _0xb02fd5
    };
    state[_0x55763f(0x315)][_0x55763f(0x2e1)](_0x3c4554), await saveData('tx', _0x3c4554), typeof saveBackup === _0x55763f(0x2ca) && (await saveBackup(), !backupDirHandle && await setupBackupFolder()), closeTxModal(), nav(_0x55763f(0x2bf));
}

function addObligationRow(_0x41cf63 = '', _0x25298f = '') {
    const _0x347215 = _0x3b7550,
        _0x17a84e = document[_0x347215(0x2ae)](_0x347215(0x2e5));
    _0x17a84e[_0x347215(0x367)] = _0x347215(0x33f), _0x17a84e[_0x347215(0x2f9)] = _0x347215(0x2ba) + _0x41cf63 + '\x22\x20class=\x22flex-1\x20p-2\x20text-sm\x22><input\x20type=\x22number\x22\x20placeholder=\x22KSh\x22\x20value=\x22' + _0x25298f + '\x22\x20class=\x22w-24\x20p-2\x20text-sm\x22><button\x20onclick=\x22this.parentElement.remove()\x22\x20class=\x22text-red-500\x20font-bold\x22>×</button>', document[_0x347215(0x1aa)](_0x347215(0x348))[_0x347215(0x2d4)](_0x17a84e);
}

function setUserType(_0x2a9564) {
    const _0x466841 = _0x3b7550;
    state[_0x466841(0x338)] = _0x2a9564, document[_0x466841(0x1aa)](_0x466841(0x302))[_0x466841(0x28a)][_0x466841(0x317)] = _0x2a9564 === _0x466841(0x313) ? '#4ade80' : _0x466841(0x1c4), document[_0x466841(0x1aa)]('btn-b')[_0x466841(0x28a)][_0x466841(0x317)] = _0x2a9564 === _0x466841(0x1a3) ? _0x466841(0x34c) : _0x466841(0x1c4);
}

function _0x5582() {
    const _0x13eee0 = ['Loan\x20Repayment', 'activation-overlay', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20p-4\x20bg-slate-900\x20border-b\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div><p\x20class=\x22font-bold\x20uppercase\x22>', 'Settled', '<div\x20class=\x22flex\x20justify-between\x20border-b\x20border-red-900/30\x20py-2\x22><span\x20class=\x22text-xs\x20uppercase\x22>', '<div\x20class=\x22text-xs\x20mt-1\x20text-red-400\x22>→\x20Buffer\x20is\x20negative:\x20After\x20setting\x20aside\x20money\x20for\x20this\x20month\x27s\x20obligations,\x20you\x20are\x20already\x20short\x20by\x20KSh\x20', 'toLowerCase', 'ask', 'utilities', 'getFullYear', 'how\x20is', 'setup-overlay', 'getFile', 'error', 'config', 'max', 'scrollTop', 'This\x20necessary\x20spend\x20fits\x20inside\x20your\x20current\x20daily\x20cap.', 'Bank\x20Account', 'getContext', 'scrollHeight', 'name', 'onload', '\x20|\x20Spent:\x20', '|||', 'Business\x20is\x20under\x20pressure.\x20I\x27d\x20stay\x20very\x20disciplined\x20this\x20week\x20to\x20avoid\x20slipping\x20into\x20critical.', 'charCodeAt', 'innerText', 'Petty\x20Cash', 'book', 'type', 'userAgent', 'Install\x20cancelled.<br><br>\x20You\x20must\x20install\x20to\x20continue.', 'recovery-overlay', 'Strategy\x20Error:<br><br>\x20A\x20transaction\x20must\x20move\x20value\x20between\x20two\x20different\x20accounts.', '#obligation-list\x20>\x20div', 'hud-cap', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-right\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22', '\x20STRATEGY\x20ENGINE', 'matches', 'fingerprint', 'Bank/M-Pesa', 'obligation', 'style', 'catch', 'getAll', 'TravisGuardian_v1.0', 'employee', 'chat-box', 'querySelectorAll', 'Transport', 'variance', 'NECESSARY\x20EXPENSES\x20(Must\x20pay)', 'Installed!\x20Reopen\x20from\x20home\x20screen.', 'matchMedia', '4474704VWdDsb', '<div\x20class=\x22text-[#4ade80]\x20text-2xl\x20mb-4\x22>You\x20asked:\x20\x22', 'TravisGuardian\x20•\x202026', 'groceries', 'now', 'documents', 'No\x20file\x20handle', 'createObjectStore', 'SHA-256', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.78);display:flex;align-items:center;justify-content:center;z-index:9999;font-family:system-ui,sans-serif;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22background:white;border-radius:16px;max-width:460px;width:92%;box-shadow:0\x2025px\x2070px\x20rgba(0,0,0,0.3);overflow:hidden;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:28px\x2024px;text-align:center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h2\x20style=\x22margin:0\x200\x208px\x200;font-size:1.5rem;\x22>🔒\x20Travis\x20Guardian</h2>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22margin:0;opacity:0.95;\x22>Your\x20Personal\x20Financial\x20Advisor</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22padding:32px\x2028px;text-align:center;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22width:70px;height:70px;background:#f0f9ff;color:#1e40af;font-size:36px;border-radius:50%;margin:0\x20auto\x2020px;display:flex;align-items:center;justify-content:center;border:5px\x20solid\x20#e0f2fe;\x22>📁</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20style=\x22margin:0\x200\x2016px\x200;font-size:1.35rem;color:#1e3a8a;\x22>Restore\x20Everything?</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22color:#475569;line-height:1.6;margin-bottom:28px;font-size:1.02rem;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Browser\x20data\x20was\x20cleared.<br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Select\x20your\x20backup\x20file\x20to\x20restore\x20<strong>financial\x20data\x20+\x20UI</strong>.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22display:flex;flex-direction:column;gap:12px;margin-bottom:20px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22restore-btn\x22\x20style=\x22background:#1e40af;color:white;border:none;padding:16px\x2024px;font-size:1.05rem;font-weight:600;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;\x22>📂\x20Select\x20Backup\x20File\x20&\x20Restore\x20All</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20id=\x22skip-btn\x22\x20style=\x22background:transparent;color:#64748b;border:2px\x20solid\x20#cbd5e1;padding:14px\x2024px;font-size:1rem;font-weight:500;border-radius:10px;cursor:pointer;\x22>Continue\x20as\x20New\x20User</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20style=\x22margin:0;font-size:0.82rem;color:#64748b;\x22>First-time\x20users:\x20choose\x20“Continue\x20as\x20New\x20User”</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20', '14px\x20\x27Arial\x27', 'readwrite', '<p\x20class=\x22opacity-30\x22>No\x20obligations.</p>', 'install-overlay', 'App\x20already\x20installed', 'rgba(239,\x2068,\x2068,\x200.1)', 'fromCharCode', 'label', 'Utilities', 'Cost\x20of\x20Goods\x20Sold', 'setDate', 'tx-amount', '42aCehOw', 'Accounts\x20Receivable', 'createElement', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22grid\x20grid-cols-1\x20lg:grid-cols-3\x20gap-6\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-1\x20space-y-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x22\x20style=\x22border-color:\x20', 'Confirm\x20system\x20purge?\x20All\x20financial\x20history\x20will\x20be\x20deleted.', 'input', 'rgba(74,\x20222,\x20128,\x200.1)', 'hidden', 'destroy', 'hud-warning', 'warn', 'flex', 'mall', 'toLocaleString', '<input\x20type=\x22text\x22\x20placeholder=\x22Rent\x22\x20value=\x22', 'activated', 'toString', 'target', '<div\x20class=\x22text-right\x22><span\x20class=\x22user-msg\x20text-sm\x20inline-block\x22>', 'dash', 'put', '<div\x20class=\x22text-xs\x20mt-1\x20text-red-400\x22>→\x20Insolvency\x20Risk\x20is\x20CRITICAL:\x20With\x20your\x20current\x20spending,\x20surviving\x20the\x20remaining\x20days\x20of\x20the\x20month\x20is\x20highly\x20alarming.\x20You\x20are\x20very\x20likely\x20to\x20run\x20out\x20of\x20money\x20before\x20month\x20end.</div>', 'serviceWorker', 'appinstalled', '#ef4444', 'Dividends', '<div\x20class=\x22text-xs\x20mt-1\x20text-green-400\x22>→\x20Buffer\x20is\x20KSh\x20', 'PBKDF2', 'M-Pesa', '<div\x20class=\x22text-xs\x20mt-1\x20text-yellow-300\x22>→\x20Buffer\x20is\x20zero:\x20You\x20have\x20exactly\x20enough\x20to\x20cover\x20obligations\x20—\x20nothing\x20left\x20for\x20anything\x20else.</div>', 'function', 'push', 'showDirectoryPicker', 'User\x20cancelled\x20folder\x20picker', 'get', 'getMonth', 'px-4\x20py-2\x20border-2\x20border-[#4ade80]\x20text-[#4ade80]\x20rounded\x20font-black', '121Sgthkx', 'ASSETS\x20(What\x20the\x20business\x20owns)', 'food', 'appendChild', 'showOpenFilePicker', 'width', 'Business\x20is\x20in\x20a\x20dangerous\x20zone.\x20Cut\x20every\x20non-essential\x20outflow\x20immediately\x20to\x20improve\x20your\x20chances\x20of\x20surviving\x20the\x20month.', 'textContent', 'situation', 'next', '\x22</div>', '<div\x20class=\x22text-xs\x20mt-1\x20text-yellow-300\x22>→\x20Insolvency\x20Risk\x20is\x20MODERATE:\x20You\x27re\x20approaching\x20a\x20dangerous\x20zone.\x20If\x20spending\x20continues\x20like\x20this,\x20surviving\x20the\x20rest\x20of\x20the\x20month\x20will\x20become\x20difficult.</div>', 'raw', 'index.html', 'NECESSARY\x20OPERATING\x20EXPENSES', 'safeCash', 'unshift', 'encode', '</span></div>', 'sort', 'div', '604748lpObrG', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-[#4ade80]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Disposable\x20Buffer</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x22>KSh\x20', 'reduce', 'onupgradeneeded', '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Insolvency\x20Risk\x20Score</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x20mb-3\x22\x20style=\x22color:\x20', 'fillRect', '#d97706', 'focus', 'Mobile:\x20Full\x20silent\x20folder\x20backup\x20not\x20supported.', 'blob', 'preventDefault', 'write', 'Savings', 'conversationCount', 'skip-btn', 'cloneNode', '\x20font-black\x20text-sm\x20uppercase\x22>', '#eab308', 'I\x27d\x20skip\x20or\x20heavily\x20reduce\x20it.\x20Not\x20worth\x20the\x20risk\x20while\x20the\x20buffer\x20is\x20tight.', 'innerHTML', 'Other\x20Income', 'objectStoreNames', 'decode', 'top', 'profit', 'toFixed', 'LIABILITIES\x20&\x20TRANSFERS', 'analyticsChart', 'btn-p', 'Travel\x20&\x20Entertainment', 'toDataURL', 'porridge', 'slice', 'clear', 'REVENUE\x20(Money\x20coming\x20in\x20-\x20GOOD!)', '</p><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Budget:\x20', 'availHeight', 'open', 'remove', 'replaceWith', 'forEach', '35JHpREG', 'deriveKey', 'display-name', '#3b82f6', 'personal', 'Salary', 'transactions', '\x20•\x20Buffer:\x20KSh\x20', 'borderColor', 'includes', 'hardwareConcurrency', '693178JlMLRV', 'user', 'add', ':\x20This\x20is\x20the\x20safe\x20maximum\x20you\x20can\x20spend\x20per\x20day\x20without\x20hurting\x20your\x20ability\x20to\x20pay\x20obligations.</div>', 'inventory', 'fillStyle', 'cash', 'daysRem', 'canvas-fail', 'Ready\x20to\x20install\x20–\x20click\x20below', 'obsStatus', 'Enter', 'worker', 'basic\x20need', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22font-black\x20italic\x20uppercase\x20text-slate-200\x22>', '<tr><td\x20colspan=\x224\x22\x20class=\x22p-10\x20text-center\x20opacity-30\x20italic\x20font-bold\x20uppercase\x20tracking-widest\x22>No\x20entries\x20found\x20in\x20the\x20archives.</td></tr>', '%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[9px]\x20mt-2\x20opacity-50\x20italic\x22>Based\x20on\x207D\x20Velocity\x20vs.\x20Projected\x20Ceiling.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-red-500\x20bg-red-950/10\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-widest\x20mb-4\x22>Leak\x20Finder</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22space-y-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'Your\x20browser\x20does\x20not\x20support\x20file\x20selection.', 'School', 'Travel\x20(fun)', 'availWidth', 'script.js', 'click', 'from', 'beforeinstallprompt', 'arrayBuffer', 'Restore\x20failed', 'SPEND', 'byteLength', 'KSh\x20', 'tempType', 'replaceChild', 'tx-debit', 'bills', 'rent', 'travis-finance-backup.enc', 'Failed\x20to\x20write\x20data\x20to\x20database:\x20', 'flex\x20gap-2', 'rgba(102,\x20204,\x200,\x200.7)', '</span><span\x20class=\x22leak-red\x20font-bold\x22>+KSh\x20', '<div\x20class=\x22text-xs\x20mt-1\x20text-green-400\x22>→\x20Insolvency\x20Risk\x20is\x20LOW:\x20With\x20your\x20current\x20spending\x20habit,\x20you\x20have\x20a\x20good\x20chance\x20of\x20reaching\x20the\x20end\x20of\x20the\x20month\x20with\x20some\x20money\x20left\x20for\x20survival.</div>', 'isArray', 'obligations', 'luxury', 'This\x20luxury\x20spend\x20is\x20well\x20above\x20your\x20safe\x20limit.', 'toUpperCase', 'obligation-list', 'sw.js', 'Allowance', 'result', '#4ade80', 'value', 'profitable', 'register', 'REVENUE', 'standalone', 'Clothes', '/activate-fingerprint', 'Rent', 'spending\x20habit', 'Restore\x20aborted\x20-\x20read\x20error:', 'how\x20many', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-[#4ade80]\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Survival\x20Window</p><p\x20class=\x22text-xl\x20font-bold\x22>', 'desc', 'tx-credit', 'onclick', 'riskColor', 'entertainment', '<div\x20style=\x22color:#eab308;\x20margin-top:12px;\x20font-weight:bold;\x22>', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>', 'LOW', 'Installed!<br><br>\x20Close\x20this\x20tab\x20→\x20open\x20from\x20home\x20screen\x20to\x20activate.', 'toLocaleDateString', 'line', 'color', 'club', 'getFileHandle', 'className', 'substring', 'some', './sw.js', 'getRandomValues', 'Silent\x20backup\x20failed', 'No\x20valid\x20device\x20fingerprint\x20found.<br><br>Please\x20restart\x20installation\x20process.', 'objectStore', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22risk-heatmap\x20overflow-hidden\x22><div\x20class=\x22bg-white/20\x20h-full\x22\x20style=\x22width:\x20', 'drink', 'custom-alert-message', 'business', 'liquid', 'Rebuilding\x20UI\x20from\x20device\x20files\x20before\x20showing\x20recovery...', 'parentNode', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-blue-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Total\x20Liquid</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'more\x20money', 'view-port', 'getElementById', 'stringify', 'endsWith', 'seven\x20days', 'OperationError', '1380080nfbooc', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-red-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Reserved\x20Bills</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'disabled', 'map', 'Tax', 'MODERATE', '970081yJLKkR', 'resolvedOptions', 'createWritable', 'debit', '\x20Medical', 'pending', 'language', 'school', 'daily', ':\x20This\x20is\x20the\x20amount\x20remaining\x20after\x20covering\x20all\x20monthly\x20obligations.</div>', 'act-code', 'text-yellow-500', 'stock', 'DISCRETIONARY\x20/\x20AVOIDABLE\x20EXPENSES', 'shoes', '#334155', 'Encrypted\x20backup\x20saved\x20successfully', 'contains', '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20opacity-30\x22>←</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-red-900/30\x20text-red-400\x20px-1\x20rounded\x20font-bold\x22>', 'INCOME\x20(Money\x20coming\x20in\x20-\x20GOOD!)', 'Side\x20Hustle', 'dashboard-grid', '#94a3b8', '):\x20Almost\x20no\x20room\x20for\x20any\x20unexpected\x20or\x20extra\x20costs.</div>', 'This\x20necessary\x20spend\x20exceeds\x20your\x20daily\x20cap.', 'fees', '#f60', 'timeZone', 'round', 'tempBackupFileHandle', '<div\x20class=\x22text-5xl\x20mb-2\x22></div>', 'colorDepth', 'height', 'meta', 'classList', 'Tools', 'AES-GCM', '#22c55e', 'toDateString', '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20items-center\x20gap-2\x20mt-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-green-900/30\x20text-green-400\x20px-1\x20rounded\x20font-bold\x22>', 'canvas', 'getDate', 'encrypt', '\x20|\x20', 'tz-unknown', 'medical', '⚠️\x20INSOLVENT', 'TravisGuardian_v1.8', '\x20Desktop:\x20Persistent\x20folder\x20backup\x20enabled', 'abs', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20overflow-hidden\x20rounded-xl\x20border\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20class=\x22w-full\x20text-left\x20border-collapse\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22bg-slate-900/80\x20text-[10px]\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-500\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Transaction\x20Details</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Debit\x20(+)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Credit\x20(-)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'future', 'set', 'Other\x20Fun\x20Spending', 'Failed\x20to\x20backup\x20', 'readonly', 'key', 'success', 'Failed\x20to\x20read/decrypt\x20backup\x20file', 'It\x27s\x20a\x20want,\x20not\x20a\x20need.', '<div\x20style=\x22padding:30px;text-align:center;color:red;background:white;border-radius:16px;\x22><p>\x20', '\x20Reserved', 'oncomplete', 'Cash', 'install-status', '<div\x20class=\x22mt-4\x22>Current\x20status:\x20<span\x20style=\x22color:', 'onsuccess', 'staff', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-red-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-', '<div\x20class=\x22max-w-4xl\x20glass\x20p-6\x20mx-auto\x20flex\x20flex-col\x20h-[550px]\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22chat-box\x22\x20class=\x22flex-1\x20overflow-y-auto\x20space-y-4\x20mb-4\x20pr-2\x20flex\x20flex-col\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22travis-msg\x20text-xs\x20italic\x22>Probability\x20Engine\x20and\x20Leak\x20Finder\x20active.\x20How\x20can\x20I\x20protect\x20your\x20capital?</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-2\x20p-2\x20bg-slate-900\x20border-2\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22chat-input\x22\x20type=\x22text\x22\x20placeholder=\x22Consult\x20Travis...\x22\x20class=\x22flex-1\x20p-4\x20bg-transparent\x20border-none\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22handleAsk()\x22\x20class=\x22bg-[#4ade80]\x20text-black\x20px-8\x20font-black\x20rounded\x20uppercase\x22>Send</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'text-green-400', 'userChoice', 'join', 'decrypt', 'Invalid\x20activation\x20code.', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22factoryReset()\x22\x20class=\x22mt-20\x20text-red-900\x20text-[10px]\x20font-bold\x20uppercase\x20tracking-widest\x20hover:text-red-500\x22>Full\x20System\x20Wipe</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'Bank\x20/\x20M-Pesa', 'dailyCap', 'Priority\x20is\x20to\x20bring\x20in\x20cash\x20or\x20cut\x20expenses\x20immediately.\x20No\x20new\x20spending\x20until\x20the\x20buffer\x20turns\x20positive.', 'habit', '\x20Network\x20/\x20server\x20error:', 'transaction', 'paid', '-5634', '<div\x20style=\x22padding:50px;text-align:center;background:white;border-radius:16px;max-width:400px;\x22><p\x20style=\x22color:green;font-size:19px;\x22>\x20Everything\x20restored!<br>Reloading\x20nice\x20UI...</p></div>', 'restore-btn', '(display-mode:\x20standalone)', 'score', 'Market\x20Exchange', 'Travisguardian', '<div\x20class=\x22mt-6\x20text-xs\x20italic\x20text-yellow-300\x22>Seeing\x20several\x20questions\x20lately...\x20want\x20me\x20to\x20run\x20a\x20quick\x207-day\x20projection\x20and\x20recommend\x20exact\x20steps?</div>', 'onerror', 'Fixed\x20Assets', 'Office\x20Supplies', 'Restore\x20flow\x20error:', '<div\x20class=\x22text-xs\x20mt-1\x20text-yellow-300\x22>→\x20Buffer\x20is\x20almost\x20gone\x20(only\x20KSh\x20', 'status', 'display-mode', 'text', '<div\x20class=\x22text-xs\x20mt-1\x20text-yellow-300\x22>→\x20Daily\x20cap\x20is\x20very\x20tight\x20(only\x20KSh\x20', '\x20Days</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-purple-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Daily\x20Ceiling</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'header-verdict', 'length', 'travisChart', '<div\x20class=\x22glass\x20p-6\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20mb-6\x22><h3\x20class=\x22text-2xl\x20font-black\x20uppercase\x20italic\x22>Mandatory\x20Reserve</h3><button\x20onclick=\x22document.getElementById(\x27setup-overlay\x27).classList.remove(\x27hidden\x27)\x22\x20class=\x22text-[10px]\x20border\x20border-slate-700\x20px-2\x20py-1\x22>EDIT\x20LIST</button></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'We\x20are\x20in\x20survival\x20mode\x20right\x20now.', 'Restore\x20operation\x20failed\x20during\x20write:', 'importKey', '<div\x20class=\x22text-xl\x22>Let\x20me\x20give\x20you\x20a\x20clear\x20read\x20on\x20your\x20situation...</div>', '6838664kfWYiK', 'chat-input', 'log', 'match', '#069', '\x20on\x20', 'optgroup', 'Bills', 'tx-modal', 'en-KE', 'Travis\x20Finance\x20Backup', 'load', 'Other\x20Revenue', '2gFOWdL', 'credit', 'getItem', 'POST', 'reload', 'subtle', 'Failed\x20to\x20decrypt\x20backup:', '<p\x20class=\x22text-[9px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-tighter\x22>+', 'Food\x20&\x20Groceries', 'obs', '<div\x20class=\x22text-xs\x20mt-1\x20text-green-400\x22>→\x20Daily\x20cap\x20is\x20KSh\x20', 'xx-XX', 'party', 'setItem', 'going', 'fuel', 'app', 'UNDETERMINED', 'message', 'Inventory', 'random', 'outing', '.</div>', '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-green-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20+', 'floor', 'px-4\x20py-2\x20border-2\x20border-red-500\x20text-red-500\x20rounded\x20font-black\x20animate-pulse', 'addEventListener', 'UA-unknown', 'Sales\x20Revenue', 'parse', '</div>', '\x20OVER</p>', 'riskLabel', 'tailwind-app.css', 'text/javascript', 'fillText', 'close', 'doing', 'deleteDatabase', 'trim', 'I\x27d\x20go\x20ahead\x20—\x20it\x27s\x20safe.\x20Log\x20it\x20properly.', 'amount', 'I\x27m\x20Travis,\x20your\x20financial\x20advisor.\x20What\x20specific\x20money\x20decision\x20or\x20problem\x20do\x20you\x20want\x20me\x20to\x20analyze?', 'Payroll', '<div\x20class=\x22text-left\x20flex\x20gap-2\x22><div\x20class=\x22text-[#4ade80]\x20font-black\x20text-[10px]\x20mt-1\x22>TRV:</div><span\x20class=\x22travis-msg\x20text-sm\x20inline-block\x22>', 'backupHandle', 'done', '5719842FAxevo'];
    _0x5582 = function() {
        return _0x13eee0;
    };
    return _0x5582();
}
async function finalizeSetup() {
    const _0x1ec57b = _0x3b7550,
        _0x47d9a5 = document[_0x1ec57b(0x1aa)]('user-name')[_0x1ec57b(0x34d)],
        _0x2e2ab4 = Array[_0x1ec57b(0x331)](document['querySelectorAll'](_0x1ec57b(0x282)))['map'](_0xf6f1f4 => ({
            'label': _0xf6f1f4['querySelectorAll'](_0x1ec57b(0x2b1))[0x0][_0x1ec57b(0x34d)],
            'amount': parseFloat(_0xf6f1f4[_0x1ec57b(0x290)](_0x1ec57b(0x2b1))[0x1][_0x1ec57b(0x34d)]) || 0x0
        }))['filter'](_0x4b387e => _0x4b387e[_0x1ec57b(0x2a7)]);
    if (!_0x47d9a5 || !state[_0x1ec57b(0x338)]) return showCustomAlert('System\x20requires\x20ID.');
    state['user'] = {
        'name': _0x47d9a5,
        'type': state[_0x1ec57b(0x338)]
    }, state[_0x1ec57b(0x344)] = _0x2e2ab4, await saveData(_0x1ec57b(0x1d6), {
        'id': 'config',
        'user': state['user'],
        'obligations': state[_0x1ec57b(0x344)]
    }), typeof saveBackup === _0x1ec57b(0x2ca) && await saveBackup(), location['reload']();
}
async function factoryReset() {
    const _0x37dab1 = _0x3b7550;
    confirm(_0x37dab1(0x2b0)) && (indexedDB[_0x37dab1(0x255)](_0x37dab1(0x1e4)), location['reload']());
}
async function boot() {
    const _0x476d55 = _0x3b7550;
    startFingerprintBackgroundProbe(), await initDB();
    const _0x46a9ec = await getData('meta', _0x476d55(0x26d));
    _0x46a9ec ? (state['user'] = _0x46a9ec[_0x476d55(0x31b)], state['obligations'] = _0x46a9ec[_0x476d55(0x344)], state[_0x476d55(0x315)] = (await getAllData('tx'))[_0x476d55(0x2e4)]((_0x424605, _0x1aafc4) => _0x1aafc4['id'] - _0x424605['id']), document['getElementById'](_0x476d55(0x311))[_0x476d55(0x27a)] = state[_0x476d55(0x31b)][_0x476d55(0x274)], document[_0x476d55(0x1aa)](_0x476d55(0x216))[_0x476d55(0x27a)] = state[_0x476d55(0x31b)][_0x476d55(0x27d)] + _0x476d55(0x285), nav(_0x476d55(0x2bf))) : document[_0x476d55(0x1aa)](_0x476d55(0x26a))[_0x476d55(0x1d7)][_0x476d55(0x30c)](_0x476d55(0x2b3));
}
async function saveData(_0x30826c, _0x3d8442) {
    const _0x1c68c6 = _0x3b7550,
        _0x1f4a1a = db[_0x1c68c6(0x206)](_0x30826c, _0x1c68c6(0x2a1));
    return _0x1f4a1a['objectStore'](_0x30826c)[_0x1c68c6(0x2c0)](_0x3d8442), new Promise(_0x79b0db => _0x1f4a1a[_0x1c68c6(0x1f3)] = _0x79b0db);
}
async function getData(_0x5ea9cf, _0x32aa4a) {
    const _0x27e352 = _0x3b7550,
        _0x133670 = db[_0x27e352(0x206)](_0x5ea9cf, 'readonly'),
        _0x260bbe = _0x133670[_0x27e352(0x36e)](_0x5ea9cf)[_0x27e352(0x2ce)](_0x32aa4a);
    return new Promise(_0x52bce9 => _0x260bbe[_0x27e352(0x1f7)] = () => _0x52bce9(_0x260bbe['result']));
}
async function getAllData(_0x39f756) {
    const _0x5c8c88 = _0x3b7550,
        _0x158f1c = db[_0x5c8c88(0x206)](_0x39f756, _0x5c8c88(0x1ec)),
        _0x1f8e0f = _0x158f1c[_0x5c8c88(0x36e)](_0x39f756)[_0x5c8c88(0x28c)]();
    return new Promise(_0x438ddd => _0x1f8e0f[_0x5c8c88(0x1f7)] = () => _0x438ddd(_0x1f8e0f[_0x5c8c88(0x34b)]));
}

function closeTxModal() {
    const _0x5b3712 = _0x3b7550;
    document[_0x5b3712(0x1aa)](_0x5b3712(0x22a))['classList'][_0x5b3712(0x31c)](_0x5b3712(0x2b3)), document[_0x5b3712(0x1aa)](_0x5b3712(0x2ab))['value'] = '';
}
window[_0x3b7550(0x275)] = boot;
async function boot() {
    const _0x47e90d = _0x3b7550;
    await initDB();
    let _0xf182d7 = await getData(_0x47e90d(0x1d6), _0x47e90d(0x26d)) || {
        'activated': ![]
    };
    const _0x23bc37 = window[_0x47e90d(0x295)](_0x47e90d(0x20b))[_0x47e90d(0x286)] || navigator[_0x47e90d(0x351)] === !![];
    await new Promise(_0x2ccfe1 => setTimeout(_0x2ccfe1, 0x320));
    if (!_0xf182d7[_0x47e90d(0x2bb)]) _0x23bc37 ? (document[_0x47e90d(0x1aa)](_0x47e90d(0x260))[_0x47e90d(0x1d7)][_0x47e90d(0x30c)](_0x47e90d(0x2b3)), document['getElementById'](_0x47e90d(0x2a3))[_0x47e90d(0x1d7)][_0x47e90d(0x31c)](_0x47e90d(0x2b3)), document[_0x47e90d(0x1aa)]('app')[_0x47e90d(0x1d7)]['add'](_0x47e90d(0x2b3))) : (document['getElementById'](_0x47e90d(0x2a3))[_0x47e90d(0x1d7)][_0x47e90d(0x30c)](_0x47e90d(0x2b3)), document['getElementById']('activation-overlay')['classList'][_0x47e90d(0x31c)]('hidden'), document[_0x47e90d(0x1aa)](_0x47e90d(0x23f))[_0x47e90d(0x1d7)][_0x47e90d(0x31c)](_0x47e90d(0x2b3)));
    else !_0xf182d7[_0x47e90d(0x31b)] ? (document[_0x47e90d(0x1aa)](_0x47e90d(0x26a))[_0x47e90d(0x1d7)]['remove']('hidden'), document[_0x47e90d(0x1aa)](_0x47e90d(0x2a3))[_0x47e90d(0x1d7)][_0x47e90d(0x31c)](_0x47e90d(0x2b3)), document['getElementById'](_0x47e90d(0x23f))[_0x47e90d(0x1d7)][_0x47e90d(0x31c)]('hidden')) : (state[_0x47e90d(0x31b)] = _0xf182d7[_0x47e90d(0x31b)], state[_0x47e90d(0x344)] = _0xf182d7[_0x47e90d(0x344)], state[_0x47e90d(0x315)] = (await getAllData('tx'))[_0x47e90d(0x2e4)]((_0x46ea54, _0x383ea9) => _0x383ea9['id'] - _0x46ea54['id']), document['getElementById'](_0x47e90d(0x311))[_0x47e90d(0x27a)] = state[_0x47e90d(0x31b)][_0x47e90d(0x274)], document[_0x47e90d(0x1aa)](_0x47e90d(0x216))[_0x47e90d(0x27a)] = state[_0x47e90d(0x31b)][_0x47e90d(0x27d)] + _0x47e90d(0x285), document[_0x47e90d(0x1aa)](_0x47e90d(0x23f))[_0x47e90d(0x1d7)]['remove']('hidden'), document[_0x47e90d(0x1aa)](_0x47e90d(0x2a3))[_0x47e90d(0x1d7)][_0x47e90d(0x31c)](_0x47e90d(0x2b3)), document[_0x47e90d(0x1aa)]('setup-overlay')[_0x47e90d(0x1d7)][_0x47e90d(0x31c)]('hidden'), nav(_0x47e90d(0x2bf)));
}
document[_0x3b7550(0x1aa)]('install-btn')?.[_0x3b7550(0x249)](_0x3b7550(0x330), triggerInstall), window[_0x3b7550(0x275)] = boot;
