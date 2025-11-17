const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Post = require('../../src/models/Post');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/utils/auth');

let mongoServer;
let token;
let userId;
let postId;
let adminToken;
let adminId;

describe('Posts API Integration Tests', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create regular test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id;
    token = generateToken(user);

    // Create admin user
    const adminUser = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    adminId = adminUser._id;
    adminToken = generateToken(adminUser);

    // Create test post
    const post = await Post.create({
      title: 'Test Post',
      content: 'This is a test post content',
      author: userId,
      category: new mongoose.Types.ObjectId(),
      slug: 'test-post',
    });
    postId = post._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clean up posts but keep users
    await Post.deleteMany({ _id: { $ne: postId } });
  });

  describe('POST /api/posts', () => {
    // ... (your existing POST tests)

    it('should create post with tags and excerpt', async () => {
      const postData = {
        title: 'Post with Metadata',
        content: 'This post has tags and excerpt',
        category: new mongoose.Types.ObjectId().toString(),
        excerpt: 'This is a short excerpt',
        tags: ['javascript', 'testing', 'mern']
      };

      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData);

      expect(res.status).toBe(201);
      expect(res.body.tags).toEqual(postData.tags);
      expect(res.body.excerpt).toBe(postData.excerpt);
    });
  });

  describe('GET /api/posts', () => {
    // ... (your existing GET tests)

    it('should search posts by title and content', async () => {
      // Create posts with specific content
      await Post.create({
        title: 'JavaScript Tutorial',
        content: 'Learn JavaScript programming',
        author: userId,
        category: new mongoose.Types.ObjectId(),
        slug: 'js-tutorial'
      });

      await Post.create({
        title: 'React Guide',
        content: 'Complete React JavaScript framework guide',
        author: userId,
        category: new mongoose.Types.ObjectId(),
        slug: 'react-guide'
      });

      const res = await request(app)
        .get('/api/posts?search=JavaScript');

      expect(res.status).toBe(200);
      expect(res.body.posts.length).toBeGreaterThan(0);
      expect(res.body.posts.some(post => 
        post.title.includes('JavaScript') || 
        post.content.includes('JavaScript')
      )).toBe(true);
    });

    it('should filter posts by tags', async () => {
      await Post.create({
        title: 'Tagged Post',
        content: 'This post has specific tags',
        author: userId,
        category: new mongoose.Types.ObjectId(),
        slug: 'tagged-post',
        tags: ['nodejs', 'express']
      });

      const res = await request(app)
        .get('/api/posts?tag=nodejs');

      expect(res.status).toBe(200);
      expect(res.body.posts[0].tags).toContain('nodejs');
    });
  });

  describe('POST /api/posts/:id/like', () => {
    it('should like a post', async () => {
      const res = await request(app)
        .post(`/api/posts/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.liked).toBe(true);
      expect(res.body.likesCount).toBe(1);

      // Verify the like was saved
      const updatedPost = await Post.findById(postId);
      expect(updatedPost.likes).toContainEqual(userId);
    });

    it('should unlike a post', async () => {
      // First like the post
      await request(app)
        .post(`/api/posts/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      // Then unlike it
      const res = await request(app)
        .post(`/api/posts/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.liked).toBe(false);
      expect(res.body.likesCount).toBe(0);
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app)
        .post(`/api/posts/${postId}/like`);

      expect(res.status).toBe(401);
    });
  });

  describe('Admin Operations', () => {
    it('should allow admin to update any post', async () => {
      const updates = {
        title: 'Admin Updated Post',
        content: 'This was updated by admin'
      };

      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updates);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(updates.title);
    });

    it('should allow admin to delete any post', async () => {
      const testPost = await Post.create({
        title: 'Post to be deleted by admin',
        content: 'This post will be deleted',
        author: userId,
        category: new mongoose.Types.ObjectId(),
        slug: 'admin-delete-test'
      });

      const res = await request(app)
        .delete(`/api/posts/${testPost._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);

      // Verify post is deleted
      const deletedPost = await Post.findById(testPost._id);
      expect(deletedPost).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid ObjectId format', async () => {
      const res = await request(app)
        .get('/api/posts/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid ID format');
    });

    it('should handle duplicate slug creation', async () => {
      const postData = {
        title: 'Test Post', // Same title as existing post
        content: 'This should fail due to duplicate slug',
        category: new mongoose.Types.ObjectId().toString()
      };

      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postData);

      expect(res.status).toBe(400);
    });
  });
});