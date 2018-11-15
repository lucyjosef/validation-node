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
				console.log(data.text)
				fetch('http://localhost:4001/secret', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify(data)
				})
					.then((res) => {
						console.log(res)
						return res.json()
					})
					.catch((err) => {
						console.log(err)
					})
			}
		}
	})
}