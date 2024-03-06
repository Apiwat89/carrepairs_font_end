const resultsBox = document.querySelector(".result-customer");
const inputBox = document.getElementById("input-customer");

inputBox.oninput = function() {
    let input = inputBox.value.trim().toLowerCase();
    let result = [];

    if (input.length === 0) {
        result = data_cm;
    } else {
        result = data_cm.filter((keyword) => {
            if (typeof keyword === 'string') {
                return keyword.toLowerCase().includes(input);
            }
            return false;
        });
    }
    display(result);

    if (!result.length) {
        resultsBox.innerHTML = '';
    }
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}



const resultsBox2 = document.querySelector(".result-spare");
const inputBox2 = document.getElementById("input-spare");

inputBox2.oninput = function() {
    let input = inputBox2.value.trim().toLowerCase();
    let result = [];

    if (input.length === 0) {
        result = data_sp;
    } else {
        result = data_sp.filter((keyword) => {
            if (typeof keyword === 'string') {
                return keyword.toLowerCase().includes(input);
            }
            return false;
        });
    }
    display2(result);

    if (!result.length) {
        resultsBox2.innerHTML = '';
    }
}

function display2(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput2(this)>" + list + "</li>";
    });

    resultsBox2.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput2(list) {
    inputBox2.value = list.innerHTML;
    resultsBox2.innerHTML = '';
}