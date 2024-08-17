import mongoose from "mongoose";
import express from 'express';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    
    try {
        await newPostMessage.save();
        console.log("Post created successfully");

        res.status(201).json(newPostMessage);
    } catch (error) {
        console.log("Failed to create post");
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    console.log('Received postData in backend:', req.body);
    const { title, description, selectedFile, name } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
  
    const updatedPost = { title, description, selectedFile, name, _id: id };
  
    const result = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
    res.json(result);
  };
  

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.creator !== String(req.userId)) return res.status(403).json({ message: "You do not have permission to delete this post." });

        await PostMessage.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully." });
        console.log("Post deleted successfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No post with id: ${id}` });
  
    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const index = post.likes.findIndex((userId) => userId === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((userId) => userId !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error liking the post:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getUserPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const userPosts = await PostMessage.find({ creator: id });
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export default router;