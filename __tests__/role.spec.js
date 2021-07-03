const role = require('../helpers/role');
const { HttpCode, Subscription } = require('../helpers/constants');
const { User } = require('../model/__mocks__/data');

describe('Unit test: helper/role', () => {
  const req = { user: User };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(response => response),
  };
  const next = jest.fn();

  test('run function with right role', () => {
    role(Subscription.BUSINESS)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  test('run function with wrong role', () => {
    const result = role(Subscription.STARTER)(req, res, next);
    expect(result.status).toEqual('error');
    expect(result.code).toEqual(HttpCode.FORBIDDEN);
    expect(result.message).toEqual('Not authorized');
  });
});
