// @ts-nocheck
window.onload = function() {
    updateZJ();
    var tbl = document.getElementById("table");
    var row = tbl.rows;
    for (var i = 0; i < row.length; i++) {
        var tr = row[i];
        tr.onmouseover = showBGcolor;
        tr.onmouseout = clearBGcolor;
        var cells = tr.cells;
        var price = cells[1];
        price.onmouseover = showhand;
        price.onclick = editprice;

        var fc = cells[4];
        if (fc && fc.tagName == "TD") {
            fc.onclick = delfruit;
        }
    }
}

function showBGcolor() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var q = event.srcElement;
        var t = q.parentElement;
        t.style.backgroundColor = "navy";
        var ww = t.cells;
        for (var i = 1; i < ww.length - 1; i++) {
            ww[i].style.color = "white";
        }
    }

}

function clearBGcolor() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var q = event.srcElement;
        var t = q.parentElement;
        t.style.backgroundColor = "transparent";
        var ww = t.cells;
        for (var i = 0; i < ww.length; i++) {
            ww[i].style.color = "threeddarkshadow";
        }
    }
}

function showhand() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var q = event.srcElement;
        q.style.cursor = "pointer";


    }
}

function editprice() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var priceTD = event.srcElement;
        if (priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            var old = priceTD.innerText;
            priceTD.innerHTML = "<input type = 'text' size= 2  / > ";
            var input = priceTD.firstChild;
            if (input.tagName == "INPUT") {
                input.value = old;
                input.select();
                input.onblur = updateprice;
                input.onkeydown = ckInput;
            }

        }
    }
}

function updateprice() {
    if (event && event.srcElement && event.srcElement.tagName == "INPUT") {
        var q = event.srcElement;
        var newprice = q.value;
        var pa = q.parentElement;
        pa.innerText = newprice;
        xj(pa.parentElement);
        updateZJ();
    }
}


function xj(tr) {
    if (tr && tr.tagName == "TR") {
        var tds = tr.cells;
        var priceTD = tds[1].innerText;
        var count = tds[2].innerText;
        var xj = parseInt(priceTD) * parseInt(count);
        tds[3].innerText = xj;
    }
}

function updateZJ() {
    var table = document.getElementById("table");
    var rows = table.rows;
    var num = 0;
    for (var i = 1; i < rows.length - 1; i++) {
        var cell = parseInt(rows[i].cells[3].innerText);
        num = num + cell;
    }
    rows[rows.length - 1].cells[1].innerText = num;
}

function delfruit() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        if (window.confirm("是否要刪除")) {
            var td = event.srcElement;
            var tr = td.parentElement;
            var table = document.getElementById("table");
            table.deleteRow(tr.rowIndex);
            updateZJ();
        }

    }
}

function ckInput() {
    var kc = event.keyCode;
    if (!((kc >= 48 && kc <= 57) || kc == 8 || kc == 13)) {
        event.returnValue = false;
    }
    if (kc == 13) {
        event.srcElement.blur();
    }
}