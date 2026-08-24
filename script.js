function formatRupees(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function showError(message) {

    const error = document.getElementById("error");

    error.innerHTML = message;
    error.style.display = "block";

    document.getElementById("result").style.display = "none";
}


function calculate() {

    const principalInput =
        document.getElementById("principal").value;

    const rateInput =
        document.getElementById("rate").value;

    const yearsInput =
        document.getElementById("years").value;

    const monthsInput =
        document.getElementById("months").value;

    const daysInput =
        document.getElementById("days").value;


    const principal = parseFloat(principalInput);
    const monthlyRate = parseFloat(rateInput);

    const years = parseInt(yearsInput) || 0;
    const months = parseInt(monthsInput) || 0;
    const days = parseInt(daysInput) || 0;


    // =========================
    // VALIDATION
    // =========================

    if (
        principalInput === "" ||
        isNaN(principal) ||
        principal <= 0
    ) {
        showError(
            "தயவுசெய்து சரியான முதலீட்டுத் தொகையை உள்ளிடவும்."
        );
        return;
    }


    if (
        rateInput === "" ||
        isNaN(monthlyRate) ||
        monthlyRate < 0
    ) {
        showError(
            "தயவுசெய்து சரியான மாத வட்டியை உள்ளிடவும்."
        );
        return;
    }


    if (years < 0) {
        showError(
            "ஆண்டுகள் 0-க்கு குறைவாக இருக்கக்கூடாது."
        );
        return;
    }


    if (months < 0 || months > 11) {
        showError(
            "மாதங்கள் 0 முதல் 11 வரை இருக்க வேண்டும்."
        );
        return;
    }


    if (days < 0 || days > 30) {
        showError(
            "நாட்கள் 0 முதல் 30 வரை இருக்க வேண்டும்."
        );
        return;
    }


    if (years === 0 && months === 0 && days === 0) {
        showError(
            "கால அளவை உள்ளிடவும்."
        );
        return;
    }


    document.getElementById("error").style.display = "none";


    // =========================
    // INITIAL VALUES
    // =========================

    let balance = principal;

    let totalInterest = 0;

    let resultHTML = "";


    // =========================
    // COMPLETE 3 YEAR PERIODS
    // =========================

    let completePeriods =
        Math.floor(years / 3);

    let remainingYears =
        years % 3;


    for (
        let period = 1;
        period <= completePeriods;
        period++
    ) {

        let startingBalance = balance;


        // 3 years = 36 months

        let interest =
            startingBalance *
            monthlyRate *
            36 / 100;


        balance =
            startingBalance + interest;


        totalInterest += interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    ${period}வது 3 ஆண்டு காலம்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingBalance)}</b>

                <br>

                36 மாதங்களுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                3 ஆண்டுகள் முடிவில் தொகை:
                <b>${formatRupees(balance)}</b>

            </div>

        `;
    }


    // =========================
    // REMAINING YEARS
    // =========================

    if (remainingYears > 0) {

        let startingBalance = balance;

        let remainingMonths =
            remainingYears * 12;


        let interest =
            startingBalance *
            monthlyRate *
            remainingMonths / 100;


        balance =
            startingBalance + interest;


        totalInterest += interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    ${remainingYears} ஆண்டு
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingBalance)}</b>

                <br>

                ${remainingMonths} மாதங்களுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(balance)}</b>

            </div>

        `;
    }


    // =========================
    // REMAINING MONTHS
    // =========================

    if (months > 0) {

        let startingBalance = balance;


        let interest =
            startingBalance *
            monthlyRate *
            months / 100;


        balance =
            startingBalance + interest;


        totalInterest += interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    ${months} மாதங்கள்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingBalance)}</b>

                <br>

                மாத வட்டி:
                <b>${monthlyRate}%</b>

                <br>

                ${months} மாதங்களுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(balance)}</b>

            </div>

        `;
    }


    // =========================
    // REMAINING DAYS
    // =========================

    if (days > 0) {

        let startingBalance = balance;


        // Monthly rate → Daily rate

        let dailyRate =
            monthlyRate / 30;


        let interest =
            startingBalance *
            dailyRate *
            days / 100;


        balance =
            startingBalance + interest;


        totalInterest += interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    ${days} நாட்கள்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingBalance)}</b>

                <br>

                மாத வட்டி:
                <b>${monthlyRate}%</b>

                <br>

                தினசரி வட்டி:
                <b>${dailyRate.toFixed(4)}%</b>

                <br>

                ${days} நாட்களுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(balance)}</b>

            </div>

        `;
    }


    // =========================
    // FINAL RESULT
    // =========================

    resultHTML += `

        <div class="total-interest">

            மொத்த வட்டி:
            ${formatRupees(totalInterest)}

        </div>


        <div class="final-amount">

            இறுதித் தொகை

            <br><br>

            ${formatRupees(balance)}

        </div>

    `;


    document.getElementById("result").innerHTML =
        resultHTML;

    document.getElementById("result").style.display =
        "block";
}


// =========================
// RESET
// =========================

function resetCalculator() {

    document.getElementById("principal").value = "";

    document.getElementById("rate").value = "";

    document.getElementById("years").value = "";

    document.getElementById("months").value = "";

    document.getElementById("days").value = "";


    document.getElementById("error").style.display =
        "none";

    document.getElementById("result").style.display =
        "none";

    document.getElementById("result").innerHTML =
        "";
}
