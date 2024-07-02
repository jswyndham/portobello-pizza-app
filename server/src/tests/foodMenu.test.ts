import request from "supertest";
import app from "../server";
import mongoose, { ConnectOptions } from "mongoose";
import FoodMenu from "../models/FoodMenuModel";
import User from "../models/UserModel";

const url = `mongodb://127.0.0.1:27017/test_database`;

// Define connection options explicitly
const options: ConnectOptions = {
  serverSelectionTimeoutMS: 40000, // 40 seconds
  connectTimeoutMS: 40000, // 40 seconds
};

// Before running the tests, connect to a test database
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url, options);
  }
}, 40000);

// Clean up the database before each test
beforeEach(async () => {
  await FoodMenu.deleteMany({});
  await User.deleteMany({});
}, 40000);

// After all tests, close the connection to the test database
afterAll(async () => {
  await mongoose.disconnect();
}, 40000);

let emailCounter = 1;

const getEmail = () => `testuser${emailCounter++}@example.com`;

describe("FoodMenu API", () => {
  it("should register a new food menu item", async () => {
    const email = getEmail();

    // Step 1: Register a new user
    await request(app).post("/api/v1/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      email,
      password: "password123",
      userStatus: "MANAGER",
    });

    // Step 2: Log in the user to get a token
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email,
      password: "password123",
    });

    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Step 3: Use the token to create a food menu item
    const res = await request(app)
      .post("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        menuCategory: "PIZZA",
        pizzaType: "MEAT",
        name: "Test Pizza",
        ingredients: "test chicken, test basil, test chilli, test tomato paste",
        price: 666,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("msg", "New food item created");
    expect(res.body.foodItem).toHaveProperty("name", "Test Pizza");
  }, 40000);

  it("should get food menu items", async () => {
    const email = getEmail();

    // Step 1: Register a new user
    await request(app).post("/api/v1/auth/register").send({
      firstName: "John",
      lastName: "Doe",
      email,
      password: "password123",
      userStatus: "MANAGER",
    });

    // Step 2: Log in the user to get a token
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email,
      password: "password123",
    });

    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Step 3: Use the token to create a few food menu items
    await request(app)
      .post("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        menuCategory: "PIZZA",
        pizzaType: "MEAT",
        name: "Test Pizza 1",
        ingredients: "test chicken, test basil, test chilli, test tomato paste",
        price: 666,
      });

    await request(app)
      .post("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        menuCategory: "PIZZA",
        pizzaType: "MEAT",
        name: "Test Pizza 2",
        ingredients: "test chicken, test basil, test chilli, test tomato paste",
        price: 666,
      });

    // Step 4: Use the token to fetch food menu items
    const res = await request(app)
      .get("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty("name", "Test Pizza 1");
    expect(res.body[1]).toHaveProperty("name", "Test Pizza 2");
  }, 40000);

  it("should delete a food menu item", async () => {
    const email = getEmail();

    // Step 1: Register a new user
    await request(app).post("/api/v1/auth/register").send({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@email.com",
      password: "password123",
      userStatus: "ADMIN",
    });

    // Step 2: Log in the user to get a token
    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email: "john.doe@example.com",
      password: "password123",
    });

    const token = loginRes.body.token;
    expect(token).toBeDefined();

    // Step 3: Use the token to create a food menu item
    const createRes = await request(app)
      .post("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        menuCategory: "PIZZA",
        pizzaType: "MEAT",
        name: "Test Pizza To Delete",
        ingredients: "test chicken, test basil, test chilli, test tomato paste",
        price: 666,
      });

    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toHaveProperty("msg", "New food item created");
    expect(createRes.body.foodItem).toHaveProperty(
      "name",
      "Test Pizza To Delete"
    );

    // Step 4: Use the token to delete the food menu item
    const deleteRes = await request(app)
      .delete("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        menuCategory: "PIZZA",
        pizzaType: "MEAT",
        name: "Test Pizza To Delete",
        imageUrl: "",
        ingredients: "test chicken, test basil, test chilli, test tomato paste",
        price: 666,
      });

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body).toHaveProperty("msg", "Food menu item deleted");
    expect(deleteRes.body).toHaveProperty("foodItemId");

    // Step 5: Verify the item is deleted
    const fetchRes = await request(app)
      .get("/api/v1/foodMenu/food-items")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(fetchRes.statusCode).toEqual(200);
    expect(fetchRes.body).toBeInstanceOf(Array);
    expect(
      fetchRes.body.find((item: any) => item.name === "Test Pizza To Delete")
    ).toBeUndefined();
  }, 40000);
});
