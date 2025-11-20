async function fetchDivisionData(division) {
    const response = await fetch(`/division-data?division=${division}`);
    return response.json();
}

const divisionSelector = document.getElementById('division-selector');
const divisionCard = document.getElementById('toggle-display-form');
const divisionName = document.getElementById('division-name');
const programName = document.getElementById('program-name');
const divisionChair = document.getElementById('division-chair');
const dean = document.getElementById('dean');
const locRep = document.getElementById('loc-rep');
const penContact = document.getElementById('pen-contact');
const notes = document.getElementById('division-notes');
const reportStatus = document.getElementById('report-status');
const paymentStatus = document.getElementById('payment-status');
const lastUpdated = document.getElementById('last-updated');

const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('division-edit-form');
const editButton = document.getElementById('division-edit-button');
const editCloseButton = document.getElementById('edit-close-btn');
const editCancelButton = document.getElementById('edit-cancel-btn');

const editFields = {
    division: document.getElementById('edit-division'),
    program: document.getElementById('edit-program'),
    chair: document.getElementById('edit-chair'),
    dean: document.getElementById('edit-dean'),
    locRep: document.getElementById('edit-loc-rep'),
    penContact: document.getElementById('edit-pen-contact'),
    reportStatus: document.getElementById('edit-report-status'),
    paymentStatus: document.getElementById('edit-payment-status'),
    notes: document.getElementById('edit-notes')
};

const editErrors = {
    division: document.getElementById('error-edit-division'),
    program: document.getElementById('error-edit-program'),
    chair: document.getElementById('error-edit-chair'),
    dean: document.getElementById('error-edit-dean'),
    locRep: document.getElementById('error-edit-loc-rep'),
    penContact: document.getElementById('error-edit-pen-contact'),
    reportStatus: document.getElementById('error-edit-report-status'),
    paymentStatus: document.getElementById('error-edit-payment-status')
};

let currentDivision = null;

const formatDate = (dateValue) => {
    if (!dateValue) {
        return null;
    }

    const parsed = new Date(dateValue);

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const updateStatusChip = (element, isComplete, completeText, pendingText) => {
    element.textContent = isComplete ? completeText : pendingText;
    element.classList.toggle('status-chip--success', isComplete);
    element.classList.toggle('status-chip--pending', !isComplete);
};

const populateDivisionCard = (entry, fallbackDivision) => {
    divisionName.textContent = entry.division ?? fallbackDivision ?? '—';
    //programName.textContent = entry.academicProgram ?? '—';
    divisionChair.textContent = entry.divisionChair ?? '—';
    dean.textContent = entry.dean ?? '—';
    locRep.textContent = entry.locRep ?? '—';
    penContact.textContent = entry.penContact ?? '—';
    notes.textContent = entry.notes?.trim() ? entry.notes : 'No notes on record.';

    updateStatusChip(reportStatus, Boolean(entry.reportSubmitted), 'Report submitted', 'Report pending');
    updateStatusChip(paymentStatus, Boolean(entry.hasBeenPaid), 'Payment complete', 'Payment pending');

    const formattedDate = formatDate(entry.dateSubmitted);
    lastUpdated.textContent = formattedDate ? `Last updated ${formattedDate}` : 'Last updated —';

    divisionCard.classList.add('is-visible');
};

const clearValidationState = () => {
    Object.values(editErrors).forEach((errorNode) => {
        errorNode.classList.remove('is-visible');
    });
};

const populateEditForm = () => {
    if (!currentDivision) {
        return;
    }

    editFields.division.value = currentDivision.division ?? '';
    editFields.program.value = currentDivision.academicProgram ?? '';
    editFields.chair.value = currentDivision.divisionChair ?? '';
    editFields.dean.value = currentDivision.dean ?? '';
    editFields.locRep.value = currentDivision.locRep ?? '';
    editFields.penContact.value = currentDivision.penContact ?? '';
    editFields.reportStatus.value = currentDivision.reportSubmitted ? 'submitted' : 'pending';
    editFields.paymentStatus.value = currentDivision.hasBeenPaid ? 'paid' : 'pending';
    editFields.notes.value = currentDivision.notes ?? '';
};

const openEditModal = () => {
    if (!currentDivision) {
        return;
    }

    populateEditForm();
    clearValidationState();

    editModal.classList.add('is-open');
    editModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    window.setTimeout(() => {
        editFields.division.focus();
    }, 0);
};

const closeEditModal = () => {
    editModal.classList.remove('is-open');
    editModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

divisionSelector.addEventListener('change', async (event) => {
    const selection = event.target.value;
    console.log(selection);
    if (selection === 'none') {
        currentDivision = null;
        divisionCard.classList.remove('is-visible');
        closeEditModal();
        return;
    }

    try {
        const divisionData = await fetchDivisionData(selection);
        //const latestEntry = Array.isArray(divisionData) && divisionData.length > 0 ? divisionData[0] : {};
        const latestEntry = divisionData;
        console.log(latestEntry)
        currentDivision = {
            division: latestEntry.division_name ?? selection,
            //academicProgram: latestEntry.academicProgram ?? '',
            divisionChair: latestEntry.division_chair ?? '',
            dean: latestEntry.division_dean ?? '',
            locRep: latestEntry.division_loc_rep ?? '',
            penContact: latestEntry.division_pen_contact ?? '',
            notes: latestEntry.notes ?? '',
            reportSubmitted: Boolean(latestEntry.reportSubmitted),
            hasBeenPaid: Boolean(latestEntry.hasBeenPaid),
            dateSubmitted: latestEntry.dateSubmitted ?? null
        };

        populateDivisionCard(currentDivision, selection);
        renderHistory();
    } catch (error) {
        console.error('Failed to load division data', error);
        currentDivision = null;
        divisionCard.classList.remove('is-visible');
        closeEditModal();
    }
});

editButton.addEventListener('click', openEditModal);
editCloseButton.addEventListener('click', closeEditModal);
editCancelButton.addEventListener('click', closeEditModal);

editModal.addEventListener('click', (event) => {
    if (event.target === editModal) {
        closeEditModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && editModal.classList.contains('is-open')) {
        closeEditModal();
    }
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearValidationState();

    const trimmedValues = {
        division: editFields.division.value.trim(),
        program: editFields.program.value.trim(),
        chair: editFields.chair.value.trim(),
        dean: editFields.dean.value.trim(),
        locRep: editFields.locRep.value.trim(),
        penContact: editFields.penContact.value.trim(),
        reportStatus: editFields.reportStatus.value,
        paymentStatus: editFields.paymentStatus.value,
        notes: editFields.notes.value.trim()
    };

    const validations = [
        { value: trimmedValues.division, errorNode: editErrors.division },
        { value: trimmedValues.program, errorNode: editErrors.program },
        { value: trimmedValues.chair, errorNode: editErrors.chair },
        { value: trimmedValues.dean, errorNode: editErrors.dean },
        { value: trimmedValues.locRep, errorNode: editErrors.locRep },
        { value: trimmedValues.penContact, errorNode: editErrors.penContact },
        { value: trimmedValues.reportStatus, errorNode: editErrors.reportStatus },
        { value: trimmedValues.paymentStatus, errorNode: editErrors.paymentStatus }
    ];

    let isValid = true;

    validations.forEach(({ value, errorNode }) => {
        if (!value) {
            errorNode.classList.add('is-visible');
            isValid = false;
        }
    });

    if (!isValid || !currentDivision) {
        return;
    }

    currentDivision = {
        ...currentDivision,
        division: trimmedValues.division,
        academicProgram: trimmedValues.program,
        divisionChair: trimmedValues.chair,
        dean: trimmedValues.dean,
        locRep: trimmedValues.locRep,
        penContact: trimmedValues.penContact,
        notes: trimmedValues.notes,
        reportSubmitted: trimmedValues.reportStatus === 'submitted',
        hasBeenPaid: trimmedValues.paymentStatus === 'paid',
        dateSubmitted: new Date().toISOString()
    };

    populateDivisionCard(currentDivision);
    addHistoryEntry({
        division: currentDivision.division,
        summary: `${currentDivision.division} updated`,
        details: {
            program: currentDivision.academicProgram,
            chair: currentDivision.divisionChair,
            dean: currentDivision.dean,
            locRep: currentDivision.locRep,
            penContact: currentDivision.penContact,
            reportSubmitted: currentDivision.reportSubmitted,
            hasBeenPaid: currentDivision.hasBeenPaid,
            notes: currentDivision.notes
        },
        timestamp: currentDivision.dateSubmitted
    });

    closeEditModal();
});

document.getElementById('sign-in-redirect').onclick = () => {
    window.location.href = '/sign-in';
};

//handler for the edit history get into json.
const fetchHistoryFromServer = async () => {
    try {
        const res = await fetch('/edit-history');
        return await res.json();
    } catch (e) {
        console.error('Failed to load edit history from server', e);
        throw e;
    }
};

//used purely for the filter so we dont do way too many sql queries
let historyCache = [];

const applyHistoryFilter = (query) => {
    const list = document.getElementById('edit-history-list');
    const empty = document.getElementById('edit-history-empty');
    if (!list) return;

    const q = (query || '').trim().toLowerCase();
    const items = historyCache.slice().reverse();

    list.innerHTML = '';

    //we check if any of the filter string is in any program, notes, etc etc, if so, we want it.
    const filtered = q ? items.filter((entry) => {
        const parts = [];
        if (entry.summary) parts.push(entry.summary);
        if (entry.division) parts.push(entry.division);

        const d = entry.details || {};
        if (d.changes) {
            for (const [k, v] of Object.entries(d.changes)) {
                parts.push(k);
                parts.push(String(v?.from ?? ''));
                parts.push(String(v?.to ?? ''));
            }
        }

        ['program', 'chair', 'dean', 'locRep', 'penContact', 'notes'].forEach(f => { parts.push(String(d[f] ?? '')); });

        return parts.join(' ').toLowerCase().includes(q);
    }) : items;

    //if we dont have anything, display a message so they dont think its not loading
    if (!filtered || filtered.length === 0) {
        empty.textContent = q ? 'No edits match your filter.' : 'No edits yet. Changes you save will appear here.';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';

    filtered.forEach((entry) => {
        const li = document.createElement('li');
        li.className = 'edit-history-item';

        const meta = document.createElement('div');
        meta.className = 'edit-history-meta';
        const time = document.createElement('time');
        const ts = entry.timestamp ? new Date(entry.timestamp) : new Date();
        time.dateTime = ts.toISOString();
        time.textContent = ts.toLocaleString(undefined, {month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'});
        meta.appendChild(time);

        const summary = document.createElement('p');
        summary.className = 'edit-history-summary';
        summary.textContent = entry.summary || entry.division;

        li.appendChild(meta);
        li.appendChild(summary);

        if (entry.details && entry.details.changes && Object.keys(entry.details.changes).length > 0) {
            const changesContainer = document.createElement('div');
            changesContainer.className = 'edit-history-changes';
            const fieldLabels = {
                division: 'Division',
                academicProgram: 'Program',
                payees: 'Payees',
                divisionChair: 'Chair',
                dean: 'Dean',
                locRep: 'LOC rep',
                penContact: 'PEN contact',
                reportSubmitted: 'Report submitted',
                hasBeenPaid: 'Paid',
                notes: 'Notes'
            };

            //what actually changed
            Object.entries(entry.details.changes).forEach(([key, change]) => {
                const p = document.createElement('p');
                p.className = 'edit-history-detail';
                const label = fieldLabels[key] || key;
                let fromText;
                if (change.from === null || typeof change.from === 'undefined') {
                    fromText = '—';
                } else {
                    fromText = String(change.from);
                }

                let toText;
                if (change.to === null || typeof change.to === 'undefined') {
                    toText = '—';
                } else {
                    toText = String(change.to);
                }
                p.textContent = `${label}: ${fromText} -> ${toText}`;
                changesContainer.appendChild(p);
            });

            li.appendChild(changesContainer);
        }

        list.appendChild(li);
    });
};

const renderHistory = async () => {
    const list = document.getElementById('edit-history-list');
    if (!list) return;
    const serverItems = await fetchHistoryFromServer();
    if (serverItems) {
        historyCache = serverItems.map(r => ({
            division: r.division,
            summary: r.summary,
            details: (typeof r.details === 'string') ? JSON.parse(r.details) : r.details,
            timestamp: r.timestamp || r.time || r.date || new Date().toISOString()
        }));
    } else {
        historyCache = [];
    }

    const searchEl = document.getElementById('edit-history-search');
    const q = searchEl ? searchEl.value : '';
    applyHistoryFilter(q);
};

const addHistoryEntry = async (entry) => {
    try {
        const res = await fetch('/edit-history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });

        await renderHistory();
    } catch (e) {
        console.error('Failed to save edit history to server', e);
    }
};

const search = document.getElementById('edit-history-search');
search.addEventListener('input', (e) => { 
	applyHistoryFilter(e.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    const aside = document.getElementById('edit-history');
    const toggle = document.getElementById('edit-history-toggle');
    if (!aside || !toggle) return;

    function setCollapsed(collapsed) {         
        if (collapsed) {
            aside.classList.add('collapsed');
            toggle.textContent = '<';
        } else {
            aside.classList.remove('collapsed');
            toggle.textContent = '>';
        }
        try {
            localStorage.setItem('editHistoryCollapsed', collapsed ? '1' : '0'); 
        } catch (e) {}
        document.body.classList.toggle('history-open', !collapsed);
        }

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        setCollapsed(!aside.classList.contains('collapsed'));
    });

    try {
        const saved = localStorage.getItem('editHistoryCollapsed');
        setCollapsed(saved === '1');
    } catch (e) {}
});