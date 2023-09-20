import { StatusCodes } from "http-status-codes";
import request from "supertest";

import server from "#/index";

import { CreateIngredientRequestBuilder } from "!tests/modules/meal/ingredient/builders/requests/create-ingredient-request-builder";

describe("CreateIngredientController", () => {
  describe("[POST]: /meal/ingredient", () => {
    it("should register a new ingredient in the database", async () => {
      const requestBody = new CreateIngredientRequestBuilder().build();

      const response = await request(server).post("/meal/ingredient").send(requestBody);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });
});
