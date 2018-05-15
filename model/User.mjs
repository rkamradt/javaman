import bcrypt from 'bcrypt-nodejs'
import theUserLookup from '../server/userlookup';


export default class User {

 constructor(username, email, id, password) {
   this.username = username;
   this.email = email;
   this.id = id;
   this.password = bcrypt.hashSync(password);
 }

 static findById(id, done) {
   theUserLookup.findById(id, done);
 }
 save(done) {
   theUserLookup.save(this, done);
 }

 validPassword(password) {
   return bcrypt.compareSync(password, this.password);
 }
}
