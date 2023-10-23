const $ = window.jQuery;

$(document).ready(function() {
    // $('#logout').click(function(){
    // alert()

    // ------------logout for all page
    $('body').append(
            "<div class='modal fade forgot-modal' id='logoff' tabindex='-1' role='dialog' aria-labelledby='logoffLabel' aria-hidden='true'><div class='modal-dialog modal-dialog-centered mx-auto' role='document'><div class='modal-content'><div class='modal-content'><div class='modal-body'><button type='button' class='close modal-close-btn' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><h3 class='title'>Are You Sure Want To Logout</h3><form><div class='btn-home mx-auto'></div><a href='http://202.131.123.110:8085/curio-front/login.html' class='btn btn-block btn-bg'>Yes</a><button type='button' class='btn btn-block btn-border' data-dismiss='modal'>Cancel</button></a></form></div></div></div></div>"
        )
        // });


});

// 10-mar-21
// pankita added
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
includeHTML();