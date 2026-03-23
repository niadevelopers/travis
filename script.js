const _0x17ff71 = _0x4822;
(function(_0x3e1886, _0x4a2f08) {
    const _0x1f01cc = _0x4822,
        _0x5ccf36 = _0x3e1886();
    while (!![]) {
        try {
            const _0x36b8d8 = parseInt(_0x1f01cc(0x1fe)) / 0x1 + -parseInt(_0x1f01cc(0x1ef)) / 0x2 + parseInt(_0x1f01cc(0x202)) / 0x3 + parseInt(_0x1f01cc(0x238)) / 0x4 * (parseInt(_0x1f01cc(0x1d7)) / 0x5) + -parseInt(_0x1f01cc(0x16a)) / 0x6 + -parseInt(_0x1f01cc(0x213)) / 0x7 + parseInt(_0x1f01cc(0x169)) / 0x8 * (parseInt(_0x1f01cc(0x1a7)) / 0x9);
            if (_0x36b8d8 === _0x4a2f08) break;
            else _0x5ccf36['push'](_0x5ccf36['shift']());
        } catch (_0x18485f) {
            _0x5ccf36['push'](_0x5ccf36['shift']());
        }
    }
}(_0x3c3f, 0xc8a1f));
_0x17ff71(0x163) in navigator && window['addEventListener'](_0x17ff71(0x154), () => {
    const _0x264026 = _0x17ff71;
    navigator[_0x264026(0x163)]['register'](_0x264026(0x216))[_0x264026(0x17c)](_0x2b5a58 => {
        const _0x28fb5d = _0x264026;
        console['log'](_0x28fb5d(0x215), _0x2b5a58[_0x28fb5d(0x18a)]);
    })[_0x264026(0x249)](_0x46b2a5 => {
        const _0x42df78 = _0x264026;
        console['error'](_0x42df78(0x243), _0x46b2a5), document[_0x42df78(0x13a)](_0x42df78(0x15b))[_0x42df78(0x1dc)] = 'Service\x20worker\x20failed\x20–\x20install\x20may\x20not\x20work';
    });
});
let deferredPrompt = null;
window[_0x17ff71(0x214)](_0x17ff71(0x1ce), _0x1a5124 => {
    const _0x58fb35 = _0x17ff71;
    console[_0x58fb35(0x22f)]('beforeinstallprompt\x20event\x20fired\x20–\x20app\x20is\x20installable'), _0x1a5124[_0x58fb35(0x167)](), deferredPrompt = _0x1a5124, document[_0x58fb35(0x13a)]('install-status')[_0x58fb35(0x1dc)] = 'Ready\x20to\x20install\x20–\x20click\x20below', document['getElementById'](_0x58fb35(0x17d))['disabled'] = ![];
}), window[_0x17ff71(0x214)](_0x17ff71(0x189), () => {
    const _0xc2ad65 = _0x17ff71;
    console[_0xc2ad65(0x22f)](_0xc2ad65(0x24f)), document[_0xc2ad65(0x13a)](_0xc2ad65(0x15b))['innerText'] = 'Installed!\x20Reopen\x20from\x20home\x20screen.';
});

function generateFingerprint() {
    const _0x599ab9 = _0x17ff71,
        _0x1f5339 = [navigator[_0x599ab9(0x161)], screen[_0x599ab9(0x1e6)] + 'x' + screen[_0x599ab9(0x20e)], screen[_0x599ab9(0x21d)] || '24', navigator[_0x599ab9(0x1e8)] || _0x599ab9(0x1b4), navigator[_0x599ab9(0x1b6)], navigator[_0x599ab9(0x136)] || 'en', new Date()[_0x599ab9(0x221)]()[_0x599ab9(0x13f)](), navigator[_0x599ab9(0x210)] || ''][_0x599ab9(0x166)]('|'),
        _0x4a8d1e = document[_0x599ab9(0x20f)](_0x599ab9(0x157));
    _0x4a8d1e[_0x599ab9(0x1e6)] = 0x118, _0x4a8d1e[_0x599ab9(0x20e)] = 0x46;
    const _0x413f8b = _0x4a8d1e[_0x599ab9(0x14a)]('2d');
    _0x413f8b['fillStyle'] = '#111', _0x413f8b[_0x599ab9(0x1c1)](0x0, 0x0, _0x4a8d1e[_0x599ab9(0x1e6)], _0x4a8d1e[_0x599ab9(0x20e)]), _0x413f8b[_0x599ab9(0x21a)] = _0x599ab9(0x212), _0x413f8b[_0x599ab9(0x18f)] = '#4ade80', _0x413f8b[_0x599ab9(0x229)](_0x599ab9(0x14c), 0x14, 0x2d);
    const _0x324697 = _0x4a8d1e[_0x599ab9(0x1d4)](_0x599ab9(0x25a)),
        _0x3593f7 = _0x1f5339 + '|' + _0x324697;
    let _0x25d117 = '',
        _0x3c0d3b = 0x1505;
    for (let _0x483954 = 0x0; _0x483954 < _0x3593f7[_0x599ab9(0x12b)]; _0x483954++) {
        _0x3c0d3b = (_0x3c0d3b << 0x5) + _0x3c0d3b + _0x3593f7[_0x599ab9(0x23c)](_0x483954), _0x25d117 += Math['abs'](_0x3c0d3b % 0xa)[_0x599ab9(0x13f)]();
    }
    while (_0x25d117['length'] < 0x28) {
        _0x3c0d3b = (_0x3c0d3b << 0x5) + _0x3c0d3b + 0x7b, _0x25d117 += Math['abs'](_0x3c0d3b % 0xa)[_0x599ab9(0x13f)]();
    }
    return _0x25d117[_0x599ab9(0x1e3)](0x0, 0x28);
}
async function triggerInstall() {
    const _0x1c7a91 = _0x17ff71,
        _0x4256da = generateFingerprint();
    try {
        await fetch(_0x1c7a91(0x152), {
            'method': _0x1c7a91(0x185),
            'headers': {
                'Content-Type': _0x1c7a91(0x20b)
            },
            'body': JSON[_0x1c7a91(0x1e1)]({
                'fingerprint': _0x4256da
            })
        }), console[_0x1c7a91(0x22f)](_0x1c7a91(0x258), _0x1c7a91(0x1f7));
    } catch (_0x5884e3) {
        console[_0x1c7a91(0x230)](_0x1c7a91(0x198), _0x5884e3);
    }
    if (deferredPrompt) {
        deferredPrompt['prompt']();
        const {
            outcome: _0x38980c
        } = await deferredPrompt['userChoice'];
        deferredPrompt = null, _0x38980c === 'accepted' ? (document['getElementById']('install-overlay')[_0x1c7a91(0x150)][_0x1c7a91(0x145)]('hidden'), alert(_0x1c7a91(0x139))) : alert('Install\x20cancelled.\x20You\x20must\x20install\x20to\x20continue.');
    } else document[_0x1c7a91(0x13a)]('install-status')[_0x1c7a91(0x1dc)] = 'Install\x20not\x20available\x20yet\x20–\x20check\x20console\x20/\x20Lighthouse', alert(_0x1c7a91(0x233));
}
async function attemptActivation() {
    const _0x557b94 = _0x17ff71,
        _0x265104 = document[_0x557b94(0x13a)](_0x557b94(0x21b))[_0x557b94(0x1c0)][_0x557b94(0x1b2)]()['toUpperCase']();
    let _0x588f58 = await getData('meta', 'config'),
        _0x28e88c = _0x588f58?.[_0x557b94(0x195)] || generateFingerprint();
    const _0x1b4896 = _0x28e88c['slice'](0x3, 0xb),
        _0x1c20b4 = _0x557b94(0x257) + _0x1b4896 + '-5634';
    if (_0x265104 === _0x1c20b4) {
        const _0x362345 = {
            'id': 'config',
            ..._0x588f58 || {},
            'activated': !![],
            'fingerprint': _0x28e88c
        };
        await saveData(_0x557b94(0x222), _0x362345), document['getElementById'](_0x557b94(0x1f4))['classList']['add']('hidden'), location[_0x557b94(0x1c3)]();
    } else alert(_0x557b94(0x14e)), document[_0x557b94(0x13a)](_0x557b94(0x21b))[_0x557b94(0x1c0)] = '';
}
let db, state = {
    'user': null,
    'transactions': [],
    'obligations': []
};

function _0x3c3f() {
    const _0x98f39 = ['unshift', 'max', 'basic\x20need', 'sort', 'PWA\x20was\x20successfully\x20installed', 'status', '\x20today\x20so\x20you\x20still\x20have\x20decent\x20room\x20for\x20the\x20next\x20', 'onload', 'SYSTEM\x20UPDATE:\x20', 'key', '</span><span\x20class=\x22leak-red\x20font-bold\x22>+KSh\x20', 'onsuccess', 'TRV-KE-', '%cFingerprint\x20sent\x20to\x20server', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20p-4\x20bg-slate-900\x20border-b\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div><p\x20class=\x22font-bold\x20uppercase\x22>', 'image/png', 'travisChart', 'length', 'monthly\x20obligation', 'M-Pesa', 'Tools', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Everything\x20still\x20looks\x20stable.\x20Anything\x20specific\x20you\x20want\x20to\x20plan\x20for?</div>', 'hud-cap', 'tx-debit', 'getAll', 'You\x20can\x20do\x20it,\x20but\x20think\x20twice\x20—\x20is\x20it\x20worth\x20the\x20pattern?\x20Log\x20it\x20so\x20we\x20can\x20watch.', 'Market\x20Exchange', '(display-mode:\x20standalone)', 'language', 'div', 'toLocaleString', 'Installed!\x20Close\x20this\x20tab\x20→\x20open\x20from\x20home\x20screen\x20to\x20activate.', 'getElementById', 'daily', 'deleteDatabase', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#ef4444]\x22>Tight\x20right\x20now.\x20Next\x20few\x20days\x20could\x20be\x20stressful\x20unless\x20we\x20cut\x20back\x20hard.</div>', 'px-4\x20py-2\x20border-2\x20border-red-500\x20text-red-500\x20rounded\x20font-black\x20animate-pulse', 'toString', 'btn-b', 'oncomplete', 'some', 'forEach', '\x20per\x20day\x20left.', 'add', 'Strategy\x20Error:\x20A\x20transaction\x20must\x20move\x20value\x20between\x20two\x20different\x20accounts.', 'Transport', 'Salary', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'getContext', 'setDate', 'TRAVIS\x20GUARDIAN', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22text-right\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22', 'Invalid\x20code.\x20Please\x20contact\x20admin', 'from', 'classList', '\x20Reserved', 'https://travis-j1w9.onrender.com/activate-fingerprint', 'chat-input', 'load', 'scrollHeight', 'debit', 'canvas', '<div\x20style=\x22color:', 'toLowerCase', 'ask', 'install-status', '<div\x20class=\x22text-left\x20flex\x20gap-2\x22><div\x20class=\x22text-[#4ade80]\x20font-black\x20text-[10px]\x20mt-1\x22>TRV:</div><span\x20class=\x22travis-msg\x20text-sm\x20inline-block\x22>', '🛡️\x20SYSTEM\x20STABLE', 'getMonth', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-2\x20glass\x20p-6\x20neon-border\x20relative\x20min-h-[350px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22text-xs\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-400\x20mb-4\x22>Performance\x20Analytics</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22h-[300px]\x22><canvas\x20id=\x22analyticsChart\x22></canvas></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'credit', 'userAgent', 'user-name', 'serviceWorker', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-[#4ade80]\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Survival\x20Window</p><p\x20class=\x22text-xl\x20font-bold\x22>', 'put', 'join', 'preventDefault', 'px-4\x20py-2\x20border-2\x20border-[#4ade80]\x20text-[#4ade80]\x20rounded\x20font-black', '104Ezcthd', '6737610CFzUJT', 'en-KE', 'transactions', 'toDateString', 'color', 'dashboard-grid', 'hud-cover', '</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20items-center\x20gap-2\x20mt-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-green-900/30\x20text-green-400\x20px-1\x20rounded\x20font-bold\x22>', 'tx-desc', '</p><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Budget:\x20', 'push', '<div\x20class=\x22max-w-4xl\x20glass\x20p-6\x20mx-auto\x20flex\x20flex-col\x20h-[550px]\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20id=\x22chat-box\x22\x20class=\x22flex-1\x20overflow-y-auto\x20space-y-4\x20mb-4\x20pr-2\x20flex\x20flex-col\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22travis-msg\x20text-xs\x20italic\x22>Probability\x20Engine\x20and\x20Leak\x20Finder\x20active.\x20How\x20can\x20I\x20protect\x20your\x20capital?</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-2\x20p-2\x20bg-slate-900\x20border-2\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20id=\x22chat-input\x22\x20type=\x22text\x22\x20placeholder=\x22Consult\x20Travis...\x22\x20class=\x22flex-1\x20p-4\x20bg-transparent\x20border-none\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22handleAsk()\x22\x20class=\x22bg-[#4ade80]\x20text-black\x20px-8\x20font-black\x20rounded\x20uppercase\x22>Send</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'score', 'KSh\x20', 'config', '\x20Days</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-purple-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Daily\x20Ceiling</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'appendChild', '</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22risk-heatmap\x20overflow-hidden\x22><div\x20class=\x22bg-white/20\x20h-full\x22\x20style=\x22width:\x20', 'then', 'install-btn', '<p\x20class=\x22text-[10px]\x20opacity-30\x20italic\x22>No\x20budget\x20variances\x20detected.</p>', 'variance', 'Utilities', 'Inventory', 'Go\x20ahead.\x20This\x20is\x20within\x20reach.', 'dailyCap', ').\x20After\x20this,\x20you\x27d\x20only\x20have\x20KSh\x20', 'POST', '</div>', '</span></div>', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>Your\x20recent\x20spending\x20looks\x20moderate\x20—\x20mostly\x20within\x20cap.\x20But\x20we\x27ve\x20had\x20a\x20few\x20lifestyle\x20questions\x20lately...\x20let\x27s\x20tighten\x20up\x20a\x20bit\x20to\x20stay\x20green.</div>', 'appinstalled', 'scope', 'CRITICAL', 'btn-p', 'obsStatus', 'habit', 'fillStyle', 'view-port', 'outing', '\x20STRATEGY\x20ENGINE', 'chat-box', 'rent', 'fingerprint', 'label', 'matchMedia', 'Fingerprint\x20send\x20failed\x20–\x20offline?', 'drink', 'obligations', '#334155', 'app', 'desc', '\x20decreased\x20by\x20', 'line', '<div\x20class=\x22mt-6\x20text-xs\x20italic\x20text-yellow-300\x22>Noticing\x20a\x20pattern\x20of\x20spending\x20questions...\x20want\x20me\x20to\x20lock\x20in\x20a\x20weekly\x20cap\x20so\x20we\x20stay\x20safer?</div>', 'Sales\x20Revenue', '<div\x20class=\x22text-[#4ade80]\x20text-2xl\x20mb-4\x22>You\x20asked:\x20\x22', 'innerHTML', 'mall', 'salary', '⚠️\x20INSOLVENT', '1001538NBIKWj', 'header-verdict', '<div\x20class=\x22flex\x20justify-between\x20border-b\x20border-red-900/30\x20py-2\x22><span\x20class=\x22text-xs\x20uppercase\x22>', 'filter', '\x20per\x20day\x20—\x20tight\x20squeeze.', 'dash', '#ef4444', 'className', '<tr><td\x20colspan=\x224\x22\x20class=\x22p-10\x20text-center\x20opacity-30\x20italic\x20font-bold\x20uppercase\x20tracking-widest\x22>No\x20entries\x20found\x20in\x20the\x20archives.</td></tr>', 'fuel', 'business', 'trim', '%\x22></div></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[9px]\x20mt-2\x20opacity-50\x20italic\x22>Based\x20on\x207D\x20Velocity\x20vs.\x20Projected\x20Ceiling.</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-red-500\x20bg-red-950/10\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-widest\x20mb-4\x22>Leak\x20Finder</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22space-y-1\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'unknown', 'tx-modal', 'platform', '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Insolvency\x20Risk\x20Score</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x20mb-3\x22\x20style=\x22color:\x20', 'This\x20is\x20a\x20luxury\x20spend\x20and\x20it\x27s\x20well\x20above\x20your\x20daily\x20cap.\x20After\x20this,\x20you\x27d\x20be\x20left\x20with\x20only\x20KSh\x20', 'analyticsChart', '<div\x20class=\x22glass\x20p-6\x20neon-border\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20justify-between\x20items-center\x20mb-6\x22><h3\x20class=\x22text-2xl\x20font-black\x20uppercase\x20italic\x22>Mandatory\x20Reserve</h3><button\x20onclick=\x22document.getElementById(\x27setup-overlay\x27).classList.remove(\x27hidden\x27)\x22\x20class=\x22text-[10px]\x20border\x20border-slate-700\x20px-2\x20py-1\x22>EDIT\x20LIST</button></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'Party', ';\x20margin-top:12px;\x20font-weight:bold;\x22>', 'getFullYear', 'setup-overlay', 'doing', 'value', 'fillRect', '</p></div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-red-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Reserved\x20Bills</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20', 'reload', 'safeCash', 'tx-amount', 'book', 'It\x27s\x20within\x20daily\x20cap\x20but\x20it\x27s\x20not\x20essential.', 'riskLabel', 'liquid', '\x20on\x20<span\x20class=\x22text-yellow-400\x22>', 'party', '#94a3b8', 'objectStore', 'beforeinstallprompt', 'readwrite', 'map', 'UNDETERMINED', 'install-overlay', 'user', 'toDataURL', '</p></div>\x0a\x20\x20\x20\x20', 'Savings', '25qVMTNl', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22font-black\x20italic\x20uppercase\x20text-slate-200\x22>', '<div\x20class=\x22text-xl\x22>Let\x20me\x20give\x20you\x20a\x20quick\x20read\x20on\x20your\x20situation\x20today...</div>', '\x20increased\x20by\x20', 'input', 'innerText', 'spending\x20habit', 'CEILING', '#eab308', 'turn\x20up', 'stringify', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-red-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20-', 'substring', 'Petty\x20Cash', 'type', 'width', 'MODERATE', 'hardwareConcurrency', '\x20days.', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>', 'result', 'transport\x20&\x20fuel', 'Payroll', 'match', '2902592wZrnsv', 'Cash', '\x22\x20class=\x22flex-1\x20p-2\x20text-sm\x22><input\x20type=\x22number\x22\x20placeholder=\x22KSh\x22\x20value=\x22', 'pending', 'rgba(239,\x2068,\x2068,\x200.1)', 'activation-overlay', 'Rent', '<div\x20class=\x22text-5xl\x20mb-2\x22>🧠</div>', 'color:#4ade80;\x20font-weight:bold', 'now', 'conversationCount', 'readonly', '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'school', 'random', '934173cSMshb', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x20border-[#4ade80]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x20tracking-widest\x22>Disposable\x20Buffer</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1\x20class=\x22text-4xl\x20font-black\x22>KSh\x20', 'tempType', 'REVENUE', '800541fnuciG', 'SPEND', 'how\x20is', 'tx-credit', 'click', '\x20font-black\x20text-sm\x20uppercase\x22>', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22border-b\x20border-slate-800\x20text-sm\x20hover:bg-slate-900/50\x20transition-colors\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20opacity-40\x20font-bold\x20text-[10px]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'includes', 'reduce', 'application/json', 'riskColor', 'hidden', 'height', 'createElement', 'vendor', 'paid', 'bold\x2028px\x20Arial', '1164513qjPcTg', 'addEventListener', 'Service\x20Worker\x20registered\x20successfully', './sw.js', 'Settled', 'transaction', '<input\x20type=\x22text\x22\x20placeholder=\x22Rent\x22\x20value=\x22', 'font', 'act-code', 'transport', 'colorDepth', 'shoes', 'short', 'obs', 'getTimezoneOffset', 'meta', 'daysRem', 'amount', '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20opacity-30\x22>←</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22text-[9px]\x20bg-red-900/30\x20text-red-400\x20px-1\x20rounded\x20font-bold\x22>', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#4ade80]\x22>Business\x20is\x20looking\x20stable\x20today.\x20No\x20red\x20flags\x20—\x20keep\x20the\x20same\x20discipline\x20and\x20the\x20next\x20few\x20days\x20should\x20stay\x20calm.</div>', 'Bank/M-Pesa', 'display-name', 'fillText', 'utilities', 'obligation-list', 'System\x20requires\x20ID.', 'food', 'This\x20fits\x20inside\x20your\x20daily\x20cap\x20—\x20safe\x20for\x20a\x20necessary\x20spend.', 'log', 'warn', 'keypress', 'TravisGuardian_v5_8', 'Browser\x20did\x20not\x20offer\x20install\x20prompt.\x0a\x0aPossible\x20reasons:\x0a•\x20Not\x20on\x20HTTPS/localhost\x0a•\x20Missing\x20icons\x20in\x20manifest\x0a•\x20Service\x20worker\x20not\x20active\x0a•\x20Already\x20installed\x0a\x0aRun\x20Lighthouse\x20audit\x20→\x20PWA\x20category.', 'toLocaleDateString', 'toFixed', 'remove', 'display-mode', '731756GDNIVj', 'querySelectorAll', 'hud-warning', 'LOW', 'charCodeAt', 'standalone', 'open', 'borderColor', '\x20OVER</p>', '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x22>', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20overflow-hidden\x20rounded-xl\x20border\x20border-slate-800\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<table\x20class=\x22w-full\x20text-left\x20border-collapse\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20class=\x22bg-slate-900/80\x20text-[10px]\x20font-black\x20uppercase\x20tracking-widest\x20text-slate-500\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x22>Transaction\x20Details</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Debit\x20(+)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22p-4\x20border-b\x20border-slate-800\x20text-right\x22>Credit\x20(-)</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', 'Service\x20Worker\x20registration\x20failed:', 'flex\x20gap-2', 'target', 'floor', 'getDate', 'personal', 'catch', '#4ade80'];
    _0x3c3f = function() {
        return _0x98f39;
    };
    return _0x3c3f();
}
async function initDB() {
    return new Promise(_0x7a4e17 => {
        const _0x5d96aa = _0x4822,
            _0x2df2ed = indexedDB[_0x5d96aa(0x23e)](_0x5d96aa(0x232), 0x1);
        _0x2df2ed['onupgradeneeded'] = _0xb98a74 => {
            const _0x5051e3 = _0x5d96aa,
                _0x31cbb6 = _0xb98a74[_0x5051e3(0x245)][_0x5051e3(0x1eb)];
            _0x31cbb6['createObjectStore'](_0x5051e3(0x222), {
                'keyPath': 'id'
            }), _0x31cbb6['createObjectStore']('tx', {
                'keyPath': 'id'
            });
        }, _0x2df2ed[_0x5d96aa(0x256)] = _0x5b970a => {
            const _0x549d90 = _0x5d96aa;
            db = _0x5b970a[_0x549d90(0x245)][_0x549d90(0x1eb)], _0x7a4e17();
        };
    });
}
let travisMemory = {
    'conversationCount': 0x0,
    'lastQuestion': '',
    'lastPurpose': '',
    'lastVerdict': ''
};

function isObligation(_0x394223) {
    const _0x2189fc = _0x17ff71;
    if (!state[_0x2189fc(0x19a)] || state[_0x2189fc(0x19a)][_0x2189fc(0x12b)] === 0x0) return ![];
    return state['obligations'][_0x2189fc(0x142)](_0xbfa24c => _0x394223['toLowerCase']()[_0x2189fc(0x209)](_0xbfa24c[_0x2189fc(0x196)][_0x2189fc(0x159)]()));
}

function getStatusSummary() {
    const _0x864569 = _0x17ff71,
        _0x29e731 = getFin(),
        _0x274a1a = calculateInsolvencyRisk();
    return {
        'cash': Math['round'](_0x29e731[_0x864569(0x1c4)]),
        'dailyCap': Math[_0x864569(0x246)](_0x29e731[_0x864569(0x13b)]),
        'daysRem': _0x29e731[_0x864569(0x223)],
        'riskLabel': _0x274a1a[_0x864569(0x196)],
        'riskColor': _0x274a1a[_0x864569(0x16e)],
        'riskScore': _0x274a1a[_0x864569(0x176)]
    };
}

function updateLiveHud() {
    const _0x501983 = _0x17ff71,
        _0x2b52a6 = parseFloat(document[_0x501983(0x13a)](_0x501983(0x1c5))['value']) || 0x0,
        _0x4ab101 = document[_0x501983(0x13a)]('tx-credit')[_0x501983(0x1c0)],
        _0x4a0956 = getFin(),
        _0x5966b = isLiquid(_0x4ab101) ? _0x4a0956[_0x501983(0x1c4)] - _0x2b52a6 : _0x4a0956[_0x501983(0x1c4)],
        _0x5c0a73 = _0x5966b / _0x4a0956[_0x501983(0x223)];
    document[_0x501983(0x13a)](_0x501983(0x130))['innerText'] = _0x501983(0x177) + _0x5c0a73[_0x501983(0x235)](0x0), document[_0x501983(0x13a)](_0x501983(0x170))[_0x501983(0x1dc)] = _0x501983(0x177) + _0x4a0956['pending']['toLocaleString']() + _0x501983(0x151);
    const _0x4c9233 = document['getElementById'](_0x501983(0x23a));
    isLiquid(_0x4ab101) && _0x2b52a6 > _0x4a0956[_0x501983(0x13b)] ? _0x4c9233[_0x501983(0x150)][_0x501983(0x236)](_0x501983(0x20d)) : _0x4c9233[_0x501983(0x150)][_0x501983(0x145)](_0x501983(0x20d));
}

function getFin() {
    const _0x4a0c69 = _0x17ff71,
        _0x39db0b = new Date(),
        _0x545d1d = Math[_0x4a0c69(0x24c)](0x1, new Date(_0x39db0b[_0x4a0c69(0x1bd)](), _0x39db0b[_0x4a0c69(0x15e)]() + 0x1, 0x0)['getDate']() - _0x39db0b[_0x4a0c69(0x247)]());
    let _0x2a948f = 0x0;
    const _0x4c4bb6 = state[_0x4a0c69(0x1d3)]['type'] === _0x4a0c69(0x248) ? [_0x4a0c69(0x1f0), _0x4a0c69(0x12d)] : ['Bank/M-Pesa', _0x4a0c69(0x1e4)];
    _0x4c4bb6['forEach'](_0x59e9b4 => _0x2a948f += getBalance(_0x59e9b4));
    const _0x16339a = state[_0x4a0c69(0x19a)][_0x4a0c69(0x1d0)](_0x5e8af1 => {
            const _0x5083ea = _0x4a0c69;
            let _0x27a2df = 0x0;
            return state[_0x5083ea(0x16c)]['forEach'](_0x5e750c => {
                const _0x35099a = _0x5083ea,
                    _0x2e5113 = new Date(_0x5e750c['id']);
                _0x2e5113[_0x35099a(0x15e)]() === _0x39db0b[_0x35099a(0x15e)]() && (_0x5e750c['desc'][_0x35099a(0x159)]()[_0x35099a(0x209)](_0x5e8af1['label'][_0x35099a(0x159)]()) || _0x5e750c['credit'] === _0x5e8af1[_0x35099a(0x196)]) && (_0x27a2df += _0x5e750c[_0x35099a(0x224)]);
            }), {
                ..._0x5e8af1,
                'paid': _0x27a2df,
                'pending': Math[_0x5083ea(0x24c)](0x0, _0x5e8af1['amount'] - _0x27a2df),
                'variance': _0x27a2df - _0x5e8af1[_0x5083ea(0x224)]
            };
        }),
        _0x1c58f8 = _0x16339a[_0x4a0c69(0x20a)]((_0xac98dc, _0x5ca9d9) => _0xac98dc + _0x5ca9d9[_0x4a0c69(0x1f2)], 0x0),
        _0x25091d = _0x2a948f - _0x1c58f8;
    return {
        'liquid': _0x2a948f,
        'pending': _0x1c58f8,
        'safeCash': _0x25091d,
        'daysRem': _0x545d1d,
        'obsStatus': _0x16339a,
        'daily': _0x25091d / _0x545d1d
    };
}

function calculateInsolvencyRisk() {
    const _0xdd5297 = _0x17ff71,
        _0x13db3b = getFin(),
        _0x10a2ee = (function() {
            const _0x51fda2 = _0x4822,
                _0x35f203 = new Date(),
                _0x1d792c = new Date();
            _0x1d792c[_0x51fda2(0x14b)](_0x35f203[_0x51fda2(0x247)]() - 0x7);
            let _0x403dc9 = 0x0;
            return state[_0x51fda2(0x16c)]['forEach'](_0x3f3ed7 => {
                const _0x171496 = _0x51fda2;
                if (new Date(_0x3f3ed7['id']) >= _0x1d792c && isLiquid(_0x3f3ed7['credit'])) _0x403dc9 += _0x3f3ed7[_0x171496(0x224)];
            }), _0x403dc9 / 0x7;
        }());
    if (_0x10a2ee <= _0x13db3b['daily']) return {
        'score': 0x5,
        'label': 'LOW',
        'color': '#4ade80'
    };
    if (_0x10a2ee > _0x13db3b['daily'] && _0x10a2ee < _0x13db3b['daily'] * 1.5) return {
        'score': 0x2d,
        'label': _0xdd5297(0x1e7),
        'color': _0xdd5297(0x1df)
    };
    if (_0x10a2ee >= _0x13db3b[_0xdd5297(0x13b)] * 1.5) return {
        'score': 0x55,
        'label': _0xdd5297(0x18b),
        'color': _0xdd5297(0x1ad)
    };
    return {
        'score': 0x0,
        'label': _0xdd5297(0x1d1),
        'color': _0xdd5297(0x1cc)
    };
}

function handleAsk() {
    const _0x5dd50d = _0x17ff71,
        _0x258283 = document[_0x5dd50d(0x13a)]('chat-input'),
        _0x19c1c9 = document[_0x5dd50d(0x13a)](_0x5dd50d(0x193)),
        _0x1a5ce6 = _0x258283['value']['trim']();
    if (!_0x1a5ce6) return;
    travisMemory[_0x5dd50d(0x1f9)]++, travisMemory['lastQuestion'] = _0x1a5ce6;
    const _0x2edbc4 = _0x1a5ce6[_0x5dd50d(0x159)]()[_0x5dd50d(0x1b2)](),
        _0x2ac270 = getFin(),
        _0x2aa0b9 = getStatusSummary();
    let _0x926b11 = 0x0;
    const _0x1cee37 = _0x2edbc4[_0x5dd50d(0x1ee)](/(\d+)(?:\s*(k|thousand|ksh))?/i);
    if (_0x1cee37) {
        _0x926b11 = parseFloat(_0x1cee37[0x1]);
        if (_0x1cee37[0x2]) _0x926b11 *= 0x3e8;
    }
    let _0x464810 = 'general',
        _0x5ce9d7 = ![],
        _0x4848b9 = isObligation(_0x1a5ce6);
    const _0x52e284 = [_0x5dd50d(0x194), _0x5dd50d(0x22d), 'porridge', _0x5dd50d(0x1fc), 'fees', _0x5dd50d(0x1b0), _0x5dd50d(0x21c), _0x5dd50d(0x1ec), _0x5dd50d(0x22a), _0x5dd50d(0x1a5)],
        _0x2ee366 = ['beer', _0x5dd50d(0x1cb), 'club', _0x5dd50d(0x1e0), 'shopping', 'clothes', _0x5dd50d(0x21e), _0x5dd50d(0x1a4), _0x5dd50d(0x199), _0x5dd50d(0x191)];
    (_0x52e284[_0x5dd50d(0x142)](_0x3f3c07 => _0x2edbc4['includes'](_0x3f3c07)) || _0x4848b9) && (_0x5ce9d7 = !![], _0x464810 = _0x4848b9 ? _0x5dd50d(0x12c) : _0x5dd50d(0x24d));
    _0x2ee366[_0x5dd50d(0x142)](_0x533d2e => _0x2edbc4[_0x5dd50d(0x209)](_0x533d2e)) && (_0x464810 = 'luxury\x20/\x20secondary');
    const _0x473c4a = _0x926b11 > _0x2aa0b9[_0x5dd50d(0x183)],
        _0x4ea1bb = _0x2ac270['daysRem'] > 0x0 ? Math['floor']((_0x2ac270['safeCash'] - _0x926b11) / _0x2ac270[_0x5dd50d(0x223)]) : 0x0,
        _0x5a97ed = Math[_0x5dd50d(0x246)](_0x2aa0b9['dailyCap'] * 0.7);
    let _0x1243b7 = _0x5dd50d(0x1f6);
    _0x1243b7 += _0x5dd50d(0x1a2) + _0x1a5ce6 + '\x22</div>';
    if (_0x926b11 > 0x0) _0x1243b7 += '<div\x20class=\x22text-xl\x22>You\x27re\x20considering\x20spending\x20KSh\x20' + _0x926b11[_0x5dd50d(0x138)]() + _0x5dd50d(0x1ca) + _0x464810 + '</span>.</div>';
    else _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x204)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x1b1)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x1bf)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x250)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x18e)) ? _0x1243b7 += _0x5dd50d(0x1d9) : _0x1243b7 += '<div\x20class=\x22text-xl\x22>Got\x20it\x20—\x20let\x27s\x20talk\x20money.</div>';
    let _0x52712d = _0x2aa0b9[_0x5dd50d(0x20c)];
    _0x1243b7 += '<div\x20class=\x22mt-4\x22>Current\x20status:\x20<span\x20style=\x22color:' + _0x52712d + '\x22>' + _0x2aa0b9['riskLabel'] + '\x20RISK</span>\x20•\x20Daily\x20cap:\x20KSh\x20' + _0x2aa0b9[_0x5dd50d(0x183)] + '</div>';
    if (_0x926b11 > 0x0) {
        let _0xb11d5f = _0x5dd50d(0x24a),
            _0x3099ef = '',
            _0x275a8f = '';
        _0x4848b9 || _0x5ce9d7 ? _0x473c4a ? (_0xb11d5f = _0x5dd50d(0x1df), _0x3099ef = 'This\x20is\x20important,\x20but\x20it\x27s\x20above\x20your\x20daily\x20cap\x20(KSh\x20' + _0x2aa0b9[_0x5dd50d(0x183)] + _0x5dd50d(0x184) + _0x4ea1bb + _0x5dd50d(0x144), _0x275a8f = 'If\x20I\x20were\x20you,\x20I\x27d\x20cap\x20it\x20at\x20KSh\x20' + _0x5a97ed + _0x5dd50d(0x251) + (_0x2aa0b9[_0x5dd50d(0x223)] - 0x1) + _0x5dd50d(0x1e9)) : (_0x3099ef = _0x5dd50d(0x22e), _0x275a8f = _0x5dd50d(0x182)) : _0x473c4a ? (_0xb11d5f = _0x5dd50d(0x1ad), _0x3099ef = _0x5dd50d(0x1b8) + _0x4ea1bb + _0x5dd50d(0x1ab), _0x275a8f = 'Strong\x20advice:\x20don\x27t\x20do\x20the\x20full\x20amount.\x20If\x20you\x20really\x20want\x20it,\x20limit\x20to\x20KSh\x20' + _0x5a97ed + '\x20today.\x20Better\x20to\x20keep\x20buffer\x20for\x20emergencies.') : (_0x3099ef = _0x5dd50d(0x1c7), _0x275a8f = _0x5dd50d(0x133)), _0x1243b7 += _0x5dd50d(0x158) + _0xb11d5f + _0x5dd50d(0x1bc) + _0x3099ef + _0x5dd50d(0x186), _0x1243b7 += _0x5dd50d(0x241) + _0x275a8f + '</div>';
    } else {
        if (_0x2edbc4['includes'](_0x5dd50d(0x204)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x1b1)) || _0x2edbc4['includes'](_0x5dd50d(0x1bf)) || _0x2edbc4['includes'](_0x5dd50d(0x250))) {
            if (_0x2aa0b9[_0x5dd50d(0x1c8)] === _0x5dd50d(0x23b)) _0x1243b7 += _0x5dd50d(0x226);
            else _0x2aa0b9[_0x5dd50d(0x1c8)] === _0x5dd50d(0x1e7) ? _0x1243b7 += '<div\x20class=\x22mt-6\x20text-2xl\x20font-bold\x20text-[#eab308]\x22>Yellow\x20zone\x20—\x20things\x20are\x20okay\x20but\x20watch\x20spending.\x20Next\x203\x20days\x20look\x20manageable\x20if\x20we\x20stay\x20disciplined.</div>' : _0x1243b7 += _0x5dd50d(0x13d);
        } else _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x18e)) || _0x2edbc4[_0x5dd50d(0x209)](_0x5dd50d(0x1dd)) ? _0x1243b7 += _0x5dd50d(0x188) : _0x1243b7 += _0x5dd50d(0x12f);
    }
    travisMemory[_0x5dd50d(0x1f9)] > 0x5 && Math[_0x5dd50d(0x1fd)]() > 0.6 && (_0x1243b7 += _0x5dd50d(0x1a0)), _0x19c1c9[_0x5dd50d(0x1a3)] += '<div\x20class=\x22text-right\x22><span\x20class=\x22user-msg\x20text-sm\x20inline-block\x22>' + _0x1a5ce6 + _0x5dd50d(0x187), _0x19c1c9[_0x5dd50d(0x1a3)] += _0x5dd50d(0x15c) + _0x1243b7 + _0x5dd50d(0x187), _0x258283[_0x5dd50d(0x1c0)] = '', _0x19c1c9['scrollTop'] = _0x19c1c9[_0x5dd50d(0x155)];
}

function nav(_0x5532bf) {
    const _0x501891 = _0x17ff71,
        _0x33e6d7 = document['getElementById'](_0x501891(0x190)),
        _0x43ed2d = getFin();
    updateHeader(_0x43ed2d);
    if (_0x5532bf === _0x501891(0x1ac)) {
        const _0x82ef52 = calculateInsolvencyRisk(),
            _0x38f941 = _0x43ed2d['obsStatus'][_0x501891(0x1aa)](_0x1da09c => _0x1da09c[_0x501891(0x17f)] > 0x0);
        _0x33e6d7['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22grid\x20grid-cols-1\x20lg:grid-cols-3\x20gap-6\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22lg:col-span-1\x20space-y-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-6\x20border-l-4\x22\x20style=\x22border-color:\x20' + _0x82ef52['color'] + _0x501891(0x1b7) + _0x82ef52['color'] + '\x22>' + _0x82ef52[_0x501891(0x196)] + _0x501891(0x17b) + (0x64 - _0x82ef52[_0x501891(0x176)]) + _0x501891(0x1b3) + (_0x38f941[_0x501891(0x12b)] > 0x0 ? _0x38f941[_0x501891(0x1d0)](_0x1521f1 => _0x501891(0x1a9) + _0x1521f1[_0x501891(0x196)] + _0x501891(0x255) + _0x1521f1[_0x501891(0x17f)]['toLocaleString']() + _0x501891(0x187))[_0x501891(0x166)]('') : _0x501891(0x17e)) + _0x501891(0x1ff) + _0x43ed2d[_0x501891(0x1c4)][_0x501891(0x138)]() + _0x501891(0x15f), setTimeout(() => renderChart(), 0x64);
    }
    if (_0x5532bf === _0x501891(0x220)) {
        let _0x292a93 = _0x43ed2d[_0x501891(0x18d)][_0x501891(0x1d0)](_0xa95c1f => _0x501891(0x259) + _0xa95c1f[_0x501891(0x196)] + _0x501891(0x173) + _0xa95c1f[_0x501891(0x224)][_0x501891(0x138)]() + '\x20|\x20Spent:\x20' + _0xa95c1f[_0x501891(0x211)][_0x501891(0x138)]() + _0x501891(0x14d) + (_0xa95c1f['pending'] <= 0x0 ? 'text-green-400' : 'text-yellow-500') + _0x501891(0x207) + (_0xa95c1f[_0x501891(0x1f2)] <= 0x0 ? _0x501891(0x217) : _0x501891(0x177) + _0xa95c1f[_0x501891(0x1f2)][_0x501891(0x138)]()) + _0x501891(0x1fb) + (_0xa95c1f[_0x501891(0x17f)] > 0x0 ? '<p\x20class=\x22text-[9px]\x20text-red-500\x20font-bold\x20uppercase\x20tracking-tighter\x22>+' + _0xa95c1f[_0x501891(0x17f)][_0x501891(0x138)]() + _0x501891(0x240) : '') + _0x501891(0x149))['join']('');
        _0x33e6d7[_0x501891(0x1a3)] = _0x501891(0x1ba) + (_0x292a93 || '<p\x20class=\x22opacity-30\x22>No\x20obligations.</p>') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20onclick=\x22factoryReset()\x22\x20class=\x22mt-20\x20text-red-900\x20text-[10px]\x20font-bold\x20uppercase\x20tracking-widest\x20hover:text-red-500\x22>Full\x20System\x20Wipe</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>';
    }
    _0x5532bf === _0x501891(0x15a) && (_0x33e6d7['innerHTML'] = _0x501891(0x175), document[_0x501891(0x13a)](_0x501891(0x153))[_0x501891(0x214)](_0x501891(0x231), _0x2a20dd => {
        const _0x172c54 = _0x501891;
        if (_0x2a20dd[_0x172c54(0x254)] === 'Enter') handleAsk();
    }));
    if (_0x5532bf === _0x501891(0x1c6)) {
        let _0x27527c = state[_0x501891(0x16c)][_0x501891(0x1d0)](_0x32ae21 => {
            const _0x1fd4ef = _0x501891,
                _0x54c330 = _0x32ae21['amount'][_0x1fd4ef(0x138)]();
            return _0x1fd4ef(0x208) + new Date(_0x32ae21['id'])[_0x1fd4ef(0x234)](_0x1fd4ef(0x16b)) + _0x1fd4ef(0x1d8) + _0x32ae21[_0x1fd4ef(0x19d)] + _0x1fd4ef(0x171) + _0x32ae21['debit'] + _0x1fd4ef(0x225) + _0x32ae21['credit'] + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22p-4\x20text-right\x20text-green-400\x20font-black\x20tracking-tighter\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20+' + _0x54c330 + _0x1fd4ef(0x1e2) + _0x54c330 + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>';
        })[_0x501891(0x166)]('');
        _0x33e6d7[_0x501891(0x1a3)] = _0x501891(0x242) + (_0x27527c || _0x501891(0x1af)) + _0x501891(0x1ea);
    }
}

function renderChart() {
    const _0x203045 = _0x17ff71,
        _0x2fad55 = document['getElementById'](_0x203045(0x1b9))?.[_0x203045(0x14a)]('2d');
    if (!_0x2fad55) return;
    const _0x21f335 = getFin(),
        _0x3f550f = new Date();
    let _0x4b94c5 = [],
        _0x1c1f25 = [],
        _0x525691 = [],
        _0x52cc06 = [];
    for (let _0x26cc57 = 0x6; _0x26cc57 >= 0x0; _0x26cc57--) {
        const _0x196b28 = new Date();
        _0x196b28[_0x203045(0x14b)](_0x3f550f['getDate']() - _0x26cc57), _0x4b94c5[_0x203045(0x174)](_0x196b28[_0x203045(0x234)]('en-KE', {
            'weekday': _0x203045(0x21f)
        }));
        let _0x34ecd7 = 0x0,
            _0x4d3d4e = 0x0;
        state['transactions'][_0x203045(0x143)](_0x1ecfa2 => {
            const _0x326037 = _0x203045;
            if (new Date(_0x1ecfa2['id'])[_0x326037(0x16d)]() === _0x196b28['toDateString']()) {
                if (isLiquid(_0x1ecfa2[_0x326037(0x160)])) _0x34ecd7 += _0x1ecfa2['amount'];
                if (isLiquid(_0x1ecfa2['debit'])) _0x4d3d4e += _0x1ecfa2[_0x326037(0x224)];
            }
        }), _0x1c1f25['push'](_0x34ecd7), _0x525691[_0x203045(0x174)](_0x4d3d4e), _0x52cc06[_0x203045(0x174)](_0x21f335[_0x203045(0x13b)]);
    }
    if (window[_0x203045(0x12a)]) window['travisChart']['destroy']();
    window[_0x203045(0x12a)] = new Chart(_0x2fad55, {
        'type': _0x203045(0x19f),
        'data': {
            'labels': _0x4b94c5,
            'datasets': [{
                'label': _0x203045(0x1de),
                'data': _0x52cc06,
                'borderColor': '#3b82f6',
                'borderDash': [0x5, 0x5],
                'pointRadius': 0x0,
                'fill': ![]
            }, {
                'label': _0x203045(0x203),
                'data': _0x1c1f25,
                'borderColor': _0x203045(0x1ad),
                'backgroundColor': _0x203045(0x1f3),
                'fill': !![],
                'tension': 0.4
            }, {
                'label': _0x203045(0x201),
                'data': _0x525691,
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

function updateHeader(_0x14cc8a) {
    const _0x38a488 = _0x17ff71,
        _0xfd4710 = document[_0x38a488(0x13a)](_0x38a488(0x16f));
    _0xfd4710[_0x38a488(0x1a3)] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22glass\x20p-4\x20border-l-4\x20border-blue-500\x22><p\x20class=\x22text-[10px]\x20opacity-40\x20uppercase\x22>Total\x20Liquid</p><p\x20class=\x22text-xl\x20font-bold\x22>KSh\x20' + _0x14cc8a[_0x38a488(0x1c9)][_0x38a488(0x138)]() + _0x38a488(0x1c2) + _0x14cc8a[_0x38a488(0x1f2)][_0x38a488(0x138)]() + _0x38a488(0x164) + _0x14cc8a[_0x38a488(0x223)] + _0x38a488(0x179) + Math[_0x38a488(0x24c)](0x0, _0x14cc8a['daily'])[_0x38a488(0x235)](0x0) + _0x38a488(0x1d5);
    const _0x3672a1 = document[_0x38a488(0x13a)](_0x38a488(0x1a8));
    _0x3672a1[_0x38a488(0x1dc)] = _0x14cc8a['safeCash'] < 0x0 ? _0x38a488(0x1a6) : _0x38a488(0x15d), _0x3672a1[_0x38a488(0x1ae)] = _0x14cc8a['safeCash'] < 0x0 ? _0x38a488(0x13e) : _0x38a488(0x168);
}

function isLiquid(_0x2b599c) {
    const _0x336376 = _0x17ff71;
    return ['Cash', 'M-Pesa', _0x336376(0x227), 'Petty\x20Cash'][_0x336376(0x209)](_0x2b599c);
}

function getBalance(_0x1baf96) {
    const _0x6ec96b = _0x17ff71;
    let _0x375cae = 0x0;
    state[_0x6ec96b(0x16c)]['forEach'](_0x5a413b => {
        const _0x2e37e5 = _0x6ec96b;
        if (_0x5a413b[_0x2e37e5(0x156)] === _0x1baf96) _0x375cae += _0x5a413b[_0x2e37e5(0x224)];
        if (_0x5a413b[_0x2e37e5(0x160)] === _0x1baf96) _0x375cae -= _0x5a413b[_0x2e37e5(0x224)];
    });
    const _0x1e89d9 = [_0x6ec96b(0x1f0), 'M-Pesa', _0x6ec96b(0x227), _0x6ec96b(0x1e4), _0x6ec96b(0x181), 'Stock', _0x6ec96b(0x12e)];
    return _0x1e89d9[_0x6ec96b(0x209)](_0x1baf96) ? _0x375cae : -_0x375cae;
}

function showTxModal() {
    const _0x540b5e = _0x17ff71,
        _0x2c919c = document[_0x540b5e(0x13a)](_0x540b5e(0x131)),
        _0x45f06d = document[_0x540b5e(0x13a)](_0x540b5e(0x205));
    _0x2c919c[_0x540b5e(0x1a3)] = _0x45f06d['innerHTML'] = '';
    const _0xecd9ac = state['user'][_0x540b5e(0x1e5)] === _0x540b5e(0x248) ? [_0x540b5e(0x1f0), 'M-Pesa', _0x540b5e(0x148), 'Food', 'Rent', 'Bills', _0x540b5e(0x1bb), _0x540b5e(0x147), _0x540b5e(0x1d6)] : [_0x540b5e(0x227), _0x540b5e(0x1e4), _0x540b5e(0x1a1), 'Inventory', _0x540b5e(0x1f5), _0x540b5e(0x1ed), _0x540b5e(0x180), 'Marketing', 'Tax'];
    _0xecd9ac[_0x540b5e(0x143)](_0xb746c2 => {
        const _0x6e634f = _0x540b5e;
        _0x2c919c[_0x6e634f(0x145)](new Option(_0xb746c2, _0xb746c2)), _0x45f06d[_0x6e634f(0x145)](new Option(_0xb746c2, _0xb746c2));
    }), document['getElementById']('tx-modal')[_0x540b5e(0x150)][_0x540b5e(0x236)](_0x540b5e(0x20d)), updateLiveHud();
}
async function commitTransaction() {
    const _0x3d87cb = _0x17ff71,
        _0x32c832 = parseFloat(document['getElementById'](_0x3d87cb(0x1c5))[_0x3d87cb(0x1c0)]),
        _0x2fa79a = document['getElementById'](_0x3d87cb(0x131))[_0x3d87cb(0x1c0)],
        _0x4df9a6 = document[_0x3d87cb(0x13a)]('tx-credit')[_0x3d87cb(0x1c0)],
        _0x58e6e5 = document[_0x3d87cb(0x13a)](_0x3d87cb(0x172))[_0x3d87cb(0x1c0)] || _0x3d87cb(0x134);
    if (_0x2fa79a === _0x4df9a6 || isNaN(_0x32c832) || _0x32c832 <= 0x0) return alert(_0x3d87cb(0x146));
    const _0x1b3b79 = {
        'id': Date[_0x3d87cb(0x1f8)](),
        'debit': _0x2fa79a,
        'credit': _0x4df9a6,
        'amount': _0x32c832,
        'desc': _0x58e6e5
    };
    state[_0x3d87cb(0x16c)][_0x3d87cb(0x24b)](_0x1b3b79), await saveData('tx', _0x1b3b79), console['log'](_0x3d87cb(0x253) + _0x2fa79a + _0x3d87cb(0x1da) + _0x32c832 + ',\x20' + _0x4df9a6 + _0x3d87cb(0x19e) + _0x32c832 + '.'), closeTxModal(), nav(_0x3d87cb(0x1ac));
}

function addObligationRow(_0x22b71f = '', _0x3ed75d = '') {
    const _0x99bf22 = _0x17ff71,
        _0xabb789 = document[_0x99bf22(0x20f)](_0x99bf22(0x137));
    _0xabb789[_0x99bf22(0x1ae)] = _0x99bf22(0x244), _0xabb789[_0x99bf22(0x1a3)] = _0x99bf22(0x219) + _0x22b71f + _0x99bf22(0x1f1) + _0x3ed75d + '\x22\x20class=\x22w-24\x20p-2\x20text-sm\x22><button\x20onclick=\x22this.parentElement.remove()\x22\x20class=\x22text-red-500\x20font-bold\x22>×</button>', document[_0x99bf22(0x13a)](_0x99bf22(0x22b))[_0x99bf22(0x17a)](_0xabb789);
}

function setUserType(_0x3d67a4) {
    const _0xdfb2a8 = _0x17ff71;
    state[_0xdfb2a8(0x200)] = _0x3d67a4, document['getElementById'](_0xdfb2a8(0x18c))['style']['borderColor'] = _0x3d67a4 === _0xdfb2a8(0x248) ? _0xdfb2a8(0x24a) : _0xdfb2a8(0x19b), document[_0xdfb2a8(0x13a)](_0xdfb2a8(0x140))['style'][_0xdfb2a8(0x23f)] = _0x3d67a4 === _0xdfb2a8(0x1b1) ? _0xdfb2a8(0x24a) : _0xdfb2a8(0x19b);
}
async function finalizeSetup() {
    const _0x591a7a = _0x17ff71,
        _0x290ad9 = document[_0x591a7a(0x13a)](_0x591a7a(0x162))['value'],
        _0x45800c = Array[_0x591a7a(0x14f)](document['querySelectorAll']('#obligation-list\x20>\x20div'))['map'](_0x480dce => ({
            'label': _0x480dce[_0x591a7a(0x239)](_0x591a7a(0x1db))[0x0][_0x591a7a(0x1c0)],
            'amount': parseFloat(_0x480dce[_0x591a7a(0x239)](_0x591a7a(0x1db))[0x1][_0x591a7a(0x1c0)]) || 0x0
        }))[_0x591a7a(0x1aa)](_0xe40b4e => _0xe40b4e['label']);
    if (!_0x290ad9 || !state['tempType']) return alert(_0x591a7a(0x22c));
    state[_0x591a7a(0x1d3)] = {
        'name': _0x290ad9,
        'type': state[_0x591a7a(0x200)]
    }, state[_0x591a7a(0x19a)] = _0x45800c, await saveData(_0x591a7a(0x222), {
        'id': _0x591a7a(0x178),
        'user': state[_0x591a7a(0x1d3)],
        'obligations': state[_0x591a7a(0x19a)]
    }), location[_0x591a7a(0x1c3)]();
}
async function factoryReset() {
    const _0x1caf60 = _0x17ff71;
    confirm('Confirm\x20system\x20purge?\x20All\x20financial\x20history\x20will\x20be\x20deleted.') && (indexedDB[_0x1caf60(0x13c)](_0x1caf60(0x232)), location['reload']());
}
async function boot() {
    const _0x56cfa4 = _0x17ff71;
    await initDB();
    const _0xfc13c4 = await getData(_0x56cfa4(0x222), _0x56cfa4(0x178));
    _0xfc13c4 ? (state['user'] = _0xfc13c4['user'], state['obligations'] = _0xfc13c4['obligations'], state[_0x56cfa4(0x16c)] = (await getAllData('tx'))[_0x56cfa4(0x24e)]((_0x40c9e6, _0x40f100) => _0x40f100['id'] - _0x40c9e6['id']), document[_0x56cfa4(0x13a)]('display-name')[_0x56cfa4(0x1dc)] = state['user']['name'], document[_0x56cfa4(0x13a)](_0x56cfa4(0x237))[_0x56cfa4(0x1dc)] = state[_0x56cfa4(0x1d3)][_0x56cfa4(0x1e5)] + '\x20STRATEGY\x20ENGINE', nav('dash')) : document['getElementById'](_0x56cfa4(0x1be))[_0x56cfa4(0x150)][_0x56cfa4(0x236)]('hidden');
}
async function saveData(_0x13eed2, _0x34f08a) {
    const _0x223272 = _0x17ff71,
        _0x446bc6 = db['transaction'](_0x13eed2, _0x223272(0x1cf));
    return _0x446bc6[_0x223272(0x1cd)](_0x13eed2)[_0x223272(0x165)](_0x34f08a), new Promise(_0x2ddff3 => _0x446bc6[_0x223272(0x141)] = _0x2ddff3);
}
async function getData(_0xa8d013, _0x11fbd4) {
    const _0x2347dc = _0x17ff71,
        _0x282f5e = db['transaction'](_0xa8d013, 'readonly'),
        _0x56bb42 = _0x282f5e['objectStore'](_0xa8d013)['get'](_0x11fbd4);
    return new Promise(_0x2695ca => _0x56bb42['onsuccess'] = () => _0x2695ca(_0x56bb42[_0x2347dc(0x1eb)]));
}

function _0x4822(_0x17c0a5, _0x3be01f) {
    _0x17c0a5 = _0x17c0a5 - 0x12a;
    const _0x3c3f50 = _0x3c3f();
    let _0x482264 = _0x3c3f50[_0x17c0a5];
    return _0x482264;
}
async function getAllData(_0x2aa8f8) {
    const _0xb60e41 = _0x17ff71,
        _0x18b22f = db[_0xb60e41(0x218)](_0x2aa8f8, _0xb60e41(0x1fa)),
        _0x2a3008 = _0x18b22f[_0xb60e41(0x1cd)](_0x2aa8f8)[_0xb60e41(0x132)]();
    return new Promise(_0x3ee1ca => _0x2a3008[_0xb60e41(0x256)] = () => _0x3ee1ca(_0x2a3008['result']));
}

function closeTxModal() {
    const _0x116be4 = _0x17ff71;
    document['getElementById'](_0x116be4(0x1b5))[_0x116be4(0x150)][_0x116be4(0x145)](_0x116be4(0x20d)), document[_0x116be4(0x13a)](_0x116be4(0x1c5))[_0x116be4(0x1c0)] = '';
}
window[_0x17ff71(0x252)] = boot;
async function boot() {
    const _0x49ef55 = _0x17ff71;
    await initDB();
    let _0x150e9b = await getData(_0x49ef55(0x222), _0x49ef55(0x178)) || {
        'activated': ![]
    };
    const _0x2377ff = window[_0x49ef55(0x197)](_0x49ef55(0x135))['matches'] || navigator[_0x49ef55(0x23d)] === !![];
    await new Promise(_0x49b2df => setTimeout(_0x49b2df, 0x320));
    if (!_0x150e9b['activated']) _0x2377ff ? (document[_0x49ef55(0x13a)](_0x49ef55(0x1f4))[_0x49ef55(0x150)]['remove']('hidden'), document[_0x49ef55(0x13a)](_0x49ef55(0x1d2))['classList'][_0x49ef55(0x145)]('hidden'), document[_0x49ef55(0x13a)](_0x49ef55(0x19c))[_0x49ef55(0x150)][_0x49ef55(0x145)]('hidden')) : (document[_0x49ef55(0x13a)](_0x49ef55(0x1d2))['classList'][_0x49ef55(0x236)](_0x49ef55(0x20d)), document[_0x49ef55(0x13a)]('activation-overlay')['classList'][_0x49ef55(0x145)](_0x49ef55(0x20d)), document[_0x49ef55(0x13a)]('app')[_0x49ef55(0x150)][_0x49ef55(0x145)](_0x49ef55(0x20d)));
    else !_0x150e9b[_0x49ef55(0x1d3)] ? (document[_0x49ef55(0x13a)]('setup-overlay')[_0x49ef55(0x150)][_0x49ef55(0x236)]('hidden'), document[_0x49ef55(0x13a)](_0x49ef55(0x1d2))['classList'][_0x49ef55(0x145)]('hidden'), document[_0x49ef55(0x13a)](_0x49ef55(0x19c))[_0x49ef55(0x150)]['add']('hidden')) : (state[_0x49ef55(0x1d3)] = _0x150e9b['user'], state[_0x49ef55(0x19a)] = _0x150e9b[_0x49ef55(0x19a)], state[_0x49ef55(0x16c)] = (await getAllData('tx'))['sort']((_0x8022c2, _0x438ef9) => _0x438ef9['id'] - _0x8022c2['id']), document[_0x49ef55(0x13a)](_0x49ef55(0x228))[_0x49ef55(0x1dc)] = state[_0x49ef55(0x1d3)]['name'], document['getElementById'](_0x49ef55(0x237))[_0x49ef55(0x1dc)] = state['user']['type'] + _0x49ef55(0x192), document[_0x49ef55(0x13a)](_0x49ef55(0x19c))['classList'][_0x49ef55(0x236)](_0x49ef55(0x20d)), document[_0x49ef55(0x13a)](_0x49ef55(0x1d2))[_0x49ef55(0x150)][_0x49ef55(0x145)](_0x49ef55(0x20d)), document[_0x49ef55(0x13a)]('setup-overlay')[_0x49ef55(0x150)][_0x49ef55(0x145)](_0x49ef55(0x20d)), nav(_0x49ef55(0x1ac)));
}
document['getElementById'](_0x17ff71(0x17d))?.['addEventListener'](_0x17ff71(0x206), triggerInstall), window[_0x17ff71(0x252)] = boot;
