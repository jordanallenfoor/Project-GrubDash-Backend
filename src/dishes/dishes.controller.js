const path = require("path");
const { notDeepStrictEqual } = require("assert");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass

function create(req, res) {
  const {
    data: { id, name, description, price, image_url },
  } = req.body;

  const newId = nextId();
  const newName = req.body.data.name;
  const newDescription = req.body.data.description;
  const newPrice = req.body.data.price;
  const newImageUrl = req.body.data.image_url;

  const newDish = {
    id: newId,
    name: newName,
    description: newDescription,
    price: newPrice,
    image_url: newImageUrl,
  };

  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

function dishExists(req, res, next) {
  const dishId = req.params.dishId;
  foundDish = dishes.filter((dish) => dish.id === dishId);
  if (foundDish.length > 0) {
    res.locals.dish = foundDish;
    next();
  } else {
    next({ status: 404, message: `Dish ${dishId} not found.` });
  }
}
