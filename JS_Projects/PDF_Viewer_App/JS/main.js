const url = '../Docs/MP1-FinalReport.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false;
    pageNumIsPending = null;

const scale = 1,
    canvas = document.querySelector('#pdf-render');
    ctx = canvas.getContext('2d');

// Render the page
const renderPage = num => {
    pageIsRendering = true;

    // Get page
    pdfDoc.getPage(num).then(page => {
        // Set scale
        const viewport = page.getViewport({ scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }
        page.render(renderCtx).promise.then(() =>{
            pageIsRendering = false;

            if(pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        // output current page number
        document.querySelector('#page-num').textContent = num;
    })
}

// chcek for pages rendering
const queRenderPage = num => {
    if(pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
}

// show previous page
const showPreviousPage = () => {
    if(pageNum <= 1) {
        return;
    }
    pageNum--;
    queRenderPage(pageNum);
}

// show next page
const showNextPage = () => {
    if(pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queRenderPage(pageNum);
}

// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    
    document.querySelector('#tot-page').textContent = pdfDoc.numPages;
    //numPages is an inbuilt property of pdfjs Library

    renderPage(pageNum);
})
    .catch(err => {
        // display error
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(err.message));
        document.querySelector('body').insertBefore(div, canvas);
        // remove top bar
        document.querySelector('.top-bar').style.display = 'none';
    })

// button events
document.querySelector('#prev-page').addEventListener('click', showPreviousPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);