const sql = require("mssql");
const getRecipes = require("./index");

jest.mock("mssql");

describe("getRecipes function", () => {
  it("should return a successful response", async () => {
    // arrange
    const context = {
      res: {},
      log: jest.fn(),
    };
    const req = {};

    const recordset = [{ id: 1, name: "recipe1" }, { id: 2, name: "recipe2" }];
    sql.query.mockResolvedValueOnce({ recordset });

    // act
    await getRecipes(context, req);

    // assert
    expect(context.res.status).toEqual(200);
    expect(context.res.body).toEqual(recordset);
    expect(context.res.headers).toEqual({
      "Content-Type": "application/json",
    });
  });

  it("should return an error response", async () => {
    // arrange
    const context = {
      res: {},
      log: jest.fn(),
    };
    const req = {};

    const error = new Error("Test error");
    sql.query.mockRejectedValueOnce(error);

    // act
    await getRecipes(context, req);

    // assert
    expect(context.res.status).toEqual(500);
    expect(context.res.body).toEqual("Error connecting to database");
  });
});
