const request = require('supertest');
const express = require('express');
const bugRoutes = require('../../src/routes/bugs');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

// Mock the entire Bug model
jest.mock('../../src/models/Bug');
const Bug = require('../../src/models/Bug');

describe('Bugs API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/bugs', () => {
    test('should return all bugs', async () => {
      const mockBugs = [
        { title: 'Bug 1', description: 'Desc 1', priority: 'high' },
        { title: 'Bug 2', description: 'Desc 2', priority: 'medium' }
      ];

      Bug.find.mockResolvedValue(mockBugs);

      const response = await request(app)
        .get('/api/bugs')
        .expect(200);

      expect(response.body).toEqual(mockBugs);
      expect(Bug.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const newBug = {
        title: 'API Test Bug',
        description: 'This is a test bug from API test',
        priority: 'low'
      };

      const savedBug = { ...newBug, _id: '123', status: 'open' };
      
      // Mock the Bug constructor and save method
      const mockSave = jest.fn().mockResolvedValue(savedBug);
      Bug.mockImplementation(() => {
        return {
          save: mockSave
        };
      });

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug)
        .expect(201);

      expect(response.body.title).toBe(newBug.title);
      expect(response.body.status).toBe('open');
      expect(mockSave).toHaveBeenCalledTimes(1);
    });

    test('should return 400 for invalid bug data', async () => {
      const invalidBug = {
        description: 'Missing title', // No title field
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });
});