 function get(path, callback) {
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             callback(JSON.parse(xmlhttp.responseText));
         }
     }
     xmlhttp.open("GET", path, true);
     xmlhttp.send();
 }

 function buildItem(item) {

     var html = '';

     html = html + '<div class="info">' +
         '<div class="meta">' +
         '<div class="name">' + item.name + '</div>' +
         '<div class="description">' + item.description + '</div>' +
         '<div class="cost">$' + item.usaDollarPrice + '</div>' +
         '</div>' +
         '<div class="style"></div>' +
         '</div>' +
         '<div class="product">' +
         '<img class="pic" src="' + item.imgsrc + '"></div>'

     return html;
 }

 function setup() {

     get('./data/sample.json', function (items) {

         var anchor = document.getElementById('items');

         items.forEach(function (item) {
             var product = document.createElement('div');
             product.className = 'tile';
             product.innerHTML = buildItem(item);
             anchor.appendChild(product);
         });
     })
 }

 window.onload = setup;