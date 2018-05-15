import Redis from 'ioredis';

class UserLookup {

 constructor() {
   this.client = new Redis(6379, 'redis');
 }

 findById(id, done) {
   this.client.get('user:' + id, (err, user)=> done(err, JSON.parse(user)))
 }

 findAll(done) {
   this.client.keys('user:*', (err, ids)=> done(err, JSON.stringify(ids)))
 }

 save(user, done) {
   this.client.set('user:', user)
   done(null, user);
 }

 delete(user) {
   // TODO:
 }

}

const theUserLookup = new UserLookup();

export default theUserLookup;
