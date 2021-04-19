<template>
    <div>
        <div class="requests">
            <ul>
                <li class="request" v-for="user in requests" v-bind:key="user">
                    <div>
                        <p>Name : {{ user[1].name }}</p>
                        <p>Email : {{ user[1].email }}</p>
                        <!-- <p>Password : {{ user[1].password }}</p> -->
                        <p>University : {{ user[1].university }}</p>
                        <img height="300" width="auto" :src="user[1].credentials" />
                        <br><br>
                        <button class="btn" v-bind:id="user[0]" v-on:click="reject($event)"> Reject </button>
                        <button class="btn" v-bind:id="user[0]" v-on:click="approve($event)"> Approve </button><br>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { db } from "../../firebase";
import { auth } from "../../firebase";
  
  export default {
    data() {
      return {
        requests: []
      }
    },
    methods: {
      fetchUsers: function() {
        db.collection('requests').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.requests.push([doc.id,doc.data()])
          });
        });
      },
      reject: function(event) {
        let cfm = confirm("Reject Request?");
        if (cfm) {
          let doc_id = event.target.getAttribute("id");
          db.collection('requests').doc(doc_id).delete().then(() => {location.reload()});
        }
      },
      approve: function(event) {
        let cfm = confirm("Approve Request?");
        if (cfm) {
        let doc_id = event.target.getAttribute("id");
        db.collection('requests').doc(doc_id).get().then(
          snapshot => {
            var data = snapshot.data();
            auth.createUserWithEmailAndPassword(data.email, data.password).then(
              userCredential => {
                var user = userCredential.user;
                user.sendEmailVerification();
                db.collection('users').doc(auth.currentUser.uid).set(data).then(
                  () => {
                    db.collection('requests').doc(doc_id).delete().then(
                      () => {
                        alert(`Account created for ${user.email}`);
                        location.reload();
                      },
                      err => {
                        alert(err.message);
                      }
                    );
                  },
                  err => {
                    alert(err.message);
                  }
                );
              },
              err => {
                alert(err.message);
              }
            );
          },
          err => {
            alert(err.message);  
          }
        );
        }
      }
    },
    created() {
      this.fetchUsers()
    }
  }
</script>

<style scoped>
.requests {
    margin: auto;
    padding: 20px;
    text-align: center;
    background: #47E4E4;
    min-width: 960px;
}
.request {
    list-style-type: none;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 20px;
    background: #C5ECEC;
    margin: 10px;
}
.btn {
    width: 100px;
    font-family: 'FredokaOne';
    border-radius: 0.5em;
    padding: 10px 20px;
    transition-duration: 0.4s;
    background-color: #2BD7E2;
    color: white;
    margin: 10px;
}
.btn:hover {
    background-color: black; /* Green */
    color: white;
}
</style>