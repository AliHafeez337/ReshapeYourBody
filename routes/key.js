var express = require('express');
var router = express.Router();
const passport = require('passport');
const _ = require('lodash');

var {
    User
} = require('../models/user');
var {
    Key
} = require('../models/key');
var {
    authenticate
} = require('../middleware/authenticate');
var {
    adminpartnerauthenticate,
    userauthenticate
} = require('../middleware/authenticate');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProductKey() {
    var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        chars = 5,
        segments = 4,
        keyString = "";

    for (var i = 0; i < segments; i++) {
        var segment = "";

        for (var j = 0; j < chars; j++) {
            var k = getRandomInt(0, 35);
            segment += tokens[k];
        }

        keyString += segment;

        if (i < (segments - 1)) {
            keyString += "-";
        }
    }
    return keyString;
}

router.post('/generateKey', adminpartnerauthenticate, async function (req, res) {
    var keyGen = generateProductKey();
    var body = {
        key: keyGen,
    }
    var keyM = new Key(body);
    try {
        var doc = await keyM.save();
        doc = await doc.populate('owner', [ 'email', 'firstname', 'lastname' ]);
        res.send(doc);
    } catch {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.put('/enterKey', userauthenticate, async function (req, res) {
    var body = {
        used: true,
        owner: req.person
    }
    try {
        var doc2 = await Key.find({key: req.body.key})
        if (doc2 != null){
            if (!doc2[0].used){
                console.log('here')
                var doc1 = await Key.findOneAndUpdate({
                    key: req.body.key
                },
                body, {
                    new: true
                }).populate('owner', [ 'email', 'firstname', 'lastname' ]);
                if (doc1 == null){
                    res.status(400).send({
                        errmsg: "You have entered the wrong key..."
                    });
                }
                else{
                    var doc = await User.findOneAndUpdate(
                    {
                        _id: req.person._id,
                    },
                    {
                        usertype: 'customer'
                    },
                    { new: true }
                    );
                    res.status(200).send(doc);
                }
            }
            else{
                res.status(400).send({
                    errmsg: "You have entered the used key..."
                });
            }
        }
        else{
            res.status(400).send({
                errmsg: "You have entered the wrong key..."
            });
        }
    } catch {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.put('/useKey', adminpartnerauthenticate, async function (req, res) {
    var body = {
        used: true,
        owner: req.person
    }
    try {
        var doc1 = await Key.findOneAndUpdate({
                key: req.body.key
            },
            body, {
                new: true
            }
        ).populate('owner', [ 'email', 'firstname', 'lastname' ]);
        res.status(200).send(doc1);
    } catch {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.delete('/deleteKey', adminpartnerauthenticate, async function (req, res) {
    try {
        var doc1 = await Key.findByIdAndDelete(
            req.query.keyId
        );
        res.status(200).send(doc1);
    } catch (e) {
        console.log(e)
        res.status(400).send({
            errmsg: "Something bad happened"
        });
    }

});

router.get('/getKeys', adminpartnerauthenticate, async function (req, res) {
    try {
        var doc1 = await Key.find({}).sort({
            creadtedAt: -1
        }).populate('owner', [ 'email', 'firstname', 'lastname' ]);
        res.status(200).send(doc1);
    } catch (e) {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.get('/getKeyByOwner', authenticate, async function (req, res) {
    try {
        var doc1 = await Key.find({
            owner: req.person
        }).populate('owner', [ 'email', 'firstname', 'lastname' ]);
        res.status(200).send(doc1);
    } catch (e) {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.get('/getKeyById', adminpartnerauthenticate, async function (req, res) {
    try {
        var doc1 = await Key.findById(req.query.keyId).populate('owner', [ 'email', 'firstname', 'lastname' ]);
        res.status(200).send(doc1);
    } catch (e) {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

module.exports = router;