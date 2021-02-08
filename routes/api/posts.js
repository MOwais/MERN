const express = require('express');
const { validationResult, check } = require('express-validator');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const auth = require('../../middleware/auth');


//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post('/',auth,
    [
        check('text','Text is required').not().isEmpty()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }


        try{
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text:req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id,
    
            });

            const post = await newPost.save();
            res.json(post);
        }
        catch(err){
            console.error(err);
            res.status(500).send('Error creating post');
        }
    
    }
);

//@route  GET api/posts
//@desc   GET all post
//@access Private

router.get('/', auth, async(req,res)=>{
    try{
        //newest first
        const post = await Post.find().sort({date:-1});
        res.json(post);
    }
    catch(err){
        console.error(err);
        res.status(500).send('Error getting post - ', err)
    }
});

//@route  GET api/posts/:id
//@desc   GET post by ID
//@access Private

router.get('/:id', auth, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }
        res.json(post);
    }
    catch(err){
        console.error('Error getting post - ',err);
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        res.status(500).send('Error getting post - ', err)
    }
});

//@route  DELETE api/posts/:id
//@desc   Delete post by ID
//@access Private

router.delete('/:id', auth, async(req,res)=>{
    try{
        console.log("ID", req.params.id);
        const post = Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        await post.remove();
        res.json({msg:'Post Removed!'});
    }
    catch(err){
        console.error(err);
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        res.status(500).send('Error getting post - ', err)
    }
});

// optomized version
// router.delete('/:id', auth, (req, res) => {
//     // Check Id of owner post
//     Post.findOneAndRemove({ _id: req.params.id, user: req.user.id }).then(post => {
//         return !post
//           ? res.status(401).json({ post: 'post not found' })
//           : res.status(200).json({ post: 'post deleted' })
//       })
//       .catch(err => res.status(404).json({ post: 'It had a problem deleting the post' }))
//   });

//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access Private

router.put('/like/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        console.log("LIKES ARRAY", post.likes);
        //Check if post has already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:'Post already liked!'});
        }

        post.likes.unshift({user:req.user.id});
        await post.save();

        res.json(post.likes)
    }
    catch(err){
        console.error('Error liking a post - ', err);
        res.status(500).send('Error liking a post')
    }
});

//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access Private

router.put('/unlike/:id', auth, async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        //Check if post has already been liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:'Post has not yet been liked!'});
        }

        //Get remove index
        const removeIdx = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIdx,1);
        await post.save();

        res.json(post.likes)
    }
    catch(err){
        console.error('Error liking a post - ', err);
        res.status(500).send('Error liking a post')
    }
});

//@route  POST api/posts/comment/:id
//@desc   Add a comment
//@access Private
router.post('/comments/:id',auth,
    [
        check('text','Text is required').not().isEmpty()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }

        try{
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            const newComment = {
                text:req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id,
    
            }

            post.comments.unshift(newComment);
            await post.save();
            res.json(post);
        }
        catch(err){
            console.error(err);
            res.status(500).send('Error adding comment');
        }
    }
);

//@route  DELETE api/posts/comment/:id/:comment_id
//@desc   delete a comment
//@access Private

router.delete('/comments/:id/:comment_id',auth,
    async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);

            //Get comment from post
            const comment = post.comments.find(comment=>comment.id===req.params.comment_id);

            //Make sure comment exits
            if(!comment){
                return res.status(404).json({msg:'Comment does not exist'});
            }

            //Check user
            if(comment.user.toString() != req.user.id){
                return res.status(401).json({msg:'User not authorized'});
            }

            const removeIdx = 
            post.comments.map(comment => comment.user.toString())
            .indexOf(req.user.id);

            post.comments.splice(removeIdx,1);

            await post.save();
    
            res.json(post.comments);
        }
        catch(err){
            console.error(err);
            res.status(500).send('Error deleting comment');
        }
    }
);


module.exports = router;