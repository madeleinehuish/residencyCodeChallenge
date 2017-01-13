<input type="file" id="files" name="files[]" multiple />
<output id="list"></output>

<script>

  function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

      // if (!f.type.match('json.*')) {
      //   continue;
      // } else {
      //   alert('Please use a JSON file.');
      // }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {

        return function(e) {
          // var span = document.createElement('span');

          var obj = JSON.parse(e.target.result);

          function nested(nestedObject){
            if(typeof nestedObject.content === 'object') {
              if(Array.isArray(nestedObject.content)) {
                let arr = nestedObject.content;
                for(let i=0; i < arr.length; i++) {
                  nested(arr[i]);
                }
              } else {
                nested(nestedObject.content);
              }
            } else {
              let tag = nestedObject.tag;
              let content = nestedObject.content;
              let domElement = document.body.appendChild(document.createElement(tag));
              domElement.innerHTML = content;
            }
          }

          for(let i=0; i < obj.length; i++){
            nested(obj[i]);
          }

        };
      })(f);
      reader.readAsBinaryString(f);
    }
  }
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
