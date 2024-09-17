const { number, any } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection susscceful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
//   let cust1 = new Customer({
//     name: "Pappu",
//   });

//   let order1 = await Order.findOne({ item: "Chips" });
//   let order2 = await Order.findOne({ item: "awd"});

//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result = await cust1.save();
//   console.log(result);

    let result = await Customer.find({});
    console.log(result);
};

addCustomer();

// const addorders =  async () => {
//     let res = await Order.insertMany([
//         {item:"samosa",price: 22},
//         {item:"kachoddii",price: 25},
//         {item:"Thepla",price: 20}
//     ]);
//     console.log(res);
// };

// addorders();
