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
    programName.textContent = entry.academicProgram ?? '—';
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

    if (selection === 'none') {
        currentDivision = null;
        divisionCard.classList.remove('is-visible');
        closeEditModal();
        return;
    }

    try {
        const divisionData = await fetchDivisionData(selection);
        const latestEntry = Array.isArray(divisionData) && divisionData.length > 0 ? divisionData[0] : {};

        currentDivision = {
            division: latestEntry.division ?? selection,
            academicProgram: latestEntry.academicProgram ?? '',
            divisionChair: latestEntry.divisionChair ?? '',
            dean: latestEntry.dean ?? '',
            locRep: latestEntry.locRep ?? '',
            penContact: latestEntry.penContact ?? '',
            notes: latestEntry.notes ?? '',
            reportSubmitted: Boolean(latestEntry.reportSubmitted),
            hasBeenPaid: Boolean(latestEntry.hasBeenPaid),
            dateSubmitted: latestEntry.dateSubmitted ?? null
        };

        populateDivisionCard(currentDivision, selection);
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
    closeEditModal();
});

document.getElementById('sign-in-redirect').onclick = () => {
    window.location.href = '/sign-in';
};
