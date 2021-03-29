<template>
    <div>

        <div class="userprofile"> 

            <!-- Profile Pic -->
            <div>
                <a href="#">
                    <img v-lazy="'../../assets/ProfilePic.png'" class="rounded-circle">
                </a>
            </div>

            <!-- User Info -->
            <div>
                <br><br>
                <h3>{{ name }}</h3>
                <div>{{ email }}</div>
                <div>{{ university }}</div>
            </div>

            <!-- Tutor Info -->
            <div>
                <h3>Modules</h3>
            </div>

            <!-- Notes Info -->
            <div>
                <h3>Notes</h3>
            </div>

        </div>
        
    </div>
</template>

<script>
import { db } from '../../firebase';

export default {
  props: {
    uid: {
      type: String
    }
  },
  data() {
    return {
      name: '',
      email: '',
      university: ''
    };
  },
  created() {
    db.collection('users').doc(this.uid).get().then(
        snapshot => {
            var data = snapshot.data();
            this.name = data.name;
            this.email = data.email;
            this.university = data.university;
        },
        err => {
            alert(err.message)
        }
    );
  }
}
</script>

<style scoped>
</style>