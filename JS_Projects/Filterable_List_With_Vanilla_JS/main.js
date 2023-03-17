// get Input
let filterInput = document.getElementById('filterInput')

// Add event listener
filterInput.addEventListener('keyup', filterNames);

function filterNames(e) {
    // get value of input
    let filterValue = e.target.value.toLowerCase();
    
    // get Item Collection
    let collection = document.getElementById('collection');
    // get all items
    let items = collection.querySelectorAll('li.collection-item');
    // console.log(items[0].getElementsByTagName('a')[0]);
    // loop throgh the Nodelist
    for(let i=0; i< items.length; i++) {
        let a = items[i].getElementsByTagName('a')[0];
        // match and display
        if(a.innerText.toLowerCase().indexOf(filterValue) > -1 ) {
            // console.log(a.innerText.toLowerCase());
            a.parentElement.style.display= 'block';
        } else {
            a.parentElement.style.display= 'none';
        }
    }
}