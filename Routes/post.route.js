const { Router } = require('express');
const PostModel = require('../Models/post.model');
const postRouter = Router();

postRouter.post('/', async (req, res) => {
    const payload = req.body;
    try {
        const posts = await PostModel.insertMany(payload);
        res.send({ msg: "Store DB" })
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

postRouter.post('/post', async (req, res) => {
    const payload = req.body;
    try {
        const post = new PostModel(payload);
        await post.save();
        res.send({ msg: "Add User", post });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

postRouter.get('/get', async (req, res) => {
    let { page = 1, limit = 10, gender } = req.query;

    try {
        if (gender) {
            let posts = await PostModel.find({ gender: { $regex: `${gender}`, $options: "six" } });
            res.status(200).send(posts)
        } else if (page) {
            if (Number(page) === 1) {
                let posts = await PostModel.find().skip(0).limit(+limit);
                res.status(200).send(posts);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let posts = await PostModel.find().skip(s).limit(+limit);
                res.status(200).send(posts);
            }
        } else {
            let posts = await PostModel.find();
            res.status(200).send(posts);
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});


postRouter.put('/put/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        let user = await PostModel.findOne({ _id: id });
        res.status(200).send(user);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

postRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let user = await PostModel.findByIdAndDelete({ _id: id });
        res.send(user);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});



module.exports = { postRouter };