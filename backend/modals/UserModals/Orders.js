const mongoose = require("mongoose");
const Order_Schema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone_number: {
      type: Number,
      required: true,
    },
    customer_email: {
      type: String,
    },
    customer_business: {
      type: String,
    },
    customer_gst: {
      type: String,
    },
    transport_detail: {
      type: String,
    },
    payment_mode: {
      type: String,
    },
    delivery_charges: {
      type: Number,
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    order_total: {
      type: String,
    },
    used_wallet_amount: {
      coins_used: {
        type: Number,
        default: 0,
      },
      coin_value: {
        type: Number,
      },
    },
    coupon_discount: {},
    gifted_coin: {
      type: Number,
      default: 0,
    },
    order_status: {
      type: String,
      required: true,
      default: "pending",
    },
    order_from: {
      type: String,
    },

    ordered_products_transport_detail: {
      type: String,
    },
    products: [
      {
        product_id: { type: String },
        product_code: { type: String },
        product_name: { type: String },
        product_main_category: { type: String },
        product_category: { type: String },
        product_subcategory: { type: String },
        product_variant: { type: String },
        // product_color:{type:String},
        // product_size:{type:String},
        // product_weight:{type:String},
        selected_variation: [{ type: String }],
        product_quantity: { type: Number },
        product_quantity_by: { type: String },
        product_delivery_status: { type: Boolean },
        product_regular_price: { type: Number },
        product_sale_price: { type: Number },
        product_images: [
          {
            image_name: { type: String },
            image_url: { type: String },
            path: { type: String },
          },
        ],
      },
    ],
    shipping_address: { type: String },
    state: { type: String },
    pincode: { type: Number, required: true },
    // shipping_address:{
    //         pincode: { type: Number,required:true },
    //         state: { type: String,required:true },
    //         city: { type: String,required:true },
    //         street: { type: String,required:true },
    //         landmark: { type: String,required:true },
    //         houseNo: { type: String,required:true },
    //         mobileNo: { type: Number,required:true },
    //       },
    // payment_mode:{
    //     type:String,
    //     required:true
    // }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", Order_Schema);
