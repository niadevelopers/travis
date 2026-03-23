// ================== INDEXEDDB SETUP ==================
let db;
let currentUser = null;
let transactions = [];
let accounts = {};
let userType = "business";

async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("TravisFinanceDB", 5);
        
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            // Create stores if they don't exist
            if (!db.objectStoreNames.contains("profile")) db.createObjectStore("profile", { keyPath: "userId" });
            if (!db.objectStoreNames.contains("transactions")) db.createObjectStore("transactions", { keyPath: "id" });
            if (!db.objectStoreNames.contains("accounts")) db.createObjectStore("accounts", { keyPath: "name" });
        };

        request.onsuccess = (event) => { 
            db = event.target.result; 
            resolve(); 
        };
        
        request.onerror = () => reject(request.error);
        
        request.onblocked = () => {
            alert("Database is blocked. Please close other tabs of this app.");
        };
    });
}

async function loadProfile() {
    return new Promise((resolve) => {
        const tx = db.transaction("profile", "readonly");
        const req = tx.objectStore("profile").getAll();
        req.onsuccess = () => resolve(req.result[0] || null);
    });
}

async function saveProfile(profile) {
    return new Promise((resolve) => {
        const tx = db.transaction("profile", "readwrite");
        tx.objectStore("profile").put(profile);
        tx.oncomplete = resolve;
    });
}

async function loadTransactions() {
    return new Promise((resolve) => {
        const tx = db.transaction("transactions", "readonly");
        const req = tx.objectStore("transactions").getAll();
        req.onsuccess = () => { 
            // Sort by date descending for better display
            transactions = req.result ? req.result.sort((a, b) => b.id - a.id) : []; 
            resolve(); 
        };
    });
}

async function saveTransactionToDB(txObj) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction("transactions", "readwrite");
        tx.objectStore("transactions").put(txObj);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
    });
}

async function loadAccounts() {
    return new Promise((resolve) => {
        const tx = db.transaction("accounts", "readonly");
        const req = tx.objectStore("accounts").getAll();
        req.onsuccess = () => {
            accounts = {};
            req.result.forEach(a => {
                if (a.name) accounts[a.name] = { group: a.group, normal: a.normal };
            });
            resolve();
        };
    });
}

async function saveAccountsToDB() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction("accounts", "readwrite");
        const store = tx.objectStore("accounts");
        Object.entries(accounts).forEach(([name, def]) => {
            store.put({ name, group: def.group, normal: def.normal });
        });
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
    });
}

function getDefaultAccounts(type) {
    if (type === "personal") {
        return {
            "Cash in Hand": { group: "Assets", normal: "debit" },
            "M-Pesa": { group: "Assets", normal: "debit" },
            "Savings": { group: "Assets", normal: "debit" },
            "Salary Receivable": { group: "Assets", normal: "debit" },
            "Loans": { group: "Liabilities", normal: "credit" },
            "Salary Income": { group: "Income", normal: "credit" },
            "Side Hustle Income": { group: "Income", normal: "credit" },
            "Rent & Food": { group: "Expenses", normal: "debit" },
            "Transport": { group: "Expenses", normal: "debit" },
            "Utilities": { group: "Expenses", normal: "debit" }
        };
    } else {
        return {
            "Cash in Hand": { group: "Assets", normal: "debit" },
            "M-Pesa/Bank": { group: "Assets", normal: "debit" },
            "Petty Cash": { group: "Assets", normal: "debit" },
            "Debtors/Accounts Receivable": { group: "Assets", normal: "debit" },
            "Inventory/Stock": { group: "Assets", normal: "debit" },
            "Creditors/Accounts Payable": { group: "Liabilities", normal: "credit" },
            "Loans/Borrowings": { group: "Liabilities", normal: "credit" },
            "Sales Revenue": { group: "Income", normal: "credit" },
            "Purchases/COGS": { group: "Expenses", normal: "debit" },
            "Salaries & Wages": { group: "Expenses", normal: "debit" },
            "Rent": { group: "Expenses", normal: "debit" },
            "Utilities": { group: "Expenses", normal: "debit" },
            "Transport & Fuel": { group: "Expenses", normal: "debit" }
        };
    }
}

// ================== REGISTRATION ==================
let selectedUserType = "business";

function selectType(t) {
    selectedUserType = t;
    document.getElementById("type-business").classList.toggle("border-[#4ade80]", t === "business");
    document.getElementById("type-business").classList.toggle("border-[#14532d]", t !== "business");
    document.getElementById("type-personal").classList.toggle("border-[#4ade80]", t === "personal");
    document.getElementById("type-personal").classList.toggle("border-[#14532d]", t !== "personal");
}

async function completeRegistration() {
    const nameInput = document.getElementById("reg-name");
    const emailInput = document.getElementById("reg-email");
    const name = nameInput ? nameInput.value.trim() || "Job" : "Job";
    const email = emailInput ? emailInput.value.trim() || "job@example.com" : "job@example.com";

    currentUser = {
        userId: Date.now().toString(),
        name: name,
        email: email,
        type: selectedUserType,
        registeredAt: new Date().toISOString()
    };

    try {
        await saveProfile(currentUser);
        userType = selectedUserType;
        accounts = getDefaultAccounts(userType);
        await saveAccountsToDB();

        if (transactions.length === 0) {
            const today = new Date().toISOString().split('T')[0];
            const demoTx = {
                id: Date.now(),
                date: today,
                debit: Object.keys(accounts)[0],
                credit: Object.keys(accounts)[Object.keys(accounts).length - 2],
                amount: 45000,
                desc: "Demo transaction - Setup balance"
            };
            transactions.push(demoTx);
            await saveTransactionToDB(demoTx);
        }

        document.getElementById("register-overlay").classList.add("hidden");
        document.getElementById("main-app").classList.remove("hidden");
        await initializeAfterRegistration();
    } catch (err) {
        alert("Registration error: " + err.message);
    }
}

async function syncToCloud() {
    console.log("%c📤 SYNCED TO MONGODB (simulated)", "color:#4ade80");
    alert("✅ Synced to MongoDB + IndexedDB");
}

// ================== BALANCE & STATS ==================
function getBalance(accName) {
    let debits = 0, credits = 0;
    transactions.forEach(tx => {
        if (tx.debit === accName) debits += tx.amount;
        if (tx.credit === accName) credits += tx.amount;
    });
    const normal = accounts[accName] ? accounts[accName].normal : "debit";
    return normal === "debit" ? debits - credits : credits - debits;
}

function getMonthlyStats() {
    let income = 0, expenses = 0, cashTotal = 0;
    const incomeKeys = Object.keys(accounts).filter(k => accounts[k].group === "Income");
    const expenseKeys = Object.keys(accounts).filter(k => accounts[k].group === "Expenses");
    const cashKeys = ["Cash in Hand", "M-Pesa", "M-Pesa/Bank", "Savings", "Petty Cash"];

    transactions.forEach(tx => {
        if (incomeKeys.includes(tx.credit)) income += tx.amount;
        if (expenseKeys.includes(tx.debit)) expenses += tx.amount;
    });

    cashKeys.forEach(k => {
        if (accounts[k]) cashTotal += getBalance(k);
    });

    const monthlyExp = expenses || 8000; // Baseline expense floor
    const monthsLast = (cashTotal / monthlyExp).toFixed(1);
    return { income, expenses, cashTotal, monthsLast: parseFloat(monthsLast) };
}

// ================== PAYDAY LOGIC + SMART ADVISOR ==================
function getDaysToPayday() {
    const now = new Date();
    const day = now.getDate();
    // Assuming payday is the 25th
    return day < 25 ? 25 - day : 30 - day + 25;
}

function parseAndAdvise(question) {
            const q = question.toLowerCase().trim();
            const stats = getMonthlyStats();
            let amount = 0;
            let purpose = "fun/miscellaneous";

            // 1. Extract Amount
            const numMatch = q.match(/(\d+)(k|000)?/i);
            if (numMatch) {
                amount = parseInt(numMatch[1]);
                if (numMatch[2]) amount *= 1000;
            }

            // 2. Identify Purpose
            if (q.includes("stock") || q.includes("bidhaa")) purpose = "buying stock";
            else if (q.includes("hire") || q.includes("staff")) purpose = "hiring staff";
            else if (q.includes("beer") || q.includes("sherehe") || q.includes("party") || q.includes("club") || q.includes("drink")) purpose = "sherehe/drinks";
            else if (q.includes("shopping") || q.includes("clothes")) purpose = "shopping";

            // 3. Realistic Math
            const daysToPayday = Math.max(1, Math.ceil(getDaysToPayday()));
            const currentCash = stats.cashTotal;
            
            // Daily allowance based on what you actually have until payday
            const dailyAllowance = Math.floor(currentCash / daysToPayday);
            const remainingAfterSpend = currentCash - amount;
            const newDailyAllowance = Math.floor(remainingAfterSpend / daysToPayday);

            let html = `<div class="text-5xl mb-4">🧠</div>`;
            html += `<div class="text-[#4ade80] text-3xl">Travis Analysis: "${question}"</div><br>`;

            html += `<div class="mt-6 text-xl leading-tight">`;
            html += `Cash available: <span class="text-[#86efac]">KSh ${currentCash.toLocaleString()}</span><br>`;
            html += `Days until payday: <span class="text-[#86efac]">${daysToPayday} days</span><br>`;
            html += `Current Daily Budget: <span class="text-[#86efac]">KSh ${dailyAllowance.toLocaleString()}/day</span><br><br>`;

            if (amount > 0) {
                html += `Spending KSh ${amount.toLocaleString()} on <span class="text-yellow-400">${purpose}</span>:<br>`;
                html += `• Remaining Cash: KSh ${remainingAfterSpend.toLocaleString()}<br>`;
                html += `• New Daily Budget: <span class="text-yellow-400">KSh ${newDailyAllowance.toLocaleString()}/day</span><br><br>`;
            }

            // 4. THE VERDICT (Reasonable Advisor)
            if (amount > currentCash) {
                html += `<span class="text-red-400 text-3xl">BOSS, HAUNA HII PESA. You only have ${currentCash.toLocaleString()}. Transaction denied.</span>`;
            } else if (newDailyAllowance < 500 && purpose === "sherehe/drinks") {
                // If spending on beer leaves you with less than 500 a day for food/transport
                html += `<span class="text-red-400 text-3xl">CHONJO! Spending this on beer leaves you with only KSh ${newDailyAllowance} per day. Utakula nini? Travis says NO.</span>`;
            } else if (amount <= dailyAllowance) {
                // If the expense is less than one day's allowance, it's always okay
                html += `<span class="text-[#4ade80] text-3xl">IKO SAWA. It's within your daily limit. Enjoy, but record it!</span>`;
            } else if (purpose === "buying stock") {
                html += `<span class="text-[#4ade80] text-3xl">APPROVED. This is an investment. It will bring back more than KSh ${amount.toLocaleString()}.</span>`;
            } else if (newDailyAllowance > 1500) {
                // You have plenty of money left
                html += `<span class="text-[#4ade80] text-3xl">Sawa kabisa. You have a huge buffer (KSh ${newDailyAllowance}/day). Endelea.</span>`;
            } else {
                html += `<span class="text-yellow-400 text-3xl">STRETCHING IT. This is more than your daily budget. If you do this, you must spend KSh 0 tomorrow to balance.</span>`;
            }
            
            html += `</div>`;
            return html;
        }

function askTravis() {
    const qInput = document.getElementById("quick-ask");
    const q = qInput ? qInput.value.trim() : "";
    if (!q) return;
    document.getElementById("travis-advice").innerHTML = parseAndAdvise(q);
}

function askTravisDeep() {
    const input = document.getElementById("travis-chat-input") ? document.getElementById("travis-chat-input").value : "general";
    document.getElementById("main-content").innerHTML = `
        <div class="max-w-3xl mx-auto bg-[#0a3d22] p-12 border-8 border-[#4ade80]">
            <div class="text-5xl mb-8">Travis Full Discipline Report</div>
            ${parseAndAdvise(input)}
            <button onclick="switchTab(0)" class="mt-12 bevel-btn bg-[#4ade80] text-[#052e16] py-8 w-full text-3xl">BACK TO DASHBOARD</button>
        </div>`;
}

// ================== RENDER FUNCTIONS ==================
function renderDashboard() {
    const stats = getMonthlyStats();
    let net = 0;
    Object.keys(accounts).forEach(k => {
        const b = getBalance(k);
        if (accounts[k].group === "Assets") net += b;
        if (accounts[k].group === "Liabilities") net -= b;
    });
    
    const verdict = stats.monthsLast < 2 ? {text:"RED ZONE – CRITICAL", face:"😟", color:"red"} :
                    stats.monthsLast < 3 ? {text:"YELLOW ZONE – CAUTION", face:"😐", color:"yellow"} :
                    {text:"GREEN ZONE ✓", face:"😎", color:"green"};

    let html = `
        <div class="max-w-7xl mx-auto">
            <div class="bg-[#0a3d22] border-8 border-[#4ade80] p-8">
                <div class="text-6xl">Your cash can last you <span class="text-[#86efac]">${stats.monthsLast} months</span></div>
                <div class="text-3xl mt-4">Income this month: KSh ${stats.income.toLocaleString()} | Expenses: KSh ${stats.expenses.toLocaleString()}</div>
                <div class="text-5xl mt-8 text-[#4ade80]">Total net worth: KSh ${net.toLocaleString()}</div>
            </div>
        </div>`;

    document.getElementById("main-content").innerHTML = html;
    
    // Update Global UI elements
    const netEl = document.getElementById("total-net");
    const vBadge = document.getElementById("verdict-badge");
    const tFace = document.getElementById("travis-face");
    const tFaceTop = document.getElementById("travis-face-top");

    if (netEl) netEl.textContent = "KSh " + net.toLocaleString();
    if (vBadge) {
        vBadge.innerHTML = verdict.text;
        vBadge.className = `px-8 py-1 text-2xl font-bold rounded-full border-4 ${verdict.color === 'red' ? 'border-red-500 text-red-400 red-zone' : verdict.color === 'yellow' ? 'border-yellow-400 text-yellow-400' : 'border-[#4ade80] text-[#4ade80]'}`;
    }
    if (tFace) tFace.textContent = verdict.face;
    if (tFaceTop) tFaceTop.textContent = verdict.face;
}

function renderCashBook() {
    let html = `<div class="max-w-6xl mx-auto"><h2 class="text-5xl mb-8">THREE-COLUMN CASH BOOK</h2><table class="ledger-table w-full bg-[#0a3d22]"><thead><tr><th>Date</th><th>Narrative</th><th>Cash In</th><th>Cash Out</th><th>Bank/M-Pesa</th></tr></thead><tbody>`;
    transactions.forEach(tx => {
        const cashIn = (tx.debit === "Cash in Hand" || tx.debit === "Petty Cash") ? tx.amount : 0;
        const cashOut = (tx.credit === "Cash in Hand" || tx.credit === "Petty Cash") ? tx.amount : 0;
        const bankMpesa = (tx.debit.includes("M-Pesa") || tx.credit.includes("M-Pesa") || tx.debit.includes("Bank") || tx.credit.includes("Bank")) ? tx.amount : 0;
        
        html += `<tr>
            <td>${tx.date}</td>
            <td>${tx.desc}</td>
            <td class="text-right text-[#4ade80]">${cashIn ? cashIn.toLocaleString() : '-'}</td>
            <td class="text-right text-red-400">${cashOut ? cashOut.toLocaleString() : '-'}</td>
            <td class="text-right">${bankMpesa ? bankMpesa.toLocaleString() : '-'}</td>
        </tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("main-content").innerHTML = html;
}

function renderPettyCash() {
    const bal = getBalance("Petty Cash") || getBalance("Cash in Hand");
    document.getElementById("main-content").innerHTML = `
        <div class="max-w-4xl mx-auto text-center">
            <div class="bg-[#0a3d22] border-8 border-[#4ade80] p-16">
                <div class="text-6xl mb-6">PETTY CASH FLOAT</div>
                <div class="text-8xl text-[#4ade80]">KSh ${bal.toLocaleString()}</div>
            </div>
        </div>`;
}

function renderGeneralLedger() {
    let html = `<div class="max-w-6xl mx-auto"><h2 class="text-5xl mb-8">GENERAL LEDGER</h2><table class="ledger-table w-full bg-[#0a3d22]"><thead><tr><th>Account</th><th>Group</th><th>Balance KSh</th></tr></thead><tbody>`;
    Object.keys(accounts).sort().forEach(acc => {
        const bal = getBalance(acc);
        html += `<tr><td>${acc}</td><td>${accounts[acc].group}</td><td class="text-right text-3xl ${bal>=0?'text-[#4ade80]':'text-red-400'}">${bal.toLocaleString()}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("main-content").innerHTML = html;
}

function renderAllTransactions() {
    let html = `<div class="max-w-6xl mx-auto"><h2 class="text-5xl mb-8">ALL TRANSACTIONS</h2><table class="ledger-table w-full bg-[#0a3d22]"><thead><tr><th>Date</th><th>Debit</th><th>Credit</th><th>Amount</th><th>Narrative</th></tr></thead><tbody>`;
    transactions.forEach(tx => {
        html += `<tr><td>${tx.date}</td><td>${tx.debit}</td><td>${tx.credit}</td><td class="text-right">KSh ${tx.amount.toLocaleString()}</td><td>${tx.desc}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    document.getElementById("main-content").innerHTML = html;
}

function renderNewTransaction() {
    document.getElementById("main-content").innerHTML = `
        <div class="max-w-xl mx-auto text-center mt-20">
            <div class="text-6xl mb-10">Ready to record a transaction?</div>
            <button onclick="showModal()" class="bevel-btn bg-[#4ade80] text-[#052e16] text-6xl px-20 py-10">+ RECORD DOUBLE-ENTRY NOW</button>
        </div>`;
}

function renderAskTravis() {
    document.getElementById("main-content").innerHTML = `
        <div class="max-w-2xl mx-auto mt-20">
            <div class="bg-[#0a3d22] p-12 border-8 border-[#4ade80]">
                <div class="text-5xl mb-8">Ask Travis (he uses your real numbers)</div>
                <input id="travis-chat-input" type="text" class="w-full bg-[#052e16] border-4 border-[#4ade80] p-8 text-3xl" placeholder="Should I spend 5000 on party?">
                <button onclick="askTravisDeep()" class="mt-8 w-full py-8 text-4xl bg-[#4ade80] text-[#052e16] bevel-btn">GET FULL REPORT</button>
            </div>
        </div>`;
}

function switchTab(tab) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach((b, i) => {
        if (b) b.style.background = i === tab ? '#166534' : 'transparent';
    });
    
    if (tab === 0) renderDashboard();
    else if (tab === 1) renderCashBook();
    else if (tab === 2) renderPettyCash();
    else if (tab === 3) renderGeneralLedger();
    else if (tab === 4) renderAllTransactions();
    else if (tab === 5) renderNewTransaction();
    else if (tab === 6) renderAskTravis();
}

// ================== MODAL & SAVE ==================
function showModal() {
    const modal = document.getElementById("tx-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    
    const debitSel = document.getElementById("debit-acc");
    const creditSel = document.getElementById("credit-acc");
    
    debitSel.innerHTML = "";
    creditSel.innerHTML = "";
    
    Object.keys(accounts).sort().forEach(acc => {
        const o1 = document.createElement("option"); o1.value = acc; o1.textContent = acc; debitSel.appendChild(o1);
        const o2 = document.createElement("option"); o2.value = acc; o2.textContent = acc; creditSel.appendChild(o2);
    });
}

function hideModal() {
    const modal = document.getElementById("tx-modal");
    if (modal) modal.classList.add("hidden");
}

async function saveTransaction() {
    const debit = document.getElementById("debit-acc").value;
    const credit = document.getElementById("credit-acc").value;
    const amountVal = document.getElementById("tx-amount").value;
    const amount = parseFloat(amountVal);
    const desc = document.getElementById("tx-desc").value || "Manual entry";
    
    if (!amount || debit === credit) return alert("Fill all fields correctly. Debit and Credit must differ.");

    const newTx = { 
        id: Date.now(), 
        date: new Date().toISOString().split('T')[0], 
        debit, 
        credit, 
        amount, 
        desc 
    };

    transactions.unshift(newTx);
    await saveTransactionToDB(newTx);
    hideModal();
    switchTab(0);
}

function clearAllData() {
    if (confirm("Reset everything? All your financial history will be deleted.")) {
        indexedDB.deleteDatabase("TravisFinanceDB");
        location.reload();
    }
}

async function initializeAfterRegistration() {
    const badge = document.getElementById("user-type-badge");
    const pill = document.getElementById("user-pill");
    
    if (badge) badge.innerHTML = `${userType.toUpperCase()} MODE`;
    if (pill) pill.innerHTML = `👤 ${currentUser.name} <span class="text-xs ml-3">(${userType})</span>`;
    
    await loadTransactions();
    await loadAccounts();
    switchTab(0);
}

// ================== BOOT ==================
async function bootTravisFinance() {
    await openDB();
    const profile = await loadProfile();
    
    const regOverlay = document.getElementById("register-overlay");
    const mainApp = document.getElementById("main-app");

    if (profile) {
        currentUser = profile;
        userType = profile.type;
        if (regOverlay) regOverlay.classList.add("hidden");
        if (mainApp) mainApp.classList.remove("hidden");
        await initializeAfterRegistration();
    } else {
        if (regOverlay) regOverlay.classList.remove("hidden");
        selectType("business");
    }
}

window.onload = bootTravisFinance;