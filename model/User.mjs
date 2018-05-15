import bcrypt from 'bcrypt-nodejs'


export default class User {

 constructor(username, email, id, password) {
   this.username = username;
   this.email = email;
   this.id = id;
   this.password = bcrypt.hashSync(password);
 }

 findById(id, done) {
   // TODO:
 }
 save(done) {
   // TODO:
 }

 validPassword(password) {
   return bcrypt.compareSync(password, this.password);
 }
}
