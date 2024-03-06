const resultsBox = document.querySelector(".result-supplier");
const inputBox = document.getElementById("input-supplier");

inputBox.oninput = function() {
    let input = inputBox.value.trim().toLowerCase();
    let result = [];

    if (input.length === 0) {
        result = data_spl;
    } else {
        result = data_spl.filter((keyword) => {
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