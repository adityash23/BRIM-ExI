(() => {
    const STORAGE = {
        route: "exi.route",
        account: "exi.account",
        talkHasMessage: "exi.talk.hasMessage",
        theme: "exi.theme",
    };

    const DEFAULT_ROUTE = "talk-to-data";
    const APP_NAME = "ExI";
    const ACCOUNTS = ["Admin", "John"];

    const TRANSITION = {
        riseMs: 210,
        riseDriftPx: 18,
        easeRise: "cubic-bezier(0.22, 0.88, 0.24, 1)",
    };

    const icons = {
        "talk-to-data": `<svg class="sidebar-item__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7.5A3.5 3.5 0 0 1 8.5 4h7A3.5 3.5 0 0 1 19 7.5v4A3.5 3.5 0 0 1 15.5 15H11l-3.8 3.5c-.6.5-1.2.1-1.2-.6V15.4A3.4 3.4 0 0 1 5 12.1z"/><path d="M9 9.5h6M9 12h4"/></svg>`,
        "policy-compliance": `<svg class="sidebar-item__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3.6v5.2c0 4.4-3 7.8-7 9.2-4-1.4-7-4.8-7-9.2V6.6z"/><path d="M9.3 12.1l1.8 1.8 3.6-3.6"/></svg>`,
        "pre-approval": `<svg class="sidebar-item__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="5.75" r="1.6"/><path d="M7 7.5v4.2a3.3 3.3 0 0 0 3.3 3.3h7.2"/><path d="M14.8 12.8 17.5 15.5l-2.7 2.7"/></svg>`,
        "expense-reports": `<svg class="sidebar-item__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="3.5" width="12" height="17" rx="2" ry="2"/><path d="M9 8.5h6M9 12h6M9 15.5h3.5"/></svg>`,
    };

    const routes = [
        {
            id: DEFAULT_ROUTE,
            title: "Talk to data",
            navLabel: "Talk to your data",
            render: (state) => `
                <section class="page talk-page ${state.talkHasMessage ? "has-message" : ""}">
                    <div class="talk-page__bloom" aria-hidden="true">
                        <div class="talk-page__bloom-core"></div>
                    </div>
                    <div class="talk-page__stack">
                    <div class="talk-page__splash" aria-live="polite">
                        <p class="talk-page__kicker">Brim Intel</p>
                        <p class="talk-page__headline">Ask your data anything.</p>
                    </div>
                    <div class="talk-page__thread" id="talkThread" aria-live="polite"></div>
                    <section class="composer" aria-label="Talk to your data composer">
                        <form class="composer__card" data-role="prompt-form">
                            <label class="sr-only" for="talkPrompt">Type your question</label>
                            <textarea id="talkPrompt" class="composer__input" placeholder="Type your question here..." rows="4"></textarea>
                            <div class="composer__actions">
                                <button type="submit" class="send-button" aria-label="Send prompt">
                                    <svg class="send-button__icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M5 11.5 19.5 4 13 19.5l-2.2-5.8z"/>
                                        <path d="M10.8 13.7 19.4 4.1"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </section>
                    </div>
                </section>`,
        },
        {
            id: "policy-compliance",
            title: "Policy Compliance Engine",
            navLabel: "Policy compliance engine",
            render: () => `
                <section class="page pc-page">
                    <div class="pc-wrap">
                        <div class="pc-tabs" role="tablist" aria-label="Policy Compliance sections">
                            <button class="pc-tab is-active" data-tab="rules" role="tab" aria-selected="true">Rules</button>
                            <button class="pc-tab" data-tab="compliance" role="tab" aria-selected="false">Compliance</button>
                        </div>
                        <div class="pc-pane is-active" data-pane="rules">
                            <div class="pc-panel">
                                <div class="pc-panel__head">
                                    <div>
                                        <h2 class="pc-panel__title">Expense Policy Rules</h2>
                                        <p class="pc-panel__sub">Define rules in plain language — the AI applies them when scanning transactions.</p>
                                    </div>
                                </div>
                                <ol class="rules-list" id="rulesList" aria-label="Policy rules"></ol>
                                <button class="rules-add-row" data-action="add-rule" aria-label="Add new policy rule">
                                    <svg class="rules-add-row__icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
                                    Add rule
                                </button>
                            </div>
                        </div>
                        <div class="pc-pane" data-pane="compliance">
                            <div class="pc-panel">
                                <div class="pc-panel__head pc-panel__head--row">
                                    <div class="pc-subtabs" role="tablist" aria-label="Compliance views">
                                        <button class="pc-subtab is-active" data-subtab="violations" role="tab" aria-selected="true">
                                            <svg class="pc-subtab__icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5L14.5 13.5H1.5Z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r="0.6" fill="currentColor" stroke="none"/></svg>
                                            Violations
                                        </button>
                                        <button class="pc-subtab" data-subtab="leaderboard" role="tab" aria-selected="false">
                                            <svg class="pc-subtab__icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="9" width="3.5" height="5.5" rx="0.5"/><rect x="6.25" y="5.5" width="3.5" height="9" rx="0.5"/><rect x="11" y="2" width="3.5" height="12.5" rx="0.5"/></svg>
                                            By Employee
                                        </button>
                                    </div>
                                    <div class="pc-toolbar" id="complianceToolbar"></div>
                                </div>
                                <div class="compliance-body" id="complianceBody"></div>
                            </div>
                        </div>
                    </div>
                </section>`,
        },
        {
            id: "pre-approval",
            title: "AI Pre-Approval Workflow",
            navLabel: "AI pre-approval workflow",
            render: () => centeredTitle("AI Pre-Approval Workflow"),
        },
        {
            id: "expense-reports",
            title: "Expense Report Generation",
            navLabel: "Expense report generation",
            render: () => centeredTitle("Expense Report Generation"),
        },
    ];

    const routeById = Object.fromEntries(routes.map((r) => [r.id, r]));

    function centeredTitle(text) {
        return `<section class="page page--centered-title"><h1>${text}</h1></section>`;
    }

    const store = {
        get(key) {
            try {
                return window.localStorage.getItem(key);
            } catch {
                return null;
            }
        },
        set(key, value) {
            try {
                window.localStorage.setItem(key, value);
            } catch {
                /* private mode */
            }
        },
    };

    function parseHashRoute() {
        const hash = window.location.hash;
        return hash.startsWith("#/") ? hash.slice(2) : "";
    }

    function normalizeAccount(value) {
        return ACCOUNTS.includes(value) ? value : ACCOUNTS[0];
    }

    function readStoredTheme() {
        const v = store.get(STORAGE.theme);
        if (v === "dark" || v === "light") {
            return v;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    const POLICY_RULES = [
        "Single transactions exceeding $500 require manager pre-approval before purchase.",
        "All airfare and hotel bookings must be made through the approved company travel portal.",
        "Client meal expenses are capped at $75 per person; internal team meals are capped at $50 per person.",
        "Software and SaaS subscriptions above $100/month require IT department approval.",
        "Splitting a transaction into smaller charges to circumvent approval thresholds is strictly prohibited.",
        "Alcohol may only be expensed during approved client entertainment events with a documented attendee list.",
        "Office supply purchases up to $150 may be made without prior approval.",
        "International travel totalling over $2,000 requires written CFO approval at least 5 business days in advance.",
        "All entertainment expenses must include the names, titles, and business purpose for every attendee.",
        "Personal expenses must never be combined with business transactions on a company card.",
    ];

    const VIOLATIONS_DATA = [
        { id: 1,  employee: "Marcus Webb",  dept: "Sales",       amount: 612,  merchant: "Marriott Hotels",   date: "2024-03-14", rule: "Transactions over $500 require pre-approval",       severity: "high", note: "No approval on file for this charge." },
        { id: 2,  employee: "Priya Nair",   dept: "Marketing",   amount: 284,  merchant: "Delta Airlines",     date: "2024-03-11", rule: "Airfare must be booked via travel portal",          severity: "med",  note: "Booked directly on airline website." },
        { id: 3,  employee: "James Okafor", dept: "Engineering", amount: 180,  merchant: "AWS Marketplace",    date: "2024-03-09", rule: "SaaS subscriptions >$100/mo need IT approval",      severity: "med",  note: "No IT ticket linked to this purchase." },
        { id: 4,  employee: "Marcus Webb",  dept: "Sales",       amount: 490,  merchant: "Hilton Garden Inn",  date: "2024-03-07", rule: "Possible split to avoid $500 approval threshold",   severity: "high", note: "$490 + $290 same vendor same day — likely split." },
        { id: 5,  employee: "Sarah Chen",   dept: "Marketing",   amount: 93,   merchant: "Nobu Restaurant",    date: "2024-03-05", rule: "Client meals capped at $75/person",                 severity: "low",  note: "$93/person across 3 listed attendees." },
        { id: 6,  employee: "Dylan Park",   dept: "Operations",  amount: 1840, merchant: "Lufthansa",          date: "2024-02-28", rule: "Airfare must be booked via travel portal",          severity: "high", note: "Business class ticket, no portal booking." },
        { id: 7,  employee: "Aisha Mensah", dept: "Finance",     amount: 340,  merchant: "Total Wine & More",  date: "2024-02-22", rule: "Alcohol only at approved client events",            severity: "high", note: "No client event on record for this date." },
        { id: 8,  employee: "James Okafor", dept: "Engineering", amount: 290,  merchant: "AWS Marketplace",    date: "2024-02-19", rule: "SaaS subscriptions >$100/mo need IT approval",      severity: "med",  note: "Second charge this month, still no approval." },
        { id: 9,  employee: "Priya Nair",   dept: "Marketing",   amount: 55,   merchant: "Starbucks",          date: "2024-02-15", rule: "Entertainment must list attendees and purpose",      severity: "low",  note: "No attendees or business purpose listed." },
        { id: 10, employee: "Tom Vasquez",  dept: "Sales",       amount: 2400, merchant: "United Airlines",    date: "2024-02-10", rule: "International travel >$2K needs CFO approval",      severity: "high", note: "Paris trip — no CFO sign-off found." },
        { id: 11, employee: "Sarah Chen",   dept: "Marketing",   amount: 780,  merchant: "Hyatt Regency",      date: "2024-02-08", rule: "Transactions over $500 require pre-approval",       severity: "high", note: "Conference hotel, pre-approval absent." },
        { id: 12, employee: "Dylan Park",   dept: "Operations",  amount: 160,  merchant: "Office Depot",       date: "2024-02-03", rule: "Office supplies capped at $150 without approval",   severity: "low",  note: "Just $10 over threshold." },
    ];

    const LEADERBOARD_DATA = [
        { employee: "Marcus Webb",  dept: "Sales",       violations: 4, totalAmount: 1842, highCount: 2, medCount: 1, lowCount: 1 },
        { employee: "Dylan Park",   dept: "Operations",  violations: 3, totalAmount: 2160, highCount: 2, medCount: 0, lowCount: 1 },
        { employee: "James Okafor", dept: "Engineering", violations: 3, totalAmount: 590,  highCount: 0, medCount: 2, lowCount: 1 },
        { employee: "Sarah Chen",   dept: "Marketing",   violations: 3, totalAmount: 928,  highCount: 1, medCount: 1, lowCount: 1 },
        { employee: "Priya Nair",   dept: "Marketing",   violations: 2, totalAmount: 339,  highCount: 0, medCount: 1, lowCount: 1 },
        { employee: "Aisha Mensah", dept: "Finance",     violations: 2, totalAmount: 450,  highCount: 1, medCount: 1, lowCount: 0 },
        { employee: "Tom Vasquez",  dept: "Sales",       violations: 1, totalAmount: 2400, highCount: 1, medCount: 0, lowCount: 0 },
        { employee: "Kenji Tanaka", dept: "HR",          violations: 1, totalAmount: 95,   highCount: 0, medCount: 0, lowCount: 1 },
    ];

    class App {
        constructor(root) {
            this.root = root;
            this.routeStage = root.querySelector("#routeStage");
            this.sidebarNav = root.querySelector("#sidebarNav");
            this.themeToggle = root.querySelector("#themeToggle");
            this.accountDock = root.querySelector("#accountDock");
            this.accountInitial = root.querySelector("#accountInitial");
            this.accountPanel = root.querySelector("#accountPanel");
            this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
            this.state = {
                currentRoute: "",
                account: normalizeAccount(store.get(STORAGE.account)),
                talkHasMessage: false,
            };
            this.onDocPointerDown = this.onDocPointerDown.bind(this);
            this.onKeydown = this.onKeydown.bind(this);
        }

        init() {
            this.applyTheme(readStoredTheme());
            this.buildSidebar();
            this.buildAccountMenu();
            this.bindShell();
            this.syncAccountUi();
            this.resolveInitialRoute();
            window.addEventListener("hashchange", () => this.renderFromHash());
        }

        applyTheme(theme) {
            const next = theme === "dark" ? "dark" : "light";
            document.documentElement.dataset.theme = next;
            store.set(STORAGE.theme, next);
            if (this.themeToggle) {
                this.themeToggle.setAttribute("aria-label", next === "dark" ? "Use light mode" : "Use dark mode");
            }
        }

        toggleTheme() {
            const cur = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
            this.applyTheme(cur === "dark" ? "light" : "dark");
        }

        buildSidebar() {
            this.sidebarNav.innerHTML = routes
                .map(
                    (r) => `
                <button type="button" class="sidebar-item" data-route="${r.id}" aria-label="${r.navLabel}" title="${r.navLabel}">
                    ${icons[r.id] ?? ""}
                </button>`
                )
                .join("");
            this.sidebarItems = Array.from(this.sidebarNav.querySelectorAll(".sidebar-item"));
            this.sidebarItems.forEach((btn) => {
                btn.addEventListener("click", () => this.navigate(btn.dataset.route));
            });
        }

        buildAccountMenu() {
            this.accountPanel.innerHTML = ACCOUNTS.map(
                (name) =>
                    `<button type="button" class="account-option" data-account="${name}" role="menuitemradio" aria-checked="false">${name}</button>`
            ).join("");
            this.accountOptions = Array.from(this.accountPanel.querySelectorAll(".account-option"));
            this.accountOptions.forEach((opt) => {
                opt.addEventListener("click", () => this.setAccount(opt.dataset.account));
            });
        }

        bindShell() {
            document.addEventListener("pointerdown", this.onDocPointerDown);
            document.addEventListener("keydown", this.onKeydown);
            this.themeToggle?.addEventListener("click", () => {
                const docEl = document.documentElement;
                docEl.classList.add("no-transition");
                void docEl.offsetHeight;
                this.toggleTheme();
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        docEl.classList.remove("no-transition");
                    });
                });
            });
        }

        onDocPointerDown(event) {
            if (!this.accountDock?.open) {
                return;
            }
            if (this.accountDock.contains(event.target)) {
                return;
            }
            this.accountDock.removeAttribute("open");
        }

        onKeydown(event) {
            if (event.key !== "Escape") {
                return;
            }
            this.accountDock?.removeAttribute("open");
        }

        setAccount(name) {
            const next = normalizeAccount(name);
            this.state.account = next;
            store.set(STORAGE.account, next);
            this.syncAccountUi();
            this.accountDock.removeAttribute("open");
        }

        syncAccountUi() {
            this.accountInitial.textContent = this.state.account.charAt(0).toUpperCase();
            this.accountOptions.forEach((opt) => {
                const active = opt.dataset.account === this.state.account;
                opt.classList.toggle("is-active", active);
                opt.setAttribute("aria-checked", String(active));
            });
        }

        resolveInitialRoute() {
            const fromHash = parseHashRoute();
            const fromStore = store.get(STORAGE.route);
            const id = routeById[fromHash]
                ? fromHash
                : routeById[fromStore]
                  ? fromStore
                  : DEFAULT_ROUTE;
            this.navigate(id, { replace: true });
        }

        navigate(routeId, { replace = false } = {}) {
            if (!routeById[routeId]) {
                return;
            }
            const target = `#/${routeId}`;
            if (replace) {
                window.history.replaceState(null, "", target);
                this.renderFromHash();
                return;
            }
            if (window.location.hash === target) {
                return;
            }
            window.location.hash = target;
        }

        renderFromHash() {
            let id = parseHashRoute();
            if (!routeById[id]) {
                id = DEFAULT_ROUTE;
                window.history.replaceState(null, "", `#/${id}`);
            }
            const route = routeById[id];
            this.state.currentRoute = route.id;
            store.set(STORAGE.route, route.id);
            document.title = `${route.title} · ${APP_NAME}`;
            this.syncSidebar();
            this.renderRoute(route);
        }

        syncSidebar() {
            this.sidebarItems.forEach((btn) => {
                const active = btn.dataset.route === this.state.currentRoute;
                btn.classList.toggle("is-active", active);
                btn.setAttribute("aria-current", active ? "page" : "false");
            });
        }

        async renderRoute(route, isInitial) {
            const next = document.createElement("div");
            next.className = "route-view";
            next.dataset.route = route.id;
            next.innerHTML = route.render(this.state);
            this.attachRouteHandlers(next, route.id);
            const prev = this.routeStage.querySelector(".route-view");

            if (!prev || isInitial || this.reduceMotion.matches) {
                this.routeStage.replaceChildren(next);
                if (!this.reduceMotion.matches) {
                    await this.playRiseIn(next);
                }
                return;
            }

            this.routeStage.appendChild(next);
            prev.remove();
            await this.playRiseIn(next);
        }

        playRiseIn(el) {
            const { riseMs, riseDriftPx, easeRise } = TRANSITION;
            const anim = el.animate(
                [
                    { opacity: 0, transform: `translateY(${riseDriftPx}px)` },
                    { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: riseMs, easing: easeRise, fill: "both" }
            );
            return anim.finished.catch(() => undefined);
        }

        appendMessage(thread, role, text) {
            const msg = document.createElement("div");
            msg.className = `msg msg--${role}`;
            const bubble = document.createElement("div");
            bubble.className = "msg__bubble";
            bubble.textContent = text;
            msg.appendChild(bubble);
            thread.appendChild(msg);
            msg.scrollIntoView({ behavior: "smooth", block: "end" });
            return msg;
        }

        appendLoading(thread) {
            const msg = document.createElement("div");
            msg.className = "msg msg--ai";
            msg.innerHTML = `<div class="msg__bubble msg__loading"><span></span><span></span><span></span></div>`;
            thread.appendChild(msg);
            msg.scrollIntoView({ behavior: "smooth", block: "end" });
            return msg;
        }

        attachRouteHandlers(view, routeId) {
            if (routeId === "policy-compliance") {
                this.attachPolicyHandlers(view);
                return;
            }
            if (routeId !== DEFAULT_ROUTE) {
                return;
            }
            const form = view.querySelector('[data-role="prompt-form"]');
            const input = view.querySelector("#talkPrompt");
            const sendBtn = view.querySelector(".send-button");
            if (!form || !input) {
                return;
            }
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const text = input.value.trim();
                if (!text) {
                    return;
                }

                const thread = view.querySelector("#talkThread");

                if (!this.state.talkHasMessage) {
                    this.state.talkHasMessage = true;
                    view.querySelector(".talk-page")?.classList.add("has-message");
                    const onExpanded = (e) => {
                        if (e.propertyName !== "flex-grow") return;
                        thread.removeEventListener("transitionend", onExpanded);
                        thread.style.overflowY = "auto";
                    };
                    thread.addEventListener("transitionend", onExpanded);
                }

                input.value = "";
                input.focus();
                if (sendBtn) sendBtn.disabled = true;

                this.appendMessage(thread, "user", text);
                const loadingEl = this.appendLoading(thread);

                await new Promise((r) => setTimeout(r, 1400 + Math.random() * 600));
                loadingEl.remove();
                this.appendMessage(thread, "ai", "This is a placeholder response. Connect the model API here.");

                if (sendBtn) sendBtn.disabled = false;
                input.focus();
            });
            input.addEventListener("keydown", (e) => {
                if (e.key !== "Enter" || e.shiftKey) {
                    return;
                }
                e.preventDefault();
                form.requestSubmit();
            });
        }

        attachPolicyHandlers(view) {
            const rulesData = [...POLICY_RULES];

            const cs = {
                subtab: "violations",
                vSort: { key: "date", dir: "desc" },
                vFilter: { severity: null },
                lSort: { key: "violations", dir: "desc" },
                lFilter: { dept: null },
            };

            const rulesList   = view.querySelector("#rulesList");
            const addRuleBtn  = view.querySelector("[data-action='add-rule']");
            const toolbar     = view.querySelector("#complianceToolbar");
            const body        = view.querySelector("#complianceBody");

            const dismissedIds = new Set();

            const fmtAmt  = (n) => `$${n.toLocaleString("en-US")}`;
            const fmtDate = (d) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            const sevOrder = { high: 0, med: 1, low: 2 };
            const sevLabel = { high: "High", med: "Medium", low: "Low" };
            const SORT_SVG = `<svg class="vt__sort-icon" width="9" height="6" viewBox="0 0 9 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l3.5 4 3.5-4"/></svg>`;
            const DEL_SVG  = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5h10M6 4.5V3h4v1.5M5 4.5l.7 8h4.6l.7-8"/></svg>`;

            // ── Tab switching ──────────────────────────────────────────
            view.querySelectorAll("[data-tab]").forEach(tab => {
                tab.addEventListener("click", () => {
                    view.querySelectorAll("[data-tab]").forEach(t => {
                        const a = t === tab;
                        t.classList.toggle("is-active", a);
                        t.setAttribute("aria-selected", String(a));
                    });
                    view.querySelectorAll("[data-pane]").forEach(p => {
                        p.classList.toggle("is-active", p.dataset.pane === tab.dataset.tab);
                    });
                });
            });

            // ── Rules list ─────────────────────────────────────────────
            const ruleRowIndex = (li) => [...rulesList.querySelectorAll(".rule-row")].indexOf(li);

            const renumberRuleRows = () => {
                rulesList.querySelectorAll(".rule-row").forEach((row, i) => {
                    row.querySelector(".rule-row__num").textContent = String(i + 1);
                    row.querySelector(".rule-row__input").setAttribute("aria-label", `Rule ${i + 1}`);
                });
            };

            const createRuleRow = (dataIndex, { animate = false, staggerIndex } = {}) => {
                const li = document.createElement("li");
                li.className = "rule-row" + (animate ? " rule-row--enter" : "");
                if (animate) {
                    li.style.animationDelay = staggerIndex != null ? `${staggerIndex * 18}ms` : "0ms";
                }

                const num = document.createElement("span");
                num.className = "rule-row__num";
                num.setAttribute("aria-hidden", "true");
                num.textContent = String(dataIndex + 1);

                const inp = document.createElement("div");
                inp.className = "rule-row__input";
                inp.contentEditable = "plaintext-only";
                inp.setAttribute("role", "textbox");
                inp.setAttribute("aria-label", `Rule ${dataIndex + 1}`);
                inp.setAttribute("aria-multiline", "true");
                inp.textContent = rulesData[dataIndex] ?? "";

                const del = document.createElement("button");
                del.type = "button";
                del.className = "rule-row__del";
                del.setAttribute("aria-label", "Delete rule");
                del.title = "Delete rule";
                del.innerHTML = DEL_SVG;

                del.addEventListener("click", () => {
                    const idx = ruleRowIndex(li);
                    if (idx < 0) return;
                    rulesData.splice(idx, 1);
                    li.remove();
                    renumberRuleRows();
                });

                inp.addEventListener("blur", () => {
                    const idx = ruleRowIndex(li);
                    if (idx < 0) return;
                    const val = inp.innerText.trim();
                    if (val) {
                        rulesData[idx] = val;
                    } else {
                        rulesData.splice(idx, 1);
                        li.remove();
                        renumberRuleRows();
                    }
                });

                inp.addEventListener("keydown", (e) => {
                    if (e.key !== "Enter" || e.shiftKey) return;
                    e.preventDefault();
                    const idx = ruleRowIndex(li);
                    if (idx < 0) return;
                    rulesData[idx] = inp.innerText.trim() || rulesData[idx];
                    const next = li.nextElementSibling;
                    if (next?.classList.contains("rule-row")) {
                        next.querySelector(".rule-row__input").focus();
                    } else {
                        rulesData.splice(idx + 1, 0, "");
                        const nu = createRuleRow(idx + 1, { animate: true });
                        li.after(nu);
                        renumberRuleRows();
                        nu.querySelector(".rule-row__input").focus();
                    }
                });

                li.append(num, inp, del);
                return li;
            };

            const renderRules = () => {
                rulesList.innerHTML = "";
                rulesData.forEach((_, i) => {
                    rulesList.appendChild(createRuleRow(i, { animate: true, staggerIndex: i }));
                });
            };

            addRuleBtn?.addEventListener("click", () => {
                rulesData.push("");
                rulesList.appendChild(createRuleRow(rulesData.length - 1, { animate: true }));
                rulesList.querySelector(".rule-row:last-child .rule-row__input")?.focus();
            });

            renderRules();

            // ── Compliance ─────────────────────────────────────────────
            const makeSortTh = (label, key, sortState) => {
                const th = document.createElement("th");
                if (key) {
                    th.dataset.sort = key;
                    if (sortState.key === key) {
                        th.classList.add("is-sorted");
                        if (sortState.dir === "asc") th.classList.add("sort-asc");
                    }
                    th.addEventListener("click", () => {
                        sortState.dir = sortState.key === key && sortState.dir === "desc" ? "asc" : "desc";
                        sortState.key = key;
                        renderBody();
                    });
                }
                th.innerHTML = label + (key ? SORT_SVG : "");
                return th;
            };

            const buildViolationsTable = () => {
                const rows = VIOLATIONS_DATA
                    .filter(v => !dismissedIds.has(v.id))
                    .filter(v => !cs.vFilter.severity || v.severity === cs.vFilter.severity)
                    .sort((a, b) => {
                        const k = cs.vSort.key, d = cs.vSort.dir;
                        let va = a[k], vb = b[k];
                        if (k === "severity") { va = sevOrder[a.severity]; vb = sevOrder[b.severity]; }
                        if (k === "date")     { va = +new Date(a.date); vb = +new Date(b.date); }
                        return d === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
                    });

                const table = document.createElement("table");
                table.className = "vt";
                const thead = document.createElement("thead");
                thead.className = "vt__head";
                const htr = document.createElement("tr");
                [["Employee","employee"],["Amount","amount"],["Merchant","merchant"],["Date","date"],["Rule / Note",null],["Severity","severity"]]
                    .forEach(([lbl, key]) => htr.appendChild(makeSortTh(lbl, key, cs.vSort)));
                thead.appendChild(htr);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                tbody.className = "vt__body";

                if (!rows.length) {
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.colSpan = 6;
                    td.className = "vt__empty";
                    td.textContent = "No violations match the current filter.";
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                } else {
                    rows.forEach((v, i) => {
                        const tr = document.createElement("tr");
                        tr.className = "is-clickable";
                        tr.style.animationDelay = `${i * 22}ms`;
                        tr.addEventListener("click", () => openViolationDialog(v));

                        const tdE = document.createElement("td");
                        tdE.append(
                            Object.assign(document.createElement("div"), { className: "vt__name", textContent: v.employee }),
                            Object.assign(document.createElement("div"), { className: "vt__sub",  textContent: v.dept })
                        );

                        const tdA = Object.assign(document.createElement("td"), { className: "vt__amount", textContent: fmtAmt(v.amount) });
                        const tdM = Object.assign(document.createElement("td"), { textContent: v.merchant });

                        const tdD = document.createElement("td");
                        tdD.style.cssText = "white-space:nowrap;font-size:0.82rem;color:var(--color-text-secondary)";
                        tdD.textContent = fmtDate(v.date);

                        const tdR = document.createElement("td");
                        tdR.append(
                            Object.assign(document.createElement("div"), { className: "vt__rule-text", textContent: v.rule }),
                            Object.assign(document.createElement("div"), { className: "vt__note",      textContent: v.note })
                        );

                        const tdS = document.createElement("td");
                        const badge = document.createElement("span");
                        badge.className = `sev-badge sev-badge--${v.severity}`;
                        badge.textContent = sevLabel[v.severity];
                        tdS.appendChild(badge);

                        tr.append(tdE, tdA, tdM, tdD, tdR, tdS);
                        tbody.appendChild(tr);
                    });
                }
                table.appendChild(tbody);
                return table;
            };

            const buildLeaderboardTable = () => {
                const rows = LEADERBOARD_DATA
                    .filter(r => !cs.lFilter.dept || r.dept === cs.lFilter.dept)
                    .sort((a, b) => {
                        const k = cs.lSort.key, d = cs.lSort.dir;
                        const va = a[k], vb = b[k];
                        return d === "asc" ? (va < vb ? -1 : va > vb ? 1 : 0) : (va > vb ? -1 : va < vb ? 1 : 0);
                    });

                const table = document.createElement("table");
                table.className = "lb";
                const thead = document.createElement("thead");
                thead.className = "lb__head";
                const htr = document.createElement("tr");
                [["#",null],["Employee","employee"],["Department","dept"],["Violations","violations"],["Total $","totalAmount"],["Breakdown",null]]
                    .forEach(([lbl, key]) => htr.appendChild(makeSortTh(lbl, key, cs.lSort)));
                thead.appendChild(htr);
                table.appendChild(thead);

                const tbody = document.createElement("tbody");
                tbody.className = "lb__body";
                rows.forEach((emp, i) => {
                    const tr = document.createElement("tr");
                    tr.style.animationDelay = `${i * 22}ms`;

                    const tdRk = document.createElement("td");
                    tdRk.className = `lb__rank${i < 3 ? ` lb__rank--${i + 1}` : ""}`;
                    tdRk.textContent = i + 1;

                    const tdE = document.createElement("td");
                    tdE.appendChild(Object.assign(document.createElement("div"), { className: "lb__name", textContent: emp.employee }));

                    const tdD = Object.assign(document.createElement("td"), { className: "lb__dept",   textContent: emp.dept });
                    const tdC = Object.assign(document.createElement("td"), { className: "lb__count",  textContent: emp.violations });
                    const tdA = Object.assign(document.createElement("td"), { className: "lb__amount", textContent: fmtAmt(emp.totalAmount) });

                    const tdB = document.createElement("td");
                    const bd = document.createElement("div");
                    bd.className = "lb__breakdown";
                    [["highCount","high"],["medCount","med"],["lowCount","low"]].forEach(([prop, sev]) => {
                        if (!emp[prop]) return;
                        const b = document.createElement("span");
                        b.className = `sev-badge sev-badge--${sev}`;
                        b.textContent = `${emp[prop]} ${sevLabel[sev]}`;
                        bd.appendChild(b);
                    });
                    tdB.appendChild(bd);

                    tr.append(tdRk, tdE, tdD, tdC, tdA, tdB);
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                return table;
            };

            const renderToolbar = () => {
                toolbar.innerHTML = "";
                if (cs.subtab === "violations") {
                    [["All", null], ["High", "high"], ["Medium", "med"], ["Low", "low"]].forEach(([label, key]) => {
                        const btn = Object.assign(document.createElement("button"), {
                            type: "button",
                            className: "pc-filter-chip" + (cs.vFilter.severity === key ? " is-active" : ""),
                            textContent: label,
                        });
                        btn.addEventListener("click", () => {
                            cs.vFilter.severity = key;
                            renderToolbar();
                            renderBody();
                        });
                        toolbar.appendChild(btn);
                    });
                } else {
                    const depts = [...new Set(LEADERBOARD_DATA.map(r => r.dept))].sort();
                    [null, ...depts].forEach(dept => {
                        const btn = Object.assign(document.createElement("button"), {
                            type: "button",
                            className: "pc-filter-chip" + (cs.lFilter.dept === dept ? " is-active" : ""),
                            textContent: dept ?? "All Depts",
                        });
                        btn.addEventListener("click", () => {
                            cs.lFilter.dept = dept;
                            renderToolbar();
                            renderBody();
                        });
                        toolbar.appendChild(btn);
                    });
                }
            };

            const renderBody = () => {
                body.innerHTML = "";
                body.appendChild(cs.subtab === "violations" ? buildViolationsTable() : buildLeaderboardTable());
            };

            const CLOSE_SVG = `<svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>`;
            const EMAIL_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>`;
            const CHECK_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

            const makeBackdrop = (opts = {}) => {
                const { nested = false, onBeforeClose } = opts;
                const backdrop = document.createElement("div");
                backdrop.className = "dlg-backdrop" + (nested ? " dlg-backdrop--nested" : "");
                const close = () => {
                    onBeforeClose?.();
                    backdrop.classList.add("is-closing");
                    setTimeout(() => backdrop.remove(), 155);
                };
                backdrop.addEventListener("click", (e) => { if (e.target === backdrop) close(); });
                return { backdrop, close };
            };

            const openViolationDialog = (viol) => {
                let violEsc;
                const { backdrop, close } = makeBackdrop({
                    onBeforeClose: () => {
                        if (violEsc) document.removeEventListener("keydown", violEsc);
                    },
                });

                const dlg = document.createElement("div");
                dlg.className = "dlg";
                dlg.setAttribute("role", "dialog");
                dlg.setAttribute("aria-modal", "true");

                // Head
                const head = document.createElement("div");
                head.className = "dlg__head";
                const titleEl = document.createElement("h3");
                titleEl.className = "dlg__title";
                const badge = document.createElement("span");
                badge.className = `sev-badge sev-badge--${viol.severity}`;
                badge.textContent = sevLabel[viol.severity];
                titleEl.append("Violation ", badge);
                const closeBtn = document.createElement("button");
                closeBtn.type = "button";
                closeBtn.className = "dlg__close";
                closeBtn.setAttribute("aria-label", "Close");
                closeBtn.innerHTML = CLOSE_SVG;
                closeBtn.addEventListener("click", close);
                head.append(titleEl, closeBtn);

                // Body
                const dlgBody = document.createElement("div");
                dlgBody.className = "dlg__body";

                const grid = document.createElement("div");
                grid.className = "dlg__meta-grid";
                [["Employee", viol.employee], ["Department", viol.dept], ["Merchant", viol.merchant], ["Amount", fmtAmt(viol.amount)], ["Date", fmtDate(viol.date)]]
                    .forEach(([lbl, val]) => {
                        const f = document.createElement("div");
                        f.className = "dlg__field";
                        const l = document.createElement("span");
                        l.className = "dlg__label";
                        l.textContent = lbl;
                        const v2 = document.createElement("span");
                        v2.className = "dlg__value";
                        v2.textContent = val;
                        f.append(l, v2);
                        grid.appendChild(f);
                    });

                const ruleBlock = document.createElement("div");
                ruleBlock.className = "dlg__rule-block";
                const rl = document.createElement("span");
                rl.className = "dlg__label";
                rl.textContent = "Rule Violated";
                const rv = document.createElement("div");
                rv.className = "dlg__value";
                rv.textContent = viol.rule;
                const nl = document.createElement("span");
                nl.className = "dlg__label";
                nl.style.marginTop = "0.4rem";
                nl.textContent = "Note";
                const nv = document.createElement("div");
                nv.style.cssText = "font-size:0.82rem;color:var(--color-text-secondary);font-style:italic;line-height:1.45";
                nv.textContent = viol.note;
                ruleBlock.append(rl, rv, nl, nv);

                dlgBody.append(grid, ruleBlock);

                // Footer
                const foot = document.createElement("div");
                foot.className = "dlg__foot";

                const reprimandBtn = document.createElement("button");
                reprimandBtn.type = "button";
                reprimandBtn.className = "dlg__btn dlg__btn--reprimand";
                reprimandBtn.setAttribute("aria-label", "Reprimand by email");
                reprimandBtn.innerHTML = `${EMAIL_SVG}<span>Reprimand</span>`;
                reprimandBtn.addEventListener("click", () => {
                    reprimandBtn.innerHTML = `${CHECK_SVG}<span>Sent</span>`;
                    reprimandBtn.disabled = true;
                });

                const dismissBtn = document.createElement("button");
                dismissBtn.type = "button";
                dismissBtn.className = "dlg__btn dlg__btn--dismiss";
                dismissBtn.textContent = "Dismiss";
                dismissBtn.addEventListener("click", () => {
                    openDismissDialog(viol, close);
                });

                foot.append(reprimandBtn, dismissBtn);
                dlg.append(head, dlgBody, foot);
                backdrop.appendChild(dlg);

                violEsc = (e) => {
                    if (e.key !== "Escape") return;
                    close();
                };
                document.addEventListener("keydown", violEsc);
                document.body.appendChild(backdrop);
                closeBtn.focus();
            };

            const openDismissDialog = (viol, closeViolation) => {
                let dismissEsc;
                const { backdrop, close } = makeBackdrop({
                    nested: true,
                    onBeforeClose: () => {
                        if (dismissEsc) document.removeEventListener("keydown", dismissEsc, true);
                    },
                });

                dismissEsc = (e) => {
                    if (e.key !== "Escape") return;
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    close();
                };
                document.addEventListener("keydown", dismissEsc, true);

                const dlg = document.createElement("div");
                dlg.className = "dlg";
                dlg.setAttribute("role", "dialog");
                dlg.setAttribute("aria-modal", "true");

                const head = document.createElement("div");
                head.className = "dlg__head";
                const titleEl = document.createElement("h3");
                titleEl.className = "dlg__title";
                titleEl.textContent = "Dismiss Violation";
                const closeBtn = document.createElement("button");
                closeBtn.type = "button";
                closeBtn.className = "dlg__close";
                closeBtn.setAttribute("aria-label", "Close");
                closeBtn.innerHTML = CLOSE_SVG;
                closeBtn.addEventListener("click", close);
                head.append(titleEl, closeBtn);

                const dlgBody = document.createElement("div");
                dlgBody.className = "dlg__body";

                const desc = document.createElement("p");
                desc.className = "dlg__desc";
                desc.textContent = `You're dismissing ${viol.employee}'s ${fmtAmt(viol.amount)} charge at ${viol.merchant}. Attach a note so future reviewers understand why this was cleared.`;

                const noteField = document.createElement("div");
                noteField.className = "dlg__field";
                const noteLabel = document.createElement("label");
                noteLabel.className = "dlg__label";
                noteLabel.setAttribute("for", "dismiss-note-input");
                noteLabel.textContent = "Note (optional)";
                const noteArea = document.createElement("textarea");
                noteArea.id = "dismiss-note-input";
                noteArea.className = "dlg__note-area";
                noteArea.placeholder = "e.g. Pre-approved verbally by CFO — awaiting written confirmation…";
                noteField.append(noteLabel, noteArea);

                dlgBody.append(desc, noteField);

                const foot = document.createElement("div");
                foot.className = "dlg__foot";

                const cancelBtn = document.createElement("button");
                cancelBtn.type = "button";
                cancelBtn.className = "dlg__btn";
                cancelBtn.textContent = "Cancel";
                cancelBtn.addEventListener("click", close);

                const confirmBtn = document.createElement("button");
                confirmBtn.type = "button";
                confirmBtn.className = "dlg__btn dlg__btn--confirm";
                confirmBtn.textContent = "Confirm Dismiss";
                confirmBtn.addEventListener("click", () => {
                    dismissedIds.add(viol.id);
                    close();
                    closeViolation();
                    renderBody();
                });

                foot.append(cancelBtn, confirmBtn);
                dlg.append(head, dlgBody, foot);
                backdrop.appendChild(dlg);

                const onEsc = (e) => { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); } };
                document.addEventListener("keydown", onEsc);
                document.body.appendChild(backdrop);
                noteArea.focus();
            };

            // Subtab switching
            view.querySelectorAll("[data-subtab]").forEach(stab => {
                stab.addEventListener("click", () => {
                    view.querySelectorAll("[data-subtab]").forEach(s => {
                        const a = s === stab;
                        s.classList.toggle("is-active", a);
                        s.setAttribute("aria-selected", String(a));
                    });
                    cs.subtab = stab.dataset.subtab;
                    renderToolbar();
                    renderBody();
                });
            });

            renderToolbar();
            renderBody();
        }
    }

    const root = document.querySelector(".app-layout");
    if (root) {
        new App(root).init();
    }
})();
