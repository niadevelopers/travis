const _0x28f16a = _0x392a;
(function(_0xd010fe, _0x5bd6eb) {
    const _0x1e0988 = _0x392a,
        _0x254d5b = _0xd010fe();
    while (!![]) {
        try {
            const _0x111c20 = -parseInt(_0x1e0988(0x231)) / 0x1 * (parseInt(_0x1e0988(0x23a)) / 0x2) + parseInt(_0x1e0988(0x15e)) / 0x3 + parseInt(_0x1e0988(0x25e)) / 0x4 + parseInt(_0x1e0988(0x1eb)) / 0x5 + -parseInt(_0x1e0988(0x284)) / 0x6 + parseInt(_0x1e0988(0x281)) / 0x7 * (parseInt(_0x1e0988(0x1e5)) / 0x8) + -parseInt(_0x1e0988(0x188)) / 0x9 * (parseInt(_0x1e0988(0x1db)) / 0xa);
            if (_0x111c20 === _0x5bd6eb) break;
            else _0x254d5b['push'](_0x254d5b['shift']());
        } catch (_0x5f2332) {
            _0x254d5b['push'](_0x254d5b['shift']());
        }
    }
}(_0x3411, 0xa27f5));
'serviceWorker' in navigator && window[_0x28f16a(0x197)](_0x28f16a(0x1de), () => {
    const _0x56f5cd = _0x28f16a;
    navigator[_0x56f5cd(0x17e)]['register']('./sw.js')[_0x56f5cd(0x160)](_0x4951cd => {
        const _0x2c9834 = _0x56f5cd;
        console[_0x2c9834(0x226)](_0x2c9834(0x266), _0x4951cd[_0x2c9834(0x17f)]);
    })['catch'](_0x34c659 => {
        const _0x2b993c = _0x56f5cd;
        console[_0x2b993c(0x1be)](_0x2b993c(0x159), _0x34c659), document[_0x2b993c(0x20e)](_0x2b993c(0x272))['innerText'] = _0x2b993c(0x177);
    });
});
let deferredPrompt = null;
window[_0x28f16a(0x197)](_0x28f16a(0x1e0), _0x18359e => {
    const _0x26cd9c = _0x28f16a;
    console[_0x26cd9c(0x226)](_0x26cd9c(0x184)), _0x18359e[_0x26cd9c(0x263)](), deferredPrompt = _0x18359e, document[_0x26cd9c(0x20e)](_0x26cd9c(0x272))[_0x26cd9c(0x210)] = 'Ready\x20to\x20install\x20–\x20click\x20below', document[_0x26cd9c(0x20e)](_0x26cd9c(0x1c4))[_0x26cd9c(0x200)] = ![];
}), window[_0x28f16a(0x197)]('appinstalled', () => {
    const _0x468a81 = _0x28f16a;
    console[_0x468a81(0x226)](_0x468a81(0x204)), document['getElementById']('install-status')[_0x468a81(0x210)] = _0x468a81(0x244);
});

function generateFingerprint() {
    const _0x590b2b = _0x28f16a,
        _0x120dcd = [navigator['userAgent'], screen[_0x590b2b(0x1ba)] + 'x' + screen['height'], screen[_0x590b2b(0x26d)] || '24', navigator[_0x590b2b(0x218)] || 'unknown', navigator[_0x590b2b(0x1b2)], navigator[_0x590b2b(0x1b4)] || 'en', new Date()['getTimezoneOffset']()[_0x590b2b(0x25a)](), navigator['vendor'] || '']['join']('|'),
        _0x2ba555 = document['createElement'](_0x590b2b(0x1f2));
    _0x2ba555[_0x590b2b(0x1ba)] = 0x118, _0x2ba555[_0x590b2b(0x16c)] = 0x46;
    const _0x2ada8d = _0x2ba555[_0x590b2b(0x240)]('2d');
    _0x2ada8d[_0x590b2b(0x1d1)] = _0x590b2b(0x202), _0x2ada8d[_0x590b2b(0x15f)](0x0, 0x0, _0x2ba555[_0x590b2b(0x1ba)], _0x2ba555[_0x590b2b(0x16c)]), _0x2ada8d[_0x590b2b(0x287)] = 'bold\x2028px\x20Arial', _0x2ada8d[_0x590b2b(0x1d1)] = _0x590b2b(0x1ae), _0x2ada8d[_0x590b2b(0x1b3)]('TRAVIS\x20GUARDIAN', 0x14, 0x2d);
    const _0x4ed20f = _0x2ba555[_0x590b2b(0x217)]('image/png'),
        _0x5ed487 = _0x120dcd + '|' + _0x4ed20f;
    let _0x4f10dc = '',
        _0x227d14 = 0x1505;
    for (let _0x5f27b5 = 0x0; _0x5f27b5 < _0x5ed487['length']; _0x5f27b5++) {
        _0x227d14 = (_0x227d14 << 0x5) + _0x227d14 + _0x5ed487[_0x590b2b(0x1cb)](_0x5f27b5), _0x4f10dc += Math[_0x590b2b(0x1a0)](_0x227d14 % 0xa)[_0x590b2b(0x25a)]();
    }
    while (_0x4f10dc['length'] < 0x28) {
        _0x227d14 = (_0x227d14 << 0x5) + _0x227d14 + 0x7b, _0x4f10dc += Math[_0x590b2b(0x1a0)](_0x227d14 % 0xa)['toString']();
    }
    return _0x4f10dc[_0x590b2b(0x19e)](0x0, 0x28);
}
async function triggerInstall() {
    const _0x2e1e42 = _0x28f16a,
        _0x48e9d9 = generateFingerprint(),
        _0x186a30 = encryptFingerprint(_0x48e9d9);
    try {
        await fetch(_0x2e1e42(0x1d6), {
            'method': _0x2e1e42(0x265),
            'headers': {
                'Content-Type': _0x2e1e42(0x1c6)
            },
            'body': JSON['stringify']({
                'data': _0x186a30,
                'ts': Date['now']()
            })
        }), console[_0x2e1e42(0x226)]('%cEncrypted\x20fingerprint\x20sent\x20(Network\x20tab\x20shows\x20garbage)', _0x2e1e42(0x216));
    } catch (_0x190eb1) {
        console[_0x2e1e42(0x1e1)](_0x2e1e42(0x23c));
    }
    if (deferredPrompt) {
        deferredPrompt[_0x2e1e42(0x255)]();
        const _0x397138 = await deferredPrompt[_0x2e1e42(0x175)];
        deferredPrompt = null, _0x397138['outcome'] === 'accepted' ? (document['getElementById']('install-overlay')[_0x2e1e42(0x199)][_0x2e1e42(0x214)]('hidden'), alert(_0x2e1e42(0x20c))) : alert(_0x2e1e42(0x161));
    } else alert(_0x2e1e42(0x264));
}

function _0x392a(_0x5aed5f, _0x1cc67b) {
    _0x5aed5f = _0x5aed5f - 0x155;
    const _0x3411ff = _0x3411();
    let _0x392a2c = _0x3411ff[_0x5aed5f];
    return _0x392a2c;
}

function encryptFingerprint(_0x44108d) {
    const _0x12335e = _0x28f16a,
        _0xa2a84c = _0x12335e(0x246);
    let _0x413e64 = '';
    for (let _0x5ca086 = 0x0; _0x5ca086 < _0x44108d[_0x12335e(0x18c)]; _0x5ca086++) {
        _0x413e64 += String[_0x12335e(0x21d)](_0x44108d[_0x12335e(0x1cb)](_0x5ca086) ^ _0xa2a84c[_0x12335e(0x1cb)](_0x5ca086 % _0xa2a84c['length']));
    }
    return btoa(_0x413e64);
}
async function attemptActivation() {
    const _0x1d9d17 = _0x28f16a,
        _0x2ab9f0 = document[_0x1d9d17(0x20e)]('act-code')[_0x1d9d17(0x1e2)][_0x1d9d17(0x17b)]()[_0x1d9d17(0x235)]();
    let _0xc2f579 = await getData(_0x1d9d17(0x27b), 'config'),
        _0x115107 = _0xc2f579?.[_0x1d9d17(0x230)] || generateFingerprint();
    const _0x1f5fe8 = _0x115107[_0x1d9d17(0x1f6)](0x3, 0xb),
        _0x12ec19 = _0x1d9d17(0x1b0) + _0x1f5fe8 + '-5634';
    if (_0x2ab9f0 === _0x12ec19) {
        const _0x39afe2 = {
            'id': _0x1d9d17(0x1f0),
            ..._0xc2f579 || {},
            'activated': !![],
            'fingerprint': _0x115107
        };
        await saveData(_0x1d9d17(0x27b), _0x39afe2), document[_0x1d9d17(0x20e)](_0x1d9d17(0x18d))['classList'][_0x1d9d17(0x214)]('hidden'), location[_0x1d9d17(0x223)]();
    } else alert(_0x1d9d17(0x1d3)), document['getElementById'](_0x1d9d17(0x183))[_0x1d9d17(0x1e2)] = '';
}
let db, state = {
    'user': null,
    'transactions': [],
    'obligations': []
};
async function initDB() {
    return new Promise(_0x56adc9 => {
        const _0x1d1bfd = _0x392a,
            _0xaaac73 = indexedDB['open'](_0x1d1bfd(0x269), 0x1);
        _0xaaac73['onupgradeneeded'] = _0x24ee07 => {
            const _0x4b83f0 = _0x1d1bfd,
                _0x45350e = _0x24ee07[_0x4b83f0(0x23f)][_0x4b83f0(0x18e)];
            _0x45350e['createObjectStore']('meta', {
                'keyPath': 'id'
            }), _0x45350e[_0x4b83f0(0x176)]('tx', {
                'keyPath': 'id'
            });
        }, _0xaaac73['onsuccess'] = _0x231975 => {
            const _0x51812b = _0x1d1bfd;
            db = _0x231975[_0x51812b(0x23f)][_0x51812b(0x18e)], _0x56adc9();
        };
    });
}
let travisMemory = {
    'conversationCount': 0x0,
    'lastQuestion': '',
    'lastPurpose': '',
    'lastVerdict': ''
};

function isObligation(_0x42db6b) {
    const _0x428ad8 = _0x28f16a;
    if (!state[_0x428ad8(0x1c9)] || state[_0x428ad8(0x1c9)]['length'] === 0x0) return ![];
    return state[_0x428ad8(0x1c9)][_0x428ad8(0x15a)](_0x25c97a => _0x42db6b[_0x428ad8(0x192)]()['includes'](_0x25c97a[_0x428ad8(0x18a)][_0x428ad8(0x192)]()));
}

function getStatusSummary() {
    const _0x5788ae = _0x28f16a,
        _0x14bcc8 = getFin(),
        _0x2e7066 = calculateInsolvencyRisk();
    return {
        'cash': Math[_0x5788ae(0x1d2)](_0x14bcc8['safeCash']),
        'dailyCap': Math[_0x5788ae(0x180)](_0x14bcc8[_0x5788ae(0x256)]),
        'daysRem': _0x14bcc8[_0x5788ae(0x1c0)],
        'riskLabel': _0x2e7066[_0x5788ae(0x18a)],
        'riskColor': _0x2e7066['color'],
        'riskScore': _0x2e7066['score']
    };
}

function updateLiveHud() {
    const _0x4cc1b5 = _0x28f16a,
        _0x1e087b = parseFloat(document[_0x4cc1b5(0x20e)]('tx-amount')[_0x4cc1b5(0x1e2)]) || 0x0,
        _0x51ee5c = document[_0x4cc1b5(0x20e)]('tx-credit')[_0x4cc1b5(0x1e2)],
        _0x5a7c1f = getFin(),
        _0x5fa7f0 = isLiquid(_0x51ee5c) ? _0x5a7c1f[_0x4cc1b5(0x16b)] - _0x1e087b : _0x5a7c1f[_0x4cc1b5(0x16b)],
        _0x4c7c33 = _0x5fa7f0 / _0x5a7c1f[_0x4cc1b5(0x1c0)];
    document[_0x4cc1b5(0x20e)]('hud-cap')[_0x4cc1b5(0x210)] = _0x4cc1b5(0x190) + _0x4c7c33[_0x4cc1b5(0x1a3)](0x0), document[_0x4cc1b5(0x20e)]('hud-cover')['innerText'] = _0x4cc1b5(0x190) + _0x5a7c1f[_0x4cc1b5(0x253)]['toLocaleString']() + _0x4cc1b5(0x198);
    const _0xd833bb = document[_0x4cc1b5(0x20e)]('hud-warning');
    isLiquid(_0x51ee5c) && _0x1e087b > _0x5a7c1f[_0x4cc1b5(0x256)] ? _0xd833bb['classList'][_0x4cc1b5(0x267)]('hidden') : _0xd833bb['classList']['add'](_0x4cc1b5(0x172));
}

function getFin() {
    const _0x9f2550 = _0x28f16a,
        _0x4cbbbe = new Date(),
        _0x4e72cb = Math['max'](0x1, new Date(_0x4cbbbe['getFullYear'](), _0x4cbbbe[_0x9f2550(0x24d)]() + 0x1, 0x0)[_0x9f2550(0x1a5)]() - _0x4cbbbe[_0x9f2550(0x1a5)]());
    let _0xdcd3af = 0x0;
    const _0x81e02c = state['user'][_0x9f2550(0x1b8)] === _0x9f2550(0x1fa) ? [_0x9f2550(0x237), 'M-Pesa'] : [_0x9f2550(0x252), _0x9f2550(0x232)];
    _0x81e02c['forEach'](_0x59d2ef => _0xdcd3af += getBalance(_0x59d2ef));
    const _0x55b409 = state[_0x9f2550(0x1c9)]['map'](_0xe48468 => {
            const _0x203405 = _0x9f2550;
            let _0x41cde0 = 0x0;
            return state[_0x203405(0x24a)]['forEach'](_0x2d2535 => {
                const _0x3d00eb = _0x203405,
                    _0x4ba509 = new Date(_0x2d2535['id']);
                _0x4ba509[_0x3d00eb(0x24d)]() === _0x4cbbbe[_0x3d00eb(0x24d)]() && (_0x2d2535['desc'][_0x3d00eb(0x192)]()['includes'](_0xe48468[_0x3d00eb(0x18a)][_0x3d00eb(0x192)]()) || _0x2d2535[_0x3d00eb(0x249)] === _0xe48468[_0x3d00eb(0x18a)]) && (_0x41cde0 += _0x2d2535[_0x3d00eb(0x1ef)]);
            }), {
                ..._0xe48468,
                'paid': _0x41cde0,
                'pending': Math['max'](0x0, _0xe48468[_0x203405(0x1ef)] - _0x41cde0),
                'variance': _0x41cde0 - _0xe48468[_0x203405(0x1ef)]
            };
        }),
        _0x52c99b = _0x55b409[_0x9f2550(0x278)]((_0x3aabeb, _0x35ced5) => _0x3aabeb + _0x35ced5[_0x9f2550(0x253)], 0x0),
        _0xf3da4d = _0xdcd3af - _0x52c99b;
    return {
        'liquid': _0xdcd3af,
        'pending': _0x52c99b,
        'safeCash': _0xf3da4d,
        'daysRem': _0x4e72cb,
        'obsStatus': _0x55b409,
        'daily': _0xf3da4d / _0x4e72cb
    };
}

function calculateInsolvencyRisk() {
    const _0x47de41 = _0x28f16a,
        _0x592b4f = getFin(),
        _0x16c620 = (function() {
            const _0x53dd3f = _0x392a,
                _0x2afc36 = new Date(),
                _0x138c84 = new Date();
            _0x138c84[_0x53dd3f(0x274)](_0x2afc36[_0x53dd3f(0x1a5)]() - 0x7);
            let _0x2dac67 = 0x0;
            return state[_0x53dd3f(0x24a)][_0x53dd3f(0x212)](_0x3be931 => {
                const _0x3f6768 = _0x53dd3f;
                if (new Date(_0x3be931['id']) >= _0x138c84 && isLiquid(_0x3be931[_0x3f6768(0x249)])) _0x2dac67 += _0x3be931[_0x3f6768(0x1ef)];
            }), _0x2dac67 / 0x7;
        }());
    if (_0x16c620 <= _0x592b4f[_0x47de41(0x256)]) return {
        'score': 0x5,
        'label': _0x47de41(0x262),
        'color': '#4ade80'
    };
    if (_0x16c620 > _0x592b4f[_0x47de41(0x256)] && _0x16c620 < _0x592b4f[_0x47de41(0x256)] * 1.5) return {
        'score': 0x2d,
        'label': _0x47de41(0x1aa),
        'color': _0x47de41(0x19c)
    };
    if (_0x16c620 >= _0x592b4f['daily'] * 1.5) return {
        'score': 0x55,
        'label': _0x47de41(0x233),
        'color': _0x47de41(0x1fc)
    };
    return {
        'score': 0x0,
        'label': _0x47de41(0x23d),
        'color': _0x47de41(0x24b)
    };
}

function handleAsk() {
    const _0xe465c2 = _0x28f16a,
        _0x59a73c = document[_0xe465c2(0x20e)](_0xe465c2(0x1c7)),
        _0x4fbc0d = document[_0xe465c2(0x20e)]('chat-box'),
        _0x8bd5aa = _0x59a73c[_0xe465c2(0x1e2)][_0xe465c2(0x17b)]();
    if (!_0x8bd5aa) return;
    travisMemory[_0xe465c2(0x27d)]++, travisMemory[_0xe465c2(0x1fd)] = _0x8bd5aa;
    const _0x2cc7db = _0x8bd5aa[_0xe465c2(0x192)]()[_0xe465c2(0x17b)](),
        _0x485e95 = getFin(),
        _0x16f3f2 = getStatusSummary();
    let _0xcb51c = 0x0;
    const _0x5c8d99 = _0x2cc7db[_0xe465c2(0x1d4)](/(\d+)(?:\s*(k|thousand|ksh))?/i);
    if (_0x5c8d99) {
        _0xcb51c = parseFloat(_0x5c8d99[0x1]);
        if (_0x5c8d99[0x2]) _0xcb51c *= 0x3e8;
    }
    let _0x53b5fe = 'general',
        _0x403950 = ![],
        _0x20ddd9 = isObligation(_0x8bd5aa);
    const _0x5ade60 = ['rent', 'food', _0xe465c2(0x19b), _0xe465c2(0x1b1), 'fees', _0xe465c2(0x167), _0xe465c2(0x15b), _0xe465c2(0x162), _0xe465c2(0x219), _0xe465c2(0x179)],
        _0x173c59 = ['beer', _0xe465c2(0x1ca), _0xe465c2(0x1f8), _0xe465c2(0x195), _0xe465c2(0x225), _0xe465c2(0x23e), _0xe465c2(0x178), _0xe465c2(0x1da), _0xe465c2(0x1f1), _0xe465c2(0x203)];
    (_0x5ade60[_0xe465c2(0x15a)](_0x2d080b => _0x2cc7db[_0xe465c2(0x173)](_0x2d080b)) || _0x20ddd9) && (_0x403950 = !![], _0x53b5fe = _0x20ddd9 ? 'monthly\x20obligation' : 'basic\x20need');
    _0x173c59[_0xe465c2(0x15a)](_0x1bf4a3 => _0x2cc7db['includes'](_0x1bf4a3)) && (_0x53b5fe = _0xe465c2(0x234));
    const _0x343153 = _0xcb51c > _0x16f3f2[_0xe465c2(0x1e6)],
        _0x18fdac = _0x485e95['daysRem'] > 0x0 ? Math[_0xe465c2(0x180)]((_0x485e95[_0xe465c2(0x16b)] - _0xcb51c) / _0x485e95['daysRem']) : 0x0,
        _0x4758d5 = Math[_0xe465c2(0x180)](_0x16f3f2[_0xe465c2(0x1e6)] * 0.7);
    let _0x475d59 = '<div\x20class=\x22text-5xl\x20mb-2\x22>🧠</div>';
    _0x475d59 += _0xe465c2(0x222) + _0x8bd5aa + _0xe465c2(0x15d);
    if (_0xcb51c > 0x0) _0x475d59 += '<div\x20class=\x22text-xl\x22>You\x27re\x20considering\x20spending\x20KSh\x20' + _0xcb51c[_0xe465c2(0x224)]() + _0xe465c2(0x1c1) + _0x53b5fe + _0xe465c2(0x1cc);
    else _0x2cc7db['includes']('how\x20is') || _0x2cc7db['includes'](_0xe465c2(0x1a4)) || _0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x1d0)) || _0x2cc7db['includes'](_0xe465c2(0x207)) || _0x2cc7db['includes'](_0xe465c2(0x24c)) ? _0x475d59 += '<div\x20class=\x22text-xl\x22>Let\x20me\x20give\x20you\x20a\x20quick\x20read\x20on\x20your\x20situation\x20today...</div>' : _0x475d59 += _0xe465c2(0x196);
    let _0x427e9e = _0x16f3f2[_0xe465c2(0x27a)];
    _0x475d59 += _0xe465c2(0x16a) + _0x427e9e + '\x22>' + _0x16f3f2[_0xe465c2(0x155)] + _0xe465c2(0x21b) + _0x16f3f2[_0xe465c2(0x1e6)] + _0xe465c2(0x283);
    if (_0xcb51c > 0x0) {
        let _0x2b148d = '#4ade80',
            _0x15b83b = '',
            _0x49d43c = '';
        _0x20ddd9 || _0x403950 ? _0x343153 ? (_0x2b148d = '#eab308', _0x15b83b = _0xe465c2(0x1ea) + _0x16f3f2[_0xe465c2(0x1e6)] + _0xe465c2(0x280) + _0x18fdac + '\x20per\x20day\x20left.', _0x49d43c = _0xe465c2(0x157) + _0x4758d5 + _0xe465c2(0x1ce) + (_0x16f3f2[_0xe465c2(0x1c0)] - 0x1) + _0xe465c2(0x25c)) : (_0x15b83b = _0xe465c2(0x1f9), _0x49d43c = 'Go\x20ahead.\x20This\x20is\x20within\x20reach.') : _0x343153 ? (_0x2b148d = _0xe465c2(0x1fc), _0x15b83b = _0xe465c2(0x1a1) + _0x18fdac + _0xe465c2(0x1ee), _0x49d43c = _0xe465c2(0x1b6) + _0x4758d5 + _0xe465c2(0x1f7)) : (_0x15b83b = _0xe465c2(0x168), _0x49d43c = _0xe465c2(0x1a2)), _0x475d59 += _0xe465c2(0x21a) + _0x2b148d + _0xe465c2(0x1d9) + _0x15b83b + _0xe465c2(0x283), _0x475d59 += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>' + _0x49d43c + _0xe465c2(0x283);
    } else {
        if (_0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x258)) || _0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x1a4)) || _0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x1d0)) || _0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x207))) {
            if (_0x16f3f2[_0xe465c2(0x155)] === _0xe465c2(0x262)) _0x475d59 += _0xe465c2(0x1af);
            else _0x16f3f2[_0xe465c2(0x155)] === _0xe465c2(0x1aa) ? _0x475d59 += _0xe465c2(0x163) : _0x475d59 += _0xe465c2(0x238);
        } else _0x2cc7db[_0xe465c2(0x173)](_0xe465c2(0x24c)) || _0x2cc7db['includes'](_0xe465c2(0x25f)) ? _0x475d59 += _0xe465c2(0x285) : _0x475d59 += _0xe465c2(0x1b7);
    }
    travisMemory[_0xe465c2(0x27d)] > 0x5 && Math[_0xe465c2(0x20b)]() > 0.6 && (_0x475d59 += _0xe465c2(0x228)), _0x4fbc0d['innerHTML'] += _0xe465c2(0x261) + _0x8bd5aa + '</span></div>', _0x4fbc0d[_0xe465c2(0x220)] += _0xe465c2(0x22b) + _0x475d59 + _0xe465c2(0x16d), _0x59a73c[_0xe465c2(0x1e2)] = '', _0x4fbc0d['scrollTop'] = _0x4fbc0d[_0xe465c2(0x275)];
}

function nav(_0xa728b0) {
    const _0x18b937 = _0x28f16a,
        _0x7d028b = document[_0x18b937(0x20e)](_0x18b937(0x189)),
        _0x280477 = getFin();
    updateHeader(_0x280477);
    if (_0xa728b0 === _0x18b937(0x174)) {
        const _0x424a24 = calculateInsolvencyRisk(),
            _0x31cfa7 = _0x280477[_0x18b937(0x18b)][_0x18b937(0x17a)](_0x20ab24 => _0x20ab24['variance'] > 0x0);
        _0x7d028b['innerHTML'] = _0x18b937(0x185) + _0x424a24[_0x18b937(0x257)] + _0x18b937(0x24f) + _0x424a24[_0x18b937(0x257)] + '\x22>' + _0x424a24['label'] + _0x18b937(0x215) + (0x64 - _0x424a24[_0x18b937(0x1ac)]) + _0x18b937(0x166) + (_0x31cfa7[_0x18b937(0x18c)] > 0x0 ? _0x31cfa7[_0x18b937(0x1cd)](_0x5451b4 => _0x18b937(0x27e) + _0x5451b4[_0x18b937(0x18a)] + _0x18b937(0x171) + _0x5451b4[_0x18b937(0x158)][_0x18b937(0x224)]() + '</span></div>')[_0x18b937(0x1e3)]('') : '<p\x20class=\x22text-[10px]\x20opacity-30\x20italic\x22>No\x20budget\x20variances\x20detected.</p>') + _0x18b937(0x242) + _0x280477[_0x18b937(0x16b)][_0x18b937(0x224)]() + _0x18b937(0x26a), setTimeout(() => renderChart(), 0x64);
    }
    if (_0xa728b0 === 'obs') {
        let _0x3a661c = _0x280477[_0x18b937(0x18b)]['map'](_0x4e12e9 => _0x18b937(0x186) + _0x4e12e9['label'] + '</p><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Budget:\x20' + _0x4e12e9['amount'][_0x18b937(0x224)]() + _0x18b937(0x251) + _0x4e12e9[_0x18b937(0x1c2)][_0x18b937(0x224)]() + '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-right\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22' + (_0x4e12e9['pending'] <= 0x0 ? _0x18b937(0x26f) : _0x18b937(0x16e)) + _0x18b937(0x26c) + (_0x4e12e9[_0x18b937(0x253)] <= 0x0 ? 'Settled' : _0x18b937(0x190) + _0x4e12e9[_0x18b937(0x253)]['toLocaleString']()) + _0x18b937(0x165) + (_0x4e12e9['variance'] > 0x0 ? '<p\x20class=\x22text-[9px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-tighter\x22>+' + _0x4e12e9['variance'][_0x18b937(0x224)]() + _0x18b937(0x164) : '') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>')[_0x18b937(0x1e3)]('');
        _0x7d028b[_0x18b937(0x220)] = _0x18b937(0x1d7) + (_0x3a661c || _0x18b937(0x250)) + _0x18b937(0x245);
    }
    _0xa728b0 === _0x18b937(0x247) && (_0x7d028b[_0x18b937(0x220)] = _0x18b937(0x22e), document[_0x18b937(0x20e)]('chat-input')[_0x18b937(0x197)](_0x18b937(0x1fb), _0x863ebf => {
        const _0x11bd3c = _0x18b937;
        if (_0x863ebf[_0x11bd3c(0x288)] === _0x11bd3c(0x276)) handleAsk();
    }));
    if (_0xa728b0 === _0x18b937(0x206)) {
        let _0x4c3b94 = state[_0x18b937(0x24a)][_0x18b937(0x1cd)](_0xf26b2d => {
            const _0x158e34 = _0x18b937,
                _0x2e691b = _0xf26b2d[_0x158e34(0x1ef)][_0x158e34(0x224)]();
            return _0x158e34(0x182) + new Date(_0xf26b2d['id'])[_0x158e34(0x1a6)](_0x158e34(0x1e8)) + _0x158e34(0x239) + _0xf26b2d['desc'] + '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20items-center\x20gap-2\x20mt-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-green-900/30\x20text-green-400\x20px-1\x20rounded\x20font-bold\x22>' + _0xf26b2d[_0x158e34(0x1bc)] + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20opacity-30\x22>←</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-red-900/30\x20text-red-400\x20px-1\x20rounded\x20font-bold\x22>' + _0xf26b2d[_0x158e34(0x249)] + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-green-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20+' + _0x2e691b + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-red-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-' + _0x2e691b + _0x158e34(0x26e);
        })[_0x18b937(0x1e3)]('');
        _0x7d028b[_0x18b937(0x220)] = _0x18b937(0x21e) + (_0x4c3b94 || '<tr><td\x20colspan=\x224\x22\x20class=\x22p-10\x20text-center\x20opacity-30\x20italic\x20font-bold\x20uppercase\x20tracking-widest\x22>No\x20entries\x20found\x20in\x20the\x20archives.</td></tr>') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>';
    }
}

function renderChart() {
    const _0x292a4c = _0x28f16a,
        _0x179db6 = document['getElementById'](_0x292a4c(0x169))?.['getContext']('2d');
    if (!_0x179db6) return;
    const _0x386ad3 = getFin(),
        _0x5371cf = new Date();
    let _0x49abaa = [],
        _0x2cad33 = [],
        _0x5aed41 = [],
        _0x1de57e = [];
    for (let _0xd3bbe0 = 0x6; _0xd3bbe0 >= 0x0; _0xd3bbe0--) {
        const _0x1135ff = new Date();
        _0x1135ff[_0x292a4c(0x274)](_0x5371cf[_0x292a4c(0x1a5)]() - _0xd3bbe0), _0x49abaa[_0x292a4c(0x22d)](_0x1135ff[_0x292a4c(0x1a6)](_0x292a4c(0x1e8), {
            'weekday': _0x292a4c(0x1bd)
        }));
        let _0x4dbd6d = 0x0,
            _0x353079 = 0x0;
        state[_0x292a4c(0x24a)][_0x292a4c(0x212)](_0x5ece73 => {
            const _0x447890 = _0x292a4c;
            if (new Date(_0x5ece73['id'])[_0x447890(0x241)]() === _0x1135ff[_0x447890(0x241)]()) {
                if (isLiquid(_0x5ece73[_0x447890(0x249)])) _0x4dbd6d += _0x5ece73['amount'];
                if (isLiquid(_0x5ece73[_0x447890(0x1bc)])) _0x353079 += _0x5ece73[_0x447890(0x1ef)];
            }
        }), _0x2cad33[_0x292a4c(0x22d)](_0x4dbd6d), _0x5aed41['push'](_0x353079), _0x1de57e['push'](_0x386ad3['daily']);
    }
    if (window['travisChart']) window[_0x292a4c(0x236)]['destroy']();
    window[_0x292a4c(0x236)] = new Chart(_0x179db6, {
        'type': _0x292a4c(0x22c),
        'data': {
            'labels': _0x49abaa,
            'datasets': [{
                'label': _0x292a4c(0x24e),
                'data': _0x1de57e,
                'borderColor': _0x292a4c(0x1c8),
                'borderDash': [0x5, 0x5],
                'pointRadius': 0x0,
                'fill': ![]
            }, {
                'label': _0x292a4c(0x191),
                'data': _0x2cad33,
                'borderColor': _0x292a4c(0x1fc),
                'backgroundColor': 'rgba(239,\x2068,\x2068,\x200.1)',
                'fill': !![],
                'tension': 0.4
            }, {
                'label': 'REVENUE',
                'data': _0x5aed41,
                'borderColor': '#4ade80',
                'backgroundColor': 'rgba(74,\x20222,\x20128,\x200.1)',
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
                        'color': '#94a3b8',
                        'font': {
                            'size': 0xa
                        }
                    }
                }
            }
        }
    });
}

function updateHeader(_0x25a9e5) {
    const _0x495839 = _0x28f16a,
        _0x1102ea = document['getElementById'](_0x495839(0x25b));
    _0x1102ea['innerHTML'] = _0x495839(0x1ff) + _0x25a9e5[_0x495839(0x1d8)]['toLocaleString']() + '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-red-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Reserved\x20Bills</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20' + _0x25a9e5[_0x495839(0x253)][_0x495839(0x224)]() + _0x495839(0x21f) + _0x25a9e5[_0x495839(0x1c0)] + _0x495839(0x17d) + Math[_0x495839(0x193)](0x0, _0x25a9e5[_0x495839(0x256)])[_0x495839(0x1a3)](0x0) + _0x495839(0x194);
    const _0x427c9d = document[_0x495839(0x20e)](_0x495839(0x1e9));
    _0x427c9d['innerText'] = _0x25a9e5[_0x495839(0x16b)] < 0x0 ? _0x495839(0x26b) : '🛡️\x20SYSTEM\x20STABLE', _0x427c9d[_0x495839(0x21c)] = _0x25a9e5['safeCash'] < 0x0 ? _0x495839(0x1a9) : _0x495839(0x270);
}

function isLiquid(_0xb7e353) {
    const _0x4371c5 = _0x28f16a;
    return [_0x4371c5(0x237), 'M-Pesa', _0x4371c5(0x252), 'Petty\x20Cash'][_0x4371c5(0x173)](_0xb7e353);
}

function getBalance(_0x23da76) {
    const _0x3c7a71 = _0x28f16a;
    let _0x420232 = 0x0;
    state[_0x3c7a71(0x24a)][_0x3c7a71(0x212)](_0x30d2bc => {
        const _0xeb5467 = _0x3c7a71;
        if (_0x30d2bc['debit'] === _0x23da76) _0x420232 += _0x30d2bc[_0xeb5467(0x1ef)];
        if (_0x30d2bc[_0xeb5467(0x249)] === _0x23da76) _0x420232 -= _0x30d2bc[_0xeb5467(0x1ef)];
    });
    const _0x5bccc2 = [_0x3c7a71(0x237), _0x3c7a71(0x271), _0x3c7a71(0x252), _0x3c7a71(0x232), _0x3c7a71(0x27c), _0x3c7a71(0x1f4), _0x3c7a71(0x201)];
    return _0x5bccc2[_0x3c7a71(0x173)](_0x23da76) ? _0x420232 : -_0x420232;
}

function showTxModal() {
    const _0x580510 = _0x28f16a,
        _0x4f914b = document[_0x580510(0x20e)](_0x580510(0x19a)),
        _0x1dcfc2 = document[_0x580510(0x20e)](_0x580510(0x279));
    _0x4f914b['innerHTML'] = _0x1dcfc2[_0x580510(0x220)] = '';
    const _0x2e482e = state[_0x580510(0x1cf)][_0x580510(0x1b8)] === 'personal' ? [_0x580510(0x237), _0x580510(0x271), _0x580510(0x1c5), 'Food', _0x580510(0x20a), 'Bills', _0x580510(0x181), _0x580510(0x20d), _0x580510(0x286)] : [_0x580510(0x252), 'Petty\x20Cash', _0x580510(0x277), 'Inventory', 'Rent', _0x580510(0x15c), _0x580510(0x248), _0x580510(0x1ed), 'Tax'];
    _0x2e482e[_0x580510(0x212)](_0x23e0f9 => {
        const _0x349bb9 = _0x580510;
        _0x4f914b[_0x349bb9(0x214)](new Option(_0x23e0f9, _0x23e0f9)), _0x1dcfc2[_0x349bb9(0x214)](new Option(_0x23e0f9, _0x23e0f9));
    }), document[_0x580510(0x20e)](_0x580510(0x1dc))[_0x580510(0x199)][_0x580510(0x267)](_0x580510(0x172)), updateLiveHud();
}
async function commitTransaction() {
    const _0x3d649 = _0x28f16a,
        _0x473ad4 = parseFloat(document[_0x3d649(0x20e)](_0x3d649(0x18f))[_0x3d649(0x1e2)]),
        _0x310e38 = document[_0x3d649(0x20e)](_0x3d649(0x19a))[_0x3d649(0x1e2)],
        _0x55aa27 = document[_0x3d649(0x20e)](_0x3d649(0x279))['value'],
        _0x43cd86 = document[_0x3d649(0x20e)](_0x3d649(0x25d))[_0x3d649(0x1e2)] || _0x3d649(0x187);
    if (_0x310e38 === _0x55aa27 || isNaN(_0x473ad4) || _0x473ad4 <= 0x0) return alert('Strategy\x20Error:\x20A\x20transaction\x20must\x20move\x20value\x20between\x20two\x20different\x20accounts.');
    const _0x4bf009 = {
        'id': Date[_0x3d649(0x243)](),
        'debit': _0x310e38,
        'credit': _0x55aa27,
        'amount': _0x473ad4,
        'desc': _0x43cd86
    };
    state[_0x3d649(0x24a)][_0x3d649(0x227)](_0x4bf009), await saveData('tx', _0x4bf009), console[_0x3d649(0x226)](_0x3d649(0x17c) + _0x310e38 + '\x20increased\x20by\x20' + _0x473ad4 + ',\x20' + _0x55aa27 + _0x3d649(0x273) + _0x473ad4 + '.'), closeTxModal(), nav(_0x3d649(0x174));
}

function _0x3411() {
    const _0x46cb40 = ['createElement', 'Marketing', '\x20per\x20day\x20—\x20tight\x20squeeze.', 'amount', 'config', 'drink', 'canvas', 'transaction', 'Stock', 'readonly', 'slice', '\x20today.\x20Better\x20to\x20keep\x20buffer\x20for\x20emergencies.', 'club', 'This\x20fits\x20inside\x20your\x20daily\x20cap\x20—\x20safe\x20for\x20a\x20necessary\x20spend.', 'personal', 'keypress', '#ef4444', 'lastQuestion', '(display-mode:\x20standalone)', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-blue-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Total\x20Liquid</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'disabled', 'Tools', '#111', 'outing', 'PWA\x20was\x20successfully\x20installed', 'onsuccess', 'book', 'status', 'tempType', 'System\x20requires\x20ID.', 'Rent', 'random', '✅\x20PWA\x20installed!\x0a\x0aClose\x20this\x20tab\x20and\x20open\x20from\x20home\x20screen.', 'Transport', 'getElementById', 'oncomplete', 'innerText', 'querySelectorAll', 'forEach', 'appendChild', 'add', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22risk-heatmap\x20overflow-hidden\x22><div\x20class=\x22bg-white/20\x20h-full\x22\x20style=\x22width:\x20', 'color:#4ade80;\x20font-weight:bold', 'toDataURL', 'hardwareConcurrency', 'utilities', '<div\x20style=\x22color:', '\x20RISK</span>\x20•\x20Daily\x20cap:\x20KSh\x20', 'className', 'fromCharCode', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20overflow-hidden\x20rounded-xl\x20border\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20class=\x22w-full\x20text-left\x20border-collapse\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22bg-slate-900/80\x20text-[10px]\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-500\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Transaction\x20Details</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Debit\x20(+)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Credit\x20(-)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-[#4ade80]\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Survival\x20Window</p><p\x20class=\x22text-xl\x20font-bold\x22>', 'innerHTML', 'getAll', '<div\x20class=\x22text-[#4ade80]\x20text-2xl\x20mb-4\x22>You\x20asked:\x20\x22', 'reload', 'toLocaleString', 'shopping', 'log', 'unshift', '<div\x20class=\x22mt-6\x20text-xs\x20italic\x20text-yellow-300\x22>Noticing\x20a\x20pattern\x20of\x20spending\x20questions...\x20want\x20me\x20to\x20lock\x20in\x20a\x20weekly\x20cap\x20so\x20we\x20stay\x20safer?</div>', 'click', 'objectStore', '<div\x20class=\x22text-left\x20flex\x20gap-2\x22><div\x20class=\x22text-[#4ade80]\x20font-black\x20text-[10px]\x20mt-1\x22>TRV:</div><span\x20class=\x22travis-msg\x20text-sm\x20inline-block\x22>', 'line', 'push', '<div\x20class=\x22max-w-4xl\x20glass\x20p-6\x20mx-auto\x20flex\x20flex-col\x20h-[550px]\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22chat-box\x22\x20class=\x22flex-1\x20overflow-y-auto\x20space-y-4\x20mb-4\x20pr-2\x20flex\x20flex-col\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22travis-msg\x20text-xs\x20italic\x22>Probability\x20Engine\x20and\x20Leak\x20Finder\x20active.\x20How\x20can\x20I\x20protect\x20your\x20capital?</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-2\x20p-2\x20bg-slate-900\x20border-2\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22chat-input\x22\x20type=\x22text\x22\x20placeholder=\x22Consult\x20Travis...\x22\x20class=\x22flex-1\x20p-4\x20bg-transparent\x20border-none\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22handleAsk()\x22\x20class=\x22bg-[#4ade80]\x20text-black\x20px-8\x20font-black\x20rounded\x20uppercase\x22>Send</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'btn-p', 'fingerprint', '1zqXMsV', 'Petty\x20Cash', 'CRITICAL', 'luxury\x20/\x20secondary', 'toUpperCase', 'travisChart', 'Cash', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#ef4444]\x22>Tight\x20right\x20now.\x20Next\x20few\x20days\x20could\x20be\x20stressful\x20unless\x20we\x20cut\x20back\x20hard.</div>', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22font-black\x20italic\x20uppercase\x20text-slate-200\x22>', '1970858hWsZsO', 'install-overlay', 'Server\x20unreachable', 'UNDETERMINED', 'clothes', 'target', 'getContext', 'toDateString', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-[#4ade80]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Disposable\x20Buffer</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x22>KSh\x20', 'now', 'Installed!\x20Reopen\x20from\x20home\x20screen.', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22factoryReset()\x22\x20class=\x22mt-20\x20text-red-900\x20text-[10px]\x20font-bold\x20uppercase\x20tracking-widest\x20hover:text-red-500\x22>Full\x20System\x20Wipe</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'TRAVIS-GUARDIAN-SECURE-2026-x7k9', 'ask', 'Utilities', 'credit', 'transactions', '#94a3b8', 'habit', 'getMonth', 'CEILING', '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Insolvency\x20Risk\x20Score</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x20mb-3\x22\x20style=\x22color:\x20', '<p\x20class=\x22opacity-30\x22>No\x20obligations.</p>', '\x20|\x20Spent:\x20', 'Bank/M-Pesa', 'pending', 'Confirm\x20system\x20purge?\x20All\x20financial\x20history\x20will\x20be\x20deleted.', 'prompt', 'daily', 'color', 'how\x20is', 'name', 'toString', 'dashboard-grid', '\x20days.', 'tx-desc', '2642132FMRsNy', 'spending\x20habit', 'matchMedia', '<div\x20class=\x22text-right\x22><span\x20class=\x22user-msg\x20text-sm\x20inline-block\x22>', 'LOW', 'preventDefault', 'PWA\x20install\x20prompt\x20unavailable...', 'POST', 'Service\x20Worker\x20registered\x20successfully', 'remove', 'flex\x20gap-2', 'TravisGuardian_v1_0', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-2\x20glass\x20p-6\x20neon-border\x20relative\x20min-h-[350px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22text-xs\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-400\x20mb-4\x22>Performance\x20Analytics</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22h-[300px]\x22><canvas\x20id=\x22analyticsChart\x22></canvas></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', '⚠️\x20INSOLVENT', '\x20font-black\x20text-sm\x20uppercase\x22>', 'colorDepth', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>', 'text-green-400', 'px-4\x20py-2\x20border-2\x20border-[#4ade80]\x20text-[#4ade80]\x20rounded\x20font-black', 'M-Pesa', 'install-status', '\x20decreased\x20by\x20', 'setDate', 'scrollHeight', 'Enter', 'Sales\x20Revenue', 'reduce', 'tx-credit', 'riskColor', 'meta', 'Inventory', 'conversationCount', '<div\x20class=\x22flex\x20justify-between\x20border-b\x20border-red-900/30\x20py-2\x22><span\x20class=\x22text-xs\x20uppercase\x22>', 'input', ').\x20After\x20this,\x20you\x27d\x20only\x20have\x20KSh\x20', '4202009TYMLjt', '\x22\x20class=\x22w-24\x20p-2\x20text-sm\x22><button\x20onclick=\x22this.parentElement.remove()\x22\x20class=\x22text-red-500\x20font-bold\x22>×</button>', '</div>', '1943178jPxKXB', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Your\x20recent\x20spending\x20looks\x20moderate\x20—\x20mostly\x20within\x20cap.\x20But\x20we\x27ve\x20had\x20a\x20few\x20lifestyle\x20questions\x20lately...\x20let\x27s\x20tighten\x20up\x20a\x20bit\x20to\x20stay\x20green.</div>', 'Savings', 'font', 'key', 'riskLabel', 'get', 'If\x20I\x20were\x20you,\x20I\x27d\x20cap\x20it\x20at\x20KSh\x20', 'variance', 'Service\x20Worker\x20registration\x20failed:', 'some', 'transport', 'Payroll', '\x22</div>', '1608453JDhLYs', 'fillRect', 'then', 'Installation\x20cancelled.', 'transport\x20&\x20fuel', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#eab308]\x22>Yellow\x20zone\x20—\x20things\x20are\x20okay\x20but\x20watch\x20spending.\x20Next\x203\x20days\x20look\x20manageable\x20if\x20we\x20stay\x20disciplined.</div>', '\x20OVER</p>', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', '%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[9px]\x20mt-2\x20opacity-50\x20italic\x22>Based\x20on\x207D\x20Velocity\x20vs.\x20Projected\x20Ceiling.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-red-500\x20bg-red-950/10\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-widest\x20mb-4\x22>Leak\x20Finder</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22space-y-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'fuel', 'It\x27s\x20within\x20daily\x20cap\x20but\x20it\x27s\x20not\x20essential.', 'analyticsChart', '<div\x20class=\x22mt-4\x22>Current\x20status:\x20<span\x20style=\x22color:', 'safeCash', 'height', '</span></div>', 'text-yellow-500', 'readwrite', 'standalone', '</span><span\x20class=\x22leak-red\x20font-bold\x22>+KSh\x20', 'hidden', 'includes', 'dash', 'userChoice', 'createObjectStore', 'Service\x20worker\x20failed\x20–\x20install\x20may\x20not\x20work', 'shoes', 'salary', 'filter', 'trim', 'SYSTEM\x20UPDATE:\x20', '\x20Days</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-purple-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Daily\x20Ceiling</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'serviceWorker', 'scope', 'floor', 'Party', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22border-b\x20border-slate-800\x20text-sm\x20hover:bg-slate-900/50\x20transition-colors\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20opacity-40\x20font-bold\x20text-[10px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'act-code', 'beforeinstallprompt\x20event\x20fired\x20–\x20app\x20is\x20installable', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22grid\x20grid-cols-1\x20lg:grid-cols-3\x20gap-6\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-1\x20space-y-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x22\x20style=\x22border-color:\x20', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20p-4\x20bg-slate-900\x20border-b\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div><p\x20class=\x22font-bold\x20uppercase\x22>', 'Market\x20Exchange', '9HAapxQ', 'view-port', 'label', 'obsStatus', 'length', 'activation-overlay', 'result', 'tx-amount', 'KSh\x20', 'SPEND', 'toLowerCase', 'max', '</p></div>\x0a\x20\x20\x20\x20', 'turn\x20up', '<div\x20class=\x22text-xl\x22>Got\x20it\x20—\x20let\x27s\x20talk\x20money.</div>', 'addEventListener', '\x20Reserved', 'classList', 'tx-debit', 'porridge', '#eab308', 'activated', 'substring', 'sort', 'abs', 'This\x20is\x20a\x20luxury\x20spend\x20and\x20it\x27s\x20well\x20above\x20your\x20daily\x20cap.\x20After\x20this,\x20you\x27d\x20be\x20left\x20with\x20only\x20KSh\x20', 'You\x20can\x20do\x20it,\x20but\x20think\x20twice\x20—\x20is\x20it\x20worth\x20the\x20pattern?\x20Log\x20it\x20so\x20we\x20can\x20watch.', 'toFixed', 'business', 'getDate', 'toLocaleDateString', '\x20STRATEGY\x20ENGINE', 'app', 'px-4\x20py-2\x20border-2\x20border-red-500\x20text-red-500\x20rounded\x20font-black\x20animate-pulse', 'MODERATE', '#obligation-list\x20>\x20div', 'score', 'display-mode', '#4ade80', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#4ade80]\x22>Business\x20is\x20looking\x20stable\x20today.\x20No\x20red\x20flags\x20—\x20keep\x20the\x20same\x20discipline\x20and\x20the\x20next\x20few\x20days\x20should\x20stay\x20calm.</div>', 'TRV-KE-', 'school', 'platform', 'fillText', 'language', 'from', 'Strong\x20advice:\x20don\x27t\x20do\x20the\x20full\x20amount.\x20If\x20you\x20really\x20want\x20it,\x20limit\x20to\x20KSh\x20', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Everything\x20still\x20looks\x20stable.\x20Anything\x20specific\x20you\x20want\x20to\x20plan\x20for?</div>', 'type', 'onload', 'width', 'user-name', 'debit', 'short', 'error', 'div', 'daysRem', '\x20on\x20<span\x20class=\x22text-yellow-400\x22>', 'paid', 'setup-overlay', 'install-btn', 'Salary', 'application/json', 'chat-input', '#3b82f6', 'obligations', 'party', 'charCodeAt', '</span>.</div>', 'map', '\x20today\x20so\x20you\x20still\x20have\x20decent\x20room\x20for\x20the\x20next\x20', 'user', 'doing', 'fillStyle', 'round', 'Invalid\x20code.\x20Expected:\x20TRV-KE-XXXXXXXX-5634', 'match', 'deleteDatabase', '/activate-fingerprint', '<div\x20class=\x22glass\x20p-6\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20mb-6\x22><h3\x20class=\x22text-2xl\x20font-black\x20uppercase\x20italic\x22>Mandatory\x20Reserve</h3><button\x20onclick=\x22document.getElementById(\x27setup-overlay\x27).classList.remove(\x27hidden\x27)\x22\x20class=\x22text-[10px]\x20border\x20border-slate-700\x20px-2\x20py-1\x22>EDIT\x20LIST</button></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'liquid', ';\x20margin-top:12px;\x20font-weight:bold;\x22>', 'mall', '7950380rIfjSr', 'tx-modal', 'style', 'load', '#334155', 'beforeinstallprompt', 'warn', 'value', 'join', '\x22\x20class=\x22flex-1\x20p-2\x20text-sm\x22><input\x20type=\x22number\x22\x20placeholder=\x22KSh\x22\x20value=\x22', '8YmlHpY', 'dailyCap', 'display-name', 'en-KE', 'header-verdict', 'This\x20is\x20important,\x20but\x20it\x27s\x20above\x20your\x20daily\x20cap\x20(KSh\x20', '4864740tycnef'];
    _0x3411 = function() {
        return _0x46cb40;
    };
    return _0x3411();
}

function addObligationRow(_0x3e5168 = '', _0x2b2f2f = '') {
    const _0x15716f = _0x28f16a,
        _0x379789 = document[_0x15716f(0x1ec)](_0x15716f(0x1bf));
    _0x379789[_0x15716f(0x21c)] = _0x15716f(0x268), _0x379789[_0x15716f(0x220)] = '<input\x20type=\x22text\x22\x20placeholder=\x22Rent\x22\x20value=\x22' + _0x3e5168 + _0x15716f(0x1e4) + _0x2b2f2f + _0x15716f(0x282), document['getElementById']('obligation-list')[_0x15716f(0x213)](_0x379789);
}

function setUserType(_0x2ea0a8) {
    const _0x44993d = _0x28f16a;
    state[_0x44993d(0x208)] = _0x2ea0a8, document[_0x44993d(0x20e)](_0x44993d(0x22f))[_0x44993d(0x1dd)]['borderColor'] = _0x2ea0a8 === _0x44993d(0x1fa) ? _0x44993d(0x1ae) : _0x44993d(0x1df), document['getElementById']('btn-b')[_0x44993d(0x1dd)]['borderColor'] = _0x2ea0a8 === _0x44993d(0x1a4) ? _0x44993d(0x1ae) : _0x44993d(0x1df);
}
async function finalizeSetup() {
    const _0x4221c2 = _0x28f16a,
        _0x121e91 = document[_0x4221c2(0x20e)](_0x4221c2(0x1bb))[_0x4221c2(0x1e2)],
        _0x230877 = Array[_0x4221c2(0x1b5)](document[_0x4221c2(0x211)](_0x4221c2(0x1ab)))[_0x4221c2(0x1cd)](_0x374a17 => ({
            'label': _0x374a17[_0x4221c2(0x211)](_0x4221c2(0x27f))[0x0][_0x4221c2(0x1e2)],
            'amount': parseFloat(_0x374a17[_0x4221c2(0x211)]('input')[0x1][_0x4221c2(0x1e2)]) || 0x0
        }))[_0x4221c2(0x17a)](_0x174b7c => _0x174b7c[_0x4221c2(0x18a)]);
    if (!_0x121e91 || !state[_0x4221c2(0x208)]) return alert(_0x4221c2(0x209));
    state[_0x4221c2(0x1cf)] = {
        'name': _0x121e91,
        'type': state[_0x4221c2(0x208)]
    }, state['obligations'] = _0x230877, await saveData(_0x4221c2(0x27b), {
        'id': _0x4221c2(0x1f0),
        'user': state[_0x4221c2(0x1cf)],
        'obligations': state[_0x4221c2(0x1c9)]
    }), location['reload']();
}
async function factoryReset() {
    const _0x5ef64f = _0x28f16a;
    confirm(_0x5ef64f(0x254)) && (indexedDB[_0x5ef64f(0x1d5)](_0x5ef64f(0x269)), location['reload']());
}
async function boot() {
    const _0x3d9a47 = _0x28f16a;
    await initDB();
    const _0x37de4a = await getData('meta', _0x3d9a47(0x1f0));
    _0x37de4a ? (state[_0x3d9a47(0x1cf)] = _0x37de4a[_0x3d9a47(0x1cf)], state[_0x3d9a47(0x1c9)] = _0x37de4a[_0x3d9a47(0x1c9)], state[_0x3d9a47(0x24a)] = (await getAllData('tx'))['sort']((_0x4b0587, _0x38de5f) => _0x38de5f['id'] - _0x4b0587['id']), document[_0x3d9a47(0x20e)](_0x3d9a47(0x1e7))['innerText'] = state[_0x3d9a47(0x1cf)][_0x3d9a47(0x259)], document[_0x3d9a47(0x20e)](_0x3d9a47(0x1ad))[_0x3d9a47(0x210)] = state[_0x3d9a47(0x1cf)][_0x3d9a47(0x1b8)] + _0x3d9a47(0x1a7), nav('dash')) : document[_0x3d9a47(0x20e)](_0x3d9a47(0x1c3))[_0x3d9a47(0x199)][_0x3d9a47(0x267)](_0x3d9a47(0x172));
}
async function saveData(_0x252fa7, _0x380c9c) {
    const _0x4e31dc = _0x28f16a,
        _0x1929fa = db[_0x4e31dc(0x1f3)](_0x252fa7, _0x4e31dc(0x16f));
    return _0x1929fa['objectStore'](_0x252fa7)['put'](_0x380c9c), new Promise(_0x4dbfb2 => _0x1929fa[_0x4e31dc(0x20f)] = _0x4dbfb2);
}
async function getData(_0x191648, _0x170103) {
    const _0x1757e1 = _0x28f16a,
        _0x220cf4 = db[_0x1757e1(0x1f3)](_0x191648, _0x1757e1(0x1f5)),
        _0x3006d6 = _0x220cf4[_0x1757e1(0x22a)](_0x191648)[_0x1757e1(0x156)](_0x170103);
    return new Promise(_0x42b535 => _0x3006d6[_0x1757e1(0x205)] = () => _0x42b535(_0x3006d6[_0x1757e1(0x18e)]));
}
async function getAllData(_0x5334a9) {
    const _0x5e7f92 = _0x28f16a,
        _0x2e2ddf = db[_0x5e7f92(0x1f3)](_0x5334a9, _0x5e7f92(0x1f5)),
        _0x49939a = _0x2e2ddf['objectStore'](_0x5334a9)[_0x5e7f92(0x221)]();
    return new Promise(_0xc79e74 => _0x49939a[_0x5e7f92(0x205)] = () => _0xc79e74(_0x49939a[_0x5e7f92(0x18e)]));
}

function closeTxModal() {
    const _0x5e0462 = _0x28f16a;
    document[_0x5e0462(0x20e)](_0x5e0462(0x1dc))[_0x5e0462(0x199)][_0x5e0462(0x214)]('hidden'), document['getElementById']('tx-amount')[_0x5e0462(0x1e2)] = '';
}
window[_0x28f16a(0x1b9)] = boot;
async function boot() {
    const _0x48c7cf = _0x28f16a;
    await initDB();
    let _0x47c5a8 = await getData(_0x48c7cf(0x27b), _0x48c7cf(0x1f0)) || {
        'activated': ![]
    };
    const _0x288f6c = window[_0x48c7cf(0x260)](_0x48c7cf(0x1fe))['matches'] || navigator[_0x48c7cf(0x170)] === !![];
    await new Promise(_0x26bc1e => setTimeout(_0x26bc1e, 0x320));
    if (!_0x47c5a8[_0x48c7cf(0x19d)]) _0x288f6c ? (document[_0x48c7cf(0x20e)]('activation-overlay')[_0x48c7cf(0x199)][_0x48c7cf(0x267)](_0x48c7cf(0x172)), document['getElementById'](_0x48c7cf(0x23b))['classList']['add'](_0x48c7cf(0x172)), document['getElementById']('app')[_0x48c7cf(0x199)][_0x48c7cf(0x214)](_0x48c7cf(0x172))) : (document[_0x48c7cf(0x20e)](_0x48c7cf(0x23b))[_0x48c7cf(0x199)]['remove']('hidden'), document[_0x48c7cf(0x20e)](_0x48c7cf(0x18d))[_0x48c7cf(0x199)]['add']('hidden'), document[_0x48c7cf(0x20e)](_0x48c7cf(0x1a8))[_0x48c7cf(0x199)]['add'](_0x48c7cf(0x172)));
    else !_0x47c5a8[_0x48c7cf(0x1cf)] ? (document[_0x48c7cf(0x20e)]('setup-overlay')[_0x48c7cf(0x199)][_0x48c7cf(0x267)](_0x48c7cf(0x172)), document['getElementById'](_0x48c7cf(0x23b))['classList'][_0x48c7cf(0x214)](_0x48c7cf(0x172)), document['getElementById'](_0x48c7cf(0x1a8))[_0x48c7cf(0x199)]['add'](_0x48c7cf(0x172))) : (state['user'] = _0x47c5a8[_0x48c7cf(0x1cf)], state[_0x48c7cf(0x1c9)] = _0x47c5a8['obligations'], state[_0x48c7cf(0x24a)] = (await getAllData('tx'))[_0x48c7cf(0x19f)]((_0x3e5738, _0x2c4d5c) => _0x2c4d5c['id'] - _0x3e5738['id']), document[_0x48c7cf(0x20e)](_0x48c7cf(0x1e7))['innerText'] = state[_0x48c7cf(0x1cf)][_0x48c7cf(0x259)], document['getElementById']('display-mode')[_0x48c7cf(0x210)] = state[_0x48c7cf(0x1cf)][_0x48c7cf(0x1b8)] + _0x48c7cf(0x1a7), document['getElementById'](_0x48c7cf(0x1a8))[_0x48c7cf(0x199)][_0x48c7cf(0x267)](_0x48c7cf(0x172)), document['getElementById'](_0x48c7cf(0x23b))[_0x48c7cf(0x199)][_0x48c7cf(0x214)](_0x48c7cf(0x172)), document[_0x48c7cf(0x20e)](_0x48c7cf(0x1c3))[_0x48c7cf(0x199)][_0x48c7cf(0x214)](_0x48c7cf(0x172)), nav(_0x48c7cf(0x174)));
}
document['getElementById']('install-btn')?.[_0x28f16a(0x197)](_0x28f16a(0x229), triggerInstall), window[_0x28f16a(0x1b9)] = boot;