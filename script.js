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

    // Input values

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


    // Convert values

    const principal = parseFloat(principalInput);

    const monthlyRate = parseFloat(rateInput);

    const years = parseInt(yearsInput) || 0;

    const months = parseInt(monthsInput) || 0;

    const days = parseInt(daysInput) || 0;


    // Validation

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
            "மாதங்கள் 0 முதல் 11 வரை மட்டுமே இருக்க வேண்டும்."
        );

        return;
    }


    if (days < 0 || days > 30) {

        showError(
            "நாட்கள் 0 முதல் 30 வரை மட்டுமே இருக்க வேண்டும்."
        );

        return;
    }


    if (years === 0 && months === 0 && days === 0) {

        showError(
            "கால அளவை உள்ளிடவும்."
        );

        return;
    }


    // Hide error

    document.getElementById("error").style.display = "none";


    // Starting values

    let currentPrincipal = principal;

    let totalInterest = 0;

    let resultHTML = "";


    /*
        --------------------------------
        3 ஆண்டுகளுக்கான கணக்கு
        --------------------------------

        3 ஆண்டுகள் = 36 மாதங்கள்

        ஒவ்வொரு 3 ஆண்டுகளுக்கும்
        வட்டியை கணக்கிட்டு
        முதலுடன் சேர்க்க வேண்டும்.
    */


    const completeThreeYearPeriods =
        Math.floor(years / 3);


    const remainingYears =
        years % 3;


    /*
        --------------------------------
        FOR LOOP
        --------------------------------
    */

    for (
        let period = 1;
        period <= completeThreeYearPeriods;
        period++
    ) {

        const startingPrincipal =
            currentPrincipal;


        const interest =
            startingPrincipal *
            monthlyRate *
            36 / 100;


        currentPrincipal =
            startingPrincipal + interest;


        totalInterest =
            totalInterest + interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    ${period}வது 3 ஆண்டு காலம்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingPrincipal)}</b>

                <br>

                3 ஆண்டுகளுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(currentPrincipal)}</b>

            </div>

        `;
    }


    /*
        --------------------------------
        மீதமுள்ள ஆண்டுகள்
        --------------------------------
    */

    if (remainingYears > 0) {

        const startingPrincipal =
            currentPrincipal;


        const remainingMonths =
            remainingYears * 12;


        const interest =
            startingPrincipal *
            monthlyRate *
            remainingMonths / 100;


        currentPrincipal =
            startingPrincipal + interest;


        totalInterest =
            totalInterest + interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    மீதமுள்ள ${remainingYears} ஆண்டு
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingPrincipal)}</b>

                <br>

                ${remainingMonths} மாதங்களுக்கான வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(currentPrincipal)}</b>

            </div>

        `;
    }


    /*
        --------------------------------
        மீதமுள்ள மாதங்கள்
        --------------------------------
    */

    if (months > 0) {

        const startingPrincipal =
            currentPrincipal;


        const interest =
            startingPrincipal *
            monthlyRate *
            months / 100;


        currentPrincipal =
            startingPrincipal + interest;


        totalInterest =
            totalInterest + interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    மீதமுள்ள ${months} மாதங்கள்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingPrincipal)}</b>

                <br>

                வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(currentPrincipal)}</b>

            </div>

        `;
    }


    /*
        --------------------------------
        மீதமுள்ள நாட்கள்
        --------------------------------

        1 மாதம் = 30 நாட்கள்

        தினசரி வட்டி =
        மாத வட்டி / 30
    */


    if (days > 0) {

        const startingPrincipal =
            currentPrincipal;


        const dailyRate =
            monthlyRate / 30;


        const interest =
            startingPrincipal *
            dailyRate *
            days / 100;


        currentPrincipal =
            startingPrincipal + interest;


        totalInterest =
            totalInterest + interest;


        resultHTML += `

            <div class="period">

                <div class="period-title">
                    மீதமுள்ள ${days} நாட்கள்
                </div>

                தொடக்கத் தொகை:
                <b>${formatRupees(startingPrincipal)}</b>

                <br>

                தினசரி வட்டி:
                <b>${dailyRate.toFixed(4)}%</b>

                <br>

                வட்டி:
                <b>${formatRupees(interest)}</b>

                <br>

                புதிய தொகை:
                <b>${formatRupees(currentPrincipal)}</b>

            </div>

        `;
    }


    /*
        --------------------------------
        FINAL RESULT
        --------------------------------
    */


    resultHTML += `

        <div class="total-interest">

            மொத்த வட்டி:
            ${formatRupees(totalInterest)}

        </div>


        <div class="final-amount">

            இறுதித் தொகை
            <br><br>

            ${formatRupees(currentPrincipal)}

        </div>

    `;


    document.getElementById("result").innerHTML =
        resultHTML;

    document.getElementById("result").style.display =
        "block";
}


/*
    --------------------------------
    RESET
    --------------------------------
*/

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
