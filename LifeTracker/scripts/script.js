var mlt = {
    viewModel: {},

    ViewModel: function () {
        var self = this;

        self.selectedGame = ko.observable();
        self.games = ko.observableArray([]);
        self.players = ko.observableArray([]);

        self.addPlayer = function () {
            self.players.push(mlt.createPlayer());
        };

        self.selectGame = function () {
            self.selectedGame().isSelected(false);
            this.isSelected(true);
            self.selectedGame(this);
            self.resetGame();
        };

        self.resetGame = function () {
            $.each(self.players(), function () {
                this.life(self.selectedGame().defaultLife());
            });
        };
    },

    initialize: function() {
        var model = new mlt.ViewModel();
        mlt.viewModel = model;
        ko.applyBindings(model);

        var magic = mlt.createMagicGame();
        var yugioh = mlt.createYugiohGame();
        var wow = mlt.createWowGame();
        var shuzaku = mlt.createShuzakuGame();

        model.games([magic, yugioh, wow, shuzaku]);
        model.selectedGame(magic);
        model.selectedGame().isSelected(true);

        for (var i = 0; i < 2; i++) {
            mlt.viewModel.players.push(mlt.createPlayer());
        }
    },

    createPlayer: function() {
        var player = new mlt.constructors.Player();

        player.life(mlt.viewModel.selectedGame().defaultLife());
        
        for (var i = 0; i < 2; i++) {
            player.miniTrackers.push(mlt.createMiniTracker());
        }

        return player;
    },

    createMiniTracker: function() {
        var miniTracker = new mlt.constructors.MiniTracker();

        miniTracker.name("");
        miniTracker.value(0);
        miniTracker.increments([
            { name: "-1", value: -1 },
            { name: "+1", value: 1 }
        ]);

        return miniTracker;
    },

    createMagicGame: function() {
        var game = new mlt.constructors.Game();

        game.name("Magic the Gathering");
        game.defaultLife(20);
        game.increments([
            { name: "-10", value: -10 },
            { name: "-5", value: -5},
            { name: "-1", value: -1},
            { name: "+1", value: 1},
            { name: "+5", value: 5},
            { name: "+10", value: 10 }
        ]);

        return game;
    },

    createYugiohGame: function () {
        var game = new mlt.constructors.Game();

        game.name("YuGiOh");
        game.defaultLife(8000);
        game.increments([
            { name: "-1000", value: -1000 },
            { name: "-500", value: -500 },
            { name: "-100", value: -100 },
            { name: "-10", value: -10 },
            { name: "+10", value: 10 },
            { name: "+100", value: 100 },
            { name: "+500", value: 500 },
            { name: "+1000", value: 1000 }
        ]);

        return game;
    },

    createWowGame: function () {
        var game = new mlt.constructors.Game();

        game.name("World of Warcraft");
        game.defaultLife(25);
        game.increments([
            { name: "-10", value: -10 },
            { name: "-5", value: -5 },
            { name: "-1", value: -1 },
            { name: "+1", value: 1 },
            { name: "+5", value: 5 },
            { name: "+10", value: 10 },
        ]);

        return game;
    },

    createShuzakuGame: function () {
        var game = new mlt.constructors.Game();

        game.name("Shuzaku");
        game.defaultLife(10);
        game.increments([
            { name: "-5", value: -5 },
            { name: "-1", value: -1 },
            { name: "+1", value: 1 },
            { name: "+5", value: 5 }
        ]);

        return game;
    },

    constructors: {
        Game: function () {
            var self = this;

            self.name = ko.observable("");
            self.isSelected = ko.observable(false);
            self.defaultLife = ko.observable(-1);
            self.increments = ko.observableArray([]);
            self.miniTrackers = ko.observable([]);
        },

        
        MiniTracker: function () {
            var self = this;

            self.name = ko.observable("");
            self.increments = ko.observableArray([]);
            self.value = ko.observable(-1);

            self.changeValue = function () {
                self.value(self.value() + this.value);
            }
        },
        

        Player: function () {
            var self = this;

            self.name = ko.observable("");
            self.life = ko.observable(-1);
            self.miniTrackers = ko.observableArray([]);

            self.changeLife = function () {
                self.life(self.life() + this.value);
            };
        }
    }
};

mlt.initialize();