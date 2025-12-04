const form = document.getElementById('summary-edit-form');
const summaryEditModal = document.getElementById('summary-edit');
const pleaseSelectProgram = document.getElementById('please-select-program');
const buttons = document.querySelectorAll('#summary-edit .buttons');

const fieldRules = [
    {
        input: document.getElementById('division-summary'),
        error: document.getElementById('err-division'),
        validator: (value) => {
            const trimmed = value.trim();
            return { valid: trimmed.length > 0, normalized: trimmed };
        }
    },
    {
        input: document.getElementById('program-summary'),
        error: document.getElementById('err-program'),
        validator: (value) => {
            const trimmed = value.trim();
            return { valid: trimmed.length > 0, normalized: trimmed };
        }
    },
    {
        input: document.getElementById('payee-summary'),
        error: document.getElementById('err-payee'),
        validator: (value) => {
            return {valid: true};
            /*
            const trimmed = value.trim();
            return { valid: trimmed.length > 0, normalized: trimmed };*/
        }
    },
    {
        input: document.getElementById('paid-summary'),
        error: document.getElementById('err-paid'),
        validator: (value) => {
            const normalized = value.trim().toLowerCase();
            if (normalized === 'yes' || normalized === 'no') {
                return { valid: true, normalized: normalized === 'yes' ? 'Yes' : 'No' };
            }
            return { valid: false };
        }
    },
    {
        input: document.getElementById('report-summary'),
        error: document.getElementById('err-report'),
        validator: (value) => {
            const normalized = value.trim().toLowerCase();
            if (normalized === 'yes' || normalized === 'no') {
                return { valid: true, normalized: normalized === 'yes' ? 'Yes' : 'No' };
            }
            return { valid: false };
        }
    },
    {
        input: document.getElementById('notes-summary'),
        error: document.getElementById('err-notes'),
        validator: (value) => {
            const trimmed = value.trim();
            if (trimmed.length <= 500) {
                return { valid: true, normalized: trimmed };
            }
            return { valid: false };
        }
    }
];

clearInputs();
                                    //This hides the ID column
table = new DataTable('#loc-table', {columnDefs:[{target: 0, visible: false}]});
table.on('click', 'tbody tr', function () {
    openSummaryModal();
    pleaseSelectProgram.style.display = "none";
    hideAllErrors();
    let data = table.row(this).data();

    // When updating the summary page for SQL I incremented all of these to
    // account for the hidden ID column in the table. - Orion
    fieldRules[0].input.value = String(data[2] ?? '').trim();
    fieldRules[1].input.value = String(data[1] ?? '').trim();
    fieldRules[2].input.value = String(data[7] ?? '').trim();
    fieldRules[3].input.value = String(data[8] ?? '').trim();
    fieldRules[4].input.value = String(data[9] ?? '').trim();
    fieldRules[5].input.value = String(data[10] ?? '').trim();
    document.getElementById('id-summary').value = data[0];
});

function clearInputs() {
    fieldRules.forEach(({ input }) => {
        input.value = '';
    });
    hideAllErrors();
}

function hideAllErrors() {
    fieldRules.forEach(({ error }) => {
        error.style.display = "none";
    });
}

function openSummaryModal() {
    summaryEditModal.classList.add('is-open');
    summaryEditModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    buttons.forEach((button) => {
        button.style.display = 'inline-flex';
    });
}

function closeSummaryModal() {
    summaryEditModal.classList.remove('is-open');
    summaryEditModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    buttons.forEach((button) => {
        button.style.display = 'none';
    });
    pleaseSelectProgram.style.display = "initial";
}

function validateField(rule) {
    const { input, error, validator } = rule;
    const result = validator(input.value);
    if (!result.valid) {
        error.style.display = "initial";
        return false;
    }
    if (Object.prototype.hasOwnProperty.call(result, 'normalized')) {
        input.value = result.normalized;
    }
    error.style.display = "none";
    return true;
}

form.addEventListener('submit', (event) => {
    let isValid = true;
    fieldRules.forEach((rule) => {
        const fieldIsValid = validateField(rule);
        if (!fieldIsValid) {
            isValid = false;
        }
    });

    if (!isValid) {
        event.preventDefault();
    }
});

form.addEventListener('reset', () => {
    clearInputs();
    closeSummaryModal();
});

fieldRules.forEach(({ input, error }) => {
    input.addEventListener('input', () => {
        error.style.display = "none";
    });
});

summaryEditModal.addEventListener('click', (event) => {
    if (event.target === summaryEditModal) {
        form.reset();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && summaryEditModal.classList.contains('is-open')) {
        form.reset();
    }
});

document.getElementById('sign-in-redirect').onclick = async () => {
    window.location.href = '/sign-in';
};
