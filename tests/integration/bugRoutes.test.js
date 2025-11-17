const request = require('supertest');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');

describe('Bug Routes Integration Tests', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await Bug.deleteMany({});
  });

  describe('GET /api/bugs', () => {
    it('should get all bugs', async () => {
      // Create test bug first
      await Bug.create({
        title: 'Test Bug',
        description: 'Test Description',
        status: 'open',
        priority: 'medium'
      });

      const response = await request(app)
        .get('/api/bugs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      const bugData = {
        title: 'New Test Bug',
        description: 'New bug description',
        status: 'open',
        priority: 'high',
        project: 'Test Project'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(bugData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(bugData.title);
    });
  });
});