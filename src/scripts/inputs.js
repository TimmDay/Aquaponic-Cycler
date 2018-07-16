/**
 * Created by DAY7RT on 16.07.2018.
 */


//todo on submit, add 0's to any trailing .
//todo make it so the partial match at . is ok
const onPhChange = () => {
    const ph = document.getElementById('pH');
    const exp = ph.value;

    const msg = document.getElementById('validation-msg');

    if (/^(1[1-3](\.\d)?)$|^(\d(\.\d)?)$|^(14(\.0)?)$/.test(exp)){
        console.log(ph.value);
        console.log('valid');
        msg.innerHTML = "";
    } else {

        // if the last char is . and there are no other ., ok
        // otherwise, chop last char
        if (exp[exp.length - 1] === '.' && exp.slice(0,-1).indexOf('.') === -1) {
            // all good, do nothing

        } else {
            ph.value = ph.value.slice(0, -1);
            msg.innerHTML = "pH entry must be between 0 and 14, with up to one decimal place";
        }
        console.log(ph.value);
    }
};


// ammonia - 0 and 20, 2 decimal places
const onAmmoniaChange = () => {
    const amm = document.getElementById('amm');
    const exp = amm.value;


    const msg = document.getElementById('validation-msg');

    if (/^0*[0-2]?\d(\.\d{1,2})?$/.test(exp)){
        console.log(amm.value);
        console.log('valid')
        msg.innerHTML = "";

    } else {

        // if the last char is . and there are no other ., ok
        // otherwise, chop last char
        if (exp[exp.length - 1] === '.' && exp.slice(0,-1).indexOf('.') === -1) {
            // all good, do nothing
        } else {
            amm.value = amm.value.slice(0, -1);
            msg.innerHTML = "ammonia entry must be between 0 and 20ppm, with up to two decimal places";
        }
        console.log(amm.value);
    }
};

// nitrite 0 and 10, 2 decimal places
const onNitriteChange = () => {
    const nite = document.getElementById('nite');
    const exp = nite.value;

    if (/^0*[0-1]?\d(\.\d{1,2})?$/.test(exp)){
        console.log(nite.value);
        console.log('valid')

    } else {

        // if the last char is . and there are no other ., ok
        // otherwise, chop last char
        if (exp[exp.length - 1] === '.' && exp.slice(0,-1).indexOf('.') === -1) {
            // all good, do nothing
        } else {
            nite.value = nite.value.slice(0, -1);
            const msg = document.getElementById('validation-msg');
            msg.innerHTML = "nitrite entry must be between 0 and 10ppm, with up to two decimal places";
        }
        console.log(nite.value);
    }
};

// nitrate 0 and 250, 1 decimal place

