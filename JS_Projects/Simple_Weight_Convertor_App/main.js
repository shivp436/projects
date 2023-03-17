document.getElementById('output').style.visibility = 'hidden';
document.getElementById('warningOutput').style.display = 'none';
var input = document.getElementById('lbsInput');

input.addEventListener('input', convertWeight);

function convertWeight() {
    let lbs = input.value;
    if (lbs < 0) {
        document.getElementById('warningOutput').style.display = 'block';
        document.getElementById('output').style.visibility = 'hidden';
    } else {
        document.getElementById('warningOutput').style.display = 'none';
        document.getElementById('output').style.visibility = 'visible';
        document.getElementById('kgOutput').innerHTML = '<h5>' + lbs / 2.22046 + '</h5>';
        document.getElementById('ozOutput').innerHTML = '<h5>' + lbs * 16 + '</h5>';
    }
}