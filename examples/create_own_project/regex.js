/* const text = "this is me my name is sagor";
console.log(text.match(/[a]/gi)); */ // find [a] in this text

/* const text = "this is me my name is sagor";
console.log(text.match(/[a-z]/gi));  // a-z small letter er  er moddhe za za ase sob kichu dibe         
 */
/* const text = "this is me my name is sagor";
console.log(text.match(/[A-Z]/gi));   // A-Z capital letter er  er moddhe za za ase sob kichu dibe             
 */
/* const text = "this is me my name is sagor";
console.log(text.match(/[A-z]/gi));   // A-z capital + small letter er  er moddhe za za ase sob kichu dibe            
 */
/* const obj =
  '{"args":{"where":{"userId":1}},"dataPath":[],"runInTransaction":false,"action":"findMany","model":"Post"}';
if (obj.match(/\b(post)\b/gim)) {
  console.log(obj.match(/\b(post)\b/gim));
  console.log("sagor");
} */

const str =
  "https:sagor.com//accounts.google.com/id=2sdfewfsdf345345sdfsfsdsfsedf3?qr=12sfsefsdfdsf34";
console.log(str.match(/accounts\.google\.com/));

const st =
  '{"args":{"where":{"userId":1}},"dataPath":[],"runInTransaction":false,"action":"findMany","model":"Post"}';
console.log(st.match(/"mode"\:"Post"/));
