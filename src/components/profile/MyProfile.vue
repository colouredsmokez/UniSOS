<template>
    <div>

        <div class="profile"> 

            <!-- Profile Pic -->
            <div>
                <a href="#">
                    <img src='../../assets/ProfilePic.png'>
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
import { auth } from '../../firebase';

export default {
  data() {
    return {
      name: '',
      email: '',
      university: ''
    };
  },
  created() {
    db.collection('users').doc(auth.currentUser.uid).get().then(
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
@font-face {
    font-family: 'FredokaOne';
    src: url('/fonts/fredokaone-regular-webfont.woff2') format('woff2'),
         url('/fonts/fredokaone-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.profile {
    margin: auto;
    padding: 20px;
    text-align: center;
    font-family: 'FredokaOne';
}
</style>