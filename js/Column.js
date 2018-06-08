function Column(id, name) {
  	var self = this;

  	this.id = id;
  	this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

	this.element.addEventListener('click', function (event){
		console.log(event);
		if (event.target.classList.contains('add-card')) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			var data = new FormData();
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', self.id);

			fetch(baseUrl + '/card', {
				method: 'POST',
				headers: myHeaders,
				body: data,
			  })
			  .then(function(res) {
				return res.json();
			  })
			  .then(function(resp) {
				var card = new Card(resp.id, cardName);
				self.addCard(card);
			  });
		}
		else if ( event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}			
	})
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);
	},
	removeColumn: function() {
	  var self = this;
	  fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
		.then(function(resp) {
		  return resp.json();
		})
		.then(function(resp) {
		  self.element.remove();
		});
	}
};