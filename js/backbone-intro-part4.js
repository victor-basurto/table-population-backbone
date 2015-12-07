(function() {
	// hold empty Views, Collections and Models
	window.App = {
		Views: {},
		Collections: {},
		Models: {}
	},

	// helper function
	window.template = function(id) {
		return _.template( $('#'+ id).html() );
	},

	/**
	 * Single Model
	 */
	App.Models.Item = Backbone.Model.extend({\
		// validate information when updating
		validate: function( attrs ) {
			if( !$.trim(attrs.name) ) {
				return 'enter valid information';
			}
		}
	});

	/**
	 * Create a Collection
	 */
	App.Collections.Items = Backbone.Collection.extend({
		// pass the model as reference
		model: App.Models.Item
	});

	/**
	 * Create a Collection View
	 */
	App.Views.Items = Backbone.View.extend({
		// create a row tag
		tagName: 'tbody',

		// render the view
		render: function() {
			// iterate through the collection
			this.collection.each( this.itemList, this );

			// return this
			return this;
		},

		// iterate through the <li>
		itemList: function( item ) {
			// get the itemView
			var itemView = new App.Views.Item({ model: item });

			// append each item and render it so it can be displayed
			this.$el.append( itemView.render().el );
		}
	});

	/**
	 * Single View
	 */
	App.Views.Item = Backbone.View.extend({
		// create tag
		tagName: 'tr',

		// use our template helper function
		template: template('devices'),

		// events
		events: {
			'click .edit': 'changeName'
		},

		// initialize the event
		initialize: function() {
			this.model.on('change:name', this.render, this);
		},

		// render item
		render: function() {
			// use template to apply toJSON
			var template = this.template( this.model.toJSON() );

			// attach value to <li>
			this.$el.html( template );

			console.log(this.template(this.model.toJSON()));

			// always return this, so we can use this function outside the scope
			return this;
		},

		// change the name of each item
		changeName: function() {
			// get name, description, career, stknumber
			var name = this.model.get('name');

			// log the model once we click on this item
			console.log(this.model);

			// get attributes to manipulate them and change them
			var userInput = prompt('Change Name From: ', name);

			// if user clicks on cancel, do not set empty string
			if( !userInput ) return;

			// pass {validate: true} as an option to activate the validate
			// function declared on the model
			this.model.set('name', userInput, {validate: true});
		}

	});

	/**
	 * Instantiate the Model with Real Values
	 */
	var itemsCollection = new App.Collections.Items([
		{
			name: 'Nexus 6',
			description: 'Cell-Phone',
			career: 'Motorola',
			stkNumber: 1
		},
		{
			name: 'Nexus 6p',
			description: 'Cell-Phone',
			career: 'Huawei',
			stkNumber: 5
		},
		{
			name: 'Nexus 5x',
			description: 'Cell-Phone',
			career: 'LG',
			stkNumber: 3
		},
		{
			name: 'Inspiron 15',
			description: 'Laptop',
			career: 'Dell',
			stkNumber: 6
		},
		{
			name: 'iPad',
			description: 'Tablet',
			career: 'Apple',
			stkNumber: 10
		},
		{
			name: 'Galaxy Tab 10',
			description: 'Tablet',
			career: 'Samsung',
			stkNumber: 7
		},
		{
			name: 'iPhone 6',
			description: 'Cell-Phone',
			career: 'Apple',
			stkNumber: 2
		},
		{
			name: 'Moto-X',
			description: 'Cell-Phone',
			career: 'Motorola',
			stkNumber: 4
		},
		{
			name: 'Moto360',
			description: 'Smart-Watch',
			career: 'Motorola',
			stkNumber: 9
		},
		{
			name: 'Apple-Watch',
			description: 'Smart-Watch',
			career: 'Apple',
			stkNumber: 8
		}
	]);

	/**
	 * Instantiate the View and pass the model as argumet
	 */
	var itemsCollectionView = new App.Views.Items({ collection: itemsCollection });

	// render the view
	// itemsCollectionView.render();

	// show the result
	// console.log( itemsCollectionView.render().el );

	$('.list-of-devices').append(itemsCollectionView.render().el);
})();