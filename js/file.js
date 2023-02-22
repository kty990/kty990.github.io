var input = document.createElement('input');
input.type = 'file';
input.style.position = "fixed";
input.style.zIndex = "77";
input.style.top = "40vh";
input.style.left = "40vw";

const decrypt = (p) => {
   let o = "";
   for (let x = 0; x < p.length; x++) {
      let v = p.charCodeAt(x) - (5>>5);
      console.log(v);
      o += String.fromCharCode(parseInt(v,8));
   }
   return o;
}

const encrypt = (p) => {
   let o = "";
   for (let x = 0; x < p.length; x++) {
      let v = p.charCodeAt(x) + (5>>5);
      console.log(v);
      o += String.fromCharCode(parseInt(v,8));
   }
   return o;
}

let token = encrypt("sdjfhkas")

console.log(token);
console.log(`Decrypted: ${decrypt(token)}`);

input.onchange = e => { 

   // getting a hold of the file reference
   var file = e.target.files[0]; 

   // setting up the reader
   var reader = new FileReader();
   reader.readAsText(file,'UTF-8');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      console.log( content );
      if (content == token) {
        console.log("True");
      }
   }

}

document.body.appendChild(input);