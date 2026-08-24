function calculate() {

    const principalInput =
        document.getElementById("principal").value;

    const rateInput =
        document.getElementById("rate").value;

    const years =
        parseInt(document.getElementById("years").value) || 0;

    const months =
        parseInt(document.getElementById("months").value) || 0;

    const days =
        parseInt(document.getElementById("days").value) || 0;

    const principal = parseFloat(principalInput);
    const monthlyRate = parseFloat(rateInput);


    // Validation

    if (!principalInput || isNaN(principal) || principal <= 0) {
        showError("தயவுசெய்து சரியான முதலீட்டுத் தொகையை உள்ளிடவும்.");
        return;
    }

    if (!rateInput || isNaN(monthlyRate) || monthlyRate < 0) {
        showError("தயவுசெய்து சரியான மாத வட்டியை உள்ளிடவும்.");
        return;
    }

    if (months < 0 || months > 11) {
        showError("மாதங்கள் 0 முதல் 11 வரை இருக்க வேண்டும்.");
        return;
    }

    if (days < 0 || days > 30) {
        showError("நாட்கள் 0 முதல் 30 வரை இருக்க வேண்டும்.");
        return;
    }


    let balance = principal;
    let totalInterest = 0;

    let resultHTML = "";


    /*
    ==========================================
    3 ஆண்டு INTERVAL
    ==========================================

    Example:

    5 years 5 months 15 days

    First interval  = 3 years
    Second interval = 2 years + 5 months + 15 days

    IMPORTANT:

    First 3-year interval complete aagura varaikkum
    balance update aagathu.

    3 years mudinjadhum mattum
    interest + principal = new balance.
    */


    let remainingYears = years;


    /*
    ==========================================
    ஒவ்வொரு COMPLETE 3 YEAR INTERVAL
    ==========================================
    */

    while (remainingYears >= 3) {

        let startingBalance = balance;

        // 3 years = 36 months

        let interest =
            startingBalance *
            monthlyRate *
            36 / 100;


        // 3 years interest complete

        balance =
            startingBalance + interest;


        totalInterest += interest;


        resultHTML += `
            <div class="period">

                <div class="period-title">
                    3 ஆண்டுகள்
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


        // 3 years completed

        remainingYears -= 3;
    }


    /*
    ==========================================
    REMAINING YEARS
    ==========================================

    Example:
    5 years → 3 years completed
              remaining = 2 years

    இந்த 2 years-க்கு மட்டும்
    அதே balance-ல் interest calculate ஆகும்.
    */


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
                    ${remainingYears} ஆண்டுகள்
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


    /*
    ==========================================
    REMAINING MONTHS
    ==========================================
    */

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

                வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(balance)}</b>

            </div>
        `;
    }


    /*
    ==========================================
    REMAINING DAYS
    ==========================================

    Monthly rate / 30
    */

    if (days > 0) {

        let startingBalance = balance;


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

                தினசரி வட்டி:
                <b>${dailyRate.toFixed(4)}%</b>

                <br>

                வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(balance)}</b>

            </div>
        `;
    }


    /*
    ==========================================
    FINAL RESULT
    ==========================================
    */

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

    document.getElementById("error").style.display =
        "none";
}
