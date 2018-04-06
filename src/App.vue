<template>
  <div id="app" class="container">
    <h1 class="display-1">Data Collections</h1>

    <div class="card">
      <div class="car-header">
        <h3 class="display-5">Add Link</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addLink" class="form-inline">

          <div class="form-group mx-sm-5">
            <input 
            class="form-control" 
            type="text" 
            v-model="newLink.title" 
            placeholder="title">
          </div>


          <div class="form-group mx-sm-5">
            
            <input 
            class="form-control" 
            type="text" 
            v-model="newLink.url" 
            placeholder="http://www.example.com">
          </div>
          
          <div class="form-group mx-sm-4">
            
            <input 
            class="form-control" 
            type="text" 
            v-model="newLink.author" 
            placeholder="author/description">
          </div>

          <input type="submit" class="btn btn-dark" value="Agrega enlace">
        </form>
      </div>
        
      <hr>  

      <div  class="card">
        <div class="card-header"  >
          <h3 class="card-title display-5">list of links</h3>
        </div> 
        <div class="card-body"  >
          <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author/Description</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="link in links">
                    <td>
                      <a
                         class="badge badge-dark"
                         target="_blank" 
                         v-bind:href="link.url">{{ link.title }}
                       </a>
                    </td>
                    <td>
                      {{ link.author }}
                    </td>
                    <td>
                      <button 
                          v-on:click="deleteLink(link)" 
                          class="btn btn-danger">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
          </table>
         </div>  
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="display-5">Add Images</h3>
        </div>
        <div class="card-body">               
            <progress value="0" max="100" id="uploader" style="width: 100%;"></progress>
            <input class="form-control-file" accept="image/*" type="file" value="upload" @change="fileBtn($event)"
            >
        </div>

        <hr>

        <div class="card">
          <div class="card-header">
              <h3 class="card-title display-5">List of images</h3>
          </div>
          <div class="card-body">
            <div id="verImage">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Firebase from 'firebase';
import toastr from 'toastr';

 let config = {
    apiKey: "AIzaSyA9XIiwKoaZTM51GakQRb1zfNcyKbcyT4A",
    authDomain: "vuejs-firebase-54b30.firebaseapp.com",
    databaseURL: "https://vuejs-firebase-54b30.firebaseio.com",
    projectId: "vuejs-firebase-54b30",
    storageBucket: "vuejs-firebase-54b30.appspot.com",
    messagingSenderId: "211438120208"
  };

let app = Firebase.initializeApp(config);
let db = app.database();

let linksRef = db.ref('links');

let storage = Firebase.storage();



export default {
  name: 'App',
  firebase: {
    links: linksRef
  },
  data() {
    return {
      newLink: {
        title: '',
        author: '',
        url: ''
      },
    }
  },
  methods: {
    addLink: function () {
        linksRef.push(this.newLink);
        this.newLink.title = '';
        this.newLink.author = '';
        this.newLink.url = '';
            },
    deleteLink: function (link) {
      linksRef.child(link['.key']).remove();
      toastr.success('link removed');
      },
    fileBtn:function(e){

      //UPLOAD FILES
      const uploader = document.getElementById('uploader');
      //get file
      let getFile = e.target.files[0];
      //set storage ref
      let storageRef = storage.ref('images/'+getFile.name);
      //upload file
      let task = storageRef.put(getFile);

      task.on('state_changed',
       function progress(snapshot){
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        uploader.value = percentage;
      },
      function error(err){
        toastr.error('Uh! problem :(')
      },
      function complete(){
         toastr.success('added image');

         var downloadURL = task.snapshot.downloadURL;

         var gsReference = storage.refFromURL('gs://vuejs-firebase-54b30.appspot.com');

         var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/vuejs-firebase-54b30.appspot.com/o/images%2FIMG_0025.JPG?alt=media&token=926f0563-43ee-445b-a430-11140591b3f3');

         var verImage = document.getElementById("verImage");
         console.log(downloadURL);
      }
      ); 

    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
