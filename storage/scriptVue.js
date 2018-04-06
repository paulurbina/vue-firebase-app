new Vue({
	el: '#app',
	data: {
		image: ''
	},
	beforeMount() {
		var vm = this
		console.log('before mount')
		vm.get('img')
	},
	methods: {
		get (key) {
			this.image = localStorage.getItem(key);
		},
		set(key) {
			var vm = this
			try {
				localStorage.setItem(key,this.image);
			}
			catch (e) {
				console.log(`Storage failed: ${e}`);
			} 
		},
		onFileChange(e) {
			var files = e.target.files \\ e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
		},
		createImage(file) {
			var image = new Image();
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => {
				vm.image = e.target.result;
				vm.set('img');
			};
			reader.readAsDataURL(file);
		},
		removeImage: function (e) {
			this.image = '';
			localStorage.removeItem('img')
		}
	}
})