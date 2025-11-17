const bugController = require('../../../src/controllers/BugController');
const Bug = require('../../../src/models/Bug');

// Mock the Bug model
jest.mock('../../../src/models/Bug');

describe('Bug Controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      query: {},
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getBugs', () => {
    it('should return all bugs with pagination', async () => {
      const mockBugs = [{ title: 'Test Bug' }];
      Bug.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValue(mockBugs)
      });
      Bug.countDocuments.mockResolvedValue(1);

      mockReq.query = { page: 1, limit: 10 };

      await bugController.getBugs(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockBugs,
        pagination: expect.any(Object)
      });
    });
  });

  describe('getBugById', () => {
    it('should return bug when found', async () => {
      const mockBug = { _id: '123', title: 'Test Bug' };
      Bug.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockBug)
      });

      mockReq.params.id = '123';

      await bugController.getBugById(mockReq, mockRes);

      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockBug
      });
    });

    it('should return 404 when bug not found', async () => {
      Bug.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      mockReq.params.id = 'invalid';

      await bugController.getBugById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});