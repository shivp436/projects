const input = document.querySelector('#input');
const displayDiv = document.querySelector('#match-list');

// Search colors matching
async function searchColor(inputColor) {
    const res = await fetch('../colors.json');
    const colors = await res.json();
    var arrayColors = [];

    // convert the JSON object into a JS Array
    for (const i in colors) {
        arrayColors.push([i, colors[i]]);
    }

    // get an arrray of matching color names or codes
    let matches = arrayColors.filter(color => {
        const regex = new RegExp(`^${inputColor}`,'gi');
        return color[0].match(regex) || color[1].match(regex);
    });

    // empty the arrayif searchbox is empty
    if(inputColor.length === 0){
        matches = [];
        displayDiv.innerHTML = '';
    }

    outputHtml(matches);

    // console.log(inputColor);
    // console.log(matches);
}

// Show results on DOM

const outputHtml= matches => {
    if(matches.length > 0) {
        const html = matches.map(match =>`
        <div class="mt-2 card card-body">
            <h5>${match[0]} <span class="text-primary">(${match[1]})<span></h5>
        </div>
        `).join('');
        // this will traverse through the array, and create html element snippets 
        // .join will join all the snippets together to form a single string of code


        // console.log(html);

        displayDiv.innerHTML = html;
    }
}

// Event listener

input.addEventListener('input', () => searchColor(input.value));
