const mongoose = require("mongoose");
const Details_Schema = new mongoose.Schema(
  {
    app_id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    },
    whatsapp_link: {
      type: String,
    },
    facebook_link: {
      type: String,
    },
    instagram_link: {
      type: String,
    },
    linkedin_link: {
      type: String,
    },
    twitter_link: {
      type: String,
    },
    telegram_link: {
      type: String,
    },
    youtube_link: {
      type: String,
    },
    app_link: {
      type: String,
    },
    plan: {
      type: String,
    },
    plan_details: {
      plan_name: { type: String },
      duration: {
        name: { type: String },
        price: { type: Number },
        discount: { type: Number },
      },
      total_price_with_gst: { type: Number },
      purchased_date: { type: String },
      renew_date: { type: String },
    },
    product_limit: {
      type: Number,
    },
    banner_limit: {
      type: Number,
    },
    users_limit: {
      type: Number,
    },
    app_signing: {
      app_sha_1: { type: String },
      app_sha_256: { type: String },
    },
    delivery_charges: {
      type: Number,
      default: 0,
    },
    cash_on_delivery: {
      type: Boolean,
      default: true,
    },
    aboutus: {
      type: String,
    },
    term_and_condition: {
      type: String,
    },
    privacy_policy: {
      type: String,
    },
    invoice_details: {
      company_name: { type: String },
      company_address: { type: String },
      company_zipcode: { type: String },
      company_state: { type: String },
      company_phone_number: { type: Number },
      gst_number: {
        type: String,
      },
    },
    custom_size: [{ type: String }],
    custom_weight: [{ type: String }],
    adiogent_pay: {
      is_installed: { type: Boolean, default: false },
      upi_id: { type: String },
    },
    razorpay_is_installed: { type: Boolean, default: false },
    razorpay_key_id: { type: String },
    razorpay_key_secret: { type: String },
    shiprocket_plugin: {
      is_installed: { type: Boolean, default: false },
      user_email: { type: String },
      user_password: { type: String },
    },
    app_ios_link: {
      type: String,
    },
    contact_email_address: {
      type: String,
    },
    contact_address: {
      type: String,
    },
    web_aboutus: {
      type: String,
    },
    web_privacy_policy: {
      type: String,
    },
    web_term_and_condition: {
      type: String,
    },
    order_notification_email: {
      type: String,
    },

    is_wallet_active: {
      type: Boolean,
      default: true,
    },

    one_coin_price: {
      type: Number,
    },
    coins_per_refer: {
      type: Number,
    },

    min_amount_wallet_use: {
      type: Number,
    },

    coin_gift_range: [
      {
        min_range: { type: Number },
        max_range: { type: Number },
        gift_coin: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Details", Details_Schema);
