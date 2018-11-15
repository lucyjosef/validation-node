{
	const vm = new Vue({
		el: '#app',
		data:{
			title: 'Validation Node2',
			secretvalue: '',
			selectedServer: 'all'
		},
		methods: {
			editSecret: function() {
				data = {"text": document.getElementById('editSecret').value}
				this.secretvalue = data.text
				fetch('http://localhost:4001/secret', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify(data)
				})
					.then((res) => {
						return res.json()
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		computed: {
			getSecret: function() {
				fetch('http://localhost:4001/secret')
					.then((res) => {
						console.log("RES")
						console.log(res)
						JSON.parse(res)
						return res.json()
					})
					.then((myJson) => {
						console.log("MYJSON")
						console.log(myJson)
					})
					.catch((err) => {
						console.log("ERR")
						console.log(err)
					})
			}
		}
	})
}