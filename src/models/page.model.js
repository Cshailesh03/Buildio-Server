import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Site",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    layout: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("Page", pageSchema);
export default Page;


/* Layout from frontend using  as a JSON object in state using useState or Redux.
{
  "type": "section",
  "props": {
    "backgroundColor": "#fff",
    "padding": "20px"
  },
  "children": [
    {
      "type": "heading",
      "props": {
        "text": "Welcome to my site",
        "fontSize": "32px"
      }
    },
    {
      "type": "paragraph",
      "props": {
        "text": "This is a paragraph describing my awesome site."
      }
    },
    {
      "type": "button",
      "props": {
        "text": "Click me",
        "action": "navigate",
        "targetUrl": "/signup"
      }
    }
  ]
}
*/

