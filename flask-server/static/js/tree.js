var orig_tree = null;
var tree = null;
var prev_item = null;
var prev_val = null;
var orig_title = null;

// clears out form and resets the tree
function restartTree() {
    $('#formdiv').html("");
    tree = orig_tree;
    prev_item = null;
    prev_val = null;
    $('#title').text("Do you want to know your " + orig_title +"?")
    $('#start_btn').attr("onclick", "askTree()");
    $('#start_btn').text('Start');
    askTree();
}

// preocess input
function askTree() {
    // grey out previous qustions
    $('#formdiv').children().css("opacity", "0.5");
    // apply previous selection (if there is one)
    if (prev_item !== null) {
        prev_val = $('[name ="' + prev_item + '"]:checked:enabled').val();
        console.log('--------------');
        console.log(prev_item);
        console.log(prev_val);
        tree = tree[prev_val];
        console.log(tree);
    }
    // on a leaf of the tree there is a string
    if (typeof tree === "string") {
        if (orig_title === "Course"){
            $('#title').text("You should take " + tree);
        }else {
            $('#title').text("You will probably have " + tree);
        }
        $('#start_btn').attr("onclick", "restartTree()");
        $('#start_btn').text('Restart');
        $('#formdiv').html("");
    }
    // if there is no leaf create a select the different classes of the branch
    else {
        for (var item in tree) {
            console.log(item);
            var question = `<br><br><p>${item}?</p>`;
            var firstoption = true;
            for (var option in tree[item]) {
                question += `<div class="form-check">`
                    if (firstoption) {
                        console.log("bluurb");
                        question += `<input class="form-check-input" type="radio" value="${option}" name="${item}" id="${option}" checked>`;
                        firstoption = false;
                    } else {
                        question += `<input class="form-check-input" type="radio" value="${option}" name="${item}" id="${option}">`;
                    }
                    question += `<label class="form-check-label" for="${option}">${option}</label></div>`;
            }
            // save handled item
            prev_item = item;
            // move tree forward
            tree = tree[item];
            // put new question into html
            $('#formdiv').append(question);
            // set button to "continue"
            $('#start_btn').text('Continue');
        }
    }
}