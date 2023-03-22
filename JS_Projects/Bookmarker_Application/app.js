// fetch stored bookmarks into UI
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // console.log(bookmarks);

    var outputDiv = document.querySelector('#output');

    // clear the output div 
    outputDiv.innerHTML = '';

    // build output
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        // append it to output Div
        outputDiv.innerHTML += '<div class="well card bg-light my-2 px-2 pt-1">' +
            '<h4>' + name +
            '<a class="btn btn-default" target="_blank" href="' + url + '">' +
            '<i class="fas fa-arrow-up-right-from-square"></i>' +
            '</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="">' +
            '<i class="fas fa-trash"></i>' +
            '</a>' +
            '</h4>' +
            '</div>'
    }
}
// on load
document.addEventListener('DOMContentLoaded', fetchBookmarks);


// Activate button on data filling
document.querySelector('#myForm').addEventListener('input', (e) => {

    //prevent default
    e.preventDefault();

    //get form values
    var siteName = document.querySelector('#name').value;
    var siteUrl = document.querySelector('#url').value;

    //validate the data
    if (siteName == '' || siteUrl == '') {
        document.querySelector('#button').setAttribute('disabled', '');
    } else {
        document.querySelector('#button').removeAttribute('disabled');
    }
})

// listen to form submit

document.querySelector('#myForm').addEventListener('submit', saveBookmark);

// save bookmark into local storage
function saveBookmark(e) {

    e.preventDefault();
    var siteName = document.querySelector('#name').value;
    var siteUrl = document.querySelector('#url').value;

    // validate the URl with a regex
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please use a valid URl');
        return false;
    }


    //create the bookmak object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //local storage only stores strings
    // check if there is a bookmark variable already
    if (localStorage.getItem('bookmarks') === null) {
        // initialise an JS array(string) if bookmarks isn't present
        // in JS string is also an array of text
        var bookmarks = [];

        // push the newly added bookmark to the bookmarks array
        bookmarks.push(bookmark);

        // update the localStorage bookmarks string with the updated JSON bookmarks array
        // stringify the JS array before saving it into local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // if a variable bookmark salready exists in localstorage
        // fetch it
        // convert it into a json object
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.querySelector('#name').value = '';
    document.querySelector('#url').value = '';

    fetchBookmarks();

    // console.log(bookmark);
}

// delete bookmark from local storage
async function deleteBookmark(url) {
    // e.preventDefault();
    // console.log(url);
    //get boookmark from localstorge
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}